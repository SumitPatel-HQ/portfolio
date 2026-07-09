"use client";

import React, { createContext, useCallback, useContext, useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useIntro } from "@/context/IntroContext";
import { useLenis } from "@/providers/LenisProvider";

const DynamicContactModalDialog = dynamic(
  () =>
    import("@/components/Contacts/ContactModalDialog").then(
      (module) => module.ContactModalDialog,
    ),
  { ssr: false },
);

type ModalPhase = "closed" | "opening" | "open" | "closing";

interface ContactModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(
  undefined,
);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error(
      "useContactModal must be used within a ContactModalProvider",
    );
  }
  return context;
}

export function ContactModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<ModalPhase>("closed");
  const { lenis } = useLenis();
  const pathname = usePathname();
  const { isIntroComplete } = useIntro();

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const phaseRef = useRef<ModalPhase>("closed");
  const openingFromClosedRef = useRef(true);
  const [isOpeningFromClosed, setIsOpeningFromClosed] = useState(true);
  const animationIdRef = useRef(0);

  const isOpen = phase !== "closed";

  const setModalPhase = useCallback((nextPhase: ModalPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const stopActiveTimeline = useCallback(() => {
    animationIdRef.current += 1;
    timelineRef.current?.kill();
    timelineRef.current = null;
  }, []);

  const openModal = useCallback(() => {
    if (phaseRef.current === "open" || phaseRef.current === "opening") return;

    const fromClosed = phaseRef.current === "closed";
    openingFromClosedRef.current = fromClosed;
    setIsOpeningFromClosed(fromClosed);
    stopActiveTimeline();
    setModalPhase("opening");
  }, [setModalPhase, stopActiveTimeline]);

  const closeModal = useCallback(() => {
    if (phaseRef.current === "closed" || phaseRef.current === "closing") return;

    const overlay = overlayRef.current;
    const content = contentRef.current;

    if (!content) {
      stopActiveTimeline();
      setModalPhase("closed");
      return;
    }

    stopActiveTimeline();
    const animationId = animationIdRef.current;
    setModalPhase("closing");

    const tl = gsap.timeline({
      onComplete: () => {
        if (animationIdRef.current !== animationId) return;
        timelineRef.current = null;
        setModalPhase("closed");
      },
    });

    timelineRef.current = tl;

    if (overlay) {
      tl.fromTo(
        overlay,
        {
          opacity: 1,
          backdropFilter: "blur(4px)",
        },
        {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.5,
          ease: "power3.in",
        },
        0
      );
    }

    tl.fromTo(
      content,
      {
        opacity: 1,
        "--contact-modal-y": "0px",
      },
      {
        opacity: 0,
        "--contact-modal-y": "100px",
        duration: 0.5,
        ease: "power3.in",
      },
      0
    );
  }, [setModalPhase, stopActiveTimeline]);

  useLayoutEffect(() => {
    if (phase !== "opening") return;

    let rafId: number;
    stopActiveTimeline();
    const animationId = animationIdRef.current;
    let localTl: gsap.core.Timeline | null = null;

    const animate = () => {
      const overlay = overlayRef.current;
      const content = contentRef.current;

      if (!content) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          if (animationIdRef.current !== animationId) return;
          timelineRef.current = null;
          content.style.removeProperty("--contact-modal-y");
          gsap.set(content, { clearProps: "opacity" });
          if (overlay) {
            gsap.set(overlay, { clearProps: "opacity,backdropFilter" });
          }
          setModalPhase("open");
        },
      });

      timelineRef.current = tl;
      localTl = tl;

      if (overlay) {
        if (openingFromClosedRef.current) {
          gsap.set(overlay, { opacity: 0, backdropFilter: "blur(0px)" });
        }
        tl.to(
          overlay,
          {
            opacity: 1,
            backdropFilter: "blur(4px)",
            duration: 0.8,
            ease: "power3.out",
          },
          0
        );
      }

      if (openingFromClosedRef.current) {
        gsap.set(content, {
          opacity: 0,
          "--contact-modal-y": "100px",
        });
      }
      tl.to(
        content,
        {
          opacity: 1,
          "--contact-modal-y": "0px",
          duration: 0.8,
          ease: "power3.out",
        },
        0
      );
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      if (localTl) {
        localTl.kill();
        if (timelineRef.current === localTl) {
          timelineRef.current = null;
        }
      }
    };
  }, [phase, setModalPhase, stopActiveTimeline]);

  useLayoutEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  // Lock background scrolling while modal is open (Lenis support)
  useEffect(() => {
    if (!lenis) return;
    if (phase !== "closed") {
      lenis.stop();
    } else {
      // Only restart Lenis if we are not on the home page or if the intro is complete.
      if (pathname !== "/" || isIntroComplete) {
        lenis.start();
      }
    }
  }, [phase, lenis, pathname, isIntroComplete]);

  const shouldUseInitialHiddenState = phase === "opening" && isOpeningFromClosed;

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {phase !== "closed" ? (
        <DynamicContactModalDialog
          isOpen
          shouldUseInitialHiddenState={shouldUseInitialHiddenState}
          overlayRef={overlayRef}
          contentRef={contentRef}
          onOpen={openModal}
          onClose={closeModal}
        />
      ) : null}
    </ContactModalContext.Provider>
  );
}
