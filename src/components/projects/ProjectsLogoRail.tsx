import clsx from "clsx";

import type { ProjectItem } from "@/app/projects/projects.data";

type ProjectsLogoRailProps = {
  projects: ProjectItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ProjectsLogoRail({ projects, activeIndex, onSelect }: ProjectsLogoRailProps) {
  return (
    <div className="relative z-20 flex w-fit items-center gap-5 rounded-[12px] bg-white/3 p-5 backdrop-blur-[11px] shadow-[0_2px_20px_rgba(0,0,0,0.15)] max-[900px]:gap-3 max-[900px]:p-3">
      {projects.map((project, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(index)}
            className={clsx(
              "flex h-[120px] w-[120px] items-center justify-center rounded-[12px] border border-white/6 px-2 text-[17px] font-semibold uppercase tracking-[0.02em] transition-all duration-[280ms] ease-in-out max-[900px]:h-[74px] max-[900px]:w-[74px] max-[900px]:text-[11px] max-[900px]:leading-[1.1]",
              isActive 
                ? "bg-accent text-background shadow-[inset_2px_-2px_2px_rgba(255,255,255,0.2),inset_-2px_2px_2px_rgba(0,0,0,0.1)]" 
                : "bg-[#0a0a0a]/98 text-white/50 hover:bg-[#1a1a1a]/72 hover:text-foreground"
            )}
            aria-label={`Show ${project.logoAlt}`}
            aria-pressed={isActive}
          >
            {project.logo}
          </button>
        );
      })}
    </div>
  );
}
