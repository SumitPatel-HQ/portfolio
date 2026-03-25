"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ContactCard } from "@/components/ui/contact-card";
import { useLenis } from "@/providers/LenisProvider";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/forms/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/forms/label";
import { Textarea } from "@/components/ui/forms/textarea";

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
        <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              Fill out the form to get in touch.
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
                <Label>Name</Label>
                <Input type="text" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input type="email" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Phone</Label>
                <Input type="phone" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Message</Label>
                <Textarea className="h-32 resize-none" />
              </div>
              <Button
                className="w-full bg-accent text-background"
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
