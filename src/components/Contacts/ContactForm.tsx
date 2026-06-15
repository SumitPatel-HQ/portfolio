"use client";

import React, { useState, useRef } from "react";
import { Input } from "@/components/Contacts/input";
import { Button } from "@/components/Contacts/button";
import { Label } from "@/components/Contacts/label";
import { useToast } from "@/components/Contacts/toast";
import { Textarea } from "@/components/Contacts/textarea";
import { Send } from "lucide-react";

interface ContactFormProps {
  onBeforeSubmit?: () => void;
}

export function ContactForm({ onBeforeSubmit }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form
      className="w-full h-full flex flex-col gap-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const name = nameRef.current?.value ?? "";
        const email = emailRef.current?.value ?? "";
        const phone = phoneRef.current?.value ?? "";
        const message = messageRef.current?.value ?? "";

        setIsSubmitting(true);
        if (onBeforeSubmit) {
          onBeforeSubmit();
        }

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, message }),
          });

          if (res.ok) {
            showToast("Message sent successfully!", "success");
            // Clear form if not closed
            if (nameRef.current) nameRef.current.value = "";
            if (emailRef.current) emailRef.current.value = "";
            if (phoneRef.current) phoneRef.current.value = "";
            if (messageRef.current) messageRef.current.value = "";
          } else {
            const data = await res.json().catch(() => ({}));
            showToast(
              data.error || "Failed to send message. Please try again.",
              "error"
            );
          }
        } catch {
          showToast(
            "Failed to send message. Please try again.",
            "error"
          );
        } finally {
          setIsSubmitting(false);
        }
      }}
    >
      <div className="flex flex-col gap-2">
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
      <div className="flex flex-col gap-2 pt-2 flex-1 min-h-[200px] md:min-h-[224px] lg:min-h-[120px]">
        <Label>Message <span className="text-red-500">*</span></Label>
        <Textarea required className="h-full flex-1 resize-none" placeholder="Tell me about your project..." ref={messageRef} />
      </div>
      
      <Button
        className="w-full bg-accent text-background font-bold text-base py-6 mt-auto uppercase flex items-center justify-center gap-2"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Sending..."
        ) : (
          <>
            Submit
            <Send className="w-5 h-5" />
          </>
        )}
      </Button>
    </form>
  );
}
