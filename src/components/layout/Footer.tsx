import React from 'react';
import Link from 'next/link';

const pageLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'About Me', href: '/about' },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-10 w-full px-8 py-8 text-sm text-white/50 md:px-24">
      <div className="grid grid-cols-1 items-center gap-4 text-center md:grid-cols-3 md:gap-6">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
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
