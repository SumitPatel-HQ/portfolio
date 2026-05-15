"use client";

import React, { RefObject, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, LucideIcon } from "lucide-react";

const BLOB_CURSOR_STYLE_ID = "blob-cursor-style";
const blobCursorStyleOwners = new Set<symbol>();

function acquireBlobCursorStyle() {
  const owner = Symbol("blobCursorStyleOwner");
  blobCursorStyleOwners.add(owner);

  if (!document.getElementById(BLOB_CURSOR_STYLE_ID)) {
    const style = document.createElement("style");
    style.id = BLOB_CURSOR_STYLE_ID;
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

  return owner;
}

function releaseBlobCursorStyle(owner: symbol) {
  if (!blobCursorStyleOwners.delete(owner) || blobCursorStyleOwners.size > 0) {
    return;
  }

  document.getElementById(BLOB_CURSOR_STYLE_ID)?.remove();
}

interface BlobCursorProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  targetRef: RefObject<any>;
  onClick?: (e: MouseEvent) => void;
  icon?: LucideIcon;
  iconColor?: string;
  restrictToTags?: string[];
}

export function BlobCursor({ 
  targetRef, 
  onClick, 
  icon: Icon = ArrowUpRight,
  iconColor = "text-white",
  restrictToTags
}: BlobCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const onClickRef = useRef(onClick);
  const restrictToTagsRef = useRef(restrictToTags);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const hasPosition = useRef(false);
  const isFirstMove = useRef(true);

  useEffect(() => {
    onClickRef.current = onClick;
  }, [onClick]);

  useEffect(() => {
    restrictToTagsRef.current = restrictToTags;
  }, [restrictToTags]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;
    const styleOwner = acquireBlobCursorStyle();
    let visibilityFrame: number | null = null;

    const cancelVisibilityFrame = () => {
      if (visibilityFrame === null) {
        return;
      }

      cancelAnimationFrame(visibilityFrame);
      visibilityFrame = null;
    };

    const handleMouseLeave = () => {
      cancelVisibilityFrame();
      setIsVisible(false);
      target.classList.remove("hide-default-cursor");
    };

    const handleMouseMove = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;
      
      if (targetElement.closest(".show-default-cursor")) {
        cancelVisibilityFrame();
        setIsVisible(false);
        target.classList.remove("hide-default-cursor");
        return;
      }

      // If restrictToTags is provided, only show when hovering over those tags
      // Otherwise, show it for the whole target container
      const tagRestrictions = restrictToTagsRef.current;
      const shouldShow = tagRestrictions 
        ? tagRestrictions.some(tag => !!targetElement.closest(tag))
        : true;

      // Update position first
      if (isFirstMove.current) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        // Jump the spring to the first position to avoid animation from (-100, -100)
        cursorXSpring.set(e.clientX);
        cursorYSpring.set(e.clientY);
        isFirstMove.current = false;
        hasPosition.current = true;
      } else {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }

      setIsVisible(shouldShow && hasPosition.current);
      
      if (shouldShow) {
        target.classList.add("hide-default-cursor");
      } else {
        cancelVisibilityFrame();
        target.classList.remove("hide-default-cursor");
      }
    };

    const handleClick = (e: MouseEvent) => {
      const currentOnClick = onClickRef.current;
      if (!currentOnClick) return;
      
      const targetElement = e.target as HTMLElement;
      const tagRestrictions = restrictToTagsRef.current;
      const shouldTrigger = tagRestrictions 
        ? tagRestrictions.some(tag => !!targetElement.closest(tag))
        : true;
        
      if (shouldTrigger) {
        currentOnClick(e);
      }
    };

    target.addEventListener("mousemove", handleMouseMove);
    target.addEventListener("mouseleave", handleMouseLeave);
    target.addEventListener("click", handleClick);

    // Capture initial position from window to avoid jump if already hovering
    const handleInitialWindowMove = (e: MouseEvent) => {
      if (isFirstMove.current) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        cursorXSpring.set(e.clientX);
        cursorYSpring.set(e.clientY);
        isFirstMove.current = false;
        hasPosition.current = true;
      }
      window.removeEventListener("mousemove", handleInitialWindowMove);
    };
    window.addEventListener("mousemove", handleInitialWindowMove);

    // Initial check (optional, but good for refresh)
    if (target.matches && target.matches(":hover") && !restrictToTagsRef.current) {
      visibilityFrame = requestAnimationFrame(() => {
        visibilityFrame = null;
        setIsVisible(true);
      });
    }

    return () => {
      cancelVisibilityFrame();
      target.classList.remove("hide-default-cursor");
      target.removeEventListener("mousemove", handleMouseMove);
      target.removeEventListener("mouseleave", handleMouseLeave);
      target.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleInitialWindowMove);
      releaseBlobCursorStyle(styleOwner);
    };
  }, [targetRef, cursorX, cursorY, cursorXSpring, cursorYSpring]);

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
      <Icon className={`relative z-10 h-8 w-8 stroke-[1px] ${iconColor}`} />
    </motion.div>
  );
}
