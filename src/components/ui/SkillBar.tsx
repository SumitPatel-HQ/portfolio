import React from 'react';
import { motion } from 'framer-motion';

interface SkillBarProps {
  name: string;
  percentage: number;
  tools: string;
}

export function SkillBar({ name, percentage, tools }: SkillBarProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-end mb-2">
        <span className="text-xl font-semibold text-white">{name}</span>
        <span className="text-primary font-mono text-sm">{percentage}%</span>
      </div>
      <div className="w-full bg-white/10 h-[1px] relative overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-0 left-0 bg-primary h-[1px] shadow-[0_0_10px_rgba(100,255,218,0.5)]"
        />
      </div>
      <p className="mt-2 text-sm text-white/50">{tools}</p>
    </div>
  );
}
