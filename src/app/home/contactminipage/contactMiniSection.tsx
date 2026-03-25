"use client";

import React from "react";
import { useContactModal } from "@/context/ContactModalContext";
import { socials } from "@/data/socialLinks";

export const ContactMiniSection = () => {
  const { openModal } = useContactModal();

  // Separate the first connection (usually Email) from the others for specific layout
  const primaryConnection = socials[0];
  // Filter out Instagram and X for this specific section
  const secondaryConnections = socials.slice(1).filter(
    (social) => social.label !== "Instagram" && social.label !== "X (Twitter)"
  );

  return (
    <section
      aria-labelledby="contact-mini-heading"
      className="relative w-full overflow-hidden px-8 py-12  md:px-24 md:py-0"
    >
      <div className="relative mx-auto grid w-full grid-cols-1 gap-10 rounded-3xl p-8 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-8">
          <h2
            id="contact-mini-heading"
            className="mt-4 animate-none text-4xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            Got a project in mind?
            <span className="block animate-none text-primary">
              Let&apos;s talk.
            </span>
          </h2>

          <p className="mt-5 mb-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            I design and build clean, high-impact digital experiences for modern
            products. If you have an idea worth shipping, I&apos;d love to hear
            it.
          </p>

          <div className="border-t w-full border-white/10 opacity-80" />
          <div className="pt-6">
            <p className="mb-4 text-sm uppercase tracking-[0.12em] text-white/55">
              Connect with me
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {/* Primary Connection (Email) */}
              {primaryConnection && (
                <a
                  href={primaryConnection.href}
                  className="group flex items-center gap-3 transition-all duration-300"
                  aria-label={primaryConnection.ariaLabel}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 group-hover:bg-accent group-hover:text-background group-hover:border-accent">
                    {React.createElement(primaryConnection.icon, {
                      className: "h-5 w-5",
                    })}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-extralight uppercase tracking-tight text-muted-custom">
                      {primaryConnection.label}
                    </span>
                    <span className="text-sm font-medium text-foreground underline decoration-white/10 decoration-1 underline-offset-4 transition-all group-hover:text-accent group-hover:decoration-accent">
                      {primaryConnection.username}
                    </span>
                  </div>
                </a>
              )}

              {/* Secondary Connections (Socials) */}
              {secondaryConnections.map((social) => (
                <React.Fragment key={social.id}>
                  {/* Divider for desktop */}
                  <div className="hidden h-8 w-px bg-white/10 md:block" />
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 transition-all duration-300"
                    aria-label={social.ariaLabel}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 group-hover:bg-accent group-hover:text-background group-hover:border-accent">
                      {React.createElement(social.icon, {
                        className: "h-5 w-5",
                      })}
                    </div>
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-4 md:flex md:items-center md:justify-end">
          <button
            onClick={openModal}
            aria-label="Open contact modal"
            className="inline-flex h-40 w-40 items-center justify-center rounded-full border border-primary/30 bg-accent text-sm font-extrabold uppercase tracking-btn text-background transition-all hover:scale-[1.03] hover:bg-accent/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background md:h-48 md:w-48"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};
