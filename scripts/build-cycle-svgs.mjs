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

// Per-arc text placement: cw = letters read along a clockwise path (tops face
// outward); the bottom arc (04) reads left→right on a counter-clockwise path
// (tops face the centre) so it isn't upside-down — matching the original.
const ARCS = {
  '02': { center: 353, halfSpan: 36, cw: true, rTwo: [434, 384], rOne: [408] },
  '03': { center: 86, halfSpan: 33, cw: true, rTwo: [434, 384], rOne: [408] },
  '04': { center: 189, halfSpan: 36, cw: false, rTwo: [368, 418], rOne: [394] },
  '05': { center: 263, halfSpan: 33, cw: true, rTwo: [434, 384], rOne: [408] },
};
const CENTER_TEXT = { x: CX, baselines: [758, 797], fontSize: 31 };
const ARC_FONT_SIZE = 31.7;

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

// Script metadata: font stack, RTL, and an approximate glyph-width factor
// (em units per character) for the auto-fit calculation.
const SCRIPTS = {
  latin: { stack: `'Jura','Trebuchet MS','Segoe UI',system-ui,sans-serif`, rtl: false, w: 0.58, jura: true },
  arabic: { stack: `'Noto Sans Arabic','Geeza Pro','Segoe UI',system-ui,sans-serif`, rtl: true, w: 0.5 },
  nastaliq: { stack: `'Noto Nastaliq Urdu','Urdu Typesetting','Geeza Pro',system-ui,sans-serif`, rtl: true, w: 0.55 },
  devanagari: { stack: `'Noto Sans Devanagari','Kohinoor Devanagari','Devanagari Sangam MN','Nirmala UI',sans-serif`, rtl: false, w: 0.55 },
  bengali: { stack: `'Noto Sans Bengali','Kohinoor Bangla','Bangla Sangam MN','Nirmala UI',sans-serif`, rtl: false, w: 0.55 },
  myanmar: { stack: `'Noto Sans Myanmar','Myanmar Sangam MN','Myanmar Text',sans-serif`, rtl: false, w: 0.62 },
  han: { stack: `'PingFang SC','Noto Sans SC','Microsoft YaHei',sans-serif`, rtl: false, w: 1.05 },
};
const LOCALE_SCRIPT = {
  en: 'latin', es: 'latin', fr: 'latin', sw: 'latin', pt: 'latin', id: 'latin', vi: 'latin', nl: 'latin', ru: 'latin',
  // (ru uses the latin entry: Jura ships Cyrillic subsets, embedded below.)
  // ur uses Naskh here, not Nastaliq: Nastaliq's cascading ligatures fall
  // apart on curved textPaths. Naskh is standard for constrained Urdu UI.
  hi: 'devanagari', ar: 'arabic', zh: 'han', bn: 'bengali', ur: 'arabic', fa: 'arabic', my: 'myanmar',
};

// ---------------------------------------------------------------------------
// Jura Bold is the graphic's original typeface (see the source's style block:
// "font-family: Jura-Bold, Jura"). SVG loaded via <img> can't fetch external
// fonts, so for the locales Jura covers we embed its woff2 subsets as data
// URIs, preserving each subset's unicode-range from the fontsource CSS.
function juraFontFaces() {
  const pkgDir = join(ROOT, 'node_modules/@fontsource/jura');
  const css = readFileSync(join(pkgDir, '700.css'), 'utf8');
  const faces = [];
  for (const m of css.matchAll(/@font-face\s*\{[^}]*?url\(\.\/files\/([^)]+\.woff2)\)[^}]*?unicode-range:\s*([^;}]+)/gs)) {
    const [_, file, range] = m;
    if (!/latin|vietnamese|cyrillic/.test(file)) continue;
    const b64 = readFileSync(join(pkgDir, 'files', file)).toString('base64');
    faces.push(
      `@font-face{font-family:'Jura';font-style:normal;font-weight:700;font-display:swap;` +
        `src:url(data:font/woff2;base64,${b64}) format('woff2');unicode-range:${range.trim()};}`
    );
  }
  return `<style>${faces.join('')}</style>\n`;
}
const JURA_STYLE = juraFontFaces();

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

// Circular arc path through `center ± half` compass degrees at radius r.
// cw=true draws in clockwise (visual) direction.
function arcPath(r, centerDeg, halfDeg, cw) {
  const a1 = centerDeg - halfDeg;
  const a2 = centerDeg + halfDeg;
  const [sx, sy] = polar(r, cw ? a1 : a2);
  const [ex, ey] = polar(r, cw ? a2 : a1);
  return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 0 ${cw ? 1 : 0} ${ex.toFixed(2)} ${ey.toFixed(2)}`;
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function textLayer(locale) {
  const labels = LABELS[locale];
  const { stack, rtl, w, jura } = SCRIPTS[LOCALE_SCRIPT[locale]];
  const dir = rtl ? ' direction="rtl"' : '';
  let out = jura ? JURA_STYLE : '';
  out += `<g id="labels-${locale}" font-family="${stack}" font-weight="700">\n`;

  // Centre label (01) — straight, centred, dark.
  const c = labels['01'];
  const cSize = Math.min(
    CENTER_TEXT.fontSize,
    ...c.map((line) => (CENTER_TEXT.fontSize * 9.2) / (line.length * w))
  );
  const baselines = c.length === 1 ? [772] : CENTER_TEXT.baselines;
  c.forEach((line, i) => {
    out += `  <text x="${CENTER_TEXT.x}" y="${baselines[i]}" text-anchor="middle" font-size="${cSize.toFixed(1)}" fill="#1a1a1a"${dir}>${esc(line)}</text>\n`;
  });

  // Arc labels 02–05 — white text on the coloured band.
  for (const key of ['02', '03', '04', '05']) {
    const lines = labels[key];
    const arc = ARCS[key];
    const radii = lines.length === 1 ? arc.rOne : arc.rTwo;
    lines.forEach((line, i) => {
      const r = radii[i];
      const arcLen = ((arc.halfSpan * 2 * Math.PI) / 180) * r;
      const estWidth = line.length * w * ARC_FONT_SIZE;
      const size = estWidth > arcLen * 0.94 ? (ARC_FONT_SIZE * arcLen * 0.94) / estWidth : ARC_FONT_SIZE;
      const id = `arc-${locale}-${key}-${i}`;
      out += `  <path id="${id}" d="${arcPath(r, arc.center, arc.halfSpan, arc.cw)}" fill="none"/>\n`;
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
