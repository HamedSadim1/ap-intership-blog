import type { Metadata } from "next";
import { getPosts, getTags } from "@/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import TagFilter from "@/app/components/TagFilter";
import Link from "next/link";
import { AuthorInfo, TagList } from "@/app/(site)/components/blog";
import { ClockIcon } from "@/app/(site)/components/svgs";
import type { PageProps } from "@/types";
import { DEFAULT_METADATA } from "@/lib/constants";
import { getRelativeTime } from "@/lib/utils/date";
import { estimateReadingTime } from "@/lib/utils/reading-time";

const SEVEN_DAYS_AGO = Date.now() - 7 * 24 * 60 * 60 * 1000;

/**
 * Live Content API with smart tag-based revalidation
 * revalidate: 3600 (1 hour) is a fallback - actual revalidation happens when content changes
 */
export const revalidate = 3600;

/**
 * Generate metadata for blog listing page
 */
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const tag = resolvedSearchParams?.tag as string | undefined;

  return {
    title: tag
      ? `${tag} Posts | ${DEFAULT_METADATA.blogTitle}`
      : DEFAULT_METADATA.blogTitle,
    description: tag
      ? `Alle artikelen met tag: ${tag}`
      : DEFAULT_METADATA.siteDescription,
  };
}

/**
 * Blog Listing Page
 *
 * Supports tag filtering via searchParams
 * Uses Promise.all for parallel data fetching
 */
export default async function BlogPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const tag = resolvedSearchParams?.tag as string | undefined;

  const [posts, tags] = await Promise.all([
    getPosts(tag || undefined),
    getTags(),
  ]);

  return (
    <div className="bg-background relative min-h-screen pt-24 pb-16 overflow-x-hidden">
      {/* Header Section */}
      <header className="text-center mb-12 px-4 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          <span className="bg-linear-to-r from-yellow-200 via-pink-200 to-cyan-200 bg-clip-text text-transparent gradient-text-shimmer">
            Stage Portfolio
          </span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Mijn ervaringen, reflecties en groei tijdens de stageperiode
        </p>
        <div className="mt-6 mx-auto w-24 h-1 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full" />
      </header>

      {/* Tag Filter */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <TagFilter tags={tags} activeTag={tag} />
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4">
        {posts.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <div className="text-6xl mb-6">🔍</div>
            <p className="text-white/60 text-lg">
              Geen artikelen gevonden{tag ? ` voor tag "${tag}"` : ""}.
            </p>
            <p className="text-white/40 text-sm mt-2">
              Probeer een andere tag of kom later terug.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => {
              const isNew = post.published_at
                ? new Date(post.published_at).getTime() > SEVEN_DAYS_AGO
                : false;

              return (
              <article
                key={post._id}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-[transform,box-shadow] duration-300 ease-[var(--ease-out)] hover:shadow-2xl hover:-translate-y-2 hover:shadow-purple-500/20 animate-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Link
                  href={`/blog/${post.slug?.current}`}
                  className="block cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    {post.featured_image ? (
                      <Image
                        src={urlFor(post.featured_image)
                          .width(800)
                          .height(450)
                          .url()}
                        alt={post.title ?? "Post image"}
                        width={800}
                        height={450}
                        priority={index < 3}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                        <span className="text-white/30 text-5xl">📝</span>
                      </div>
                    )}
                    {isNew && (
                      <span className="absolute top-3 right-3 bg-linear-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-scale-in">
                        Nieuw!
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Tags */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <TagList
                        tags={post.tags?.slice(0, 2) || null}
                        variant="compact"
                        clickable={false}
                      />
                      <span className="text-white/40 text-xs whitespace-nowrap flex items-center gap-1">
                        <ClockIcon className="w-3.5 h-3.5" />
                        {estimateReadingTime(post.body)}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-200 group-hover:to-pink-200 group-hover:bg-clip-text transition-colors duration-200">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {/* Excerpt */}
                    <p className="text-white/60 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {post.published_at && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-white/40 text-xs">{getRelativeTime(post.published_at)}</span>
                        {isNew && (
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/10">
                      {post.author && post.published_at && (
                        <AuthorInfo
                          author={post.author}
                          publishedAt={post.published_at}
                          compact
                        />
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
