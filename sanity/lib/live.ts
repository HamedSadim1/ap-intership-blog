// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from "./client";

// Keep live previewing disabled to avoid React 19 compatibility issues
// Instead, use ISR with short revalidate time (5 seconds) for near-real-time updates
export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: false, // Keep disabled for compatibility
  browserToken: false, // Keep disabled for client-side compatibility
});
