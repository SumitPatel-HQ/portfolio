"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { MoveUpRight as ArrowIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface VisualItem {
  key: number;
  url: string;
  label: string;
}

const visualData: VisualItem[] = [
  {
    key: 1,
    url: "https://images.pexels.com/photos/9002742/pexels-photo-9002742.jpeg",
    label: "Pinky Island",
  },
  {
    key: 2,
    url: "https://images.pexels.com/photos/31622979/pexels-photo-31622979.jpeg",
    label: "Greedy Model",
  },
  {
    key: 3,
    url: "https://images.pexels.com/photos/12187128/pexels-photo-12187128.jpeg",
    label: "Sigma Connect",
  },
  {
    key: 4,
    url: "https://images.pexels.com/photos/28168248/pexels-photo-28168248.jpeg",
    label: "Futuristic Gamma",
  },
];

export const FeaturedWork = () => {
  const [focusedItem, setFocusedItem] = useState<VisualItem | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 300, damping: 40 });
  const smoothY = useSpring(cursorY, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const updateScreen = () => {
      setIsLargeScreen(window.innerWidth >= 768);
    };

    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const handlePointerMove = (event: React.MouseEvent<HTMLElement>) => {
    cursorX.set(event.clientX);
    cursorY.set(event.clientY);
  };

  const handleActivate = (item: VisualItem) => {
    setFocusedItem(item);
  };

  const handleDeactivate = () => {
    setFocusedItem(null);
  };

  return (
    <section className="w-full px-8 md:px-24 py-20 flex flex-col" aria-labelledby="featured-work-title">
      <h2
        id="featured-work-title"
        className="text-3xl md:text-5xl font-extrabold mb-12 flex items-center gap-4"
      >
        {/* <span className="w-3 h-3 rounded-full bg-primary"></span> */}
        Featured Work
      </h2>

      <div
        className="relative mx-auto w-full min-h-fit rounded-md border border-black/10 dark:border-white/10 overflow-hidden bg-white/80 dark:bg-black/30 backdrop-blur-sm"
        onMouseMove={handlePointerMove}
        onMouseLeave={handleDeactivate}
        role="region"
        aria-label="Featured projects image reveal"
      >
        <ul className="w-full">
          {visualData.map((item) => (
            <li key={item.key} className="relative">
              <button
                type="button"
                className="w-full text-left p-4 md:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                onMouseEnter={() => handleActivate(item)}
                onFocus={() => handleActivate(item)}
                onBlur={handleDeactivate}
                onMouseLeave={() => {
                  if (!isLargeScreen) {
                    handleDeactivate();
                  }
                }}
                aria-label={`Preview ${item.label}`}
                aria-pressed={focusedItem?.key === item.key}
              >
                {!isLargeScreen && (
                  <Image
                    src={item.url}
                    width={1200}
                    height={700}
                    className="w-full h-52 object-cover rounded-md"
                    alt={item.label}
                    sizes="(max-width: 767px) 100vw, 0px"
                  />
                )}

                <h3
                  className={cn(
                    "uppercase md:text-5xl sm:text-3xl text-2xl font-bold sm:py-6 py-2 leading-[0.95] relative transition-colors duration-300",
                    focusedItem?.key === item.key
                      ? "text-foreground sm:mix-blend-difference sm:z-20"
                      : "text-foreground/85"
                  )}
                >
                  {item.label}
                </h3>

                <span
                  className={cn(
                    "hidden sm:flex p-4 rounded-full border border-black/20 dark:border-white/20 transition-all duration-300 ease-out",
                    focusedItem?.key === item.key
                      ? "mix-blend-difference z-20 bg-white text-black"
                      : "text-foreground"
                  )}
                  aria-hidden="true"
                >
                  <ArrowIcon className="w-8 h-8" />
                </span>

                <span
                  className={cn(
                    "h-[2px] bg-black dark:bg-white absolute bottom-0 left-0 transition-all duration-300 ease-linear",
                    focusedItem?.key === item.key ? "w-full" : "w-0"
                  )}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {isLargeScreen && focusedItem && (
            <motion.div
              key={focusedItem.key}
              className="fixed z-30 pointer-events-none"
              style={{
                left: smoothX,
                top: smoothY,
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              aria-hidden="true"
            >
              <Image
                src={focusedItem.url}
                width={600}
                height={800}
                alt=""
                className="object-cover w-[280px] lg:w-[300px] h-[360px] lg:h-[400px] rounded-lg shadow-2xl bg-white dark:bg-zinc-950"
                sizes="300px"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
