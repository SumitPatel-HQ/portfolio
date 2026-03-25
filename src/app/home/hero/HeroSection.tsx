"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
import StripesBackground from "@/components/ui/visuals/StripesBackground";
import { useContactModal } from "@/context/ContactModalContext";
import { BlobCursor } from "@/components/ui/BlobCursor";

export const HeroSection = () => {
  const { openModal } = useContactModal();
  const nameRef = useRef<HTMLDivElement>(null);
  const sumitRef = useRef<HTMLHeadingElement>(null);
  const patelRef = useRef<HTMLHeadingElement>(null);
  const router = useRouter();

  const handleNameClick = () => {
    router.push('/about');
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">

      <StripesBackground position="full" opacity="opacity-10" />

      <div className="relative z-10 flex-1 flex flex-col px-layout">
        <div className="h-hero-top flex items-center justify-between border-b border-border-custom">
          <div>
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-status-dot animate-pulse-custom"></span>
              <span className="text-status uppercase text-white/55">Available for work</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center ">
          <div ref={nameRef} className="flex flex-col relative">
            <BlobCursor
              targetRef={nameRef}
              onClick={handleNameClick}
              iconColor="text-black"
              restrictToTags={['h1']}
            />
            <h1 ref={sumitRef} className="text-hero font-extrabold leading-[0.9] tracking-hero max-md:text-hero-mobile scale-y-[1.2] relative z-20 w-fit uppercase">Sumit</h1>
            <div className="w-full border-b border-white/10 relative z-10 mt-4" />
            <h1 ref={patelRef} className="text-hero font-extrabold leading-[0.9] tracking-hero text-right max-md:text-hero-mobile scale-y-[1.2] mt-4 pr-[0.05em] relative z-20 ml-auto w-fit uppercase">Patel</h1>
          </div>
        </div>

        <div className="h-hero-bottom flex items-center justify-between border-t border-white/10 max-md:flex-col max-md:h-auto max-md:gap-10 max-md:pb-10">
          <div>
            <p className="text-role-tag uppercase text-white/48 mb-2.5">AI ENGINEER × FULL-STACK DEV</p>
            <p className="text-18px leading-[1.6] text-muted-custom">
              AI engineer by major. Full-stack developer by necessity. <br />Builder by choice.
            </p>
          </div>
          <div className="flex justify-end items-center gap-3 max-md:w-full max-md:justify-start max-md:flex-wrap">
            <button
              onClick={openModal}
              className="py-3.5 px-18px text-status font-semibold uppercase border border-accent min-w-btn text-center bg-accent text-black cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5 max-md:min-w-btn-mobile">
              Get in touch
            </button>
            <Link href="/projects" className="py-3.5 px-18px text-status font-semibold uppercase border border-white/30 min-w-btn text-center bg-white/8 cta-secondary-text cursor-pointer transition-all duration-300 hover:bg-white hover:border-white hover:-translate-y-0.5 max-md:min-w-btn-mobile">
              View Projects
            </Link>
          </div>
        </div>
      </div>
    </main>

  );
};
