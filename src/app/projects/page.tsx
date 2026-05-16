import { PROJECTS } from "@/data/projects.data";
import { fetchImagesForProject } from "@/lib/imagekit-server";
import { ProjectsPageClient, ProjectWithImages } from "./ProjectsPageClient";

export const metadata = {
  title: "Projects | Sumit Patel",
  description: "A showcase of my recent work in engineering, design, and AI.",
};

export default async function ProjectsPage() {
  // Fetch all images for all projects at build time (Next.js will cache these)
  const projectsWithImages: ProjectWithImages[] = await Promise.all(
    PROJECTS.map(async (project) => {
      const images = await fetchImagesForProject(project.imageFolder);
      return {
        ...project,
        imageUrls: images.map((img) => img.url),
      };
    })
  );

  return <ProjectsPageClient projects={projectsWithImages} />;
}
