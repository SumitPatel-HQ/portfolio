"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function MobileContactCard() {
  return (
    <section className="flex flex-col px-5 pt-12 pb-4 mt-auto">
      <div className="w-full h-[1px] bg-white/10 mb-10"></div>
      
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <h2 className="text-md font-bold tracking-[0.2em] uppercase text-accent">
            Got a project in mind?
          </h2>
          <h3 className="text-4xl font-bold text-foreground leading-tight">
            Let&apos;s talk.
          </h3>
          <p className="text-base text-foreground-secondary leading-relaxed">
            Whether you&apos;re building an AI product, automation workflow, or web platform, I&apos;d love to hear about it.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="pt-2"
        >
          <Link
            href="/contact"
            className="group flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-accent/20 border border-white/20 text-background font-bold tracking-wide uppercase text-sm active:scale-[0.98] transition-transform"
          >
            Contact Now
            <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center group-active:scale-95 transition-transform">
              <ArrowUpRight size={24} className="text-foreground-secondary group-active:text-foreground transition-colors" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
