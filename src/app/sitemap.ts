import { MetadataRoute } from "next";
import { CREATIVE_NAMES } from "@/lib/colorNamesDictionary";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://24bitcolors.com";

  // Static Pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/diagnosis/logic`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/diagnosis/logic/algorithm`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/diagnosis/logic/oklch`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/diagnosis/logic/feedback`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic Pages (Color Groups)
  const groupRoutes: MetadataRoute.Sitemap = Object.values(CREATIVE_NAMES).map(
    (name) => {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      return {
        url: `${baseUrl}/result/${slug}`,
        lastModified: new Date(), // Could be static date or dynamic
        changeFrequency: "monthly",
        priority: 0.6,
      };
    }
  );

  return [...routes, ...groupRoutes];
}
