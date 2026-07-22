// Extract structured, per-locale content from the mirrored WordPress HTML.
// TranslatePress renders identical DOM for every locale, so one set of
// positional selectors (defined against English) works for all 16.
//
// Output: src/i18n/{locale}/{page}.json + src/i18n/{locale}/ui.json
import { load } from 'cheerio';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const LOCALES = ['en', 'es', 'fr', 'hi', 'ru', 'ar', 'zh', 'sw', 'pt', 'id', 'vi', 'bn', 'ur', 'fa', 'my', 'nl'];

// VideoPress hash → archived filename (from the video sitemap).
const VIDEO_BY_HASH = {
  // transcoded from cbbt-advocacy-video-v9-sensitive.mov (4K HEVC → 1080p H.264)
  FaiY1nP8: 'cbbt-advocacy-video.mp4',
  V0XlL21x: 'biblical-theology-video-1-intro.mp4',
  '3iRz3Q1E': 'biblical-theology-video-2-reasons.mp4',
  oaqo1fpI: 'biblical-theology-video-3-resources.mp4',
  Ag0GySC1: 'cbbt-video-footer.mp4',
  T5zMXVbk: 'cbbt-homepage-video.mp4',
  Kh7Yilu5: 'cbbt-impact-stories-video.mp4',
  '1lqde5Hf': 'cbbt-impact-stories-video-1.mp4',
  EnLz1Lnd: 'cbbt-impact-stories-video-2.mp4',
  ukyyr9yY: 'cbbt-impact-stories-header.mp4',
};

const INLINE_KEEP = new Set(['strong', 'em', 'br', 'mark', 'sub', 'sup']);

