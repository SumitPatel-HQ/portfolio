import { notFound, redirect } from "next/navigation";
import { PROJECTS } from "@/data/projects.data";
import { fetchImagesForProject } from "@/lib/imagekit-server";
import { MobileProjectDetailLayout } from "@/components/mobile/projects/MobileProjectDetailLayout";
import { ProjectsPageClient, ProjectWithImages } from "../ProjectsPageClient";
import {
  resolveProjectOgImage,
  buildOgMetadata,
  buildTwitterMetadata,
} from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const project = PROJECTS.find((p) => p.name.toLowerCase() === decodedName.toLowerCase());
  if (!project) return { title: "Project Not Found" };

  const ogImage = resolveProjectOgImage(project.name);
  const ogOptions = {
    title: `Sumit Patel | ${project.name}`,
    description: project.description,
    path: `/projects/${project.name.toLowerCase()}`,
    image: ogImage,
  };

  return {
    title: ogOptions.title,
    description: ogOptions.description,
    alternates: {
      canonical: `/projects/${project.name.toLowerCase()}`,
    },
    openGraph: buildOgMetadata(ogOptions),
    twitter: buildTwitterMetadata(ogOptions),
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

  // Fetch images for the single project (mobile detail view)
  const images = await fetchImagesForProject(project.imageFolder);
  const projectWithImages = {
    ...project,
    imageUrls: images.map((img) => img.url),
  };

  // Fetch images for all projects (desktop showcase)
  const projectsWithImages: ProjectWithImages[] = await Promise.all(
    PROJECTS.map(async (p) => {
      const imgs = await fetchImagesForProject(p.imageFolder);
      return {
        ...p,
        imageUrls: imgs.map((img) => img.url),
      };
    })
  );

  return (
    <>
      <div className="hidden md:block">
        <ProjectsPageClient projects={projectsWithImages} initialName={decodedName} />
      </div>
      <div className="block md:hidden">
        <MobileProjectDetailLayout project={projectWithImages} />
      </div>
    </>
  );
}
