# Premium Gooey Liquid Blob Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the contact button into a cohesive premium liquid membrane that feels like one continuous viscous material with internal fluid currents and pressure-based deformation.

**Architecture:** Single stable silhouette with internal gradient layers fused together. GSAP drives subtle membrane breathing (48-52% border-radius range), internal light drift, and viscous cursor response. All motion is continuous and overlapping to avoid keyframe visibility.

**Tech Stack:** React, GSAP (gsap), CSS gradients with radial/linear composition, mixBlendMode for optical fusion.

---

## Chunk 1: Physics Constants & Shape System

**Files:**
- Modify: `src/components/ui/GooeyContactButton.tsx:1-40`

### Task 1.1: Define Viscous Physics Constants

**Current Issue:** Motion feels too snappy and mechanical.

**New Constants:**
```typescript
const PHYSICS = {
  ease: "sine.inOut",
  followEase: "power2.out", // Slower, heavier
  settleEase: "power3.out", // More inertial
  
  // Slowed down for viscous feel
  membrane: 18,      // Membrane breathing (was 16)
  drift: 26,         // Positional drift (was 22)
  current: 32,       // Internal currents (was 24)
  glow: 22,          // Glow pulse (was 20)
  
  cursorFollow: 2.2, // Slower response (was 1.9)
  cursorSettle: 3.4, // Heavier settle (was 2.9)
} as const;
```

- [ ] **Step 1: Update physics constants**
  - Change ease functions to slower variants
  - Increase all durations by ~15-20%
  - Keep yoyo and repeat settings

- [ ] **Step 2: Define Membrane Shapes**
  - Only 3-4 subtle variations
  - Keep within 48-52% range
  - No sharp transitions
  ```typescript
  const MEMBRANE_SHAPES = [
    "50% 50% 49% 51% / 50% 49% 51% 50%", // Rest
    "49% 51% 50% 50% / 49% 50% 50% 51%", // Soft left
    "51% 49% 50% 50% / 50% 51% 49% 50%", // Soft right
    "50% 50% 50% 50% / 49% 49% 51% 51%", // Gentle vertical
  ] as const;
  ```

---

## Chunk 2: Cohesive Visual Structure

**Files:**
- Modify: `src/components/ui/GooeyContactButton.tsx:240-328`

### Task 2.1: Refactor DOM Structure

**Current Issue:** Layers feel separated with distinct refs.

**New Structure (fused layers):**
```tsx
<div ref={containerRef}>
  {/* Atmospheric haze - outside the blob */}
  <div ref={atmosphereRef} />
  
  {/* Interactive wrapper */}
  <div ref={interactiveRef}>
    {/* Pressure/membrane layer */}
    <div ref={membraneRef}>
      {/* Core body with fused internal systems */}
      <div ref={coreRef}>
        {/* Internal glow - clipped inside */}
        <div ref={glowMassRef} />
        {/* Surface highlights */}
        <div ref={surfaceRef} />
      </div>
    </div>
  </div>
  
  {/* Text */}
  <div ref={textRef} />
</div>
```

- [ ] **Step 1: Simplify ref structure**
  - Remove: `pressureRef`, `innerGlowRef`, `highlightRef`
  - Keep: `containerRef`, `interactiveRef`, `membraneRef`, `coreRef`, `glowMassRef`, `surfaceRef`, `atmosphereRef`, `textRef`
  - Rename for clarity

### Task 2.2: Fuse Visual Layers

