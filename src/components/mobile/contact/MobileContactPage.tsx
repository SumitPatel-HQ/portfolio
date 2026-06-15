"use client";

import { motion } from "framer-motion";
import { MobileRouteHeader } from "../MobileRouteHeader";
import { socials } from "@/data/socialLinks";
import { ContactForm } from "@/components/Contacts/ContactForm";
import { ArrowUpRight } from "lucide-react";

import { MobileBackground } from "@/components/mobile/MobileBackground";

export function MobileContactPage() {
  const primaryContacts = socials.filter((s) =>
    ["Email", "LinkedIn", "GitHub"].includes(s.label)
  );

  const secondaryContacts = socials.filter((s) =>
    ["Phone", "Location"].includes(s.label)
  );

  const otherSocials = socials.filter((s) =>
    ["Instagram", "Twitter"].includes(s.label)
  );

  return (
    <div className="min-h-screen bg-background flex flex-col relative z-10">
      <MobileBackground />
      <MobileRouteHeader title="CONTACT" />

      <main className="flex-1 w-full pb-28 flex flex-col px-5 pt-8 space-y-8 relative z-10">

        {/* Header Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Get in touch
          </h1>
          <p className="text-[15px] font-light text-foreground-secondary/70 leading-relaxed">
            Got a question or want to collaborate? Drop me a message and I&apos;ll get back to you as soon as possible.
          </p>
        </motion.section>

        {/* Primary Contact Methods */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="flex flex-col border-y border-white/5"
        >
          {primaryContacts.map((contact, index) => (
            <a
              key={contact.id}
              href={contact.href}
              target={contact.label !== "Email" ? "_blank" : undefined}
              rel={contact.label !== "Email" ? "noopener noreferrer" : undefined}
              className={`flex items-center justify-between py-5 group transition-colors active:opacity-70 ${index !== primaryContacts.length - 1 ? "border-b border-white/5" : ""
                }`}
            >
              <div className="flex items-center gap-4">
                <contact.icon size={22} className="text-muted-custom transition-colors group-hover:text-foreground" />
                <span className="text-lg font-medium text-foreground tracking-wide uppercase">
                  {contact.label}
                </span>
              </div>
              <ArrowUpRight size={20} className="text-muted-custom transition-colors group-hover:text-foreground" />
            </a>
          ))}
        </motion.section>

        {/* Contact Info & Socials Grouped */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="flex flex-wrap items-start gap-10">
            {secondaryContacts.map((contact) => (
              <div key={contact.id} className="flex flex-col">
                <span className="text-[11px] font-medium text-muted-custom uppercase tracking-wider mb-1">
                  {contact.label}
                </span>
                <span className="text-[15px] font-light text-foreground-secondary break-words">
                  {contact.username}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            {otherSocials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="group flex items-center gap-2.5 text-muted-custom hover:text-foreground transition-colors active:scale-95"
                >
                  <Icon size={20} className="text-muted-custom group-hover:text-foreground transition-colors" />
                  <span className="text-[14px] font-light text-foreground-secondary/80">
                    {social.username}
                  </span>
                </a>
              );
            })}
          </div>
        </motion.section>

        {/* Separator */}
        <div className="h-px w-full bg-white/40 rounded-full" />

        {/* Message Form */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="pt-2 space-y-4"
        >
          <h1 className="text-3xl font-bold text-foreground/70 tracking-tight">
            Got a project in mind?<br /> Let&apos;s talk.
          </h1>
          <p className="text-[15px] font-light text-foreground-secondary/70 leading-relaxed mb-6">
            Tell me about your project, idea, or collaboration.
          </p>
          <ContactForm />
        </motion.section>

      </main>
    </div>
  );
}
