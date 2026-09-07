import type { MetadataRoute } from "next";
import { SITE_URL, SITE_IS_LIVE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_IS_LIVE) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/academic-review/private/"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
