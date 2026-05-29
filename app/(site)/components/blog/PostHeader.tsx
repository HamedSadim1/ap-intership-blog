import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PostBySlugQueryResult } from "@/sanity/types";

interface PostHeaderProps {
  post: NonNullable<PostBySlugQueryResult>;
}

/**
 * PostHeader - Hero section for blog post detail pages
 *
 * Displays featured image, title, and excerpt in a consistent hero layout.
 */
export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-8">
      {/* Featured image with gradient overlay */}
      {post.featured_image && (
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <Image
            src={urlFor(post.featured_image).width(1200).height(600).url()}
            alt={post.title ?? "Post image"}
            width={1200}
            height={600}
            priority
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>
      )}

      {/* Title with gradient effect */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
        <span className="bg-linear-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
          {post.title}
        </span>
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-white/70 text-lg md:text-xl leading-relaxed">
          {post.excerpt}
        </p>
      )}
    </header>
  );
}
