"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTransitionRouter, useTransitionState } from "next-transition-router";
import { ArrowLeft } from "lucide-react";

// Preserve content offsets without duplicating header or arrow markup.
// Fixed stable height avoids vertical reflow between list and detail states.
export function MobileRouteHeaderSpace({ detail = false }: { detail?: boolean } = {}) {
  return <div aria-hidden="true" className="shrink-0 h-[calc(81px+env(safe-area-inset-top))]" />;
}

export function MobileRouteHeader() {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const { stage } = useTransitionState();
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const isProjectsRoute = pathname === "/projects" || pathname.startsWith("/projects/");
  const detail = /^\/projects\/[^/]+\/?$/.test(pathname);
  const title = isProjectsRoute ? "PROJECTS"
    : pathname === "/services" ? "SERVICES"
    : pathname === "/contact" ? "CONTACT" : null;

  const [scrollState, setScrollState] = useState({ pathname, hidden: false });
  const hidden = scrollState.pathname === pathname && scrollState.hidden;

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (stage !== "none") return;
    const previous = scrollY.getPrevious() ?? 0;
    const nextHidden = latest > previous && latest > 50;
    if (latest !== previous) {
      setScrollState((current) => current.pathname === pathname && current.hidden === nextHidden
        ? current : { pathname, hidden: nextHidden });
    }
  });

  if (!title) return null;

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <motion.header
      data-mobile-route-header="true"
      data-transition-chrome="true"
      initial={false}
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: "easeInOut" }}
      className="mobile-route-header md:hidden fixed top-0 left-0 right-0 z-50 bg-background pt-[env(safe-area-inset-top)] w-full"
    >
      <div className="pt-5 pb-5 px-5 border-b border-accent/5">
        <div className="relative flex items-center h-10">
          <motion.button
            initial={false}
            animate={{
              opacity: detail ? 1 : 0,
              x: detail ? 0 : -16,
            }}
            transition={transition}
            style={{ pointerEvents: detail ? "auto" : "none" }}
            onClick={() => router.push("/projects")}
            disabled={stage === "leaving"}
            className="absolute left-0 p-1 -ml-1 rounded-full text-foreground/80 active:text-foreground active:bg-white/10 transition-colors"
            aria-label="Back to projects"
            aria-hidden={!detail}
            tabIndex={detail ? 0 : -1}
          >
            <ArrowLeft className="w-8 h-8" aria-hidden="true" />
          </motion.button>

          <motion.div
            initial={false}
            animate={{ x: detail ? 48 : 0 }}
            transition={transition}
            className="flex items-center"
          >
            <h2 className="text-3xl scale-y-[1.1] font-bold tracking-tight text-foreground uppercase">
              {title}
            </h2>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
