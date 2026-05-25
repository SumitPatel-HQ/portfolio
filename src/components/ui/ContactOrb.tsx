"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

import { useContactModal } from "@/context/ContactModalContext";

import { TextureOverlay } from "@/components/ui/visuals/TextureOverlay";

// ─── PHYSICS CONSTANTS ────────────────────────────────────────────────────────
// Viscous, heavy, suspended liquid motion
const PHYSICS = {
  ease: "sine.inOut",
  followEase: "power2.out", // Slower, heavier
  settleEase: "power3.out", // More inertial

  // Slowed down for viscous feel
  membrane: 18, // Membrane breathing
  drift: 26, // Positional drift
  current: 32, // Internal currents
  glow: 22, // Glow pulse

  cursorFollow: 2.2, // Slower response
  cursorSettle: 3.4, // Heavier settle
} as const;

// ─── MEMBRANE SHAPE SYSTEM ───────────────────────────────────────────────────
// Organic liquid silhouette - minimal variation, no geometric states
const MEMBRANE_SHAPES = [
  "50% 50% 49% 51% / 50% 49% 51% 50%", // Rest
  "49% 51% 50% 50% / 49% 50% 50% 51%", // Soft left
  "51% 49% 50% 50% / 50% 51% 49% 50%", // Soft right
  "50% 50% 50% 50% / 49% 49% 51% 51%", // Gentle vertical
] as const;

