# Core Technology Stack

This document outlines the primary technologies, libraries, and frameworks used to build the portfolio.

## Core Architecture
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Package Manager:** `pnpm`

## Styling & Design System
- **Engine:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Utilities:** `clsx`, `tailwind-merge` for dynamic class handling.
- **Component Primitives:** [Radix UI](https://www.radix-ui.com/) (Dialog, Label, Slot)
- **CSS Architecture:** Vanilla CSS integration for complex identity markers and glassmorphism.

## Typography
- **Primary (Titles):** Inter (Bold)
- **Secondary (Subtitles/Monospace):** DM Mono


## Animations & Motion
- **Primary Motion:** [Framer Motion](https://www.framer.com/motion/) (Declarative UI animations)
- **High Performance:** [GSAP](https://gsap.com/) (Complex sequencing and ScrollTrigger)
- **Scroll Fluidity:** [Lenis](https://lenis.darkroom.engineering/) (Smooth vertical scrolling)

## Components & Icons
- **Icons:** [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Variants:** `class-variance-authority` (CVA) for scalable UI components.

## Deployment & Analytics
- **Platform:** [Vercel](https://vercel.com/)
- **Performance:** Vercel Speed Insights
- **Engagement:** Vercel Analytics

## Quality Assurance
- **Linting:** ESLint (Next.js & React 19 recommended config)
- **Formatting:** Prettier
