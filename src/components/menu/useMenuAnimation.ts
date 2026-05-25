import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface UseMenuAnimationProps {
  isOpen: boolean;
  onOpenStart?: () => void;
  onOpenComplete?: () => void;
  onCloseStart?: () => void;
  onCloseComplete?: () => void;
}

export const useMenuAnimation = ({ isOpen, onOpenStart, onOpenComplete, onCloseStart, onCloseComplete }: UseMenuAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const activeTweenRef = useRef<gsap.core.Tween | null>(null);
  const onOpenStartRef = useRef(onOpenStart);
  const onOpenCompleteRef = useRef(onOpenComplete);
  const onCloseStartRef = useRef(onCloseStart);
  const onCloseCompleteRef = useRef(onCloseComplete);

  useEffect(() => {
    onOpenStartRef.current = onOpenStart;
    onOpenCompleteRef.current = onOpenComplete;
    onCloseStartRef.current = onCloseStart;
    onCloseCompleteRef.current = onCloseComplete;
  }, [onOpenStart, onOpenComplete, onCloseStart, onCloseComplete]);

  useEffect(() => {
    let ctx: gsap.Context | null = null;

    const init = () => {
      if (!containerRef.current) return;

      ctx = gsap.context(() => {
        const openStartLabel = 'open-start';
        const openEndLabel = 'open-end';
        const closeStartLabel = 'close-start';
        const closeEndLabel = 'close-end';

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
        gsap.set('.menu-content-title-mobile', {
          yPercent: 100,
          rotateY: 20,
          scaleX: 0.2,
          scaleY: 0.2,
          autoAlpha: 0
        });

        // Set initial state for overlay container
        gsap.set(containerRef.current, { pointerEvents: 'none', clipPath: 'inset(100% 0% 0% 0%)' });

        const tl = gsap.timeline({ paused: true });

        tl.addLabel(openStartLabel)
          .to(containerRef.current, {
            duration: 1.2,
            pointerEvents: 'auto',
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'expo.inOut',
          }, openStartLabel)
          .to('.menu-content-pages', { yPercent: 0, autoAlpha: 1, duration: 1.6, ease: 'expo.inOut', stagger: 0.032 }, `${openStartLabel}+=0.24`)
          .to('.menu-content-info', { yPercent: 0, autoAlpha: 1, duration: 1.6, ease: 'expo.inOut', stagger: 0.032 }, `${openStartLabel}+=0.24`)
          .to('.menu-content-title-letter', { yPercent: 0, rotateY: 0, scale: 1, autoAlpha: 1, duration: 1.6, ease: 'expo.inOut', stagger: 0.032 }, openStartLabel)
          .to('.menu-content-title-mobile', { yPercent: 0, rotateY: 0, scaleX: 1, scaleY: 1, autoAlpha: 1, duration: 1.6, ease: 'expo.inOut' }, openStartLabel)
          .addLabel(openEndLabel)
          .addLabel(closeStartLabel)
          .to('.menu-content-pages', { yPercent: -110, autoAlpha: 0, duration: 0.5, ease: 'expo.in', stagger: 0.02 }, closeStartLabel)
          .to('.menu-content-info', { yPercent: -110, autoAlpha: 0, duration: 0.45, ease: 'expo.in' }, closeStartLabel)
          .to('.menu-content-title-letter', { yPercent: -120, rotateY: -12, scale: 0.85, autoAlpha: 0, duration: 0.52, ease: 'expo.in', stagger: 0.016 }, closeStartLabel)
          .to('.menu-content-title-mobile', { yPercent: -110, rotateY: -10, scaleX: 0.85, scaleY: 0.85, autoAlpha: 0, duration: 0.45, ease: 'expo.in' }, closeStartLabel)
          .to(containerRef.current, {
            duration: 0.8,
            clipPath: 'inset(0% 0% 100% 0%)',
            ease: 'expo.inOut'
          }, `${closeStartLabel}+=0.04`)
          .addLabel(closeEndLabel);

        masterTimelineRef.current = tl;
        tl.seek(closeEndLabel, false);
      });
    };

    init();

    return () => {
      activeTweenRef.current?.kill();
      masterTimelineRef.current?.kill();
      ctx?.revert();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !masterTimelineRef.current) return;

    const openStartLabel = 'open-start';
    const openEndLabel = 'open-end';
    const closeStartLabel = 'close-start';
    const closeEndLabel = 'close-end';

    activeTweenRef.current?.kill();
    activeTweenRef.current = null;

    if (isOpen) {
      onOpenStartRef.current?.();

      gsap.set(containerRef.current, { pointerEvents: 'auto' });

      masterTimelineRef.current.pause().seek(openStartLabel, false);

      activeTweenRef.current = masterTimelineRef.current.tweenTo(openEndLabel, {
        overwrite: true,
        onComplete: () => {
          activeTweenRef.current = null;
          onOpenCompleteRef.current?.();
        }
      });
    } else {
      // Menu is closed
      const isAlreadyClosed = masterTimelineRef.current.time() === masterTimelineRef.current.duration();

      if (!isAlreadyClosed) {
        onCloseStartRef.current?.();
        masterTimelineRef.current.pause().seek(closeStartLabel, false);

        activeTweenRef.current = masterTimelineRef.current.tweenTo(closeEndLabel, {
          overwrite: true,
          onComplete: () => {
            activeTweenRef.current = null;
            gsap.set(containerRef.current, { pointerEvents: 'none' });
            onCloseCompleteRef.current?.();
          }
        });
      }
    }

    return () => {
      activeTweenRef.current?.kill();
      activeTweenRef.current = null;
    };
  }, [isOpen]);

  return { containerRef };
};
