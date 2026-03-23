"use client";

import Link from 'next/link';
import React from 'react';

interface HomeLinkProps {
  label: string | null;
  onNavigate?: () => void;
  animatedRef: React.RefObject<HTMLDivElement | null>;
}

export const HomeLink: React.FC<HomeLinkProps> = ({ label, onNavigate, animatedRef }) => {
  return (
    <div
      className="fixed top-8 left-8 z-[100] flex items-center justify-center overflow-hidden py-5 px-5 max-md:top-6 max-md:left-6 max-md:py-4 max-md:px-4 pointer-events-none"
    >
      <div ref={animatedRef} className="menu-home-link-target" style={{ pointerEvents: label ? 'auto' : 'none' }}>
        {label ? (
          <Link
            href="/"
            onClick={onNavigate}
            className="text-3xl font-bold leading-none tracking-tight uppercase text-foreground transition-opacity hover:opacity-70 scale-y-[1.2]"
          >
            {label}
          </Link>
        ) : null}
      </div>
    </div>
  );
};
