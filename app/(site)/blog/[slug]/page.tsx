import {
  BackToBlogsLink,
  BackToTopButton,
  CodeBlockEnhancer,
  MobileTocToggle,
  PostHeader,
  PostMeta,
  ReadingProgress,
  RelatedPostsSection,
  TableOfContents,
  TagList,
} from "@/app/(site)/components/blog";
import Section from "@/app/(site)/components/ui/Section";
import { DEFAULT_METADATA, SITE_URL } from "@/lib/constants";
import { urlFor } from "@/sanity/lib/image";
import { getPostBySlug, getRelatedPosts } from "@/lib/sanity";
import { extractHeadings, renderMarkdown } from "@/lib/utils/markdown";
import { extractTagSlugs } from "@/lib/utils/array";
import { estimateReadingTime } from "@/lib/utils/reading-time";
import {
  generateArticleSchema,
  generateBreadcrumbSchema,
} from "@/lib/json-ld";
import type { PostBySlugQueryResult } from "@/sanity/types";
import type { PageProps } from "@/types";
import { PageLayout } from "@/app/(site)/components/ui";
import "highlight.js/styles/github-dark.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/**
 * Dynamic Route — Altijd live data ophalen
 *
 * Er is geen generateStaticParams, dus alle routes zijn dynamic.
 * Next.js zal posts on-demand genereren zonder pre-rendering.
 */
export const dynamic = "force-dynamic";

/**
 * Caching uitgeschakeld voor real-time content updates
 *
 * force-dynamic vereist revalidate: 0 (geen ISR caching).
 * Elke request haalt verse data op van Sanity.
 * @see ISR_REVALIDATE_TIME in @/lib/constants
 */
export const revalidate = 0;

/**
 * Genereer metadata voor SEO (per post)
 *
 * Next.js memoiseert getPostBySlug() automatisch — dezelfde aanroep
 * in generateMetadata en de page component resulteert in slechts ÉÉN fetch
 * tijdens dezelfde render pass (Request Memoization).
 *
 * @param params - URL parameters met de post slug
 * @returns Metadata object met titel, beschrijving, Open Graph en Twitter cards
 */
export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const ogImageUrl = post.featured_image
    ? urlFor(post.featured_image).width(1200).height(630).url()
    : "/icon.png";

  return {
    title: `${post.title || "Blog Post"} | ${DEFAULT_METADATA.siteName}`,
    description: post.excerpt || DEFAULT_METADATA.siteDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title || "Blog Post",
      description: post.excerpt || "Lees dit artikel over mijn stage ervaring.",
      type: "article",
      url: canonicalUrl,
      publishedTime: post.published_at || undefined,
      authors: post.author?.username ? [post.author.username] : undefined,
      tags: post.tags
        ?.map(
          (
            tag: NonNullable<
              NonNullable<PostBySlugQueryResult>["tags"]
            >[number],
          ) => tag.name,
        )
        .filter(Boolean) as string[] | undefined,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title || "Blog Post",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "Blog Post",
      description: post.excerpt || "Lees dit artikel over mijn stage ervaring.",
      images: [ogImageUrl],
    },
  };
};

/**
 * Blog Post Detail Page — Toont een volledige blog post
 *
 * Laadt de post op basis van de slug parameter, rendert de markdown content
 * met syntax highlighting, toont een inhoudsopgave en gerelateerde posts.
 *
 * @param params - Next.js page props met de slug uit de URL
 * @returns Volledige blog post pagina met header, content, TOC en related posts
 * @throws notFound() als de slug ongeldig is of de post niet bestaat
 */
export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  // This fetch is automatically deduplicated with generateMetadata
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderMarkdown(post.body || "");
  const headings = extractHeadings(post.body || "");
  const readingTime = estimateReadingTime(post.body);

  // Fetch related posts based on shared tags
  const tagSlugs = extractTagSlugs(post.tags);
  const relatedPosts = await getRelatedPosts(post._id, tagSlugs);

  const canonicalUrl = `${SITE_URL}/blog/${slug}`;

  return (
    <PageLayout className="pb-0 overflow-x-clip">
      {/* JSON-LD: Article schema voor Google Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateArticleSchema({
              headline: post.title || "",
              description: post.excerpt || undefined,
              imageUrl: post.featured_image
                ? urlFor(post.featured_image).width(1200).height(675).url()
                : undefined,
              datePublished: post.published_at || new Date().toISOString(),
              dateModified: undefined, // _updatedAt niet beschikbaar in huidige query
              authorName: post.author?.username || "Hamed Sadim",
              authorUrl: post.author?.slug?.current
                ? `${SITE_URL}/author`
                : undefined,
              canonicalUrl,
              tags: post.tags
                ?.map((t) => t.name)
                .filter(Boolean) as string[] | undefined,
            }),
          ),
        }}
      />
      {/* JSON-LD: BreadcrumbList voor navigatiepad */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { position: 1, name: "Home", item: SITE_URL },
              { position: 2, name: "Blog", item: `${SITE_URL}/blog` },
              {
                position: 3,
                name: post.title || "Blog Post",
                item: canonicalUrl,
              },
            ]),
          ),
        }}
      />
      <ReadingProgress />
      <div className="max-w-7xl mx-auto p-4">
        <div className="lg:flex lg:gap-8">
          {/* Main Content */}
          <article className="lg:flex-1 lg:min-w-0">
            {/* Post Header - Featured image, title, excerpt */}
            <PostHeader post={post} />

            {/* Meta: auteur, datum en leestijd */}
            <PostMeta
              author={post.author}
              publishedAt={post.published_at}
              readingTime={readingTime}
            />

            {/* Tags */}
            <div className="mb-8">
              <TagList tags={post.tags} />
            </div>

            {/* Mobile ToC toggle */}
            <MobileTocToggle headings={headings} />

            {/* Content */}
            <Section variant="ghost" className="p-0!">
              <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              <CodeBlockEnhancer slug={slug} />
            </Section>


          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block lg:w-[280px] lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <TableOfContents headings={headings} readingTime={readingTime} />
            </div>
          </aside>
        </div>

        {/* Related Posts */}
        <RelatedPostsSection posts={relatedPosts} />

        {/* Back to blogs link */}
        <BackToBlogsLink />
      </div>

      {/* Back to top button (mobile) */}
      <BackToTopButton />
    </PageLayout>
  );
}
