"use client";

import React from 'react';

export const ExpertiseSection = () => {
  return (
    <section className="px-8 md:px-24 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="flex flex-col">
        <h3 className="text-2xl font-extrabold mb-6 text-white">Expertise</h3>
        <p className="text-white/70 leading-relaxed mb-8 max-w-lg">
          Combining deep technical knowledge in AI and full-stack development with a refined eye for design. My approach is rooted in building scalable, user-centric solutions that solve complex problems.
        </p>
        <div className="flex flex-wrap gap-3">
          {['React / Next.js', 'TypeScript', 'Python / PyTorch', 'UI/UX Design', 'Node.js'].map(skill => (
            <span key={skill} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-white/90">
              {skill}
            </span>
          ))}
        </div>
      </div>
      
      <div className="relative rounded-2xl overflow-hidden min-h-[300px] bg-black border border-white/5 flex items-center justify-center group cursor-pointer">
        <div 
          className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-105 group-hover:opacity-50 transition-all duration-700" 
        />
        <div className="relative z-10 text-center p-8 flex flex-col items-center">
          <span className="text-5xl text-primary mb-4 block animate-pulse">✦</span>
          <h4 className="text-white text-2xl font-extrabold tracking-tight">Let&apos;s build the future</h4>
        </div>
      </div>
    </section>
  );
};
