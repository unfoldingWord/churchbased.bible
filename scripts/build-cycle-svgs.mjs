// Generate localized versions of the Training page's CBBT-cycle graphic.
//
// The source SVG (public/images/uploads/2024/11/ilab_cycle_graphic_final_w_fonts.svg)
// has its labels converted to letter-outline paths, so localization means:
//   1. strip the letter/ampersand glyph paths (digits 01–05 and all ring/arrow
//      artwork are kept untouched),
//   2. lay the translated labels back in as real <text> on circular textPaths,
//      using geometry measured from the original render (ring centre 589.5,748.7;
//      colored band r≈316–475; segment spans measured per arc).
//
// Output: public/images/cycle/{locale}.svg (committed). TrainingPage.astro
// picks the file by locale. Run: node scripts/build-cycle-svgs.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = join(ROOT, 'public/images/uploads/2024/11/ilab_cycle_graphic_final_w_fonts.svg');
const OUT = join(ROOT, 'public/images/cycle');

// ---------------------------------------------------------------------------
// Geometry (SVG user units, measured from the original render).
// Angles are compass degrees: 0 = north, clockwise positive.
const CX = 589.5;
const CY = 748.7;

// Per-arc text placement. `from`/`to` bound the usable text arc in compass
// degrees, walking in reading order — so for 04 (bottom) they descend, which
// makes the text read left→right with glyph tops toward the centre instead of
// upside-down, matching the original.
//
// The bounds keep clear of both ends of each arrow: the arrowhead at the start
// and the number badge at the end. Badge positions were read straight out of
// the source SVG's digit outlines (compass): 02 at 36–40°, 03 at 127–132°,
// 04 at 215–220°, 05 at 306–312°; each badge is ~14° wide, so the text stops
// ~8° short of it.
const ARCS = {
  '02': { from: 325, to: 388, rTwo: [434, 384], rOne: [408] }, // 325°→28°
  '03': { from: 57, to: 118, rTwo: [434, 384], rOne: [408] },
  '04': { from: 205, to: 151, rTwo: [368, 418], rOne: [394] }, // descends
  '05': { from: 237, to: 297, rTwo: [434, 384], rOne: [408] },
};
const CENTER_TEXT = { x: CX, baselines: [758, 797], fontSize: 31 };
const ARC_FONT_SIZE = 31.7;
// Fraction of the available arc the longest line may occupy.
const ARC_FILL = 0.97;
// Width available to the centre "01" label (user units, inside the inner disc).
const CENTER_WIDTH = 190;

