"use client";

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useTransitionRouter } from 'next-transition-router';
import StripesBackground from "@/components/ui/visuals/StripesBackground";
import { useContactModal } from "@/context/ContactModalContext";
import { BlobCursor } from "@/components/ui/visuals/BlobCursor";
import { useGSAP } from "@/providers/GSAPProvider";
import { useIntro } from "@/context/IntroContext";
import { useLenis } from "@/providers/LenisProvider";
import { useHeroAnimation, introBars } from './introAnime';
import { AboutMe } from '@/data/aboutmyself.data';


export const HeroSection = () => {
  const { openModal } = useContactModal();
  const { isReady: isGSAPReady } = useGSAP();
  const { lenis } = useLenis();
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
  const router = useTransitionRouter();

  const handleNameClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('h1')) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isIntroComplete && !reduceMotion) return;
    router.push('/about');
  };

  // Trigger Cinematic Intro Sequence
  useHeroAnimation({
    isGSAPReady,
    setIntroComplete,
    setIsIntroComplete,
    heroRootRef,
    introOverlayRef,
    introBarsRef,
    stripesRef,
    topChromeRef,
    sumitRef,
    patelRef,
    nameDividerRef,
    bottomChromeRef,
    smoothScroll: lenis,
  });


  return (
    <section ref={heroRootRef} className="hero-root min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      {/* 
        This style block is injected directly into the SSR HTML for the home page.
        It overrides the default CSS fallback that forces the brand layer visible
        before JS hydrates, preventing any "flash" of the brand layer on refresh.
        Since it targets html:not(.transition-ready), it safely becomes inert 
        once the TransitionProvider adds .transition-ready.
      */}
      <style dangerouslySetInnerHTML={{
        __html: `
        html:not(.transition-ready) .transition-brand-layer {
          display: none !important;
        }
      `}} />

      {/* Parallax Background Layers */}
      <div ref={stripesRef} className="hero-stripes absolute inset-0 motion-reduce:opacity-100 motion-reduce:transform-none">
        <StripesBackground position="full" opacity="opacity-10" />
      </div>

      {/* Cinematic Transition Overlay */}
      <div
        ref={introOverlayRef}
        data-hero-intro
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1000]  motion-reduce:hidden flex flex-col items-center justify-center"
      >
        {/* Subtle Depth Gradient */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)]" /> */}

        <div
          ref={introBarsRef}
          className="relative z-10 flex items-center gap-[clamp(0.6rem,1.5vw,2rem)] mix-blend-screen"
        >
          {introBars.map((heightClass, index) => (
            <span
              key={`${heightClass}-${index}`}
              className={`${heightClass} hero-intro-bar block w-[clamp(1px,0.15vw,2px)] rounded-full bg-white opacity-0 will-change-transform`}
              style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased" }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col px-layout">
        <div ref={topChromeRef} className="hero-chrome-top h-hero-top flex items-center justify-between border-b border-border-custom">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-status-dot animate-pulse-custom"></span>
              <span className="text-status uppercase text-white/55">{AboutMe.Available}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center md:-translate-y-8 lg:translate-y-0">
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
            <h1 ref={sumitRef} data-hero-title="sumit" className="hero-intro-title text-hero font-extrabold leading-[0.9] tracking-hero max-md:text-hero-mobile md:text-[13vw] lg:text-hero relative z-20 w-fit uppercase cursor-pointer md:pl-[0.4em] lg:pl-[0]">
              <span className="hero-title-scale">Sumit</span>
            </h1>

            <div ref={nameDividerRef} className="hero-divider w-full border-b border-white/10 relative z-10 mt-4 md:mt-8 lg:mt-4" />

            <h1 ref={patelRef} data-hero-title="patel" className="hero-intro-title text-hero font-extrabold leading-[0.9] tracking-hero text-right max-md:text-hero-mobile md:text-[13vw] lg:text-hero mt-4 md:mt-8 lg:mt-4 lg:pr-[0.05em] md:pr-[0.4em] relative z-20 ml-auto w-fit uppercase cursor-pointer">
              <span className="hero-title-scale">Patel</span>
            </h1>
          </div>
        </div>

        <div ref={bottomChromeRef} className="hero-chrome-bottom h-hero-bottom flex items-center md:items-start lg:items-center justify-between md:justify-start lg:justify-between border-t border-white/10 max-md:flex-col max-md:h-auto max-md:gap-10 md:gap-16 lg:gap-10 max-md:pb-10 md:pt-6 lg:pt-0">
          <div>
            <p className="text-role-tag uppercase text-white/48 md:text-white/60 lg:text-white/48 md:text-[14px] lg:text-[10px] mb-2.5">{AboutMe.tag}</p>
            <p className="text-18px md:text-[21px] lg:text-[18px] leading-[1.6] text-muted-custom md:text-white/80 lg:text-muted-custom">
              AI engineer by major. Full-stack developer by necessity. <br className="hidden lg:block" />Builder by choice.
            </p>
          </div>
          <div className="flex justify-end items-center gap-3 max-md:w-full max-md:justify-start max-md:flex-wrap md:mt-1 lg:mt-0">
            <button
              onClick={openModal}
              aria-label="Open contact form to send a message"
              className="py-3.5 px-18px text-status font-semibold uppercase border border-accent min-w-btn text-center bg-accent text-black cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5 max-md:min-w-btn-mobile rounded-xl">
              Get in touch
            </button>
            <Link
              href="/projects"
              aria-label="View all projects portfolio"
              className="py-3.5 px-18px text-status font-semibold uppercase border border-white/30 min-w-btn text-center bg-white/8 cta-secondary-text cursor-pointer transition-all duration-300 hover:bg-white hover:border-white hover:-translate-y-0.5 max-md:min-w-btn-mobile rounded-xl">
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

