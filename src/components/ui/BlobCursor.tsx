"use client";

import React, { useEffect, useState, RefObject } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface BlobCursorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetRef: RefObject<any>;
  onClick?: (e: MouseEvent) => void;
  icon?: LucideIcon;
}

export function BlobCursor({ targetRef, onClick, icon: Icon = ArrowUpRight }: BlobCursorProps) {
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Inject a global style to force no-cursor on target and all its descendants
    const styleId = "blob-cursor-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
        .hide-default-cursor, .hide-default-cursor * {
          cursor: none !important;
        }
        .hide-default-cursor .show-default-cursor, 
        .hide-default-cursor .show-default-cursor * {
          cursor: auto !important;
        }
        .hide-default-cursor .mouse-pointer,
        .hide-default-cursor .mouse-pointer * {
          cursor: pointer !important;
        }
      `;
      document.head.appendChild(style);
    }

    target.classList.add("hide-default-cursor");

    const handleMouseMove = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      if (targetElement.closest(".show-default-cursor")) {
        setIsVisible(false);
        return;
      }
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    target.addEventListener("mousemove", handleMouseMove);
    target.addEventListener("mouseenter", handleMouseEnter);
    target.addEventListener("mouseleave", handleMouseLeave);

    if (onClick) {
      target.addEventListener("click", onClick);
    }

    // Check if mouse is already inside the container when mounted
    if (target.matches && target.matches(":hover")) {
      setIsVisible(true);
    }

    return () => {
      target.classList.remove("hide-default-cursor");
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseenter", handleMouseEnter);
      target.removeEventListener("mouseleave", handleMouseLeave);
      if (onClick) {
        target.removeEventListener("click", onClick);
      }
    };
  }, [targetRef, cursorX, cursorY, onClick]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-[76px] w-[76px] items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Background Blob - Glassmorphism */}
      <div className="absolute inset-0 rounded-full  bg-foreground-secondary/12 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] backdrop-blur-[1.9px]" />

      {/* Sharp Icon */}
      <Icon className="relative z-10 h-8 w-8 text-white stroke-[1px]" />
    </motion.div>
  );
}
