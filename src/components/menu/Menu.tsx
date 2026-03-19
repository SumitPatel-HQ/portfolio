"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { MenuButton } from './MenuButton';
import { MenuContent } from './MenuContent';
import { useMenuAnimation } from './useMenuAnimation';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { containerRef } = useMenuAnimation(isOpen);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock background scrolling while menu overlay is open.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyTouchAction = body.style.touchAction;

    if (isOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
    } else {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
    };
  }, [isOpen]);

  return (
    <>
      <MenuButton isOpen={isOpen} toggleMenu={toggleMenu} />

      {/* Menu Overlay */}
      <div
        ref={containerRef}
        onClick={closeMenu}
        className="fixed inset-0 z-50 overflow-hidden overscroll-contain bg-background text-foreground flex flex-col"
      >
        {/* Stop propagation so clicking inside content doesn't blindly close unless clicked directly on background */}
        <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
          <MenuContent onNavigate={closeMenu} />
        </div>
      </div>
    </>
  );
};
