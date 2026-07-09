"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DynamicContactOrb = dynamic(
  () => import("./ContactOrb").then((module) => module.ContactOrb),
  { loading: () => <ContactOrbPlaceholder /> },
);

function ContactOrbPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full"
    />
  );
}

export function DeferredContactOrb() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShouldLoad(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-56 w-56 items-center justify-center md:h-64 md:w-full lg:h-72 lg:w-72"
    >
      {shouldLoad ? <DynamicContactOrb /> : <ContactOrbPlaceholder />}
    </div>
  );
}
