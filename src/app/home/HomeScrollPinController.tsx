"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/providers/GSAPProvider";
import { useLenis } from "@/providers/LenisProvider";

type HomeScrollPinControllerProps = {
  heroRef: RefObject<HTMLElement | null>;
  featuredRef: RefObject<HTMLElement | null>;
  contactRef: RefObject<HTMLElement | null>;
};

const HERO_PIN_DISTANCE_VIEWPORTS = 0.85;
const FEATURED_PIN_DISTANCE_VIEWPORTS = 0.85;
const SNAP_COOLDOWN_MS = 150;
const SCROLL_END_DEBOUNCE_MS = 150;
const RECENT_WHEEL_UP_INTENT_MS = 260;

export function HomeScrollPinController({
  heroRef,
  featuredRef,
  contactRef,
}: HomeScrollPinControllerProps) {
  const { isReady: isGSAPReady } = useGSAP();
  const { isReady: isLenisReady, lenis } = useLenis();

  useEffect(() => {
    if (!isGSAPReady || !isLenisReady || !heroRef.current || !featuredRef.current || !contactRef.current || !lenis) {
      return;
    }

    const media = gsap.matchMedia();

    // Set a very low minimum width to ensure it is almost always active during testing
    media.add("(min-width: 320px)", () => {
      let isSnapping = false;
      let snapCooldownUntil = 0;
      let enteredFeaturedFromBottom = false;
      let lastScrollDirection = 0;
      let lastWheelUpAt = 0;
      let hasRecoveredUpInFeaturedZone = false;
      let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

      const isSnapCooldownActive = () => performance.now() < snapCooldownUntil;

      const snapTo = (target: HTMLElement) => {
        if (isSnapping || isSnapCooldownActive() || !lenis) return;
        isSnapping = true;
        
        // Stop Lenis interaction during snap to prevent fighting with user input
        lenis.stop();
        
        lenis.scrollTo(target, {
          force: true,
          duration: 0.85,
          lock: false,
          easing: (t) => Math.min(1, 1 - Math.pow(1 - t, 4)),
          onComplete: () => {
             lenis.start();
             isSnapping = false;
             snapCooldownUntil = performance.now() + SNAP_COOLDOWN_MS;
          }
        });
      };

      const heroTrigger = ScrollTrigger.create({
        id: "home-hero-pin",
        trigger: heroRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * HERO_PIN_DISTANCE_VIEWPORTS}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          if (self.direction !== 0) {
            lastScrollDirection = self.direction;
          }

          if (isSnapping || isSnapCooldownActive()) return;

          // Downward snap in the middle range to avoid pin-edge flicker.
          if (self.direction === 1 && self.progress > 0.35 && self.progress < 0.9) {
            snapTo(featuredRef.current!);
          }
        },
      });

      const featuredTrigger = ScrollTrigger.create({
        id: "home-featured-pin",
        trigger: featuredRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * FEATURED_PIN_DISTANCE_VIEWPORTS}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onEnter: () => {
          hasRecoveredUpInFeaturedZone = false;
        },
        onEnterBack: () => {
          hasRecoveredUpInFeaturedZone = false;
        },
        onLeave: () => {
          hasRecoveredUpInFeaturedZone = false;
        },
        onLeaveBack: () => {
          hasRecoveredUpInFeaturedZone = false;
        },
        onUpdate: (self) => {
          if (self.direction !== 0) {
            lastScrollDirection = self.direction;
          }

          // HEURISTIC: Self-correct the "entry direction" based on actual progress.
          // If we're scrolling up near the bottom of the section, we likely came from the footer.
          // If we're scrolling down near the top, we likely came from the hero.
          if (self.direction === -1 && self.progress > 0.85) {
            enteredFeaturedFromBottom = true;
          } else if (self.direction === 1 && self.progress < 0.15) {
            enteredFeaturedFromBottom = false;
          }

          if (isSnapping || isSnapCooldownActive()) return;

          // If we reach the top half, we allow the responsive snap back to Hero.
          if (enteredFeaturedFromBottom && self.progress < 0.25) {
            enteredFeaturedFromBottom = false;
          }
          
          // Determine the upward snap threshold based on position/entry.
          // Bottom-up: strict (0.1) to avoid skipping. Top-down: responsive (0.85).
          const progressSnapLimit = enteredFeaturedFromBottom ? 0.1 : 0.85;

          // Upward snap window
          if (self.direction === -1 && self.progress < progressSnapLimit && self.progress > 0.08) {
            snapTo(heroRef.current!);
          }
        },
      });

      // If users miss the upward snap window, recover once when scrolling settles.
      const recoverUpwardSnapOnScrollEnd = () => {
        if (isSnapping || isSnapCooldownActive() || !featuredTrigger.isActive || hasRecoveredUpInFeaturedZone) {
          return;
        }

        const isRecentWheelUp = performance.now() - lastWheelUpAt < RECENT_WHEEL_UP_INTENT_MS;
        const isUpwardIntent = lastScrollDirection === -1 || isRecentWheelUp;
        
        // Stricter recovery zone if we entered from bottom
        const recoveryStart = 0.12;
        const recoveryEnd = enteredFeaturedFromBottom ? 0.15 : 0.88;
        const isInRecoveryZone = featuredTrigger.progress > recoveryStart && featuredTrigger.progress < recoveryEnd;

        if (isUpwardIntent && isInRecoveryZone) {
          hasRecoveredUpInFeaturedZone = true;
          snapTo(heroRef.current!);
        }
      };

      const onLenisScroll = () => {
        if (scrollEndTimer) {
          clearTimeout(scrollEndTimer);
        }

        scrollEndTimer = setTimeout(() => {
          recoverUpwardSnapOnScrollEnd();
        }, SCROLL_END_DEBOUNCE_MS);
      };

      // External mouse wheels can emit coarse discrete deltas.
      // This fallback preserves upward intent and snaps from featured when that intent is clear.
      const onWheel = (event: WheelEvent) => {
        if (event.deltaY < 0) {
          lastScrollDirection = -1;
          lastWheelUpAt = performance.now();

          const wheelThreshold = enteredFeaturedFromBottom ? 0.15 : 0.98;

          if (
            !isSnapping &&
            !isSnapCooldownActive() &&
            featuredTrigger.isActive &&
            !hasRecoveredUpInFeaturedZone &&
            featuredTrigger.progress > 0.02 &&
            featuredTrigger.progress < wheelThreshold
          ) {
            hasRecoveredUpInFeaturedZone = true;
            snapTo(heroRef.current!);
          }
        } else if (event.deltaY > 0) {
          lastScrollDirection = 1;
        }
      };

      lenis.on("scroll", onLenisScroll);
      window.addEventListener("wheel", onWheel, { passive: true });

      // Contact snapping removed to prevent the "trapped" loop and allow natural scrolling at the end of the page

      // Refresh ScrollTrigger after a bit to ensure all layout/pin positions are correct
      const timer = setTimeout(() => {
          ScrollTrigger.refresh();
      }, 100);

      return () => {
        heroTrigger.kill();
        featuredTrigger.kill();
        clearTimeout(timer);
        if (scrollEndTimer) {
          clearTimeout(scrollEndTimer);
        }
        lenis.off("scroll", onLenisScroll);
        window.removeEventListener("wheel", onWheel);
        // CRITICAL: Ensure Lenis is started if we unmount during a snap
        lenis?.start();
      };
    });

    return () => {
      media.revert();
    };
  }, [featuredRef, heroRef, contactRef, isGSAPReady, isLenisReady, lenis]);

  return null;
}

