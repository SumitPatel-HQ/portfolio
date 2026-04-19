"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HorizontalSection from "@/components/about/HorizontalSection";
import { ContactMiniSection } from "@/app/home/contactminipage/contactMiniSection";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      delay: custom * 0.1,
    },
  }),
};

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* SECTION 1: IDENTITY SPLIT PANEL */}
      <section className="relative h-screen overflow-hidden">
        <div className="flex h-full flex-col md:flex-row">
          {/* LEFT PANEL */}
          
          <div className="relative h-screen w-full shrink-0">
            
            <Image
              src="/images/about/img1.png"
              alt="Sumit Patel Portrait"
              fill
              className="  object-cover object-top grayscale brightness-75 mix-blend-normal"
              priority
              sizes="100vw"
            />
           
            {/* Bottom edge fade overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--background)_0%,transparent_30%)]" />

            {/* IDENTITY OVERLAY - BOTTOM LEFT */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUpVariants}
              className="absolute bottom-12 left-12 z-20 flex flex-col gap-0"
            >
              <p className="text-role-tag ml-3 pb-3 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
                AI ENGINEER × FULL-STACK DEV
              </p>
              <h1 className="scale-y-[1.1] font-sans text-6xl tracking-tight text-foreground md:text-[84px] md:leading-[0.85]">
                <span className="font-extrabold">Sumit Patel</span>
              </h1>
            </motion.div>
          </div>


        </div>
      </section>

      {/* SECTION 2: CINEMATIC HORIZONTAL SCROLL */}
      <HorizontalSection />

      {/* CONTACT SECTION */}
      <div className="pb-20">
        <ContactMiniSection />
      </div>

    </main>
  );
}
