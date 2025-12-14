import { MetadataRoute } from "next";
import { CREATIVE_NAMES } from "@/lib/colorNamesDictionary";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://24bitcolors.com";
  const locales = routing.locales;

  const routes: MetadataRoute.Sitemap = [];

  // Helper to add route for all locales
  const addRoute = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly"
  ) => {
    // Add default (root) or pure path if strategy requires it,
    // but typically strict localized sitemaps list exact URLs.
    // For now we assume /{locale}/{path} structure.

    locales.forEach((locale) => {
      routes.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      });
    });
  };

  // 1. Static Pages
  addRoute("", 1, "weekly"); // Home
  addRoute("/about", 0.8, "monthly");
  addRoute("/diagnosis/logic", 0.8, "monthly");
  addRoute("/diagnosis/logic/algorithm", 0.7, "monthly");
  addRoute("/diagnosis/logic/oklch", 0.7, "monthly");
  addRoute("/diagnosis/logic/feedback", 0.6, "monthly");
  addRoute("/privacy", 0.5, "yearly");
  addRoute("/terms", 0.5, "yearly");
  addRoute("/contact", 0.5, "yearly");

  // 2. Dynamic Pages (Color Groups)
  const groupRoutes: MetadataRoute.Sitemap = [];
  const creativeNames = Object.values(CREATIVE_NAMES);

  creativeNames.forEach((name) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    locales.forEach((locale) => {
      groupRoutes.push({
        url: `${baseUrl}/${locale}/result/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    });
  });

  return [...routes, ...groupRoutes];
}
