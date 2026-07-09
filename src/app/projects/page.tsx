import { PROJECTS } from "@/data/projects.data";
import { fetchImagesForProject } from "@/lib/imagekit-server";
import { ProjectsPageClient, ProjectWithImages } from "./ProjectsPageClient";
import { MobileProjectsPage } from "@/components/mobile/projects/MobileProjectsPage";

export const metadata = {
  title: "Sumit Patel | Projects ",
  description: "Explore a collection of projects built by Sumit Patel, showcasing work across AI applications, full-stack development, and real-world engineering solutions.",
};

// Revalidate this static page every hour (3600 seconds) so it occasionally picks up code/data changes
export const revalidate = 3600;

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

  return (
    <>
      <div className="hidden md:block">
        <ProjectsPageClient projects={projectsWithImages} />
      </div>
      <div className="block md:hidden">
        <MobileProjectsPage projects={projectsWithImages} />
      </div>
    </>
  );
}
