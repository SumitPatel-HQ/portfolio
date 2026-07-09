"use client";

import dynamic from "next/dynamic";
import type { CSSProperties, RefObject } from "react";
import { ContactCard } from "@/components/Contacts/contact-card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/Contacts/dialog";

const DynamicContactForm = dynamic(() =>
  import("@/components/Contacts/ContactForm").then(
    (module) => module.ContactForm,
  ),
);

interface ContactModalDialogProps {
  isOpen: boolean;
  shouldUseInitialHiddenState: boolean;
  overlayRef: RefObject<HTMLDivElement | null>;
  contentRef: RefObject<HTMLDivElement | null>;
  onOpen: () => void;
  onClose: () => void;
}

export function ContactModalDialog({
  isOpen,
  shouldUseInitialHiddenState,
  overlayRef,
  contentRef,
  onOpen,
  onClose,
}: ContactModalDialogProps) {
  const wrapperStyle = shouldUseInitialHiddenState
    ? ({ opacity: 0, "--contact-modal-y": "100px" } as CSSProperties)
    : undefined;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) onOpen();
        else onClose();
      }}
    >
      <DialogContent
        wrapperRef={contentRef}
        overlayRef={overlayRef}
        overlayStyle={
          shouldUseInitialHiddenState
            ? { opacity: 0, backdropFilter: "blur(0px)" }
            : undefined
        }
        className="max-w-5xl p-0 border-none bg-transparent shadow-none outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0 md:w-[95vw] md:h-auto md:max-h-[95vh] md:max-w-none md:rounded-2xl lg:w-full lg:h-auto lg:max-w-6xl lg:h-[70vh] lg:rounded-xl"
        wrapperStyle={wrapperStyle}
        onEscapeKeyDown={(event) => {
          event.stopPropagation();
          event.preventDefault();
          if (document.body.dataset.contactTextareaExpanded !== "true") {
            onClose();
          }
        }}
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">Contact Me</DialogTitle>
        <div className="w-full min-h-0 md:max-h-[95vh] md:overflow-y-auto md:rounded-2xl lg:rounded-xl">
          <ContactCard>
            <DynamicContactForm onSuccess={onClose} />
          </ContactCard>
        </div>
      </DialogContent>
    </Dialog>
  );
}
