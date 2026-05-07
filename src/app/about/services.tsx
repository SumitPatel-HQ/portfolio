"use client";

import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARDS } from "@/data/what-I-build";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = 0.5;
/** Minimum ms between slide advances — reduced for responsive keyboard/clicks */
const THROTTLE_MS = 250;

const Services = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const [activeSlide, setActiveSlide] = useState(0);
  /** Ref-shadowed so callbacks always read the latest value without re-registration */
  const activeSlideRef = useRef(0);
  /** Timestamp of the last slide change — used for throttling */
  const lastChangeRef = useRef(0);
  /** Whether a transition animation is in flight */
  const animatingRef = useRef(false);

  // ─── Slide transition ────────────────────────────────────────────────────────
  const transitionSlide = useCallback((outIndex: number, inIndex: number) => {
    const isNext = inIndex > outIndex;
    const outSlide = slidesRef.current[outIndex];
    const inSlide = slidesRef.current[inIndex];
    if (!outSlide || !inSlide) return;

    // Collect stagger targets — filter nulls so GSAP doesn't warn
    const headline = inSlide.querySelector(".slide-headline");
    const bullets = Array.from(inSlide.querySelectorAll(".slide-bullet")).filter(Boolean);
    const pills = Array.from(inSlide.querySelectorAll(".slide-pill")).filter(Boolean);
    const staggerTargets = [headline, ...bullets, ...pills].filter(Boolean);

    gsap.killTweensOf([outSlide, inSlide, ...staggerTargets]);

    animatingRef.current = true;

    // Out
    gsap.to(outSlide, {
      xPercent: isNext ? -4 : 4,
      opacity: 0,
      duration: DURATION,
      ease: EASE,
      onComplete: () => {
        gsap.set(outSlide, { pointerEvents: "none", zIndex: 1 });
      },
    });

    // In
    gsap.set(inSlide, { zIndex: 10, pointerEvents: "auto" });
    gsap.fromTo(
      inSlide,
      { xPercent: isNext ? 4 : -4, opacity: 0 },
      {
        xPercent: 0,
        opacity: 1,
        duration: DURATION,
        ease: EASE,
        onComplete: () => { animatingRef.current = false; },
      }
    );

    // Staggered content entrance
    if (staggerTargets.length > 0) {
      gsap.fromTo(
        staggerTargets,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: DURATION, ease: EASE, stagger: 0.08 }
      );
    }

  }, []);

  // ─── Advance / retreat slide ─────────────────────────────────────────────────
  const goToSlide = useCallback(
    (next: number) => {
      const current = activeSlideRef.current;
      next = Math.max(0, Math.min(CARDS.length - 1, next));
      if (next === current) return;

      lastChangeRef.current = Date.now();
      transitionSlide(current, next);
      activeSlideRef.current = next;
      setActiveSlide(next);
    },
    [transitionSlide]
  );

  // ─── GSAP setup (layout effect — runs once) ───────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop: absolute stacking ────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        // Initial state — slide 0 visible, rest hidden
        slidesRef.current.forEach((slide, i) => {
          if (!slide) return;
          gsap.set(slide, {
            opacity: i === 0 ? 1 : 0,
            xPercent: i === 0 ? 0 : 4,
            pointerEvents: i === 0 ? "auto" : "none",
            zIndex: i === 0 ? 10 : 1,
          });
        });

        return () => {
          slidesRef.current.forEach((slide) => {
            if (slide) gsap.set(slide, { clearProps: "all" });
          });
        };
      });

      // ── Mobile: normal scroll, just track active slide for dots ────────────
      mm.add("(max-width: 767px)", () => {
        slidesRef.current.forEach((slide, i) => {
          if (!slide) return;
          ScrollTrigger.create({
            trigger: slide,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSlide(i),
            onEnterBack: () => setActiveSlide(i),
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [goToSlide]);

  // ─── Dot / keyboard: scroll to a specific slide ───────────────────────────
  const scrollToSlide = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return;
      if (window.innerWidth >= 768) {
        // Advance or retreat by repeatedly calling goToSlide.
        // For direct jumps from dots, skip intermediate transitions.
        const current = activeSlideRef.current;
        if (index === current) return;
        const now = Date.now();
        if (now - lastChangeRef.current < THROTTLE_MS && Math.abs(index - current) === 1) return;
        goToSlide(index);
      } else {
        const slide = slidesRef.current[index];
        if (slide) slide.scrollIntoView({ behavior: "smooth" });
      }
    },
    [goToSlide]
  );

  // ─── Keyboard navigation ──────────────────────────────────────────────────
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable)) {
        return;
      }

      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Only act when the section is predominantly in view
      if (rect.top > window.innerHeight * 0.5 || rect.bottom < window.innerHeight * 0.5) return;

      const current = activeSlideRef.current;

      if (e.key === "ArrowRight") {
        if (current < CARDS.length - 1) {
          e.preventDefault();
          scrollToSlide(current + 1);
        }
      } else if (e.key === "ArrowLeft") {
        if (current > 0) {
          e.preventDefault();
          scrollToSlide(current - 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // scrollToSlide is stable (useCallback with stable deps), so this only
    // registers once — no stale closure on activeSlide.
  }, [scrollToSlide]);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      ref={containerRef}
      className="relative bg-[#0a0a0a] min-h-screen z-10"
    >
      {/* Navigation Arrows */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-4 md:px-6 z-40 pointer-events-none">
        <button
          onClick={(e) => { e.preventDefault(); scrollToSlide(activeSlide - 1); }}
          disabled={activeSlide === 0}
          aria-label="Previous slide"
          className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); scrollToSlide(activeSlide + 1); }}
          disabled={activeSlide === CARDS.length - 1}
          aria-label="Next slide"
          className="pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-full md:h-screen md:overflow-hidden flex flex-col md:block"
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => { slidesRef.current[i] = el; }}
            data-slide={i + 1}
            /**
             * On desktop all slides are absolutely stacked; the initial
             * opacity/position are set immediately by GSAP in useLayoutEffect.
             * We purposely do NOT add an `md:opacity-0` Tailwind class here —
             * doing so causes a FOUC flash before JS runs because the first slide
             * should start at opacity 1.  GSAP sets the initial state for all
             * slides (including hiding slides 1-6) synchronously in useLayoutEffect.
             */
            className="slide-container md:absolute md:inset-0 w-full flex flex-col md:grid md:grid-cols-2 md:gap-x-[clamp(2rem,4vw,5rem)] border-b border-white/5 md:border-none"
          >
            {/* LEFT: Content */}
            <div className="flex flex-col justify-center px-8 md:px-0 md:pl-[clamp(3rem,6vw,7rem)] py-16 md:py-0 w-full h-auto md:h-full text-left order-1">
              <div className="text-accent tracking-[0.15em] text-[11px] font-bold mb-4 md:mb-6 uppercase ml-[2px]">
                {card.id} / 0{CARDS.length}
              </div>

              <h2
                style={{ fontSize: "clamp(2rem, 3vw, 3.2rem)" }}
                className="font-bold text-white leading-[1.1] tracking-tight mb-6 slide-headline"
              >
                {card.title}
              </h2>

              <div className="flex flex-col gap-4 md:gap-6 mb-7 md:mb-[1.75rem]">
                {card.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start slide-bullet">
                    <Check className="text-accent mr-3 mt-[6px] w-[14px] h-[14px] flex-shrink-0" strokeWidth={2} />
                    <span
                      className="text-white/60 font-normal"
                      style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", lineHeight: "1.8" }}
                    >
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-[8px]">
                {card.tags.map((tag, idx) => (
                  <span
                    key={idx}
                   className="inline-flex items-center rounded-full border border-white/10 hover:border-accent transition-colors duration-300 bg-foreground-secondary/10 px-3.5 py-1.5 text-[clamp(0.8rem,1.1vw,0.95rem)] font-extralight text-foreground-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] backdrop-blur-[2px] cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* RIGHT: Screenshot placeholder */}
            <div className="flex items-center justify-center px-8 md:px-0 md:pr-[clamp(3rem,6vw,7rem)] order-2 pb-16 md:pb-0 h-auto md:h-full">
              <div className="w-full slide-screenshot bg-white/[0.04] border border-white/[0.08] rounded-[12px] flex items-center justify-center overflow-hidden aspect-[16/9] md:aspect-[16/10]">
                <span className="text-white/20 text-[13px] font-medium tracking-wide">
                  Screenshot coming soon
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30 hidden md:flex items-center">
        {CARDS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[8px] rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              activeSlide === i 
                ? "w-[24px] bg-accent shadow-[0_0_8px_rgba(0,212,212,0.3)] cursor-auto" 
                : "w-[8px] bg-white/40 hover:bg-white/60 cursor-pointer"
            }`}
            onClick={(e) => {
              e.preventDefault();
              if (activeSlide !== i) {
                scrollToSlide(i);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
