import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aldrick-t.github.io',
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })]
});
