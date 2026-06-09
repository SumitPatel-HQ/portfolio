"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { AboutMe } from "@/data/aboutmyself.data";
import { socials } from "@/data/socialLinks";
import { useIntro } from "@/context/IntroContext";
import { useState } from "react";

export function MobileHero() {
  const { isIntroComplete } = useIntro();
  const [isInitialMount] = useState(!isIntroComplete);

  // Delay the animation until the intro overlay starts to fade out
  const baseDelay = isInitialMount ? 2.4 : 0.1;

  return (
    <section className="relative pt-4 pb-8">
      {/* Curved background card inspired by reference */}
      <motion.div 
        initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: baseDelay, ease: [0.25, 1, 0.5, 1] }}
        className="relative mx-3 bg-background-secondary rounded-[2rem] p-6 pb-20 overflow-hidden border border-white/5"
      >
        {/* Abstract shapes in background */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full" />
        <div className="absolute top-1/2 left-0 w-24 h-24 bg-accent/5 rounded-tr-full" />
        
        <div className="flex justify-between items-center mb-8 relative z-10 text-xs font-medium tracking-[0.2em] text-muted">
          <span className="text-accent/80">SUMIT PATEL</span>
          <span>{AboutMe.tag}</span>
        </div>
      </motion.div>

      {/* Profile Info Overlaying the background */}
      <motion.div 
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: baseDelay + 0.2, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10 px-5 -mt-16"
      >
        <div className="relative w-32 h-32 rounded-full border-[4px] border-background overflow-hidden mb-6 bg-background-secondary shadow-xl">
          <Image 
            src={AboutMe.image} 
            alt="Sumit Patel" 
            fill 
            sizes="256px"
            quality={100}
            className="object-cover scale-[1.5] origin-[50%_25%]"
            priority
          />
        </div>

        <div className="mb-4">
          <p className="text-accent italic text-lg mb-1 font-serif">Hi, I&apos;m</p>
          <h1 className="text-5xl font-bold scale-y-[1.1] tracking-tighter mb-4 text-foreground">
            {AboutMe.Name}
          </h1>
          <p className="text-foreground-secondary leading-relaxed text-base">
            {AboutMe.headLine2}
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {socials.filter(s => ["GitHub", "LinkedIn", "Email"].includes(s.label)).map((social) => {
            const Icon = social.icon;
            const isExternal = social.href.startsWith("http");
            return (
              <Link
                key={social.id}
                href={social.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-label={social.ariaLabel}
                className="flex items-center justify-center w-13 h-13 rounded-full  border border-white/10 hover:bg-white/5 transition-colors"
              >
                <Icon className="w-6 h-6 text-foreground-secondary/80" />
              </Link>
            );
          })}
          
          <a
            href="/Sumit_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Resume"
            className="flex items-center justify-center w-13 h-13 rounded-full  border border-white/10  hover:bg-white/5 transition-colors"
          >
            <FileText className="w-6 h-6 text-foreground-secondary/80" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
