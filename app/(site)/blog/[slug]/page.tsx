import {
  AuthorInfo,
  CodeBlockEnhancer,
  ReadingProgress,
  TableOfContents,
  TagList,
} from "@/app/(site)/components/blog";
import { ArrowLeftIcon } from "@/app/(site)/components/svgs";
import Section from "@/app/(site)/components/ui/Section";
import { DEFAULT_METADATA } from "@/lib/constants";
import { getPostBySlug } from "@/lib/sanity";
import { extractHeadings, renderMarkdown } from "@/lib/utils/markdown";
import type { PostBySlugQueryResult } from "@/sanity/types";
import type { PageProps } from "@/types";
import "highlight.js/styles/github-dark.css";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

/**
 * Dynamic Route - Altijd live data ophalen
 * Er is geen generateStaticParams, dus alle routes zijn dynamic
 * Next.js zal posts on-demand genereren en cachen
 */
export const dynamic = "force-dynamic";

/**
 * No Caching - real-time updates
 * force-dynamic requiret revalidate: 0 (geen ISR caching)
 * Elke request haalt completely fresh data op
 */
export const revalidate = 0;

/**
 * Generate metadata for SEO
 * Note: Next.js automatically memoizes getPostBySlug() calls,
 * so this won't cause a duplicate fetch in the page component
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

  return {
    title: `${post.title || "Blog Post"} | ${DEFAULT_METADATA.siteName}`,
    description: post.excerpt || DEFAULT_METADATA.siteDescription,
    openGraph: {
      title: post.title || "Blog Post",
      description: post.excerpt || "Lees dit artikel over mijn stage ervaring.",
      type: "article",
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
    },
    twitter: {
      card: "summary_large_image",
      title: post.title || "Blog Post",
      description: post.excerpt || "Lees dit artikel over mijn stage ervaring.",
    },
  };
};

/**
 * Blog Post Detail Page
 *
 * Next.js automatically memoizes getPostBySlug() - the same request
 * in generateMetadata and this component results in only ONE fetch
 * during the same render pass. This is called "Request Memoization".
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

  return (
    <div className="bg-background relative min-h-screen pt-24 overflow-x-hidden">
      <ReadingProgress />
      <div className="max-w-7xl mx-auto p-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-6 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Terug naar blogs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Main Content */}
          <article>
            {/* <PostHeader post={post} /> */}

            {post.author && post.published_at && (
              <Link href="/about" className="cursor-pointer">
                <div className="mb-8">
                  <AuthorInfo
                    author={post.author}
                    publishedAt={post.published_at}
                  />
                </div>
              </Link>
            )}

            <div className="mb-8">
              <TagList tags={post.tags} />
            </div>

            <Section variant="ghost" className="p-0!">
              <div
                className="prose prose-invert prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              <CodeBlockEnhancer />
            </Section>
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </div>
    </div>
  );
}
