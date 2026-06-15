"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AboutMe } from "@/data/aboutmyself.data";
import { useIntro } from "@/context/IntroContext";
import LogoLoop, { LogoItem } from "@/components/ui/LogoRail";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiDocker, SiPython, SiFastapi, SiVercel, SiGit, SiGithub, SiSupabase, SiGooglecloud, SiN8N } from 'react-icons/si';

const highlights = [
  { label: "Projects Shipped", value: `${AboutMe.ProjectNum}+` },
  { label: "Education", value: `${AboutMe.EducationShort}` },
];

const techLogos = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiPython />, title: "Python" },
  { node: <SiFastapi />, title: "FastAPI" },
  { node: <SiVercel />, title: "Vercel" },
  { node: <SiGit />, title: "Git" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiSupabase />, title: "Supabase" },
  { node: <SiGooglecloud />, title: "Google Cloud" },
  { node: <SiN8N />, title: "n8n" },
];

export function MobileOverview() {
  const { isIntroComplete } = useIntro();
  const [isInitialMount] = useState(!isIntroComplete);
  const baseDelay = isInitialMount ? 2.4 : 0;

  const [activeLogo, setActiveLogo] = useState<string | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (activeLogo && railRef.current && !railRef.current.contains(e.target as Node)) {
        setActiveLogo(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [activeLogo]);

  const renderMovingLogoItem = useCallback((item: LogoItem, key: React.Key) => (
    <motion.div
      key={key}
      onTap={() => {
        setActiveLogo(prev => prev === item.title ? null : (item.title || null));
      }}
      animate={{
        opacity: activeLogo === item.title ? 1 : (activeLogo ? 0.3 : 0.7),
        scale: activeLogo === item.title ? 1.2 : 1,
      }}
      className="group relative h-8 w-8 flex items-center justify-center text-white cursor-pointer"
    >
      <div className="relative z-10 text-2xl">
        {'node' in item ? item.node : null}
      </div>
    </motion.div>
  ), [activeLogo]);

  return (
    // currently
    <div className="flex flex-col">
      <section className="px-5 pt-2 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-md font-bold tracking-[0.2em] uppercase text-accent">Currently</h2>
          <div className="flex-1 h-[2px] rounded-full bg-white/10"></div>
        </div>
        
        <div className="flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: baseDelay }}
            className="flex flex-row flex-wrap items-baseline gap-x-3 gap-y-1"
          >
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-muted">Building :-</span>
            <span className="text-foreground-secondary/80 font-base text-base">{AboutMe.Buidling}</span>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: baseDelay + 0.1 }}
            className="flex flex-row flex-wrap items-baseline gap-x-3 gap-y-1"
          >
            <span className="text-sm font-bold tracking-[0.15em] uppercase text-muted">Exploring :-</span>
            <span className="text-foreground-secondary/80 font-base text-base">{AboutMe.Exploring}</span>
          </motion.div>
        </div>
      </section>

      

      <section className="px-5 py-6">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-md font-bold tracking-[0.2em] uppercase text-accent">Highlights</h2>
          <div className="flex-1 h-[2px] rounded-full bg-white/10"></div>
        </div>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          {highlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: baseDelay + idx * 0.1 }}
              className="flex flex-col gap-1"
            >
              <span className="text-sm font-medium text-[#A0A0A0] leading-tight">{item.label}</span>
              <span className="text-2xl font-bold tracking-light text-foreground">{item.value}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: baseDelay + 0.2 }}
          className="flex flex-col gap-y-3 w-full"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium leading-tighter text-[#A0A0A0]">Core Technologies</span>
            {activeLogo && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xs font-bold text-accent"
              >
                — {activeLogo}
              </motion.span>
            )}
          </div>
          <div ref={railRef} className="w-full overflow-hidden py-4">
            <LogoLoop
              logos={techLogos}
              speed={activeLogo ? 0 : 40}
              gap={30}
              logoHeight={32}
              fadeOut={true}
              fadeOutColor="var(--background)"
              renderItem={renderMovingLogoItem}
              pauseOnHover={false}
            />
          </div>
        </motion.div>
      </div>
    </section>
    </div>
  );
}
