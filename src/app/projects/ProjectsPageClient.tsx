"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ArrowUpRight } from "lucide-react";

import { ProjectItem, PROJECTS_TEXTURE_IMAGE } from "@/data/projects.data";
import { ProjectsLogoRail } from "@/components/projects/ProjectsLogoRail";
import { ProjectsOverlay } from "@/components/projects/ProjectsOverlay";
import { ImageGallery } from "@/components/projects/ImageGallery";
import { TextureOverlay } from "@/components/ui/visuals/TextureOverlay";
import { BlobCursor } from "@/components/ui/visuals/BlobCursor";
import { useGSAP } from "@/providers/GSAPProvider";
import { useLenis } from "@/providers/LenisProvider";

export type ProjectWithImages = ProjectItem & { imageUrls: string[] };

interface ProjectsPageClientProps {
  projects: ProjectWithImages[];
}

const overlayVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 20 : -20,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -20 : 20,
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

  const { isReady: isGSAPReady } = useGSAP();
  const { lenis } = useLenis();

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchEndRef = useRef<{ x: number; y: number } | null>(null);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    };
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    
    const currentX = e.targetTouches[0].clientX;
    const currentY = e.targetTouches[0].clientY;
    
    const dx = touchStartRef.current.x - currentX;
    const dy = touchStartRef.current.y - currentY;
    
    // If the gesture is primarily horizontal, prevent native vertical scrolling
    if (Math.abs(dx) > Math.abs(dy)) {
      if (e.cancelable) {
        e.preventDefault();
      }
    }

    touchEndRef.current = {
      x: currentX,
      y: currentY,
    };
  }, []);

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
    if (window.innerWidth < 1280) return;

    const target = e.target as HTMLElement;
    if (
      target?.closest?.("button") || 
      target?.closest?.("a") ||
      target?.closest?.("[data-prevent-project-click]")
    ) {
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
    const current = activeIndexRef.current;
    const nextIndex = current === 0 ? projects.length - 1 : current - 1;
    setDirection(-1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    lockScroll();
    scrollToIndex(nextIndex);
  }, [scrollToIndex, projects.length, lockScroll]);

  const onNext = useCallback(() => {
    const current = activeIndexRef.current;
    const nextIndex = current === projects.length - 1 ? 0 : current + 1;
    setDirection(1);
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
    lockScroll();
    scrollToIndex(nextIndex);
  }, [scrollToIndex, projects.length, lockScroll]);

  const onTouchEnd = useCallback(() => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const dx = touchStartRef.current.x - touchEndRef.current.x;
    const dy = touchStartRef.current.y - touchEndRef.current.y;
    
    // Balanced sensitivity: min swipe distance 50px, and horizontal distance > vertical distance * 1.5
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0) {
        onNext(); // swipe left -> next
      } else {
        onPrev(); // swipe right -> prev
      }
    }

    touchStartRef.current = null;
    touchEndRef.current = null;
  }, [onNext, onPrev]);

  const handleSelect = useCallback((index: number) => {
    const current = activeIndexRef.current;
    if (index === current) {
      return;
    }

    setDirection(index > current ? 1 : -1);
    activeIndexRef.current = index;
    setActiveIndex(index);
    lockScroll();
    scrollToIndex(index);
  }, [scrollToIndex, lockScroll]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // ── Tab Duplication / BFCache Restore — Projects Page ─────────────────────
  // When the browser clones a tab it serializes:
  //   1. The GSAP <div data-pin-spacer> wrapper around mainRef.
  //   2. Framer Motion inline transforms on whichever slide overlay was active.
  //
  // On restore React re-mounts with activeIndex=0, but the DOM carries frozen
  // transforms for the previously-visible slide.  The pageshow handler:
  //   a) Reads the actual restored scroll position → derives the correct index.
  //   b) Wipes stale Framer inline styles so Framer can own the overlay cleanly.
  //   c) Syncs React state so the re-initialized ScrollTrigger starts correctly.
  useLayoutEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;

      // Derive activeIndex from the current scroll position.
      // We must do this before GSAP's ScrollTrigger is recreated so the state
      // is correct when onUpdate fires for the first time.
      const trigger = triggerRef.current;
      if (trigger && totalSteps > 0) {
        const scrollY = window.scrollY;
        const rawProgress = (scrollY - trigger.start) / (trigger.end - trigger.start);
        const clampedProgress = Math.max(0, Math.min(1, rawProgress));
        const restoredIndex = Math.round(clampedProgress * totalSteps);
        if (restoredIndex !== activeIndexRef.current) {
          activeIndexRef.current = restoredIndex;
          setActiveIndex(restoredIndex);
        }
      }

      // Wipe any Framer Motion inline transforms that were serialized by the
      // browser clone so Framer can animate from a clean baseline.
      const overlayGrid = document.querySelector<HTMLElement>(".relative.grid.grid-cols-1.grid-rows-1");
      if (overlayGrid) {
        overlayGrid.querySelectorAll<HTMLElement>(".col-start-1.row-start-1").forEach((el) => {
          el.style.removeProperty("transform");
          el.style.removeProperty("opacity");
        });
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [totalSteps]);
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isGSAPReady || !mainRef.current) {
      return;
    }

    const transitionContent = mainRef.current.closest(".transition-content") as HTMLElement | null;
    if (!transitionContent) {
      return;
    }

    // Unwrap any orphaned GSAP pin-spacer serialized during tab duplication.
    // Without this, GSAP nests a new spacer inside the dead one → doubled page
    // height → sections overlap.
    if (mainRef.current) {
      const parent = mainRef.current.parentElement;
      if (parent && parent.hasAttribute("data-pin-spacer")) {
        const grandparent = parent.parentElement;
        if (grandparent) {
          grandparent.insertBefore(mainRef.current, parent);
          parent.remove();
        }
      }
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const trigger = ScrollTrigger.create({
          trigger: mainRef.current,
          start: 0,
          pinnedContainer: transitionContent,
          end: () => `+=${perCardScrollDistance * totalSteps}`,
          pin: true,
          pinType: "transform", // CRITICAL FIX: Do not use position: fixed. Use transforms to pin!
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

        return () => {
          triggerRef.current = null;
        };
      });
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
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev]);

  // Cleanup timeouts on unmount (CR-1: Memory leak fix)
  useEffect(() => {
    return () => {
      if (scrollLockTimeoutRef.current) {
        clearTimeout(scrollLockTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div 
        ref={mainRef} 
        className="relative flex min-h-screen w-full flex-col xl:overflow-hidden bg-background text-foreground"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <BlobCursor targetRef={mainRef} onClick={handleContainerClick} />

        {/* Background Stage */}
        <div className="absolute inset-0 overflow-hidden bg-background pointer-events-none z-0">
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

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent xl:block hidden" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/35 via-transparent to-transparent xl:block hidden" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-52 bg-gradient-to-r from-black/40 via-transparent to-transparent xl:block hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-52 bg-gradient-to-l from-black/35 via-transparent to-transparent xl:block hidden" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[1px] bg-white/12 xl:block hidden" />
          <div className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-[1px] bg-white/10 xl:block hidden" />
        </div>

        {/* Vertical Flow Container */}
        <div className="relative z-10 flex-1 flex flex-col xl:block w-full min-h-screen pt-28 xl:pt-0">
          
          <div className="relative xl:absolute xl:right-0 xl:top-[0%] xl:bottom-[0%] w-full xl:w-[57%] z-10 flex items-center justify-center p-6 md:p-12 xl:pr-24 xl:pl-0 min-h-[40vh] md:min-h-[50vh] xl:min-h-0 ">
            <ImageGallery
              images={activeProject.imageUrls}
              imageAlt={activeProject.imageAlt}
              projectId={activeProject.id}
            />
          </div>

          <section className="relative xl:absolute xl:bottom-0 xl:left-0 xl:w-[45%] z-30 px-6 pb-12 xl:pb-6 md:px-[68px] xl:pointer-events-none isolate flex-1 flex flex-col justify-end mt-4 xl:mt-0">
            <div className="flex w-full flex-col gap-8 md:gap-8">
              <div className="relative grid grid-cols-1 grid-rows-1 w-full items-end">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProject.id}
                    custom={direction}
                    variants={overlayVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.52, ease: [0.32, 0.72, 0, 1] }}
                    className="col-start-1 row-start-1 flex w-full flex-col gap-[clamp(2.2rem,4.4vw,72px)] self-end"
                    style={{
                      willChange: "transform, opacity",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <ProjectsOverlay project={activeProject} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-6 xl:px-6 relative z-20">
                {/* github repo link  */}
                {(activeProject.repoUrl || activeProject.href.includes("github.com")) && (
                  <div className="pointer-events-auto w-fit">
                    <a
                      href={activeProject.repoUrl || activeProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group show-default-cursor cursor-pointer inline-flex items-center gap-3 text-foreground hover:opacity-70 transition-all duration-300 font-medium text-[1.05rem]"
                    >
                      <Github className="w-5 h-5 group-hover:opacity-100 transition-opacity" />
                      <span className="uppercase tracking-wider">
                        GitHub Repository
                      </span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:opacity-70 transition-all duration-300">
                        <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2} />
                      </div>
                    </a>
                  </div>
                )}
                
                {/* Mobile/Tablet Visit Site Button */}
                <div className="pointer-events-auto w-fit xl:hidden">
                   <a
                      href={activeProject.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group show-default-cursor cursor-pointer inline-flex items-center gap-3 text-foreground hover:opacity-70 transition-all duration-300 font-medium text-[1.05rem]"
                   >
                     <span className="uppercase tracking-wider">
                       Visit Live Site
                     </span>
                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 hover:opacity-70 transition-all duration-300">
                        <ArrowUpRight className="w-[18px] h-[18px]" strokeWidth={2} />
                     </div>
                   </a>
                </div>
              </div>

              <div className="pointer-events-auto w-fit mt-2 xl:mt-0">
                <ProjectsLogoRail
                  projects={projects}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
