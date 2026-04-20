"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PROJECTS, PROJECTS_TEXTURE_IMAGE } from "@/data/projects.data";
import { ProjectsLogoRail } from "@/components/projects/ProjectsLogoRail";

import { ProjectsOverlay } from "@/components/projects/ProjectsOverlay";
import { ProjectsStage } from "@/components/projects/ProjectsStage";
import { BlobCursor } from "@/components/ui/BlobCursor";
import { useGSAP } from "@/providers/GSAPProvider";
import { useLenis } from "@/providers/LenisProvider";

const overlayVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 22 : -22,
    filter: "blur(14px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -22 : 22,
    filter: "blur(14px)",
  }),
};

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const activeProject = useMemo(() => PROJECTS[activeIndex], [activeIndex]);
  const totalSteps = Math.max(1, PROJECTS.length - 1);
  const perCardScrollDistance = useMemo(() => {
    if (typeof window === "undefined") {
      return 520;
    }
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    return Math.max(280, window.innerHeight * (isMobile ? 0.65 : 0.48));
  }, []);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const router = useRouter();
  const { isReady: isGSAPReady } = useGSAP();
  const { lenis } = useLenis();

  const handleContainerClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest?.("button") || target?.closest?.("a")) {
      return;
    }
    router.push(activeProject.href);
  };

  const scrollToIndex = useCallback((index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) {
      return;
    }

    const progress = totalSteps === 0 ? 0 : index / totalSteps;
    const target = trigger.start + (trigger.end - trigger.start) * progress;
    if (lenis) {
      lenis.scrollTo(target, {
        duration: 0.95,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
      return;
    }

    trigger.scroll(target);
  }, [lenis, totalSteps]);

  const onPrev = useCallback(() => {
    const current = activeIndexRef.current;
    const nextIndex = current === 0 ? PROJECTS.length - 1 : current - 1;
    setDirection(-1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    scrollToIndex(nextIndex);
  }, [scrollToIndex]);

  const onNext = useCallback(() => {
    const current = activeIndexRef.current;
    const nextIndex = current === PROJECTS.length - 1 ? 0 : current + 1;
    setDirection(1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    scrollToIndex(nextIndex);
  }, [scrollToIndex]);

  const handleSelect = useCallback((index: number) => {
    const current = activeIndexRef.current;
    if (index === current) {
      return;
    }

    setDirection(index > current ? 1 : -1);
    activeIndexRef.current = index;
    setActiveIndex(index);
    scrollToIndex(index);
  }, [scrollToIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    if (!isGSAPReady || !mainRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: () => `+=${perCardScrollDistance * totalSteps}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1,
        fastScrollEnd: false,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 1 / totalSteps,
          delay: 0.02,
          duration: { min: 0.18, max: 0.4 },
          directional: true,
          inertia: true,
          ease: "power2.inOut",
        },
        onUpdate: (self) => {
          const nextIndex = Math.round(self.progress * totalSteps);
          if (nextIndex === activeIndexRef.current) {
            return;
          }

          setDirection(nextIndex > activeIndexRef.current ? 1 : -1);
          activeIndexRef.current = nextIndex;
          setActiveIndex(nextIndex);
        },
      });

      triggerRef.current = trigger;
      ScrollTrigger.refresh();
    }, mainRef);

    return () => {
      triggerRef.current = null;
      ctx.revert();
    };
  }, [isGSAPReady, perCardScrollDistance, totalSteps]);

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
  }, [onNext, onPrev]);

  return (
    <div className="w-full">
      <div ref={mainRef} className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background text-foreground">
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
                custom={direction}
                variants={overlayVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.52, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-col gap-[clamp(2.2rem,4.4vw,72px)]"
              >
                <ProjectsOverlay project={activeProject} />
              </motion.div>
            </AnimatePresence>
  
            <ProjectsLogoRail
              projects={PROJECTS}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            />
          </div>
        </section>
  
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-52 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-52 bg-gradient-to-l from-black/35 via-transparent to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[1px] bg-white/12" />
        <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[1px] bg-white/10" />
      </div>
    </div>
  );
}
