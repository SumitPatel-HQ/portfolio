"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pageLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'About Me', href: '/about' },
];

export function Footer() {
  const pathname = usePathname();

  // Disable footer on the about page
  if (pathname === '/about') {
    return null;
  }
  return (
    <footer className="relative z-10 mt-10 w-full px-8 py-8 text-sm text-white/50 md:px-24">
      <div className="grid grid-cols-1 items-center gap-4 text-center md:grid-cols-3 md:gap-6">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
          <span>AVAILABLE FOR WORK</span>
        </div>


        <div className="flex items-center justify-center gap-6">
         {pageLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            {item.label}
          </Link>
         ))}
        </div>

        <div className="text-center md:text-right">
          &copy; {new Date().getFullYear()} Sumit Patel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
