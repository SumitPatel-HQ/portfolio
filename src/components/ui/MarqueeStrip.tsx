"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeStripProps {
  items: string[];
}

export function MarqueeStrip({ items }: MarqueeStripProps) {
  // To make continuous scrolling with framer motion, duplicate the array enough times to scroll infinitely 
  // without jumping. We scroll from 0 to -50% and repeat.
  const allItems = [...items, ...items];

  return (
    <div className="overflow-hidden w-full py-10 border-y border-white/10 flex whitespace-nowrap">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        }}
        className="flex items-center min-w-max"
      >
        {allItems.map((item, i) => (
          <React.Fragment key={i}>
            <span 
              className={`text-4xl md:text-7xl font-bold px-8 uppercase ${i % 2 === 0 ? "text-white/30" : "text-white"}`}
            >
              {item}
            </span>
            <span className="text-4xl md:text-7xl font-bold px-8 text-primary uppercase">•</span>
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}
