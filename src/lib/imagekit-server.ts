import ImageKit from "@imagekit/nodejs";
import { env } from "./env";

const SUPPORTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"];

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

/**
 * Fetch all images from a project folder.
 * Uses assets.list() from ImageKit SDK v7.5.0
 */
export async function fetchProjectImages(
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
      .filter((item): item is import("@imagekit/nodejs/resources/files/files.js").File & { name: string; url: string } => {
        return (
          "url" in item && 
          typeof item.url === "string" &&
          typeof item.name === "string" &&
          SUPPORTED_EXTENSIONS.includes(item.name.toLowerCase().slice(item.name.lastIndexOf(".")))
        );
      })
      .map((item) => ({
        url: `${item.url}?tr=q-100`,
        fileName: item.name,
        width: item.width,
        height: item.height,
      }));

    return images;
  } catch (error) {
    console.error(`[ImageKit] Failed to fetch images from ${folderPath}:`, error);
    return [];
  }
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
