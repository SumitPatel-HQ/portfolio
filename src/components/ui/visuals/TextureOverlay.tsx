"use client";

import { cn } from "@/lib/utils";

interface TextureOverlayProps {
  /**
   * Optional image URL for the texture. 
   * Defaults to a grain/paper texture if not provided.
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
 */
export function TextureOverlay({ 
  url, 
  opacity = 0.2, 
  className 
}: TextureOverlayProps) {
  // If no URL is provided, you might want a default local asset or a static Figma asset
  // For now, I'll keep it flexible via props.
  if (!url) return null;

  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none select-none mix-blend-hard-light",
        className
      )}
      style={{ 
        backgroundImage: `url("${url}")`, 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        opacity: opacity
      }}
      aria-hidden="true"
    />
  );
}
