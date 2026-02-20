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
      {post.featured_image && (
        <Image
          src={urlFor(post.featured_image).width(1200).height(600).url()}
          alt={post.title ?? "Post image"}
          width={1200}
          height={600}
          priority
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
        />
      )}

      <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>

      {/* {post.excerpt && (
        <p className="text-white/70 text-lg mb-6">{post.excerpt}</p>
      )} */}
    </header>
  );
}
