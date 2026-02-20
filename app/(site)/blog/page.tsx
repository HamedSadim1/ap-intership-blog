import type { Metadata } from "next";
import { getPosts, getTags } from "@/lib/sanity";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import TagFilter from "@/app/components/TagFilter";
import Link from "next/link";
import { AuthorInfo, TagList } from "@/app/(site)/components/blog";
import type { PageProps } from "@/types";
import { DEFAULT_METADATA } from "@/lib/constants";

/**
 * ISR Revalidate: 5 seconden
 * Next.js vereist literal value (geen import)
 * Met serverToken enabled in sanityFetch: real-time updates
 * Zie: lib/constants.ts voor gedeelde config
 */
export const revalidate = 5;

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
      <header className="text-center mb-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Stage Portfolio
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Mijn ervaringen, reflecties en groei tijdens de stageperiode
        </p>
      </header>

      {/* Tag Filter */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <TagFilter tags={tags} activeTag={tag} />
      </div>

      {/* Posts Grid */}
      <div className="max-w-6xl mx-auto px-4">
        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">
              Geen artikelen gevonden{tag ? ` voor tag "${tag}"` : ""}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <article
                key={post._id}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
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
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center">
                        <span className="text-white/40 text-4xl">📝</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Tags */}
                    <div className="mb-3">
                      <TagList
                        tags={post.tags?.slice(0, 2) || null}
                        variant="compact"
                        clickable={false}
                      />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-200 transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {/* Excerpt */}
                    <p className="text-white/60 text-sm line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
