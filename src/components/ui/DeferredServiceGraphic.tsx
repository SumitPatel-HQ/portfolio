"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DynamicServiceGraphic = dynamic(
  () =>
    import("@/components/ui/ServiceGraphic").then(
      (module) => module.ServiceGraphic,
    ),
  {
    loading: () => <ServiceGraphicPlaceholder />,
  },
);

interface DeferredServiceGraphicProps {
  id: string;
}

function ServiceGraphicPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="h-full w-full rounded-[12px] border border-white/[0.08] bg-background-secondary/30"
    />
  );
}

export function DeferredServiceGraphic({ id }: DeferredServiceGraphicProps) {
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
      { rootMargin: "600px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      {shouldLoad ? <DynamicServiceGraphic id={id} /> : <ServiceGraphicPlaceholder />}
    </div>
  );
}
