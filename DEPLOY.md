# Deployment & cutover checklist

## One-time Cloudflare setup (needs account access)

1. **Create the Pages project**
   - Dashboard → Workers & Pages → Create → Pages → connect this git repo
     (build command `npm run build`, output `dist`, Node 20+), **or** deploy
     from the CLI: `npx wrangler pages deploy dist --project-name churchbased-bible`.
   - Everything ships with the site — all videos were transcoded under the
     25 MiB Pages file limit, so no R2 bucket is required.

2. **Contact form variables** (Pages project → Settings → Environment variables)
   - `RESEND_API_KEY` — create a free account at resend.com, verify the
     churchbased.bible sending domain (the only secret; set it in the dashboard)
   - `CONTACT_TO` = `churchbased.bible@unfoldingword.org` (already in wrangler.toml)
   - `CONTACT_FROM` = `CBBT Website <noreply@churchbased.bible>` (already in wrangler.toml)
   - optional `TURNSTILE_SECRET` — enables Turnstile bot-checking
     (functions/api/contact.ts already verifies it when set; the form's
     honeypot works with no configuration)

3. **Analytics** — Dashboard → Analytics → Web Analytics → add site, copy the
   token into the commented beacon snippet in `src/layouts/Base.astro`.

## Verify on the *.pages.dev preview URL

- [ ] All 6 pages × spot-check locales (en, es, ar, zh, hi) render correctly
- [ ] `npm run check:locales` and `node scripts/check-links.mjs` pass
- [ ] Contact form test submission arrives at CONTACT_TO
- [ ] Videos play on About, Research, Stories, and the homepage CTA
- [ ] Old video permalinks 301 (e.g. `/cbbt-homepage-video-mp4/` → `/`)

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
