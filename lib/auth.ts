import { betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_READWRITE_TOKEN,
});

export const auth = betterAuth({
  // Stateless sessions - geen database nodig voor auth
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 dagen
    },
  },

  // GitHub OAuth configuratie
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  // After hook voor user sync na sign-up/sign-in
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      console.log("=== After hook triggered ===");
      console.log("Path:", ctx.path);

      // Trigger voor OAuth callback endpoints (path is /callback/:id)
      if (ctx.path === "/callback/:id") {
        const newSession = ctx.context.newSession;

        console.log("OAuth callback detected!");
        console.log("New session exists:", !!newSession);
        console.log("New session user:", newSession?.user);

        if (newSession?.user) {
          const user = newSession.user;

          console.log("Starting GitHub user sync to Sanity...");
          console.log("User email:", user.email);
          console.log("User name:", user.name);
          console.log("User image:", user.image);

          try {
            // Check of author al bestaat
            const existingAuthor = await sanityClient.fetch<{
              _id: string;
              username: string;
              email: string;
            } | null>(
              `*[_type == "author" && email == $email][0]{_id, username, email}`,
              { email: user.email },
            );

            if (existingAuthor) {
              console.log(`✅ Author already exists in Sanity:`);
              console.log(`   ID: ${existingAuthor._id}`);
              console.log(`   Username: ${existingAuthor.username}`);
              console.log(`   Email: ${existingAuthor.email}`);
              console.log(
                `   Check Sanity Studio at: http://localhost:3000/studio`,
              );
              return;
            }

            // Genereer username slug
            const username = user.name.toLowerCase().replace(/\s+/g, "-");

            // Bepaal role - check tegen environment variable
            const adminEmails =
              process.env.ADMIN_EMAILS?.split(",").map((e) =>
                e.trim().toLowerCase(),
              ) || [];
            const role = adminEmails.includes(user.email.toLowerCase())
              ? "admin"
              : "user";

            // Upload avatar naar Sanity indien aanwezig
            let imageAsset = null;
            if (user.image) {
              try {
                const imageResponse = await fetch(user.image);
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
                console.log("Avatar uploaded successfully");
              } catch (uploadError) {
                console.error("Error uploading avatar:", uploadError);
              }
            }

            // Maak nieuwe author aan volgens AuthorType schema
            const newAuthor = await sanityClient.create({
              _type: "author",
              username: user.name,
              slug: {
                _type: "slug",
                current: username,
              },
              email: user.email,
              role: role,
              ...(imageAsset && { image: imageAsset }),
              github_url: `https://github.com/${username}`,
              bio: `Geregistreerd via GitHub OAuth`,
              createdAt: new Date().toISOString(),
            });

            console.log(`✅ New author created with ID: ${newAuthor._id}`);
            console.log(`   Role: ${role}`);
          } catch (error) {
            console.error("!!! Error syncing user to Sanity !!!", error);
            if (error instanceof Error) {
              console.error("Error message:", error.message);
              console.error("Error stack:", error.stack);
            }
          }
        } else {
          console.log("No new session user found");
        }
      }
    }),
  },
});
