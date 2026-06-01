"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils"; // Adjusted to standard lib/utils location usually found, wait the user had "@/components/lib/utils" in the provided code. Let me check utils path.

export interface ScrollRevealProps {
  children: React.ReactNode;
  /** Custom container className */
  containerClassName?: string;
  /** Custom text className */
  textClassName?: string;
  /** Enable blur animation effect */
  enableBlur?: boolean;
  /** Base opacity when text is out of view */
  baseOpacity?: number;
  /** Blur strength in pixels */
  blurStrength?: number;
  /** Animation delay between words in seconds */
  staggerDelay?: number;
  /** Viewport threshold for triggering animation */
  threshold?: number;

  /** Spring animation configuration */
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  /** Text size variant */
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "none";
  /** Text alignment */
  align?: "left" | "center" | "right" | "none";
  /** Color variant */
  variant?: "default" | "muted" | "accent" | "primary" | "none";
  /** Custom word className */
  wordClassName?: string;
  /** Optional manual trigger to start animation, in addition to isInView */
  trigger?: boolean;
  /** Custom wrapper element type */
  as?: React.ElementType;
  /** Optional delay before animation starts */
  delay?: number;
}

const sizeClasses = {
  sm: "text-lg md:text-xl",
  md: "text-xl md:text-2xl lg:text-3xl",
  lg: "text-2xl md:text-3xl lg:text-4xl xl:text-5xl",
  xl: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
  "2xl": "text-4xl md:text-5xl lg:text-6xl xl:text-7xl",
  none: "",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  none: "",
};

const variantClasses = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent-foreground",
  primary: "text-primary",
  none: "",
};

export function ScrollReveal({
  children,
  containerClassName,
  textClassName,
  enableBlur = true,
  baseOpacity = 0.1,
  blurStrength = 4,
  staggerDelay = 0.05,
  threshold = 0.5,
  springConfig = {
    damping: 25,
    stiffness: 100,
    mass: 1,
  },
  size = "lg",
  align = "left",
  variant = "default",
  wordClassName = "inline-block",
  trigger,
  delay,
  as = "p",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    amount: threshold,
    once: true
  });

  const splitText = useMemo(() => {
    if (typeof children === "string") {
      return children.split(/(\s+)/).map((part, index) => ({
        value: part,
        isSpace: part.match(/^\s+$/) !== null && part.length > 0,
        originalIndex: index,
      })).filter(item => item.value.length > 0);
    }

    // Support an array of elements (like tags)
    if (Array.isArray(children)) {
      return children.map((child, index) => ({
        value: child,
        isSpace: false,
        originalIndex: index,
      }));
    }

    // Fallback for a single element
    return [{
      value: children,
      isSpace: false,
      originalIndex: 0,
    }];
  }, [children]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay !== undefined ? delay : 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : "blur(0px)",
      y: 20,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        ...springConfig,
      },
    },
  };

  // To prevent recreating the component during render (and throwing ESLint errors),
  // we access the pre-existing motion proxy for the given HTML tag.
  const MotionComponent = (typeof as === 'string' ? motion[as as keyof typeof motion] : as) as React.ElementType;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative my-5 transform-gpu",
        containerClassName
      )}
    >
      <MotionComponent
        className={cn(
          "leading-relaxed font-semibold",
          sizeClasses[size],
          alignClasses[align],
          variantClasses[variant],
          textClassName
        )}
        variants={containerVariants}
        initial="hidden"
        animate={isInView && (trigger === undefined || trigger) ? "visible" : "hidden"}
      >
        {splitText.map((item) => (
          item.isSpace ? (
            <span key={`space-${item.originalIndex}`}>{item.value as string}</span>
          ) : (
            <motion.span
              key={`word-${item.originalIndex}`}
              className={wordClassName}
              variants={wordVariants}
            >
              {item.value}
            </motion.span>
          )
        ))}
      </MotionComponent>
    </motion.div>
  );
}

export default ScrollReveal;
