// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readdirSync, readFileSync } from 'node:fs';
import { SITE, CATEGORIES } from './src/site.config.ts';

// Category index pages with no published articles are marked noindex, so keep them out of the sitemap too.
const articleDir = new URL('./src/content/articles/', import.meta.url);
const liveCategories = new Set(
  readdirSync(articleDir)
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => readFileSync(new URL(f, articleDir), 'utf8'))
    .filter((src) => !/^draft:\s*true/m.test(src))
    .map((src) => src.match(/^category:\s*['"]?([a-z0-9-]+)/m)?.[1])
    .filter(Boolean),
);
const emptyCategoryPaths = CATEGORIES.filter((c) => !liveCategories.has(c.slug)).map((c) => `${SITE.url}/${c.slug}/`);

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404') && !emptyCategoryPaths.includes(page),
    }),
  ],
});
