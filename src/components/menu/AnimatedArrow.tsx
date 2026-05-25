"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowTopRightIcon } from "@radix-ui/react-icons"

interface AnimatedArrowProps {
  isHovered: boolean;
  className?: string;
}

/**
 * High-End Product Motion Component
 * 
 * Motion Philosophy & Refinements:
 * - Invisible Sophistication: Travel distance reduced to a perceptual minimum (1.5px delta). The motion feels like an inevitable state shift, not a forced animation.
 * - Organic Asymmetry: Entry uses a decisive, physical deceleration [0.22, 1, 0.36, 1]. Exit uses a quiet, slightly faster ease-in. This non-uniformity feels human.
 * - Pre-Motion Tension: The idle state holds an imperceptible scale compression (0.95). Hovering releases this tension for subconscious responsiveness.
 * - Temporal Layering: Translation resolves first (0.5s), while volumetric expansion (scale) settles fractionally later (0.65s).
 * - Perceptual Softness: Subpixel optical alignment combined with staggered opacity timings ensures fluid, grounded transitions.
 */
export const AnimatedArrow: React.FC<AnimatedArrowProps> = ({
  isHovered,
  className = "",
}) => {
  return (
    <motion.span
      className={`inline-flex items-center justify-center text-[0.7em] ${className}`}
      initial={false}
      animate={isHovered ? "hover" : "idle"}
    >
      <motion.span
        className="relative flex items-center justify-center"
        variants={{
          idle: {
            y: 2, 
            x: -2,
            opacity: 0,
            scale: 0.95, // Imperceptible pre-motion tension
            transition: {
              // Exit choreography: Quieter and faster than entry
              duration: 0.35,
              ease: [0.4, 0, 1, 1], // Organic ease-in
              opacity: {
                duration: 0.25,
                ease: "linear",
              }
            }
          },
          hover: {
            y: 0.5, // Preserved optical subpixel balance for top-right heavy icon
            x: -0.5,
            opacity: 1,
            scale: 1, // Tension release
            transition: {
              // Entry choreography: Fast initial intent with an ultra-soft settling tail
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1], // Asymmetric physical deceleration
              opacity: {
                duration: 0.3,
                ease: "linear",
              },
              scale: {
                // Temporal layering: Volume expansion settles fractionally after translation
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
              }
            }
          },
        }}
      >
        <ArrowTopRightIcon className="size-[1em]" />
      </motion.span>
    </motion.span>
  );
};
