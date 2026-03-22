"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect } from "react";

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
    <main className="bg-background text-foreground min-h-screen md:h-screen md:overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        {/* LEFT PANEL */}
        <section className="relative h-[60vh] w-full shrink-0 md:h-screen md:w-[55vw]">
          <Image
            src="/images/about/img1.png"
            alt="Sumit Patel Portrait"
            fill
            className="object-cover object-top grayscale brightness-75 mix-blend-normal"
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
          />
          {/* Right edge fade overlay for desktop */}
          <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,transparent_70%,var(--background)_100%)] md:block" />
          {/* Bottom edge fade overlay for mobile */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,var(--background)_0%,transparent_30%)] md:hidden" />

          {/* IDENTITY OVERLAY - BOTTOM LEFT */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="absolute bottom-8 left-8 z-20 flex flex-col gap-0 md:bottom-12 md:left-12"
          >
            <p className="text-role-tag font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-accent ml-3 pb-3">
              AI ENGINEER × FULL-STACK DEV
            </p>
            <h1 className="font-sans text-6xl tracking-tight text-foreground md:text-[84px] md:leading-[0.85] scale-y-[1.1]">
              <span className="font-extrabold">Sumit Patel</span>
            </h1>
          </motion.div>
        </section>

        {/* RIGHT PANEL */}
        <section className="flex w-full flex-col gap-12 px-8 pt-24 pb-32 md:h-screen md:overflow-y-auto md:w-[45vw] md:px-12">
          
          {/* BLOCK 1: IDENTITY */}
          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >

            <span className="mb-6 block  text-[10px] font-bold uppercase tracking-widest text-accent">
              Introduction
            </span>
            <p className="mb-6 font-sans text-sm italic text-muted-custom">
              &quot;AI engineer by major. Full-stack developer by necessity. Builder by choice.&quot;
            </p>

            <p className="max-w-xl font-sans text-sm leading-[1.7] text-muted-custom md:text-sm">
              I build systems that sit at the edge of AI and usability — 
              where a model's output becomes something a real person can 
              actually use. I'm drawn to problems that require both deep 
              technical work and design thinking, because neither alone 
              is enough. Based in Virār, Maharashtra. Currently leading 
              technical direction at NSDC VCET and shipping products 
              on the side.
            </p>
          </motion.div>

          <div className="border-t border-accent/20 w-full" />

          {/* BLOCK 2: STATS */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <span className="mb-12 block font-sans text-[10px] font-bold uppercase tracking-widest text-accent">
              At A Glance
            </span>
            <div className="flex flex-wrap gap-12 md:gap-24">
              <div className="flex flex-col gap-2">
                <span className="font-sans text-4xl font-extrabold text-foreground">06+</span>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-custom">Yrs Exp</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-sans text-4xl font-extrabold text-foreground">12</span>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-custom">Models</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-sans text-4xl font-extrabold text-foreground uppercase">ASIA_W</span>
                <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-muted-custom">Region</span>
              </div>
            </div>
          </motion.div>

          <div className="border-t border-accent/20 w-full" />

          {/* BLOCK 3: APPROACH */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <span className="mb-12 block font-sans text-[10px] font-bold uppercase tracking-widest text-accent">
              How I Build
            </span>
            <ul className="flex flex-col gap-4 font-sans text-[14px] text-muted-custom">
              <li className="flex items-start gap-4">
                <span className="font-bold text-accent">→</span>
                <span className="font-medium">I prototype fast and refine in production</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold text-accent">→</span>
                <span className="font-medium">Every interface is a bridge between model and human</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold text-accent">→</span>
                <span className="font-medium">Design and engineering are not separate phases</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold text-accent">→</span>
                <span className="font-medium">I build for maintainability, not just demos</span>
              </li>
            </ul>
          </motion.div>

          <div className="border-t border-accent/20 w-full" />

          {/* BLOCK 4: CURRENTLY */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <span className="mb-12 block font-sans text-[10px] font-bold uppercase tracking-widest text-accent">
              Currently
            </span>
            <ul className="flex flex-col gap-3 font-sans text-[13px] text-muted-custom">
              <li className="flex items-start gap-3">
                <span className="font-bold text-accent">↳</span>
                <span className="font-medium">Building Kobra — AI-powered multi-vector cyber defense platform</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-accent">↳</span>
                <span className="font-medium">Portfolio v1 — this site</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-accent">↳</span>
                <span className="font-medium">Exploring agentic workflow design patterns</span>
              </li>
            </ul>
          </motion.div>

          <div className="border-t border-accent/20 w-full" />

          {/* BLOCK 5: CONNECT */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
          >
            <span className="mb-12 block font-sans text-[10px] font-bold uppercase tracking-widest text-accent">
              Find Me At
            </span>
            <div className="flex flex-col gap-4">
              <Link 
                href="https://github.com/SumitPatel-HQ" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-max items-center gap-4 font-sans text-[13px] font-bold tracking-widest text-foreground transition-colors duration-200 hover:text-accent"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
              <Link 
                href="https://linkedin.com/in/sumitpatel-hq" 
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-max items-center gap-4 font-sans text-[13px] font-bold tracking-widest text-foreground transition-colors duration-200 hover:text-accent"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
              <Link 
                href="mailto:sumit@nsdcindia.org" 
                className="group flex w-max items-center gap-4 font-sans text-[13px] font-bold tracking-widest text-foreground transition-colors duration-200 hover:text-accent"
              >
                <span>EMAIL</span>
                <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </section>
      </div>
    </main>
  );
}
