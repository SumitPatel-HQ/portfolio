"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContactModal } from '@/context/ContactModalContext';

const pageLinks = [
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'About Me', href: '/about' },
  { label: 'Contact Now', href: '#' },
];

export function Footer() {
  const pathname = usePathname();
  const { openModal } = useContactModal();

  // Filter links based on pathname
  const filteredLinks = pathname === '/' || '/about'
    ? pageLinks.filter(link => link.label !== 'Contact Now')
    : pageLinks;

  return (
    <footer className="relative z-10 mt-10 w-full px-8 py-8 text-sm text-white/50 md:px-24">
      <div className="grid grid-cols-1 items-center gap-4 text-center md:grid-cols-3 md:gap-6">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <span>AVAILABLE FOR WORK</span>
        </div>


        <div className="flex items-center justify-center gap-6">
         {filteredLinks.map((item) => 
           item.label === 'Contact Now' ? (
             <button
               key={item.label}
               onClick={openModal}
               className="hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer text-sm font-normal text-white/50"
             >
               {item.label}
             </button>
           ) : (
             <Link
               key={item.label}
               href={item.href}
               className="hover:text-primary transition-colors"
             >
               {item.label}
             </Link>
           )
         )}
        </div>

        <div className="text-center md:text-right">
          &copy; {new Date().getFullYear()} Sumit Patel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
