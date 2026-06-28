import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const itemLinkSchema = z.object({
  kind: z.enum(['site', 'repository', 'publication', 'credential', 'video', 'other']),
  label: z.string().min(1),
  url: z.string().url()
});

const itemAssetSchema = z.object({
  path: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
  credit: z.string().optional()
});

const itemRelationSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1)
});

const items = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/items' }),
  schema: z.object({
    title: z.string().min(1),
    type: z.enum([
      'project',
      'work',
      'education',
      'publication',
      'conference',
      'award',
      'course',
      'certification',
      'volunteering',
      'news'
    ]),
    summary: z.string().min(1),
    organization: z.string().optional(),
    location: z.string().optional(),
    dateStart: z.string().regex(/^\d{4}(-\d{2})?$/),
    dateEnd: z.union([z.literal('Present'), z.string().regex(/^\d{4}(-\d{2})?$/)]),
    highlights: z.array(z.string().min(1)).default([]),
    skills: z.array(z.string().min(1)).default([]),
    tags: z.array(z.string().min(1)).default([]),
    published: z.boolean().default(true),
    portfolio: z.boolean().default(true),
    timeline: z.boolean().default(false),
    featuredRank: z.number().int().min(1).max(3).optional(),
    links: z.array(itemLinkSchema).default([]),
    assets: z.array(itemAssetSchema).default([]),
    relations: z.array(itemRelationSchema).default([]),
    cvReview: z.array(z.enum(['engineering', 'academic', 'full'])).default([])
  })
});

const itemTranslations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/item-translations' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    highlights: z.array(z.string().min(1)).default([]),
    tags: z.array(z.string().min(1)).default([]),
    links: z.array(z.object({ label: z.string().min(1) })).default([])
  })
});

export const collections = { items, itemTranslations };
