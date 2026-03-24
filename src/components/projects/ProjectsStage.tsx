"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TextureOverlay } from "@/components/ui/visuals/TextureOverlay";

type ProjectsStageProps = {
  imageUrl: string;
  imageAlt: string;
  textureUrl: string;
};

export function ProjectsStage({ imageUrl, imageAlt, textureUrl }: ProjectsStageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={imageUrl}
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0.12, scale: 1.05, x: 10 }}
          animate={{ opacity: 0.36, scale: 1, x: 0 }}
          exit={{ opacity: 0.12, scale: 0.98, x: -10 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        />
      </AnimatePresence>
      <div 
        className="absolute inset-0" 
        style={{
          background: `
            radial-gradient(80% 55% at 38% 52%, var(--accent-faded), transparent 72%),
            radial-gradient(95% 60% at 86% 62%, rgba(0, 0, 0, 0.52), transparent 74%),
            linear-gradient(110deg, color-mix(in srgb, var(--background) 80%, transparent) 24%, color-mix(in srgb, var(--background) 60%, transparent) 48%, color-mix(in srgb, var(--background) 80%, transparent) 100%)
          `
        }}
      />
      <TextureOverlay url={textureUrl} opacity={0.2} />
    </div>
  );
}

