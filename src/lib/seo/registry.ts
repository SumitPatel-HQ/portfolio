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
  priority: number;
}

// Static Route Registry
export const ROUTE_REGISTRY: readonly RouteEntry[] = [
  {
    path: "/",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    path: "/about",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/contact",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/experience",
    // Disabled — page not yet ready for public indexing.
    indexable: false,
    sitemapEligible: false,
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/projects",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    path: "/services",
    // Cross-canonicalizes to /about; must not appear in the sitemap.
    indexable: false,
    sitemapEligible: false,
    canonicalTarget: "/about",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    path: "/SumitResume.pdf",
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "monthly",
    priority: 0.8,
  },
] as const;

// Returns a RouteEntry for every project in the data source.
export function getProjectRoutes(): RouteEntry[] {
  return PROJECTS.map((project) => ({
    path: `/projects/${project.name.toLowerCase()}`,
    indexable: true,
    sitemapEligible: true,
    changeFrequency: "monthly" as ChangeFrequency,
    priority: 0.8,
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
