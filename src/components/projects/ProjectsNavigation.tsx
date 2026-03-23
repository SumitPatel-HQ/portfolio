import { ArrowLeft, ArrowRight } from "lucide-react";

type ProjectsNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
};

export function ProjectsNavigation({ onPrev, onNext }: ProjectsNavigationProps) {
  return (
    <div className="relative z-20 flex items-center gap-4">
      <button 
        type="button" 
        className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-full text-foreground border border-border bg-transparent transition-all duration-200 ease-in-out hover:-translate-y-[1px] hover:border-white/95 hover:text-white" 
        onClick={onPrev} 
        aria-label="Show previous project"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center w-[60px] h-[60px] rounded-full text-foreground border border-border bg-transparent transition-all duration-200 ease-in-out hover:-translate-y-[1px] hover:border-white/95 hover:text-white opacity-45 hover:opacity-100"
        onClick={onNext}
        aria-label="Show next project"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
