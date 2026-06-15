"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface MobileRouteHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function MobileRouteHeader({ title, showBackButton = false }: MobileRouteHeaderProps) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest <= 0) {
      setHidden(false);
      return;
    }
    
    if (latest > previous && latest > 50) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  return (
    <>
      {/* Invisible placeholder to maintain document flow without jumping */}
      <div 
        className="w-full opacity-0 pointer-events-none select-none pt-[env(safe-area-inset-top)]" 
        aria-hidden="true"
      >
        <div className={`pt-5 pb-5 px-5 border-b border-transparent ${showBackButton ? "flex items-center gap-3" : ""}`}>
          {showBackButton && (
            <div className="p-1 -ml-1">
              <ArrowLeft className="w-8 h-8" />
            </div>
          )}
          <h1 className="text-3xl scale-y-[1.1] font-bold tracking-tight uppercase">{title}</h1>
        </div>
      </div>

      {/* Actual animated fixed header */}
      <motion.div 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background pt-[env(safe-area-inset-top)] w-full"
      >
        <div className="pt-5 pb-5 px-5 border-b border-white/20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={showBackButton ? "flex items-center gap-3" : ""}
          >
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className="p-1 -ml-1 rounded-full text-foreground/80 active:text-foreground active:bg-white/10 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
            )}
            <h1 className="text-3xl scale-y-[1.1] font-bold tracking-tight text-foreground uppercase">{title}</h1>
          </motion.div>
        </div>
    </motion.div>
    </>
  );
}
