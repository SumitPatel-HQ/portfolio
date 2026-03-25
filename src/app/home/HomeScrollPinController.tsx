"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/providers/GSAPProvider";
import { useLenis } from "@/providers/LenisProvider";

type HomeScrollPinControllerProps = {
  heroRef: RefObject<HTMLElement | null>;
  featuredRef: RefObject<HTMLElement | null>;
};

const HERO_PIN_DISTANCE_VIEWPORTS = 0.25;
const FEATURED_PIN_DISTANCE_VIEWPORTS = 0.4;

export function HomeScrollPinController({
  heroRef,
  featuredRef,
}: HomeScrollPinControllerProps) {
  const { isReady: isGSAPReady } = useGSAP();
  const { isReady: isLenisReady, lenis } = useLenis();

  useEffect(() => {
    if (!isGSAPReady || !isLenisReady || !heroRef.current || !featuredRef.current || !lenis) {
      return;
    }

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      let isSnapping = false;

      const heroTrigger = ScrollTrigger.create({
        id: "home-hero-pin",
        trigger: heroRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * HERO_PIN_DISTANCE_VIEWPORTS}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          if (isSnapping) return;

          // Downward Snap: Cross even 2% of the pin range while moving down
          if (self.direction === 1 && self.progress > 0.02 && self.progress < 0.98) {
            isSnapping = true;
            lenis.scrollTo(featuredRef.current!, {
              force: true,
              duration: 1.1,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                isSnapping = false;
              }
            });
          }

          // Upward Snap: Cross back from transition zone to Hero start
          if (self.direction === -1 && self.progress < 0.98 && self.progress > 0.02) {
            isSnapping = true;
            lenis.scrollTo(heroRef.current!, {
              force: true,
              duration: 1.1,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                isSnapping = false;
              }
            });
          }
        },
        snap: {
          snapTo: [0, 1],
          delay: 0,
          duration: { min: 0.1, max: 0.2 },
          directional: true,
          ease: "expo.out"
        }
      });

      const featuredTrigger = ScrollTrigger.create({
        id: "home-featured-pin",
        trigger: featuredRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * FEATURED_PIN_DISTANCE_VIEWPORTS}`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          if (isSnapping) return;

          // Upward Snap: If we are in the featured pin zone and scroll up, jump to Hero
          if (self.direction === -1 && self.progress < 0.95 && self.progress > 0.01) {
            isSnapping = true;
            lenis.scrollTo(heroRef.current!, {
              force: true,
              duration: 1.1,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              onComplete: () => {
                isSnapping = false;
              }
            });
          }
        },
        snap: {
          snapTo: [0, 1],
          delay: 0,
          duration: { min: 0.1, max: 0.2 },
          directional: true,
          ease: "expo.out"
        }
      });

      ScrollTrigger.refresh();

      return () => {
        heroTrigger.kill();
        featuredTrigger.kill();
      };
    });

    return () => {
      media.revert();
    };
  }, [featuredRef, heroRef, isGSAPReady, isLenisReady, lenis]);

  return null;
}
