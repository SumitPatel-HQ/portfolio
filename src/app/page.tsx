"use client";

import React from 'react';
import { HeroSection } from './home/hero/HeroSection';
import { FeaturedWork } from './home/featured-work/FeaturedWork';
import { ContactMiniSection } from './home/contactminipage/contactMiniSection';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroSection />
      <FeaturedWork />
      <ContactMiniSection />
    </div>
  );
}
