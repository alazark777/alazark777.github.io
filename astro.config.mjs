// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { site } from './src/site.config.ts';

// https://astro.build/config
export default defineConfig({
  site: site.url,
  base: site.base || undefined,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [mdx(), sitemap()],
});
