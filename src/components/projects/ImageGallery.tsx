"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import {
  Carousel,
  Slider,
  SliderContainer,
  SliderNextButton,
  SliderPrevButton,
  useCarousel,
} from "@/components/ui/carousel";
import type { EmblaOptionsType } from "embla-carousel";
import { SlideDotIndicators } from "@/components/ui/SlideDotIndicators";

interface ImageGalleryProps {
  images: string[];
  imageAlt: string;
  projectId?: number | string;
}

function CarouselPagination({ count, isResetting }: { count: number; isResetting?: boolean }) {
  const { selectedIndex, scrollTo } = useCarousel();
  return (
    <SlideDotIndicators
      count={count}
      activeIndex={selectedIndex}
      onSelect={scrollTo}
      className="!bottom-6 !left-1/2 !-translate-x-1/2 z-40 !flex"
      isResetting={isResetting}
    />
  );
}

function CarouselReset({
  resetKey,
  onResetStart
}: {
  resetKey: string;
  onResetStart?: () => void;
}) {
  const { scrollTo } = useCarousel();

  useEffect(() => {
    // Notify parent that reset is starting
    if (onResetStart) onResetStart();
    // Jump instantly to slide 0 when the project (images) changes
    scrollTo(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey, scrollTo]);

  return null;
}

function CarouselNavigation() {
  const { selectedIndex } = useCarousel();

  return (
    <div className="show-default-cursor pointer-events-auto">
      {selectedIndex > 0 && (
        <SliderPrevButton className="pointer-events-auto show-default-cursor absolute left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-xs border border-white/10 text-white hover:text-white transition-all duration-300 flex items-center justify-center shadow-xl disabled:opacity-20 focus:outline-none focus-visible:ring-0">
          <ChevronLeft size={22} />
        </SliderPrevButton>
      )}
      <SliderNextButton className="pointer-events-auto show-default-cursor absolute right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-xs border border-white/10 text-white hover:text-white transition-all duration-300 flex items-center justify-center shadow-xl disabled:opacity-20 focus:outline-none focus-visible:ring-0">
        <ChevronRight size={22} />
      </SliderNextButton>
    </div>
  );
}

// Wait for image decode before revealing (CR-3: Added safety timeout)
const waitForImageDecode = async (url: string): Promise<void> => {
  return new Promise((resolve) => {
    // Safety timeout - always resolve after 2 seconds to prevent deadlock
    const timeoutId = setTimeout(() => {
      console.warn(`Image decode timeout for: ${url}`);
      resolve();
    }, 2000);

    const img: HTMLImageElement = new window.Image();
    img.src = url;

    // Always set onload/onerror as backup handlers
    img.onload = () => {
      clearTimeout(timeoutId);
      resolve();
    };
    img.onerror = () => {
      clearTimeout(timeoutId);
      resolve();
    };

    // Attempt decode if supported, with fallback to onload
    if ('decode' in img && typeof img.decode === 'function') {
      img.decode()
        .then(() => {
          clearTimeout(timeoutId);
          resolve();
        })
        .catch(() => {
          clearTimeout(timeoutId);
          resolve();
        });
    }
  });
};

export function ImageGallery({ images, imageAlt, projectId }: ImageGalleryProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [imagesDecoded, setImagesDecoded] = useState<Record<number, boolean>>({});
  const [isResetting, setIsResetting] = useState(false); // Bug 1: Track carousel reset

  const OPTIONS: EmblaOptionsType = { loop: true };

  // Clear isResetting after reset completes
  useEffect(() => {
    if (isResetting) {
      const timer = setTimeout(() => {
        setIsResetting(false);
      }, 50); // One frame delay to allow instant jump
      return () => clearTimeout(timer);
    }
  }, [isResetting]);


  // Empty state - no images
  if (images.length === 0) {
    return (
      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-gray-900/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <ImageOff className="w-12 h-12 text-white/30" />
            <p className="text-white/40 text-sm">No images available</p>
            <p className="text-white/20 text-xs">{imageAlt}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-[14/9] w-full shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] rounded-xl overflow-hidden border border-white/10 group bg-gray-900/20">
      <Carousel options={OPTIONS} className="w-full h-full">
        <CarouselReset
          resetKey={projectId !== undefined ? String(projectId) : images.join(',')}
          onResetStart={() => setIsResetting(true)}
        />
        <SliderContainer className="w-full h-full">
          {images.map((currentImageUrl, currentIndex) => {
            const hasError = imageErrors[currentIndex];
            const isLoaded = imagesLoaded[currentIndex];
            const isDecoded = imagesDecoded[currentIndex];
            const showImage = isLoaded && isDecoded;

            return (
              <Slider key={`${currentImageUrl}-${currentIndex}`} className="w-full h-full relative ">
                {!hasError ? (
                  <Image
                    src={currentImageUrl}
                    alt={`${imageAlt} - ${currentIndex + 1}`}
                    fill
                    priority={currentIndex === 0}
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 55vw "
                    className={clsx(
                      "object-cover object-center  ",
                      showImage ? "opacity-100 scale-100 " : "opacity-0 scale-105 "
                    )}
                    style={{
                      transition: 'opacity 720ms cubic-bezier(0.32, 0.72, 0, 1), transform 720ms cubic-bezier(0.32, 0.72, 0, 1)',
                    }}
                    onLoad={() => {
                      setImagesLoaded((prev) => ({ ...prev, [currentIndex]: true }));
                      // Wait for decode before revealing
                      waitForImageDecode(currentImageUrl).then(() => {
                        setImagesDecoded((prev) => ({ ...prev, [currentIndex]: true }));
                      });
                    }}
                    onError={() => {
                      console.error(`Failed to load image: ${currentImageUrl}`);
                      setImageErrors((prev) => ({ ...prev, [currentIndex]: true }));
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center ">
                    <div className="text-center">
                      <p className="text-gray-500 text-sm">Image unavailable</p>
                      <p className="text-gray-600 text-xs mt-1">{imageAlt}</p>
                    </div>
                  </div>
                )}
              </Slider>
            );
          })}
        </SliderContainer>

        {/* Navigation controls */}
        {images.length > 1 && (
          <>
            <CarouselNavigation />

            {/* Pagination dots */}
            <CarouselPagination count={images.length} isResetting={isResetting} />
          </>
        )}
      </Carousel>

      {/* Enhanced Persistent Vignette - Outside carousel for guaranteed overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/50" />
      </div>

      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none z-30 rounded-xl" />
    </div>
  );
}
