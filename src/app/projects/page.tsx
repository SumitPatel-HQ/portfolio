"use client";

import { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { PROJECTS, PROJECTS_TEXTURE_IMAGE } from "@/app/projects/projects.data";
import { ProjectsLogoRail } from "@/components/projects/ProjectsLogoRail";
import { ProjectsNavigation } from "@/components/projects/ProjectsNavigation";
import { ProjectsOverlay } from "@/components/projects/ProjectsOverlay";
import { ProjectsStage } from "@/components/projects/ProjectsStage";

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = useMemo(() => PROJECTS[activeIndex], [activeIndex]);

  const onPrev = () => {
    setActiveIndex((current) => (current === 0 ? PROJECTS.length - 1 : current - 1));
  };

  const onNext = () => {
    setActiveIndex((current) => (current === PROJECTS.length - 1 ? 0 : current + 1));
  };

  return (
    <main className="projects-screen relative flex min-h-screen w-full flex-col overflow-hidden bg-[#191919] text-[#FFFAEE]">
      <ProjectsStage imageUrl={activeProject.heroImage} imageAlt={activeProject.logoAlt} textureUrl={PROJECTS_TEXTURE_IMAGE} />

      <header className="absolute left-0 right-0 top-0 z-20 flex h-[120px] items-center justify-between px-8 py-8 md:px-[68px] md:py-[48px]">
        <p className="projects-subheader">Projects</p>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center text-[#FFFAEE]/90 hover:text-[#FFFAEE]">
          <Menu size={26} />
        </button>
      </header>

      <section className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-[clamp(6.3rem,12.6vh,136px)] md:px-[clamp(2.4rem,5.2vw,100px)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex max-w-[1080px] flex-col gap-[clamp(2.2rem,4.4vw,72px)]"
          >
            <ProjectsOverlay project={activeProject} />
            <ProjectsLogoRail projects={PROJECTS} activeIndex={activeIndex} onSelect={setActiveIndex} />
          </motion.div>
        </AnimatePresence>
      </section>

      <footer className="absolute bottom-0 left-0 right-0 z-20 flex h-[120px] items-center justify-end px-8 py-8 md:px-[68px] md:py-[48px]">
        <ProjectsNavigation onPrev={onPrev} onNext={onNext} />
      </footer>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-52 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-52 bg-gradient-to-l from-black/35 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[1px] bg-white/12" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[1px] bg-white/10" />
    </main>
  );
}
