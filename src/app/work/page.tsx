"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FILTERS = ['All Projects', 'AI / ML', 'Frontend', 'Backend', 'Open Source'];

const PROJECTS = [
  {
    id: '01',
    title: 'NeuroArt Gen',
    stack: ['Python', 'PyTorch', 'GANs'],
    year: '2023',
    link: '#',
    category: 'AI / ML',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOhI16Za9FyVjmPhEWM9qnapv67Ggd1LU9VaEhMY5kEFpjTujawl6PbALX_mgBhE3WIP1-AjydepykU4IsEll1Kw2mmMuIxXykvkvHoT9ojAnbfNnBaCc1Q1qFFjvy50t5FTv1O2tuhy1OglcChciUE-lmkQX9hZQnw6m8HQzxBMslJ3Cg7enieuvCqosrqKtLkwLHt4YViRCeCm4ZPaCgXnGg749WmPrs5z-NQ2lFWDl-lxKNJBxSPFExk_P45WMFyNutKdaLPiXz'
  },
  {
    id: '02',
    title: 'CryptoDash',
    stack: ['React', 'D3.js', 'WebSockets'],
    year: '2023',
    link: '#',
    category: 'Frontend',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY5ujzxCKoXdIXoBmkfnHZFMRsaL37HcECKLMEkRWZYq3nojiCXSKi565sNMbSR-jcr_BJzlbcIF1_thJs77Z9W_ouzoS9DdZVHX7PP6v6Mm_QE601MbJkCs-lhrJQI9disdWX30eBtUXBZFOwlCzHPtfzUiCdmzwOgEkvUxnQlL7Vo_1kGHRBdxrblbodGOY4qkzAv7Hs-wQ__5tZyDBdXTg8sLa_gskVgn8sDyhpJfqYKvz5kFvB6ggzGabZtZZL5CRwPpQ7Y-H8'
  },
  {
    id: '03',
    title: 'EcoTrack Mobile',
    stack: ['Flutter', 'Firebase'],
    year: '2022',
    link: '#',
    category: 'Frontend',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPt7ESy4LvlUkg8aTNrRz9Jz9F4fErhfUJPUFLmp2AKVMKGDrBMcFQFTLJMztyNZUfkv6TfvK7FiFdw62I53-LneLKm9E0YQJsSTnWJcWh7hNgZqVM0iv32bo_Hbo2xNY-eAYAkGuLSYuB4TqLw7fUY9XyvhNhg7y7VnOxQ6645Zy8ZIAZANqV81DJcPcRHjemdROSKd7uDkATBVVL86-waJ4x8jzPnbONmXzqRqKVvt-fl2CynKR9ZoEL0mj8rXkbzrIPDh4kfXe1'
  },
  {
    id: '04',
    title: 'VoiceAuth SDK',
    stack: ['C++', 'Node.js', 'WASM'],
    year: '2022',
    link: '#',
    category: 'Backend',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCuQcxRI8nxR7YymtnIXlp3S-xDHw7foCUnFdUagyHhhwPi3Fm8KcAofnkPsKr5vJgCeqXl5eM_uiMms3VS2k_c4pfjJKf4PD9yS05nHUw248E_ifFOIJpmZs0n0SL0yHhhckDTO2o-PtNjIONIZImq7gXNcdQlYT1PAYi6Di4Wq_D1zc17714aIBRqNJ0ZGs62D1kRTEdEmrpSSq0VTrEmAAmzm4kDOPccTvevdofErjerssDKjvsb04eCAcowFkNAFY7oANL9cmV0'
  },
  {
    id: '05',
    title: 'Portfoli.io',
    stack: ['Next.js', 'Three.js', 'WebGL'],
    year: '2021',
    link: '#',
    category: 'Open Source',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDneG5mNYvdwQxvPzCfiCUlPC8DlxYVhUSqIhTVwO2SfprRUekkzV4PbI1ZKMNlp_QUBYnuVKULJ32_qdJqNQyYyBp2GIqydiX1JYxcyadvYjnOwEm5CAeB1FvmgX6Spw-vB7kOFJtNMtxG_4hnwJoHGrkv2sQIIEdSgzyUgv__SKDdkOV9_CBXBmjrmYcpkq6cWH6N8bwb8digE4s7skO3zMNnIJbrZsUtQWpxhbscb_DI8FAekQr02VeK_tIVvK-3KWxOf0yeQrIB'
  }
];

