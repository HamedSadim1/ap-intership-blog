import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

/**
 * Client met CDN voor snellere read operations
 * Perfect voor: public pages, listings, static generation
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // CDN voor betere performance
  perspective: "published",
  // CDN cache: ~60 seconden, past perfect bij onze ISR revalidate
  stega: false, // Disable Stega for production
});

/**
 * Client zonder CDN voor real-time data
 * Gebruik voor: mutations, admin pages, draft preview
 */
export const clientNoCache = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Altijd verse data
  perspective: "published",
  stega: false,
});
