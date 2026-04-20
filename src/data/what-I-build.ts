export type BuildCard = {
  id: string;
  title: string;
  tags: string[];
  bullets: string[];
};

export const CARDS: BuildCard[] = [
  {
    id: "01",
    title: "AI Integrations",
    tags: ["OpenAI", "Gemini", "Claude", "LangChain"],
    bullets: [
      "Build chatbots trained on your docs and data",
      "Add AI-powered search to any existing product",
      "Connect any LLM API with fallback and retry logic",
      "Embed generative features without rebuilding your stack"
    ]
  },
  {
    id: "02",
    title: "n8n Workflow Systems",
    tags: ["n8n", "Webhooks", "REST APIs", "Zapier-alternative"],
    bullets: [
      "Automate lead routing, follow-ups, and CRM updates",
      "Trigger multi-step pipelines from webhooks or schedules",
      "Replace manual ops with visual, maintainable workflows",
      "Connect 300+ apps without writing custom integration code"
    ]
  },
  {
    id: "03",
    title: "Full-Stack Web Apps",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    bullets: [
      "Build and ship complete web products end-to-end",
      "Performant frontends with server-side rendering",
      "Auth, database, API routes — all in one codebase",
      "Deploy-ready on Vercel with CI/CD out of the box"
    ]
  },
  {
    id: "04",
    title: "RAG & Knowledge Systems",
    tags: ["Pinecone", "OpenAI Embeddings", "Supabase Vector", "LangChain"],
    bullets: [
      "Make AI answer questions from your own documents",
      "Semantic search over internal knowledge bases",
      "Chunk, embed, and retrieve context at scale",
      "Works on PDFs, databases, wikis, support tickets"
    ]
  },
  {
    id: "05",
    title: "Client Portals & Dashboards",
    tags: ["Next.js", "Supabase", "Auth", "Real-time"],
    bullets: [
      "Give clients a branded portal to track their work",
      "Real-time dashboards with live data updates",
      "Role-based access, authentication, audit logs",
      "Replaces spreadsheets and manual status emails"
    ]
  },
  {
    id: "06",
    title: "AI Agents & Workflows",
    tags: ["LangGraph", "Tool Calling", "OpenAI", "Memory"],
    bullets: [
      "Agents that browse, decide, and take actions autonomously",
      "Multi-step reasoning pipelines with tool-calling",
      "Human-in-the-loop checkpoints for critical decisions",
      "Chain LLM calls with memory and state across steps"
    ]
  },
  {
    id: "07",
    title: "API & SaaS Integrations",
    tags: ["REST", "OAuth", "Stripe", "Slack", "Webhooks"],
    bullets: [
      "Connect Stripe, Slack, Notion, Google, Airtable and more",
      "OAuth flows, webhook handlers, and sync pipelines",
      "Abstract third-party APIs behind clean internal interfaces",
      "Handles retries, rate limits, and error recovery"
    ]
  }
];
