import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../site.config';
import { getPublishedArticles } from '../lib/content';

export async function GET(context: APIContext) {
  const entries = await getPublishedArticles();
  return rss({
    title: `${site.name} — Articles`,
    description: site.description,
    site: context.site ?? site.url,
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.date,
      link: `/articles/${entry.id}/`,
      categories: entry.data.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
