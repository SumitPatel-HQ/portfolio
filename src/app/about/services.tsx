"use client";

import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARDS } from "@/data/what-I-build";
import { SlideDotIndicators } from "@/components/ui/SlideDotIndicators";
import { ServiceGraphic } from "@/components/ui/ServiceGraphic";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

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

  const prevSlideRef = useRef<number | null>(null);
  const [renderedPrev, setRenderedPrev] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setRenderedPrev(prevSlideRef.current);
    prevSlideRef.current = activeSlide;
    const timer = setTimeout(() => setRenderedPrev(null), DURATION * 1000);
    return () => clearTimeout(timer);
  }, [activeSlide]);

  // ─── Slide transition ────────────────────────────────────────────────────────
  const transitionSlide = useCallback((outIndex: number, inIndex: number) => {
    const outSlide = slidesRef.current[outIndex];
    const inSlide = slidesRef.current[inIndex];
    if (!outSlide || !inSlide) return;

    gsap.killTweensOf([outSlide, inSlide]);

    animatingRef.current = true;

    // Out
    gsap.to(outSlide, {
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
      { opacity: 0 },
      {
        opacity: 1,
        duration: DURATION,
        ease: EASE,
        onComplete: () => { animatingRef.current = false; },
      }
    );

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
      className="relative bg-background min-h-screen z-10"
    >
      {/* Navigation Arrows */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-4 md:px-8 lg:px-6 z-40 pointer-events-none">
        <button
          onClick={(e) => { e.preventDefault(); scrollToSlide(activeSlide - 1); }}
          disabled={activeSlide === 0}
          aria-label="Previous slide"
          className="pointer-events-auto flex items-center justify-center w-16 h-16 lg:w-12 lg:h-12 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm"
        >
          <ChevronLeft className="w-8 h-8 lg:w-6 lg:h-6" />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); scrollToSlide(activeSlide + 1); }}
          disabled={activeSlide === CARDS.length - 1}
          aria-label="Next slide"
          className="pointer-events-auto flex items-center justify-center w-16 h-16 lg:w-12 lg:h-12 rounded-full bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none backdrop-blur-sm"
        >
          <ChevronRight className="w-8 h-8 lg:w-6 lg:h-6" />
        </button>
      </div>

      {/* Slide wrapper */}
      <div
        ref={wrapperRef}
        className="relative w-full md:h-screen md:overflow-hidden flex flex-col md:block"
      >
        {CARDS.map((card, i) => {
          const isSlideActive = isMobile ? undefined : (activeSlide === i || renderedPrev === i);
          return (
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
              className="slide-container md:absolute md:inset-0 w-full flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-[clamp(2rem,4vw,5rem)] border-b border-white/5 md:border-none"
            >
              {/* Content */}
              <div className="flex flex-col justify-center px-8 md:px-16 lg:px-0 lg:pl-[clamp(3rem,6vw,7rem)] py-16 md:py-6 lg:py-0 w-full h-auto  lg:h-full text-left order-1 md:order-2 lg:order-1">
                <ScrollReveal
                  as={motion.div}
                  trigger={isSlideActive}
                  containerClassName="my-0 mb-4 md:mb-3 lg:mb-6 ml-[2px]"
                  textClassName="text-accent tracking-[0.15em] text-[11px] md:text-[15px] lg:text-[11px] font-bold uppercase"
                  size="none"
                  align="none"
                  variant="none"
                  baseOpacity={0}
                  blurStrength={2}
                  delay={0}
                >
                  {`${card.id} / 0${CARDS.length}`}
                </ScrollReveal>

                <ScrollReveal
                  as={motion.h2}
                  trigger={isSlideActive}
                  containerClassName="my-0 mb-5 md:mb-4 lg:mb-6"
                  textClassName="font-bold text-white leading-[1.1] tracking-tight text-[clamp(2rem,3vw,3.2rem)] md:text-[4.25rem] lg:text-[clamp(2rem,3vw,3.2rem)]"
                  size="none"
                  align="none"
                  variant="none"
                  baseOpacity={0}
                  blurStrength={4}
                  staggerDelay={0.04}
                >
                  {card.title}
                </ScrollReveal>

                <div className="flex flex-col gap-4 md:gap-6 lg:gap-6 mb-7 md:mb-4 lg:mb-[1.75rem]">
                  {card.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start">
                      <motion.div
                        initial={{ opacity: 0, filter: "blur(2px)", y: 20 }}
                        animate={isSlideActive ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(2px)", y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 100, mass: 1, duration: 0.8, delay: 0.1 + idx * 0.05 }}
                        className="text-accent mr-3 mt-[6px] lg:mt-[6px] md:mt-[8px] w-[14px] h-[14px] md:w-[18px] md:h-[18px] lg:w-[14px] lg:h-[14px] flex-shrink-0"
                      >
                        <Check className="w-full h-full" strokeWidth={2} />
                      </motion.div>
                      <ScrollReveal
                        as={motion.span}
                        trigger={isSlideActive}
                        containerClassName="my-0 flex-1"
                        textClassName="text-white/60 font-normal text-[clamp(0.9rem,1.2vw,1.05rem)] md:text-[1.35rem] lg:text-[clamp(0.9rem,1.2vw,1.05rem)] md:leading-[1.8] lg:leading-[1.8]"
                        size="none"
                        align="none"
                        variant="none"
                        baseOpacity={0}
                        blurStrength={2}
                        staggerDelay={0.02}
                        delay={0.1 + idx * 0.05}
                      >
                        {bullet}
                      </ScrollReveal>
                    </div>
                  ))}
                </div>

                <ScrollReveal
                  as={motion.div}
                  trigger={isSlideActive}
                  containerClassName="my-0 w-full"
                  textClassName="flex flex-wrap gap-[8px] md:gap-[12px] lg:gap-[8px]"
                  size="none"
                  align="none"
                  variant="none"
                  baseOpacity={0}
                  blurStrength={4}
                  staggerDelay={0.06}
                  delay={0.2}
                >
                  {card.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full border border-white/10 hover:border-accent/20 transition-colors duration-300 bg-foreground-secondary/10 px-3 py-1.5 md:px-5 md:py-2.5 lg:px-3 lg:py-1.5 text-[clamp(0.75rem,1vw,0.85rem)] md:text-[1.05rem] lg:text-[clamp(0.75rem,1vw,0.85rem)] font-extralight text-foreground-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] backdrop-blur-[2px] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </ScrollReveal>
              </div>

              {/* Service Graphic */}
              <div className="flex items-center justify-center px-8 md:px-18 lg:px-0 lg:pr-[clamp(3rem,6vw,7rem)] order-2 md:order-1 lg:order-2 pb-16  md:p-12 md:mt-28 lg:mt-0 lg:pb-0 pt-0  lg:pt-0 h-auto md:min-h-[40vh] lg:h-full w-full">
                <motion.div
                  initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
                  animate={isSlideActive ? { opacity: 1, filter: "blur(0px)", y: 0 } : { opacity: 0, filter: "blur(4px)", y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 100, mass: 1, duration: 0.8, delay: 0.2 }}
                  className="w-full max-w-4xl slide-screenshot rounded-[12px] flex items-center justify-center aspect-[16/9] lg:aspect-[16/10]"
                >
                  <ServiceGraphic id={card.case} />
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <SlideDotIndicators
        count={CARDS.length}
        activeIndex={activeSlide}
        onSelect={scrollToSlide}
      />
    </section>
  );
};

export default Services;
