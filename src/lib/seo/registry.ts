// SEO Route Registry — single source of truth for SEO entities

import { PROJECTS } from "@/data/projects.data";
import type { MetadataRoute } from "next";

export type ChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export interface RouteEntry {
  path: string;
  indexable: boolean;
  sitemapEligible: boolean;
  canonicalTarget?: string;
  changeFrequency: ChangeFrequency;
}

// Static Route Registry
export const ROUTE_REGISTRY: readonly RouteEntry[] = [
  {
    path: "/",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "weekly",
  },
  {
    path: "about",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "monthly",
  },
  {
    path: "contact",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "monthly",
  },
  {
    path: "experience",
    // Disabled — page not yet ready for public indexing.
    indexable: false,
    sitemapEligible: false,
    changeFrequency: "monthly",
  },
  {
    path: "projects",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "weekly",
  },
  {
    path: "services",
    // Cross-canonicalizes to /about; must not appear in the sitemap.
    indexable: false,
    sitemapEligible: false,
    canonicalTarget: "/about",
    changeFrequency: "monthly",
  },
  {
    path: "SumitResume.pdf",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "monthly",
  },
] as const;

// Returns a RouteEntry for every project in the data source.
export function getProjectRoutes(): RouteEntry[] {
  return PROJECTS.map((project) => ({
    path: `projects/${project.name.toLowerCase()}`,
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "monthly" as ChangeFrequency,
  }));
}

// Returns all routes that are eligible for inclusion in sitemap.xml.
export function getSitemapRoutes(): RouteEntry[] {
  const staticRoutes = ROUTE_REGISTRY.filter(
    (route) => route.indexable && route.sitemapEligible
  );
  return [...staticRoutes, ...getProjectRoutes()];
}

// Returns all routes that are publicly indexable
export function getIndexableStaticRoutes(): RouteEntry[] {
  return ROUTE_REGISTRY.filter((route) => route.indexable);
}
