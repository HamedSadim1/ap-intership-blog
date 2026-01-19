import "server-only";

import { sanityFetch } from "@/sanity/lib/live";
import {
  allPostsQuery,
  postBySlugQuery,
  allTagsQuery,
} from "@/sanity/lib/queries";
import {
  AllPostsQueryResult,
  PostBySlugQueryResult,
  AllTagsQueryResult,
} from "@/sanity/types";

/**
 * getPosts - Fetch alle posts from Sanity CMS
 *
 * Haalt alle posts op van Sanity CMS met optionele tag filtering.
 * Gebruikt sanityFetch voor live updates en type-safe results.
 *
 * @param tag - Optionele tag slug om posts te filteren
 * @returns Promise met posts data en metadata
 *
 * @example
 * ```tsx
 * // In een Server Component
 * const { data: posts } = await getPosts();
 *
 * // Met tag filtering
 * const { data: posts } = await getPosts("typescript");
 * ```
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
 * Haalt een enkele post op op basis van de slug parameter.
 * Retourneert null als de post niet gevonden wordt.
 *
 * @param slug - De unieke slug van de post
 * @returns Promise met post data of null
 *
 * @example
 * ```tsx
 * // In een Server Component
 * const { data: post } = await getPostBySlug("mijn-eerste-post");
 *
 * if (!post) {
 *   notFound();
 * }
 * ```
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
 * Haalt alle beschikbare tags op gesorteerd op naam.
 * Gebruikt voor tag filtering en navigatie.
 *
 * @returns Promise met tags array
 *
 * @example
 * ```tsx
 * // In een Server Component
 * const { data: tags } = await getTags();
 *
 * // Gebruik in een component
 * <TagFilter tags={tags} />
 * ```
 */
export async function getTags() {
  const { data } = await sanityFetch({
    query: allTagsQuery,
  });
  return data;
}

/**
 * Type exports voor fetch return types
 * Gebruik deze types voor type-safe component props
 */
export type PostsData = AllPostsQueryResult;
export type PostData = PostBySlugQueryResult;
export type TagsData = AllTagsQueryResult;
