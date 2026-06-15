import { env } from "./env";

export const IMAGEKIT_CONFIG = {
  urlEndpoint: env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
  publicKey: env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  pathPrefix: env.NEXT_PUBLIC_IMAGEKIT_PATH_PREFIX,
};


export function getIKUrl(path: string, transformation?: string): string {
  if (path.startsWith("http")) return path;
  
  const endpoint = IMAGEKIT_CONFIG.urlEndpoint.replace(/\/$/, "");
  const prefix = IMAGEKIT_CONFIG.pathPrefix.replace(/^\/|\/$/g, "");
  const cleanPath = path.replace(/^\/|\/$/g, "");
  
  let url = `${endpoint}/${prefix}/${cleanPath}`;
  
  if (transformation) {
    // ImageKit transformations can be added as query params or path segments
    // Using query params for simplicity: ?tr=q-90
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}tr=${transformation}`;
  }
  
  return url;
}

// used for project preview in featured work
export function getProjectImageUrl(name: string): string {
  return getIKUrl(`projects/${name}`, "q-100");
}

export function getLogoUrl(name: string): string {
  return getIKUrl(`Logo/${name}`, "q-100");
}

export function getProfileImageUrl(name: string): string {
  return getIKUrl(name, "q-100");
}

