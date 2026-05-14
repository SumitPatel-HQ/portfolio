"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { TextureOverlay } from "@/components/ui/visuals/TextureOverlay";

type ProjectsStageProps = {
  imageUrl: string;
  imageAlt: string;
  textureUrl: string;
};

export function ProjectsStage({ imageUrl, imageAlt, textureUrl }: ProjectsStageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      {/* Background Gradients (Behind everything) */}
      <div
        className="absolute inset-0 z-0 opacity-60"
        style={{
          background: `
            radial-gradient(80% 55% at 38% 52%, var(--accent-faded), transparent 72%),
            radial-gradient(95% 60% at 86% 62%, rgba(0, 0, 0, 0.4), transparent 74%),
            linear-gradient(110deg, color-mix(in srgb, var(--background) 90%, transparent) 24%, color-mix(in srgb, var(--background) 70%, transparent) 48%, color-mix(in srgb, var(--background) 90%, transparent) 100%)
          `
        }}
      />
      <TextureOverlay url={textureUrl} opacity={0.15} />

      <AnimatePresence mode="wait">
        <motion.div
          key={imageUrl}
          className="absolute right-0 top-[0%] bottom-[0%] w-full md:w-[60%] lg:w-[57%] z-10 flex items-center justify-center p-6 md:p-12 lg:pr-24 lg:pl-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {!imageError ? (
            <div className="relative aspect-[16/10] w-full shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                unoptimized={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 55vw"
                className={clsx(
                  "object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  imageLoaded ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-105 translate-x-[30px]"
                )}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  console.error(`Failed to load image: ${imageUrl}`);
                  setImageError(true);
                }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          ) : (
            <div className="aspect-[16/11.5] w-full flex items-center justify-center bg-gray-900/40 backdrop-blur-md rounded-2xl border border-white/5">
              <div className="text-center">
                <p className="text-gray-500 text-sm">Image unavailable</p>
                <p className="text-gray-600 text-xs mt-1">{imageAlt}</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
