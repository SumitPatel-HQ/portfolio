"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center px-4 md:px-8 relative min-h-[70vh]">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] rounded-full blur-3xl -z-10 pointer-events-none bg-white/[0.02]" />
      
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-6 md:gap-10 relative z-10">
        
        {/* Hero Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-white"
        >
          Let&apos;s Build <br className="md:hidden" />
          <span className="text-primary block md:inline">Something.</span>
        </motion.h1>
        
        {/* Email Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-4 md:mt-8"
        >
          <a 
            href="mailto:hello@sumitpatel.dev" 
            className="group flex items-center gap-3 md:gap-4 text-xl md:text-3xl font-bold hover:text-primary transition-colors duration-300"
          >
            <span>hello@sumitpatel.dev</span>
            <span className="transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 text-2xl md:text-4xl leading-none">
              ↗
            </span>
          </a>
        </motion.div>
        
        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8 md:mt-12 text-base md:text-lg font-medium text-white/50"
        >
          {[
            { name: 'GitHub', href: 'https://github.com' },
            { name: 'LinkedIn', href: 'https://linkedin.com' },
            { name: 'Twitter', href: 'https://twitter.com' }
          ].map(social => (
            <a 
              key={social.name} 
              href={social.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative flex items-center gap-2 hover:text-primary transition-colors group"
            >
              {social.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
