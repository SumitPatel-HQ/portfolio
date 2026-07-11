import type { MetadataRoute } from "next";
import { ROBO_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${ROBO_URL}/sitemap.xml`,
    host: ROBO_URL,
  };
}
