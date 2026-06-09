"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/data/projects.data";
import { getProjectImageUrl } from "@/lib/imagekit";
import { CARDS } from "@/data/what-I-build";
import { ServiceGraphic } from "@/components/ui/ServiceGraphic";
import { MobileContactCard } from "@/components/mobile/contact/MobileContactCard";

export function MobileShowcase() {
  const featured = PROJECTS.slice(0, 2);
  const services = CARDS.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col">
      {/* Featured Work Section */}
      <section className="px-5 pt-6 pb-2">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-md font-bold tracking-[0.2em] uppercase text-accent">Featured Work</h2>
          <div className="flex-1 h-[2px] rounded-full bg-white/10"></div>
        </div>

        <div className="flex overflow-x-auto gap-4 -mx-5 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {featured.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex-none w-[95vw] max-w-[440px] block relative pt-2 [-webkit-user-drag:none]"
            >
              <div className="mb-4">
                <Image
                  src={getProjectImageUrl(`${project.imageFolder}/${project.previewImage}`)}
                  alt={project.imageAlt || project.name}
                  width={800}
                  height={500}
                  className="aspect-[16/10] w-full h-auto rounded-xl object-cover border border-white/5"
                />
              </div>

              {/* Project Content */}
              <div className="flex justify-between items-center gap-6">
                <div className="flex-1 pr-2">
                  <h2 className="text-2xl scale-y-[1.1] font-bold text-foreground leading-snug">
                    {project.name}
                  </h2>
                </div>

                {/* ArrowUpRight action indicator */}
                <Link
                  href={`/projects/${project.name.toLowerCase()}`}
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0 active:scale-95 transition-all hover:bg-white/10"
                >
                  <ArrowUpRight size={18} className="text-foreground transition-colors group-hover:text-accent" />
                </Link>
              </div>
            </motion.div>
          ))}

          <div className="flex-none w-[40vw] max-w-[160px] flex items-center justify-center pt-2 pr-5">
            <Link 
              href="/projects"
              className="flex flex-col items-center justify-center gap-3 text-foreground-secondary hover:text-accent transition-colors mb-14"
            >
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center active:scale-95 transition-transform">
                <ArrowUpRight size={24} />
              </div>
              <span className="text-xs font-semibold tracking-[0.1em] uppercase text-center">Show More</span>
            </Link>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="px-5 pt-6 pb-2">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-md font-bold tracking-[0.2em] uppercase text-accent">What I Do</h2>
          <div className="flex-1 h-[2px] rounded-full bg-white/10"></div>
        </div>

        <div className="flex overflow-x-auto gap-4 -mx-5 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {services.map((service, idx) => (
            <div 
              key={service.id} 
              className="flex-none w-[95vw] max-w-[440px] block group relative pt-2"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="mb-4 aspect-[16/10] overflow-hidden flex items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] pointer-events-none slide-screenshot relative">
                  <ServiceGraphic id={service.case} />
                </div>

                {/* Service Content */}
                <div className="flex justify-between items-center gap-6">
                  <div className="flex-1 pr-2">
                    <h2 className="text-2xl scale-y-[1.1] font-bold text-foreground leading-snug transition-colors">
                      {service.title}
                    </h2>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}

          <div className="flex-none w-[40vw] max-w-[160px] flex items-center justify-center pt-2 pr-5">
            <Link 
              href="/services"
              className="flex flex-col items-center justify-center gap-3 text-foreground-secondary hover:text-accent transition-colors mb-14"
            >
              <div className="w-14 h-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center active:scale-95 transition-transform">
                <ArrowUpRight size={24} />
              </div>
              <span className="text-xs font-semibold tracking-[0.1em] uppercase text-center">Show More</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <MobileContactCard />
    </div>
  );
}
