"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, toggleMenu }) => {
  const [isHovered, setIsHovered] = useState(false);
  const smoothEase = [0.4, 0, 0.2, 1] as const;

  const visualState: 'idle' | 'hover' | 'open' = isOpen ? 'open' : isHovered ? 'hover' : 'idle';

  const lineTransition = {
    duration: 0.4,
    ease: smoothEase,
  };

  const dotTransition = {
    duration: 0.35,
    ease: smoothEase,
  };

  return (
    <motion.button
      onClick={toggleMenu}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      type="button"
      aria-label="Toggle menu"
      aria-expanded={isOpen}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.35, ease: smoothEase }}
      className={`fixed top-8 right-8 z-100 flex items-center justify-center gap-3 px-8 py-5 rounded-[200px] border cursor-pointer shadow-lg max-md:top-6 max-md:right-6 max-md:px-6 max-md:py-4 transition-all duration-400 ease-in-out ${
        isOpen || isHovered
          ? 'bg-foreground/10 text-foreground border-foreground/40 scale-105'
          : 'bg-background text-foreground border-border-custom'
      }`}
    >
      <span className="text-lg leading-none tracking-wider uppercase">MENU</span>

      <span className="relative block h-5 w-5 shrink-0" aria-hidden="true">
        <motion.span
          animate={visualState}
          variants={{
            idle: { opacity: 1, scale: 1 },
            hover: { opacity: 0, scale: 0.45 },
            open: { opacity: 0, scale: 0.45 },
          }}
          transition={dotTransition}
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-status-dot"
        />

        <motion.span
          animate={visualState}
          variants={{
            idle: { y: 0, rotate: 0, opacity: 0, scaleX: 0 },
            hover: { y: -4, rotate: 0, opacity: 1, scaleX: 1 },
            open: { y: 0, rotate: 45, opacity: 1, scaleX: 1 },
          }}
          transition={lineTransition}
          className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground origin-center"
        />

        <motion.span
          animate={visualState}
          variants={{
            idle: { opacity: 0, scaleX: 0 },
            hover: { opacity: 1, scaleX: 1 },
            open: { opacity: 0, scaleX: 0.45 },
          }}
          transition={lineTransition}
          className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground origin-center"
        />

        <motion.span
          animate={visualState}
          variants={{
            idle: { y: 0, rotate: 0, opacity: 0, scaleX: 0 },
            hover: { y: 4, rotate: 0, opacity: 1, scaleX: 1 },
            open: { y: 0, rotate: -45, opacity: 1, scaleX: 1 },
          }}
          transition={lineTransition}
          className="absolute left-1/2 top-1/2 h-0.5 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground origin-center"
        />
      </span>
    </motion.button>
  );
};
