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

  const visualState: 'idle' | 'hover' | 'open' | 'openHover' = isOpen
    ? (isHovered ? 'openHover' : 'open')
    : (isHovered ? 'hover' : 'idle');

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

  const springTransition = { type: 'spring' as const, bounce: 0, duration: 0.4 };

  return (
    <motion.button
      layout
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
        y: isContactModalOpen ? -20 : 0,
        backgroundColor: isOpen ? 'transparent' : '#1A1A1A',
      }}
      transition={{ layout: springTransition, default: { duration: 0.35, ease: smoothEase } }}
      className={`fixed top-8 right-8 z-100 flex items-center justify-center overflow-hidden py-5 rounded-full text-foreground cursor-pointer shadow-lg max-md:top-6 max-md:right-6 max-md:py-4 ${
        isOpen ? "px-5 max-md:px-4 !shadow-none" : "px-8 max-md:px-6"
      }`}
    >
      <motion.span 
        layout
        className={`flex items-center ${isOpen ? "" : "translate-x-3 max-md:translate-x-2"}`}
      >
        <motion.span
          initial={false}
          animate={{
            width: isOpen ? 0 : "3rem",
            marginRight: isOpen ? 0 : "0.75rem",
            opacity: isOpen ? 0 : 1
          }}
          transition={springTransition}
          className="relative flex w-12 justify-center shrink-0 whitespace-nowrap"
        >
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
        </motion.span>

        <motion.span
          layout
          animate={visualState}
          variants={{
            idle: { x: 0 },
            hover: { x: 0 },
            open: { x: 0 },
            openHover: { x: 0 },
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
              openHover: { opacity: 1, scale: 1.75 },
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
              openHover: { y: 0, rotate: 45, opacity: 1, scaleX: 1 },
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
              openHover: { y: 0, rotate: -45, opacity: 1, scaleX: 1 },
            }}
            transition={lineTransition}
            className="absolute inset-0 m-auto h-0.5 w-4 rounded-full bg-background origin-center"
          />
        </motion.span>
      </motion.span>
    </motion.button>
  );
};
