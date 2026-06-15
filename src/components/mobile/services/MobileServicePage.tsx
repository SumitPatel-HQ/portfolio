"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CARDS } from "@/data/what-I-build";
import { MobileRouteHeader } from "../MobileRouteHeader";
import { ServiceGraphic } from "@/components/ui/ServiceGraphic";

import { MobileBackground } from "@/components/mobile/MobileBackground";

interface MobileServicePageProps {
  hideHeader?: boolean;
}

export function MobileServicePage({ hideHeader }: MobileServicePageProps = {}) {
  return (
    <div className="min-h-screen bg-background relative z-10">
      <MobileBackground />
      {!hideHeader && <MobileRouteHeader title="SERVICES" />}

      <div className="flex flex-col w-full pb-28 relative z-10">
        {CARDS.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="block group relative w-full pt-4 pb-6 border-b border-white/20 last:border-b-0 "
          >
            <div className="px-4 mb-4  ">
              <div className="aspect-[16/10] overflow-hidden flex items-center justify-center pointer-events-none slide-screenshot">
                <ServiceGraphic id={card.case} />
              </div>
            </div>

            {/* Service Content */}
            <div className="px-4 flex flex-col items-start gap-4">
              <h2 className="text-2xl scale-y-[1.1] font-bold text-foreground mb-1 leading-snug">{card.title}</h2>

              <ul className="space-y-3 mt-1 w-full">
                {card.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3 text-md font-light text-foreground-secondary/70 leading-relaxed">
                    <Check className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Tags Section */}
              {card.tags && card.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {card.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-full border border-white/10 transition-colors duration-300 bg-foreground-secondary/10 px-3 py-1.5 text-[clamp(0.75rem,1vw,0.85rem)] font-extralight text-foreground-secondary shadow-[0_4px_12px_0_rgba(0,0,0,0.2)] backdrop-blur-[2px] cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
