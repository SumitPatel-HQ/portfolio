"use client";

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MenuButton } from './MenuButton';
import { MenuContent } from './MenuContent';
import { HomeLink } from './HomeLink';
import { useMenuAnimation } from './useMenuAnimation';
import { useContactModal } from '@/context/ContactModalContext';
import { useLenis } from '@/providers/LenisProvider';

const menuItemsLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'About Me', href: '/about' },
];

export const Menu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [animatedHomeLabel, setAnimatedHomeLabel] = useState<string | null>(null);
  const { isOpen: isContactModalOpen } = useContactModal();
  const { lenis } = useLenis();

  const currentPageLabel = useMemo(() => {
    if (pathname === '/') return 'Home';
    const currentItem = menuItemsLinks.find(item => item.href === pathname);
    return currentItem ? currentItem.label : 'Home';
  }, [pathname]);

  const closedLabel = pathname === '/' ? null : currentPageLabel;
  const homeLabel = isOpen ? (animatedHomeLabel ?? currentPageLabel) : closedLabel;

  const { containerRef, homeLinkRef } = useMenuAnimation({
    isOpen,
    isHome: pathname === '/',
    onOpenStart: () => {
      setAnimatedHomeLabel(currentPageLabel);
    },
    onCloseComplete: () => {
      setAnimatedHomeLabel(null);
    },
  });

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
      if (lenis) lenis.stop();
    } else {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
      if (lenis) lenis.start();
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
      if (lenis) lenis.start();
    };
  }, [isOpen, lenis]);

  return (
    <>
      <HomeLink 
        label={homeLabel} 
        onNavigate={closeMenu} 
        animatedRef={homeLinkRef} 
        isContactModalOpen={isContactModalOpen}
      />
      <MenuButton
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        isContactModalOpen={isContactModalOpen}
      />

      {/* Menu Overlay */}
      <div
        ref={containerRef}
        onClick={closeMenu}
        className="fixed inset-0 z-50 overflow-hidden overscroll-contain bg-background text-foreground flex flex-col"
        style={{ clipPath: 'inset(100% 0% 0% 0%)', pointerEvents: 'none' }}
      >
        {/* Stop propagation so clicking inside content doesn't blindly close unless clicked directly on background */}
        <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
          <MenuContent onNavigate={closeMenu} />
        </div>
      </div>
    </>
  );
};
