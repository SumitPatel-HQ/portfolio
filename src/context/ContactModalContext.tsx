"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const { lenis } = useLenis();
  const { showToast } = useToast();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Lock background scrolling while modal is open (Lenis support)
  useEffect(() => {
    if (!lenis) return;
    if (isOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isOpen, lenis]);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="max-w-5xl p-0 border-none bg-transparent shadow-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
          onEscapeKeyDown={(e) => {
            if (document.body.dataset.contactTextareaExpanded === "true") {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Me</DialogTitle>
            <DialogDescription>
              Fill out the form to get in touch. I&apos;ll get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <ContactCard>
            <form
              action=""
              className="w-full space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                closeModal();
              }}
            >
              <div className="flex flex-col gap-2 ">
                <Label>Name <span className="text-red-500">*</span></Label>
                <Input type="text" required placeholder="John Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email <span className="text-red-500">*</span></Label>
                <Input type="email" required placeholder="john@example.com" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  inputMode="numeric"
                  placeholder="+91 0123456789"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <Label>Message <span className="text-red-500">*</span></Label>
                <Textarea required className="h-32 resize-none" placeholder="Tell me about your project..." />
              </div>
              <Button
                className="w-full bg-accent text-background font-bold text-base py-6 mt-2 "
                type="submit"
              >
                Submit
              </Button>
            </form>
          </ContactCard>
        </DialogContent>
      </Dialog>
    </ContactModalContext.Provider>
  );
}
