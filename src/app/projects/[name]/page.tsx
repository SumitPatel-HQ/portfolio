import { notFound, redirect } from "next/navigation";
import { PROJECTS } from "@/data/projects.data";
import { fetchImagesForProject } from "@/lib/imagekit-server";
import { MobileProjectDetailLayout } from "@/components/mobile/projects/MobileProjectDetailLayout";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const project = PROJECTS.find((p) => p.name.toLowerCase() === decodedName.toLowerCase());
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `Sumit Patel | ${project.name}`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  
  // SEO Best Practice: Enforce lowercase URLs via 301 redirect
  if (decodedName !== decodedName.toLowerCase()) {
    redirect(`/projects/${decodedName.toLowerCase()}`);
  }

  const projectIndex = PROJECTS.findIndex((p) => p.name.toLowerCase() === decodedName);
  
  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];

  // Fetch images for this project
  const images = await fetchImagesForProject(project.imageFolder);
  const projectWithImages = {
    ...project,
    imageUrls: images.map((img) => img.url),
  };

  return (
    <>
      <div className="block md:hidden">
        <MobileProjectDetailLayout project={projectWithImages} />
      </div>
    </>
  );
}
