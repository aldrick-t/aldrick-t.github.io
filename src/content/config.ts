import { defineCollection, z } from 'astro:content';

const contributorSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  email: z.string().email().optional(),
  githubUrl: z.string().url().optional(),
  linkedinUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional()
});

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
    contributors: z.array(contributorSchema).optional(),
    problem: z.string(),
    approach: z.string(),
    impact: z.array(z.string()).min(1),
    lessons: z.array(z.string()).min(1)
  })
});

export const collections = {
  projects
};
