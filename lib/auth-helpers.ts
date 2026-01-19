import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { auth } from "./auth";
import { headers } from "next/headers";

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_READWRITE_TOKEN,
});

/**
 * Server-side helper om de huidige gebruiker te verkrijgen
 * Gebruik alleen in Server Components of Server Actions
 */
export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user || null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Server-side helper om te checken of gebruiker admin is
 * Gebruikt Sanity als single source of truth
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    if (!user?.email) return false;

    // Check role in Sanity (single source of truth)
    const author = await sanityClient.fetch<{ role: string } | null>(
      `*[_type == "author" && email == $email][0]{role}`,
      { email: user.email },
    );

    return author?.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}

/**
 * Server-side helper om gebruikers role uit Sanity te halen
 */
export async function getUserRole(): Promise<"admin" | "user" | null> {
  try {
    const user = await getCurrentUser();
    if (!user?.email) return null;

    const author = await sanityClient.fetch<{ role: "admin" | "user" } | null>(
      `*[_type == "author" && email == $email][0]{role}`,
      { email: user.email },
    );

    return author?.role || null;
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}

/**
 * Server-side helper om volledige author data uit Sanity te halen
 */
export async function getAuthorFromSanity() {
  try {
    const user = await getCurrentUser();
    if (!user?.email) return null;

    const author = await sanityClient.fetch(
      `*[_type == "author" && email == $email][0]{
        _id,
        username,
        email,
        role,
        image,
        bio,
        github_url,
        createdAt
      }`,
      { email: user.email },
    );

    return author;
  } catch (error) {
    console.error("Error fetching author from Sanity:", error);
    return null;
  }
}

/**
 * Middleware helper voor protected routes
 * Gebruik in Server Components of Route Handlers
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Login required");
  }
  return user;
}

/**
 * Middleware helper voor admin-only routes
 * Gebruik in Server Components of Route Handlers
 */
export async function requireAdmin() {
  const user = await requireAuth();
  const adminStatus = await isAdmin();

  if (!adminStatus) {
    throw new Error("Forbidden: Admin access required");
  }

  return user;
}
