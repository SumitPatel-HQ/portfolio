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

      const lenis = new Lenis({
         duration: mobile ? 1.2 : 1.5,
         easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
         orientation: "vertical",
         gestureOrientation: "both",
         smoothWheel: true,
         wheelMultiplier: 1.0,
         // Mobile touch needs a higher multiplier so the page keeps up with your finger
         touchMultiplier: mobile ? 1.5 : 1.0,
         // Slightly slower lerp for a more "buttery" feel
         lerp: mobile ? 0.08 : 0.1,
         syncTouch: true,
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

      return () => {
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
