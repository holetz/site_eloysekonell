import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    deck: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverImage: z.string().url().optional(),
    ogImage: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    readingTime: z.string(),
    draft: z.boolean().default(false),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
