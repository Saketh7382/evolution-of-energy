import type { MetadataRoute } from "next";
import { SITE_URL, SITE_INDEXING_ENABLED } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXING_ENABLED) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/academic-review/private/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
