/**
 * RelatedPostsSection - Section displaying related blog posts.
 *
 * Shows a header with "Ook interessant" title and a grid of related post cards.
 * Only renders when there are related posts available.
 *
 * @example
 * <RelatedPostsSection posts={relatedPosts} />
 */

import type { RelatedPostsQueryResult } from "@/sanity/types";
import { BlogCard } from "./BlogCard";

interface RelatedPostsSectionProps {
  /** Array of related posts to display */
  posts: RelatedPostsQueryResult;
}

export function RelatedPostsSection({ posts }: RelatedPostsSectionProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <span className="text-xl">📚</span>
        <h3 className="text-lg font-bold text-white uppercase tracking-wide">
          Ook interessant
        </h3>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((related, index) => (
          <BlogCard
            key={related._id}
            post={related}
            variant="related"
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
