import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

type HeroIntroStartOptions = {
  fontTimeoutMs?: number;
  layoutFrames?: number;
};

type SmoothScrollController = {
  stop: () => void;
  start: () => void;
};

type HeroIntroScrollLock = {
  release: () => void;
};

const DEFAULT_FONT_READY_TIMEOUT_MS = 1200;
const DEFAULT_STABLE_LAYOUT_FRAMES = 2;

const waitForAnimationFrame = (signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    const frame = requestAnimationFrame(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    });

    const abort = () => {
      cancelAnimationFrame(frame);
      reject(signal?.reason);
    };

    signal?.addEventListener('abort', abort, { once: true });
  });

const waitForTimeout = (timeoutMs: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    const timeout = window.setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, Math.max(0, timeoutMs));

    const abort = () => {
      window.clearTimeout(timeout);
      reject(signal?.reason);
    };

    signal?.addEventListener('abort', abort, { once: true });
  });

const waitForFonts = async (signal?: AbortSignal, fontTimeoutMs = DEFAULT_FONT_READY_TIMEOUT_MS) => {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return;
  }

  const fontsReady = document.fonts.ready.then(() => undefined).catch(() => undefined);

  if (!signal) {
    await Promise.race([fontsReady, waitForTimeout(fontTimeoutMs)]);
    return;
  }

  if (signal.aborted) {
    throw signal.reason;
  }

  await Promise.race([
    fontsReady,
    waitForTimeout(fontTimeoutMs, signal),
    new Promise<void>((_, reject) => {
      signal.addEventListener('abort', () => reject(signal.reason), { once: true });
    }),
  ]);
};

export const waitForHeroIntroStart = async (
  signal?: AbortSignal,
  { fontTimeoutMs = DEFAULT_FONT_READY_TIMEOUT_MS, layoutFrames = DEFAULT_STABLE_LAYOUT_FRAMES }: HeroIntroStartOptions = {},
): Promise<void> => {
  if (typeof window === 'undefined') {
    return;
  }

  await waitForFonts(signal, fontTimeoutMs);

  for (let frame = 0; frame < layoutFrames; frame += 1) {
    await waitForAnimationFrame(signal);
  }
};

export const lockHeroIntroScroll = (smoothScroll?: SmoothScrollController | null): HeroIntroScrollLock => {
  if (typeof window === 'undefined') {
    return { release: () => undefined };
  }

  const html = document.documentElement;
  const body = document.body;
  const previousHtmlOverflow = html.style.overflow;
  const previousHtmlOverscrollBehavior = html.style.overscrollBehavior;
  const previousBodyOverflow = body.style.overflow;
  const previousBodyOverscrollBehavior = body.style.overscrollBehavior;
  const previousBodyTouchAction = body.style.touchAction;

  // Store the scroll position when lock starts

  let isReleased = false;

  const preventScroll = (event: Event) => {
    event.preventDefault();
    return false;
  };

  const preventScrollKeys = (event: KeyboardEvent) => {
    if ([" ", "ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp"].includes(event.key)) {
      event.preventDefault();
    }
  };

  // Stop smooth scrolling first
  smoothScroll?.stop();

  // Force scroll to the stored position immediately
  window.scrollTo(0, 0);

  // Apply scroll lock styles
  html.style.overflow = 'hidden';
  html.style.overscrollBehavior = 'none';
  body.style.overflow = 'hidden';
  body.style.overscrollBehavior = 'none';
  body.style.touchAction = 'none';

  // Prevent scroll on html element as well (for Safari/iOS)
  // html.style.position = 'fixed';
  // html.style.width = '100%';
  // html.style.height = '100%';
  // html.style.top = ...

  // Add event listeners with capture phase to intercept all scroll events
  window.addEventListener('wheel', preventScroll, { passive: false, capture: true });
  window.addEventListener('scroll', preventScroll, { passive: false, capture: true });
  window.addEventListener('touchmove', preventScroll, { passive: false, capture: true });
  window.addEventListener('touchstart', preventScroll, { passive: false, capture: true });
  window.addEventListener('keydown', preventScrollKeys, { capture: true });

  return {
    release: () => {
      if (isReleased) {
        return;
      }

      // Remove event listeners first
      window.removeEventListener('wheel', preventScroll, { capture: true });
      window.removeEventListener('scroll', preventScroll, { capture: true });
      window.removeEventListener('touchmove', preventScroll, { capture: true });
      window.removeEventListener('touchstart', preventScroll, { capture: true });
      window.removeEventListener('keydown', preventScrollKeys, { capture: true });

      // Restore styles
      html.style.overflow = previousHtmlOverflow;
      html.style.overscrollBehavior = previousHtmlOverscrollBehavior;
      // html.style.position = '';
      // html.style.width = '';
      // html.style.height = '';
      // // html.style.top = ...
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      body.style.touchAction = previousBodyTouchAction;

      // Restore scroll position before re-enabling smooth scroll
      window.scrollTo(0, 0);

      // Re-enable smooth scrolling
      smoothScroll?.start();
      isReleased = true;
    },
  };
};

