
import { defineQuery } from "next-sanity";

export const allPostsQuery = defineQuery(`*[_type == "post" && select(
    defined($tag) => $tag in tags[]->slug.current,
    true
  )] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featured_image,
  status,
  is_featured,
  published_at
  ,
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
  defineQuery(`*[_type == "post" && slug.current == $slug][0] {
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
