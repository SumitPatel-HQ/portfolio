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
        <div className="flex h-full w-full">
          {/* LEFT PANEL */}
          <div className="overflow-hidden relative h-full w-full md:w-1/2 shrink-0">
            <Image
              src="/images/about/img1.png"
              alt="Sumit Patel Portrait"
              fill
              className="scale-120 object-cover object-top grayscale brightness-75"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 56%, rgba(0,0,0,0.95) 66%, rgba(0,0,0,0.82) 74%, rgba(0,0,0,0.58) 82%, rgba(0,0,0,0.28) 90%, rgba(0,0,0,0.08) 96%, rgba(0,0,0,0) 100%)",
                maskImage:
                  "linear-gradient(to right, rgba(0,0,0,1) 56%, rgba(0,0,0,0.95) 66%, rgba(0,0,0,0.82) 74%, rgba(0,0,0,0.58) 82%, rgba(0,0,0,0.28) 90%, rgba(0,0,0,0.08) 96%, rgba(0,0,0,0) 100%)",
              }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(to right, rgba(10,10,10,0) 46%, rgba(10,10,10,0.22) 64%, rgba(10,10,10,0.55) 80%, var(--background) 100%)",
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute -right-[12%] top-0 z-10 h-full w-[46%] blur-2xl"
              style={{ backgroundColor: "var(--background)", opacity: 0.52 }}
            />


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

          {/* RIGHT PANEL - EMPTY FOR NOW */}
          <div className="hidden md:block h-full md:w-1/2 bg-background" />
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
