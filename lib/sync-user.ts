import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_READWRITE_TOKEN,
});

interface GitHubUser {
  name: string;
  email: string;
  image?: string;
  id: string;
}

export async function syncUserToSanity(user: GitHubUser) {
  try {
    const existingUser = await sanityClient.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email: user.email },
    );

    if (!existingUser) {
      await sanityClient.create({
        _type: "user",
        name: user.name,
        email: user.email,
        image: user.image,
        githubId: user.id,
      });
    }
  } catch (error) {
    console.error("Error syncing user to Sanity:", error);
    throw error;
  }
}
