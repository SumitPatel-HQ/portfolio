import Image from "next/image";
import clsx from "clsx";
import { motion } from "framer-motion";
import React from "react";

import type { ProjectItem } from "@/data/projects.data";

type ProjectsLogoRailProps = {
  projects: ProjectItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

// Refined spring: premium momentum with natural ease
const activeIndicatorTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 35,
  mass: 0.4,
  bounce: 0,
  restDelta: 0.01,
  restSpeed: 0.01,
};

// Subtle fade for content sync
const contentTransition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  mass: 0.4,
};

export function ProjectsLogoRail({ projects, activeIndex, onSelect }: ProjectsLogoRailProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[112px] w-full" />;

  return (
    <div className="w-full overflow-x-auto" data-lenis-prevent>
      <div 
        className="show-default-cursor relative z-20 flex w-max items-center gap-2.5 rounded-[20px] bg-foreground/[0.03] p-2.5 backdrop-blur-md ring-1 ring-inset ring-foreground/[0.06] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)] max-[900px]:gap-2 max-[900px]:p-2"
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {projects.map((project, index) => {
        const isActive = index === activeIndex;
        const isImagePath = project.logo.startsWith("/") || project.logo.startsWith("http");

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(index)}
            className={clsx(
              "group relative flex h-[92px] w-[92px] items-center justify-center rounded-[16px] outline-none max-[900px]:h-[68px] max-[900px]:w-[68px] mouse-pointer",
              isActive
                ? "text-foreground"
                : "text-foreground/50 hover:text-foreground/80"
            )}
            aria-label={`Show ${project.logoAlt}`}
            aria-pressed={isActive}
          >
            {/* Hover background layer - subtle and unified */}
            <motion.div
              className="absolute inset-0 rounded-[16px] bg-foreground/[0.03] ring-1 ring-inset ring-foreground/[0.02]"
              initial={false}
              animate={{
                opacity: isActive ? 0 : 1,
                scale: isActive ? 0.96 : 1,
              }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              style={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />

            {/* Active indicator - tactile, precise, premium depth */}
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 rounded-[16px] bg-foreground/[0.05] shadow-[0_2px_12px_rgba(0,0,0,0.06),_inset_0_1px_1px_rgba(255,255,255,0.04)] ring-1 ring-inset ring-foreground/[0.08]"
                transition={activeIndicatorTransition}
                style={{ willChange: "transform" }}
              />
            )}

            {/* Content with synchronized fade */}
            <motion.span
              className="relative z-10 flex  items-center justify-center"
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.92,
                opacity: isActive ? 1 : 0.6,
              }}
              transition={contentTransition}
            >
              {isImagePath ? (
                <div className="relative h-full w-full p-9 max-[900px]:h-[68px] max-[900px]:w-[68px] max-[900px]:p-2">
                  <Image
                    src={project.logo}
                    alt={project.logoAlt}
                    fill
                    sizes="(max-width: 900px) 68px, 92px"
                    unoptimized={true}
                    priority={index === 0}
                    className={clsx(
                      "object-contain transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
                      isActive 
                        ? "brightness-0 invert opacity-80" 
                        : "opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                    )}
                  />
                </div>
              ) : (
                <span className="text-[15px] font-medium uppercase tracking-[0.02em] max-[900px]:text-[13px]">
                  {project.logo}
                </span>
              )}
            </motion.span>
          </button>
        );
      })}
      </div>
    </div>
  );
}
