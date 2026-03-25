import { motion } from "framer-motion";

import type { ProjectItem } from "@/data/projects.data";

type ProjectsOverlayProps = {
  project: ProjectItem;
};

export function ProjectsOverlay({ project }: ProjectsOverlayProps) {
  return (
    <div className="relative z-20 flex max-w-[980px] flex-col gap-8 px-6">
      <div className="flex flex-col gap-6">
        <motion.h1
          className="text-[clamp(3rem,5.2vw,4.6rem)] leading-[1.04] text-foreground tracking-[-0.02em] font-medium"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.46, delay: 0.08, ease: "easeOut" }}
        >
          {project.name}
        </motion.h1>
        <motion.div
          className="flex flex-wrap items-end gap-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.44, delay: 0.14, ease: "easeOut" }}
        >
          <div className="flex flex-wrap gap-2.5 max-w-[700px]">
            {project.tags.split(/[,•]/).map(t => t.trim()).filter(Boolean).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full border border-white/10 bg-foreground-secondary/10 px-3.5 py-1.5 text-[clamp(0.8rem,1.1vw,0.95rem)] font-extralight text-foreground-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] backdrop-blur-[2px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.p
        className="max-w-4xl text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.22] tracking-[-0.01em] text-foreground-secondary/50 font-normal"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.22, ease: "easeOut" }}
      >
        {project.description}
      </motion.p>
    </div>
  );
}
