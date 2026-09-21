import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projectStatus = z.enum([
  'published',
  'in-progress',
  'coming-soon',
  'archived',
]);

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: projectStatus,
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    source_url: z.string().url().optional().or(z.literal('')),
    demo_url: z.string().url().optional().or(z.literal('')),
    article_url: z.string().url().optional().or(z.literal('')),
    image: z.string().optional().or(z.literal('')),
    image_alt: z.string().optional().or(z.literal('')),
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/writing',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    canonical_url: z.string().url().optional().or(z.literal('')),
    newsletter_issue: z.string().optional().or(z.literal('')),
  }),
});

export const collections = { projects, writing };
