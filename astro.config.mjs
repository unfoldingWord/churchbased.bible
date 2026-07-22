import { defineConfig } from 'astro/config';

// URL scheme matches the old TranslatePress site exactly:
// English at /, every other locale at /{lang}/ — no SEO loss on cutover.
export default defineConfig({
  site: 'https://churchbased.bible',
  devToolbar: { enabled: false },
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: [
      'en', 'es', 'fr', 'hi', 'ru', 'ar', 'zh', 'sw',
      'pt', 'id', 'vi', 'bn', 'ur', 'fa', 'my', 'nl',
    ],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
