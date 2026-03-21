import clsx from "clsx";

import type { ProjectItem } from "@/app/projects/projects.data";

type ProjectsLogoRailProps = {
  projects: ProjectItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ProjectsLogoRail({ projects, activeIndex, onSelect }: ProjectsLogoRailProps) {
  return (
    <div className="projects-logo-rail relative z-20 flex w-fit items-center gap-5 rounded-[12px] p-5">
      {projects.map((project, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(index)}
            className={clsx(
              "projects-logo-button flex h-[120px] w-[120px] items-center justify-center rounded-[12px] px-2 text-[17px] font-semibold uppercase tracking-[0.02em]",
              isActive ? "is-active" : "is-inactive"
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
