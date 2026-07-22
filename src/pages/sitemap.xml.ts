import type { APIRoute } from 'astro';
import { locales, localePath, pageSlugs } from '../i18n/config';

export const GET: APIRoute = ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const urls = pageSlugs
    .map((slug) => {
      const alts = locales
        .map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l.tag}" href="${base}${localePath(l.code, slug)}"/>`
        )
        .join('\n');
      return locales
        .map(
          (l) => `  <url>
    <loc>${base}${localePath(l.code, slug)}</loc>
${alts}
  </url>`
        )
        .join('\n');
    })
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`,
    { headers: { 'content-type': 'application/xml' } }
  );
};
