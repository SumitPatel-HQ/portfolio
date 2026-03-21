import { ArrowLeft, ArrowRight } from "lucide-react";

type ProjectsNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
};

export function ProjectsNavigation({ onPrev, onNext }: ProjectsNavigationProps) {
  return (
    <div className="relative z-20 ml-auto mr-14 mt-auto flex items-center gap-4 pb-10 xl:mr-[68px] xl:pb-12">
      <button type="button" className="projects-nav-btn" onClick={onPrev} aria-label="Show previous project">
        <ArrowLeft size={20} />
      </button>
      <button
        type="button"
        className="projects-nav-btn opacity-45 hover:opacity-100"
        onClick={onNext}
        aria-label="Show next project"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

