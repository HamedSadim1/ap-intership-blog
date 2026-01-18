import { defineField, defineType } from "sanity";

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tag Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      title: "Kleur",
      type: "string", // Dit activeert de color picker!
      options: {
        list: [
          { title: "🔵 Blauw", value: "#3B82F6" },
          { title: "🟢 Groen", value: "#10B981" },
          { title: "🔴 Rood", value: "#EF4444" },
          { title: "🟡 Amber", value: "#F59E0B" },
          { title: "🟣 Paars", value: "#8B5CF6" },
          { title: "🩷 Roze", value: "#EC4899" },
          { title: "🟠 Oranje", value: "#F97316" },
          { title: "💙 Cyaan", value: "#06B6D4" },
          { title: "💚 Emerald", value: "#059669" },
          { title: "💜 Indigo", value: "#6366F1" },
          { title: "🧡 Lime", value: "#84CC16" },
          { title: "❤️ Rose", value: "#F43F5E" },
        ],
        layout: "radio", // Of 'dropdown' voor compactere weergave
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      color: "color",
    },
    prepare(selection) {
      const { title, color } = selection;
      return {
        title: title,
        subtitle: color, // Toont hex code als subtitle
      };
    },
  },
});
