import { Metadata } from "next";
import { ExperiencePageClient } from "./ExperiencePageClient";
import { OG_IMAGES, buildOgMetadata, buildTwitterMetadata } from "@/lib/seo";

const _EXPERIENCE_OG = {
  title: "Sumit Patel | Experience",
  description: "Discover the engineering experiences, technical contributions, and real-world projects that have shaped Sumit Patel's journey as a software engineer.",
  path: "/experience",
  image: OG_IMAGES.default,
} as const;

export const metadata: Metadata = {
  title: _EXPERIENCE_OG.title,
  description: _EXPERIENCE_OG.description,
  alternates: {
    canonical: "/experience",
  },
  openGraph: buildOgMetadata(_EXPERIENCE_OG),
  twitter: buildTwitterMetadata(_EXPERIENCE_OG),
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