export const ContactOrb = () => {
  const { openModal } = useContactModal();

  const containerRef = useRef<HTMLDivElement>(null);
  const interactiveRef = useRef<HTMLDivElement>(null);
  const membraneRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const glowParallaxRef = useRef<HTMLDivElement>(null);
  const glowMassRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textAmbientRef = useRef<HTMLDivElement>(null);
  const textHoverGlowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotionRef = useRef(false);

  useEffect(() => {
    prefersReducedMotionRef.current =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      // ── MEMBRANE BREATHING ──────────────────────────────────────────
      // Very subtle organic silhouette deformation
      const membraneTl = gsap.timeline({ repeat: -1 });

      MEMBRANE_SHAPES.forEach((shape, i) => {
        membraneTl.to(
          [coreRef.current, surfaceRef.current],
          {
            borderRadius: shape,
            duration: PHYSICS.membrane * 0.35,
            ease: "sine.inOut",
          },
          i * PHYSICS.membrane * 0.25
        );
      });

      // ── INTERNAL FLUID CURRENTS ────────────────────────────────────
      // Non-uniform, out-of-phase fluid density fluctuations
      gsap.to(glowMassRef.current, {
        x: -8,
        duration: PHYSICS.current * 1.13, // Prime-ish offset
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(glowMassRef.current, {
        y: 6,
        duration: PHYSICS.current * 0.89, // Out of phase
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(glowMassRef.current, {
        scale: 1.05,
        duration: PHYSICS.current * 1.37, // Micro density breathing
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Surface highlights drift like light on viscous fluid
      gsap.to(surfaceRef.current, {
        opacity: 0.6,
        duration: PHYSICS.current * 0.85,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });

      // ── ATMOSPHERIC DRIFT ──────────────────────────────────────────
      gsap.to(interactiveRef.current, {
        y: -1.5,
        duration: PHYSICS.drift,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(interactiveRef.current, {
        x: 1,
        duration: PHYSICS.drift * 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: PHYSICS.drift * 0.2,
      });

      gsap.to(atmosphereRef.current, {
        opacity: 0.2, // Softer peak opacity
        scale: 1.03, // Slightly wider breathing
        duration: PHYSICS.glow * 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // ── TYPOGRAPHY BREATHING ─────────────────────────────────────────
      // Extremely subtle material luminance shift, mimicking nearby fluid density changes
      gsap.to(textAmbientRef.current, {
        color: "rgba(242, 252, 254, 0.92)",
        textShadow: "0 0 10px rgba(0,217,217,0.12)",
        duration: PHYSICS.glow * 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ── CURSOR INTERACTION ─────────────────────────────────────────────────────
  // Viscous liquid pressure response

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || prefersReducedMotionRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const cx = left + width / 2;
    const cy = top + height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    // Stronger magnetic pull for intentional interaction
    const pullX = dx * 0.15;
    const pullY = dy * 0.15;

    // Body follows with heavy inertia and slightly lifts
    gsap.to(interactiveRef.current, {
      x: pullX,
      y: pullY,
      scale: 1.03, // Slight interactive lift
      duration: PHYSICS.cursorFollow,
      ease: PHYSICS.followEase,
      overwrite: "auto",
    });

    // Remove the unnatural fixed-axis squash and just normalize the scale
    gsap.to(membraneRef.current, {
      scale: 1,
      duration: PHYSICS.cursorFollow * 1.1,
      ease: PHYSICS.followEase,
      overwrite: "auto",
    });

    // Deep 3D parallax for the core visual
    gsap.to(glowParallaxRef.current, {
      x: pullX * 0.6,
      y: pullY * 0.6,
      duration: PHYSICS.cursorFollow * 1.3,
      ease: PHYSICS.followEase,
      overwrite: "auto",
    });

    // Surface details move fastest to create glass-like depth
    gsap.to(surfaceRef.current, {
      x: pullX * 0.85,
      y: pullY * 0.85,
      duration: PHYSICS.cursorFollow * 1.5,
      ease: PHYSICS.followEase,
      overwrite: "auto",
    });

    // Atmosphere gracefully follows, bleeding light very softly
    gsap.to(atmosphereRef.current, {
      x: pullX * 1.2,
      y: pullY * 1.2,
      opacity: 0.28, // Lower maximum intensity to prevent blown out glow
      scale: 1.08,
      duration: PHYSICS.cursorFollow * 1.6,
      ease: PHYSICS.followEase,
      overwrite: "auto",
    });

    // Micro-parallax for embedded typography (moves WITH the body, physically suspended inside)
    gsap.to(textRef.current, {
      x: pullX * 0.4, // Increased so it follows the internal mass more naturally
      y: pullY * 0.4,
      duration: PHYSICS.cursorFollow * 1.1,
      ease: PHYSICS.followEase,
      overwrite: "auto",
    });

    // Typography energy bloom
    gsap.to(textHoverGlowRef.current, {
      opacity: 1,
      duration: PHYSICS.cursorFollow * 1.2,
      ease: PHYSICS.followEase,
      overwrite: "auto",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotionRef.current) return;
    const settleConfig = {
      duration: PHYSICS.cursorSettle,
      ease: PHYSICS.settleEase,
      overwrite: "auto" as const,
    };

    gsap.to(interactiveRef.current, { x: 0, y: 0, scale: 1, ...settleConfig });
    gsap.to(membraneRef.current, { scale: 1, ...settleConfig });
    gsap.to(glowParallaxRef.current, { x: 0, y: 0, ...settleConfig });
    gsap.to(surfaceRef.current, { x: 0, y: 0, ...settleConfig });
    gsap.to(textRef.current, { x: 0, y: 0, ...settleConfig });
    gsap.to(atmosphereRef.current, {
      x: 0,
      y: 0,
      opacity: 0.15, // Return to softer base opacity
      scale: 1,
      duration: PHYSICS.cursorSettle * 1.3,
      ease: PHYSICS.settleEase,
      overwrite: "auto",
    });
    gsap.to(textHoverGlowRef.current, {
      opacity: 0,
      duration: PHYSICS.cursorSettle * 1.4,
      ease: PHYSICS.settleEase,
      overwrite: "auto",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-56 w-56 cursor-pointer items-center justify-center outline-none md:h-72 md:w-72"
      style={
        {
          "--c1": "#00d9d9", // Primary Site Accent Cyan
          "--c2": "#007a8a", // Mid Cyan/Teal
          "--c3": "#1a0a48", // Deep Space Purple
          "--animation-duration": "20s",
          "--blur-amount": "20px",
          "--contrast-amount": "1.8",
        } as React.CSSProperties
      }
      onClick={openModal}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label="Open contact modal"
      onKeyDown={useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal();
        }
      }, [openModal])}
    >
      <style>{`
        @property --angle {
          syntax: "<angle>";
          inherits: false;
          initial-value: 0deg;
        }
        @keyframes rotate {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
        .siri-orb-spinner {
          animation: rotate var(--animation-duration, 20s) linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .siri-orb-spinner {
            animation: none;
          }
        }
      `}</style>

      {/* ── ATMOSPHERIC HAZE ─────────────────────────────────────────────
          Subtle cinematic bleed into the surrounding darkness                 */}
      <div
        ref={atmosphereRef}
        className="pointer-events-none absolute inset-0 -m-24 rounded-full"
        style={{
          background: `
            radial-gradient(60% 56% at 44% 48%, rgba(0,217,217,0.08) 0%, rgba(0,140,150,0.05) 45%, rgba(24,14,68,0.04) 75%, transparent 100%),
            radial-gradient(52% 52% at 58% 40%, rgba(120,70,255,0.04) 0%, transparent 85%)
          `,
          filter: "blur(64px)",
          opacity: 0.15,
          willChange: "transform, opacity",
        }}
      />

      {/* ── INTERACTIVE BODY ────────────────────────────────────────────── */}
      <div
        ref={interactiveRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Membrane pressure layer */}
        <div ref={membraneRef} className="absolute inset-0">
          {/* ── CORE BODY ──────────────────────────────────────────────────
              Single cohesive liquid surface with internal fusion               */}
          <div
            ref={coreRef}
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: MEMBRANE_SHAPES[0],
              background: `radial-gradient(
                circle,
                rgba(255, 255, 255, 0.08) 0%,
                rgba(255, 255, 255, 0.02) 30%,
                transparent 70%
              )`,
              willChange: "transform, border-radius",
            }}
          >
            {/* ── INTERNAL GLOW MASS ──────────────────────────────────────
                Viscous fluid glow embedded inside the body                     */}
            <div ref={glowParallaxRef} className="absolute inset-0">
              <div
                ref={glowMassRef}
                className="absolute inset-[-15%] siri-orb-spinner"
                style={{
                  borderRadius: "50%",
                  background: `
                    conic-gradient(from calc(var(--angle) * 1) at 30% 65%, var(--c3) 0deg, transparent 45deg 315deg, var(--c3) 360deg),
                    conic-gradient(from calc(var(--angle) * 2) at 70% 35%, var(--c2) 0deg, transparent 60deg 300deg, var(--c2) 360deg),
                    conic-gradient(from calc(var(--angle) * -1) at 65% 75%, var(--c1) 0deg, transparent 90deg 270deg, var(--c1) 360deg),
                    conic-gradient(from calc(var(--angle) * 3) at 25% 25%, var(--c2) 0deg, transparent 30deg 330deg, var(--c2) 360deg),
                    conic-gradient(from calc(var(--angle) * -2) at 80% 80%, var(--c1) 0deg, transparent 45deg 315deg, var(--c1) 360deg),
                    radial-gradient(ellipse 120% 80% at 40% 60%, var(--c3) 0%, transparent 50%)
                  `,
                  filter: "blur(var(--blur-amount)) contrast(var(--contrast-amount)) saturate(1.2)",
                  willChange: "transform",
                  transform: "translateZ(0)",
                }}
              />
            </div>

            {/* ── CTA TEXT (PHYSICALLY EMBEDDED) ─────────────────────────
                Placed inside the core so surface details and grain render over it */}
            <div
              ref={textRef}
              className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-[13px] font-bold uppercase tracking-[0.12em] md:text-sm"
              style={{ willChange: "transform" }}
            >
              {/* 1. Subsurface Light Diffusion (Soft scattering) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center blur-[1px]"
                style={{ color: "rgba(0, 217, 217, 0.08)" }}
              >
                <span>Get In</span>
                <span>Touch</span>
              </div>

              {/* 2. Core Material Text (Softened white + subtle cyan tint) */}
              <div
                ref={textAmbientRef}
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                  color: "rgba(235, 248, 250, 0.88)",
                  textShadow: "0 0 8px rgba(0, 200, 217, 0.06)",
                  willChange: "color, text-shadow",
                }}
              >
                <span>Get In</span>
                <span>Touch</span>
              </div>

              {/* 3. Dynamic Luminance Interaction (Reacts to passing fluid) */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center mix-blend-soft-light"
                style={{ color: "rgba(100, 255, 255, 0.15)" }}
              >
                <span>Get In</span>
                <span>Touch</span>
              </div>

              {/* 4. Hover Atmospheric Shift */}
              <div
                ref={textHoverGlowRef}
                className="absolute inset-0 flex flex-col items-center justify-center mix-blend-screen"
                style={{
                  color: "rgba(255, 255, 255, 0)",
                  textShadow: "0 0 8px rgba(0, 217, 217, 0.15), 0 0 16px rgba(0, 140, 150, 0.1)",
                  opacity: 0,
                  willChange: "opacity",
                }}
              >
                <span>Get In</span>
                <span>Touch</span>
              </div>
            </div>

            {/* ── SURFACE DETAIL ──────────────────────────────────────────
                Specular highlights sliding across viscous surface              */}
            <div
              ref={surfaceRef}
              className="absolute inset-0"
              style={{
                borderRadius: MEMBRANE_SHAPES[0],
                background: `radial-gradient(circle at 45% 55%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 30%, transparent 60%)`,
                mixBlendMode: "overlay",
                willChange: "transform, opacity",
              }}
            />

            {/* ── 3D RIM LIGHTING ──────────────────────────────────────────
                Restored inset shadows overlay to ensure they render above the opaque blob */}
            <div 
              className="absolute inset-0 pointer-events-none mix-blend-screen"
              style={{
                borderRadius: "inherit",
                boxShadow: "inset 0 8px 20px rgba(255,255,255,0.08), inset 0 -14px 26px rgba(2,8,18,0.48), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            />

            {/* Premium Texture Overlay */}
            <TextureOverlay opacity={0.4} className="mix-blend-soft-light pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
