import ImageKit from "@imagekit/nodejs";
import { env } from "./env";
import { revalidateTag, unstable_cache } from "next/cache";

const SUPPORTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"];
const PROJECT_IMAGES_CACHE_PREFIX = "project-images-v2";

// Initialize SDK with credentials
const imagekit = new ImageKit({
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});

export interface ProjectImage {
  url: string;
  fileName: string;
  width?: number;
  height?: number;
}

function getProjectImagesCacheTag(projectFolder: string): string {
  return `${PROJECT_IMAGES_CACHE_PREFIX}:${projectFolder}`;
}

/**
 * Fetch all images from a project folder.
 * Uses assets.list() from ImageKit SDK v7.5.0
 * Cached using unstable_cache to avoid hitting ImageKit API on every request.
 * Cache entries are tagged per project so a write path can invalidate only
 * the project that changed.
 */
async function fetchProjectImagesFromImageKit(
  projectFolder: string
): Promise<ProjectImage[]> {
  // Build the full path using the same prefix used by the client-side URL builder.
  const prefix = env.NEXT_PUBLIC_IMAGEKIT_PATH_PREFIX.replace(/^\/|\/$/g, "");
  const folderPath = `/${prefix}/projects/${projectFolder}`;

  try {
    const response = await imagekit.assets.list({
      path: folderPath,
      type: "file",
      limit: 100,
      sort: "ASC_NAME",
    });

    // Filter to only File items (not Folder) with supported image extensions
    const images = response
      .filter((item): item is import("@imagekit/nodejs/resources/files/files.js").File & { name: string; url: string; updatedAt?: string; fileId?: string } => {
        return (
          "url" in item &&
          typeof item.url === "string" &&
          typeof item.name === "string" &&
          SUPPORTED_EXTENSIONS.includes(item.name.toLowerCase().slice(item.name.lastIndexOf(".")))
        );
      })
      .map((item) => {
        const versionToken = item.updatedAt ?? item.fileId ?? item.name;

        return {
          url: `${item.url}?tr=q-100&v=${encodeURIComponent(versionToken)}`,
        fileName: item.name,
        width: item.width,
        height: item.height,
        };
      });

    return images;
  } catch (error) {
    console.error(`[ImageKit] Failed to fetch images from ${folderPath}:`, error);
    return [];
  }
}

export async function fetchProjectImages(projectFolder: string): Promise<ProjectImage[]> {
  return unstable_cache(
    async () => fetchProjectImagesFromImageKit(projectFolder),
    [PROJECT_IMAGES_CACHE_PREFIX, projectFolder],
    {
      revalidate: 3600, // Cache for 1 hour
      tags: [getProjectImagesCacheTag(projectFolder)],
    }
  )();
}

/**
 * Fetch images for a project by its ID.
 * The project ID is used directly as the ImageKit folder name under /projects/.
 * Projects without a matching folder return [] gracefully.
 */
export async function fetchImagesForProject(
  projectId: string
): Promise<ProjectImage[]> {
  return fetchProjectImages(projectId);
}

export function invalidateProjectImages(projectFolder: string): void {
  revalidateTag(getProjectImagesCacheTag(projectFolder), "max");
}