// ---------------------------------------------------------------------------
// Label translations. 01 renders as centred straight lines; 02–05 curve along
// their arcs (1 or 2 lines). Digits are part of the artwork and never change.
const LABELS = {
  en: {
    '01': ['Capacity', 'Building'],
    '02': ['Community Engagement &', 'Conversational Drafting'],
    '03': ['Review by QA Community'],
    '04': ['Regional Church', 'Leader Authentication'],
    '05': ['Iterative Publication', '& Revision'],
  },
  es: {
    '01': ['Desarrollo de', 'capacidades'],
    '02': ['Participación comunitaria y', 'redacción conversacional'],
    '03': ['Revisión por la comunidad de calidad'],
    '04': ['Autenticación por líderes', 'de iglesias regionales'],
    '05': ['Publicación iterativa', 'y revisión'],
  },
  fr: {
    '01': ['Renforcement', 'des capacités'],
    '02': ['Engagement communautaire et', 'rédaction conversationnelle'],
    '03': ['Révision par la communauté qualité'],
    '04': ['Authentification des responsables', 'd’églises régionaux'],
    '05': ['Publication itérative', 'et révision'],
  },
  hi: {
    '01': ['क्षमता', 'निर्माण'],
    '02': ['सामुदायिक सहभागिता और', 'संवादात्मक प्रारूपण'],
    '03': ['गुणवत्ता समुदाय द्वारा समीक्षा'],
    '04': ['क्षेत्रीय कलीसिया अगुवों', 'द्वारा प्रमाणीकरण'],
    '05': ['चरणबद्ध प्रकाशन', 'और संशोधन'],
  },
  ru: {
    '01': ['Развитие', 'потенциала'],
    '02': ['Вовлечение общины и', 'разговорный черновик'],
    '03': ['Проверка сообществом качества'],
    '04': ['Утверждение региональными', 'церковными лидерами'],
    '05': ['Поэтапная публикация', 'и доработка'],
  },
  ar: {
    '01': ['بناء', 'القدرات'],
    '02': ['مشاركة المجتمع', 'والصياغة الحوارية'],
    '03': ['مراجعة مجتمع ضمان الجودة'],
    '04': ['مصادقة قادة الكنائس', 'الإقليميين'],
    '05': ['نشر تكراري', 'ومراجعة'],
  },
  zh: {
    '01': ['能力', '培养'],
    '02': ['社区参与和', '口语化初稿'],
    '03': ['质量保证社区审核'],
    '04': ['区域教会领袖认证'],
    '05': ['迭代出版', '与修订'],
  },
  sw: {
    '01': ['Kujenga', 'Uwezo'],
    '02': ['Ushirikishwaji wa jamii na', 'uandishi wa mazungumzo'],
    '03': ['Mapitio na jumuiya ya ubora'],
    '04': ['Uthibitisho wa viongozi', 'wa kanisa wa kanda'],
    '05': ['Uchapishaji hatua kwa hatua', 'na masahihisho'],
  },
  pt: {
    '01': ['Desenvolvimento', 'de capacidades'],
    '02': ['Engajamento comunitário e', 'redação conversacional'],
    '03': ['Revisão pela comunidade de qualidade'],
    '04': ['Autenticação por líderes', 'regionais de igrejas'],
    '05': ['Publicação iterativa', 'e revisão'],
  },
  id: {
    '01': ['Pengembangan', 'Kapasitas'],
    '02': ['Keterlibatan komunitas dan', 'penyusunan draf percakapan'],
    '03': ['Tinjauan oleh komunitas mutu'],
    '04': ['Pengesahan pemimpin', 'gereja regional'],
    '05': ['Publikasi bertahap', 'dan revisi'],
  },
  vi: {
    '01': ['Xây dựng', 'năng lực'],
    '02': ['Sự tham gia của cộng đồng và', 'soạn thảo theo lối đối thoại'],
    '03': ['Duyệt xét bởi cộng đồng thẩm định'],
    '04': ['Xác nhận bởi lãnh đạo', 'hội thánh khu vực'],
    '05': ['Xuất bản từng bước', 'và hiệu đính'],
  },
  bn: {
    '01': ['সক্ষমতা', 'গঠন'],
    '02': ['সম্প্রদায়ের অংশগ্রহণ ও', 'কথোপকথনমূলক খসড়া'],
    '03': ['মান যাচাই সম্প্রদায়ের পর্যালোচনা'],
    '04': ['আঞ্চলিক মণ্ডলীর নেতাদের', 'অনুমোদন'],
    '05': ['ধাপে ধাপে প্রকাশনা', 'ও সংশোধন'],
  },
  ur: {
    '01': ['استعداد', 'سازی'],
    '02': ['برادری کی شرکت اور', 'گفتگو پر مبنی مسودہ'],
    '03': ['معیار کی جانچ برادری کا جائزہ'],
    '04': ['علاقائی کلیسیائی رہنماؤں', 'کی توثیق'],
    '05': ['مرحلہ وار اشاعت', 'اور نظرثانی'],
  },
  fa: {
    '01': ['ظرفیت‌سازی'],
    '02': ['مشارکت جامعه و', 'پیش‌نویس گفتگومحور'],
    '03': ['بازبینی توسط جامعهٔ تضمین کیفیت'],
    '04': ['تأیید رهبران', 'کلیساهای منطقه‌ای'],
    '05': ['انتشار مرحله‌ای', 'و بازنگری'],
  },
  my: {
    '01': ['စွမ်းရည်', 'မြှင့်တင်ခြင်း'],
    '02': ['အသိုင်းအဝိုင်း ပါဝင်မှုနှင့်', 'စကားပြောပုံစံ မူကြမ်း'],
    '03': ['အရည်အသွေး အသိုင်းအဝိုင်း၏ သုံးသပ်ချက်'],
    '04': ['ဒေသဆိုင်ရာ အသင်းတော်', 'ခေါင်းဆောင်များ၏ အတည်ပြုချက်'],
    '05': ['အဆင့်ဆင့် ထုတ်ဝေခြင်းနှင့်', 'ပြင်ဆင်ခြင်း'],
  },
  nl: {
    '01': ['Capaciteits-', 'opbouw'],
    '02': ['Gemeenschapsbetrokkenheid en', 'conversationeel opstellen'],
    '03': ['Beoordeling door kwaliteitsgemeenschap'],
    '04': ['Authenticatie door regionale', 'kerkleiders'],
    '05': ['Iteratieve publicatie', 'en revisie'],
  },
};

