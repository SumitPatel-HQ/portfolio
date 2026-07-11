// sitemap.xml — delegates to SEO Route Registry (do not add URLs manually)

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getSitemapRoutes } from "@/lib/seo/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return getSitemapRoutes().map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
