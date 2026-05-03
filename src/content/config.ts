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
    faq: z.array(z.object({
      q: z.string().min(1),
      a: z.string().min(1),
    })).optional(),
  }),
});

const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    client: z.string(),
    clientUrl: z.string().url().optional(),
    sector: z.string(),
    problem: z.string(),
    approach: z.string(),
    result: z.string(),
    metric: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    coverImage: z.string().url().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, cases };
