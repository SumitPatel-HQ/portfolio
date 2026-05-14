"use client";

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
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
  const { isOpen: isContactModalOpen } = useContactModal();
  const { lenis } = useLenis();

  const targetClosedLabel = useMemo(() => {
    if (pathname === '/') return null;
    const currentItem = menuItemsLinks.find(item => item.href === pathname);
    return currentItem ? currentItem.label : null;
  }, [pathname]);

  const [displayedLabel, setDisplayedLabel] = useState<string | null>(targetClosedLabel);
  const isClosingRef = useRef(false);
  const targetLabelRef = useRef(targetClosedLabel);
  targetLabelRef.current = targetClosedLabel;

  const { containerRef } = useMenuAnimation({
    isOpen,
    onCloseStart: () => {
      isClosingRef.current = true;
    },
    onCloseComplete: () => {
      isClosingRef.current = false;
      setDisplayedLabel(targetLabelRef.current);
    },
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen) {
      if (targetClosedLabel === null) {
        // We are on the Home page. Delay the "Home" label appearance by 400ms
        // so it starts fading in right as the black overlay reaches the top of the screen.
        timeoutId = setTimeout(() => {
          setDisplayedLabel('Home');
        }, 800);
      } else {
        setDisplayedLabel(targetClosedLabel);
      }
    } else {
      if (isClosingRef.current) {
        // We are currently playing the close animation
        setDisplayedLabel((prev) => {
          if (targetClosedLabel === null || targetClosedLabel !== prev) {
            return null; // Hide it so it animates out with the menu
          }
          return prev;
        });
      } else {
        // We are already closed, e.g. back button navigation
        setDisplayedLabel(targetClosedLabel);
      }
    }

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, targetClosedLabel]);

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
        label={displayedLabel}
        onNavigate={closeMenu}
        isContactModalOpen={isContactModalOpen}
      />
      <div
        className="hero-menu-btn-wrap fixed top-8 right-8 z-[100] max-md:top-6 max-md:right-6"
        style={pathname === '/' ? { opacity: 0, visibility: 'hidden' } : undefined}
      >
        <MenuButton
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          isContactModalOpen={isContactModalOpen}
        />
      </div>

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
