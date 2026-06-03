"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@/providers/GSAPProvider";

import { socials } from "@/data/socialLinks";
import { ContactOrb } from "@/components/ui/visuals/ContactOrb";
import { useContactModal } from "@/context/ContactModalContext";

export const ContactMiniSection = () => {
  const { openModal } = useContactModal();


  // Separate the first connection (usually Email) from the others for specific layout
  const primaryConnection = socials[0];
  // Filter out Instagram and X for this specific section
  const secondaryConnections = socials.slice(1).filter(
    (social) => social.label !== "Instagram" && social.label !== "Twitter" && social.label !== "Phone" && social.label !== "Location"
  );

  const sectionRef = useRef<HTMLElement>(null);
  const { isReady: isGSAPReady } = useGSAP();

  useEffect(() => {
    if (!isGSAPReady || !sectionRef.current) return;

    const titleWords = sectionRef.current.querySelectorAll(".title-word");
    const contactItems = sectionRef.current.querySelectorAll(".contact-item");
    const orbWrapper = sectionRef.current.querySelector(".contact-orb-wrapper");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
          refreshPriority: -1, // Ensures this calculates after the pin-spacers from Home/About pages
        },
      });

      tl.fromTo(
        titleWords,
        { y: 50, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.05, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          contactItems,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: { amount: 0.2 },
            duration: 0.8,
            ease: "power3.out"
          },
          "<" // Starts at the exact same time as the heading
        )
        .fromTo(
          orbWrapper,
          { y: 340, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            force3D: true
          },
          "<0.1" // Slight delay to offset the heaviest frame of the text blur
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [isGSAPReady]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="contact-mini-heading"
      className="relative w-full px-8 py-20 md:px-24 md:py-0"
    >
      <div className="relative mx-auto grid w-full grid-cols-1 gap-10 rounded-3xl p-8 lg:grid-cols-12 lg:gap-8">
        <div className="order-1 md:order-2 lg:order-1 lg:col-span-9">
          <h2
            id="contact-mini-heading"
            className="mt-4 animate-none text-4xl font-extrabold uppercase leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            <span className="sr-only">Got a project in mind? Let&apos;s talk.</span>
            <span aria-hidden="true" className="inline-flex flex-wrap overflow-hidden pb-1 -mb-1">
              {"Got a project in mind?".split(" ").map((word, index, array) => (
                <span key={index} className="inline-flex">
                  <span className="title-word inline-block">{word}</span>
                  {index < array.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
            </span>
            <span aria-hidden="true" className="block animate-none text-primary mt-2 overflow-hidden pb-2 -mb-2">
              {"Let's talk.".split(" ").map((word, index, array) => (
                <span key={index} className="inline-flex">
                  <span className="title-word inline-block">{word}</span>
                  {index < array.length - 1 && <span className="inline-block">&nbsp;</span>}
                </span>
              ))}
            </span>
          </h2>

          <p className="contact-item mt-5 mb-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            I design and build clean, high-impact digital experiences for modern
            products. If you have an idea worth shipping, I&apos;d love to hear
            it.
          </p>

          <div className="contact-item border-t max-w-5xl border-white/10 opacity-80" />
          <div className="pt-6">
            <p className="contact-item mb-4 text-sm uppercase tracking-[0.12em] text-white/55">
              Connect with me
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {/* Primary Connection (Email) */}
              {primaryConnection && (
                <a
                  href={primaryConnection.href}
                  className="contact-item group flex items-center gap-3 transition-all duration-300"
                  aria-label={primaryConnection.ariaLabel}
                  onClick={(e) => {
                    e.preventDefault();
                    openModal();
                  }}
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
                  <div className="contact-item hidden h-8 w-px bg-white/10 md:block" />
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-item group flex items-center gap-2 transition-all duration-300"
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

        {/* Big circle Bot */}
        <div className="contact-orb-wrapper order-2 md:order-1 lg:order-2 lg:col-span-3 flex items-center justify-center mt-10 md:mt-0 lg:mt-0 relative z-20">
          <ContactOrb />
        </div>
      </div>
    </section>
  );
};
