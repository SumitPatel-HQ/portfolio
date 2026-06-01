"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { MoveUpRight as ArrowIcon } from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { useIsClient } from "@/hooks/useIsClient";
import { PROJECTS, ProjectItem } from "@/data/projects.data";
import { getProjectImageUrl } from "@/lib/imagekit";
import gsap from "gsap";
import { useGSAP } from "@/providers/GSAPProvider";



export const FeaturedWork = () => {
  const [focusedItem, setFocusedItem] = useState<ProjectItem | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const isClient = useIsClient();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40 });

  const sectionRef = useRef<HTMLElement>(null);
  const { isReady: isGSAPReady } = useGSAP();

  // Configuration constants
  const CONFIG = {
    PREVIEW_WIDTH: 480,
    PREVIEW_HEIGHT: 270,
    PREVIEW_GAP: 24,
    VIEWPORT_PADDING: 16,
    MOBILE_BREAKPOINT: 768,
  } as const;

  // Derived values
  const PREVIEW_WIDTH = CONFIG.PREVIEW_WIDTH;
  const PREVIEW_HEIGHT = CONFIG.PREVIEW_HEIGHT;
  const PREVIEW_GAP = CONFIG.PREVIEW_GAP;
  const VIEWPORT_PADDING = CONFIG.VIEWPORT_PADDING;

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${CONFIG.MOBILE_BREAKPOINT}px)`);
    
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsLargeScreen('matches' in e ? e.matches : (e as MediaQueryList).matches);
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // CONFIG.MOBILE_BREAKPOINT is a constant

  useEffect(() => {
    if (!isGSAPReady || !sectionRef.current) return;

    const titleWords = sectionRef.current.querySelectorAll(".title-word");
    const projectChars = sectionRef.current.querySelectorAll(".project-char");
    const projectArrows = sectionRef.current.querySelectorAll(".project-arrow");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleWords,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.05, duration: 1, ease: "power3.out" }
      )
      .fromTo(
        projectChars,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          stagger: { amount: 0.6 }, // Distributes the stagger evenly across all characters within 0.6 seconds
          duration: 1, 
          ease: "power3.out" 
        },
        "<0.1"
      )
      .fromTo(
        projectArrows,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { 
          y: 0, 
          opacity: 1, 
          filter: "blur(0px)", 
          stagger: { amount: 0.6 }, 
          duration: 1, 
          ease: "power3.out" 
        },
        "<" // Syncs exactly with the project letters staggering
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isGSAPReady]);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!isLargeScreen) {
      return;
    }

    const maxX = window.innerWidth - PREVIEW_WIDTH - VIEWPORT_PADDING;
    const maxY = window.innerHeight - PREVIEW_HEIGHT - VIEWPORT_PADDING;
    const desiredX = event.clientX + PREVIEW_GAP;
    const desiredY = event.clientY + PREVIEW_GAP;

    const clampedX = Math.max(VIEWPORT_PADDING, Math.min(desiredX, maxX));
    const clampedY = Math.max(VIEWPORT_PADDING, Math.min(desiredY, maxY));

    cursorX.set(clampedX);
    cursorY.set(clampedY);
  };

  const handleActivate = (item: ProjectItem) => {
    setFocusedItem(item);
  };

  const handleDeactivate = () => {
    setFocusedItem(null);
  };

  return (
    <section ref={sectionRef} className="w-full px-8 md:px-24 py-20 flex flex-col" aria-labelledby="featured-work-title">
      <h2
        id="featured-work-title"
        className="text-3xl md:text-5xl font-extrabold mb-12 flex items-center gap-4 scale-y-[1.1]"
      >
        <span className="sr-only">Featured Work</span>
        <span aria-hidden="true" className="inline-flex overflow-hidden pb-4 -mb-4">
          {"Featured Work".split(" ").map((word, index, array) => (
            <span key={index} className="inline-flex">
              <span className="title-word inline-block">{word}</span>
              {index < array.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      </h2>

      <div
        className="relative mx-auto w-full min-h-fit rounded-md border border-black/10 dark:border-white/10 overflow-hidden bg-white/80 dark:bg-black/30 backdrop-blur-sm"
        onMouseMove={handlePointerMove}
        onMouseLeave={handleDeactivate}
        role="region"
        aria-label="Featured projects image reveal"
      >
        <ul className="w-full">
          {PROJECTS.slice(0, 4).map((item) => (
            <li key={item.id} className="relative">
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-left p-4 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                onMouseEnter={() => handleActivate(item)}
                onFocus={() => handleActivate(item)}
                onBlur={handleDeactivate}
                onMouseLeave={() => {
                  if (!isLargeScreen) {
                    handleDeactivate();
                  }
                }}
                aria-label={`Visit ${item.name}`}
              >
                {!isLargeScreen && (
                  <Image
                    src={getProjectImageUrl(`${item.imageFolder}/${item.previewImage}`)}
                    width={1200}
                    height={700}
                    className="w-full h-52 object-cover rounded-md"
                    alt={item.imageAlt}
                    sizes="(max-width: 767px) 100vw, 0px"
                  />
                )}

                <h3
                  className={cn(
                    "uppercase md:text-5xl sm:text-3xl text-2xl font-bold sm:py-6 py-2 leading-[0.95] relative transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    focusedItem?.id === item.id
                      ? "text-foreground sm:mix-blend-difference sm:z-20"
                      : "text-foreground/85"
                  )}
                >
                  <span className="sr-only">{item.name}</span>
                  <span aria-hidden="true" className="inline-flex overflow-hidden pb-1 -mb-1">
                    {item.name.split("").map((char, index) => (
                      <span
                        key={index}
                        className="project-char inline-block"
                        style={{ whiteSpace: "pre" }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </h3>

                <span
                  className={cn(
                    "project-arrow hidden sm:flex p-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    focusedItem?.id === item.id
                      ? "bg-accent text-background z-20"
                      : "text-foreground"
                  )}
                  aria-hidden="true"
                >
                  <ArrowIcon className="w-8 h-8" />
                </span>

                <span
                  className={cn(
                    "h-[2px] bg-black dark:bg-white absolute bottom-0 left-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    focusedItem?.id === item.id ? "w-full" : "w-0"
                  )}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        {isClient &&
          createPortal(
            <AnimatePresence>
              {isLargeScreen && focusedItem && (
                <motion.div
                  key={focusedItem.id}
                  className="fixed z-[999] pointer-events-none"
                  style={{
                    left: smoothX,
                    top: smoothY,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  aria-hidden="true"
                >
                  <Image
                    src={getProjectImageUrl(`${focusedItem.imageFolder}/${focusedItem.previewImage}`)}
                    width={1920}
                    height={1080}
                    alt=""
                    className="object-cover w-[440px] lg:w-[480px] h-[248px] lg:h-[270px] rounded-lg shadow-2xl bg-white dark:bg-zinc-950"
                    sizes="480px"
                    quality={100}
                    priority
                  />
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )}
      </div>
    </section>
  );
};
