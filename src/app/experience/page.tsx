import { Metadata } from "next";
import { ExperiencePageClient } from "./ExperiencePageClient";

export const metadata: Metadata = {
  title: "Sumit Patel | Experience",
  description: "Discover the professional experience, engineering work, and technical contributions that define Sumit Patel's journey as a software engineer.",
};

export default function ExperiencePage() {
  return <ExperiencePageClient />;
}
