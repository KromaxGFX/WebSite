import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { BASE } from './src/lib/base.mjs';

export default defineConfig({
  site: 'https://kromaxgfx.github.io',
  base: BASE,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
      wrap: true,
    },
  },
  vite: {
    server: {
      headers: {
        'Permissions-Policy': 'interest-cohort=()',
      },
    },
  },
});