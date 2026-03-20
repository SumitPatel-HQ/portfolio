"use client";

import React from "react";
import { useContactModal } from "@/context/ContactModalContext";

export const ContactMiniSection = () => {
  const { openModal } = useContactModal();

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
            <span className="block animate-none text-primary">Let&apos;s talk.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            I design and build clean, high-impact digital experiences for modern
            products. If you have an idea worth shipping, I&apos;d love to hear it.
          </p>

          <div className="mt-8 pt-6">
            <p className="text-sm uppercase tracking-[0.12em] text-white/55 border-t border-white/10 pt-5 rounded-t-lg">Email</p>
            <a
              href="mailto:hello@sumitpatel.dev"
              aria-label="Send an email to hello@sumitpatel.dev"
              className="mt-2 inline-flex text-lg font-semibold text-foreground underline decoration-border-custom underline-offset-4 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              hello@sumitpatel.dev
            </a>
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
