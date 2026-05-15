"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Services from "./services";
import { ContactMiniSection } from "@/app/home/contactminipage/contactMiniSection";
import { AboutScrollPinController } from "./AboutScrollPinController";
import { useLenis } from "@/providers/LenisProvider";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiDocker, SiPython, SiFastapi, SiVercel, SiGit, SiGithub, SiSupabase, SiGooglecloud, SiN8N } from 'react-icons/si';
import { FileText, FolderKanban } from "lucide-react";
import { ResumeModal } from "@/components/ResumeModal";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiFastapi />, title: "FastAPI", href: "https://fastapi.tiangolo.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
  { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
  { node: <SiSupabase />, title: "Supabase", href: "https://supabase.com" },
  { node: <SiGooglecloud />, title: "Google Cloud", href: "https://cloud.google.com" },
  { node: <SiN8N />, title: "n8n", href: "https://n8n.io" },
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
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const router = useRouter();
  const { lenis } = useLenis();

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
        <section ref={section1Ref} className="relative min-h-screen overflow-hidden flex flex-col md:flex-row">
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
          <div className="flex-1 min-h-[50vh] md:h-screen overflow-y-auto px-8 py-16 md:p-12 lg:p-20 xl:pl-28 flex flex-col justify-center bg-background md:bg-transparent relative z-20">
            <div className="max-w-[540px] flex flex-col gap-10">

              {/* SECTION 1 & 2: HEADLINE & SUBTEXT */}
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="flex flex-col gap-4"
              >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
                  I build scalable web systems.
                </h2>
                <p className="text-[#A0A0A0] text-lg leading-relaxed max-w-[480px]">
                  Full Stack Developer focused on performance, clean architecture, and real-world usability.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsResumeOpen(true)}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-background-secondary/55 px-4 py-2 text-sm font-medium text-foreground/85 transition-colors duration-200 hover:border-accent/20 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <FileText size={16} aria-hidden />
                    View Resume
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/projects')}
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-background-secondary/55 px-4 py-2 text-sm font-medium text-foreground/85 transition-colors duration-200 hover:border-accent/20 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                  >
                    <FolderKanban size={16} aria-hidden />
                    View Projects
                  </button>
                </div>
              </motion.div>

              {/* SECTION 3 & 4: IMPACT & CURRENT STATUS */}
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16"
              >
                <div className="flex flex-col gap-1 shrink-0">
                
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground">5+</span>
                    <span className="text-sm text-[#A0A0A0] font-medium leading-tight max-w-[80px]">Projects Shipped</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Currently</h3>
                  <div className="flex flex-col gap-2 text-[#A0A0A0] text-base">
                    <p><span className="text-foreground font-medium">Building:</span> AI-powered DB assistant</p>
                    <p><span className="text-foreground font-medium">Exploring:</span> System design / performance</p>
                  </div>
                </div>
              </motion.div>

              {/* SECTION 5: EDUCATION + RESUME CTA */}
              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="flex flex-col gap-3"
              >
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Education</h3>
                <p className="text-base text-foreground font-medium">T.E  Artificial Intelligence and Data Science</p>
                
              </motion.div>

              {/* SECTION 7: CORE TECH STACK */}
              <motion.div
                custom={5}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                className="flex flex-col gap-4 pt-4 border-t border-white/5"
              >
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">Core Tech Stack</h3>
                <div className="flex flex-wrap items-center justify-start gap-6">
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
                      className="group relative h-8 w-8 flex items-center justify-center text-white"
                    >

                      <div className="relative z-10 text-3xl transition-all duration-300 cursor-pointer">
                        {tech.node}
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
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
