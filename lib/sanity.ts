import "server-only";

import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import {
  allPostsQuery,
  postBySlugQuery,
  allTagsQuery,
  relatedPostsQuery,
} from "@/sanity/lib/queries";
import {
  AllPostsQueryResult,
  PostBySlugQueryResult,
  AllTagsQueryResult,
  RelatedPostsQueryResult,
} from "@/sanity/types";

/**
 * getPostsStatic - Build-time safe version for generateStaticParams
 *
 * Gebruikt directe client calls zonder draft mode.
 * ALLEEN gebruiken in generateStaticParams!
 */
export async function getPostsStatic() {
  const data = await client.fetch<AllPostsQueryResult>(allPostsQuery, {
    tag: null as unknown as undefined,
  });
  return data;
}

/**
 * getPosts - Fetch alle posts from Sanity CMS
 *
 * Uses Live Content API with serverToken for real-time tagged updates.
 * next-sanity automatically caches responses and revalidates only when
 * the requested content actually changes (not on a time interval).
 *
 * @param tag - Optionele tag slug om posts te filteren
 * @returns Promise met posts data
 */
export async function getPosts(tag?: string | null) {
  const { data } = await sanityFetch({
    query: allPostsQuery,
    params: { tag: tag ?? null } as unknown as { tag: undefined },
  });
  return data;
}

/**
 * getPostBySlug - Fetch een specifieke post by slug
 *
 * Uses Live Content API with serverToken for real-time tagged updates.
 * Changes to this post automatically trigger revalidation.
 *
 * @param slug - De unieke slug van de post
 * @returns Promise met post data of null
 */
export async function getPostBySlug(slug: string) {
  const { data } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
  });
  return data;
}

/**
 * getTags - Fetch alle tags from Sanity CMS
 *
 * Uses Live Content API with serverToken for real-time tagged updates.
 * Changes to tags automatically trigger revalidation.
 *
 * @returns Promise met tags array
 */
export async function getTags() {
  const { data } = await sanityFetch({
    query: allTagsQuery,
  });
  return data;
}

/**
 * getRelatedPosts - Fetch gerelateerde posts op basis van gedeelde tags
 *
 * Vindt maximaal 3 posts die minimaal één tag delen met de huidige post,
 * gesorteerd op publicatiedatum (nieuwste eerst).
 * Excludeert de huidige post via _id.
 *
 * @param currentId - _id van de huidige post (wordt uitgesloten)
 * @param tagSlugs - Array van tag slug strings van de huidige post
 * @param limit - Maximaal aantal resultaten (default: 3)
 * @returns Promise met gerelateerde posts
 */
export async function getRelatedPosts(
  currentId: string,
  tagSlugs: string[],
  limit = 3,
): Promise<RelatedPostsQueryResult> {
  if (tagSlugs.length === 0) return [];
  const data = await client.fetch<RelatedPostsQueryResult>(
    relatedPostsQuery,
    { currentId, tagSlugs, limit },
  );
  return data;
}

/**
 * Type exports voor fetch return types
 * Gebruik deze types voor type-safe component props
 */
export type PostsData = AllPostsQueryResult;
export type PostData = PostBySlugQueryResult;
export type TagsData = AllTagsQueryResult;
export type RelatedPost = NonNullable<
  Awaited<ReturnType<typeof getRelatedPosts>>[number]
>;
