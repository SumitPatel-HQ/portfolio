"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContactModal } from '@/context/ContactModalContext';

const pageLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Experience', href: '/experience' },
  { label: 'About Me', href: '/about' },
  { label: 'Contact Now', href: '#' },
];

export function Footer() {
  const pathname = usePathname();
  const { openModal } = useContactModal();

  // Filter links based on pathname
  const filteredLinks = pathname === '/' || pathname === '/about'
    ? pageLinks.filter(link => link.label !== 'Contact Now')
    : pageLinks;

  return (
    <footer className={`relative z-10 rounded-2xl w-full px-8 py-8 text-sm text-white/50 md:py-6 md:px-24 md:border-t-[3px] md:border-white/10 lg:py-8 lg:border-t-2 lg:border-white/10 ${
      pathname === '/projects' ? 'mt-10 md:-mt-5  bg-background' : 'mt-10 md:mt-0 lg:mt-10'
    }`}>
      <div className="grid grid-cols-1 items-center gap-6 text-center md:gap-8 lg:grid-cols-3 lg:gap-6">
        <div className="flex items-center justify-center gap-2 lg:justify-start">
          <span className="md:text-lg md:font-bold md:tracking-[0.15em] md:text-white lg:text-sm lg:font-normal lg:tracking-normal lg:text-white/50">AVAILABLE FOR WORK</span>
        </div>


        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:gap-6">
          {filteredLinks.map((item) =>
            item.label === 'Contact Now' ? (
              <button
                key={item.label}
                onClick={openModal}
                className="hover:text-primary transition-colors bg-transparent border-none p-0 cursor-pointer text-sm font-normal text-white/50 md:text-base md:font-medium lg:text-sm lg:font-normal lg:text-white/50"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-primary transition-colors md:text-base md:font-medium md:text-white/80 lg:text-sm lg:font-normal lg:text-white/50"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="text-center md:text-sm md:text-white/40 lg:text-right lg:text-white/50">
          &copy; {new Date().getFullYear()} Sumit Patel. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
