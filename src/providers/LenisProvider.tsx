"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface LenisContextType {
   lenis: Lenis | null;
   isReady: boolean;
}

const LenisContext = createContext<LenisContextType>({
   lenis: null,
   isReady: false,
});

export function useLenis() {
   return useContext(LenisContext);
}

export default function LenisProvider({ children }: { children: ReactNode }) {
   const lenisRef = useRef<Lenis | null>(null);
   const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
   const [isReady, setIsReady] = useState(false);

   useEffect(() => {
      const mobile = window.matchMedia("(max-width: 768px)").matches;

      // Mobile pages use native scroll — no GSAP pin animations need Lenis.
      // Skipping Lenis on mobile also prevents its document-level touch listeners
      // from intercepting horizontal swipe gestures (carousels, etc.).
      if (mobile) {
         const readyHandle = requestAnimationFrame(() => setIsReady(true));
         return () => cancelAnimationFrame(readyHandle);
      }

      const lenis = new Lenis({
         autoRaf: false, // Prevent Lenis from running its own RAF since we sync it with GSAP's ticker
         duration: 1.5,
         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         orientation: "vertical",
         gestureOrientation: "vertical",
         smoothWheel: true,
         wheelMultiplier: 1.0,
         lerp: 0.1,
         syncTouch: false,
      });

      lenisRef.current = lenis;
      const readyHandle = requestAnimationFrame(() => {
         setLenisInstance(lenis);
         setIsReady(true);
      });

      // Sync Lenis with GSAP's ticker
      function update(time: number) {
         lenis.raf(time * 1000);
      }

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      // Connect Lenis scroll to ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      // ─── Tab Duplication / BFCache Restore Handler (Fix 2 + Fix 3) ──────────
      // Tab duplication and BFCache restore fire `pageshow` with `persisted: true`.
      // On this event:
      //   - GSAP's RAF ticker is suspended in the new tab context → wake it.
      //   - Lenis's RAF loop is also dead → restart it.
      //   - ScrollTrigger pin positions are stale → refresh after one frame.
      //   - If the intro overlay is still visible, the intro was mid-play when
      //     the tab was cloned → snap all hero elements to final visible state
      //     so the page is not permanently blank/invisible.
      const handlePageShow = (event: PageTransitionEvent) => {
         if (!event.persisted) return;

         // Restart the GSAP ticker (its RAF was suspended in the duplicated tab).
         // gsap.ticker.wake() is the documented method; guard with optional chain
         // for forwards compatibility.
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
         (gsap.ticker as any).wake?.();

         // Restart Lenis — it was stopped when the RAF loop died.
         lenis.start();

         // Re-derive scroll position so Lenis and ScrollTrigger agree.
         // Defer to next frame so the DOM layout pass is complete first.
         requestAnimationFrame(() => {
            ScrollTrigger.refresh();
         });

         // Fix 3: Snap hero to final state if intro was interrupted mid-play.
         // Detect by checking whether the intro overlay is still visible.
         const heroOverlay = document.querySelector<HTMLElement>("[data-hero-intro]");
         if (heroOverlay && parseFloat(getComputedStyle(heroOverlay).opacity) > 0.05) {
            // Overlay still opaque → intro was cloned mid-animation.
            // Snap every hero element to its post-animation final state.
            gsap.set("[data-hero-intro]", { autoAlpha: 0, pointerEvents: "none" });
            gsap.set(".hero-intro-title", { clearProps: "all", opacity: 1 });
            gsap.set(".hero-chrome-top, .hero-chrome-bottom", { clearProps: "all", opacity: 1 });
            gsap.set(".hero-stripes", { clearProps: "all", opacity: 1 });
            gsap.set(".hero-divider", { clearProps: "all", opacity: 1 });
            gsap.set(".hero-menu-btn-wrap", { clearProps: "all", opacity: 1 });
         }
      };

      window.addEventListener("pageshow", handlePageShow);
      // ─────────────────────────────────────────────────────────────────────────

      return () => {
         window.removeEventListener("pageshow", handlePageShow);
         cancelAnimationFrame(readyHandle);
         gsap.ticker.remove(update);
         lenis.destroy();
         lenisRef.current = null;
      };
   }, []);

   const contextValue = useMemo(
      () => ({
         lenis: lenisInstance,
         isReady,
      }),
      [isReady, lenisInstance],
   );

   return <LenisContext.Provider value={contextValue}>{children}</LenisContext.Provider>;
}
