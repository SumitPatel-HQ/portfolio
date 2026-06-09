"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { TextureOverlay } from "@/components/ui/visuals/TextureOverlay";
import { PROJECTS_TEXTURE_IMAGE } from "@/data/projects.data";

export function MobileBackground() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <motion.div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
      style={{ opacity }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(140% 90% at 100% 0%, var(--accent-faded), transparent 85%),
            radial-gradient(95% 60% at 86% 62%, rgba(0, 0, 0, 0.4), transparent 74%),
            linear-gradient(110deg, color-mix(in srgb, var(--background) 90%, transparent) 24%, color-mix(in srgb, var(--background) 70%, transparent) 48%, color-mix(in srgb, var(--background) 90%, transparent) 100%)
          `,
        }}
      />
      {/* Mask the texture so it's only visible where the top-right gradient is */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          WebkitMaskImage: `radial-gradient(140% 90% at 100% 0%, black, transparent 85%)`,
          maskImage: `radial-gradient(140% 90% at 100% 0%, black, transparent 85%)`,
        }}
      >
        <TextureOverlay url={PROJECTS_TEXTURE_IMAGE} opacity={0.15} />
      </div>
    </motion.div>
  );
}
