import { getLogoUrl } from "@/lib/imagekit";

export type ProjectItem = {
  id: number;
  name: string;
  tags: string[];
  description: string;
  href: string;
  logo: string;
  logoAlt: string;
  imageFolder: string;
  imageAlt: string;
  previewImage: string;
  repoUrl: string;
  problem: string[];
  solution: string[];
  techStack: Record<string, string[]>;
};

export const PROJECTS: ProjectItem[] = [
  // ID 1
  {
    id: 1,
    name: "QueryCraft",
    tags: [
      "SQL", "NL-to-SQL", "SQL-Workspace", "Schema-Aware", "Data-Analysis", "Database-Tools", "Enterprise "
    ],
    description:
      "SQL workspace for developers and analysts who want accurate, schema-aware queries against their real databases.",
    href: "https://querycraft-ai.vercel.app/",
    imageFolder: "QueryCraft1",
    previewImage: "IMG1.png",
    imageAlt: "QueryCraft images",
    logo: getLogoUrl("logo1.png"),
    logoAlt: "QueryCraft logo",
    repoUrl: "https://github.com/SumitPatel-HQ/QueryCraft",
    problem: [
      "Writing complex SQL by hand is slow and error‑prone, especially for joins, aggregations, and unfamiliar schemas.",
      "Generic AI chatbots don’t know your real database schema, so they guess SQL that often breaks or feels unsafe to run on production.",
      "Developers end up context‑switching between docs, DB clients, and AI tools just to get one good query.",
      "There’s no single place where you can safely go from “question in English” to “trusted SQL on my real database” with full visibility."
    ],
    solution: [
      "QueryCraft is a browser‑based SQL workspace that connects directly to your Postgres/MySQL and local CSV/SQLite data.",
      "It turns plain‑English questions into schema‑aware SQL that you can read, edit, and run, instead of hiding logic behind a chatbot.",
      "It gives you developer‑friendly tools like a schema browser, ER diagrams, history, and bookmarks around that AI‑generated SQL.",
      "This lets developers and analysts move much faster on real data while still staying in full control of every query they execute."
    ],
    techStack: {
      Frontend: [
        "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "GSAP", "Recharts", "Zod", "Firebase"
      ],
      Backend: [
        "FastAPI", "SQLAlchemy 2", "Google GenAI", "Firebase Admin", "pandas"
      ],
      Database: ["PostgreSQL"]
    }
  },
  // ID 2
  {
    id: 2,
    name: "Sentira",
    tags: [
      "Subtext Analysis", "Emotional Flux Mapping", "Fact-Checking", "Bias Detection", "Narrative Understanding"
    ],
    description:
      "Sentira decodes video, audio, and text to reveal subtext, emotions, and truth, turning passive viewing into active insight.",
    href: "https://sentira-io.vercel.app/",
    imageFolder: "Sentira1",
    previewImage: "IMG1.png",
    imageAlt: "Sentira images",
    logo: "Sentira",
    logoAlt: "Sentira logo",
    repoUrl: "https://github.com/SumitPatel-HQ/Sentira",
    problem: [
      "Passive social media consumption lacks emotional intelligence.",
      "No built-in fact-checking for misinformation.",
      "Hidden bias and manipulation go undetected.",
      "Cross-platform analysis requires manual effort.",
      "AI-generated content is hard to distinguish."
    ],
    solution: [
      "Real-time sentiment analysis (1-second granularity).",
      "Fact-Checking engine with Google Search grounding.",
      "Bias detection with neural risk vectors.",
      "Trend analysis and virality scoring.",
      "AI content detection.",
      "PDF report generation.",
    ],
    techStack: {
      Frontend: [
        "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Recharts", "Clerk"
      ],
      Backend: [
        "FastAPI", "Google Gemini AI", "OpenCV", "pytubefix", "Uvicorn"
      ],
      Database: ["PostgreSQL"]
}
  },
  //ID 3
  {
    id: 3,
    name: "Rosey",
    tags: ["Lead Generation","Sales Outreach","CRM Dashboard","Workflow Automation","AI-Powered Enrichment"],
    description:
      "A comprehensive sales outreach platform that automates lead generation, multi-channel communication, AI-powered enrichment, and workflow management with an integrated CRM dashboard for tracking and optimizing campaigns.",
    href: "https://rosey-workflow.vercel.app/",
    imageFolder: "Rosey1",
    previewImage: "IMG1.png",
    imageAlt: "Rosey images",
    logo: getLogoUrl("Logo3.png"),
    logoAlt: "Rosey logo",
    repoUrl: "https://github.com/SumitPatel-HQ/Rosey",
    problem: [
      "Manual outreach doesn't scale — personalizing for hundreds of leads is slow.",
      "Multi-channel follow-ups across Email + WhatsApp are hard to coordinate.",
      "Reply detection is manual — leads get spammed or ignored.",
      "No built-in compliance or sender warm-up — reputation damage is common.",
      "No unified tool for campaign design, AI personalization, and analytics."
    ],
    solution: [
      "Visual Workflow Builder — Drag-and-drop Email + WhatsApp campaign sequences.",
      "AI Content Generation — Gemini writes personalized emails and messages per lead.",
      "Lead Enrichment — Auto-enriches leads with pain points and talking points from the web.",
      "Smart Reply Detection — Auto-stops follow-ups and drafts AI replies on inbound messages.",
      "Compliance Engine — Unsubscribe handling, CAN-SPAM footers, and sender warm-up.",
      "Analytics Dashboard — Real-time health scores, reply rates, and deliverability tracking."
    ],
    techStack: {
      Frontend: [
        "Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Clerk", "GSAP", "React Flow", "Recharts"
      ],
      Backend: [
        "Node.js Worker (polling loop)", "Gmail API (googleapis)", "whiskeysockets/baileys", "Gemini API (openai SDK)"
      ],
      Database: ["Supabase (PostgreSQL)"]
    }
  },
  // ID 4
  {
    id: 4,
    name: "ImaginaLab",
    tags: ["personal gallery", "wallpaper collection", "image browser", "ImageKit-backed content", "protected gallery"],
    description:
      "A modern image vault for organizing and displaying photos with optimized loading.",
    href: "https://imaginalab.vercel.app/",
    imageFolder: "ImaginaLab",
    previewImage: "IMG1.png",
    imageAlt: "ImaginaLab images",
    logo: getLogoUrl("Logo4.png"),
    logoAlt: "ImaginaLab logo",
    repoUrl: "https://github.com/SumitPatel-HQ/ImaginaLab",
    problem: [],
    solution: [
      "Displays images from ImageKit CDN in a masonry grid layout.",
      "Security features: blocks right-click, screenshots, DevTools, and screen recording.",
      "Smooth animations with GSAP and Framer Motion.",
      "Immersive fullscreen image viewer with swipe gestures.",
      "Adaptive image quality based on network speed.",
      "Virtualized rendering for handling large collections."
    ],
    techStack: {
      Frontend: [
        "React 19", "Vite 8", "TypeScript 5","Tailwind CSS v4", "GSAP", "Framer Motion", "ImageKit.io"
      ]
    }
  },
  // ID 5
  {
    id: 5,
    name: "FixIt",
    tags: ["AR Repair", "Multi-Device", "Visual Fix", "Voice Guidance", "Safety Check","AI Troubleshooting"],
    description:
      "AI-powered visual troubleshooting platform that lets users snap a photo of a broken device and receive step‑by‑step repair guidance, AR component overlays, safety checks, and voice‑enabled instructions.",
    href: "https://fixit-lens.vercel.app/",
    imageFolder: "Fixit",
    previewImage: "IMG1.png",
    imageAlt: "FixIt images",
    logo: getLogoUrl("logo5.png"),
    logoAlt: "FixIt logo",
    repoUrl: "https://github.com/SumitPatel-HQ/FixIt-AI-Multi-Agent-Visual-Troubleshooting-Orchestrator",
    problem: [
      "Users lack technical expertise to diagnose and fix malfunctioning electronic devices.",
      "Troubleshooting requires Googling symptoms across multiple fragmented sources.",
      "Users struggle to visually identify specific device components.",
      "Generic search results don't flag safety risks like electrical shock or fire hazards.",
    ],
    solution: [
      "AI-powered web app: upload a photo of a broken device + describe the problem → get a step-by-step fix using AI Models",
      "AR overlays pinpoint exact component locations on the image, with safety override system that auto-blocks DIY repairs for critical hazards",
      "Web grounding fetches official manufacturer docs and community solutions in real-time."
    ],
    techStack: {
      Frontend: [
        "Next.js 16", "React 19", "TypeScript 5", "Tailwind CSS 4", "Framer Motion", "Clerk"
      ],
      Backend: [
        "FastAPI", "Uvicorn", "google-genai", "Pillow", "NumPy", "httpx"
      ],
      Database: ["SQLite", "SQLAlchemy"]
    }
  },
  /*{
    id: 6,
    name: "EduInsight",
    tags: ["Health UX", "Service Design", "Data Visualization"],
    description:
      "Experience design for health insights with clearer activity narratives, habit loops, and user-first personalization.",
    href: "/work/fitbit-flow",
    imageFolder: "QueryCraft",
    imageAlt: "EduInsight images",
    logo: "fitbit",
    logoAlt: "EduInsight logo",
    repoUrl: "",
    problem: '',
    solution: "",
    techStack: {}
  },
  {
    id: 7,
    name: "Infinite Nature",
    tags: ["Immersive UI", "Visual Systems", "Interactive Storytelling"],
    description:
      "An immersive concept experience blending spatial storytelling and product interaction for a memorable brand moment.",
    href: "/work/infinite-nature",
    imageFolder: "QueryCraft",
    imageAlt: "Infinite Nature images",
    logo: "∞ Nature",
    logoAlt: "Infinite Nature logo",
    repoUrl: "",
    problem: '',
    solution: "",
    techStack: {}
  },
  */
];

// Using undefined or empty to trigger the high-performance, zero-latency 
// SVG noise implementation in the TextureOverlay component.
export const PROJECTS_TEXTURE_IMAGE = "";
