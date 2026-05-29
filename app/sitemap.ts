import "server-only";
import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { client } from "@/sanity/lib/client";

/**
 * Dynamische sitemap — Next.js App Router convention
 *
 * Serveert als /sitemap.xml en bevat:
 * - Statische routes: home (/), blog listing (/blog), over mij (/about)
 * - Dynamische routes: alle gepubliceerde blog posts (/blog/[slug])
 *
 * Uitgesloten routes (via robots.txt of noindex):
 * - /author — tijdelijk, niet relevant
 * - /studio — Sanity CMS backend
 *
 * Blog post data wordt rechtstreeks uit Sanity gehaald met een
 * minimale query die enkel slug en publicatiedatum ophaalt.
 * De CDN-client wordt gebruikt voor optimale performance.
 *
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ============================================================
  // Statische routes
  // ============================================================

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // ============================================================
  // Dynamische blog post routes
  // ============================================================

  interface SitemapPost {
    slug: string | null;
    _updatedAt: string;
  }

  const posts: SitemapPost[] = await client.fetch(
    `*[_type == "post" && status == "published" && defined(slug.current)] | order(published_at desc) {
      "slug": slug.current,
      _updatedAt,
    }`,
  );

  const blogRoutes: MetadataRoute.Sitemap = posts
    .filter((post): post is SitemapPost & { slug: string } => post.slug !== null)
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post._updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...blogRoutes];
}
