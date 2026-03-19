"use client";

import React from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import styles from "./style.module.css";
import StripesBackground from "@/components/ui/StripesBackground";

export const HeroSection = () => {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
      <StripesBackground position="full" opacity="opacity-15" />

      <div className="relative z-10 flex-1 flex flex-col px-layout">
        <div className="h-hero-top grid grid-cols-12 items-center border-b border-border-custom max-md:flex max-md:justify-between">
          <div className="col-span-4">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-status-dot animate-pulse-custom"></span>
              <span className="text-status uppercase text-white/55">Available for work</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center py-8">
          <h1 className="text-hero leading-[0.9]  tracking-[-0.05em] border-b border-white/10 max-md:text-hero-mobile">SUMIT</h1>
          <h1 className="text-hero leading-[0.9]  tracking-[-0.05em] text-right max-md:text-hero-mobile">PATEL</h1>
        </div>

        <div className="h-hero-bottom grid grid-cols-12 items-center border-t border-white/10 max-md:flex max-md:flex-col max-md:h-auto max-md:gap-10 max-md:pb-10">
          <div className="col-span-6">
            <p className="text-role-tag uppercase text-white/48 mb-2.5">AI ENGINEER × FULL-STACK DEV</p>
            <p className="text-18px leading-[1.6] text-muted-custom">
              AI engineer by major. Full-stack developer by necessity. <br />Builder by choice.
            </p>
          </div>
          <div className="col-start-8 col-span-5 flex justify-end items-center gap-3 max-md:w-full max-md:justify-start max-md:flex-wrap">
            <button className="py-3.5 px-18px text-status font-semibold uppercase border border-accent min-w-btn text-center bg-accent text-black cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5 max-md:min-w-btn-mobile">
              Get in touch
            </button>
            <button className="py-3.5 px-18px text-status font-semibold uppercase border border-white/30 min-w-btn text-center bg-white/8 text-btn-secondary-text cursor-pointer transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:-translate-y-0.5 max-md:min-w-btn-mobile">
              Explore Archive
            </button>
          </div>
        </div>
      </div>
    </main>

  );
};
