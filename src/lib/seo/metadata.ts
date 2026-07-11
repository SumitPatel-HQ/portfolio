import type { Metadata } from "next";
import { canonicalUrl } from "./index";

export const OG_IMAGES = {
  default:    "/og/preview.png",
  QueryCraft: "/og/querycraft.png",
  Rosey:      "/og/rosey.png",
  Sentira:    "/og/sentira.png",
  Fixit:      "/og/fixit.png",
  Imaginalab: "/og/imaginalab.png",
} as const;

// case-insensitive lookup mechanism
export type OgImageKey = keyof typeof OG_IMAGES;
export function resolveProjectOgImage(name: string): string {
  const normalized = name.trim();
  const key = (Object.keys(OG_IMAGES) as OgImageKey[]).find(
    (k) => k.toLowerCase() === normalized.toLowerCase()
  );
  return key ? OG_IMAGES[key] : OG_IMAGES.default;
}
export interface OgOptions {
  title: string;
  description: string;
  path: string;
  image: string;
}
export function buildOgMetadata(opts: OgOptions): Metadata["openGraph"] {
  return {
    title: opts.title,
    description: opts.description,
    url: canonicalUrl(opts.path),
    siteName: "Sumit Patel",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: opts.image,
        width: 1200,
        height: 630,
        alt: opts.title,
      },
    ],
  };
}
export function buildTwitterMetadata(opts: OgOptions): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title: opts.title,
    description: opts.description,
    images: [opts.image],
  };
}