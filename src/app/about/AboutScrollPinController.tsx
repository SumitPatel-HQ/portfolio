"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/providers/GSAPProvider";
import { useLenis } from "@/providers/LenisProvider";

type AboutScrollPinControllerProps = {
  section1Ref: RefObject<HTMLElement | null>;
  section2Ref: RefObject<HTMLElement | null>;
  contactRef: RefObject<HTMLElement | null>;
};

const SECTION1_PIN_DISTANCE_VIEWPORTS = 0.85;
const SECTION2_PIN_DISTANCE_VIEWPORTS = 0.85;
const SNAP_COOLDOWN_MS = 100;
const SCROLL_END_DEBOUNCE_MS = 150;
const RECENT_WHEEL_UP_INTENT_MS = 260;

export function AboutScrollPinController({
  section1Ref,
  section2Ref,
  contactRef,
}: AboutScrollPinControllerProps) {
  const { isReady: isGSAPReady } = useGSAP();
  const { isReady: isLenisReady, lenis } = useLenis();

  useEffect(() => {
    if (!isGSAPReady || !isLenisReady || !section1Ref.current || !section2Ref.current || !contactRef.current || !lenis) {
      return;
    }

    // Force scroll position to 0 synchronously before creating ScrollTriggers.
    window.scrollTo(0, 0);
    lenis.scrollTo(0, { immediate: true });

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      // Set a very low minimum width to ensure it is almost always active during testing
      media.add("(min-width: 320px)", () => {
        let isSnapping = false;
        let snapCooldownUntil = 0;
        let enteredSection2FromBottom = false;
        let lastScrollDirection = 0;
        let lastWheelUpAt = 0;
        let hasRecoveredUpInSection2Zone = false;
        let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

        const isSnapCooldownActive = () => performance.now() < snapCooldownUntil;

        const snapTo = (target: HTMLElement) => {
          if (isSnapping || isSnapCooldownActive() || !lenis) return;
          isSnapping = true;
          
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

        const section1Trigger = ScrollTrigger.create({
          id: "about-section1-pin",
          trigger: section1Ref.current,
          start: "top top",
          end: () => `+=${window.innerHeight * SECTION1_PIN_DISTANCE_VIEWPORTS}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            if (self.direction !== 0) {
              lastScrollDirection = self.direction;
            }

            if (isSnapping || isSnapCooldownActive()) return;

            if (self.direction === 1 && self.progress > 0.35 && self.progress < 0.9) {
              snapTo(section2Ref.current!);
            }
          },
        });

        const section2Trigger = ScrollTrigger.create({
          id: "about-section2-pin",
          trigger: section2Ref.current,
          start: "top top",
          end: () => `+=${window.innerHeight * SECTION2_PIN_DISTANCE_VIEWPORTS}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            if (self.direction !== 0) {
              lastScrollDirection = self.direction;
            }

            if (self.direction === -1 && self.progress > 0.85) {
              enteredSection2FromBottom = true;
            } else if (self.direction === 1 && self.progress < 0.15) {
              enteredSection2FromBottom = false;
            }

            if (isSnapping || isSnapCooldownActive()) return;

            // Logic moved to onLenisScroll for better trackpad support

            if (enteredSection2FromBottom && self.progress < 0.25) {
              enteredSection2FromBottom = false;
            }
            
            const progressSnapLimit = enteredSection2FromBottom ? 0.1 : 0.85;

            if (self.direction === -1 && self.progress < progressSnapLimit && self.progress > 0.08) {
              snapTo(section1Ref.current!);
            }
          },
        });

        const onLenisScroll = (e: { direction: number }) => {
          if (scrollEndTimer) {
            clearTimeout(scrollEndTimer);
          }

          scrollEndTimer = setTimeout(() => {
            if (isSnapping || isSnapCooldownActive() || !section2Trigger.isActive || hasRecoveredUpInSection2Zone) {
              return;
            }

            const isRecentWheelUp = performance.now() - lastWheelUpAt < RECENT_WHEEL_UP_INTENT_MS;
            const isUpwardIntent = lastScrollDirection === -1 || isRecentWheelUp;
            
            const recoveryStart = 0.12;
            const recoveryEnd = enteredSection2FromBottom ? 0.15 : 0.88;
            const isInRecoveryZone = section2Trigger.progress > recoveryStart && section2Trigger.progress < recoveryEnd;

            if (isUpwardIntent && isInRecoveryZone) {
              hasRecoveredUpInSection2Zone = true;
              snapTo(section1Ref.current!);
            }
          }, SCROLL_END_DEBOUNCE_MS);
        };

        const onWheel = (event: WheelEvent) => {
          if (event.deltaY < 0) {
            lastScrollDirection = -1;
            lastWheelUpAt = performance.now();

            const wheelThreshold = enteredSection2FromBottom ? 0.15 : 0.98;

            if (
              !isSnapping &&
              !isSnapCooldownActive() &&
              section2Trigger.isActive &&
              !hasRecoveredUpInSection2Zone &&
              section2Trigger.progress > 0.02 &&
              section2Trigger.progress < wheelThreshold
            ) {
              hasRecoveredUpInSection2Zone = true;
              snapTo(section1Ref.current!);
            }
          } else if (event.deltaY > 0) {
            lastScrollDirection = 1;
          }
        };

        const contactTrigger = ScrollTrigger.create({
          id: "about-contact-trigger",
          trigger: contactRef.current,
          start: "top bottom",
          end: "bottom top",
        });

        const handleKeyDown = (e: KeyboardEvent) => {
          const target = e.target as HTMLElement;
          if (target && (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable)) {
            return;
          }
          if (isSnapping || isSnapCooldownActive() || !lenis) return;

          if (e.key === "ArrowDown" || e.key === "PageDown") {
            if (section1Trigger.isActive) {
              e.preventDefault();
              snapTo(section2Ref.current!);
            }
          } else if (e.key === "ArrowUp" || e.key === "PageUp") {
            if (contactTrigger.isActive && !section2Trigger.isActive) {
              e.preventDefault();
              snapTo(section2Ref.current!);
            } else if (section2Trigger.isActive) {
              e.preventDefault();
              snapTo(section1Ref.current!);
            }
          } else if (e.key === "Home") {
            e.preventDefault();
            snapTo(section1Ref.current!);
          } else if (e.key === "End") {
            e.preventDefault();
            snapTo(contactRef.current!);
          }
        };

        window.addEventListener("keydown", handleKeyDown);
        lenis.on("scroll", onLenisScroll);
        window.addEventListener("wheel", onWheel, { passive: true });

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
          clearTimeout(timer);
          if (scrollEndTimer) {
            clearTimeout(scrollEndTimer);
          }
          lenis.off("scroll", onLenisScroll);
          window.removeEventListener("wheel", onWheel);
          window.removeEventListener("keydown", handleKeyDown);
          // Unconditionally restart Lenis — navigation during a snap must never
          // leave Lenis in a stopped state on the next page.
          lenis.start();
        };
      });
    // Scope to document.body so ctx.revert() also removes the pin-spacer <div>s
    // that GSAP injects as siblings of the pinned element (outside parentElement).
    }, document.body);

    return () => {
      // Revert all GSAP artefacts (triggers, spacers, inline styles) created
      // by this controller, then force a fresh ScrollTrigger calculation so
      // the Home page initialises with a clean slate.
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [section2Ref, section1Ref, contactRef, isGSAPReady, isLenisReady, lenis]);

  return null;
}