export default function Work() {
  const [activeFilter, setActiveFilter] = useState('All Projects');

  const filteredProjects = PROJECTS.filter(project => {
    if (activeFilter === 'All Projects') return true;
    return project.category === activeFilter;
  });

  return (
    <div className="flex flex-col flex-1 px-8 lg:px-24 mb-32 max-w-7xl mx-auto w-full">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-[12vw] md:text-[8vw] leading-[0.85] font-extrabold tracking-tighter text-white mb-16 md:mb-24 uppercase select-none mt-10"
      >
        Work
      </motion.h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-x-8 gap-y-4 mb-16 border-b border-white/10 pb-4">
        {FILTERS.map((filter) => (
          <button 
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`group relative pb-2 text-sm md:text-base font-extrabold uppercase tracking-wider transition-colors ${activeFilter === filter ? 'text-primary' : 'text-white/50 hover:text-white'}`}
          >
            {filter}
            {activeFilter === filter && (
              <motion.span 
                layoutId="filterIndicator"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_rgba(100,255,218,0.8)]" 
              />
            )}
            {activeFilter !== filter && (
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(100,255,218,0.8)]" />
            )}
          </button>
        ))}
      </div>

      {/* Project Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-4 pb-4 text-xs font-medium tracking-widest text-white/50 uppercase">
        <div className="col-span-1">No.</div>
        <div className="col-span-5">Project</div>
        <div className="col-span-4">Stack</div>
        <div className="col-span-1 text-right">Year</div>
        <div className="col-span-1 flex justify-end">Link</div>
      </div>

      {/* Project List */}
      <div className="flex flex-col w-full border-t border-white/10">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative border-b border-white/10 transition-colors hover:bg-white/5"
            >
              <a href={project.link} className="block px-4 py-8 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center relative z-20">
                  <div className="hidden md:block col-span-1 text-white/50 font-mono text-sm">{project.id}</div>
                  
                  <div className="col-span-1 md:col-span-5">
                    <h3 className="text-2xl md:text-4xl font-extrabold text-white group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  
                  <div className="col-span-1 md:col-span-4 flex flex-wrap gap-2 mt-2 md:mt-0">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-extrabold uppercase tracking-wide border border-white/20 rounded-full text-white/70 group-hover:border-primary/50 group-hover:text-primary transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="col-span-1 md:col-span-1 text-white/50 text-sm md:text-right mt-2 md:mt-0">
                    {project.year}
                  </div>
                  
                  <div className="hidden md:flex col-span-1 justify-end">
                    <span className="text-white/50 group-hover:text-primary group-hover:-rotate-45 transition-transform duration-300 text-2xl leading-none">
                      →
                    </span>
                  </div>
                </div>
              </a>
              
              {/* Hover Image */}
              <div 
                className="hidden lg:block opacity-0 group-hover:opacity-100 pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 w-[280px] h-[180px] bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl transition-all duration-300 z-10 rotate-3 group-hover:rotate-0"
              >
                <div 
                  className="w-full h-full bg-cover bg-center" 
                  style={{ backgroundImage: `url(${project.image})` }} 
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-20 flex justify-center">
        <button className="flex items-center gap-2 text-white/50 hover:text-primary transition-colors uppercase tracking-widest text-sm font-extrabold">
          <span>+</span>
          Load More Projects
        </button>
      </div>
    </div>
  );
}
