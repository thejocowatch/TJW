import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date().optional(),
    summary: z.string().optional(),
  }),
});

export const collections = {
  'posts': postsCollection,
};
