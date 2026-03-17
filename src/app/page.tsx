"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProjectRow } from '@/components/ui/ProjectRow';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex flex-col lg:flex-row px-8 md:px-24 mb-12">
        {/* Left Zone (60%) */}
        <div className="w-full lg:w-[60%] flex flex-col justify-center z-10 pt-10 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-primary font-bold tracking-widest uppercase text-sm mb-4"
          >
            Portfolio 2024
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-white font-black leading-[0.9] tracking-tighter mb-6 text-[14vw] lg:text-[9vw] break-words"
          >
            SUMIT<br />PATEL
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-white/70 text-lg md:text-xl font-normal max-w-md mb-10 leading-relaxed"
          >
            AI-Focused Full-Stack Developer & Designer crafting digital experiences through code and creative strategy.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Link 
              href="/work" 
              className="flex items-center justify-center h-14 px-8 border-2 border-primary text-primary rounded-full font-bold text-base transition-all hover:bg-primary hover:text-black"
            >
              View Work
            </Link>
            <Link 
              href="/about" 
              className="flex items-center gap-2 text-white font-bold text-base hover:text-primary transition-colors group"
            >
              About Me
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
        
        {/* Right Zone (40%) */}
        <div className="w-full lg:w-[40%] relative mt-12 lg:mt-0 flex items-end justify-center lg:justify-end overflow-hidden">
          {/* Massive Ghost 'S' */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black pointer-events-none z-0 leading-none text-transparent mix-blend-overlay"
            style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)' }}
          >
            S
          </motion.div>
          
          {/* Portrait Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10 w-full max-w-md aspect-[3/4] lg:aspect-auto lg:h-[80%] rounded-2xl overflow-hidden grayscale contrast-125 brightness-90 group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              alt="Portrait of Sumit Patel" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBABjdjwz-Sy1wNMgYfY5gQ4edmnTJnhm6ljrUcxnDBR9SzTm4aPDSTeJlRHRc_Xci7qYGGo-T0eyM4wBMxnFsBvo3BLIQE7xevucb7Vf4LApU2uaIObQlUHnTHLveYzB3rDbz6_rlL4uZWV7LcKDLnrQ-W7PZIkJhrnA2S5Cw-3FViP7cvUPVPtZbnEZLDJ0QuimrhVSJnz8p3zydplmIMq_lygNPf7VnXQNPetYZxiNsB--15cTFzrq9f_38w53kqoODy-r7tXyaA"
              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-50"></div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <span className="rotate-90">→</span>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="px-8 md:px-24 py-20 flex flex-col">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4">
          <span className="w-3 h-3 rounded-full bg-primary"></span>
          Featured Work
        </h2>
        
        <div className="w-full border-t border-white/10">
          <ProjectRow title="FinTech AI" category="Development" year="2023" href="/work" />
          <ProjectRow title="HealthSync" category="UX Design" year="2022" href="/work" />
          <ProjectRow title="CryptoDash" category="Full Stack" year="2022" href="/work" />
          <ProjectRow title="Nexus AI" category="Research" year="2024" href="/work" />
        </div>
      </section>

      {/* Expertise Section */}
      <section className="px-8 md:px-24 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold mb-6 text-white">Expertise</h3>
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
            <h4 className="text-white text-2xl font-bold tracking-tight">Let&apos;s build the future</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
