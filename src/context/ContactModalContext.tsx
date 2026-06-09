"use client";

import React, { createContext, useCallback, useContext, useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useIntro } from "@/context/IntroContext";
import { ContactCard } from "@/components/Contacts/contact-card";
import { useLenis } from "@/providers/LenisProvider";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/Contacts/dialog";

import { ContactForm } from "@/components/Contacts/ContactForm";

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

      <Dialog
        open={phase !== "closed"}
        onOpenChange={(open) => {
          if (!open) {
            closeModal();
          } else {
            openModal();
          }
        }}
      >
        <DialogContent
          wrapperRef={contentRef}
          overlayRef={overlayRef}
          overlayStyle={shouldUseInitialHiddenState ? { opacity: 0, backdropFilter: "blur(0px)" } : undefined}
          className="max-w-5xl p-0 border-none bg-transparent shadow-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 md:w-[95vw] md:h-auto md:max-h-[95vh] md:max-w-none md:rounded-2xl lg:w-full lg:h-auto lg:max-w-6xl lg:h-[70vh] lg:rounded-xl"
          wrapperStyle={shouldUseInitialHiddenState ? { opacity: 0, "--contact-modal-y": "100px" } as React.CSSProperties : undefined}
          onEscapeKeyDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (document.body.dataset.contactTextareaExpanded !== "true") {
              closeModal();
            }
          }}
          aria-describedby={undefined}
        >
          <DialogTitle className="sr-only">Contact Me</DialogTitle>
          <div className="w-full min-h-0 md:max-h-[95vh] md:overflow-y-auto md:rounded-2xl lg:rounded-xl">
            <ContactCard>
              <ContactForm onBeforeSubmit={closeModal} />
            </ContactCard>
          </div>
        </DialogContent>
      </Dialog>
    </ContactModalContext.Provider>
  );
}