**Core Body (single cohesive surface):**
```tsx
<div
  ref={coreRef}
  className="absolute inset-0 overflow-hidden"
  style={{
    borderRadius: MEMBRANE_SHAPES[0],
    background: `
      radial-gradient(42% 38% at 28% 26%, rgba(255,255,255,0.14) 0%, transparent 60%),
      radial-gradient(56% 50% at 72% 34%, rgba(20,235,245,0.18) 0%, transparent 64%),
      radial-gradient(64% 62% at 34% 72%, rgba(55,25,120,0.26) 0%, transparent 68%),
      linear-gradient(152deg, #11d8d5 0%, #0a8a92 30%, #062e42 56%, #1a0a48 82%, #0eb8c8 100%)
    `,
    backgroundSize: "160% 160%, 150% 150%, 140% 140%, 100% 100%",
    backgroundPosition: "28% 22%, 68% 32%, 32% 68%, 50% 50%",
    boxShadow: "inset 0 8px 20px rgba(255,255,255,0.08), inset 0 -14px 26px rgba(2,8,18,0.48), 0 0 0 1px rgba(255,255,255,0.04)",
  }}
>
```

**Internal Glow Mass (clipped inside):**
```tsx
<div
  ref={glowMassRef}
  className="absolute -inset-[12%]"
  style={{
    borderRadius: "50%",
    background: `
      radial-gradient(38% 34% at 32% 28%, rgba(255,255,255,0.12) 0%, transparent 58%),
      radial-gradient(44% 46% at 58% 64%, rgba(0,228,238,0.28) 0%, rgba(8,164,180,0.14) 52%, transparent 82%),
      radial-gradient(32% 32% at 68% 26%, rgba(138,88,255,0.14) 0%, transparent 68%)
    `,
    backgroundPosition: "32% 28%, 58% 64%, 68% 26%",
    filter: "blur(16px)",
    mixBlendMode: "screen",
    opacity: 0.55,
  }}
/>
```

**Surface Detail (specular highlights):**
```tsx
<div
  ref={surfaceRef}
  className="absolute inset-0"
  style={{
    borderRadius: MEMBRANE_SHAPES[0],
    background: `
      radial-gradient(ellipse 46% 34% at 32% 26%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 28%, transparent 62%),
      radial-gradient(ellipse 26% 20% at 64% 56%, rgba(118,225,255,0.10) 0%, transparent 74%)
    `,
    opacity: 0.34,
    mixBlendMode: "screen",
  }}
/>
```

**Atmospheric Haze (embedded in environment):**
```tsx
<div
  ref={atmosphereRef}
  className="pointer-events-none absolute inset-0 -m-16"
  style={{
    borderRadius: "50%",
    background: `
      radial-gradient(60% 56% at 44% 48%, rgba(12,215,225,0.14) 0%, rgba(10,140,158,0.10) 38%, rgba(24,14,68,0.08) 64%, transparent 100%),
      radial-gradient(52% 52% at 58% 40%, rgba(125,70,255,0.06) 0%, transparent 76%)
    `,
    filter: "blur(48px)",
    opacity: 0.18,
  }}
/>
```

- [ ] **Step 2: Implement fused visual layers**
  - Use compound gradients instead of separate divs
  - Keep blur subtle (14-18px range)
  - Reduce opacity for embedded feel
  - Ensure all internal elements are clipped by overflow:hidden on parent

---

## Chunk 3: Organic Motion System

**Files:**
- Modify: `src/components/ui/GooeyContactButton.tsx:40-120`

### Task 3.1: Membrane Breathing (Shape Morphing)

**Current Issue:** Too mechanical, needs more organic flow.

```typescript
// Membrane shape morphing - very subtle
const membraneTimeline = gsap.timeline({ repeat: -1 });

MEMBRANE_SHAPES.forEach((shape, i) => {
  membraneTimeline.to([coreRef.current, surfaceRef.current], {
    borderRadius: shape,
    duration: PHYSICS.membrane * 0.35,
    ease: "sine.inOut",
  }, i * PHYSICS.membrane * 0.25);
});
```

- [ ] **Step 1: Implement membrane morphing**
  - Animate both core and surfaceRef together
  - Use timeline instead of individual tweens
  - Keep transitions slow and smooth

### Task 3.2: Internal Currents (Background Position)

**Current Issue:** Motion too visible as keyframes.

```typescript
// Internal fluid currents - overlapping timelines
const currentTl = gsap.timeline({ repeat: -1, yoyo: true });

currentTl
  .to(coreRef.current, {
    backgroundPosition: "32% 28%, 70% 36%, 38% 70%, 50% 50%",
    duration: PHYSICS.current * 0.6,
    ease: "sine.inOut",
  }, 0)
  .to(coreRef.current, {
    backgroundPosition: "24% 22%, 74% 30%, 28% 72%, 50% 50%",
    duration: PHYSICS.current * 0.4,
    ease: "sine.inOut",
  }, PHYSICS.current * 0.5);

// Glow mass moves with delayed response
gsap.to(glowMassRef.current, {
  x: -4,
  y: 3,
  scale: 1.06,
  duration: PHYSICS.current * 1.1,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
});

gsap.to(glowMassRef.current, {
  backgroundPosition: "36% 30%, 56% 60%, 70% 24%",
  duration: PHYSICS.current * 1.2,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  delay: 2,
});

// Surface highlights drift like light on viscous fluid
gsap.to(surfaceRef.current, {
  backgroundPosition: "34% 24%, 66% 58%",
  opacity: 0.28,
  duration: PHYSICS.current * 0.85,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
  delay: 1.2,
});
```

- [ ] **Step 2: Implement internal currents**
  - Use overlapping timelines for continuous flow
  - Vary durations to prevent visible looping
  - Keep movement subtle (±4-6px range)

### Task 3.3: Atmospheric Breathing

```typescript
// Slow ambient drift
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

// Haze breathing
gsap.to(atmosphereRef.current, {
  opacity: 0.22,
  scale: 1.02,
  duration: PHYSICS.glow * 1.4,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1,
});
```

- [ ] **Step 3: Implement atmospheric motion**
  - Reduce drift amplitude (was ±2-6, now ±1-1.5)
  - Keep haze motion minimal

---

## Chunk 4: Viscous Cursor Interaction

**Files:**
- Modify: `src/components/ui/GooeyContactButton.tsx:122-200`

### Task 4.1: Liquid Pressure Response

**Current Issue:** Mechanical rotation and stretch.

```typescript
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!containerRef.current) return;

  const { left, top, width, height } = containerRef.current.getBoundingClientRect();
  const cx = left + width / 2;
  const cy = top + height / 2;
  const dx = e.clientX - cx;
  const dy = e.clientY - cy;
  const nx = dx / (width / 2);
  const ny = dy / (height / 2);
  const dist = Math.sqrt(nx * nx + ny * ny);

  // Viscous pull - softer response
  const pullX = dx * 0.06; // Reduced from 0.085
  const pullY = dy * 0.06;
  
  // Pressure deformation - subtle membrane tension
  const pressure = Math.min(dist * 0.012, 0.018); // Gentler

  // Body follows with heavy inertia
  gsap.to(interactiveRef.current, {
    x: pullX,
    y: pullY,
    duration: PHYSICS.cursorFollow,
    ease: PHYSICS.followEase,
    overwrite: "auto",
  });

  // Membrane elongates toward cursor (liquid tension)
  gsap.to(membraneRef.current, {
    scaleX: 1 + pressure * 0.7, // Less aggressive
    scaleY: 1 - pressure * 0.5,
    duration: PHYSICS.cursorFollow * 1.1,
    ease: PHYSICS.followEase,
    overwrite: "auto",
  });

  // Internal glow shifts like viscous fluid (delayed)
  gsap.to(glowMassRef.current, {
    x: pullX * 0.4,
    y: pullY * 0.45,
    duration: PHYSICS.cursorFollow * 1.3,
    ease: PHYSICS.followEase,
    overwrite: "auto",
  });

  // Surface highlights slide across (most delayed)
  gsap.to(surfaceRef.current, {
    x: pullX * 0.22,
    y: pullY * 0.18,
    duration: PHYSICS.cursorFollow * 1.5,
    ease: PHYSICS.followEase,
    overwrite: "auto",
  });

  // Atmosphere follows slowly
  gsap.to(atmosphereRef.current, {
    x: pullX * 0.7,
    y: pullY * 0.65,
    opacity: 0.24,
    duration: PHYSICS.cursorFollow * 1.6,
    ease: PHYSICS.followEase,
    overwrite: "auto",
  });

  // Text parallax
  gsap.to(textRef.current, {
    x: pullX * 0.18,
    y: pullY * 0.18,
    duration: PHYSICS.cursorFollow * 0.9,
    ease: PHYSICS.followEase,
    overwrite: "auto",
  });
};
```

- [ ] **Step 1: Implement viscous cursor response**
  - Remove all rotation
  - Reduce pull multipliers
  - Increase delay between layers
  - Use only scale for membrane deformation

### Task 4.2: Inertial Settle-Back

```typescript
const handleMouseLeave = () => {
  // All return with heavy inertia
  const settleConfig = {
    duration: PHYSICS.cursorSettle,
    ease: PHYSICS.settleEase,
    overwrite: "auto",
  };

  gsap.to(interactiveRef.current, { x: 0, y: 0, ...settleConfig });
  gsap.to(membraneRef.current, { scaleX: 1, scaleY: 1, ...settleConfig });
  gsap.to(glowMassRef.current, { x: 0, y: 0, ...settleConfig });
  gsap.to(surfaceRef.current, { x: 0, y: 0, ...settleConfig });
  gsap.to(atmosphereRef.current, { x: 0, y: 0, opacity: 0.18, duration: PHYSICS.cursorSettle * 1.3, ...settleConfig });
  gsap.to(textRef.current, { x: 0, y: 0, ...settleConfig });
};
```

- [ ] **Step 2: Implement settle-back**
  - Consistent easing across all elements
  - Slightly longer duration for haze

---

## Chunk 5: Integration & Verification

### Task 5.1: Run Verification Commands

- [ ] **Step 1: Lint**
  ```bash
  pnpm lint
  ```
  Expected: No new errors in GooeyContactButton.tsx

- [ ] **Step 2: Type Check**
  ```bash
  pnpm type-check
  ```
  Expected: No TypeScript errors

- [ ] **Step 3: Build**
  ```bash
  pnpm build
  ```
  Expected: Successful build

---

## Summary of Changes

**Before:**
- 8 separate refs with distinct animations
- Mechanical rotation/stretch
- Visible layer separation
- Snappy cursor response
- Geometric deformation

**After:**
- 5 fused refs with overlapping timelines
- Pressure-based membrane deformation only
- Clipped internal systems feel like one material
- Viscous delayed response
- Organic silhouette breathing (48-52% range)

**Motion Character:**
- Slower (15-20% longer durations)
- Heavier (power2/power3 easing)
- More continuous (overlapping timelines)
- Less visible looping (varied durations)

**Visual Character:**
- Softer gradients (reduced opacity)
- Subtler blur (14-18px)
- Embedded glow (clipped inside)
- Reduced atmospheric bloom
- Warmer, denser color palette
