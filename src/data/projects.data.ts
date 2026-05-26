import { getLogoUrl } from "@/lib/imagekit";

export type ProjectItem = {
  id: number;
  name: string;
  tags: string[];
  description: string;
  href: string;
  logo: string;
  logoAlt: string;
  imageAlt: string;
  imageFolder: string;
  previewImage: string;
  repoUrl: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    name: "QueryCraft",
    tags: ["SQL", "NL-to-SQL", "SQL-Workspace", "Schema-Aware", "Data-Analysis", "Database-Tools", "Enterprise "],
    description:
      "SQL workspace for developers and analysts who want accurate, schema-aware queries against their real databases ",
    href: "https://querycraft-ai.vercel.app/",
    imageFolder: "QueryCraft1",
    previewImage: "IMG1.png",
    imageAlt: "QueryCraft images",
    logo: getLogoUrl("logo1.png"),
    logoAlt: "QueryCraft logo",
    repoUrl: "https://github.com/SumitPatel-HQ/QueryCraft",
  },
  {
    id: 2,
    name: "Sentira",
    tags: ["Subtext Analysis", "Emotional Flux Mapping", "Fact-Checking", "Bias Detection", "Narrative Understanding"],
    description:
      "Sentira decodes video, audio, and text to reveal subtext, emotions, and truth, turning passive viewing into active insight.",
    href: "https://sentira-io.vercel.app/",
    imageFolder: "Sentira1",
    previewImage: "IMG1.png",
    imageAlt: "Sentira images",
    logo: "Sentira",
    logoAlt: "Sentira logo",
    repoUrl: "https://github.com/SumitPatel-HQ/Sentira",
  },
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
  },
  {
    id: 4,
    name: "ImaginaLab",
    tags: ["personal gallery", "wallpaper collection", "image browser", "ImageKit-backed content", "protected gallery"],
    description:
      "A modern private image vault for organizing and displaying photos with optimized loading.",
    href: "https://imaginalab.vercel.app/",
    imageFolder: "ImaginaLab",
    previewImage: "IMG1.png",
    imageAlt: "ImaginaLab images",
    logo: getLogoUrl("Logo4.png"),
    logoAlt: "ImaginaLab logo",
    repoUrl: "https://github.com/SumitPatel-HQ/ImaginaLab",
  },
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
  },
  */
];

// Using undefined or empty to trigger the high-performance, zero-latency 
// SVG noise implementation in the TextureOverlay component.
export const PROJECTS_TEXTURE_IMAGE = "";
