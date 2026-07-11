import type { Metadata } from 'next';
import { HomePageClient } from './home/HomePageClient';
import { OG_IMAGES, buildOgMetadata, buildTwitterMetadata } from '@/lib/seo';

const _HOME_OG = {
  title: "Sumit Patel | Software Engineer",
  description: "Explore the portfolio of Sumit Patel, a software engineer building AI-powered applications, full-stack web platforms, and scalable digital products.",
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
