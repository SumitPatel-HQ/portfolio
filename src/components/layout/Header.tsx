"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { MobileMenu } from './MobileMenu';

const LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Work', href: '/work' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full px-8 lg:px-24 py-8 flex justify-between items-center z-50 backdrop-blur-md bg-black/50 border-b border-white/5">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white z-50 group">
          S<span className="text-primary group-hover:drop-shadow-[0_0_10px_var(--color-primary)] transition-all">P.</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-sm items-center">
          {LINKS.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={clsx(
                  "uppercase tracking-widest text-xs font-semibold transition-colors hover:text-primary",
                  isActive ? "text-primary" : "text-white/70"
                )}
              >
                {link.name}
              </Link>
            )
          })}
          
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-black transition-all rounded"
          >
            RESUME
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button 
          className="md:hidden flex flex-col gap-[6px] z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={clsx("w-6 h-px bg-white transition-transform origin-right", isMobileMenuOpen && "-rotate-45")} />
          <span className={clsx("w-6 h-px bg-white transition-opacity", isMobileMenuOpen && "opacity-0")} />
          <span className={clsx("w-6 h-px bg-white transition-transform origin-right", isMobileMenuOpen && "rotate-45")} />
        </button>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} links={LINKS} />
    </>
  );
}
