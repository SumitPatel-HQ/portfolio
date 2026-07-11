export const SITE_URL = "https://sumitvpatel.dev";

export function canonicalUrl(pathname: string): string {
  const normalized = "/" + pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${SITE_URL}${normalized === "/" ? "" : normalized}`;
}

export {
  OG_IMAGES,
  resolveProjectOgImage,
  buildOgMetadata,
  buildTwitterMetadata,
} from "./metadata";
export type { OgImageKey, OgOptions } from "./metadata";