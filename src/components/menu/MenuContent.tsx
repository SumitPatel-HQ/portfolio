"use client";

import Link from 'next/link';
import React from 'react';
import { useContactModal } from '@/context/ContactModalContext';

interface MenuContentProps {
  onNavigate?: () => void;
}

const menuItems = [
  { label: 'Projects', href: '/work' },
  { label: 'Expertise', href: '/experience' },
  { label: 'Agency', href: '/about' },
  { label: 'Contact', href: '#' },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
];

const titleLetters = ['S', 'U', 'M', 'I', 'T'];

export const MenuContent: React.FC<MenuContentProps> = ({ onNavigate }) => {
  const { openModal } = useContactModal();

  return (
    <div className="flex h-full w-full flex-col px-6 pb-8 pt-24 font-sans sm:px-10 sm:pt-28 lg:px-16 lg:pb-10 lg:pt-32 xl:px-24">
      <div className="grid h-full w-full grid-cols-1 gap-10 lg:mx-auto lg:mt-15 lg:w-fit lg:grid-cols-[max-content_max-content] lg:items-start lg:gap-x-150">
        <div className="flex min-h-0 flex-col justify-center pl-2 sm:pl-4 lg:pl-8">
          <nav aria-label="Main menu" className="flex flex-col gap-2 sm:gap-3">
            {menuItems.map((item) => (
              <div key={item.label} className="overflow-hidden">
                {item.label === 'Contact' ? (
                  <button
                    onClick={() => {
                      onNavigate?.();
                      openModal();
                    }}
                    className="group menu-content-pages inline-flex items-center gap-3 text-[44px] font-[350] leading-[0.98] tracking-[-0.015em] text-foreground transition-transform duration-300 ease-out hover:translate-x-1 hover:opacity-85 sm:text-[56px] lg:text-[64px] bg-transparent border-none p-0 cursor-pointer"
                  >
                    <span className="translate-y-[-0.02em] text-[0.43em] opacity-45">↗</span>
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className="group menu-content-pages inline-flex items-center gap-3 text-[44px] font-[350] leading-[0.98] tracking-[-0.015em] text-foreground transition-transform duration-300 ease-out hover:translate-x-1 hover:opacity-85 sm:text-[56px] lg:text-[64px]"
                  >
                    <span className="translate-y-[-0.02em] text-[0.43em] opacity-45">↗</span>
                    <span>{item.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="menu-content-info grid grid-cols-1 gap-2 text-left text-[13px] font-medium uppercase tracking-[0.085em] leading-[1.33] text-foreground/85 lg:grid-cols-2 lg:items-start lg:gap-x-0 lg:text-right">
          <div className="space-y-1 lg:self-start">
            <p>Akaru</p>
            <p>9 quai Andre Lassagne</p>
            <p>69001 Lyon</p>
            <p>France</p>
          </div>

          {/* can be scaled for conact section */}
          {/* <div className="space-y-1">
            <a href="mailto:contact@akaru.fr" className="block transition-opacity hover:opacity-70">contact@akaru.fr</a>
            <a href="mailto:job@akaru.fr" className="block transition-opacity hover:opacity-70">job@akaru.fr</a>
          </div> */}

          <div className="space-y-1 lg:self-start">
            {socials.map((social) => (
              <a key={social.label} href={social.href} className="block transition-opacity hover:opacity-70">
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
      <div className="pointer-events-none relative mt-6 hidden w-full items-end justify-center overflow-visible pb-0 pt-4 lg:flex" aria-hidden="true">
        <div className="overflow-visible">
          <h1
            aria-label="SUMIT"
            className="menu-content-title translate-y-0 leading-[0.72] text-[clamp(14rem,36vw,33rem)] font-extrabold uppercase tracking-[-0.07em] text-foreground/10 [perspective:1000px]"
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
      <div className="pointer-events-none relative mt-auto flex items-end justify-center overflow-visible pb-6 pt-6 -mb-6 lg:hidden" aria-hidden="true">
        <div className="overflow-visible">
          <div className="py-3 -my-3">
            <h1 className="menu-content-title-mobile block origin-bottom pb-2 leading-[0.9] text-[88px] font-extrabold uppercase text-foreground/15 sm:text-[132px]">
              <span className="block origin-bottom scale-y-[1.2]">SUMIT</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
