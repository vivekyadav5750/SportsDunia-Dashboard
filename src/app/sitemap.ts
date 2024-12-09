import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sports-dunia-dashboard.vercel.app";

  const pages = [
    "",
    "dashboard",
    "dashboard/overview",
    "dashboard/articles",
    "dashboard/news-analytics",
    "dashboard/payout-details",
  ];

  const sitemap = pages.map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1.0 : 0.9,
  }));

  return sitemap;
}
