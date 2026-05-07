"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SkillBar } from '../../../trash/skills/SkillBar';
import { SkillPill } from '../../../trash/skills/SkillPill';

const EXPERIENCES = [
  {
    year: '2022',
    duration: 'Present',
    type: 'Full Time',
    title: 'Senior Full-Stack Developer',
    company: 'TechNova',
    desc: 'Leading the frontend architecture migration to Next.js and overseeing the integration of AI-driven analytics dashboards.'
  },
  {
    year: '2020',
    duration: '2 Years',
    type: 'Full Time',
    title: 'AI Engineer',
    company: 'DataMinds',
    desc: 'Developed NLP models for automated customer support and optimized data pipelines using Python and TensorFlow.'
  },
  {
    year: '2018',
    duration: '2 Years',
    type: 'Full Time',
    title: 'Frontend Developer',
    company: 'CreativePulse',
    desc: 'Specialized in interactive UI/UX implementation using React and GSAP, delivering award-winning campaign sites.'
  },
  {
    year: '2017',
    duration: '1 Year',
    type: 'Internship',
    title: 'Junior Developer',
    company: 'StartUp Inc.',
    desc: 'Assisted in backend API development and database management for early-stage SaaS products.'
  }
];

const SKILLS = [
  { name: 'Frontend Architecture', percentage: 95, tools: 'React, Next.js, TypeScript, Tailwind CSS' },
  { name: 'Backend Engineering', percentage: 88, tools: 'Node.js, Python, Go, PostgreSQL' },
  { name: 'AI & Machine Learning', percentage: 82, tools: 'TensorFlow, PyTorch, OpenAI API, LangChain' },
  { name: 'DevOps & Cloud', percentage: 75, tools: 'AWS, Docker, Kubernetes, CI/CD' }
];

const TOOLS = [
  'Figma', 'Jira', 'Git/GitHub', 'Postman', 'VS Code', 'Vercel', 
  'Supabase', 'MongoDB', 'Redux', 'GraphQL', 'Three.js', 'Scikit-learn'
];

export default function Experience() {
  return (
    <div className="flex flex-col flex-1 px-8 lg:px-24 mb-32 max-w-7xl mx-auto w-full">
      {/* Page Title Area */}
      <section className="mb-20 mt-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 mb-6"
        >
          Professional<br />Experience
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/50 text-lg md:text-xl max-w-2xl font-light"
        >
          A timeline of my journey in AI and Full-Stack Development, building scalable solutions and intelligent systems.
        </motion.p>
      </section>

      {/* Experience Timeline */}
      <section className="flex flex-col w-full">
        {EXPERIENCES.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative flex flex-col md:flex-row items-start md:items-center py-16 border-t border-white/10 transition-all hover:bg-white/5 px-4 -mx-4 rounded-xl overflow-hidden"
          >
            <div className="w-full md:w-1/3 mb-4 md:mb-0 relative select-none">
              <span className="text-[6rem] md:text-[8rem] lg:text-[10rem] font-extrabold leading-none text-white/5 absolute -top-12 md:-top-16 left-0 -z-10 group-hover:text-primary/10 transition-colors">
                {exp.year}
              </span>
              <div className="relative z-10 pl-2">
                <span className={`font-extrabold tracking-widest uppercase text-sm mb-1 block ${exp.duration === 'Present' ? 'text-primary' : 'text-white/50'}`}>
                  {exp.duration}
                </span>
                <span className="text-white/40 text-sm">{exp.type}</span>
              </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-2 relative z-10">
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between w-full">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white group-hover:text-primary transition-colors">{exp.title}</h3>
                <span className="text-lg md:text-xl font-medium text-white/50">{exp.company}</span>
              </div>
              <p className="text-white/50 text-base md:text-lg font-light leading-relaxed max-w-3xl">
                {exp.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="mt-24 w-full">
        <div className="flex items-center gap-4 mb-12">
          <span className="h-px w-12 bg-primary"></span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Skills & Tools</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="flex flex-col">
            {SKILLS.map((skill, index) => (
              <SkillBar 
                key={index}
                name={skill.name} 
                percentage={skill.percentage} 
                tools={skill.tools} 
              />
            ))}
          </div>
          
          <div className="flex flex-col justify-center">
            <h3 className="text-white/50 uppercase tracking-widest text-sm font-semibold mb-6">Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {TOOLS.map((tool, index) => (
                <SkillPill key={index} skill={tool} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
