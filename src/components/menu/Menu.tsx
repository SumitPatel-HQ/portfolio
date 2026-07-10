"use client";

import { useState, useCallback, useMemo, useEffect, useRef, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { MenuButton } from './MenuButton';
import { MenuContent } from './MenuContent';
import { HomeLink } from './HomeLink';
import { useMenuAnimation } from './useMenuAnimation';
import { useContactModal } from '@/context/ContactModalContext';
import { useLenis } from '@/providers/LenisProvider';
import { useIntro } from '@/context/IntroContext';
import { SITE_ROUTES } from '@/data/navigation';


export const Menu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isContactModalOpen } = useContactModal();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const { lenis } = useLenis();
  const { isIntroComplete } = useIntro();
  const shouldShowHomeLink = pathname !== "/" || isIntroComplete;

  const targetClosedLabel = useMemo(() => {
    if (pathname === '/') return null;
    const currentItem = SITE_ROUTES.find(item =>
      item.href === pathname || pathname.startsWith(item.href + '/')
    );
    return currentItem ? currentItem.label : null;
  }, [pathname]);

  const [displayedLabel, setDisplayedLabel] = useState<string | null>(targetClosedLabel);
  const [isClosing, setIsClosing] = useState(false);
  const targetLabelRef = useRef(targetClosedLabel);
  
  // Track previous values to detect changes during render
  const [prevTargetClosedLabel, setPrevTargetClosedLabel] = useState(targetClosedLabel);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  const [prevIsClosing, setPrevIsClosing] = useState(isClosing);

  if (targetClosedLabel !== prevTargetClosedLabel || isOpen !== prevIsOpen || isClosing !== prevIsClosing) {
    setPrevTargetClosedLabel(targetClosedLabel);
    setPrevIsOpen(isOpen);
    setPrevIsClosing(isClosing);

    if (isOpen) {
      if (targetClosedLabel !== null) {
        setDisplayedLabel(targetClosedLabel);
      } else {
        // If we're on Home page and menu opens, start with null (Home will fade in via effect)
        setDisplayedLabel(null);
      }
    } else {

      if (!prevIsOpen && !isClosing) {
        setDisplayedLabel(targetClosedLabel);
      }
    }
  }

  useLayoutEffect(() => {
    targetLabelRef.current = targetClosedLabel;
  }, [targetClosedLabel]);

  const { containerRef } = useMenuAnimation({
    isOpen,
    onCloseStart: () => {
      setIsClosing(true);
      // The menu close animation takes 1.54s total.
      // The HomeLink exit (0.4s) + enter (0.8s) takes 1.2s total.
      // By triggering the label update at 340ms, the text animation finishes
      // exactly at 1.54s, perfectly synchronized with the menu sliding away.
      setTimeout(() => {
        setDisplayedLabel(targetLabelRef.current);
      }, 840);
    },
    onCloseComplete: () => {
      setIsClosing(false);
      // Failsafe in case network routing took longer than 340ms
      setDisplayedLabel(targetLabelRef.current);
    },
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isOpen && targetClosedLabel === null && isIntroComplete) {
      // We are on the Home page. Delay the "Home" label appearance by 800ms
      // so it starts fading in right as the black overlay reaches the top of the screen.
      timeoutId = setTimeout(() => {
        setDisplayedLabel('Home');
      }, 800);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, targetClosedLabel, isIntroComplete]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    if (isOpen) setIsOpen(false);
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !e.defaultPrevented && !isContactModalOpen && !isResumeOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isContactModalOpen, isResumeOpen]);

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
      
      // Only restart Lenis if we are not on the home page or if the intro is complete.
      if (lenis && (pathname !== "/" || isIntroComplete)) {
        lenis.start();
      }
    }

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.touchAction = prevBodyTouchAction;
      
      // Safety restart on unmount, respecting intro state.
      if (lenis && (pathname !== "/" || isIntroComplete)) {
        lenis.start();
      }
    };
  }, [isOpen, lenis, pathname, isIntroComplete]);

  return (
    <>
      {shouldShowHomeLink ? (
        <HomeLink
          label={displayedLabel}
          onNavigate={closeMenu}
          isContactModalOpen={isContactModalOpen || isResumeOpen}
        />
      ) : null}
      <div
        data-transition-chrome="true"
        className={`hero-menu-btn-wrap fixed top-8 right-8 z-100 max-md:top-6 max-md:right-6 md:top-12 xl:top-8 hidden md:block ${
          pathname === '/' && !isIntroComplete ? 'opacity-0 invisible' : ''
        }`}
      >
        <MenuButton
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          isContactModalOpen={isContactModalOpen || isResumeOpen}
        />
      </div>

      {/* Menu Overlay */}
      <div
        ref={containerRef}
        onClick={closeMenu}
        className="fixed inset-0 z-50 overflow-hidden overscroll-contain bg-background text-foreground flex flex-col"
        style={{ clipPath: 'inset(100% 0% 0% 0%)', pointerEvents: 'none' }}
      >
        <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
          <MenuContent 
            onNavigate={closeMenu} 
            isMenuOpen={isOpen} 
            isResumeOpen={isResumeOpen}
            setIsResumeOpen={setIsResumeOpen}
          />
        </div>
      </div>
    </>
  );
};
