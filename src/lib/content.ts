import { getCollection, type CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;
export type WritingEntry = CollectionEntry<'writing'>;

/**
 * Returns non-draft projects sorted by date (newest first).
 */
export async function getPublishedProjects(): Promise<ProjectEntry[]> {
  const entries = await getCollection('projects', ({ data }) => !data.draft);
  return entries.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

/**
 * Returns featured non-draft projects (up to `limit`).
 */
export async function getFeaturedProjects(
  limit = 3,
): Promise<ProjectEntry[]> {
  const projects = await getPublishedProjects();
  const featured = projects.filter((p) => p.data.featured);
  if (featured.length > 0) {
    return featured.slice(0, limit);
  }
  return projects.slice(0, limit);
}

/**
 * Returns non-draft writing sorted by date (newest first).
 */
export async function getPublishedWriting(): Promise<WritingEntry[]> {
  const entries = await getCollection('writing', ({ data }) => !data.draft);
  return entries.sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

/**
 * Formats a date for display.
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Estimates reading time from markdown/MDX body text.
 */
export function estimateReadingMinutes(body: string | undefined): number {
  if (!body) return 1;
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
