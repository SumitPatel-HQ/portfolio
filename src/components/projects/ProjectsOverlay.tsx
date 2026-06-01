import { motion } from "framer-motion";

import type { ProjectItem } from "@/data/projects.data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type ProjectsOverlayProps = {
  project: ProjectItem;
};

export function ProjectsOverlay({ project }: ProjectsOverlayProps) {
  return (
    <div className="relative z-20 flex max-w-245 flex-col gap-8 px-6">
      <div className="flex flex-col gap-6">
        <ScrollReveal
          as={motion.h1}
          containerClassName="!my-0"
          textClassName="pointer-events-auto w-fit text-[clamp(3rem,5.2vw,4.6rem)] leading-[1.04] text-foreground tracking-[-0.02em] font-medium"
          size="none"
          align="none"
          variant="none"
          baseOpacity={0}
          blurStrength={4}
          staggerDelay={0.04}
        >
          {project.name}
        </ScrollReveal>
        <div className="pointer-events-auto w-fit flex flex-wrap items-end gap-5">
          <ScrollReveal
            as={motion.div}
            containerClassName="!my-0"
            textClassName="flex flex-wrap gap-2.5 max-w-[700px]"
            size="none"
            align="none"
            variant="none"
            baseOpacity={0}
            blurStrength={4}
            staggerDelay={0.06}
          >
            {project.tags.map((tag, index) => (
              <span
                key={`${project.id}-${tag}-${index}`}
                className="inline-flex items-center rounded-full border border-white/10 bg-foreground-secondary/10 px-3.5 py-1.5 text-[clamp(0.8rem,1.1vw,0.95rem)] font-extralight text-foreground-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] backdrop-blur-[2px]"
              >
                {tag}
              </span>
            ))}
          </ScrollReveal>
        </div>
      </div>
      <ScrollReveal
        as={motion.p}
        containerClassName="!my-0"
        textClassName="pointer-events-auto w-fit max-w-2xl text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.22] tracking-[-0.01em] text-foreground-secondary/50 font-normal"
        size="none"
        align="none"
        variant="none"
        baseOpacity={0}
        blurStrength={2}
        staggerDelay={0.02}
      >
        {project.description}
      </ScrollReveal>
    </div>
  );
}
