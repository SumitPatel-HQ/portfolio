"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SkillPill } from '@/components/ui/SkillPill';
import { MarqueeStrip } from '@/components/ui/MarqueeStrip';

const EXPERTISE = [
  'React', 'Node.js', 'Python', 'TensorFlow', 'UI/UX', 'TypeScript', 'Next.js', 'Three.js'
];

const MARQUEE_ITEMS = [
  'Awwwards Inspired', 'Next.js', 'GSAP', 'AI/ML', 'Open Source'
];

export default function About() {
  return (
    <div className="flex flex-col flex-1 px-8 lg:px-24">
      {/* Identity Section */}
      <section className="relative pt-16 md:pt-24 mb-32">
        <div className="absolute -top-16 -left-4 md:-left-10 text-[15vw] md:text-[6vw] font-black pointer-events-none leading-none z-0 text-transparent mix-blend-overlay" style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)' }}>
          01
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col justify-end">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-4 text-white"
            >
              IDE<br /><span className="text-primary">NTITY</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/50 text-lg"
            >
              Who I am behind the code.
            </motion.p>
          </div>
          
          <div className="lg:col-span-7 flex flex-col justify-end gap-8">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-white/80"
            >
              <p>
                I am a full-stack developer with a deep-seated passion for AI and machine learning. I build digital experiences that merge clean, efficient code with thoughtful, human-centric design. My philosophy is simple: technology should serve humanity, not complicate it.
              </p>
              <p>
                With a unique background bridging computer science and fine arts, I navigate the space between engineering precision and creative intuition. This duality allows me to deliver solutions that are not only robust and scalable but also visually compelling and intuitive.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-6"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Core Competencies</h3>
              <div className="flex flex-wrap gap-3">
                {EXPERTISE.map(skill => (
                  <SkillPill key={skill} skill={skill} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mb-32">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Services</h2>
          <p className="text-white/50 mt-4 md:mt-0">How I can help you build the future.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              id: '01',
              title: 'UI/UX Design',
              desc: 'Crafting intuitive interfaces and design systems. I focus on accessibility, micro-interactions, and visual storytelling to create engaging user journeys.',
              icon: '✧'
            },
            {
              id: '02',
              title: 'Development',
              desc: 'Building robust frontend and backend architectures. From performant React applications to scalable Node.js APIs and AI model integration.',
              icon: '⚡'
            },
            {
              id: '03',
              title: 'The Full Package',
              desc: 'End-to-end product development. I take your idea from concept to deployment, handling everything including strategy, design, code, and CI/CD.',
              icon: '🚀'
            }
          ].map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative p-8 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300 flex flex-col h-full min-h-[400px] border border-white/5"
            >
              <div className="text-[15vw] md:text-[5vw] font-bold text-primary opacity-80 leading-none mb-auto">{service.id}</div>
              <div className="mt-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6 text-2xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Credentials (Marquee) */}
      <section className="w-full -mx-8 lg:-mx-24 px-8 lg:px-24 mb-32 overflow-hidden">
        <MarqueeStrip items={MARQUEE_ITEMS} />
      </section>

      {/* CTA section */}
      <section className="flex flex-col items-center justify-center text-center gap-6 pb-20">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">Ready to collaborate?</h2>
        <p className="text-white/50 max-w-xl">
          Let&apos;s build something extraordinary together. I&apos;m currently available for freelance projects and consulting.
        </p>
        <Link 
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 bg-primary text-black font-bold text-lg px-8 py-4 rounded-full hover:scale-105 transition-transform"
        >
          Start a Project
          <span>→</span>
        </Link>
      </section>
    </div>
  );
}
