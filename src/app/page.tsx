"use client";

import React, { useRef, useLayoutEffect } from 'react';
import { useLenis } from "@/providers/LenisProvider";
import { HeroSection } from './home/hero/HeroSection';
import { FeaturedWork } from './home/featured-work/FeaturedWork';
import { ContactMiniSection } from './home/contactminipage/contactMiniSection';
import { HomeScrollPinController } from './home/HomeScrollPinController';

export default function Home() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const featuredSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);

  const { lenis } = useLenis();

  // Synchronously reset scroll to top before the first paint so that
  // ScrollTrigger always sees Y=0 when it initialises pin positions.
  // This also prevents Next.js scroll restoration from re-applying the
  // About page's last scroll offset when navigating back to Home.
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // Ensure Lenis also resets its internal scroll state
  React.useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  return (
    <div className="flex flex-col flex-1 w-full overflow-x-clip">
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
