"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger if in browser
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    id: "01",
    title: "The Vision",
    description: "Building interfaces that feel like natural extensions of human thought, powered by invisible intelligence.",
    content: "My approach combines architectural precision with fluid motion, creating digital environments that are as functional as they are beautiful.",
  },
  {
    id: "02",
    title: "The Craft",
    description: "Meticulous attention to detail in every line of code and every pixel on the screen.",
    content: "From optimized backend logic to buttery-smooth frontend transitions, I ensure every layer of the stack is polished and performant.",
  },
  {
    id: "03",
    title: "The Future",
    description: "Exploring the boundaries of agentic workflows and AI-driven development.",
    content: "I'm constantly experimenting with new patterns that bridge the gap between complex models and intuitive user experiences.",
  },
  {
    id: "04",
    title: "The Impact",
    description: "Shipping products that solve real problems and empower users to achieve more.",
    content: "Whether it's a cyber defense platform or a personal portfolio, the goal is always to deliver value and delight.",
  },
];

const HorizontalSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const totalWidth = wrapper.scrollWidth;
      const amountToScroll = totalWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${amountToScroll}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal scroll animation
      tl.to(wrapper, {
        x: -amountToScroll,
        ease: "none",
      });

      // Progress bars animation
      const step = 1 / CARDS.length;
      CARDS.forEach((_, i) => {
        const bar = progressRefs.current[i];
        if (bar) {
          gsap.set(bar, { width: "0%" });
          tl.to(bar, {
            width: "100%",
            ease: "none",
            duration: step,
          }, i * step);
        }
      });

      // Reveal animations for each card content
      CARDS.forEach((_, i) => {
        const cardContent = wrapper.querySelector(`.card-content-${i}`);
        if (cardContent) {
          tl.fromTo(cardContent, 
            { opacity: 0, y: 30 },
            { 
              opacity: 1, 
              y: 0, 
              duration: step / 2, 
              ease: "power2.out" 
            }, 
            i * step // Trigger as soon as the card's progress starts
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen bg-[#0a0a0a] overflow-hidden"
    >
      {/* PINNING CONTAINER */}
      <div className="relative h-screen flex items-center">
        {/* CARDS WRAPPER */}
        <div 
          ref={wrapperRef} 
          className="flex flex-nowrap h-full"
        >
          {CARDS.map((card, i) => (
            <div 
              key={card.id} 
              className="relative w-screen h-full flex-shrink-0 flex items-center justify-center p-8 md:p-24"
            >
              {/* ARCHITECTURAL BACKGROUND NUMBER */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
                style={{
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
                  color: "transparent",
                }}
              >
                <span className="text-[20rem] md:text-[40rem] font-black leading-none opacity-20">
                  {card.id}
                </span>
              </div>

              {/* CARD CONTENT */}
              <div className={`relative z-10 max-w-4xl card-content-${i}`}>
                <span className="text-accent font-sans text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                  {card.id} / 0{CARDS.length}
                </span>
                <h2 className="text-foreground font-sans text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                  {card.title}
                </h2>
                <p className="text-muted-custom font-sans text-xl md:text-2xl leading-relaxed mb-6 italic">
                  {card.description}
                </p>
                <p className="text-muted-custom/60 font-sans text-base md:text-lg leading-relaxed max-w-2xl">
                  {card.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* PROGRESS INDICATORS */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-30">
          {CARDS.map((_, i) => (
            <div 
              key={i} 
              className="w-12 h-[2px] bg-white/10 relative overflow-hidden"
            >
              <div 
                ref={(el) => { progressRefs.current[i] = el; }}
                className="absolute top-0 left-0 h-full bg-accent w-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HorizontalSection;
