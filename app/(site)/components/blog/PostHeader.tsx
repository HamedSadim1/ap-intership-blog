import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { PostBySlugQueryResult } from "@/sanity/types";

interface PostHeaderProps {
  post: NonNullable<PostBySlugQueryResult>;
}

/**
 * PostHeader - Hero section for blog post detail pages.
 *
 * Displays featured image with gradient overlay, title with gradient text effect,
 * excerpt, and an optional "Uitgelicht" badge for featured posts.
 */
export function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-8 animate-fade-in">
      {/* Featured image with layered gradient overlay */}
      {post.featured_image && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-2xl group/image bg-black/20">
          <Image
            src={urlFor(post.featured_image).width(1200).height(675).url()}
            alt={post.title ?? "Post image"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-contain transition-transform duration-700 ease-out group-hover/image:scale-105"
          />
          {/* Multi-layer gradient overlay for depth */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-pink-500/10" />

          {/* Featured badge */}
          {post.is_featured && (
            <span className="absolute top-4 left-4 bg-linear-to-r from-yellow-400 to-amber-500 text-black text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              ★ Uitgelicht
            </span>
          )}
        </div>
      )}

      {/* Title with subtle gradient text effect */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight">
        <span className="bg-linear-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
          {post.title}
        </span>
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-3xl">
          {post.excerpt}
        </p>
      )}
    </header>
  );
}
