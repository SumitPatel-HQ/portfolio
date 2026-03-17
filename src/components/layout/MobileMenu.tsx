import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkItem {
  name: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: LinkItem[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed inset-0 z-40 bg-[var(--background)] flex flex-col justify-center items-center h-screen w-full"
        >
          <nav className="flex flex-col gap-8 text-center">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={clsx(
                    "uppercase tracking-[0.2em] text-2xl font-bold transition-all hover:text-primary",
                    isActive ? "text-primary" : "text-white/70"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 uppercase tracking-[0.2em] text-xl font-bold text-primary border border-primary px-8 py-4 hover:bg-primary hover:text-black transition-all"
            >
              Resume
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
