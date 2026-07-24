# Deployment & cutover checklist

## One-time Cloudflare setup (needs account access)

1. **Workers project** (already connected)
   - The repo deploys as a Workers + Static Assets project: build
     `npm run build`, deploy `npx wrangler deploy` (runs on every push).
   - Everything ships with the site — all videos were transcoded under the
     25 MiB per-file limit, so no R2 bucket is required.

2. **Contact** - a mailto link in the footer (churchbased.bible@unfoldingword.org);
   no form backend, API keys, or environment variables needed.

3. **Analytics** — Dashboard → Analytics → Web Analytics → add site, copy the
   token into the commented beacon snippet in `src/layouts/Base.astro`.

## Verify on the *.workers.dev URL

- [ ] All 6 pages × spot-check locales (en, es, ar, zh, hi) render correctly
- [ ] `npm run check:locales` and `node scripts/check-links.mjs` pass
- [ ] Footer contact email link opens a mail draft to churchbased.bible@unfoldingword.org
- [ ] Videos play on About, Research, Stories, and the homepage CTA
- [ ] Old video permalinks 301, and `/contact/` (any locale) 301s to that locale home

## DNS cutover

1. churchbased.bible DNS currently points at WordPress.com. Add the domain as a
   **custom domain** on the Pages project, then switch DNS (if the zone moves to
   Cloudflare, nameserver change; otherwise CNAME to the pages.dev host).
2. Keep the WordPress site untouched (just unlinked) for an agreed window —
   e.g. 2–4 weeks — while watching analytics + the contact inbox.
3. Before ending the WordPress subscription:
   - [ ] Export the Jetpack newsletter subscriber list (Jetpack → Subscribers)
         even though the site no longer offers signup — the list has value.
   - [ ] Export a final WordPress content backup (Tools → Export) for the archive.
   - The `raw/` directory in this repo already snapshots all public pages,
     images, PDFs, and original videos.

## Translation review loop (ongoing)

Each locale has `src/i18n/{locale}/REVIEW.md` — machine-assisted corrections a
native speaker should verify. Reviewers edit the JSON files directly (or via
PRs); `npm run check:locales` guards structure and protected terms.