function localImg(src) {
  if (!src) return null;
  let s = src.replace(/^https?:\/\/i[0-2]\.wp\.com\//, 'https://');
  s = s.replace(/^https?:\/\/churchbased\.bible/, '').replace(/\?.*$/, '');
  if (!s.startsWith('/wp-content/uploads/')) return src; // external, keep as-is
  return s.replace('/wp-content/uploads/', '/images/uploads/');
}

function localHref(href) {
  if (!href) return null;
  let h = href.replace(/^https?:\/\/churchbased\.bible/, '');
  if (h.startsWith('/wp-content/uploads/')) h = h.replace('/wp-content/uploads/', '/files/');
  if (h === '') h = '/';
  // strip locale prefixes TranslatePress adds to internal links (/es/about/ → /about/)
  const m = h.match(/^\/([a-z]{2})(\/.*|$)/);
  if (m && LOCALES.includes(m[1]) && m[1] !== 'en') h = m[2] || '/';
  if (!h.endsWith('/') && !/\.[a-z]+$/i.test(h) && h.startsWith('/')) h += '/';
  return h;
}

function localVideo(src) {
  if (!src) return null;
  const m = src.match(/videos\.files\.wordpress\.com\/([^/]+)\/([^?]+)/);
  if (m) return `/videos/${m[2]}`;
  const e = src.match(/videopress\.com\/(?:embed|v)\/([A-Za-z0-9]+)/);
  if (e && VIDEO_BY_HASH[e[1]]) return `/videos/${VIDEO_BY_HASH[e[1]]}`;
  return src;
}

/** Sanitized rich text: keeps strong/em/br/mark and <a> (localized href); unwraps everything else. */
function rich($, el) {
  const $el = $(el);
  function ser(node) {
    if (node.type === 'text') return node.data;
    if (node.type !== 'tag') return '';
    const inner = (node.children || []).map(ser).join('');
    const tag = node.name;
    if (tag === 'br') return '<br>';
    if (INLINE_KEEP.has(tag)) {
      return inner.trim() === '' ? inner : `<${tag}>${inner}</${tag}>`;
    }
    if (tag === 'a') {
      const href = localHref($(node).attr('href'));
      return `<a href="${href}">${inner}</a>`;
    }
    return inner; // unwrap spans (incl. TranslatePress wrappers) and anything else
  }
  return ($el.contents().toArray().map(ser).join('') || '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([.,;:!?»])/g, '$1')
    .trim();
}

function text($, el) {
  return $(el).text().replace(/\s+/g, ' ').trim();
}

const req = ($, sel, ctx) => {
  const found = ctx ? $(sel, ctx) : $(sel);
  if (!found.length) throw new Error(`selector matched nothing: ${sel}`);
  return found;
};

// ---- per-page extraction (selectors defined against the shared DOM shape) ----

function mediaTexts($, root) {
  return $('.wp-block-media-text', root).toArray();
}

function extractHome($) {
  const main = $('main');
  const header = $('header').first();
  const groups = $('main > .entry-content > .wp-block-group, main > .wp-block-group').toArray();
  // homepage main children: [storyGroup, quoteGroup, howGroup(+fromChurch)] + cover
  const mts = mediaTexts($, main);
  const storyMts = mts.slice(0, 5);
  const fromChurch = mts[5];
  const howCols = $('.wp-block-columns .wp-block-column h2.wp-block-heading', main)
    .toArray()
    .slice(0, 3);
  const cover = $('.wp-block-cover', main).last();
  return {
    hero: {
      image: localImg($('header .wp-block-cover img.wp-block-cover__image-background').attr('src')),
      title: rich($, req($, 'header .wp-block-cover h1.wp-block-heading').get(0)),
      cta: {
        label: text($, req($, 'header .wp-block-cover .wp-block-button__link').get(0)),
        href: localHref($('header .wp-block-cover .wp-block-button__link').attr('href')),
      },
    },
    story: {
      title: rich($, req($, 'main h1.wp-block-heading').get(0)),
      steps: storyMts.map((mt) => ({
        image: localImg($('img', mt).attr('src')),
        heading: rich($, $('h3.wp-block-heading', mt).get(0)),
        body: rich($, $('p.wp-block-paragraph', mt).get(0)),
      })),
    },
    quote: rich($, req($, 'main blockquote h1').get(0)),
    how: {
      // main h1s: [0]=story title, [1]=quote (inside blockquote), [2]=how title
      title: rich($, req($, 'main h1.wp-block-heading').eq(2).get(0)),
      steps: howCols.map((h2) => {
        const col = $(h2).closest('.wp-block-column');
        return {
          image: localImg($('img', col).attr('src')),
          heading: rich($, h2),
          body: rich($, $('p.wp-block-paragraph', col).get(0)),
        };
      }),
    },
    fromChurch: {
      heading: rich($, $('h2.wp-block-heading', fromChurch).get(0)),
      lead: rich($, $('p.wp-block-paragraph', fromChurch).eq(0).get(0)),
      body: rich($, $('p.wp-block-paragraph', fromChurch).eq(1).get(0)),
      cta: {
        label: text($, $('.wp-block-button__link', fromChurch).get(0)),
        href: localHref($('.wp-block-button__link', fromChurch).attr('href')),
      },
      image: localImg($('figure img', fromChurch).attr('src')),
    },
    finalCta: {
      video: localVideo($('video', cover).attr('src')),
      heading: rich($, $('h1.wp-block-heading', cover).get(0)),
      body: rich($, $('p.wp-block-paragraph', cover).get(0)),
      cta: {
        label: text($, $('.wp-block-button__link', cover).get(0)),
        href: localHref($('.wp-block-button__link', cover).attr('href')),
      },
    },
  };
}

function extractAbout($) {
  const main = $('main');
  const mts = mediaTexts($, main);
  // mts: [0]=hero, [1..2]=growth, [3..4]=paradigms, [5..8]=condition groups (4×2 items), [9..10]=next cards
  const conditionGroup = (mt) =>
    $('.wp-block-column', mt)
      .toArray()
      .map((col) => ({
        icon: localImg($('img', col).attr('src')),
        title: rich($, $('p.wp-block-paragraph', col).eq(0).get(0)),
        body: rich($, $('p.wp-block-paragraph', col).eq(1).get(0)),
      }));
  const card = (mt) => ({
    image: localImg($('figure img', mt).last().attr('src')),
    body: rich($, $('p.wp-block-paragraph', mt).get(0)),
  });
  const h2s = $('main h2.wp-block-heading').toArray();
  return {
    title: text($, req($, 'main .wp-block-post-title').get(0)),
    hero: { image: localImg($('img', mts[0]).attr('src')), title: rich($, $('h1', mts[0]).get(0)) },
    power: {
      heading: rich($, req($, 'main h1.wp-block-heading').eq(1).get(0)),
      body: rich($, $('main > .entry-content > p.wp-block-paragraph, .entry-content > p.wp-block-paragraph').eq(0).get(0)),
      video: localVideo($('.entry-content iframe').attr('src')),
    },
    demand: { line1: rich($, h2s[0]), line2: rich($, req($, 'main h1.wp-block-heading').eq(2).get(0)) },
    growth: [card(mts[1]), card(mts[2])],
    paradigmsHeading: rich($, h2s[1]),
    paradigms: [card(mts[3]), card(mts[4])],
    conditionsHeading: rich($, h2s[2]),
    conditions: [mts[5], mts[6], mts[7], mts[8]].map((mt) => ({
      image: localImg($('figure.wp-block-media-text__media img', mt).attr('src')),
      items: conditionGroup(mt),
    })),
    nextHeading: rich($, h2s[3]),
    next: [mts[9], mts[10]].map((mt) => ({
      image: localImg($('figure.wp-block-media-text__media img', mt).attr('src')),
      body: rich($, $('p.wp-block-paragraph', mt).get(0)),
      cta: {
        label: text($, $('.wp-block-button__link', mt).get(0)),
        href: localHref($('.wp-block-button__link', mt).attr('href')),
      },
    })),
  };
}

function extractTraining($) {
  const main = $('main');
  const mts = mediaTexts($, main); // [0]=hero, [1..4]=resource cards
  const resourceCard = (mt) => ({
    image: localImg($('figure.wp-block-media-text__media img', mt).attr('src')),
    heading: rich($, $('h2.wp-block-heading', mt).get(0)),
    body: rich($, $('p.wp-block-paragraph', mt).get(0)),
    buttons: $('.wp-block-button__link', mt)
      .toArray()
      .map((b) => ({ label: text($, b), href: $(b).attr('href') })),
  });
  return {
    title: text($, req($, 'main .wp-block-post-title').get(0)),
    hero: { image: localImg($('img', mts[0]).attr('src')), title: rich($, $('h1', mts[0]).get(0)) },
    intro: rich($, $('.entry-content > p.wp-block-paragraph').eq(0).get(0)),
    cycleImage: localImg($('.entry-content > figure.wp-block-image img').attr('src')),
    resourcesHeading: rich($, $('.entry-content > h2.wp-block-heading').eq(0).get(0)),
    resourcesIntro: rich($, $('.entry-content > p.wp-block-paragraph').eq(1).get(0)),
    resources: [mts[1], mts[2], mts[3], mts[4]].map(resourceCard),
    faqHeading: rich($, $('.entry-content > h2.wp-block-heading').eq(1).get(0)),
    faqs: $('details.wp-block-details', main)
      .toArray()
      .map((d) => ({
        q: rich($, $('summary', d).get(0)),
        a: $('p.wp-block-paragraph', d)
          .toArray()
          .map((p) => rich($, p)),
      })),
  };
}

function extractResearch($) {
  const main = $('main');
  const mts = mediaTexts($, main); // [0]=hero, then papers, then 3 video cards
  const paperMts = mts.slice(1, 11);
  const videoMts = mts.slice(11, 14);
  return {
    title: text($, req($, 'main .wp-block-post-title').get(0)),
    hero: { image: localImg($('img', mts[0]).attr('src')), title: rich($, $('h1', mts[0]).get(0)) },
    intro: rich($, $('.entry-content > p.wp-block-paragraph').eq(0).get(0)),
    papersHeading: rich($, $('.entry-content h2.wp-block-heading').eq(0).get(0)),
    papers: paperMts.map((mt) => ({
      image: localImg($('figure img', mt).attr('src')),
      body: rich($, $('p.wp-block-paragraph', mt).get(0)),
      files: $('.wp-block-file a', mt)
        .toArray()
        .filter((a) => text($, a))
        .map((a) => ({ label: text($, a), href: localHref($(a).attr('href')) })),
    })),
    videosHeading: rich($, $('.entry-content h2.wp-block-heading').eq(1).get(0)),
    videos: videoMts.map((mt) => ({
      video: localVideo($('iframe', mt).attr('src')),
      heading: rich($, $('h3.wp-block-heading', mt).get(0)),
      body: rich($, $('p.wp-block-paragraph', mt).get(0)),
    })),
  };
}

function extractStories($) {
  const main = $('main');
  const cover = $('.wp-block-cover', main).first();
  const mts = mediaTexts($, main);
  return {
    title: text($, req($, 'main .wp-block-post-title').get(0)),
    hero: {
      video: localVideo($('video', cover).attr('src')),
      line1: rich($, $('h2.wp-block-heading', cover).eq(0).get(0)),
      line2: rich($, $('h2.wp-block-heading', cover).eq(1).get(0)),
    },
    stories: mts.map((mt) => ({
      heading: rich($, $('h2.wp-block-heading', mt).get(0)),
      location: rich($, $('p.wp-block-paragraph', mt).eq(0).get(0)),
      body: rich($, $('p.wp-block-paragraph', mt).eq(1).get(0)),
      readMore: text($, $('mark', mt).get(0)),
      pdf: localHref($('a[href*=".pdf"]', mt).attr('href')),
      image: localImg($('figure.wp-block-media-text__media img', mt).attr('src')),
    })),
    comingSoon: {
      heading: rich($, $('.entry-content > h2.wp-block-heading').last().get(0)),
      body: rich($, $('.entry-content > p.wp-block-paragraph').last().get(0)),
    },
  };
}

function extractContact($) {
  const main = $('main');
  const mts = mediaTexts($, main);
  const form = $('form.contact-form', main);
  return {
    title: text($, req($, 'main .wp-block-post-title').get(0)),
    hero: { image: localImg($('img', mts[0]).attr('src')), title: rich($, $('h1', mts[0]).get(0)) },
    intro: rich($, $('main h3.wp-block-heading').get(0)),
    matter: rich($, $('main h2.wp-block-heading').eq(0).get(0)),
    form: {
      name: text($, $('label.name', form).contents().first().get(0) || $('label.name', form).get(0)).replace(/\(required\)/i, '').trim(),
      email: text($, $('label.email', form).get(0)).replace(/\(required\)/i, '').trim(),
      required: text($, $('.grunion-label-required', form).get(0)),
      subject: text($, $('label.select', form).get(0)).replace(/\(required\)/i, '').trim(),
      subjectOptions: $('select option', form)
        .toArray()
        .map((o) => text($, o)),
      message: text($, $('label.textarea', form).get(0)),
      submit: text($, $('button.wp-block-button__link', form).contents().first().get(0) || $('button.wp-block-button__link', form).get(0)),
      success: text($, $('.contact-form-submission h4', main).get(0)),
      back: text($, $('.go-back-message a', main).get(0)),
    },
  };
}

function extractUi($) {
  const navLabels = $('header nav .wp-block-navigation-item__label')
    .toArray()
    .map((el) => text($, el));
  const navHrefs = $('header nav a.wp-block-navigation-item__content')
    .toArray()
    .map((el) => localHref($(el).attr('href')));
  return {
    siteTitle: text($, $('h1.wp-block-site-title a').first().get(0)),
    nav: navLabels.map((label, i) => ({ label, href: navHrefs[i] })),
    footer: {
      tagline: rich($, $('footer p.wp-block-paragraph').eq(0).get(0)),
      description: rich($, $('footer p.wp-block-paragraph').eq(1).get(0)),
    },
    // Strings the old site never localized (or that are new to the static
    // rebuild). Extracted as English; the per-locale QA pass translates them.
    strings: {
      formError: 'Something went wrong. Please try again, or reach us another way.',
      notFoundTitle: 'Page not found',
      notFoundBody: 'The page you are looking for does not exist or has moved.',
      backHome: 'Back to the homepage',
      menuLabel: 'Menu',
      languageLabel: 'Language',
    },
  };
}

const PAGES = {
  home: extractHome,
  about: extractAbout,
  training: extractTraining,
  research: extractResearch,
  stories: extractStories,
  contact: extractContact,
};

let failures = 0;
for (const locale of LOCALES) {
  const outDir = join(ROOT, 'src/i18n', locale);
  mkdirSync(outDir, { recursive: true });
  for (const [page, fn] of Object.entries(PAGES)) {
    const file = join(ROOT, 'raw/html', locale, `${page}.html`);
    try {
      const $ = load(readFileSync(file, 'utf8'));
      const data = fn($);
      writeFileSync(join(outDir, `${page}.json`), JSON.stringify(data, null, 2) + '\n');
    } catch (err) {
      console.error(`FAIL ${locale}/${page}: ${err.message}`);
      failures++;
    }
  }
  // ui.json from the home page (header/footer are shared template parts)
  try {
    const $ = load(readFileSync(join(ROOT, 'raw/html', locale, 'home.html'), 'utf8'));
    writeFileSync(join(outDir, 'ui.json'), JSON.stringify(extractUi($), null, 2) + '\n');
  } catch (err) {
    console.error(`FAIL ${locale}/ui: ${err.message}`);
    failures++;
  }
}
console.log(failures ? `${failures} failures` : 'All locales extracted cleanly.');
process.exit(failures ? 1 : 0);
