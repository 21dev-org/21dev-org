import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://21dev.org',
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'zh-Hant',
        locales: {
          'zh-Hant': 'zh-Hant'
        }
      }
    })
  ],
  output: 'static',
  build: {
    assets: 'assets'
  }
});
