// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Enable Live Content API with serverToken for real-time tagged updates
// next-sanity automatically handles cache invalidation based on content changes
// Public content: serverToken enables live updates without auth complexity
// See: https://www.sanity.io/docs/content-lake/live-content-api
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_API_TOKEN || false, // Only on production
  browserToken: false, // Keep disabled for client-side compatibility
});
