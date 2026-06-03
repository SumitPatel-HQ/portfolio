"use client";

import Image from "next/image";
import { useTransitionRouter } from "next-transition-router";
import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Services from "./services";
import { ContactMiniSection } from "@/app/home/contactminipage/contactMiniSection";
import { AboutScrollPinController } from "./AboutScrollPinController";
import { useLenis } from "@/providers/LenisProvider";
import LogoLoop, { LogoItem } from "@/components/ui/LogoRail";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiDocker, SiPython, SiFastapi, SiVercel, SiGit, SiGithub, SiSupabase, SiGooglecloud, SiN8N } from 'react-icons/si';
import { FileText, FolderKanban } from "lucide-react";
import { ResumeModal } from "@/components/ui/ResumeModal";
import { getProfileImageUrl } from "@/lib/imagekit";
import ScrollReveal from "@/components/ui/scroll-reveal";
import { AboutMe } from "@/data/aboutmyself.data";


const techLogos = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiPython />, title: "Python" },
  { node: <SiFastapi />, title: "FastAPI" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiSupabase />, title: "Supabase" },
  { node: <SiGooglecloud />, title: "Google Cloud" },
  { node: <SiN8N />, title: "n8n" },
];

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      delay: custom * 0.1,
    },
  }),
};

export default function AboutPage() {
  const [activeLogo, setActiveLogo] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleTap = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;
      if (target && typeof target.closest === 'function' && !target.closest('a[data-logo-item="true"]')) {
        setActiveLogo(null);
      }
    };
    
    if (activeLogo) {
      document.addEventListener("mousedown", handleTap);
      document.addEventListener("touchstart", handleTap);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleTap);
      document.removeEventListener("touchstart", handleTap);
    };
  }, [activeLogo]);

  const renderMovingLogoItem = React.useCallback((tech: LogoItem, key: React.Key) => (
    <motion.a
      key={key}
      data-logo-item="true"
      onTap={() => {
        setActiveLogo(prev => prev === tech.title ? null : (tech.title || null));
      }}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0.7, scale: 1 }}
      animate={{ 
        opacity: activeLogo === tech.title ? 1 : 0.7, 
        scale: activeLogo === tech.title ? 1.25 : 1 
      }}
      whileHover={{
        scale: activeLogo === tech.title ? 1.25 : 1.15,
        opacity: 1,
        transition: {
          duration: 0.2,
          ease: "easeOut",
        },
      }}
      className="group relative h-10 w-10 flex items-center justify-center text-white cursor-pointer"
    >
      <div className="relative z-10 text-4xl transition-all duration-300">
        {'node' in tech ? tech.node : null}
      </div>
    </motion.a>
  ), [activeLogo]);

  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [transitionReady, setTransitionReady] = useState(false);
  const router = useTransitionRouter();
  const { lenis } = useLenis();

  useEffect(() => {
    // The page transition takes ~1.8s to 2.8s with a strong ease-out.
    // Triggering the reveal after 800ms ensures it plays *during* the tail-end 
    // of the page transition (as it decelerates), making it feel perfectly synced.
    const timeout = setTimeout(() => {
      setTransitionReady(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  // Synchronously reset scroll to top before the first paint so that
  // ScrollTrigger always sees Y=0 when it initialises pin positions.
  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      window.scrollTo(0, 0);
    }
  }, []);

  // Ensure Lenis also resets its internal scroll state
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  return (
    <>
      <main className="bg-background text-foreground min-h-screen">
        <AboutScrollPinController
          section1Ref={section1Ref}
          section2Ref={section2Ref}
          contactRef={contactRef}
        />
        {/* SECTION 1: IDENTITY SPLIT PANEL */}
        <section ref={section1Ref} className="relative min-h-screen overflow-hidden flex flex-col lg:flex-row">
          {/* LEFT PANEL */}
          <div className="overflow-hidden relative h-[70vh] md:h-[50vh] lg:h-screen w-full lg:w-1/2 shrink-0 z-10">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={transitionReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={getProfileImageUrl("image.jpg")}
                alt="Sumit Patel Portrait"
                fill
                className="object-cover grayscale object-top brightness-75 scale-[1.2] transform-gpu"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 56%, rgba(0,0,0,0.95) 66%, rgba(0,0,0,0.82) 74%, rgba(0,0,0,0.58) 82%, rgba(0,0,0,0.28) 90%, rgba(0,0,0,0.08) 96%, rgba(0,0,0,0) 100%)",
                  maskImage:
                    "linear-gradient(to right, rgba(0,0,0,1) 56%, rgba(0,0,0,0.95) 66%, rgba(0,0,0,0.82) 74%, rgba(0,0,0,0.58) 82%, rgba(0,0,0,0.28) 90%, rgba(0,0,0,0.08) 96%, rgba(0,0,0,0) 100%)",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 60vw"
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
                className="pointer-events-none absolute -right-[12%] top-0 z-10 h-full w-[46%] blur-2xl lg:block hidden"
                style={{ backgroundColor: "var(--background)", opacity: 0.52 }}
              />
            </motion.div>

            {/* IDENTITY OVERLAY - BOTTOM LEFT */}
            <motion.div
              custom={0}
              initial="hidden"
              animate={transitionReady ? "visible" : "hidden"}
              className="absolute bottom-12 left-8 md:left-12 z-20 flex flex-col gap-0"
            >
              <motion.p variants={fadeUpVariants} className="text-role-tag ml-3 pb-3 font-sans text-[12px] md:text-[13px] font-medium uppercase tracking-[0.25em] text-accent">
                {AboutMe.tag}
              </motion.p>
              <ScrollReveal
                as="h1"
                textClassName="scale-y-[1.1] font-sans text-5xl md:text-[90px] lg:text-[90px] tracking-tight text-foreground lg:leading-[0.85] font-extrabold"
                trigger={transitionReady}
                staggerDelay={0.06}
                delay={0}
                size="none"
                variant="none"
                align="none"
                containerClassName="!my-0"
              >
                {AboutMe.Name}
              </ScrollReveal>
            </motion.div>
          </div>

          {/* RIGHT PANEL - CONTENT */}
          <div className="flex-1 min-h-[50vh] lg:h-screen overflow-y-auto px-8 py-16 md:px-14 md:pt-12 md:pb-16 lg:p-20 xl:pl-28 flex flex-col justify-center md:justify-start lg:justify-center bg-background lg:bg-transparent relative z-20 md:-mt-10 md:rounded-t-[40px] lg:mt-0 lg:rounded-none">
            <div className="max-w-[540px] md:max-w-full lg:max-w-[540px] flex flex-col gap-10 md:gap-10 lg:gap-10">

              {/* SECTION 1 & 2: HEADLINE & SUBTEXT */}
              <motion.div
                custom={1}
                initial="hidden"
                animate={transitionReady ? "visible" : "hidden"}
                className="flex flex-col gap-4 "
              >
                <ScrollReveal
                  as="h2"
                  textClassName="text-4xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]"
                  trigger={transitionReady}
                  staggerDelay={0.03}
                  delay={0.1}
                  size="none"
                  variant="none"
                  align="none"
                  containerClassName="!my-0"
                >
                  {AboutMe.headLine1}
                </ScrollReveal>
                <ScrollReveal
                  as="p"
                  textClassName="text-[#A0A0A0] text-lg md:text-2xl lg:text-lg leading-relaxed max-w-[480px] md:max-w-full lg:max-w-[480px]"
                  trigger={transitionReady}
                  staggerDelay={0.015}
                  delay={0.2}
                  size="none"
                  variant="none"
                  align="none"
                  containerClassName="!my-0"
                >
                  {AboutMe.headLine2}
                </ScrollReveal>
                <ScrollReveal
                  as="div"
                  containerClassName="!my-0"
                  textClassName="flex flex-wrap items-center gap-3"
                  trigger={transitionReady}
                  staggerDelay={0.03}
                  delay={0.25}
                  size="none"
                  variant="none"
                  align="none"
                >
                  <button
                    type="button"
                    onClick={() => setIsResumeOpen(true)}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-background-secondary/55 px-4 py-2 md:px-6 md:py-3 lg:px-4 lg:py-2 text-sm md:text-lg lg:text-sm font-medium text-foreground/85 transition-colors duration-200 hover:border-accent/20 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <FileText className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" aria-hidden />
                    View Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/projects')}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-background-secondary/55 px-4 py-2 md:px-6 md:py-3 lg:px-4 lg:py-2 text-sm md:text-lg lg:text-sm font-medium text-foreground/85 transition-colors duration-200 hover:border-accent/20 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <FolderKanban className="w-4 h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" aria-hidden />
                    View Projects
                  </button>
                </ScrollReveal>
              </motion.div>

              {/* SECTION 3 & 4: IMPACT & CURRENT STATUS */}
              <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16 lg:gap-16">
                <div className="flex flex-col gap-1 shrink-0">

                  <div className="flex items-baseline gap-3">
                    <ScrollReveal
                      as="span"
                      textClassName="text-5xl md:text-6xl lg:text-6xl md:scale-y-[1.1] font-extrabold tracking-tighter text-foreground"
                      trigger={transitionReady}
                      staggerDelay={0.06}
                      delay={0.25}
                      size="none"
                      variant="none"
                      align="none"
                      containerClassName="!my-0 inline-block align-baseline"
                    >
                      {AboutMe.ProjectNum}+
                    </ScrollReveal>
                    <ScrollReveal
                      as="span"
                      textClassName="text-sm md:text-base lg:text-sm text-[#A0A0A0] font-medium leading-tight"
                      trigger={transitionReady}
                      staggerDelay={0.02}
                      delay={0.3}
                      size="none"
                      variant="none"
                      align="none"
                      containerClassName="!my-0 inline-block align-baseline max-w-[80px]"
                    >
                      Projects Shipped
                    </ScrollReveal>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <ScrollReveal
                    as="h3"
                    textClassName="text-[11px] md:text-[16px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-accent "
                    trigger={transitionReady}
                    staggerDelay={0.02}
                    delay={0.3}
                    size="none"
                    variant="none"
                    align="none"
                    containerClassName="!my-0"
                  >
                    Currently
                  </ScrollReveal>
                  <div className="flex flex-col gap-2 text-[#A0A0A0] text-base md:text-xl lg:text-base">
                    <div className="flex items-start gap-1.5 leading-tight whitespace-nowrap">
                      <ScrollReveal
                        as="span"
                        textClassName="text-foreground font-medium"
                        trigger={transitionReady}
                        staggerDelay={0.02}
                        delay={0.35}
                        size="none"
                        variant="none"
                        align="none"
                        containerClassName="!my-0 shrink-0"
                      >
                        Building:
                      </ScrollReveal>
                      <ScrollReveal
                        as="span"
                        textClassName="text-[#A0A0A0]"
                        trigger={transitionReady}
                        staggerDelay={0.02}
                        delay={0.38}
                        size="none"
                        variant="none"
                        align="none"
                        containerClassName="!my-0"
                      >
                        {AboutMe.Buidling}
                      </ScrollReveal>
                    </div>
                    <div className="flex items-start gap-1.5 leading-tight whitespace-nowrap">
                      <ScrollReveal
                        as="span"
                        textClassName="text-foreground font-medium"
                        trigger={transitionReady}
                        staggerDelay={0.02}
                        delay={0.4}
                        size="none"
                        variant="none"
                        align="none"
                        containerClassName="!my-0 shrink-0"
                      >
                        Exploring:
                      </ScrollReveal>
                      <ScrollReveal
                        as="span"
                        textClassName="text-[#A0A0A0]"
                        trigger={transitionReady}
                        staggerDelay={0.02}
                        delay={0.43}
                        size="none"
                        variant="none"
                        align="none"
                        containerClassName="!my-0"
                      >
                        {AboutMe.Exploring}
                      </ScrollReveal>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 5: EDUCATION + RESUME CTA */}
              <div className="flex flex-col gap-3">
                <ScrollReveal
                  as="h3"
                  textClassName="text-[11px] md:text-[16px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-accent"
                  trigger={transitionReady}
                  staggerDelay={0.02}
                  delay={0.45}
                  size="none"
                  variant="none"
                  align="none"
                  containerClassName="!my-0"
                >
                  Education
                </ScrollReveal>
                <ScrollReveal
                  as="p"
                  textClassName="text-base md:text-xl lg:text-base text-foreground font-medium"
                  trigger={transitionReady}
                  staggerDelay={0.015}
                  delay={0.5}
                  size="none"
                  variant="none"
                  align="none"
                  containerClassName="!my-0"
                >
                  {AboutMe.Education}
                </ScrollReveal>
              </div>

              {/* SECTION 7: CORE TECH STACK */}
              <div className="flex flex-col gap-4 md:gap-6 lg:gap-4 pt-4 border-t border-white/5">
                <ScrollReveal
                  as="h3"
                  textClassName="text-[11px] md:text-[16px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-accent"
                  trigger={transitionReady}
                  staggerDelay={0.02}
                  delay={0.55}
                  size="none"
                  variant="none"
                  align="none"
                  containerClassName="!my-0"
                >
                  Core Tech Stack
                </ScrollReveal>
                <ScrollReveal
                  as="div"
                  containerClassName="!my-0 w-full"
                  textClassName="w-full"
                  trigger={transitionReady}
                  staggerDelay={0.03}
                  delay={0.6}
                  size="none"
                  variant="none"
                  align="none"
                >
                  {/* Desktop and Mobile: Static Wrapping */}
                  <div className="flex md:hidden lg:flex flex-wrap items-center justify-start gap-6 lg:gap-6">
                    {techLogos.map((tech) => (
                      <motion.a
                        key={tech.title}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0.7, scale: 1 }}
                        animate={{ opacity: 0.7, scale: 1 }}
                        whileHover={{
                          scale: 1.15,
                          opacity: 1,
                          transition: {
                            duration: 0.2,
                            ease: "easeOut",
                          },
                        }}
                        className="group relative h-8 w-8 lg:h-8 lg:w-8 flex items-center justify-center text-white"
                      >
                        <div className="relative z-10 text-3xl lg:text-3xl transition-all duration-300 cursor-pointer">
                          {tech.node}
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Tablet: Moving LogoRail */}
                  <div className="hidden md:block lg:hidden w-full max-w-4xl overflow-hidden">
                    <LogoLoop
                      logos={techLogos}
                      speed={activeLogo ? 0 : 60}
                      gap={40}
                      logoHeight={48}
                      fadeOut={true}
                      fadeOutColor="var(--background)"
                      renderItem={renderMovingLogoItem}
                      pauseOnHover={true}
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CINEMATIC HORIZONTAL SCROLL */}
        <div ref={section2Ref}>
          <Services />
        </div>

        {/* CONTACT SECTION */}
        <div ref={contactRef}>
          <ContactMiniSection />
        </div>
      </main>

      {/* RESUME PDF MODAL */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </>
  );
}
