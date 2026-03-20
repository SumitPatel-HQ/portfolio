"use client";

import Link from 'next/link';
import React, { useState } from 'react';

interface MenuContentProps {
  onNavigate?: () => void;
}

const menuItems = [
  { label: 'Projects', href: '/work' },
  { label: 'Expertise', href: '/experience' },
  { label: 'Agency', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
];

export const MenuContent: React.FC<MenuContentProps> = ({ onNavigate }) => {
  const [isInfoOpenMobile, setIsInfoOpenMobile] = useState(false);

  return (
    <div className="flex h-full w-full flex-col px-6 pb-8 pt-24 font-sans sm:px-10 sm:pt-28 lg:px-16 lg:pb-10 lg:pt-20 xl:px-24">
      <div className="grid h-full w-full grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(360px,500px)] lg:items-stretch lg:gap-16">
        <div className="flex min-h-0 flex-col justify-center pl-2 sm:pl-4 lg:pl-8">
          <nav aria-label="Main menu" className="flex flex-col gap-2 sm:gap-3">
            {menuItems.map((item) => (
              <div key={item.label} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="group menu-content-pages inline-flex items-center gap-3 text-[44px] font-[350] leading-[0.98] tracking-[-0.015em] text-foreground transition-transform duration-300 ease-out hover:translate-x-1 hover:opacity-85 sm:text-[56px] lg:text-[64px]"
                >
                  <span className="translate-y-[-0.02em] text-[0.43em] opacity-45">↗</span>
                  <span>{item.label}</span>
                </Link>
              </div>
            ))}
          </nav>

          <div className="mt-8 lg:hidden">
            <button
              type="button"
              onClick={() => setIsInfoOpenMobile((prev) => !prev)}
              aria-expanded={isInfoOpenMobile}
              aria-controls="menu-mobile-info"
              className="inline-flex items-center gap-3 rounded-full border border-border-custom px-4 py-2 text-xs uppercase tracking-[0.14em] text-foreground/85 transition-colors hover:text-foreground"
            >
              <span>Info</span>
              <span className="text-sm leading-none">{isInfoOpenMobile ? '−' : '+'}</span>
            </button>

            {isInfoOpenMobile ? (
              <div
                id="menu-mobile-info"
                className="mt-4 grid grid-cols-1 gap-5 rounded-2xl border border-border-custom/70 bg-surface-dark/30 p-5"
              >
                <div className="menu-content-info space-y-1 text-[12px] font-medium uppercase tracking-btn leading-[1.35] text-foreground/85">
                  <p>Akaru</p>
                  <p>9 quai Andre Lassagne</p>
                  <p>69001 Lyon</p>
                  <p>France</p>
                </div>

                <div className="menu-content-info space-y-1 text-[12px] font-medium uppercase tracking-btn leading-[1.35] text-foreground/85">
                  {socials.map((social) => (
                    <a key={social.label} href={social.href} className="block transition-opacity hover:opacity-70">
                      {social.label}
                    </a>
                  ))}
                </div>

                <div className="menu-content-info space-y-1 text-[12px] font-medium uppercase tracking-btn leading-[1.35] text-foreground/85">
                  <a href="mailto:contact@akaru.fr" className="block transition-opacity hover:opacity-70">contact@akaru.fr</a>
                  <a href="mailto:job@akaru.fr" className="block transition-opacity hover:opacity-70">job@akaru.fr</a>
                </div>

                <div className="menu-content-info text-[12px] font-medium uppercase tracking-btn leading-[1.35] text-foreground/85">
                  <a href="tel:0482338510" className="transition-opacity hover:opacity-70">04 82 33 85 10</a>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-col lg:justify-between">
          <div className="grid grid-cols-2 gap-x-14 gap-y-11 pt-4">
            <div className="overflow-hidden">
              <div className="menu-content-info space-y-1 text-[13px] font-medium uppercase tracking-[0.085em] leading-[1.33] text-foreground/85">
                <p>Akaru</p>
                <p>9 quai Andre Lassagne</p>
                <p>69001 Lyon</p>
                <p>France</p>
              </div>
            </div>

            <div className="overflow-hidden justify-self-end text-right">
              <div className="menu-content-info space-y-1 text-[13px] font-medium uppercase tracking-[0.085em] leading-[1.33] text-foreground/85">
                {socials.map((social) => (
                  <a key={social.label} href={social.href} className="block transition-opacity hover:opacity-70">
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden self-end">
              <div className="menu-content-info space-y-1 text-[13px] font-medium uppercase tracking-[0.085em] leading-[1.33] text-foreground/85">
                <a href="mailto:contact@akaru.fr" className="block transition-opacity hover:opacity-70">contact@akaru.fr</a>
                <a href="mailto:job@akaru.fr" className="block transition-opacity hover:opacity-70">job@akaru.fr</a>
              </div>
            </div>

            <div className="overflow-hidden self-end justify-self-end text-right">
              <div className="menu-content-info text-[13px] font-medium uppercase tracking-[0.085em] leading-[1.33] text-foreground/85">
                <a href="tel:0482338510" className="transition-opacity hover:opacity-70">04 82 33 85 10</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop title layout (visible from lg and up) */}
      <div className="mt-8 hidden w-full items-end justify-between gap-8 lg:flex">
        <div className="h-80 w-150 overflow-hidden border border-border-custom/70 bg-surface-dark/50 p-4">
          <div className="menu-content-media h-full w-full overflow-hidden">
            <div className="h-full w-full bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.28),transparent_38%),linear-gradient(130deg,#2e3f4c,#0f1924_58%,#080b12)]" />
          </div>
        </div>

        <div className="overflow-visible">
          <div className="">
            <h1 className="menu-content-title leading-[0.9] text-[220px] font-extrabold uppercase tracking-[-0.07em] text-foreground xl:text-[23rem]">
              <span className="block origin-bottom scale-y-[1.5]">SUMIT</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Mobile title layout (hidden on lg and up) */}
      <div className="pointer-events-none relative mt-auto flex items-end justify-center overflow-visible pb-6 pt-6 -mb-6 lg:hidden">
        <div className="overflow-visible">
          <div className="py-3 -my-3">
            <h1 className="menu-content-title block origin-bottom pb-2 leading-[0.9] text-[88px] font-extrabold uppercase text-foreground sm:text-[132px]">
              <span className="block origin-bottom scale-y-[1.2]">SUMIT</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
