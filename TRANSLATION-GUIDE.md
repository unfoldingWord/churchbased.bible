# Translation QA guide (churchbased.bible static rebuild)

Audience: global church leaders; register: warm, plain, respectful ("Trusted Guide" voice).

## Hard rules
1. Never change JSON structure: same keys, same array lengths, same order.
2. Never change these field values: `image`, `icon`, `video`, `pdf`, `href`, `cycleImage`, and any URL.
3. Preserve inline HTML tags (`<strong>`, `<em>`, `<br>`, `<mark>`, `<a href="...">`) — place them around the
   corresponding words in the translation; never drop or add tags. Keep `href` values exactly.
4. Protected terms:
   - "CBBT" stays exactly "CBBT" (never expand into another language's acronym, NEVER "CBT"/cognitive therapy).
   - "Church-Based Bible Translation" translates naturally; where English pairs it with "(CBBT)", keep "(CBBT)".
   - "unfoldingWord" is never translated or re-cased.
   - Proper nouns (Zeme, Mblego, Tavretsi, Khateni, Ruska Roma, Yuracani, Quipa, FoundationsBT, The Bible Well)
     stay as-is, or transliterate into the target script if that is conventional — be consistent.
   - Bible book names / scripture phrasing use the wording most familiar to Bible readers in the target language.
5. Every user-facing string must be fully in the target language (no leftover English sentences),
   except protected terms above. Labels like "English"/"Spanish" on research PDFs name the PDF's language —
   translate those words into the target language.
6. Keep existing translations that are already fluent and accurate; improve awkward machine output
   (e.g. Spanish "¿Hace el ministerio?" for "does ministry" is wrong — recast naturally).
7. The tagline appears twice (ui.footer.tagline and home.hero.title) — keep them consistent.

## Known TranslatePress defects to fix
- Spanish: "CBBT" was rendered "terapia cognitivo-conductual" (cognitive behavioral therapy) — must be CBBT.
- Bengali files contain Hindi (Devanagari script) fragments — replace with Bengali.
- Many locales left 30–60% of strings in English — translate them.

## Deliverables per locale
1. Corrected `src/i18n/<locale>/*.json` (7 files: home, about, training, research, stories, contact, ui).
2. `src/i18n/<locale>/REVIEW.md` — bullet list (in English) of: significant corrections made, choices a native
   reviewer should verify (terminology, scripture phrasing), and anything you were unsure about.

Validate your work: `PATH=/opt/homebrew/bin:$PATH node scripts/check-locales.mjs` must show 0 errors for your
locale and an untranslated ratio near 0% (a few protected-term strings may remain identical).
