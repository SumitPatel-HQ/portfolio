"use client";

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from "@/providers/GSAPProvider";
import { useIntro } from "@/context/IntroContext";
import { introBars, lockHeroIntroScroll } from '@/app/home/hero/introAnime';
import { useLenis } from "@/providers/LenisProvider";

let hasPlayedMobileIntro = false;

export function MobileIntro() {
  const { isReady: isGSAPReady } = useGSAP();
  const { isIntroComplete, setIntroComplete } = useIntro();
  const { lenis } = useLenis();
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const introBarsRef = useRef<HTMLDivElement>(null);

  const animationStatus = useRef<'idle' | 'locking' | 'playing' | 'complete'>('idle');
  const lenisRef = useRef(lenis);

  useLayoutEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useLayoutEffect(() => {
    if (animationStatus.current !== 'idle') return;
    
    if (!isGSAPReady || isIntroComplete || hasPlayedMobileIntro) {
      if (hasPlayedMobileIntro && !isIntroComplete) {
        setIntroComplete(true);
      }
      return;
    }

    animationStatus.current = 'locking';

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setIntroComplete(true);
      animationStatus.current = 'complete';
      return;
    }

    const abortController = new AbortController();
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    const scrollLock = lockHeroIntroScroll({ start: () => lenisRef.current?.start(), stop: () => lenisRef.current?.stop() });

    const unlockScroll = () => {
      scrollLock.release();
    };

    const ctx = gsap.context(() => {
      const bars = introBarsRef.current?.children ?? [];
      
      gsap.set(introOverlayRef.current, { autoAlpha: 1 });
      gsap.set(bars, {
        autoAlpha: 0,
        scaleY: 0,
        y: 0,
        force3D: true,
        transformOrigin: "center center"
      });

      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => {
          unlockScroll();
          setIntroComplete(true);
          hasPlayedMobileIntro = true;
          animationStatus.current = 'complete';
        }
      });

      const EASE_GATHER = "power3.inOut";
      const EASE_RUPTURE = "expo.inOut";
      const EASE_OVERLAY = "power1.inOut";

      timeline
        .to(bars, {
          autoAlpha: 1,
          scaleY: 1,
          duration: 1.22,
          stagger: {
            each: 0.035,
            from: "center"
          },
          ease: EASE_GATHER
        }, 0.42) // Exact desktop start
        .to(bars, {
          scaleY: 5.8,
          autoAlpha: 0,
          duration: 1.34,
          stagger: { each: 0.018, from: "center" },
          ease: EASE_RUPTURE
        }, 1.72) // Exact desktop rupture
        .to(introOverlayRef.current, {
          autoAlpha: 0,
          duration: 1.65,
          ease: EASE_OVERLAY
        }, 2.32) // Exact desktop overlay fade
        .set(introOverlayRef.current, { pointerEvents: "none" }, 4.0);

      // Skip waiting for fonts and start the animation slightly into the curve (0.7s)
      // so the bars are instantly visible, skipping the "black screen" delay.
      requestAnimationFrame(() => {
        if (!abortController.signal.aborted) {
          animationStatus.current = 'playing';
          hasPlayedMobileIntro = true;
          window.scrollTo(0, 0);
          timeline.play(0.7);
        }
      });
    }, introOverlayRef);

    return () => {
      abortController.abort();
      unlockScroll();
      window.history.scrollRestoration = previousScrollRestoration;
      ctx.revert();
      if (animationStatus.current !== 'complete') {
        animationStatus.current = 'idle';
      }
    };
  }, [isGSAPReady, isIntroComplete, setIntroComplete]);

  if (isIntroComplete || hasPlayedMobileIntro) return null;

  return (
    <div
      ref={introOverlayRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1000] bg-background motion-reduce:hidden flex flex-col items-center justify-center"
    >
      <div
        ref={introBarsRef}
        className="relative z-10 flex items-center gap-[clamp(0.6rem,1.5vw,2rem)] mix-blend-screen"
      >
        {introBars.map((heightClass, index) => (
          <span
            key={`${heightClass}-${index}`}
            className={`${heightClass} hero-intro-bar block w-[clamp(1px,0.15vw,2px)] rounded-full bg-white opacity-0 will-change-transform`}
            style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
          />
        ))}
      </div>
    </div>
  );
}
