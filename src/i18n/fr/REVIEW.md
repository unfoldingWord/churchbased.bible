# French (fr) translation review — churchbased.bible

QA pass against `src/i18n/en/*.json`. All 7 files fully translated; JSON structure, URLs, and inline HTML tags preserved.

## Significant corrections

- **Tagline (ui.footer.tagline + home.hero.title):** machine output was ungrammatical and half-translated ("Un ministère du église; la manière dont l'église le ministère" — wrong article, missing verb). Recast as "Un ministère de l'**Église** ; la manière dont l'Église *exerce le ministère*." and made identical in both places, per the guide.
- **Untranslated English removed throughout.** Large blocks were still in English: home (story title, step-2 heading, quote, "How CBBT Works" headings, step-3 body, entire fromChurch and finalCta sections), about (power section, condition titles "Local Ownership"/"Theological Formation"/"Values, Skills…", nextHeading, next CTAs), training (hero title fragments "You can … today", resource headings/bodies, FAQ heading), research (hero, intro, papersHeading, papers 5–10, all three videos), stories (line2, "Read More" ×5, Yuracani/Quipa story, comingSoon), contact (hero title, intro, "Your message matters", subject options, success/back), ui (all `strings.*`).
- **Standardized the key term:** "Church-Based Bible Translation" → "la traduction de la Bible par l'Église locale" everywhere (previous files mixed "traduction CBBT de la Bible", "traduction de la Bible basée sur l'Église", "l'association Traduction de la Bible par l'Église locale" — the "association" wording wrongly implied an organization). "CBBT" kept as-is per protected-terms rule, used with feminine article ("la CBBT").
- **Proper noun "Zeme" unified.** Files mixed "Zemis", "zemi", "zème", "Zémé". Now consistently "les Zeme" (invariable, as an ethnonym) and "le zeme" (language, lowercase). "Mblégo" reverted to "Mblego" (proper noun stays as-is).
- **home.quote** now reuses the same wording as about.demand ("La demande pour des traductions de la Bible est plus forte que jamais. L'Église a besoin d'une solution."), since English repeats the sentence.
- **home.how step 2:** MT had reordered/altered the four qualities ("belles, fiables, compréhensibles et appropriées"); corrected to match English "trustworthy, understandable, appropriate, and appealing" → "fiables, compréhensibles, appropriées et attrayantes".
- **training FAQ 2:** fixed grammar error "CBBT à produit" (à → a) and recast the sentence.
- **stories:** heading "Les Zemis" → "Zeme" (matches English heading style); "Yuracani and Quipa" → "Yuracani et Quipa"; location "L'Inde" → "Inde"; Ahmed quote recast ("« Mon peuple me tient tellement à cœur. »") — the old rendering added words not in the source.
- **research PDF labels:** already "Anglais"/"Espagnol" (correct — they name the PDF's language); kept.
- **Typography:** applied French spacing with non-breaking spaces (U+00A0) before `! ? ; : »` and after `«`, consistently across all files (the MT files were inconsistent, e.g. "mois!" and "réservés»").
- **contact.form:** "Email" → "Adresse e-mail"; success message translated ("Merci pour votre message. ✨"); "← Back" → "← Retour".

## Choices a native reviewer should verify

- **"la CBBT" (feminine)** — gender assigned from "la traduction"; confirm this reads naturally to francophone African users.
- **"Église" capitalized** when referring to the church as body of believers, lowercase avoided; consistent but worth a check where "église locale" (building/congregation) might be preferred.
- **"Livres blancs"** for "White Papers" — alternative: "Documents de recherche".
- **"Histoires bibliques libres (Open Bible Stories)"** — official French title of OBS should be confirmed (resource is often left as "Open Bible Stories").
- **"reproductibilité pratique à grande échelle"** for "practical scalability" (research paper 5) — technical term with no settled French equivalent.
- **"Innovation Lab" left untranslated** (research paper 6) as it appears to be a team/program name; could be rendered "Laboratoire d'innovation".
- **"métarécit biblique"** for "biblical metanarrative" — standard in francophone theology, but verify register for the target audience.
- **"De toute nation et de toute langue"** (contact intro) — echoes Apocalypse 7:9 phrasing (Segond tradition); verify it lands as intended.
- **"vingt-et-un mois"** uses 1990 rectified spelling (hyphens); traditional "vingt et un mois" is also correct.
- **Story title** "La Parole est enfin chez elle parmi les Zeme" is an idiomatic rendering of "The Word Comes Home to the Zeme".

## Uncertainties

- "The Bible Well" and "FoundationsBT" kept in English as product names (guide: protected). The training button label is "Série de vidéos FoundationsBT".
- English nested/odd tag placements (e.g. double `<strong>` in research hero, trailing space inside `<strong>Église </strong>` in home.quote) were mirrored exactly to keep tag sets identical; harmless but flagging in case the source is cleaned up later.
