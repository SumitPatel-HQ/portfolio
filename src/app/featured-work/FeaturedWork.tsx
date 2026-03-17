"use client";

import React from 'react';
import { ProjectRow } from '@/components/ui/ProjectRow';

export const FeaturedWork = () => {
  return (
    <section className="px-8 md:px-24 py-20 flex flex-col">
      <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4">
        <span className="w-3 h-3 rounded-full bg-primary"></span>
        Featured Work
      </h2>
      
      <div className="w-full border-t border-white/10">
        <ProjectRow title="FinTech AI" category="Development" year="2023" href="/work" />
        <ProjectRow title="HealthSync" category="UX Design" year="2022" href="/work" />
        <ProjectRow title="CryptoDash" category="Full Stack" year="2022" href="/work" />
        <ProjectRow title="Nexus AI" category="Research" year="2024" href="/work" />
      </div>
    </section>
  );
};
