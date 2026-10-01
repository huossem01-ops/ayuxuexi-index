import type { MetadataRoute } from "next";
import { absoluteUrl, publicRoutes } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/training"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/words"), changeFrequency: "monthly", priority: 0.9 },
    ...publicRoutes.map((path) => ({ url: absoluteUrl(path), changeFrequency: "monthly" as const, priority: path === "/guide" ? 0.8 : 0.7 })),
  ];
}
