import type { Metadata } from 'next';
import { HomePageClient } from './home/HomePageClient';

export const metadata: Metadata = {
  title: "Sumit Patel | Software Engineer",
  description: "Explore the portfolio of Sumit Patel, a software engineer building AI-powered applications, full-stack web platforms, and scalable digital products.",
};

export default function Home() {
  return <HomePageClient />;
}
