// Locale integrity check:
//  - every locale has every page file
//  - structure (keys, array lengths, inline tag sets) matches English
//  - asset/link fields are untouched
//  - protected terms survive translation
//  - no leftover Devanagari in Bengali files (known TranslatePress defect)
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const LOCALES = ['en', 'es', 'fr', 'hi', 'ru', 'ar', 'zh', 'sw', 'pt', 'id', 'vi', 'bn', 'ur', 'fa', 'my', 'nl'];
const PAGES = ['home', 'about', 'training', 'research', 'stories', 'contact', 'ui'];
const ASSET_KEYS = new Set(['image', 'icon', 'video', 'pdf', 'href', 'cycleImage']);

let errors = 0;
const err = (m) => {
  console.error('ERROR', m);
  errors++;
};

function tagsOf(s) {
  return (String(s).match(/<([a-z]+)[\s>]/g) || []).map((t) => t.replace(/[<\s>]/g, '')).sort().join(',');
}

function compare(locale, page, base, loc, path) {
  if (Array.isArray(base)) {
    if (!Array.isArray(loc) || loc.length !== base.length) {
      err(`${locale}/${page} ${path}: array length ${loc?.length} != ${base.length}`);
      return;
    }
    base.forEach((v, i) => compare(locale, page, v, loc[i], `${path}[${i}]`));
    return;
  }
  if (base && typeof base === 'object') {
    for (const k of Object.keys(base)) {
      if (!(k in (loc ?? {}))) {
        err(`${locale}/${page} ${path}.${k}: missing key`);
        continue;
      }
      const keyName = k;
      if (ASSET_KEYS.has(keyName) && typeof base[k] === 'string') {
        if (loc[k] !== base[k]) err(`${locale}/${page} ${path}.${k}: asset/link changed ("${loc[k]}" != "${base[k]}")`);
      } else {
        compare(locale, page, base[k], loc[k], `${path}.${k}`);
      }
    }
    return;
  }
}

for (const locale of LOCALES) {
  for (const page of PAGES) {
    const f = join(ROOT, 'src/i18n', locale, `${page}.json`);
    if (!existsSync(f)) {
      err(`${locale}/${page}.json missing`);
      continue;
    }
    let data;
    try {
      data = JSON.parse(readFileSync(f, 'utf8'));
    } catch (e) {
      err(`${locale}/${page}.json invalid JSON: ${e.message}`);
      continue;
    }
    if (locale === 'en') continue;
    const base = JSON.parse(readFileSync(join(ROOT, 'src/i18n/en', `${page}.json`), 'utf8'));
    compare(locale, page, base, data, '');
    // Scan only translatable strings — asset/link values (already enforced identical
    // to English above) must not trigger protected-term false positives (e.g. the
    // English filename "overview_of_ccbt_qa.png" contains "cbt").
    const texts = [];
    (function collect(node, key) {
      if (typeof node === 'string') {
        if (!ASSET_KEYS.has(key)) texts.push(node);
        return;
      }
      if (Array.isArray(node)) node.forEach((v) => collect(v, key));
      else if (node && typeof node === 'object') for (const k of Object.keys(node)) collect(node[k], k);
    })(data, '');
    const all = texts.join('\n');
    // protected terms
    // \b so protected asset filenames like "overview_of_ccbt_qa.png" (present in en too) don't false-positive
    if (/\bCBT\b|terapia cognitivo/i.test(all.replace(/CBBT/g, ''))) err(`${locale}/${page}: suspicious CBT/therapy artifact`);
    if (/unfolding\s?word/i.test(all) && !all.includes('unfoldingWord') && !all.includes('unfoldingword.org'))
      err(`${locale}/${page}: unfoldingWord miscased`);
    // U+0964/U+0965 (danda, double danda) are pan-Indic punctuation shared by Bengali — not Hindi leftovers.
    if (locale === 'bn' && /[ऀ-ॣ०-ॿ]/.test(all)) err(`bn/${page}: Devanagari characters in Bengali file`);
  }
}

// untranslated-ratio report (string-equal to English)
console.log('\nUntranslated ratio (identical to English):');
for (const locale of LOCALES.filter((l) => l !== 'en')) {
  let same = 0,
    total = 0;
  for (const page of PAGES) {
    const f = join(ROOT, 'src/i18n', locale, `${page}.json`);
    if (!existsSync(f)) continue;
    const base = JSON.parse(readFileSync(join(ROOT, 'src/i18n/en', `${page}.json`), 'utf8'));
    const loc = JSON.parse(readFileSync(f, 'utf8'));
    (function walk(b, l, path) {
      if (typeof b === 'string') {
        const key = path.split('.').pop()?.replace(/\[\d+\]$/, '');
        if (ASSET_KEYS.has(key) || !/[a-zA-Z]{3,}/.test(b)) return;
        total++;
        if (b === l) same++;
        return;
      }
      if (Array.isArray(b)) b.forEach((v, i) => walk(v, l?.[i], `${path}[${i}]`));
      else if (b && typeof b === 'object') for (const k of Object.keys(b)) walk(b[k], l?.[k], `${path}.${k}`);
    })(base, loc, page);
  }
  console.log(`  ${locale}: ${((same / total) * 100).toFixed(1)}% (${same}/${total})`);
}

console.log(errors ? `\n${errors} error(s)` : '\nAll locale checks passed.');
process.exit(errors ? 1 : 0);
