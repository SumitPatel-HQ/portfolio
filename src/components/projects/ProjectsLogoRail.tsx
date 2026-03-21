import clsx from "clsx";

import type { ProjectItem } from "@/app/projects/projects.data";

type ProjectsLogoRailProps = {
  projects: ProjectItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function ProjectsLogoRail({ projects, activeIndex, onSelect }: ProjectsLogoRailProps) {
  return (
    <div className="projects-logo-rail relative z-20 mx-16 mt-auto flex w-fit items-center gap-3 rounded-xl p-3 xl:mx-24 xl:mb-14">
      {projects.map((project, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(index)}
            className={clsx(
              "projects-logo-button min-h-[62px] min-w-[88px] rounded-[10px] px-4 py-3 text-sm font-semibold uppercase tracking-[0.04em]",
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
