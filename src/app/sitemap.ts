import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ["", "monthly", 1], ["/book", "yearly", .9], ["/explore", "yearly", .9],
    ["/explore/reality", "yearly", .75], ["/explore/understanding", "yearly", .75],
    ["/explore/difference-and-relation", "yearly", .75], ["/explore/change", "yearly", .75],
    ["/explore/development", "yearly", .75], ["/explore/participation", "yearly", .75],
    ["/author", "yearly", .8], ["/academic-review", "monthly", .8],
    ["/academic-review/request", "yearly", .5], ["/academic-review/respond", "yearly", .5],
    ["/academic-review/review-copy-terms", "yearly", .5], ["/get-the-book", "monthly", .8],
    ["/contact", "yearly", .4], ["/privacy", "yearly", .3], ["/terms", "yearly", .3],
  ] as const;
  return routes.map(([route, changeFrequency, priority]) => ({ url: `${SITE_URL}${route}`, changeFrequency, priority }));
}
