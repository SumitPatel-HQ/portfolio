import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: "Sumit Patel | About",
  description: "Explore the journey, experience, and mindset behind Sumit Patel's work, from learning software development to building impactful digital solutions.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
