import "server-only";

import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
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
 * Type exports voor fetch return types
 * Gebruik deze types voor type-safe component props
 */
export type PostsData = AllPostsQueryResult;
export type PostData = PostBySlugQueryResult;
export type TagsData = AllTagsQueryResult;
