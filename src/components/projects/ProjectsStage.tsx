"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TextureOverlay } from "@/components/ui/visuals/TextureOverlay";


type ProjectsStageProps = {
  images: string[];
  imageAlt: string;
  textureUrl: string;
};

export function ProjectsStage({ images, imageAlt, textureUrl }: ProjectsStageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [direction, setDirection] = useState(0);


  // Reset index when images change (e.g., when switching projects)
  useEffect(() => {
    setCurrentIndex(0);
    setImageLoaded(false);
    setImageError(false);
  }, [images]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setImageLoaded(false);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setImageLoaded(false);
  };

  const currentImageUrl = images[currentIndex];

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

      <div className="absolute right-0 top-[0%] bottom-[0%] w-full md:w-[60%] lg:w-[57%] z-10 flex items-center justify-center p-6 md:p-12 lg:pr-24 lg:pl-0">
        {!imageError ? (
          <div className="relative aspect-[16/10] w-full shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden border border-white/10 group bg-gray-900/20">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${currentImageUrl}-${currentIndex}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={currentImageUrl}
                  alt={`${imageAlt} - ${currentIndex + 1}`}
                  fill
                  priority
                  unoptimized={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 55vw"
                  className={clsx(
                    "object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  )}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    console.error(`Failed to load image: ${currentImageUrl}`);
                    setImageError(true);
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Overlay shadow for arrows */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />



            {/* Arrow Navigation */}
            {images.length > 1 && (
              <div className="contents">
           
                  <button
                    onClick={handlePrev}
                    className="show-default-cursor mouse-pointer absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/10 text-white hover:text-white transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 flex items-center justify-center shadow-xl"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="show-default-cursor mouse-pointer absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-xl border border-white/10 text-white hover:text-white transition-all duration-300 translate-x-[10px] group-hover:translate-x-0 flex items-center justify-center shadow-xl"
                    aria-label="Next image"
                  >
                    <ChevronRight size={22} />
                  </button>
                

                {/* Pagination Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 items-center">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      className="show-default-cursor p-1 group/dot"
                    >
                      <div
                        className={clsx(
                          "h-1.5 rounded-full transition-all duration-500",
                          idx === currentIndex ? "w-8 bg-white" : "w-1.5 bg-white/30 group-hover/dot:bg-white/60"
                        )}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none z-30 rounded-2xl" />
          </div>
        ) : (
          <div className="aspect-[16/11.5] w-full flex items-center justify-center bg-gray-900/40 backdrop-blur-md rounded-2xl border border-white/5">
            <div className="text-center">
              <p className="text-gray-500 text-sm">Image unavailable</p>
              <p className="text-gray-600 text-xs mt-1">{imageAlt}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