// Script metadata. `family` is the embedded webfont (see embedFor()); `stack`
// adds system fallbacks. Text widths are measured in a real browser rather than
// estimated, so no per-script width guesses are needed.
const SCRIPTS = {
  latin: { pkg: '@fontsource/jura', family: 'Jura', weight: 700, subsets: /latin|vietnamese|cyrillic/, stack: `'Jura','Trebuchet MS',system-ui,sans-serif`, rtl: false },
  arabic: { pkg: '@fontsource/noto-sans-arabic', family: 'Noto Sans Arabic', weight: 600, subsets: /arabic/, stack: `'Noto Sans Arabic','Geeza Pro',system-ui,sans-serif`, rtl: true },
  devanagari: { pkg: '@fontsource/noto-sans-devanagari', family: 'Noto Sans Devanagari', weight: 600, subsets: /devanagari|latin/, stack: `'Noto Sans Devanagari','Kohinoor Devanagari',sans-serif`, rtl: false },
  bengali: { pkg: '@fontsource/noto-sans-bengali', family: 'Noto Sans Bengali', weight: 600, subsets: /bengali|latin/, stack: `'Noto Sans Bengali','Kohinoor Bangla',sans-serif`, rtl: false },
  myanmar: { pkg: '@fontsource/noto-sans-myanmar', family: 'Noto Sans Myanmar', weight: 600, subsets: /myanmar|latin/, stack: `'Noto Sans Myanmar','Myanmar Sangam MN',sans-serif`, rtl: false },
  // Han: no embed — the SC subsets needed would add hundreds of KB, and every
  // Chinese-capable system ships a CJK face with near-identical (full-width)
  // metrics, so measuring locally generalises well.
  han: { family: null, stack: `'PingFang SC','Noto Sans SC','Microsoft YaHei',sans-serif`, rtl: false },
};
const LOCALE_SCRIPT = {
  en: 'latin', es: 'latin', fr: 'latin', sw: 'latin', pt: 'latin', id: 'latin', vi: 'latin', nl: 'latin', ru: 'latin',
  // (ru uses the latin entry: Jura ships Cyrillic subsets, embedded below.)
  // ur uses Naskh here, not Nastaliq: Nastaliq's cascading ligatures fall
  // apart on curved textPaths. Naskh is standard for constrained Urdu UI.
  hi: 'devanagari', ar: 'arabic', zh: 'han', bn: 'bengali', ur: 'arabic', fa: 'arabic', my: 'myanmar',
};

// ---------------------------------------------------------------------------
// SVG loaded through <img> is an isolated document that cannot fetch external
// fonts, so each graphic embeds the face it needs as data-URI woff2 subsets
// (unicode-range preserved from the fontsource CSS). Jura Bold is the original
// artwork's own typeface — see the source's style block, "font-family:
// Jura-Bold, Jura" — so the Latin locales match the original exactly.
const embedCache = new Map();
function embedFor(scriptKey) {
  if (embedCache.has(scriptKey)) return embedCache.get(scriptKey);
  const s = SCRIPTS[scriptKey];
  let out = '';
  if (s.family) {
    const pkgDir = join(ROOT, 'node_modules', s.pkg);
    const css = readFileSync(join(pkgDir, `${s.weight}.css`), 'utf8');
    const faces = [];
    for (const m of css.matchAll(
      /@font-face\s*\{[^}]*?url\(\.\/files\/([^)]+\.woff2)\)[^}]*?unicode-range:\s*([^;}]+)/gs
    )) {
      const [, file, range] = m;
      if (!s.subsets.test(file)) continue;
      const b64 = readFileSync(join(pkgDir, 'files', file)).toString('base64');
      faces.push(
        `@font-face{font-family:'${s.family}';font-style:normal;font-weight:${s.weight};` +
          `src:url(data:font/woff2;base64,${b64}) format('woff2');unicode-range:${range.trim()};}`
      );
    }
    out = faces.join('');
  }
  embedCache.set(scriptKey, out);
  return out;
}

// ---------------------------------------------------------------------------
// Template: original artwork minus the letter-outline glyphs and empty <text>.
function buildTemplate() {
  let svg = readFileSync(SRC, 'utf8');
  // Remove letter/ampersand glyph paths (keep digit glyphs — the 01–05 badges).
  svg = svg.replace(/<path\b[^>]*?aria-label="([^"])"[^>]*?\/>/gs, (m, ch) => (/[0-9]/.test(ch) ? m : ''));
  svg = svg.replace(/<path\b[^>]*?aria-label="&amp;"[^>]*?\/>/gs, '');
  // Remove the centre "Capacity Building" letters — sixteen unlabeled
  // outline paths (id path70..path85, class cls-7).
  for (let i = 70; i <= 85; i++) {
    svg = svg.replace(new RegExp(`<path[^>]*id="path${i}"[^>]*/>`, 's'), '');
  }
  // Remove the empty leftover <text> elements.
  svg = svg.replace(/<text\b[^>]*>.*?<\/text>/gs, '');
  // Slim editor metadata.
  svg = svg.replace(/<sodipodi:namedview\b.*?\/>/gs, '');
  return svg;
}

