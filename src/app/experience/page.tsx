import { Metadata } from "next";
import { ExperiencePageClient } from "./ExperiencePageClient";

export const metadata: Metadata = {
  title: "Sumit Patel | Experience",
  description: "Discover the engineering experiences, technical contributions, and real-world projects that have shaped Sumit Patel's journey as a software engineer.",
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
