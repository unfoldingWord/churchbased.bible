// Verify every internal href/src/poster in the built site resolves to a file
// in dist/, and that lang/dir/hreflang are correct on every page.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { load } from 'cheerio';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const RTL = new Set(['ar', 'ur', 'fa']);
const LOCALES = ['en', 'es', 'fr', 'hi', 'ru', 'ar', 'zh', 'sw', 'pt', 'id', 'vi', 'bn', 'ur', 'fa', 'my', 'nl'];

let errors = 0;
const err = (m) => {
  console.error('ERROR', m);
  errors++;
};

function* htmlFiles(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (f.endsWith('.html')) yield p;
  }
}

function resolves(url) {
  const clean = decodeURIComponent(url.split('#')[0].split('?')[0]);
  if (!clean.startsWith('/')) return true;
  const p = join(DIST, clean);
  if (existsSync(p)) return true;
  if (clean.endsWith('/') && existsSync(join(p, 'index.html'))) return true;
  if (existsSync(p + '/index.html')) return true;
  // _redirects targets
  const redirects = readFileSync(join(DIST, '_redirects'), 'utf8');
  if (redirects.split('\n').some((l) => l.trim().startsWith(clean + ' '))) return true;
  return false;
}

let pages = 0;
for (const file of htmlFiles(DIST)) {
  pages++;
  const rel = file.slice(DIST.length);
  const $ = load(readFileSync(file, 'utf8'));

  // lang/dir sanity
  const m = rel.match(/^\/([a-z]{2})\//);
  const locale = m && LOCALES.includes(m[1]) ? m[1] : 'en';
  if (!rel.endsWith('404.html')) {
    const lang = $('html').attr('lang') || '';
    if (!lang.startsWith(locale)) err(`${rel}: <html lang="${lang}"> for locale ${locale}`);
    const dir = $('html').attr('dir') || 'ltr';
    if (RTL.has(locale) !== (dir === 'rtl')) err(`${rel}: dir="${dir}" wrong for ${locale}`);
    const hreflangs = $('link[rel=alternate][hreflang]').length;
    if (hreflangs !== LOCALES.length + 1) err(`${rel}: ${hreflangs} hreflang links (want ${LOCALES.length + 1})`);
  }

  for (const [sel, attr] of [
    ['a', 'href'],
    ['img', 'src'],
    ['video', 'src'],
    ['video', 'poster'],
    ['link[rel=stylesheet]', 'href'],
    ['script', 'src'],
  ]) {
    $(sel).each((_, el) => {
      const v = $(el).attr(attr);
      if (v && !resolves(v)) err(`${rel}: broken ${attr} → ${v}`);
    });
  }
}
console.log(`${pages} pages scanned. ${errors ? errors + ' error(s)' : 'All links OK.'}`);
process.exit(errors ? 1 : 0);
