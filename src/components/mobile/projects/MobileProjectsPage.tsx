"use client";

import { useState, useEffect } from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ProjectWithImages } from "@/app/projects/ProjectsPageClient";
import { MobileRouteHeader } from "../MobileRouteHeader";
import { ImageGallery } from "@/components/projects/ImageGallery";

import { MobileBackground } from "@/components/mobile/MobileBackground";

interface MobileProjectsPageProps {
  projects: ProjectWithImages[];
}

function ExpandableDescription({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 90;

  if (text.length <= maxLength) {
    return <p className="text-md font-light text-foreground-secondary/70 leading-relaxed">{text}</p>;
  }

  return (
    <p className="text-md font-light text-foreground-secondary/70 leading-relaxed">
      {isExpanded ? (
        <>
          {text}
        </>
      ) : (
        <>
          {text.substring(0, maxLength).trim()}{" "}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsExpanded(true); }}
            className="text-foreground-secondary/60 bg-transparent  font-base"
          >
            ...more
          </button>
        </>
      )}
    </p>
  );
}

export function MobileProjectsPage({ projects }: MobileProjectsPageProps) {
  useEffect(() => {
    // Only apply on mobile layout
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      const savedScroll = sessionStorage.getItem("mobileProjectsScroll");
      if (savedScroll !== null) {
        // Restore scroll position cleanly
        requestAnimationFrame(() => {
          window.scrollTo(0, parseInt(savedScroll, 10));
          // Clear the saved position so it only applies when returning from a detail view
          sessionStorage.removeItem("mobileProjectsScroll");
        });
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background relative z-10">
      <MobileBackground />
      <MobileRouteHeader title="PROJECTS" />

      <div className="flex flex-col w-full pb-28 relative z-10">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="block group relative w-full pt-4 pb-6 border-b border-white/20 last:border-b-0"
          >
            <div className="px-4 mb-4">
                <ImageGallery
                  images={project.imageUrls || []}
                  imageAlt={project.imageAlt || project.name}
                  projectId={project.id}
                  className="aspect-[16/10] rounded-xl border-white/5"
                />
            </div>

            {/* Project Content */}
            <div className="px-4 flex justify-between items-start gap-6">
              <div className="flex-1 pr-2">
              
                  <h2 className="text-2xl scale-y-[1.1] font-bold text-foreground mb-1 leading-snug">{project.name}</h2>
              
                <ExpandableDescription text={project.description} />
              </div>

              {/* ArrowUpRight action indicator */}
              <Link
                href={`/projects/${project.name.toLowerCase()}`}
                scroll={false}
                onClick={() => {
                  if (typeof window !== "undefined" && window.innerWidth <= 768) {
                    sessionStorage.setItem("mobileProjectsScroll", window.scrollY.toString());
                  }
                }}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 active:scale-95 transition-all mt-0.5 hover:bg-white/10"
              >
                <ArrowUpRight size={18} className="text-foreground transition-colors group-hover:text-accent" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


