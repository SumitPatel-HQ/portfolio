# Core Technology Stack

This document outlines the primary technologies, libraries, and frameworks used to build the portfolio.

## Core Architecture
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript
- **Package Manager:** `pnpm`
- **Page Transitions:** `next-transition-router`

## Styling & Design System
- **Engine:** Tailwind CSS 4
- **Utilities:** `clsx`, `tailwind-merge`, and `tailwindcss-animate` for dynamic class handling and animations.
- **Component Primitives:** Radix UI (Dialog, Label, Slot)
- **CSS Architecture:** Vanilla CSS integration for complex identity markers and glassmorphism.

## Typography
- **Primary (Titles):** Inter (Bold)
- **Secondary (Subtitles/Monospace):** DM Mono

## Animations & Motion
- **Primary Motion:** Framer Motion (Declarative UI animations)
- **High Performance:** GSAP (Complex sequencing and ScrollTrigger)
- **Scroll Fluidity:** Lenis (Smooth vertical scrolling)

## Components & Icons
- **Icons:** Lucide React, React Icons
- **Variants:** `class-variance-authority` (CVA) for scalable UI components.
- **Carousels:** `embla-carousel` and `embla-carousel-react` for swipeable galleries and showcases.

## Integrations & Services
- **Image Optimization & Delivery:** ImageKit (`@imagekit/next`, `@imagekit/nodejs`)
- **Email Generation:** React Email (`@react-email/components`, `@react-email/render`)
- **Email Sending:** Google APIs (Gmail API integration for contact form)

## Deployment & Analytics
- **Platform:** Vercel
- **Performance:** Vercel Speed Insights
- **Engagement:** Vercel Analytics

## Quality Assurance
- **Linting:** ESLint (Next.js & React 19 recommended config)
- **Formatting:** Prettier
