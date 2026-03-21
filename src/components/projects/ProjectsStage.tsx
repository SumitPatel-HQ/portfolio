"use client";

import { AnimatePresence, motion } from "framer-motion";

type ProjectsStageProps = {
  imageUrl: string;
  imageAlt: string;
  textureUrl: string;
};

export function ProjectsStage({ imageUrl, imageAlt, textureUrl }: ProjectsStageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={imageUrl}
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0.12, scale: 1.02 }}
          animate={{ opacity: 0.36, scale: 1 }}
          exit={{ opacity: 0.12, scale: 0.99 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </AnimatePresence>
      <div className="projects-vignette absolute inset-0" />
      <div
        className="absolute inset-0 mix-blend-hard-light opacity-[0.2]"
        style={{ backgroundImage: `url("${textureUrl}")`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
    </div>
  );
}

