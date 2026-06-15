"use client";

import { MobileBackground } from "@/components/mobile/MobileBackground";
import { MobileHero } from "@/components/mobile/home/MobileHero";
import { MobileOverview } from "@/components/mobile/home/MobileOverview";
import { MobileShowcase } from "@/components/mobile/home/MobileShowcase";
import { MobileIntro } from "@/components/mobile/home/MobileIntro";

export function MobileHomeLayout() {
  return (
    <main className="min-h-screen bg-background flex flex-col pb-[calc(env(safe-area-inset-bottom)+50px)]">
      <MobileBackground />
      <MobileIntro />
      <div className="flex-1 flex flex-col relative z-10">
        <MobileHero />
        <MobileOverview />
        <MobileShowcase />
      </div>
    </main>
  );
}
