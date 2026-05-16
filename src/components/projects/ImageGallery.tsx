"use client";

import { useState } from "react";
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
}

function CarouselPagination({ count }: { count: number }) {
  const { selectedIndex, scrollTo } = useCarousel();
  return (
    <SlideDotIndicators
      count={count}
      activeIndex={selectedIndex}
      onSelect={scrollTo}
      className="!bottom-6 !left-1/2 !-translate-x-1/2 z-40 !flex"
    />
  );
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

export function ImageGallery({ images, imageAlt }: ImageGalleryProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});

  const OPTIONS: EmblaOptionsType = { loop: true };


  // Empty state - no images
  if (images.length === 0) {
    return (
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 bg-gray-900/20">
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
    <div className="relative aspect-[16/10] w-full shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] rounded-2xl overflow-hidden border border-white/10 group bg-gray-900/20">
      <Carousel options={OPTIONS} className="w-full h-full">
        <SliderContainer className="w-full h-full">
          {images.map((currentImageUrl, currentIndex) => {
            const hasError = imageErrors[currentIndex];
            const isLoaded = imagesLoaded[currentIndex];

            return (
              <Slider key={`${currentImageUrl}-${currentIndex}`} className="w-full h-full relative">
                {!hasError ? (
                  <Image
                    src={currentImageUrl}
                    alt={`${imageAlt} - ${currentIndex + 1}`}
                    fill
                    priority={currentIndex === 0}
                    unoptimized={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 55vw"
                    className={clsx(
                      "object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
                      isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    )}
                    onLoad={() =>
                      setImagesLoaded((prev) => ({ ...prev, [currentIndex]: true }))
                    }
                    onError={() => {
                      console.error(`Failed to load image: ${currentImageUrl}`);
                      setImageErrors((prev) => ({ ...prev, [currentIndex]: true }));
                    }}
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
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
            <CarouselPagination count={images.length} />
          </>
        )}
      </Carousel>
      
      {/* Enhanced Persistent Vignette - Outside carousel for guaranteed overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.3)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/50" />
      </div>

      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none z-30 rounded-2xl" />
    </div>
  );
}
