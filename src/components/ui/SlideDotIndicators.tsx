import React from "react";

interface SlideDotIndicatorsProps {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  className?: string;
}

export function SlideDotIndicators({
  count,
  activeIndex,
  onSelect,
  className,
}: SlideDotIndicatorsProps) {
  if (count <= 1) return null;

  const baseClassName =
    "absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 hidden md:flex items-center";
  const wrapperClassName = className ? `${baseClassName} ${className}` : baseClassName;

  return (
    <div className={wrapperClassName}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          className={`h-[8px] rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus:outline-none focus-visible:ring-0 ${
            activeIndex === i
              ? "w-[24px] bg-accent shadow-[0_0_8px_rgba(0,212,212,0.3)] cursor-auto"
              : "w-[8px] bg-white/40 hover:bg-white/60 cursor-pointer"
          }`}
          onClick={(e) => {
            e.preventDefault();
            if (activeIndex !== i) {
              onSelect(i);
            }
          }}
        />
      ))}
    </div>
  );
}
