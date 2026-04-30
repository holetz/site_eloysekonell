import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { remarkBlogDirectives } from './remark-blog-directives.mjs';

export default defineConfig({
  site: 'https://eloysekonell.com.br',
  outDir: './docs',
  build: {
    assets: '_astro',
  },
  markdown: {
    remarkPlugins: [remarkDirective, remarkBlogDirectives],
  },
});
