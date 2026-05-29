import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatTime } from "@/lib/utils";
import type { PostBySlugQueryResult } from "@/sanity/types";

type Author = NonNullable<PostBySlugQueryResult>["author"];
type PublishedAt = string;

/**
 * Props voor AuthorInfo component
 * @property author - Sanity author object (kan null zijn — component toont dan niets)
 * @property publishedAt - ISO datum string voor publicatie datum
 * @property compact - Compacte weergave voor blog cards (default: false)
 */
interface AuthorInfoProps {
  author: Author;
  publishedAt: PublishedAt;
  compact?: boolean;
}

/**
 * AuthorInfo - Weergave van auteur avatar, naam en publicatie datum
 *
 * Herbruikbaar voor zowel blog cards (compact mode) als post detail pagina's.
 * Toont automatisch niets als er geen auteur is (guard clause).
 *
 * @example
 * // Post detail (vol formaat)
 * <AuthorInfo author={post.author} publishedAt={post.published_at} />
 *
 * @example
 * // Blog card (compact)
 * <AuthorInfo author={post.author} publishedAt={post.published_at} compact />
 */
export function AuthorInfo({
  author,
  publishedAt,
  compact = false,
}: AuthorInfoProps) {
  if (!author) return null;

  const avatarSize = compact ? 32 : 48;
  const textSize = compact ? "text-sm" : "text-base";

  return (
    <div className="flex items-center gap-3">
      {author.image && (
        <Image
          src={urlFor(author.image).width(avatarSize).height(avatarSize).url()}
          alt={author.username ?? "Author"}
          width={avatarSize}
          height={avatarSize}
          className="rounded-full"
        />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
        <span className={`text-white/80 ${textSize}`}>{author.username}</span>
        <span className={`text-white/60 ${textSize}`}>
          {formatTime(publishedAt)}
        </span>
      </div>
    </div>
  );
}
