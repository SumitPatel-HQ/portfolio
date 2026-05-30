"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { BrandLayer } from "@/components/transition/BrandLayer";

export default function OverlayReviewPage() {
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force the BrandLayer to sit dead-center in the viewport 
    // so you can inspect its typography, colors, and layout statically.
    if (brandRef.current) {
      gsap.set(brandRef.current, { 
        y: 0, 
        visibility: "visible", 
        pointerEvents: "auto" // allow right-click inspecting
      });
    }
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background just to show contrast if any */}
      <div className="absolute inset-0 bg-red-500/10 z-0 flex items-start justify-center pt-10">
        <p className="text-white/50 text-sm tracking-widest uppercase">
          Static Review Mode (Background behind layer)
        </p>
      </div>

      <BrandLayer ref={brandRef} />
    </div>
  );
}