export const introBars = [
  "h-[clamp(4.2rem,8vw,8rem)]",
  "h-[clamp(5rem,9vw,9.5rem)]",
  "h-[clamp(4.4rem,8.4vw,8.6rem)]",
  "h-[clamp(5.4rem,9.8vw,10rem)]",
  "h-[clamp(4.8rem,8.8vw,9rem)]",
  "h-[clamp(5.8rem,10.4vw,10.8rem)]",
  "h-[clamp(4.6rem,8.6vw,8.8rem)]",
  "h-[clamp(5.2rem,9.4vw,9.7rem)]",
  "h-[clamp(4.4rem,8.4vw,8.6rem)]",
];

interface UseHeroAnimationProps {
  isGSAPReady: boolean;
  setIntroComplete: (complete: boolean) => void;
  setIsIntroComplete: (complete: boolean) => void;
  heroRootRef: React.RefObject<HTMLElement | null>;
  introOverlayRef: React.RefObject<HTMLDivElement | null>;
  introBarsRef: React.RefObject<HTMLDivElement | null>;
  stripesRef: React.RefObject<HTMLDivElement | null>;
  topChromeRef: React.RefObject<HTMLDivElement | null>;
  sumitRef: React.RefObject<HTMLHeadingElement | null>;
  patelRef: React.RefObject<HTMLHeadingElement | null>;
  nameDividerRef: React.RefObject<HTMLDivElement | null>;
  bottomChromeRef: React.RefObject<HTMLDivElement | null>;
  smoothScroll?: SmoothScrollController | null;
}

