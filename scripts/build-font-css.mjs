// Generate per-script webfont CSS into public/fonts/.
//
// Why this exists: every page is built from the same Astro module graph (one
// route file per page, locale supplied by getStaticPaths), so Vite cannot split
// bundled font CSS per locale — importing all the Noto faces in the layout put
// ~250 KB of @font-face rules (92% of it Noto Sans SC's ~200 subset rules) into
// a render-blocking stylesheet on all 16 locales, including English.
//
// Instead we emit one stylesheet per script and let Base.astro <link> only the
// one the current locale needs. Run by `npm run dev` / `npm run build`
// (pre-scripts); the output is gitignored.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/fonts');
const FILES_OUT = join(OUT, 'files');

// script key -> fontsource package + weights. Keys match the :lang() rules in
// src/styles/global.css and the `script` field in src/i18n/config.ts.
const PACKS = {
  arabic: { pkg: '@fontsource/noto-sans-arabic', weights: [400, 600] },
  nastaliq: { pkg: '@fontsource/noto-nastaliq-urdu', weights: [400, 600] },
  devanagari: { pkg: '@fontsource/noto-sans-devanagari', weights: [400, 600] },
  bengali: { pkg: '@fontsource/noto-sans-bengali', weights: [400, 600] },
  myanmar: { pkg: '@fontsource/noto-sans-myanmar', weights: [400, 600] },
  han: { pkg: '@fontsource/noto-sans-sc', weights: [400, 600] },
};

rmSync(OUT, { recursive: true, force: true });
mkdirSync(FILES_OUT, { recursive: true });

const summary = [];
for (const [script, { pkg, weights }] of Object.entries(PACKS)) {
  const pkgDir = join(ROOT, 'node_modules', pkg);
  let css = weights.map((w) => readFileSync(join(pkgDir, `${w}.css`), 'utf8')).join('\n');

  // Copy only the font files this CSS references, and point at their new home.
  const referenced = new Set();
  css = css.replace(/url\(\.\/files\/([^)]+)\)/g, (_, file) => {
    referenced.add(file);
    return `url(/fonts/files/${file})`;
  });
  for (const file of referenced) {
    copyFileSync(join(pkgDir, 'files', file), join(FILES_OUT, file));
  }

  writeFileSync(join(OUT, `${script}.css`), css);
  summary.push({
    script,
    kb: Math.round(css.length / 1024),
    faces: (css.match(/@font-face/g) || []).length,
    files: referenced.size,
  });
}

for (const s of summary) {
  console.log(
    `  ${s.script.padEnd(11)} ${String(s.kb).padStart(4)} KB  ${String(s.faces).padStart(3)} faces  ${s.files} files`
  );
}
console.log(`Wrote ${summary.length} font stylesheets to public/fonts/.`);
