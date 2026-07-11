import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';
import { OG_IMAGES, buildOgMetadata, buildTwitterMetadata } from '@/lib/seo';

const _ABOUT_OG = {
  title: "Sumit Patel | About",
  description: "Explore the journey, experience, and mindset behind Sumit Patel's work, from learning software development to building impactful digital solutions.",
  path: "/about",
  image: OG_IMAGES.default,
} as const;

export const metadata: Metadata = {
  title: _ABOUT_OG.title,
  description: _ABOUT_OG.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: buildOgMetadata(_ABOUT_OG),
  twitter: buildTwitterMetadata(_ABOUT_OG),
};

export default function AboutPage() {
  return <AboutPageClient />;
}