export const useHeroAnimation = ({
  isGSAPReady,
  setIntroComplete,
  setIsIntroComplete,
  heroRootRef,
  introOverlayRef,
  introBarsRef,
  stripesRef,
  topChromeRef,
  sumitRef,
  patelRef,
  nameDividerRef,
  bottomChromeRef,
  smoothScroll,
}: UseHeroAnimationProps) => {
  const animationStatus = useRef<'idle' | 'locking' | 'playing' | 'complete'>('idle');
  const smoothScrollRef = useRef<SmoothScrollController | null>(smoothScroll ?? null);

  useLayoutEffect(() => {
    smoothScrollRef.current = smoothScroll ?? null;

    if (animationStatus.current === 'locking' || animationStatus.current === 'playing') {
      smoothScroll?.stop();
    }
  }, [smoothScroll]);

  useLayoutEffect(() => {
    if (animationStatus.current !== 'idle') {
      return;
    }

    if (!isGSAPReady || !heroRootRef.current) {
      return;
    }

    animationStatus.current = 'locking';
    setIntroComplete(false);
    setIsIntroComplete(false);

    // Resolve outside any scoped context — the wrapper lives outside heroRootRef.
    const menuBtnWrap = document.querySelector<HTMLElement>(".hero-menu-btn-wrap");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // For reduced motion: immediately show all elements and complete
      gsap.set([
        stripesRef.current, topChromeRef.current, bottomChromeRef.current,
        sumitRef.current, patelRef.current, nameDividerRef.current
      ], { clearProps: "all", opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
      if (menuBtnWrap) gsap.set(menuBtnWrap, { clearProps: "all", opacity: 1, y: 0 });
      gsap.set(introOverlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
      setIsIntroComplete(true);
      setIntroComplete(true);
      animationStatus.current = 'complete';
      return;
    }

    const abortController = new AbortController();
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const scrollLock = lockHeroIntroScroll(smoothScrollRef.current);
    let isScrollLocked = true;

    const unlockScroll = () => {
      if (!isScrollLocked) {
        return;
      }

      scrollLock.release();
      smoothScrollRef.current?.start();
      isScrollLocked = false;
    };

    const ctx = gsap.context(() => {
      const bars = introBarsRef.current?.children ?? [];
      const snapToHeroTop = () => window.scrollTo(0, 0);

      snapToHeroTop();

      // --- Premium Cinematic Initial States ---
      // All set synchronously before first paint via useLayoutEffect

      // UI Chrome: Near-final position — soft blur carried by inertia, no snap
      gsap.set(topChromeRef.current, { autoAlpha: 0, y: 9, filter: "blur(5px)", force3D: true });
      gsap.set(bottomChromeRef.current, { autoAlpha: 0, y: 7, filter: "blur(4px)", force3D: true });

      // Menu button: mirrors top chrome entry — same physical carry, same inertia signature
      if (menuBtnWrap) gsap.set(menuBtnWrap, { autoAlpha: 0, y: 9, filter: "blur(5px)", force3D: true });

      // Environment: Begin at exact final position — reveals only through opacity.
      // Subtle asymmetrical x-offset to introduce cinematic tonal irregularity.
      gsap.set(stripesRef.current, {
        autoAlpha: 0,
        scale: 1,
        x: 6,
        y: 0,
        force3D: true,
      });

      // Typography System: Structurally bound to the center axis, asymmetrical tension.
      // y offsets are fractional to feel physically carried rather than keyframed.
      gsap.set(sumitRef.current, {
        autoAlpha: 0,
        filter: "blur(12px)",
        yPercent: 10,
        y: 3,
        clipPath: "inset(100% 0% -20% 0%)",
        force3D: true,
      });

      gsap.set(patelRef.current, {
        autoAlpha: 0,
        filter: "blur(16px)",
        yPercent: -14,
        y: -2,
        clipPath: "inset(-20% 0% 100% 0%)",
        force3D: true,
      });

      // Divider: geometric anchor, sweeps from left with slight atmospheric delay
      gsap.set(nameDividerRef.current, {
        scaleX: 0,
        autoAlpha: 0,
        transformOrigin: "left center",
        force3D: true,
      });

      gsap.set(introOverlayRef.current, { autoAlpha: 1 });

      // Transitional Geometry: GPU-pinned, no positional drift
      gsap.set(bars, {
        autoAlpha: 0,
        scaleY: 0,
        y: 0,
        force3D: true,
        transformOrigin: "center center" // Symmetric expansion — maximum graphic dominance
      });

      // Luxury custom eases — organic deceleration, no mechanical stopping
      const EASE_GATHER = "power3.inOut";  // Commanding bar presence — authoritative snap-into-frame
      const EASE_RUPTURE = "expo.inOut";
      const EASE_OVERLAY = "power1.inOut";
      const EASE_STRIPES = "none";           // Linear atmospheric melt — no acceleration signature
      const EASE_DIVIDER = "circ.inOut";    // Smooth arc sweep — not exponential snap
      const EASE_SUMIT = "circ.out";      // Gentle organic settle — softer than power4
      const EASE_PATEL = "power3.out";    // Slightly asymmetric from sumit — layered timing
      const EASE_CHROME_T = "power1.out";    // Slow drift to rest — not a stop
      const EASE_CHROME_B = "power1.out";

      let didFinishIntro = false;
      const finishIntro = () => {
        if (didFinishIntro) {
          return;
        }

        didFinishIntro = true;
        animationStatus.current = 'complete';
        snapToHeroTop();
        unlockScroll();
        setIsIntroComplete(true);
      };

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: EASE_GATHER },
      });

      timeline
        .call(snapToHeroTop, [], 0)

        // Tight stagger, firm ease: the bars establish graphic authority first.
        .to(bars, {
          autoAlpha: 1,
          scaleY: 1,
          duration: 1.22,
          stagger: {
            each: 0.035,
            from: "center"
          },
          ease: EASE_GATHER
        }, 0.42)

        // The bars leave decisively, but not mechanically.
        .to(bars, {
          scaleY: 5.8,
          autoAlpha: 0,
          duration: 1.34,
          stagger: { each: 0.018, from: "center" },
          ease: EASE_RUPTURE
        }, 1.72)

        // Overlay dissolves as the identity system takes over the frame.
        .to(introOverlayRef.current, {
          autoAlpha: 0,
          duration: 1.65,
          ease: EASE_OVERLAY
        }, 2.32)
        .set(introOverlayRef.current, { pointerEvents: "none" }, 4.0)

        // Atmospheric layer resolves slowly and remains subordinate.
        .to(stripesRef.current, {
          autoAlpha: 1,
          x: 0,
          duration: 8.4,
          ease: EASE_STRIPES
        }, 2.34)

        // Divider anchors the composition before the typography fully resolves.
        .to(nameDividerRef.current, {
          autoAlpha: 1,
          scaleX: 1,
          duration: 2.18,
          ease: EASE_DIVIDER
        }, 2.02)

        .to(sumitRef.current, {
          clipPath: "inset(-20% -20% -20% -20%)",
          autoAlpha: 1,
          filter: "blur(0px)",
          yPercent: 0,
          y: 0,
          duration: 3.25,
          ease: EASE_SUMIT
        }, 2.43)

        .to(patelRef.current, {
          clipPath: "inset(-20% -20% -20% -20%)",
          autoAlpha: 1,
          filter: "blur(0px)",
          yPercent: 0,
          y: 0,
          duration: 3.05,
          ease: EASE_PATEL
        }, 2.64)

        .call(() => {
          setIntroComplete(true);
        }, [], 3.04)

        .to(topChromeRef.current, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2.35,
          ease: EASE_CHROME_T,
        }, 3.04)

        .to(bottomChromeRef.current, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2.08,
          ease: EASE_CHROME_B,
          onComplete: finishIntro,
        }, 3.36);

      // Menu button enters simultaneously with the top chrome — same physical model.
      // Added imperatively (not chained) because the element lives outside heroRootRef.
      if (menuBtnWrap) {
        timeline.to(menuBtnWrap, {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 2.35,
          ease: EASE_CHROME_T,
        }, 3.04);
      }

      waitForHeroIntroStart(abortController.signal)
        .then(() => {
          if (abortController.signal.aborted) {
            return;
          }

          animationStatus.current = 'playing';
          snapToHeroTop();
          timeline.play(0);
        })
        .catch(() => undefined);
    }, heroRootRef);

    return () => {
      abortController.abort();
      unlockScroll();
      window.history.scrollRestoration = previousScrollRestoration;
      ctx.revert();

      // Ensure global elements are cleared of intro animation styles when leaving the home page.
      // This prevents the menu button from remaining hidden due to GSAP's revert to initial hidden state.
      gsap.set(".hero-menu-btn-wrap", { clearProps: "opacity,visibility,filter,transform" });

      if (animationStatus.current !== 'complete') {
        animationStatus.current = 'idle';
      }
    };
  }, [isGSAPReady, setIntroComplete, setIsIntroComplete, heroRootRef, introOverlayRef, introBarsRef, stripesRef, topChromeRef, sumitRef, patelRef, nameDividerRef, bottomChromeRef]);
};
