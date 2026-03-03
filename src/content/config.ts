import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    stack: z.array(z.string()).min(1),
    dateStart: z.string(),
    dateEnd: z.union([z.literal('Present'), z.string()]),
    githubUrl: z.string().url(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean(),
    order: z.number().int(),
    coverImage: z.string().optional(),
    problem: z.string(),
    approach: z.string(),
    impact: z.array(z.string()).min(1),
    lessons: z.array(z.string()).min(1)
  })
});

export const collections = {
  projects
};
