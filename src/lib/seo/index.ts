// Keep the origin free of a trailing slash so absolute paths cannot produce
// protocol-valid but non-canonical URLs containing a double slash.
export const SITE_URL = "https://sumitvpatel.dev";

export function canonicalUrl(pathname: string): string {
  const normalized = "/" + pathname.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${SITE_URL}${normalized === "/" ? "/" : normalized}`;
}

export {
  OG_IMAGES,
  resolveProjectOgImage,
  buildOgMetadata,
  buildTwitterMetadata,
} from "./metadata";
export type { OgImageKey, OgOptions } from "./metadata";
