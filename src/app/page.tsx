import type { Metadata } from 'next';
import { HomePageClient } from './home/HomePageClient';
import { OG_IMAGES, buildOgMetadata, buildTwitterMetadata } from '@/lib/seo';

const _HOME_OG = {
  title: "Sumit Patel | AI Engineer & Full-Stack Developer",
  description: "AI Engineer and Full-Stack Developer building intelligent applications, AI agents, scalable web platforms, and modern SaaS products.",
  path: "/",
  image: OG_IMAGES.default,
} as const;

export const metadata: Metadata = {
  title: _HOME_OG.title,
  description: _HOME_OG.description,
  alternates: {
    canonical: "/",
  },
  openGraph: buildOgMetadata(_HOME_OG),
  twitter: buildTwitterMetadata(_HOME_OG),
};

export default function Home() {
  return <HomePageClient />;
}
