import React from 'react';

export function Footer() {
  return (
    <footer className="w-full py-8 mt-20 border-t border-white/10 relative z-10 px-8 lg:px-24 flex flex-col md:flex-row items-center justify-between text-white/50 text-sm">
      <div className="flex items-center gap-2 mb-4 md:mb-0">
        <div className="w-2 h-2 rounded-full bg-primary relative">
          <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></div>
        </div>
        <span>Available for collaboration</span>
      </div>

      <div className="flex items-center gap-6 mb-4 md:mb-0">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          LinkedIn
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
          Twitter
        </a>
      </div>

      <div>
        &copy; {new Date().getFullYear()} Sumit Patel. All rights reserved.
      </div>
    </footer>
  );
}
