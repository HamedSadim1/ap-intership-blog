import {
  AuthorInfo,
  BackToTopButton,
  CodeBlockEnhancer,
  PostHeader,
  ReadingProgress,
  TableOfContents,
  TagList,
} from "@/app/(site)/components/blog";
import { ArrowLeftIcon, CalendarIcon, ChevronDownIcon, ClockIcon } from "@/app/(site)/components/svgs";
import Section from "@/app/(site)/components/ui/Section";
import { DEFAULT_METADATA } from "@/lib/constants";
import { getPostBySlug, getRelatedPosts } from "@/lib/sanity";
import { extractHeadings, renderMarkdown } from "@/lib/utils/markdown";
import { formatDate } from "@/lib/utils/date";
import { estimateReadingTime } from "@/lib/utils/reading-time";
import { urlFor } from "@/sanity/lib/image";
import type { PostBySlugQueryResult } from "@/sanity/types";
import type { PageProps } from "@/types";
import "highlight.js/styles/github-dark.css";
import type { Metadata } from "next";
import Image from "next/image";
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
/** Mobile ToC met collapsible toggle */
function MobileTocToggle({ headings }: { headings: { level: number; text: string; id: string }[] }) {
  return (
    <details className="lg:hidden mb-8 group">
      <summary className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20 cursor-pointer text-white font-medium flex items-center gap-2 hover:bg-white/15 transition-colors list-none">
        <span>📑</span>
        <span>Inhoudsopgave</span>
        <ChevronDownIcon className="w-4 h-4 ml-auto transition-transform group-open:rotate-180" />
      </summary>
      <nav className="mt-2 backdrop-blur-md bg-white/5 rounded-xl p-4 border border-white/10">
        <ul className="space-y-2">
          {headings.map(({ level, text, id }) => (
            <li key={id} style={{ marginLeft: `${(level - 2) * 0.75}rem` }}>
              <a
                href={`#${id}`}
                className="text-white/70 hover:text-white text-sm transition-colors block py-1"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}

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
  const tagSlugs =
    post.tags?.map((t) => t.slug?.current).filter(Boolean) as string[] ?? [];
  const relatedPosts = await getRelatedPosts(post._id, tagSlugs);

  return (
    <div className="bg-background relative min-h-screen pt-24 overflow-x-clip">
      <ReadingProgress />
      <div className="max-w-7xl mx-auto p-4">
        <div className="lg:flex lg:gap-8">
          {/* Main Content */}
          <article className="animate-fade-in lg:flex-1 lg:min-w-0">
            {/* Post Header - Featured image, title, excerpt */}
            <PostHeader post={post} />

            {/* Meta: auteur, datum en leestijd */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-8 pb-8 border-b border-white/10 animate-fade-in">
              {post.author && post.published_at && (
                <Link href="/about" className="cursor-pointer shrink-0">
                  <AuthorInfo
                    author={post.author}
                    publishedAt={post.published_at}
                  />
                </Link>
              )}
              <div className="flex items-center gap-4 ml-auto">
                <span className="text-white/40 text-sm flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4" />
                  {readingTime}
                </span>
                {post.published_at && (
                  <span className="text-white/40 text-sm flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    {formatDate(post.published_at)}
                  </span>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8 animate-fade-in">
              <TagList tags={post.tags} />
            </div>

            {/* Mobile ToC toggle */}
            {headings.length > 0 && (
              <MobileTocToggle headings={headings} />
            )}

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
        {relatedPosts.length > 0 && (
          <section className="mt-16 animate-fade-in">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xl">📚</span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                You might also like
              </h3>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related, index) => {
                const relatedReadingTime = estimateReadingTime(related.body);
                return (
                  <article
                    key={related._id}
                    className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ease-[var(--ease-out)] hover:shadow-2xl hover:-translate-y-2 hover:shadow-purple-500/20 animate-card flex flex-col"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Link
                      href={`/blog/${related.slug?.current}`}
                      className="flex flex-col h-full cursor-pointer"
                    >
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        {related.featured_image ? (
                          <Image
                            src={urlFor(related.featured_image)
                              .width(600)
                              .height(338)
                              .url()}
                            alt={related.title ?? "Related post"}
                            width={600}
                            height={338}
                            className="w-full h-full object-cover transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 flex items-center justify-center">
                            <span className="text-white/30 text-4xl">📝</span>
                          </div>
                        )}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Tags */}
                        <div className="flex items-center mb-2">
                          <TagList
                            tags={related.tags?.slice(0, 2) || null}
                            variant="compact"
                            clickable={false}
                          />
                        </div>

                        {/* Title */}
                        <h4 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-200 group-hover:to-pink-200 group-hover:bg-clip-text">
                          {related.title}
                        </h4>

                        {/* Excerpt */}
                        {related.excerpt && (
                          <p className="text-white/50 text-sm line-clamp-2">
                            {related.excerpt}
                          </p>
                        )}

                        {/* Footer — pinned to bottom */}
                        <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                          <span className="flex items-center gap-1.5 text-white/50 text-xs">
                            <ClockIcon className="w-3 h-3" />
                            {relatedReadingTime}
                          </span>
                          <span className="text-cyan-300 group-hover:text-cyan-200 transition-colors duration-200 text-sm font-semibold tracking-wide">
                            Continue reading →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {/* Back to blogs button — at the very bottom */}
        <div className="mt-12 text-center animate-fade-in">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-[color,gap] duration-200 hover:gap-3 cursor-pointer group"
          >
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowLeftIcon className="h-4 w-4" />
            </span>
            Terug naar blogs
          </Link>
        </div>
      </div>

      {/* Back to top button (mobile) */}
      <BackToTopButton />
    </div>
  );
}
