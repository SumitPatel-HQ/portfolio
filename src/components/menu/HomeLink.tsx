"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

interface HomeLinkProps {
  label: string | null;
  onNavigate?: () => void;
  animatedRef: React.RefObject<HTMLDivElement | null>;
  isContactModalOpen?: boolean;
}

export const HomeLink: React.FC<HomeLinkProps> = ({ label, onNavigate, animatedRef, isContactModalOpen }) => {
  return (
    <div
      style={{ 
        opacity: isContactModalOpen ? 0 : 1, 
        pointerEvents: isContactModalOpen ? 'none' : 'auto' 
      }}
      className="fixed top-8 left-8 z-[100] flex items-center justify-center overflow-hidden py-5 px-5 max-md:top-6 max-md:left-6 max-md:py-4 max-md:px-4 pointer-events-none"
    >
      <div ref={animatedRef} className="menu-home-link-target" style={{ pointerEvents: label ? 'auto' : 'none' }}>
        <AnimatePresence mode="wait" initial={false}>
          {label ? (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link
                href="/"
                onClick={onNavigate}
                className="text-3xl font-bold leading-none tracking-tight uppercase text-foreground transition-opacity hover:opacity-70 scale-y-[1.2] block"
              >
                {label}
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
