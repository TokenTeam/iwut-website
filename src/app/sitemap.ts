import type { MetadataRoute } from "next";
import { legalDocuments } from "@/lib/legal-docs";

const siteUrl = "https://iwut.tokenteam.net";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...legalDocuments.map((document) => ({
      url: `${siteUrl}/legal/${document.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
