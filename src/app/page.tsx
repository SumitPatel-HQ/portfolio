"use client";

import React from 'react';
import { HeroSection } from './hero/HeroSection';
import { FeaturedWork } from './featured-work/FeaturedWork';
import { ContactMiniSection } from './contact/contactminisection/contactpage';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroSection />
      <FeaturedWork />
      <ContactMiniSection />
    </div>
  );
}
