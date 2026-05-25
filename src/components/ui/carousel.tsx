'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { EmblaOptionsType } from 'embla-carousel';
// import { cn } from '@/lib/utils';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cnUtils(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type CarouselContextType = {
  emblaRef: UseEmblaCarouselType[0];
  emblaApi: UseEmblaCarouselType[1] | undefined;
  selectedIndex: number;
  scrollSnaps: number[];
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number, jump?: boolean) => void;
};

const CarouselContext = createContext<CarouselContextType | null>(null);

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a CarouselProvider');
  }
  return context;
};

interface CarouselProps {
  children: React.ReactNode;
  options?: EmblaOptionsType;
  className?: string;
}

export function Carousel({ children, options, className }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number, jump?: boolean) => {
      if (emblaApi) emblaApi.scrollTo(index, jump);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: NonNullable<UseEmblaCarouselType[1]>) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: NonNullable<UseEmblaCarouselType[1]>) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
    
    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        emblaRef,
        emblaApi,
        selectedIndex,
        scrollSnaps,
        canScrollPrev,
        canScrollNext,
        scrollPrev,
        scrollNext,
        scrollTo,
      }}
    >
      <div className={cnUtils('relative', className)}>{children}</div>
    </CarouselContext.Provider>
  );
}

export function SliderContainer({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { emblaRef } = useCarousel();
  return (
    <div className={cnUtils('overflow-hidden', className)} ref={emblaRef}>
      <div className="flex touch-pan-y flex-row h-full">{children}</div>
    </div>
  );
}

export function Slider({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cnUtils(
        'min-w-0 flex-[0_0_100%] h-full relative',
        className
      )}
    >
      {children}
    </div>
  );
}

export function SliderPrevButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <button
      className={cnUtils(
        'transition-opacity disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        scrollPrev();
      }}
      disabled={!canScrollPrev}
      aria-label="Previous slide"
    >
      {children}
    </button>
  );
}

export function SliderNextButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <button
      className={cnUtils(
        'transition-opacity disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      onClick={(e) => {
        e.stopPropagation();
        scrollNext();
      }}
      disabled={!canScrollNext}
      aria-label="Next slide"
    >
      {children}
    </button>
  );
}

export function SliderDotButton({ className }: { className?: string }) {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();

  if (scrollSnaps.length <= 1) return null;

  return (
    <div className={cnUtils('flex gap-2 items-center', className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          onClick={(e) => {
            e.stopPropagation();
            scrollTo(index);
          }}
          aria-label={`Slide ${index + 1}`}
          className={cnUtils(
            'w-2 h-2 rounded-full transition-all duration-300',
            index === selectedIndex
              ? 'bg-white w-6'
              : 'bg-white/40 hover:bg-white/70'
          )}
        />
      ))}
    </div>
  );
}
