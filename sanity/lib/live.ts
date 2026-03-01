// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Enable serverToken for real-time live updates with SANITY_READWRITE_TOKEN
// Combines ISR (1 second revalidate) with live preview for instant content updates
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: process.env.SANITY_READWRITE_TOKEN || false, // Real-time updates
  browserToken: false, // Keep disabled for client-side compatibility
});
