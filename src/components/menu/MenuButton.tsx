"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface MenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
  isContactModalOpen?: boolean;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ 
  isOpen, 
  toggleMenu, 
  isContactModalOpen 
}) => {
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

  const textTransition = {
    duration: 0.4,
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
      animate={{ 
        opacity: isContactModalOpen ? 0 : 1, 
        pointerEvents: isContactModalOpen ? 'none' : 'auto',
        y: isContactModalOpen ? -20 : 0
      }}
      transition={{ duration: 0.35, ease: smoothEase }}
      className="fixed top-8 right-8 z-100 flex items-center justify-center overflow-hidden px-8 py-5 rounded-full bg-background-secondary text-foreground cursor-pointer shadow-lg max-md:top-6 max-md:right-6 max-md:px-6 max-md:py-4"
    >
      <span className="flex items-center gap-3 translate-x-3 max-md:translate-x-2">
        <span className="relative flex w-12 justify-center">
          <motion.span
            animate={visualState}
            variants={{
              idle: { x: 0 },
              hover: { x: -14 },
              open: { x: -20, opacity: 0 },
            }}
            transition={textTransition}
            className="text-lg font-semibold leading-none tracking-wider uppercase"
          >
            MENU
          </motion.span>
        </span>

        <motion.span
          animate={visualState}
          variants={{
            idle: { x: 0 },
            hover: { x: 0 },
            open: { x: 0 },
          }}
          transition={textTransition}
          className="relative block h-10 w-10 shrink-0"
          aria-hidden="true"
        >
          <motion.span
            animate={visualState}
            variants={{
              idle: { opacity: 1, scale: 0.3 },
              hover: { opacity: 1, scale: 1.45 },
              open: { opacity: 1, scale: 1.45 },
            }}
            transition={dotTransition}
            className="absolute inset-0 m-auto h-10 w-10 rounded-full bg-status-dot"
          />

          <motion.span
            animate={visualState}
            variants={{
              idle: { y: 0, rotate: 0, opacity: 0, scaleX: 0 },
              hover: { y: -2.5, rotate: 0, opacity: 1, scaleX: 1 },
              open: { y: 0, rotate: 45, opacity: 1, scaleX: 1 },
            }}
            transition={lineTransition}
            className="absolute inset-0 m-auto h-0.5 w-4 rounded-full bg-background origin-center"
          />

          <motion.span
            animate={visualState}
            variants={{
              idle: { y: 0, rotate: 0, opacity: 0, scaleX: 0 },
              hover: { y: 2.5, rotate: 0, opacity: 1, scaleX: 1 },
              open: { y: 0, rotate: -45, opacity: 1, scaleX: 1 },
            }}
            transition={lineTransition}
            className="absolute inset-0 m-auto h-0.5 w-4 rounded-full bg-background origin-center"
          />
        </motion.span>
      </span>
    </motion.button>
  );
};
