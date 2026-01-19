"use server";

import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { revalidatePath } from "next/cache";

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_READWRITE_TOKEN,
});

interface GitHubUserData {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
  html_url?: string;
}

interface AuthActionResult {
  success: boolean;
  error?: string;
  authorId?: string;
}

/**
 * Sync GitHub user naar Sanity Author volgens AuthorType schema
 * @param userData - GitHub user data van Better Auth
 * @returns Result object met success status en eventuele errors
 */
export async function syncGitHubUserToAuthor(
  userData: GitHubUserData,
): Promise<AuthActionResult> {
  try {
    // Validatie van verplichte velden
    if (!userData.email || !userData.name) {
      return {
        success: false,
        error: "Email en name zijn verplicht",
      };
    }

    // Check of author al bestaat op basis van email
    const existingAuthor = await sanityClient.fetch<{ _id: string } | null>(
      `*[_type == "author" && email == $email][0]{_id}`,
      { email: userData.email },
    );

    if (existingAuthor) {
      // Author bestaat al, return het ID
      return {
        success: true,
        authorId: existingAuthor._id,
      };
    }

    // Genereer username slug
    const username = userData.name.toLowerCase().replace(/\s+/g, "-");

    // Upload avatar naar Sanity indien aanwezig
    let imageAsset = null;
    if (userData.avatar_url) {
      try {
        const imageResponse = await fetch(userData.avatar_url);
        const imageBuffer = await imageResponse.arrayBuffer();
        const uploadedImage = await sanityClient.assets.upload(
          "image",
          Buffer.from(imageBuffer),
          {
            filename: `${username}-avatar.jpg`,
          },
        );
        imageAsset = {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: uploadedImage._id,
          },
        };
      } catch (uploadError) {
        console.error("Error uploading avatar:", uploadError);
        // Continue zonder image als upload faalt
      }
    }

    // Maak nieuwe author aan volgens AuthorType schema
    const newAuthor = await sanityClient.create({
      _type: "author",
      username: userData.name,
      slug: {
        _type: "slug",
        current: username,
      },
      email: userData.email,
      role: "user", // Default role
      ...(imageAsset && { image: imageAsset }),
      ...(userData.html_url && { github_url: userData.html_url }),
      bio: `Geregistreerd via GitHub OAuth`,
      createdAt: new Date().toISOString(),
    });

    // Revalidate relevante paths
    revalidatePath("/");
    revalidatePath("/about");

    return {
      success: true,
      authorId: newAuthor._id,
    };
  } catch (error) {
    console.error("Error syncing GitHub user to Sanity:", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Er is een onverwachte fout opgetreden bij het opslaan van gebruikersdata",
    };
  }
}

/**
 * Verwijder user schema type dat we eerder hadden aangemaakt
 * We gebruiken nu het bestaande AuthorType schema
 */
export async function cleanupOldUserType(): Promise<void> {
  try {
    const oldUsers = await sanityClient.fetch(`*[_type == "user"]`);

    if (oldUsers.length > 0) {
      console.log(
        `Gevonden ${oldUsers.length} oude 'user' documents. Deze kunnen handmatig verwijderd worden via Sanity Studio.`,
      );
    }
  } catch (error) {
    console.error("Error checking old user types:", error);
  }
}
