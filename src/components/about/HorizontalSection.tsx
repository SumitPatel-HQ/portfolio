"use client";

import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CARDS } from "@/data/what-I-build";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DURATION = 0.5;
/** Minimum ms between slide advances — prevents accidental double-skip on fast wheels */
const THROTTLE_MS = 800;

const HorizontalSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const slidesRef   = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  /** Ref-shadowed so callbacks always read the latest value without re-registration */
  const activeSlideRef = useRef(0);
  /** Whether the wheel hijack is active (desktop only, set by ScrollTrigger) */
  const hijackActiveRef = useRef(false);
  /** Timestamp of the last slide change — used for throttling */
  const lastChangeRef = useRef(0);
  /** Whether a transition animation is in flight */
  const animatingRef = useRef(false);

  // ─── Slide transition ────────────────────────────────────────────────────────
  const transitionSlide = useCallback((outIndex: number, inIndex: number) => {
    const isNext   = inIndex > outIndex;
    const outSlide = slidesRef.current[outIndex];
    const inSlide  = slidesRef.current[inIndex];
    if (!outSlide || !inSlide) return;

    // Collect stagger targets — filter nulls so GSAP doesn't warn
    const headline = inSlide.querySelector(".slide-headline");
    const bullets  = Array.from(inSlide.querySelectorAll(".slide-bullet")).filter(Boolean);
    const pills    = Array.from(inSlide.querySelectorAll(".slide-pill")).filter(Boolean);
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

    // Progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: inIndex / (CARDS.length - 1),
        duration: DURATION,
        ease: EASE,
      });
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

      // ── Desktop: pin + wheel hijack ────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        // Initial state — slide 0 visible, rest hidden
        slidesRef.current.forEach((slide, i) => {
          if (!slide) return;
          gsap.set(slide, {
            opacity:       i === 0 ? 1 : 0,
            xPercent:      i === 0 ? 0 : 4,
            pointerEvents: i === 0 ? "auto" : "none",
            zIndex:        i === 0 ? 10 : 1,
          });
        });

        // Initialize progress bar to 0
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleX: 0 });
        }

        // Pin the section for the duration of all slides.
        // We don't use scrub/snap — just pinning so the section sticks while
        // the wheel handler controls which slide is shown.
        const totalScrollHeight = window.innerHeight * (CARDS.length - 1);

        ScrollTrigger.create({
          id: "horizontalPin",
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalScrollHeight}`,
          pin: true,
          // onToggle fires when the section enters / leaves the viewport
          onToggle: (self) => {
            hijackActiveRef.current = self.isActive;
          },
          // onLeave / onLeaveBack: make sure we're on the correct boundary slide
          onLeave: () => {
            // Ensure we are fully on the last slide when leaving downward
            if (activeSlideRef.current < CARDS.length - 1) {
              goToSlide(CARDS.length - 1);
            }
          },
          onLeaveBack: () => {
            // Ensure we are fully on the first slide when leaving upward
            if (activeSlideRef.current > 0) {
              goToSlide(0);
            }
          },
        });

        // ── Wheel hijack ──────────────────────────────────────────────────────
        const handleWheel = (e: WheelEvent) => {
          if (!hijackActiveRef.current) return;

          const now     = Date.now();
          const current = activeSlideRef.current;

          // Scrolling down — advance
          if (e.deltaY > 0) {
            if (current < CARDS.length - 1) {
              e.preventDefault();
              if (animatingRef.current) return;           // mid-transition: ignore
              if (now - lastChangeRef.current < THROTTLE_MS) return; // throttle
              goToSlide(current + 1);
            }
            // On the last slide, let the event fall through so the
            // page naturally scrolls past this section.
          }

          // Scrolling up — retreat
          if (e.deltaY < 0) {
            if (current > 0) {
              e.preventDefault();
              if (animatingRef.current) return;
              if (now - lastChangeRef.current < THROTTLE_MS) return;
              goToSlide(current - 1);
            }
            // On the first slide, let the event fall through upward.
          }
        };

        // Must be non-passive so we can call preventDefault
        window.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
          window.removeEventListener("wheel", handleWheel);
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
            onEnter: ()     => setActiveSlide(i),
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
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Only act when the section is at least partially in view
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const current = activeSlideRef.current;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (e.key === "ArrowRight") e.preventDefault();
        if (current < CARDS.length - 1) scrollToSlide(current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (e.key === "ArrowLeft") e.preventDefault();
        if (current > 0) scrollToSlide(current - 1);
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
      {/* Progress line — teal, 0→100% as slides advance */}
      <div
        ref={progressRef}
        className="hidden md:block absolute bottom-0 left-0 h-[2px] bg-accent z-50 origin-left w-full"
        style={{ transform: "scaleX(0)" }}
      />

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
              <div className="text-accent tracking-[0.15em] text-[11px] font-bold mb-4 md:mb-6 uppercase">
                {card.id} / 0{CARDS.length}
              </div>

              <h2
                style={{ fontSize: "clamp(2rem, 3vw, 3.2rem)" }}
                className="font-bold text-white leading-[1.1] mb-6 slide-headline"
              >
                {card.title}
              </h2>

              <div className="flex flex-col gap-3 md:gap-4 mb-7 md:mb-[1.75rem]">
                {card.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start slide-bullet">
                    <span className="text-accent mr-3 mt-[2px] leading-none text-[1.1rem]">→</span>
                    <span
                      className="text-white/60 font-medium"
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
                    className="slide-pill border border-white/15 rounded-full px-[12px] py-[4px] text-[11px] tracking-[0.1em] text-white/50 bg-transparent uppercase font-bold"
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 gap-3 z-30 hidden md:flex">
        {CARDS.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[3px] rounded-[2px] transition-all duration-300 ${
              activeSlide === i
                ? "bg-accent w-[20px] shadow-[0_0_10px_rgba(0,212,212,0.3)]"
                : "bg-white/15 w-[6px] hover:bg-white/30"
            }`}
            onClick={(e) => { e.preventDefault(); scrollToSlide(i); }}
          />
        ))}
      </div>
    </section>
  );
};

export default HorizontalSection;
