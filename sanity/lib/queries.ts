import { defineQuery } from "next-sanity";

export const allPostsQuery =
  defineQuery(`*[_type == "post" && status == "published" && select(
    defined($tag) => $tag in tags[]->slug.current,
    true
  )] | order(published_at desc) {
  _id,
  title,
  slug,
  excerpt,
  featured_image,
  status,
  is_featured,
  published_at,
  body,
  author-> {
    _id,
    username,
    slug,
    image,
  },
  tags[]-> {
    _id,
    name,
    slug,
  },
}`);

export const postBySlugQuery =
  defineQuery(`*[_type == "post" && slug.current == $slug && status == "published"][0] {
  _id,
  title,
  slug,
  excerpt,
  body,
  featured_image,
  status,
  is_featured,
  published_at,
  author-> {
    _id,
    username,
    slug,
    image,
},

  tags[]-> {
    _id,
    name,
    slug,
},
}`);

export const allTagsQuery = defineQuery(`*[_type == "tag"] | order(name asc) {
  _id,
  name,
  slug,
}`);

export const relatedPostsQuery =
  defineQuery(`*[_type == "post" && status == "published" && _id != $currentId && count((tags[]->slug.current)[@ in $tagSlugs]) > 0] | order(published_at desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  featured_image,
  published_at,
  body,
  author-> {
    _id,
    username,
    slug,
    image,
  },
  tags[]-> {
    _id,
    name,
    slug,
  },
}`);
