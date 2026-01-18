import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "username",
      title: "Username",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "username",
      },
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      options: {
        list: [
          { title: "Admin", value: "admin" },
          { title: "Editor", value: "editor" },
          { title: "User", value: "user" },
        ],
      },
      initialValue: "user",
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "linkedin_url",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "github_url",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "portfolio_url",
      title: "Portfolio URL",
      type: "url",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "markdown",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "username",
      subtitle: "email",
      media: "image",
    },
  },
});
