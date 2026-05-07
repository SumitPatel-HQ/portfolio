import React from 'react';

interface SkillPillProps {
  skill: string;
}

export function SkillPill({ skill }: SkillPillProps) {
  return (
    <span className="px-4 py-2 rounded-full border border-white/20 text-sm font-medium hover:bg-primary/10 hover:border-primary hover:text-primary transition-colors cursor-default">
      {skill}
    </span>
  );
}
