import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import type { ProjectItem } from "@/app/projects/projects.data";

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
          <p className="max-w-[700px] text-[clamp(1.15rem,1.72vw,1.75rem)] leading-[1.3] text-foreground-secondary">
            {project.tags}
          </p>
          <Link
            href={project.href}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-foreground/30 bg-foreground/10 px-4 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background"
          >
            Enter <ArrowUpRight size={14} strokeWidth={2.2} />
          </Link>
        </motion.div>
      </div>
      <motion.p 
        className="max-w-[980px] text-[clamp(1rem,1.2vw,1.25rem)] leading-[1.22] tracking-[-0.01em] text-muted-custom"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.42, delay: 0.22, ease: "easeOut" }}
      >
        {project.description}
      </motion.p>
    </div>
  );
}
