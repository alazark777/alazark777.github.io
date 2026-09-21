import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../site.config';
import { getPublishedWriting } from '../lib/content';

export async function GET(context: APIContext) {
  const entries = await getPublishedWriting();
  return rss({
    title: `${site.name} — Writing`,
    description: site.description,
    site: context.site ?? site.url,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/writing/${entry.id}/`,
      categories: entry.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
