"use client";

import React from 'react';
import Link from 'next/link';

export default function Projects() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10">
        <h1 className="text-[10vw] md:text-[8vw] font-extrabold leading-[0.9] tracking-tight text-white mb-6">
          COMING
        </h1>
        <h1 className="text-[10vw] md:text-[8vw] font-extrabold leading-[0.9] tracking-tight text-white mb-12">
          SOON
        </h1>
        <Link 
          href="/" 
          className="inline-block py-3.5 px-18px text-status font-semibold uppercase border border-white/30 min-w-btn text-center bg-white/8 cta-secondary-text cursor-pointer transition-all duration-300 hover:bg-white hover:border-white hover:-translate-y-0.5"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
};
