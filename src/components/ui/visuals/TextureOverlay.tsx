"use client";

import { cn } from "@/lib/utils";

interface TextureOverlayProps {
  /**
   * Optional image URL for the texture. 
   * If not provided, it defaults to a high-performance, premium SVG noise pattern.
   */
  url?: string;
  /**
   * Opacity of the texture layer (0 to 1).
   * Defaults to 0.2.
   */
  opacity?: number;
  /**
   * CSS Mix Blend Mode.
   * Defaults to "hard-light".
   */
  className?: string;
}

/**
 * A reusable component that adds a premium "grain" or "paper" texture overlay.
 * Best used as an absolute child of a container with overflow-hidden.
 * 
 * Performance Optimized: Uses a tiny inline SVG noise pattern if no URL is specified,
 * resulting in 0kb additional transfer and sub-millisecond rendering.
 */
export function TextureOverlay({ 
  url, 
  opacity = 0.2, 
  className 
}: TextureOverlayProps) {
  // SVG Noise Data URI - Pure, high-performance "premium" grain.
  const svgNoise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.80' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none select-none mix-blend-hard-light",
        className
      )}
      style={{ 
        backgroundImage: url ? `url("${url}")` : svgNoise, 
        backgroundSize: url ? "cover" : "200px 200px", 
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        opacity: opacity,
        // Using isolation to ensure the mix-blend-mode interacts correctly with siblings
        isolation: "isolate"
      }}
      aria-hidden="true"
    />
  );
}
