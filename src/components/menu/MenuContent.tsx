"use client";

import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useContactModal } from "@/context/ContactModalContext";
import { socials } from "@/data/socialLinks";
import { ResumeModal } from "@/components/ResumeModal";
import { AnimatedArrow } from "./AnimatedArrow";

interface MenuContentProps {
  onNavigate?: () => void;
}

const menuItems: { label: string; href?: string }[] = [
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "About Me", href: "/about" },
  { label: "Contact", href: "#" },
];

/**
 * Ultra-refined motion easing curve
 * cubic-bezier(0.45, 0, 0.15, 1) - nuanced ease-in-out where momentum evolves organically
 * This creates a frictionless, effortless glide that feels naturally responsive
 */
const PREMIUM_EASE = [0.45, 0, 0.15, 1] as const;

const titleLetters = ["S", "U", "M", "I", "T"];

export const MenuContent: React.FC<MenuContentProps> = ({ onNavigate }) => {
  const { openModal } = useContactModal();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="flex h-full w-full flex-col px-6 pb-20 pt-24 font-sans sm:px-10 sm:pt-28 lg:px-16 lg:pb-24 lg:pt-32 xl:px-24">
      <div className="grid h-full w-full grid-cols-1 gap-10 lg:mx-auto lg:mt-15 lg:w-fit lg:grid-cols-[max-content_max-content] lg:items-start lg:gap-x-150">
        <div className="flex min-h-0 flex-col justify-center pl-2 sm:pl-4 lg:pl-8">
          <nav aria-label="Main menu" className="flex flex-col gap-2 sm:gap-3">
            {menuItems.map((item) => (
              <div key={item.label} className="overflow-hidden py-1 -my-1">
                {item.label === "Contact" ? (
                  <motion.button
                    onClick={() => {
                      openModal();
                    }}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group/menu-item menu-content-pages inline-flex items-center gap-3 text-[44px] font-[350] leading-[1] tracking-[-0.015em] text-foreground bg-transparent border-none p-0 cursor-pointer sm:text-[56px] lg:text-[64px]"
                    whileHover="hover"
                    initial="idle"
                  >
                    <motion.span
                      className="inline-flex items-center"
                      variants={{
                        idle: { x: 0 },
                        hover: { x: 1.5 },
                      }}
                      transition={{
                        duration: 0.65,
                        ease: PREMIUM_EASE,
                      }}
                    >
                      <AnimatedArrow isHovered={hoveredItem === item.label} />
                    </motion.span>
                    <motion.span
                      variants={{
                        idle: { x: 0, opacity: 0.92 },
                        hover: { x: 2.5, opacity: 1 },
                      }}
                      transition={{
                        duration: 0.55,
                        ease: PREMIUM_EASE,
                        // Invisible staggered choreography
                        delay: 0.03,
                      }}
                    >
                      {item.label}
                    </motion.span>
                  </motion.button>
                ) : (
                  <motion.div
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                    whileHover="hover"
                    initial="idle"
                  >
                    <Link
                      href={item.href || "#"}
                      onClick={onNavigate}
                      className="group/menu-item menu-content-pages inline-flex items-center gap-3 text-[44px] font-[350] leading-[1] tracking-[-0.015em] text-foreground sm:text-[56px] lg:text-[64px]"
                    >
                      <motion.span
                        className="inline-flex items-center"
                        variants={{
                          idle: { x: 0 },
                          hover: { x: 1.5 },
                        }}
                        transition={{
                          duration: 0.65,
                          ease: PREMIUM_EASE,
                        }}
                      >
                        <AnimatedArrow isHovered={hoveredItem === item.label} />
                      </motion.span>
                      <motion.span
                        variants={{
                          idle: { x: 0, opacity: 0.92 },
                          hover: { x: 2.5, opacity: 1 },
                        }}
                        transition={{
                          duration: 0.55,
                          ease: PREMIUM_EASE,
                          // Invisible staggered choreography
                          delay: 0.03,
                        }}
                      >
                        {item.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="menu-content-info grid grid-cols-1 gap-2 text-left text-[13px] font-medium uppercase tracking-[0.085em] leading-[1.33] text-foreground-secondary lg:grid-cols-2 lg:items-start lg:gap-x-0 lg:text-right">
          <div className="space-y-1 lg:self-start">
            <p>Sumit</p>
            <p>401303 Virar</p>
            <p>Maharashtra</p>
            <p
              onClick={() => setIsResumeOpen(true)}
              className="cursor-pointer transition-all hover:opacity-70">
              View Resume
            </p>
          </div>

          {/* can be scaled for conact section */}
          {/* <div className="space-y-1">
            <a href="mailto:contact@akaru.fr" className="block transition-opacity hover:opacity-70">contact@akaru.fr</a>
            <a href="mailto:job@akaru.fr" className="block transition-opacity hover:opacity-70">job@akaru.fr</a>
          </div> */}

          <div className="space-y-1 lg:self-start">
            {socials
              .filter(
                (social) =>
                  !["Email", "Phone", "Location"].includes(social.label),
              )
              .map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-all hover:opacity-70"
                >
                  {social.label}
                </a>
              ))}
          </div>

          {/* contact number */}
          {/* <div>
            <a href="tel:0482338510" className="transition-opacity hover:opacity-70">04 82 33 85 10</a>
          </div> */}
        </div>
      </div>

      {/* Desktop title layout (visible from lg and up) */}
      <div
        className="pointer-events-none relative mt-4 hidden w-full items-end justify-center overflow-visible pb-0 pt-2 lg:flex"
        aria-hidden="true"
      >
        <div className="overflow-visible">
          <h1
            aria-label="SUMIT"
            className="menu-content-title -translate-y-8 leading-[0.72] text-[clamp(14rem,36vw,33rem)] font-extrabold uppercase tracking-[-0.07em] text-foreground/10 [perspective:1000px] lg:-translate-y-18 scale-y-[1.2]"
          >
            <span className="menu-content-title-letters flex gap-0 [transform-style:preserve-3d]">
              {titleLetters.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  aria-hidden="true"
                  className="menu-content-title-letter-clip block overflow-hidden leading-[1.05] pt-[0.3em] -mt-[0.3em] pb-[0.15em] -mb-[0.15em]"
                >
                  <span className="menu-content-title-letter block origin-bottom scale-y-[1.2] leading-tight [transform-style:preserve-3d]">
                    {letter}
                  </span>
                </span>
              ))}
            </span>
          </h1>
        </div>
      </div>

      {/* Mobile title layout (hidden on lg and up) */}
      <div
        className="pointer-events-none relative mt-auto flex items-end justify-center overflow-visible pb-20 pt-6 -mb-6 lg:hidden"
        aria-hidden="true"
      >
        <div className="overflow-visible">
          <div className="py-3 -my-3">
            <h1 className="menu-content-title-mobile block origin-bottom pb-2 leading-[0.9] text-[88px] font-extrabold uppercase text-foreground/15 sm:text-[132px]">
              <span className="block origin-bottom scale-y-[1.2]">SUMIT</span>
            </h1>
          </div>
        </div>
      </div>
      {/* RESUME PDF MODAL */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>


  );
};
