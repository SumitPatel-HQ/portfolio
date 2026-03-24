"use client";

import { useEffect, createContext, useContext, useState, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins at module level for client-side execution to ensure they are available early.
if (typeof window !== "undefined") {
   gsap.registerPlugin(ScrollTrigger);
   gsap.defaults({
      ease: "power2.out",
      duration: 1,
   });
}

interface GSAPContextType {
   isReady: boolean;
}

const GSAPContext = createContext<GSAPContextType>({ isReady: false });

export function useGSAP() {
   return useContext(GSAPContext);
}

export default function GSAPProvider({ children }: { children: ReactNode }) {
   const [isReady, setIsReady] = useState(false);

   useEffect(() => {
      // Use requestAnimationFrame to defer the state update until after the initial render cycle,
      // avoiding cascading renders and satisfying the react-hooks/set-state-in-effect lint rule.
      const handle = requestAnimationFrame(() => {
         setIsReady(true);
      });
      return () => cancelAnimationFrame(handle);
   }, []);

   return (
      <GSAPContext.Provider value={{ isReady }}>
         {children}
      </GSAPContext.Provider>
   );
}
