import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * robots.txt configuratie — Next.js App Router convention
 *
 * Serveert als /robots.txt op het hoogste niveau.
 * Bepaalt welke paden crawlbaar zijn voor zoekmachines.
 *
 * Uitgesloten paden:
 * - /author — tijdelijke pagina, niet relevant voor SEO
 * - /studio — Sanity CMS backend, mag niet geïndexeerd worden
 * - /api/* — API routes hebben geen eigen content om te indexeren
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/author", "/studio", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
