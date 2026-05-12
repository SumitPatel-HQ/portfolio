"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import gsap from "gsap";
import StripesBackground from "@/components/ui/visuals/StripesBackground";
import { useContactModal } from "@/context/ContactModalContext";
import { BlobCursor } from "@/components/ui/BlobCursor";
import { useGSAP } from "@/providers/GSAPProvider";
import { useIntro } from "@/context/IntroContext";

const introBars = [
  "h-[clamp(4.2rem,8vw,8rem)]",
  "h-[clamp(5rem,9vw,9.5rem)]",
  "h-[clamp(4.4rem,8.4vw,8.6rem)]",
  "h-[clamp(5.4rem,9.8vw,10rem)]",
  "h-[clamp(4.8rem,8.8vw,9rem)]",
  "h-[clamp(5.8rem,10.4vw,10.8rem)]",
  "h-[clamp(4.6rem,8.6vw,8.8rem)]",
  "h-[clamp(5.2rem,9.4vw,9.7rem)]",
  "h-[clamp(4.4rem,8.4vw,8.6rem)]",
];

export const HeroSection = () => {
  const { openModal } = useContactModal();
  const { isReady: isGSAPReady } = useGSAP();
  const { setIntroComplete } = useIntro();
  const heroRootRef = useRef<HTMLElement>(null);
  const introOverlayRef = useRef<HTMLDivElement>(null);
  const introBarsRef = useRef<HTMLDivElement>(null);
  const stripesRef = useRef<HTMLDivElement>(null);
  const topChromeRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const sumitRef = useRef<HTMLHeadingElement>(null);
  const patelRef = useRef<HTMLHeadingElement>(null);
  const nameDividerRef = useRef<HTMLDivElement>(null);
  const bottomChromeRef = useRef<HTMLDivElement>(null);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const router = useRouter();

  // Reset global intro state when HeroSection mounts (e.g. navigating back to home)
  useEffect(() => {
    setIntroComplete(false);
  }, [setIntroComplete]);

  const handleNameClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'H1') return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isIntroComplete && !reduceMotion) return;
    router.push('/about');
  };

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const readyHandle = requestAnimationFrame(() => {
      setIsIntroComplete(true);
      setIntroComplete(true);
    });

    return () => cancelAnimationFrame(readyHandle);
  }, [setIntroComplete]);

  useEffect(() => {
    if (!isGSAPReady || !heroRootRef.current) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      gsap.set([
        stripesRef.current, topChromeRef.current, bottomChromeRef.current, 
        sumitRef.current, patelRef.current, nameDividerRef.current
      ], { clearProps: "all", opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(introOverlayRef.current, { autoAlpha: 0, pointerEvents: "none" });
      const readyHandle = requestAnimationFrame(() => {
        setIsIntroComplete(true);
        setIntroComplete(true);
      });
      return () => cancelAnimationFrame(readyHandle);
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const ctx = gsap.context(() => {
      const bars = introBarsRef.current?.children ?? [];
      const snapToHeroTop = () => window.scrollTo(0, 0);

      snapToHeroTop();

      // --- Premium Cinematic Initial States ---
      gsap.set([topChromeRef.current, bottomChromeRef.current], { 
        autoAlpha: 0, 
        y: 20, 
        filter: "blur(6px)" 
      });
      
      gsap.set(stripesRef.current, { autoAlpha: 0.18 });

      gsap.set([sumitRef.current, patelRef.current], {
        autoAlpha: 0,
        clipPath: "inset(42% 0% 42% 0%)",
        filter: "blur(10px)",
        yPercent: 4,
      });

      gsap.set(nameDividerRef.current, { 
        scaleX: 0, 
        transformOrigin: "left center" 
      });

      gsap.set(introOverlayRef.current, { autoAlpha: 1 });
      
      gsap.set(bars, {
        autoAlpha: 0,
        scaleY: 0,
        y: 20,
        transformOrigin: "center center"
      });

      const timeline = gsap.timeline({
        defaults: { ease: "expo.out" }
      });

      timeline
        .call(snapToHeroTop, [], 0)
        
        // --- 1. The Pre-loader Data Sequence ---
        // Elegant glitch-style staggered reveal
        .to(bars, {
          autoAlpha: 0.9,
          scaleY: 0.8,
          y: 0,
          duration: 0.5,
          stagger: { each: 0.03, from: "random" },
          ease: "power2.out"
        }, 0.1)
        
        // Deep compression before the burst
        .to(bars, {
          scaleY: 0.15,
          autoAlpha: 1,
          duration: 0.5,
          stagger: { each: 0.015, from: "edges" },
          ease: "power3.inOut"
        }, 0.6)

        // Explosive expansion climax
        .to(bars, {
          scaleY: 4.5,
          scaleX: 1.6,
          autoAlpha: 1,
          duration: 0.6,
          stagger: { each: 0.02, from: "center" },
          ease: "expo.inOut"
        }, 1.1)

        // Cinematic dissolve and pull-apart
        .to(bars, {
          scaleY: 0,
          y: (i) => (i % 2 === 0 ? -150 : 150),
          autoAlpha: 0,
          duration: 0.6,
          stagger: { each: 0.015, from: "center" },
          ease: "power3.in"
        }, 1.6)

        // --- 2. Environment & Depth Reveal ---
        .to(introOverlayRef.current, {
          autoAlpha: 0,
          duration: 0.8,
          ease: "power2.inOut"
        }, 1.8)

        .to(stripesRef.current, {
          autoAlpha: 1,
          duration: 3.5,
          ease: "power1.out"
        }, 2.0)

        // --- 3. The Grand Typographic Morph ---
        // Divider slices through the space
        .to(nameDividerRef.current, {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.inOut"
        }, 1.7)

        // Typography dynamically unfurls from the center slit
        .to([sumitRef.current, patelRef.current], {
          clipPath: "inset(-10% -10% -10% -10%)",
          autoAlpha: 1,
          filter: "blur(0px)",
          yPercent: 0,
          duration: 1.8,
          stagger: 0.1,
          ease: "power4.out" // Premium heavy slow-in easing
        }, 2.2)

        // --- 4. Editorial UI Framing ---
        .to([topChromeRef.current, bottomChromeRef.current], {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.15,
          ease: "power3.out",
          onStart: () => {
            setIntroComplete(true);
            setIsIntroComplete(true);
          }
        }, 2.6)
        
        .call(() => setIsIntroComplete(true)) // Final safety check at end
        .set(introOverlayRef.current, { pointerEvents: "none" });

    }, heroRootRef);

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
      ctx.revert();
    };
  }, [isGSAPReady, setIntroComplete]);

  return (
    <section ref={heroRootRef} className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">

      {/* Parallax Background Layers */}
      <div ref={stripesRef} className="absolute inset-0 opacity-[0.18] motion-reduce:opacity-100">
        <StripesBackground position="full" opacity="opacity-10" />
      </div>

      {/* Enhanced Loader Overlay */}
      <div
        ref={introOverlayRef}
        data-hero-intro
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1000] bg-background motion-reduce:hidden"
      >
        <div
          ref={introBarsRef}
          className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[clamp(1rem,2.4vw,3rem)]"
        >
          {introBars.map((heightClass, index) => (
            <span
              key={`${heightClass}-${index}`}
              className={`${heightClass} block w-[clamp(2px,0.22vw,4px)] bg-white opacity-0 shadow-[0_0_30px_rgba(255,255,255,0.3)]`}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-layout">
        <div ref={topChromeRef} className="h-hero-top flex items-center justify-between border-b border-border-custom">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-status-dot animate-pulse-custom"></span>
              <span className="text-status uppercase text-white/55">Available for work</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
           <div 
            ref={nameRef} 
            className="flex flex-col relative cursor-default focus-visible:outline-none"
            role="group"
            tabIndex={0}
            aria-disabled={!isIntroComplete}
            aria-label="Navigate to about page"
            onClick={handleNameClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNameClick(e);
              }
            }}
          >
            {isIntroComplete ? (
              <BlobCursor
                targetRef={nameRef}
                iconColor="text-black"
                restrictToTags={['h1']}
              />
            ) : null}

            {/* Premium Masked Typography System */}
            <h1 ref={sumitRef} className="hero-intro-title text-hero font-extrabold leading-[0.9] tracking-hero max-md:text-hero-mobile scale-y-[1.2] relative z-20 w-fit uppercase cursor-pointer">Sumit</h1>

            <div ref={nameDividerRef} className="w-full border-b border-white/10 relative z-10 mt-4" />
            
            <h1 ref={patelRef} className="hero-intro-title text-hero font-extrabold leading-[0.9] tracking-hero text-right max-md:text-hero-mobile scale-y-[1.2] mt-4 pr-[0.05em] relative z-20 ml-auto w-fit uppercase cursor-pointer">Patel</h1>
          </div>
        </div>

        <div ref={bottomChromeRef} className="h-hero-bottom flex items-center justify-between border-t border-white/10 max-md:flex-col max-md:h-auto max-md:gap-10 max-md:pb-10">
          <div>
            <p className="text-role-tag uppercase text-white/48 mb-2.5">AI ENGINEER × FULL-STACK DEV</p>
            <p className="text-18px leading-[1.6] text-muted-custom">
              AI engineer by major. Full-stack developer by necessity. <br />Builder by choice.
            </p>
          </div>
          <div className="flex justify-end items-center gap-3 max-md:w-full max-md:justify-start max-md:flex-wrap">
            <button
              onClick={openModal}
              aria-label="Open contact form to send a message"
              className="py-3.5 px-18px text-status font-semibold uppercase border border-accent min-w-btn text-center bg-accent text-black cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5 max-md:min-w-btn-mobile">
              Get in touch
            </button>
            <Link 
              href="/projects" 
              aria-label="View all projects portfolio"
              className="py-3.5 px-18px text-status font-semibold uppercase border border-white/30 min-w-btn text-center bg-white/8 cta-secondary-text cursor-pointer transition-all duration-300 hover:bg-white hover:border-white hover:-translate-y-0.5 max-md:min-w-btn-mobile">
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

