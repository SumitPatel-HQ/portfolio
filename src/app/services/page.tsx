import { MobileServicePage } from "@/components/mobile/services/MobileServicePage";
import { Metadata } from "next";
import { OG_IMAGES, buildOgMetadata, buildTwitterMetadata } from "@/lib/seo";

// /services cross-canonicalizes to /about and shares the same social preview.
const _SERVICES_OG = {
  title: "Sumit Patel | Services",
  description: "Explore services offered by Sumit Patel, from AI integrations and autonomous agents to full-stack applications, workflow automation, and scalable software systems.",
  path: "/about",
  image: OG_IMAGES.default,
} as const;

export const metadata: Metadata = {
  title: _SERVICES_OG.title,
  description: _SERVICES_OG.description,
  alternates: {
    canonical: "/about",
  },
  openGraph: buildOgMetadata(_SERVICES_OG),
  twitter: buildTwitterMetadata(_SERVICES_OG),
};

export default function ServicesPage() {
  return (
    <>
      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileServicePage />
      </div>
    </>
  );
}
