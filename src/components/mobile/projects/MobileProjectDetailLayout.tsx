"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { FaCaretRight } from "react-icons/fa";
import { MobileRouteHeader } from "../MobileRouteHeader";
import { ProjectWithImages } from "@/app/projects/ProjectsPageClient";
import { ImageGallery } from "@/components/projects/ImageGallery";
import { MobileContactCard } from "@/components/mobile/contact/MobileContactCard";
import { MobileBackground } from "@/components/mobile/MobileBackground";

interface MobileProjectDetailLayoutProps {
  project: ProjectWithImages;
}

export function MobileProjectDetailLayout({ project }: MobileProjectDetailLayoutProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      // Ensure the detail page starts at the top
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col pb-[calc(env(safe-area-inset-bottom)+50px)] relative z-10">
      <MobileBackground />
      {/* Route Header */}
      <MobileRouteHeader title="PROJECTS" showBackButton={true} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex-1 flex flex-col px-5 pt-4 pb-8 relative z-10"
      >
        {/* Project Hero Image */}
        <div className={`relative ${project.logo && project.logo.trim().length > 0 ? "mb-10" : "mb-6"}`}>
          <ImageGallery
            images={project.imageUrls || []}
            imageAlt={project.imageAlt || project.name}
            projectId={project.id}
            className="aspect-[16/10] rounded-md border-white/5"
          />

          {project.logo && project.logo.trim().length > 0 && (
            <div className="absolute -bottom-9 left-4 z-30 w-16 h-16 rounded-md  border border-white/10 bg-background backdrop-blur-md  flex items-center justify-center p-3 shadow-xl">
              {project.logo.startsWith('http') || project.logo.startsWith('/') || project.logo.includes('.') ? (
                <div className="relative w-full h-full">
                  <Image 
                    src={project.logo} 
                    alt={project.logoAlt || `${project.name} logo`}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
              ) : (
                <span className="text-[10px] font-bold text-foreground text-center uppercase tracking-wider line-clamp-2 leading-tight">
                  {project.logo}
                </span>
              )}
            </div>
          )}
        </div>


        <div className="flex justify-between items-start gap-6">
          <div className="flex-1">
            {/* Project Title */}
            <h1 className="text-3xl scale-y-[1.1] font-bold text-foreground mb-4 leading-snug">
              {project.name}
            </h1>

            {/* Project Discription Section */}
            <div className="mb-4">
              <p className="text-md font-light text-foreground-secondary/80 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>


          <Link
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 active:scale-95 transition-all mt-0.5 hover:bg-white/10"
          >
            <ArrowUpRight size={18} className="text-foreground transition-colors group-hover:text-accent" />
          </Link>
        </div>

        {/* Project Tags Section */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-full border border-white/10 transition-colors duration-300 bg-foreground-secondary/10 px-3 py-1.5 text-[clamp(0.75rem,1vw,0.85rem)] font-extralight text-foreground-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] backdrop-blur-[2px] cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Project Links Section */}
        <div className="flex flex-col gap-3 mb-10">
          {/* GitHub Repository Button */}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full flex items-center justify-between p-4 rounded-xl border border-white/10   bg-transparent shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] backdrop-blur-[2px]"
            >
              <div className="flex items-center gap-3">
                <Github size={18} className="text-foreground-secondary group-active:text-foreground transition-colors" />
                <span className="text-sm font-medium tracking-wide uppercase text-foreground-secondary group-active:text-foreground transition-colors">
                  GITHUB REPOSITORY
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white/10 group-active:scale-95 transition-transform">
                <ArrowUpRight size={16} className="text-foreground-secondary group-active:text-foreground transition-colors" />
              </div>
            </a>
          )}
        </div>

        {/* Core Project Overview section */}
        {((project.problem && project.problem.length > 0) || (project.solution && project.solution.length > 0)) && (
          <div className="flex flex-col gap-8 mb-10">
            {project.problem && project.problem.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-base font-semibold tracking-wide text-foreground mb-3">
                  The Problem
                </h3>
                <ul className="text-md font-light text-foreground-secondary/80 leading-relaxed space-y-3 list-disc pl-5">
                  {project.problem.map((point, idx) => (
                    <li key={idx} className="pl-1">{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {project.solution && project.solution.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-base font-semibold tracking-wide text-foreground mb-3">
                  {String(project.id) === "4" ? "Overview" : "The Solution"}
                </h3>
                <ul className="text-md font-light text-foreground-secondary/80 leading-relaxed space-y-3 list-disc pl-5">
                  {project.solution.map((point, idx) => (
                    <li key={idx} className="pl-1">{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tech Stack */}
        {project.techStack && Object.keys(project.techStack).length > 0 && (
          <div className="flex flex-col gap-2 mb-10">
            <h3 className="text-base font-semibold tracking-wide text-foreground mb-3">
              Tech Stack Used
            </h3>
            {Object.entries(project.techStack).map(([category, technologies]) => {
              const isExpanded = expandedCategory === category;
              return (
                <div key={category} className="flex flex-col border border-white/10 rounded-xl bg-transparent overflow-hidden">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="flex items-center gap-3 px-4 py-3.5 w-full text-left active:bg-white/5 transition-colors focus:outline-none"
                  >
                    <motion.span 
                      animate={{ rotate: isExpanded ? 90 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="text-foreground-secondary w-4 flex justify-center items-center origin-center"
                    >
                      <FaCaretRight />
                    </motion.span>
                    <span className="text-sm font-medium tracking-wide uppercase text-foreground-secondary">
                      {category}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pr-4 pb-4 pl-11">
                      {technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-full border border-white/10 transition-colors duration-300 bg-foreground-secondary/10 px-3 py-1.5 text-[clamp(0.75rem,1vw,0.85rem)] font-extralight text-foreground-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] backdrop-blur-[2px] cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}

      </motion.div>

      {/* Contact CTA Section */}
      <MobileContactCard />
    </div>
  );
}
