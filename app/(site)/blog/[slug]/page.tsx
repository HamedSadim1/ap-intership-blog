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
import { getPostBySlug } from "@/lib/sanity";
import { extractHeadings, renderMarkdown } from "@/lib/utils/markdown";
import { formatDate } from "@/lib/utils/date";
import { estimateReadingTime } from "@/lib/utils/reading-time";
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

  return (
    <div className="bg-background relative min-h-screen pt-24 overflow-x-hidden">
      <ReadingProgress />
      <div className="max-w-7xl mx-auto p-4">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mb-6 text-sm text-white/60 hover:text-white transition-all duration-300 hover:gap-3 cursor-pointer group"
        >
          <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ArrowLeftIcon className="h-4 w-4" />
          </span>
          Terug naar blogs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
          {/* Main Content */}
          <article className="animate-fade-in">
            {/* Post Header - Featured image, title, excerpt */}
            <PostHeader post={post} />

            {/* Meta: auteur, datum en leestijd */}
            <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-white/10">
              {post.author && post.published_at && (
                <Link href="/about" className="cursor-pointer">
                  <AuthorInfo
                    author={post.author}
                    publishedAt={post.published_at}
                  />
                </Link>
              )}
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-white/50 text-sm flex items-center gap-1.5">
                <ClockIcon className="w-4 h-4" />
                {readingTime}
              </span>
              {post.published_at && (
                <span className="text-white/50 text-sm flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4" />
                  {formatDate(post.published_at)}
                </span>
              )}
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
              <CodeBlockEnhancer />
            </Section>

            {/* Back to top */}
            <div className="mt-12 text-center animate-fade-in">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Terug naar alle blogs
              </Link>
            </div>
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <TableOfContents headings={headings} readingTime={readingTime} />
          </aside>
        </div>
      </div>

      {/* Back to top button (mobile) */}
      <BackToTopButton />
    </div>
  );
}
