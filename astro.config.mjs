import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eloysekonell.com.br',
  outDir: './docs',
  build: {
    assets: '_astro',
  },
});
