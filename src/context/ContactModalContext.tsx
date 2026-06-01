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
  DialogDescription,
  DialogHeader,
} from "@/components/Contacts/dialog";

import { Input } from "@/components/Contacts/input";
import { Button } from "@/components/Contacts/button";
import { Label } from "@/components/Contacts/label";
import { useToast } from "@/components/Contacts/toast";
import { Textarea } from "@/components/Contacts/textarea";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { lenis } = useLenis();
  const { showToast } = useToast();
  const pathname = usePathname();
  const { isIntroComplete } = useIntro();

  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const phaseRef = useRef<ModalPhase>("closed");
  const openingFromClosedRef = useRef(true);
  const animationIdRef = useRef(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

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

    openingFromClosedRef.current = phaseRef.current === "closed";
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
      tl.to(
        overlay,
        {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.5,
          ease: "power3.in",
        },
        0
      );
    }

    tl.to(
      content,
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
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
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

  const shouldUseInitialHiddenState = phase === "opening" && openingFromClosedRef.current;

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
          ref={contentRef}
          overlayRef={overlayRef}
          overlayStyle={shouldUseInitialHiddenState ? { opacity: 0, backdropFilter: "blur(0px)" } : undefined}
          className="max-w-5xl p-0 border-none bg-transparent shadow-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
          style={shouldUseInitialHiddenState ? { opacity: 0, "--contact-modal-y": "100px" } as React.CSSProperties : undefined}
          onEscapeKeyDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (document.body.dataset.contactTextareaExpanded !== "true") {
              closeModal();
            }
          }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Me</DialogTitle>
            <DialogDescription>
              Fill out the form to get in touch. I&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full">
            <ContactCard>
              <form
                action=""
                className="w-full space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (isSubmitting) return;

                  const name = nameRef.current?.value ?? "";
                  const email = emailRef.current?.value ?? "";
                  const phone = phoneRef.current?.value ?? "";
                  const message = messageRef.current?.value ?? "";

                  setIsSubmitting(true);
                  closeModal(); // Close immediately for optimistic UI

                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name, email, phone, message }),
                    });

                    if (res.ok) {
                      showToast("Message sent successfully!", "success");
                    } else {
                      const data = await res.json().catch(() => ({}));
                      showToast(
                        data.error || "Failed to send message. Please try again.",
                        "error",
                      );
                    }
                  } catch {
                    showToast(
                      "Failed to send message. Please try again.",
                      "error",
                    );
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <div className="flex flex-col gap-2 ">
                  <Label>Name <span className="text-red-500">*</span></Label>
                  <Input type="text" required placeholder="John Doe" ref={nameRef} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Email <span className="text-red-500">*</span></Label>
                  <Input type="email" required placeholder="john@example.com" ref={emailRef} />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    placeholder="+91 0123456789"
                    ref={phoneRef}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Label>Message <span className="text-red-500">*</span></Label>
                  <Textarea required className="h-32 resize-none" placeholder="Tell me about your project..." ref={messageRef} />
                </div>
                <Button
                  className="w-full bg-accent text-background font-bold text-base py-6 mt-2 "
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </form>
            </ContactCard>
          </div>
        </DialogContent>
      </Dialog>
    </ContactModalContext.Provider>
  );
}
