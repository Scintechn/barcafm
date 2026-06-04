import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { business } from "@/lib/business";
import { advertisers } from "@/lib/advertisers";

const STATIC_PATHS = [
  "",
  "/publicidade",
  "/anunciantes",
  "/programacao",
  "/contacto",
  "/privacidade",
  "/termos",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of STATIC_PATHS) {
      urls.push({
        url: `${business.siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
      });
    }
    for (const a of advertisers) {
      urls.push({
        url: `${business.siteUrl}/${locale}/anunciantes/${a.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return urls;
}
