import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const itemLinkIconKeys = ['site', 'github', 'publication', 'credential', 'video', 'file', 'external', 'other'] as const;

const isRemoteOrItemPath = (value: string) => {
  if (value.startsWith('/items/')) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const itemLinkSchema = z.object({
  kind: z.enum(['site', 'repository', 'publication', 'credential', 'video', 'file', 'other']),
  label: z.string().min(1),
  url: z.string().min(1).refine(isRemoteOrItemPath, {
    message: 'Link URL must be an http(s) URL or a local /items/ path'
  }),
  icon: z.enum(itemLinkIconKeys).optional()
});

const itemAssetSchema = z.object({
  path: z.string().min(1),
  alt: z.string().min(1),
  caption: z.string().optional(),
  credit: z.string().optional()
});

const itemThumbnailSchema = z.object({
  path: z.string().min(1),
  alt: z.string().min(1),
  objectFit: z.enum(['cover', 'contain', 'fill', 'scale-down']).optional(),
  objectPosition: z.string().optional(),
  backgroundColor: z.string().regex(/^#[0-9a-fA-F]{6}$/).optional(),
  aspectRatio: z.string().regex(/^\d+(?:\.\d+)?\s*\/\s*\d+(?:\.\d+)?$/).optional()
});

const itemMediaThumbnailSchema = z.object({
  path: z.string().min(1),
  alt: z.string().min(1)
});

const itemMediaSchema = z.union([
  z.object({
    kind: z.literal('image'),
    path: z.string().min(1),
    alt: z.string().min(1),
    caption: z.string().optional(),
    credit: z.string().optional()
  }),
  z.object({
    kind: z.literal('youtube'),
    url: z.string().url(),
    title: z.string().min(1),
    caption: z.string().optional()
  }),
  z.object({
    kind: z.literal('video'),
    path: z.string().min(1),
    title: z.string().min(1),
    caption: z.string().optional(),
    poster: itemMediaThumbnailSchema.optional()
  }),
  z.object({
    kind: z.literal('pdf'),
    path: z.string().min(1).optional(),
    url: z.string().url().optional(),
    title: z.string().min(1),
    caption: z.string().optional(),
    thumbnail: itemMediaThumbnailSchema.optional()
  }).superRefine((media, context) => {
    if (Boolean(media.path) === Boolean(media.url)) {
      context.addIssue({
        code: 'custom',
        message: 'PDF media requires exactly one of path or url'
      });
    }
  }),
  z.object({
    kind: z.literal('file'),
    path: z.string().min(1),
    title: z.string().min(1),
    caption: z.string().optional(),
    thumbnail: itemMediaThumbnailSchema.optional()
  })
]);

const itemRelationSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1)
});

const itemCollaboratorSchema = z.object({
  name: z.string().trim().min(1),
  url: z.string().url().optional()
});

const items = defineCollection({
  loader: glob({ pattern: ['**/[^_]*.md', '!news/**'], base: './src/content/items' }),
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
      'volunteering'
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
    relevanceRank: z.number().int().min(1).optional(),
    links: z.array(itemLinkSchema).default([]),
    assets: z.array(itemAssetSchema).default([]),
    thumbnail: itemThumbnailSchema.optional(),
    media: z.array(itemMediaSchema).default([]),
    collaborators: z.array(itemCollaboratorSchema).default([]),
    relations: z.array(itemRelationSchema).default([]),
    relatedFallback: z.literal('skills').optional(),
    cvReview: z.array(z.enum(['engineering', 'academic', 'full'])).default([])
  })
});

const news = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/items/news' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    newsKind: z.enum(['post', 'entry']),
    datePosted: z.string().regex(/^\d{4}-\d{2}$/),
    published: z.boolean().default(true),
    relations: z.array(itemRelationSchema).default([])
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

const newsTranslations = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/news-translations' }),
  schema: z.object({
    title: z.string().min(1),
    summary: z.string().min(1)
  })
});

export const collections = { items, itemTranslations, news, newsTranslations };
