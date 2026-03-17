import React from 'react';
import Link from 'next/link';

interface ProjectRowProps {
  title: string;
  category: string;
  year: string;
  href: string;
}

export function ProjectRow({ title, category, year, href }: ProjectRowProps) {
  return (
    <Link href={href} className="group relative flex flex-col md:flex-row items-start md:items-center py-8 border-b border-white/10 transition-colors hover:bg-white/5 cursor-pointer">
      <div className="md:w-1/4 mb-2 md:mb-0">
        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
      </div>
      <div className="md:w-1/4 mb-2 md:mb-0">
        <span className="text-sm uppercase tracking-wider text-white/50 font-medium">{category}</span>
      </div>
      <div className="md:w-1/4 mb-4 md:mb-0">
        <span className="text-sm font-mono text-white/50">{year}</span>
      </div>
      <div className="md:w-1/4 flex justify-end">
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
          <span className="text-white group-hover:text-black -rotate-45 group-hover:rotate-0 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  );
}
