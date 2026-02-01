import "server-only";

import { isAdmin, getUserRole, getAuthorFromSanity } from "@/lib/auth-helpers";

/**
 * Server Action om admin status te checken
 * Gebruik in Client Components met useTransition
 */
export async function checkIsAdmin(): Promise<boolean> {
  return await isAdmin();
}

/**
 * Server Action om gebruikers role op te halen
 */
export async function fetchUserRole(): Promise<"admin" | "user" | null> {
  return await getUserRole();
}

/**
 * Server Action om volledige author data op te halen
 */
export async function fetchAuthorData() {
  return await getAuthorFromSanity();
}
