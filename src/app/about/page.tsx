import Link from "next/link";
import Image from "next/image";

const COMPETENCIES = [
  {
    title: "Experience Design",
    description:
      "Building cinematic user journeys that transcend the document-based web.",
  },
  {
    title: "Digital Strategy",
    description:
      "Defining the narrative arc for luxury brands and tech-forward startups.",
  },
  {
    title: "Visual Engineering",
    description:
      "Translating brand identity into precision-engineered design systems.",
  },
  {
    title: "Future Tech",
    description:
      "Exploring the intersection of AI-driven interfaces and spatial computing.",
    highlight: true,
  },
];

const EXPERIENCE = [
  {
    period: "2022 - PRESENT",
    company: "Obsidian Lens Studio",
    roles: ["Founder", "Design Director"],
    description:
      "Leading creative direction for next-gen hardware startups and architectural visualization firms.",
  },
  {
    period: "2019 - 2022",
    company: "Aether Systems",
    roles: ["Senior UI Lead"],
    description:
      "Spearheaded the redesign of core platform interfaces, achieving a 40% increase in user retention.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 md:pt-0">
      <div className="flex min-h-screen flex-col md:flex-row">
        <section className="relative min-h-[530px] w-full overflow-hidden bg-[#0e0e0e] md:min-h-screen md:w-1/2">
          <Image
            alt="Cinematic black and white portrait of a creative professional in dramatic lighting"
            className="absolute inset-0 h-full w-full object-cover opacity-80 grayscale brightness-75 transition-transform duration-1000 ease-[cubic-bezier(0.2,0,0,1)] hover:scale-105"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            src="/images/about/about-me-portfolio-profile.webp"
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_32%,rgba(255,255,255,0.08),transparent_48%)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-40 bg-gradient-to-r from-transparent via-[#131313]/70 to-[#131313] md:block lg:w-52" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e0e0e]/60 via-transparent to-transparent" />
          <div className="absolute bottom-12 left-12 z-10">
            <div className="inline-block rounded-full bg-[#353535]/40 px-4 py-2 backdrop-blur-md">
              <span className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#c4c7c7]">
                Available for Projects 2026
              </span>
            </div>
          </div>
        </section>

        <section className="flex w-full flex-col gap-24 overflow-y-auto bg-[#131313] px-8 py-20 text-[#e2e2e2] md:w-1/2 md:px-20 md:py-32">
          <div className="max-w-xl">
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.05em] text-[#c6c6c7]">
              Introduction
            </span>
            <h1 className="mb-10 text-5xl font-extrabold tracking-[-0.04em] md:text-7xl">
              Sumit <span className="font-light opacity-80">Patel.</span>
            </h1>
            <p className="text-lg font-light leading-relaxed text-[#c4c7c7] md:text-xl">
              I am a multi-disciplinary creator focused on bridging the gap
              between high-end industrial aesthetics and digital interfaces. My
              work revolves around the concept of &quot;The Obsidian Lens&quot;,
              bringing clarity, depth, and premium tactility to the screen.
            </p>
          </div>

          <div>
            <span className="mb-8 block text-[10px] font-bold uppercase tracking-[0.05em] text-[#c6c6c7]">
              Core Competencies
            </span>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {COMPETENCIES.map((item) => (
                <article
                  key={item.title}
                  className={`rounded-xl border p-8 transition-colors duration-500 ${
                    item.highlight
                      ? "border-[#c6c6c7]/20 bg-gradient-to-br from-[#c6c6c7] to-[#101213] text-[#2f3131]"
                      : "border-white/5 bg-[#1b1b1b] hover:bg-[#2a2a2a]"
                  }`}
                >
                  <h3 className="mb-3 text-xl font-bold">{item.title}</h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      item.highlight ? "text-[#111213]" : "text-[#c4c7c7]"
                    }`}
                  >
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-12">
            <span className="block text-[10px] font-bold uppercase tracking-[0.05em] text-[#c6c6c7]">
              Past Engagements
            </span>
            <div className="space-y-12">
              {EXPERIENCE.map((item) => (
                <div
                  key={`${item.company}-${item.period}`}
                  className="group flex flex-col gap-4 md:flex-row md:items-start"
                >
                  <div className="w-28 shrink-0">
                    <span className="text-sm font-bold text-[#c4c7c7]">
                      {item.period}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-2xl font-bold text-[#e2e2e2] transition-colors group-hover:text-[#c6c6c7]">
                      {item.company}
                    </h4>
                    <div className="mb-4 mt-2 flex flex-wrap gap-2">
                      {item.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full bg-[#353535] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#c4c7c7]"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                    <p className="max-w-md leading-relaxed text-[#c4c7c7]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#444748]/20 pt-12">
            <Link
              className="inline-flex items-center gap-3 rounded-lg bg-[#c6c6c7] px-10 py-5 text-xs font-bold uppercase tracking-widest text-[#2f3131] transition-all hover:scale-[1.02] active:scale-95"
              href="/contact"
            >
              Initiate Collaboration
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
