"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { PROJECTS, PROJECTS_TEXTURE_IMAGE } from "@/data/projects.data";
import { ProjectsLogoRail } from "@/components/projects/ProjectsLogoRail";

import { ProjectsOverlay } from "@/components/projects/ProjectsOverlay";
import { ProjectsStage } from "@/components/projects/ProjectsStage";
import { BlobCursor } from "@/components/ui/BlobCursor";

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeProject = useMemo(() => PROJECTS[activeIndex], [activeIndex]);
  
  const mainRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const handleContainerClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest?.("button") || target?.closest?.("a")) {
      return;
    }
    router.push(activeProject.href);
  };

  const onPrev = () => {
    setActiveIndex((current) =>
      current === 0 ? PROJECTS.length - 1 : current - 1,
    );
  };

  const onNext = () => {
    setActiveIndex((current) =>
      current === PROJECTS.length - 1 ? 0 : current + 1,
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []); // onPrev/onNext are stable as they use functional updates.

  return (
    <main ref={mainRef} className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background text-foreground">
      <BlobCursor targetRef={mainRef} onClick={handleContainerClick} />
      <ProjectsStage
        imageUrl={activeProject.heroImage}
        imageAlt={activeProject.logoAlt}
        textureUrl={PROJECTS_TEXTURE_IMAGE}
      />

      <section className="absolute bottom-0 left-0 right-0 z-30 px-6 pb-6 md:px-[68px] md:pb-8">
        <div className="flex max-w-[1080px] flex-col gap-8 md:gap-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: -14, filter: "blur(14px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 14, filter: "blur(14px)" }}
              transition={{ duration: 0.52, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col gap-[clamp(2.2rem,4.4vw,72px)]"
            >
              <ProjectsOverlay project={activeProject} />
            </motion.div>
          </AnimatePresence>

          <ProjectsLogoRail
            projects={PROJECTS}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </div>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-52 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-52 bg-gradient-to-l from-black/35 via-transparent to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[1px] bg-white/12" />
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[1px] bg-white/10" />
    </main>
  );
}
