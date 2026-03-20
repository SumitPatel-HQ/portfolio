"use client";

import React, { createContext, useContext, useState } from "react";
import { ContactCard } from "@/components/ui/contact-card";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { Input } from "@/components/ui/forms/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/forms/label";
import { Textarea } from "@/components/ui/forms/textarea";

interface ContactModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error("useContactModal must be used within a ContactModalProvider");
  }
  return context;
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-5xl p-0 border-none bg-transparent shadow-none">
          <DialogHeader className="sr-only">
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>Fill out the form to get in touch.</DialogDescription>
          </DialogHeader>
          <ContactCard
            title="Get in touch"
            description="If you have any questions regarding our Services or need help, please fill out the form here. We do our best to respond within 1 business day."
            contactInfo={[
              {
                icon: MailIcon,
                label: "Email",
                value: "hello@sumitpatel.dev",
              },
              {
                icon: PhoneIcon,
                label: "Phone",
                value: "+91 123 456 7890",
              },
              {
                icon: MapPinIcon,
                label: "Location",
                value: "Remote / Worldwide",
                className: "md:col-span-2 lg:col-span-3",
              },
            ]}
          >
            <form action="" className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input type="text" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input type="email" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Phone</Label>
                <Input type="phone" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Message</Label>
                <Textarea className="h-32 resize-none" />
              </div>
              <Button className="w-full" type="button" onClick={closeModal}>
                Submit
              </Button>
            </form>
          </ContactCard>
        </DialogContent>
      </Dialog>
    </ContactModalContext.Provider>
  );
}
