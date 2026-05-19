"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ProjectItem, PROJECTS_TEXTURE_IMAGE } from "@/data/projects.data";
import { ProjectsLogoRail } from "@/components/projects/ProjectsLogoRail";
import { ProjectsOverlay } from "@/components/projects/ProjectsOverlay";
import { ImageGallery } from "@/components/projects/ImageGallery";
import { TextureOverlay } from "@/components/ui/visuals/TextureOverlay";
import { BlobCursor } from "@/components/ui/BlobCursor";
import { useGSAP } from "@/providers/GSAPProvider";
import { useLenis } from "@/providers/LenisProvider";

export type ProjectWithImages = ProjectItem & { imageUrls: string[] };

interface ProjectsPageClientProps {
  projects: ProjectWithImages[];
}

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

// Timing constants for cinematic transitions
const TIMING = {
  LENIS_SCROLL: 950,        // Match Lenis scrollTo duration
  LOGO: 400,
  OVERLAY: 520,
  IMAGE: 720,
  TRANSITION_LOCK: 1050,    // Slightly longer than LENIS_SCROLL for safety
} as const;

export function ProjectsPageClient({ projects }: ProjectsPageClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeProject = useMemo(() => projects[activeIndex], [activeIndex, projects]);
  const totalSteps = Math.max(1, projects.length - 1);
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
  const isProgrammaticScrollRef = useRef(false);
  const scrollLockTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { isReady: isGSAPReady } = useGSAP();
  const { lenis } = useLenis();

  // Centralized transition timeout management (CR-2)
  const clearTransitionTimeout = useCallback(() => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
      transitionTimeoutRef.current = null;
    }
  }, []);

  const startTransition = useCallback(() => {
    clearTransitionTimeout();
    setIsTransitioning(true);
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      transitionTimeoutRef.current = null;
    }, TIMING.TRANSITION_LOCK);
  }, [clearTransitionTimeout]);

  const lockScroll = useCallback(() => {
    isProgrammaticScrollRef.current = true;
    if (scrollLockTimeoutRef.current) {
      clearTimeout(scrollLockTimeoutRef.current);
    }
    scrollLockTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, TIMING.TRANSITION_LOCK);
  }, []);

  const handleContainerClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.closest?.("button") || target?.closest?.("a")) {
      return;
    }
    window.open(activeProject.href, "_blank", "noopener,noreferrer");
  }, [activeProject.href]);

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
    if (isTransitioning) return;
    const current = activeIndexRef.current;
    const nextIndex = current === 0 ? projects.length - 1 : current - 1;
    setDirection(-1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    lockScroll();
    scrollToIndex(nextIndex);
    startTransition();
  }, [scrollToIndex, projects.length, isTransitioning, lockScroll, startTransition]);

  const onNext = useCallback(() => {
    if (isTransitioning) return;
    const current = activeIndexRef.current;
    const nextIndex = current === projects.length - 1 ? 0 : current + 1;
    setDirection(1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    lockScroll();
    scrollToIndex(nextIndex);
    startTransition();
  }, [scrollToIndex, projects.length, isTransitioning, lockScroll, startTransition]);

  const handleSelect = useCallback((index: number) => {
    const current = activeIndexRef.current;
    if (index === current || isTransitioning) {
      return;
    }

    setDirection(index > current ? 1 : -1);
    activeIndexRef.current = index;
    setActiveIndex(index);
    lockScroll();
    scrollToIndex(index);
    startTransition();
  }, [scrollToIndex, isTransitioning, lockScroll, startTransition]);

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
          if (isProgrammaticScrollRef.current) {
            return;
          }

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

  // Preload adjacent project images
  useEffect(() => {
    const nextIndex = (activeIndex + 1) % projects.length;
    const prevIndex = (activeIndex - 1 + projects.length) % projects.length;
    
    [nextIndex, prevIndex].forEach(idx => {
      projects[idx].imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    });
  }, [activeIndex, projects]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, isTransitioning]);

  // Cleanup timeouts on unmount (CR-1: Memory leak fix)
  useEffect(() => {
    return () => {
      if (scrollLockTimeoutRef.current) {
        clearTimeout(scrollLockTimeoutRef.current);
      }
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div ref={mainRef} className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        <BlobCursor targetRef={mainRef} onClick={handleContainerClick} />
        
        {/* Background Stage - Replaces ProjectsStageServer for Client usage */}
        <div className="absolute inset-0 overflow-hidden bg-background">
          <div
            className="absolute inset-0 z-0 opacity-60"
            style={{
              background: `
                radial-gradient(80% 55% at 38% 52%, var(--accent-faded), transparent 72%),
                radial-gradient(95% 60% at 86% 62%, rgba(0, 0, 0, 0.4), transparent 74%),
                linear-gradient(110deg, color-mix(in srgb, var(--background) 90%, transparent) 24%, color-mix(in srgb, var(--background) 70%, transparent) 48%, color-mix(in srgb, var(--background) 90%, transparent) 100%)
              `,
            }}
          />
          <TextureOverlay url={PROJECTS_TEXTURE_IMAGE} opacity={0.15} />

          <div className="absolute right-0 top-[0%] bottom-[0%] w-full md:w-[60%] lg:w-[57%] z-10 flex items-center justify-center p-6 md:p-12 lg:pr-24 lg:pl-0">
            <ImageGallery 
              images={activeProject.imageUrls} 
              imageAlt={activeProject.imageAlt} 
              projectId={activeProject.id}
            />
          </div>
        </div>
  
        <section className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 px-6 pb-6 md:px-[68px] md:pb-8">
          <div className="flex max-w-[1080px] flex-col gap-8 md:gap-5">
            <AnimatePresence mode="popLayout">
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
                  <ProjectsOverlay project={activeProject} isTransitioning={isTransitioning} />
              </motion.div>
            </AnimatePresence>
  
            <div className="pointer-events-auto w-fit">
              <ProjectsLogoRail
                projects={projects}
                activeIndex={activeIndex}
                onSelect={handleSelect}
                isTransitioning={isTransitioning}
              />
            </div>
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
