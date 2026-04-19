"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HorizontalSection from "@/components/about/HorizontalSection";
import { ContactMiniSection } from "@/app/home/contactminipage/contactMiniSection";
import { Code, BookOpen, Briefcase } from "lucide-react";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev", color: "#61DAFB" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org", color: "#FFFFFF" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org", color: "#3178C6" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com", color: "#06B6D4" },
];


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
      <section className="relative min-h-screen overflow-hidden flex flex-col md:flex-row">
        {/* LEFT PANEL */}
        <div className="overflow-hidden relative h-[70vh] md:h-screen w-full md:w-1/2 shrink-0 z-10">
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
            className="pointer-events-none absolute -right-[12%] top-0 z-10 h-full w-[46%] blur-2xl md:block hidden"
            style={{ backgroundColor: "var(--background)", opacity: 0.52 }}
          />

          {/* IDENTITY OVERLAY - BOTTOM LEFT */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="absolute bottom-12 left-8 md:left-12 z-20 flex flex-col gap-0"
          >
            <p className="text-role-tag ml-3 pb-3 font-sans text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
              AI ENGINEER × FULL-STACK DEV
            </p>
            <h1 className="scale-y-[1.1] font-sans text-5xl md:text-6xl tracking-tight text-foreground lg:text-[84px] lg:leading-[0.85]">
              <span className="font-extrabold">Sumit Patel</span>
            </h1>
          </motion.div>
        </div>

        {/* RIGHT PANEL - CONTENT */}
        <div className="flex-1 min-h-[50vh] md:h-screen overflow-y-auto px-8 py-16 md:p-12 lg:p-20 flex flex-col justify-center gap-12 bg-background md:bg-transparent relative z-20">
          {/* DESCRIPTION BLOCK */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="max-w-[500px]"
          >
            <p className="text-foreground-secondary leading-relaxed text-lg xl:text-xl">
              I am a passionate <span className="text-foreground font-bold">Full Stack Web Developer</span> specializing in the modern web ecosystem. My expertise lies in crafting high-performance, scalable applications with precision and clean architecture.
            </p>
          </motion.div>

          {/* CARD GRID */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full max-w-[650px]"
          >
            {/* CARD 1: LANGUAGES */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 flex flex-col items-start gap-4">
              <Code className="w-5 h-5 text-accent" />
              <div>
                <h3 className="text-role-tag font-bold uppercase tracking-[0.25em] text-foreground/90 mb-2">Languages</h3>
                <p className="text-sm leading-relaxed text-foreground-secondary/70">
                  HTML<br />
                  CSS<br />
                  JavaScript<br />
                  React<br />
                  Node.js
                </p>
              </div>
            </div>

            {/* CARD 2: EDUCATION */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 flex flex-col items-start gap-4">
              <BookOpen className="w-5 h-5 text-accent" />
              <div>
                <h3 className="text-role-tag font-bold uppercase tracking-[0.25em] text-foreground/90 mb-2">Education</h3>
                <p className="text-sm leading-relaxed text-foreground-secondary/70">
                  B.E. Computer Science
                </p>
              </div>
            </div>

            {/* CARD 3: PROJECTS */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 transition-all duration-300 hover:bg-white/10 flex flex-col items-start gap-4">
              <Briefcase className="w-5 h-5 text-accent" />
              <div>
                <h3 className="text-role-tag font-bold uppercase tracking-[0.25em] text-foreground/90 mb-2">Projects</h3>
                <p className="text-sm leading-relaxed text-foreground-secondary/70">
                  Built 5+ modern web projects
                </p>
              </div>
            </div>
          </motion.div>

          {/* CORE TECH STACK */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            className="flex flex-col gap-4 pt-4"
          >
            <h3 className="text-role-tag font-bold uppercase tracking-[0.25em] text-accent text-xs">Core Tech Stack</h3>
            <div className="flex flex-wrap items-center justify-start gap-6">
              {techLogos.map((tech) => (
                <motion.a
                  key={tech.title}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0.7, scale: 1 }}
                  animate={{ opacity: 0.7, scale: 1 }}
                  whileHover={{
                    scale: 1.2,
                    opacity: 1,
                    transition: {
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }}
                  className="group relative h-8 w-8 flex items-center justify-center text-white"
                  title={tech.title}
                >
                  <div className="relative z-10 text-3xl transition-colors duration-300">
                    {tech.node}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: CINEMATIC HORIZONTAL SCROLL */}
      <HorizontalSection />

      {/* CONTACT SECTION */}
      <ContactMiniSection />
    </main>
  );
}
