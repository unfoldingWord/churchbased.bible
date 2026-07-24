# churchbased.bible — static site

Static rebuild of the Church-Based Bible Translation site (formerly WordPress.com),
built with [Astro](https://astro.build) and deployed to Cloudflare Pages.
**Localization is first-class:** 16 languages, RTL support, per-script webfonts,
and all translatable content in per-locale JSON files.

## Develop

```sh
npm install
npm run dev            # http://localhost:4321
npm run build          # static build → dist/ (96 pages)
npm run check:locales  # locale integrity + untranslated-ratio report
```

Requires Node 18+ (`/opt/homebrew/bin/node` on this machine).

## Structure

| Path | What |
| --- | --- |
| `src/styles/global.css` | **Design system**: Tailwind 4 `@theme` tokens + base styles |
| `src/i18n/config.ts` | Locale registry: names, BCP-47 tags, RTL flags, scripts |
| `src/i18n/{locale}/*.json` | All translatable content — one file per page + `ui.json` |
| `src/i18n/{locale}/REVIEW.md` | Translation notes for human reviewers |
| `src/components/pages/*.astro` | One component per page, shared by all locales |
| `src/pages/` | Routes: English at `/`, other locales at `/{lang}/…` |
| `worker/` | Cloudflare Worker: contact API + legacy redirects |
| `scripts/` | mirror/extract/check/screenshot utilities used for the migration |
| `raw/` | Archived copy of the old WordPress site (HTML, images, videos) |

## Design system

Styling is **Tailwind CSS 4** with the original Elementor theme's tokens defined
in `src/styles/global.css` under `@theme` — colors (`ink`, `paper`, `cream`,
`cream-light`, `taupe`), the WP fluid type scale (`text-sm`…`text-4xl`), fluid
section spacing (`card`/`sect`/`band`), the 1080px `content` container, and a
custom `nav` breakpoint (72rem) where the header collapses. Re-theming means
editing tokens there; components use utilities only (plus `.button` variants).
Layout uses logical properties (`start`/`end` utilities), so all 16 locales —
including RTL Arabic, Urdu, and Farsi — share one stylesheet. Per-locale script
fonts are assigned via `:lang()` rules setting `--font-script`.

## Editing translations

Edit `src/i18n/{locale}/{page}.json`. Rules:

- Keep the JSON structure identical to `src/i18n/en/` (checked by `npm run check:locales`).
- Never change `image`/`video`/`pdf`/`href` values — those are shared assets.
- Keep inline tags (`<strong>`, `<em>`, `<a href>`) around the corresponding words.
- Protected terms: **CBBT**, **unfoldingWord**, proper nouns (Zeme, Mblego, …).

Adding language #17: add a line to `src/i18n/config.ts`, create `src/i18n/{code}/`
with the seven JSON files (copy English, translate), done — routes, hreflang,
sitemap, and the language switcher pick it up automatically.

## Deploy (Cloudflare Pages)

Connect the repo in the Cloudflare dashboard (build: `npm run build`, output: `dist`),
or deploy directly: `npx wrangler pages deploy dist --project-name churchbased-bible`.

Environment variables for the contact form:
`RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`, optional `TURNSTILE_SECRET`.

### Videos

Videos ≤25 MB ship in `public/videos/` with the site. The four larger ones
(three Biblical-theology teaching videos + the advocacy video) are transcoded into
`dist-videos/` and belong in an **R2 bucket** served at `/videos/*` via a custom
domain or Pages route — see the deployment checklist in the project notes.

### Analytics

Cookieless Cloudflare Web Analytics: create a token in the dashboard and
uncomment the beacon snippet in `src/layouts/Base.astro`.
