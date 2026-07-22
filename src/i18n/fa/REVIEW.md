# fa (Persian/Farsi) translation review notes

## The flagged "CBT" artifact in fa/research.json
- Investigated: there is **no CBT/cognitive-therapy text** in the Persian strings. The check-script
  match came from the untouchable asset filename `overview_of_ccbt_qa.png` ("ccbt" contains "cbt"
  case-insensitively), a false positive affecting every locale. The script was updated (by a parallel
  QA session; verified here) to scan only translatable strings, not asset/link values. "CBBT" is kept
  in Latin letters everywhere in the Persian text, per the guide.

## Significant corrections made
- Translated all remaining English strings (~56% of the locale was untranslated): full home page
  (hero title, story title, quote, "How CBBT Works" headings, fromChurch and finalCta sections),
  most of about.json, all of research.json papers 5–10 and the video library, training hero/intro/
  resource headings, stories headings/CTAs, contact form options, and all of ui.json (nav, footer,
  error strings).
- about.json "Resourcing" body: fixed «انجیل ها» (lit. "Gospels") to «کتاب مقدس‌های دارای مجوز آزاد» —
  the English says open-licensed *Bibles*; انجیل is only the Gospel, کتاب مقدس is the whole Bible.
- about.json "Multiplication": fixed «ضرب» (arithmetic multiplication — machine-translation error)
  to «تکثیر».
- stories.json Mblego quote: fixed «من برای مردمم بسیار سنگین هستم» ("I am very heavy for my people" —
  nonsense MT) to «دل من برای قومم بسیار سنگین است» ("my heart is heavy/burdened for my people").
- research.json paper 1: fixed «قابل اعتماد و قابل اعتماد» ("trustworthy and trustworthy" — MT
  duplication) to «قابل اعتماد و مورد اعتماد» (trustworthy vs. trusted — the paper's actual distinction).
- training.json FAQ 1: fixed «همانطور که گفته شد» (MT mistranslation of "That said") to «با این حال».
- contact.json/ui.json title: fixed «مخاطب» ("addressee/audience") to «تماس» ("Contact").
- home.json: fixed leftover Latin "Zeme" inside Persian sentences to «زمه» and recast several
  literal-MT sentences ("وظیفه بسیار زیاد بود", "به دنبال معنای کلام خدا می‌گردند") into natural Persian.
- Tagline made identical in `ui.footer.tagline` and `home.hero.title`:
  «خدمتی از سوی کلیسا؛ به شیوه‌ای که کلیسا خدمت می‌کند.» (with the same strong/em tags as English).
- PDF language labels translated: "English" → «انگلیسی», "Spanish" → «اسپانیایی».
- Standardized orthography: ezafe hamze on ه (ترجمهٔ، دورهٔ), ZWNJ (نیم‌فاصله) in compounds and verb
  prefixes (می‌کند، شاگردسازی), Persian digits (۱۰۰، ۹۰۰، دورهٔ ۱).

## Choices a native reviewer should verify
- "Church-Based Bible Translation" rendered as «ترجمهٔ کتاب مقدس مبتنی بر کلیسا» (kept from the
  existing translation for continuity). A reviewer may prefer the tighter «ترجمهٔ کلیسامحور کتاب مقدس».
- "make disciples of Jesus" rendered as «برای عیسی شاگرد بسازند / شاگردسازی» — standard among Iranian
  evangelical churches, but verify preferred discipleship wording.
- "From Unreached to Established" rendered «از بشارت‌نیافته تا استوار»; "unreached" has several
  accepted renderings (دست‌نیافته، بشارت‌ندیده).
- "White Papers" rendered «مقاله‌های تخصصی»; alternatives: «مقالات پژوهشی/سفید».
- "Open Bible Stories" rendered descriptively as «داستان‌های آزاد کتاب مقدس» with the English name in
  parentheses (training FAQ 2) — verify against any official Persian OBS product name.
- "biblical theology" rendered «الهیات کتاب‌مقدسی»; "metanarrative" as «کلان‌روایت» — both are
  seminary-register terms; confirm they suit the intended audience.
- "Unity" rendered «اتحاد» (previous file had «وحدت»; both are valid — وحدت can carry Islamic-mystical
  connotations, اتحاد is common in church usage).
- Proper nouns transliterated: زمه (Zeme), امبلگو (Mblego), تاورتسی و خاتنی (Tavretsi and Khateni),
  روسکا روما (Ruska Roma), یوراکانی و کیپا (Yuracani and Quipa). "The Bible Well" and "FoundationsBT"
  kept in Latin per the guide.
- contact.json `back`: rendered «→ بازگشت» so the arrow points right in the RTL layout (English uses
  «←»). If the site does not mirror direction for fa, this may need to revert.

## Unsure / flagged
- The English em/strong emphasis in the training hero («امروز» strong, «آغاز» strong+em) was mapped to
  the corresponding Persian words; word order differs from English by necessity.
- «قوم» used consistently for "people group" (قوم‌ها for plural); an alternative is «گروه‌های قومی».
- Persian digits (۱۰۰، ۹۰۰) used throughout; if the site's fa font lacks Eastern Arabic-Indic digits,
  switch back to Latin digits.
