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
    imageFolder: "QueryCraft",
    imageAlt: "QueryCraft images",
    logo: getLogoUrl("logo1.png"),
    logoAlt: "QueryCraft logo",
    repoUrl: "https://github.com/SumitPatel-HQ/QueryCraft",
  },
  {
    id: 2,
    name: "Sentira",
    tags: ["Enterprise UX", "Platform Architecture", "Product Strategy"],
    description:
      "A transformation program focused on onboarding, governance, and scale-ready workflows for enterprise operations.",
    href: "/work/sap-ix",
    imageFolder: "QueryCraft",
    imageAlt: "Sentira images",
    logo: "Sentira",
    logoAlt: "Sentira logo",
    repoUrl: "https://github.com/SumitPatel-HQ/Sentira",
  },
  {
    id: 3,
    name: "Rosey",
    tags: ["AI Product Design", "Prompt UX", "Research Prototyping"],
    description:
      "Concept-to-prototype exploration for AI-assisted product workflows, with rapid iterations and usability validation.",
    href: "/work/rosey",
    imageFolder: "QueryCraft",
    imageAlt: "Rosey images",
    logo: "Gemini",
    logoAlt: "Gemini logo",
    repoUrl: "",
  },
  {
    id: 4,
    name: "Cloudline",
    tags: ["Brand Systems", "SaaS Experience", "Growth Experiments"],
    description:
      "A cloud platform interface refresh unifying brand voice with clearer navigation and conversion-oriented flows.",
    href: "/work/cloudline",
    imageFolder: "QueryCraft",
    imageAlt: "Cloudline images",
    logo: "Cloud",
    logoAlt: "Cloudline logo",
    repoUrl: "",
  },
  {
    id: 5,
    name: "NEXT Collective",
    tags: ["Creative Direction", "Product Storytelling", "Team Enablement"],
    description:
      "A collaborative product narrative and interaction system helping cross-functional teams align around outcomes.",
    href: "/work/next-collective",
    imageFolder: "QueryCraft",
    imageAlt: "Next Collective images",
    logo: "NEXT",
    logoAlt: "Next Collective logo",
    repoUrl: "",
  },
  {
    id: 6,
    name: "Fitbit Flow",
    tags: ["Health UX", "Service Design", "Data Visualization"],
    description:
      "Experience design for health insights with clearer activity narratives, habit loops, and user-first personalization.",
    href: "/work/fitbit-flow",
    imageFolder: "QueryCraft",
    imageAlt: "Fitbit images",
    logo: "fitbit",
    logoAlt: "Fitbit logo",
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
];

// Using undefined or empty to trigger the high-performance, zero-latency 
// SVG noise implementation in the TextureOverlay component.
export const PROJECTS_TEXTURE_IMAGE = "";
