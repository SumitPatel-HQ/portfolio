import type { Metadata } from 'next';
import { HomePageClient } from './home/HomePageClient';
import { OG_IMAGES, SITE_URL, buildOgMetadata, buildTwitterMetadata } from '@/lib/seo';

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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Sumit Patel",
        inLanguage: "en",
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile-page`,
        url: `${SITE_URL}/`,
        name: "Sumit Patel — AI Engineer & Full-Stack Developer",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntity: { "@id": `${SITE_URL}/#person` },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Sumit Patel",
        url: `${SITE_URL}/`,
        jobTitle: "AI Engineer and Full-Stack Developer",
        sameAs: [
          "https://github.com/SumitPatel-HQ",
          "https://linkedin.com/in/sumitvpatel",
          "https://x.com/ZSumit_",
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <HomePageClient />
    </>
  );
}
