"use client";

import React, { useRef } from 'react';
import { HeroSection } from './home/hero/HeroSection';
import { FeaturedWork } from './home/featured-work/FeaturedWork';
import { ContactMiniSection } from './home/contactminipage/contactMiniSection';
import { HomeScrollPinController } from './home/HomeScrollPinController';

export default function Home() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const featuredSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  return (
    <div className="flex flex-col flex-1 w-full overflow-hidden">
      <HomeScrollPinController
        heroRef={heroSectionRef}
        featuredRef={featuredSectionRef}
        contactRef={contactSectionRef}
      />

      <div className="w-full">
        <section ref={heroSectionRef} className="min-h-screen w-full">
          <HeroSection />
        </section>
      </div>

      <div className="w-full">
        <section ref={featuredSectionRef} className="min-h-screen w-full">
          <FeaturedWork />
        </section>
      </div>

      <div className="w-full">
        <section ref={contactSectionRef}>
          <ContactMiniSection />
        </section>
      </div>
    </div>
  );
}
