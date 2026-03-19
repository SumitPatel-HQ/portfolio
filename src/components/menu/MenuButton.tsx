"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface MenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, toggleMenu }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [buttonText, setButtonText] = useState("Menu");
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    const nextText = isOpen ? "Close" : "Menu";
    
    if (buttonRef.current && textRef.current) {
      const tl = gsap.timeline();
      tl.to(buttonRef.current, {
        duration: 0.4,
        autoAlpha: 0,
        pointerEvents: 'none',
        onComplete: () => {
          setButtonText(nextText);
        }
      })
      .to(buttonRef.current, {
        duration: 0.4,
        autoAlpha: 1,
        pointerEvents: 'auto'
      });
    }
  }, [isOpen]);

  return (
    <button
      ref={buttonRef}
      onClick={toggleMenu}
      className="fixed top-8 right-8 z-100 flex items-center justify-center gap-3 bg-background text-foreground px-8 py-5 rounded-[200px] border border-border-custom cursor-pointer shadow-lg max-md:top-6 max-md:right-6 max-md:px-6 max-md:py-4 transition-transform hover:scale-105"
    >
      <span ref={textRef} className="text-lg leading-none tracking-wider uppercase">{buttonText}</span>
      <span className="w-4 h-4 rounded-full bg-status-dot block shrink-0" />
    </button>
  );
};
