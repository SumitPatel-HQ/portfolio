import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useMenuAnimation = (isOpen: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states for inner content
      gsap.set('.menu-content-pages', { yPercent: 200, autoAlpha: 0 });
      gsap.set('.menu-content-info', { yPercent: 100, autoAlpha: 0 });
      gsap.set('.menu-content-title-letter', {
        yPercent: 100,
        rotateY: 20,
        scale: 0.2,
        autoAlpha: 0,
        transformOrigin: '50% 100%'
      });
      gsap.set('.menu-content-title-mobile', { yPercent: 100, rotateY: 20, scaleX: 0.2, scaleY: 0.2, autoAlpha: 0 });

      // Set initial state for overlay container
      gsap.set(containerRef.current, { pointerEvents: 'none', clipPath: 'inset(100% 0% 0% 0%)' });

      // Build out inside timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 1.6, ease: 'expo.inOut' }
      });

      tl.to('.menu-content-pages', { yPercent: 0, autoAlpha: 1, stagger: 0.032 }, 0.24)
        .to('.menu-content-info', { yPercent: 0, autoAlpha: 1, stagger: 0.032 }, 0.24)
        .to('.menu-content-title-letter', { yPercent: 0, rotateY: 0, scale: 1, autoAlpha: 1, stagger: 0.032 }, 0)
        .to('.menu-content-title-mobile', { yPercent: 0, rotateY: 0, scaleX: 1, scaleY: 1, autoAlpha: 1 }, 0);

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (isOpen) {
      // Container opening
      gsap.to(containerRef.current, {
        duration: 1.2,
        pointerEvents: 'auto',
        clipPath: 'inset(0% 0% 0% 0%)',
        ease: 'expo.inOut',
      });
      // Content opening
      timelineRef.current.timeScale(1).play(0);
    } else {
      // Container-only close keeps the reveal flow from playing backward.
      gsap.to(containerRef.current, {
        duration: 0.8,
        clipPath: 'inset(0% 0% 100% 0%)',
        ease: 'expo.inOut',
        onComplete: () => {
          timelineRef.current?.pause(0);
          gsap.set(containerRef.current, { pointerEvents: 'none', clipPath: 'inset(100% 0% 0% 0%)' });
        },
      });
    }
  }, [isOpen]);

  return { containerRef };
};
