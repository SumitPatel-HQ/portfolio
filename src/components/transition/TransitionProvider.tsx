"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { TransitionRouter } from "next-transition-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BrandLayer } from "./BrandLayer";
import { useLenis } from "@/providers/LenisProvider";
import "./transition.css";


function getPageName(path: string): string {
  if (!path) return "SUMIT";

  const cleanPath = path.split("?")[0].split("#")[0].replace(/\/$/, "");

  if (cleanPath === "/about") return "ABOUT";
  if (cleanPath === "/projects") return "PROJECTS";
  if (cleanPath === "/experience") return "EXPERIENCE";
  if (cleanPath === "") return "SUMIT";

  const segment = cleanPath.split("/").pop() || "";
  return segment ? decodeURIComponent(segment).replace(/[-_]/g, " ").toUpperCase() : "SUMIT";
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const brandLayerRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const hasPlayedInitialEntryRef = useRef(false);
  const skipBrandLayerRef = useRef(false);

  // Popstate orchestration refs
  const isPopstateTransitionRef = useRef(false);
  const prevPathnameRef = useRef(""); // Updated synchronously in useLayoutEffect
  const leaveStartTimeRef = useRef(0);
  const expectedLeaveDurationRef = useRef(0);
  const enterTlRef = useRef<gsap.core.Timeline | null>(null);
  const leaveTlRef = useRef<gsap.core.Timeline | null>(null);

  const pathname = usePathname();
  const { lenis } = useLenis();
  const [targetPageName, setTargetPageName] = useState(() => getPageName(pathname));
  const lenisRef = useRef(lenis);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  /**
   * Deterministic cleanup helper. Resets all transition layers to their
   * resting state so the next navigation (internal or popstate) can start
   * from a known-good baseline.
   */
  const resetTransitionState = useCallback(() => {
    const snapshotEl = snapshotRef.current;
    const brandEl = brandLayerRef.current;
    const contentEl = contentRef.current;

    if (enterTlRef.current) { enterTlRef.current.kill(); enterTlRef.current = null; }
    if (leaveTlRef.current) { leaveTlRef.current.kill(); leaveTlRef.current = null; }

    if (snapshotEl) {
      snapshotEl.innerHTML = "";
      gsap.set(snapshotEl, { visibility: "hidden", y: 0 });
    }
    if (brandEl) {
      gsap.set(brandEl, { y: "100vh", visibility: "hidden" });
    }
    if (contentEl) {
      gsap.set(contentEl, { clearProps: "all" });
      contentEl.style.visibility = "visible";
    }

    document.body.classList.remove("transition-active");
    document.body.classList.remove("transition-entering");
    isTransitioningRef.current = false;
    isPopstateTransitionRef.current = false;

    if (typeof window !== "undefined") {
      ScrollTrigger.refresh();
      if (lenisRef.current) lenisRef.current.resize();
    }
  }, []);

  /**
   * Safety watchdog: if isTransitioningRef stays true for longer than
   * the maximum possible transition duration, force-reset everything.
   * This prevents permanent deadlocks from edge cases we can't predict.
   */
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startSafetyTimer = useCallback(() => {
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => {
      if (isTransitioningRef.current) {
        console.warn("[Transition] Safety watchdog triggered — force-resetting stuck transition.");
        resetTransitionState();
      }
      safetyTimerRef.current = null;
    }, 8000); // Max any transition can take: ~5.4s leave+enter. 8s is generous.
  }, [resetTransitionState]);

  const clearSafetyTimer = useCallback(() => {
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
  }, []);

  // ─── Initial entry animation (runs once on mount) ─────────────────────
  useLayoutEffect(() => {
    if (hasPlayedInitialEntryRef.current) return;
    hasPlayedInitialEntryRef.current = true;
    prevPathnameRef.current = pathname;

    const snapshotEl = snapshotRef.current;
    const brandEl = brandLayerRef.current;
    const contentEl = contentRef.current;

    if (!brandEl || !contentEl) {
      document.documentElement.classList.add("transition-ready");
      return;
    }

    // On the home route, skip the brand layer entry entirely.
    // The HeroSection has its own cinematic intro animation that should
    // play unobstructed on initial load / refresh at "/".
    const isHomeRoute = pathname === "/";

    if (isHomeRoute) {
      // Immediately hide the brand layer and reveal content so the
      // hero intro animation can take full control of the entry sequence.
      gsap.set(brandEl, { y: "100vh", visibility: "hidden" });
      gsap.set(contentEl, { clearProps: "y", visibility: "visible" });

      if (snapshotEl) {
        snapshotEl.innerHTML = "";
        gsap.set(snapshotEl, { visibility: "hidden", y: 0 });
      }

      document.documentElement.classList.add("transition-ready");
      return;
    }

    isTransitioningRef.current = true;

    if (snapshotEl) {
      snapshotEl.innerHTML = "";
      gsap.set(snapshotEl, { visibility: "hidden", y: 0 });
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const brandDuration = reduceMotion ? 1.2 : 2.4;
    const contentDuration = reduceMotion ? 1.4 : 2.8;
    const contentDelay = reduceMotion ? 0 : 0.15;

    gsap.set(brandEl, {
      y: 0,
      visibility: "visible",
      force3D: true,
    });

    gsap.set(contentEl, {
      visibility: "hidden",
      y: "50vh",
      force3D: true,
    });

    document.body.classList.add("transition-active");
    document.body.classList.add("transition-entering");

    const tl = gsap.timeline({
      onComplete: () => {
        if (snapshotEl) {
          snapshotEl.innerHTML = "";
          gsap.set(snapshotEl, { visibility: "hidden", y: 0 });
        }

        gsap.set(brandEl, { y: "100vh", visibility: "hidden" });
        gsap.set(contentEl, { clearProps: "y" });

        document.body.classList.remove("transition-active");
        document.body.classList.remove("transition-entering");
        document.documentElement.classList.add("transition-ready");

        isTransitioningRef.current = false;

        if (typeof window !== "undefined") {
          ScrollTrigger.refresh();
          if (lenisRef.current) {
            lenisRef.current.resize();
          }
        }
      },
    });

    tl.to(
      brandEl,
      {
        y: "-100vh",
        duration: brandDuration,
        ease: "power3.inOut",
        force3D: true,
      },
      0
    );

    tl.to(
      contentEl,
      {
        y: 0,
        duration: contentDuration,
        ease: "power3.out",
        force3D: true,
      },
      contentDelay
    );

    tl.set(contentEl, { visibility: "visible" }, contentDelay);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Popstate arrive animation (runs when pathname changes after popstate leave) ──
  useLayoutEffect(() => {
    // Skip the very first render — the initial-entry effect handles that.
    if (prevPathnameRef.current === "" || pathname === prevPathnameRef.current) {
      // First mount or same-route update — just sync the ref and bail.
      prevPathnameRef.current = pathname;
      return;
    }

    // Pathname actually changed. Sync the ref immediately.
    prevPathnameRef.current = pathname;

    // Only run the arrive choreography if our popstate handler started a leave.
    if (!isPopstateTransitionRef.current) return;
    isPopstateTransitionRef.current = false;

    const snapshotEl = snapshotRef.current;
    const brandEl = brandLayerRef.current;
    const contentEl = contentRef.current;
    const skipBrandLayer = skipBrandLayerRef.current;

    if (!brandEl || !contentEl) {
      resetTransitionState();
      return;
    }

    // Kill any lingering enter timeline from a previous navigation.
    if (enterTlRef.current) { enterTlRef.current.kill(); enterTlRef.current = null; }

    // Calculate how much of the leave animation is still in-flight.
    const elapsed = Date.now() - leaveStartTimeRef.current;
    const remaining = Math.max(0, expectedLeaveDurationRef.current - elapsed);
    const delaySeconds = remaining / 1000;

    const setupIncomingScene = () => {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      contentEl.style.visibility = "visible";
      document.body.classList.add("transition-entering");
      if (skipBrandLayer) gsap.set(brandEl, { y: "100vh", visibility: "hidden" });
    };

    // If the leave has already finished, reveal immediately.
    if (delaySeconds === 0) setupIncomingScene();

    const tl = gsap.timeline({
      delay: delaySeconds,
      onStart: () => {
        if (delaySeconds > 0) setupIncomingScene();
      },
      onComplete: () => {
        clearSafetyTimer();

        if (snapshotEl) {
          snapshotEl.innerHTML = "";
          gsap.set(snapshotEl, { visibility: "hidden", y: 0 });
        }
        gsap.set(brandEl, { y: "100vh", visibility: "hidden" });
        gsap.set(contentEl, { clearProps: "y" });
        document.body.classList.remove("transition-active");
        document.body.classList.remove("transition-entering");
        isTransitioningRef.current = false;
        skipBrandLayerRef.current = false;
        if (typeof window !== "undefined") {
          ScrollTrigger.refresh();
          if (lenisRef.current) lenisRef.current.resize();
        }
      },
    });

    enterTlRef.current = tl;

    if (!skipBrandLayer) {
      tl.to(brandEl, { y: "-100vh", duration: 2.4, ease: "power3.inOut", force3D: true }, 0);
    }

    tl.fromTo(
      contentEl,
      { y: skipBrandLayer ? "0" : "50vh" },
      { y: 0, duration: skipBrandLayer ? 1.8 : 2.8, ease: "power3.out", force3D: true },
      skipBrandLayer ? 0 : 0.15
    );

    if (snapshotEl) {
      tl.set(snapshotEl, { visibility: "hidden", innerHTML: "" }, 0);
    }
  }, [pathname, resetTransitionState, clearSafetyTimer]);

  /**
   * Captures a visual "snapshot" of the current page content into the
   * fixed snapshot overlay. This allows the outgoing page to visually
   * persist while Next.js swaps the route underneath.
   */
  const captureSnapshot = useCallback(() => {
    const snapshotEl = snapshotRef.current;
    const contentEl = contentRef.current;
    if (!snapshotEl || !contentEl) return;

    // Clear previous snapshot content
    snapshotEl.innerHTML = "";

    const clone = contentEl.cloneNode(true) as HTMLElement;
    const chromeNodes = Array.from(contentEl.querySelectorAll<HTMLElement>('[data-transition-chrome="true"]'));

    // Remove chrome from the main clone so we can re-attach it separately as
    // fixed-position snapshot layers.
    clone.querySelectorAll('[data-transition-chrome="true"]').forEach((el) => {
      el.remove();
    });

    // Remove interactive elements from the clone
    clone.querySelectorAll("a, button, input, textarea, select, [tabindex]").forEach((el) => {
      (el as HTMLElement).setAttribute("tabindex", "-1");
      (el as HTMLElement).style.pointerEvents = "none";
    });

    // Match the body's current scroll-offset so the snapshot looks
    // identical to what the user was seeing.
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    snapshotEl.style.display = "flex";
    snapshotEl.style.flexDirection = "column";
    snapshotEl.style.background = "var(--background)";

    // Offset the cloned content by the current scroll position
    // so the snapshot visually matches the viewport exactly.
    const wrapper = document.createElement("div");
    // CRITICAL: Do NOT use transform. A transform creates a new containing block
    // which breaks any position: fixed elements (like GSAP pinned sections) inside
    // the clone, throwing them way off-screen and causing a massive black void.
    wrapper.style.position = "absolute";
    wrapper.style.top = `${-scrollY}px`;
    wrapper.style.left = "0";
    wrapper.style.width = "100%";

    wrapper.appendChild(clone);
    snapshotEl.appendChild(wrapper);

    chromeNodes.forEach((node) => {
      const chromeClone = node.cloneNode(true) as HTMLElement;
      chromeClone.style.pointerEvents = "none";
      snapshotEl.appendChild(chromeClone);
    });
  }, []);

  // ─── Popstate leave handler ───────────────────────────────────────────
  useEffect(() => {
    const handlePopState = () => {
      const targetPath = window.location.pathname;

      // Same page (e.g. hash change only) — ignore.
      if (targetPath === prevPathnameRef.current) return;

      const snapshotEl = snapshotRef.current;
      const brandEl = brandLayerRef.current;
      const contentEl = contentRef.current;

      if (!snapshotEl || !brandEl || !contentEl) return;

      // If a transition is already running (user spamming back/forward),
      // hard-reset everything first so we start from a clean slate.
      if (isTransitioningRef.current) {
        resetTransitionState();
      }

      // ── Begin cinematic leave ──
      isTransitioningRef.current = true;
      isPopstateTransitionRef.current = true;

      skipBrandLayerRef.current = targetPath === "/";
      setTargetPageName(getPageName(targetPath));

      // Kill any dangling timelines from previous navigations.
      if (enterTlRef.current) { enterTlRef.current.kill(); enterTlRef.current = null; }
      if (leaveTlRef.current) { leaveTlRef.current.kill(); leaveTlRef.current = null; }

      // Snapshot the current visible page before Next.js replaces the DOM.
      captureSnapshot();
      contentEl.style.visibility = "hidden";

      gsap.set(snapshotEl, { visibility: "visible", y: 0, force3D: true });
      gsap.set(brandEl, {
        y: "100vh",
        visibility: skipBrandLayerRef.current ? "hidden" : "visible",
        force3D: true,
      });
      document.body.classList.add("transition-active");

      const tl = gsap.timeline();
      leaveTlRef.current = tl;

      leaveStartTimeRef.current = Date.now();
      expectedLeaveDurationRef.current = skipBrandLayerRef.current ? 1600 : 2600;

      startSafetyTimer();

      // Snapshot exits upward
      tl.to(snapshotEl, { y: "-100vh", duration: 2.2, ease: "power3.inOut", force3D: true }, 0);

      // Brand layer enters from below (unless going home)
      if (!skipBrandLayerRef.current) {
        tl.to(brandEl, { y: 0, duration: 2.4, ease: "power3.inOut", force3D: true }, 0.15);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [captureSnapshot, resetTransitionState, startSafetyTimer]);

  /**
   * Leave callback — fired when a navigation link is clicked.
   */
  const onLeave = useCallback(
    (next: () => void, from?: string, to?: string) => {
      // CRITICAL: If a transition is already running (e.g. a popstate animation
      // is mid-flight when the user clicks a link), we MUST still call next()
      // because the TransitionRouter library already set its internal
      // stage="leaving" before calling us. If we return without next(),
      // stage is permanently stuck at "leaving" and ALL future navigations die.
      if (isTransitioningRef.current) {
        resetTransitionState();
        next();
        return;
      }
      isTransitioningRef.current = true;

      const targetPath = to || window.location.pathname;
      skipBrandLayerRef.current = targetPath === "/";
      setTargetPageName(getPageName(targetPath));

      const snapshotEl = snapshotRef.current;
      const brandEl = brandLayerRef.current;
      const contentEl = contentRef.current;

      if (!snapshotEl || !brandEl || !contentEl) {
        next();
        isTransitioningRef.current = false;
        return;
      }

      if (enterTlRef.current) { enterTlRef.current.kill(); enterTlRef.current = null; }

      // Capture the current visual state
      captureSnapshot();

      // Immediately hide the real DOM so it doesn't peek through the gap
      // when the snapshot pulls away from the brand layer.
      contentEl.style.visibility = "hidden";

      // Make snapshot visible
      gsap.set(snapshotEl, {
        visibility: "visible",
        y: 0,
        force3D: true,
      });

      // Position brand layer just below viewport
      gsap.set(brandEl, {
        y: "100vh",
        visibility: skipBrandLayerRef.current ? "hidden" : "visible",
        force3D: true,
      });

      // Add transition-active class for z-index management
      document.body.classList.add("transition-active");

      const tl = gsap.timeline();
      leaveTlRef.current = tl;

      startSafetyTimer();

      // 1. Current page (snapshot) exits slowly and gracefully
      tl.to(
        snapshotEl,
        {
          y: "-100vh",
          duration: 2.2,
          ease: "power3.inOut",
          force3D: true,
        },
        0
      );

      // 2. Brand layer breathes and follows, except on the home route.
      if (!skipBrandLayerRef.current) {
        tl.to(
          brandEl,
          {
            y: 0,
            duration: 2.4,
            ease: "power3.inOut",
            force3D: true,
          },
          0.15
        );
      }

      // Call next() after the outgoing motion finishes.
      // Home skips the atmospheric middle layer and moves straight into the incoming scene.
      tl.call(
        () => {
          // Scroll to top before new page mounts
          window.scrollTo(0, 0);
          next();
        },
        undefined,
        skipBrandLayerRef.current ? 1.6 : 2.6
      );

      return () => {
        tl.kill();
      };
    },
    [captureSnapshot, resetTransitionState, startSafetyTimer]
  );

  /**
   * Enter callback — fired after the new page has mounted.
   */
  const onEnter = useCallback(
    (next: () => void) => {
      const snapshotEl = snapshotRef.current;
      const brandEl = brandLayerRef.current;
      const contentEl = contentRef.current;
      const skipBrandLayer = skipBrandLayerRef.current;
      skipBrandLayerRef.current = false;

      if (!brandEl || !contentEl) {
        next();
        isTransitioningRef.current = false;
        return;
      }

      if (enterTlRef.current) { enterTlRef.current.kill(); enterTlRef.current = null; }

      // Reset scroll position for the new page
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      }

      document.body.classList.add("transition-entering");

      // Ensure new page content is visible again
      contentEl.style.visibility = "visible";

      if (skipBrandLayer) {
        gsap.set(brandEl, { y: "100vh", visibility: "hidden" });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          clearSafetyTimer();

          // Clean up snapshot
          if (snapshotEl) {
            snapshotEl.innerHTML = "";
            gsap.set(snapshotEl, { visibility: "hidden", y: 0 });
          }

          // Reset brand layer to off-screen position
          gsap.set(brandEl, { y: "100vh", visibility: "hidden" });

          // Reset content transform
          gsap.set(contentEl, { clearProps: "y" });

          // Remove transition class
          document.body.classList.remove("transition-active");
          document.body.classList.remove("transition-entering");

          isTransitioningRef.current = false;
          next();

          // Crucial: The content container was translated during the mount of the new page.
          // ScrollTrigger calculates trigger positions exactly when components mount.
          // Now that we've cleared the transform, we MUST tell ScrollTrigger to recalculate
          // its positions against the true native DOM layout synchronously, otherwise it flickers.
          if (typeof window !== "undefined") {
            ScrollTrigger.refresh();
            // Force Lenis to recalculate the max scroll limit based on the refreshed DOM height.
            if (lenis) {
              lenis.resize();
            }
          }
        },
      });

      enterTlRef.current = tl;

      // 3. Brand layer continues slowly, feeling like spatial traversal
      if (!skipBrandLayer) {
        tl.to(
          brandEl,
          {
            y: "-100vh",
            duration: 2.4,
            ease: "power3.inOut",
            force3D: true,
          },
          0
        );
      }

      // 4. Incoming page arrives with gentlest recovery
      // Delayed start and extremely long duration keeps it in motion
      // and delays final stabilization.
      tl.fromTo(
        contentEl,
        { y: skipBrandLayer ? "0" : "50vh" },
        {
          y: 0,
          duration: skipBrandLayer ? 1.8 : 2.8,
          ease: "power3.out",
          force3D: true,
        },
        skipBrandLayer ? 0 : 0.15
      );

      // Hide snapshot immediately (it's behind the brand layer)
      tl.set(
        snapshotEl,
        { visibility: "hidden", innerHTML: "" },
        0
      );
    },
    [lenis, clearSafetyTimer]
  );

  return (
    <TransitionRouter
      auto={true}
      leave={onLeave}
      enter={onEnter}
    >
      {/* Snapshot overlay — temporarily holds outgoing page visual */}
      <div
        ref={snapshotRef}
        className="transition-snapshot"
        style={{ visibility: "hidden" }}
        aria-hidden="true"
      />

      {/* Brand layer — atmospheric middle scene */}
      <BrandLayer ref={brandLayerRef} pageName={targetPageName} />

      {/* Actual page content */}
      <div ref={contentRef} className="transition-content flex-1 flex flex-col w-full">
        {children}
      </div>
    </TransitionRouter>
  );
}