const polar = (r, compassDeg) => {
  const a = (compassDeg * Math.PI) / 180;
  return [CX + r * Math.sin(a), CY - r * Math.cos(a)];
};

// Circular arc path from `fromDeg` to `toDeg` (compass) at radius r, walking in
// reading order. Descending angles sweep counter-clockwise, which is how the
// bottom arc keeps its text upright.
function arcPath(r, fromDeg, toDeg) {
  const cw = toDeg > fromDeg;
  const [sx, sy] = polar(r, fromDeg);
  const [ex, ey] = polar(r, toDeg);
  const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0;
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} ${cw ? 1 : 0} ${ex.toFixed(2)} ${ey.toFixed(2)}`;
}

const arcLength = (r, fromDeg, toDeg) => (Math.abs(toDeg - fromDeg) * Math.PI * r) / 180;

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ---------------------------------------------------------------------------
// Measure every label's real rendered width in a headless browser, using the
// same embedded font and weight the SVG will use. Estimating from character
// counts was what let long translations run under the number badges.
async function measureAll() {
  const puppeteer = (await import('puppeteer-core')).default;
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'shell',
  });
  const page = await browser.newPage();
  const REF = 100; // measure at 100px, then scale linearly
  const widths = {};
  for (const [locale, labels] of Object.entries(LABELS)) {
    const key = LOCALE_SCRIPT[locale];
    const { stack, weight = 700 } = SCRIPTS[key];
    const lines = Object.values(labels).flat();
    await page.setContent(
      `<style>${embedFor(key)}</style>` +
        `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="600">` +
        lines
          .map(
            (l, i) =>
              `<text id="t${i}" x="0" y="${i * 40 + 40}" font-family="${stack}" font-weight="${weight}" font-size="${REF}">${esc(l)}</text>`
          )
          .join('') +
        `</svg>`
    );
    await page.evaluate(() => document.fonts.ready);
    const measured = await page.evaluate(
      (n) => Array.from({ length: n }, (_, i) => document.getElementById('t' + i).getComputedTextLength()),
      lines.length
    );
    widths[locale] = Object.fromEntries(lines.map((l, i) => [l, measured[i] / REF]));
  }
  await browser.close();
  return widths; // widths[locale][line] = width in em
}

const EM = await measureAll();

function textLayer(locale) {
  const labels = LABELS[locale];
  const key = LOCALE_SCRIPT[locale];
  const { stack, rtl, weight = 700 } = SCRIPTS[key];
  const em = EM[locale];
  const dir = rtl ? ' direction="rtl"' : '';
  let out = `<style>${embedFor(key)}</style>\n`;
  out += `<g id="labels-${locale}" font-family="${stack}" font-weight="${weight}">\n`;

  // Centre label (01) — straight lines, centred, dark. One shared size.
  const c = labels['01'];
  const cSize = Math.min(CENTER_TEXT.fontSize, ...c.map((line) => CENTER_WIDTH / em[line]));
  const baselines =
    c.length === 1 ? [772] : CENTER_TEXT.baselines.map((b) => b - (CENTER_TEXT.fontSize - cSize) * 0.35);
  c.forEach((line, i) => {
    out += `  <text x="${CENTER_TEXT.x}" y="${baselines[i].toFixed(1)}" text-anchor="middle" font-size="${cSize.toFixed(1)}" fill="#1a1a1a"${dir}>${esc(line)}</text>\n`;
  });

  // Arc labels 02–05 — white text on the coloured band. Both lines of an arc
  // share one size (as in the original), fitted to the tighter line.
  for (const arcKey of ['02', '03', '04', '05']) {
    const lines = labels[arcKey];
    const arc = ARCS[arcKey];
    const radii = lines.length === 1 ? arc.rOne : arc.rTwo;
    const size = Math.min(
      ARC_FONT_SIZE,
      ...lines.map((line, i) => (arcLength(radii[i], arc.from, arc.to) * ARC_FILL) / em[line])
    );
    lines.forEach((line, i) => {
      const id = `arc-${locale}-${arcKey}-${i}`;
      out += `  <path id="${id}" d="${arcPath(radii[i], arc.from, arc.to)}" fill="none"/>\n`;
      out += `  <text font-size="${size.toFixed(1)}" fill="#ffffff"${dir}><textPath href="#${id}" startOffset="50%" text-anchor="middle">${esc(line)}</textPath></text>\n`;
    });
  }
  return out + '</g>\n';
}

mkdirSync(OUT, { recursive: true });
const template = buildTemplate();
for (const locale of Object.keys(LABELS)) {
  const svg = template.replace('</svg>', textLayer(locale) + '</svg>');
  writeFileSync(join(OUT, `${locale}.svg`), svg);
}
console.log(`Wrote ${Object.keys(LABELS).length} localized cycle graphics to public/images/cycle/.`);
