# Kiswahili (sw) translation QA review

## Significant corrections made
- Translated the ~60% of strings that were still in English across all 7 files (home, about, training, research, stories, contact, ui), including the entire research page bodies for papers 5–10 and all three theology videos.
- Fixed the tagline (`ui.footer.tagline` and `home.hero.title`) — previously untranslated — and kept the two occurrences identical: "Huduma ya kanisa; jinsi kanisa linavyofanya huduma."
- Fixed calques/awkward machine output kept from TranslatePress:
  - "Hiyo ilisema" (literal "That said") → "Hata hivyo" (training FAQ 1).
  - "Kuaminika na Kuaminika" (Trustworthy and Trusted rendered as the same word twice) → "Inayostahili Kuaminiwa na Inayoaminiwa".
  - "Kuruhusu Kwenda" (word-for-word "Letting Go") → "Kuachilia".
  - "Kuondoka", "Kutoa Pembejeo" → "Kutia Sahihi" (signing off), "Kutoa Mchango" (giving input).
  - "imeunganishwa kimadhehebu" (denominationally connected — wrong sense) → "imeunganishwa kuvuka mipaka ya madhehebu" (cross-denominationally).
  - "Kanisa limeanzishwa katika injili" (calque of "established in the gospel") → "Kanisa limejengwa imara katika injili".
  - "miezi ishirini na moja" → "miezi ishirini na mmoja" (noun-class agreement for mwezi/miezi).
- Standardized people/language prefixes: Wazeme (people), Kizeme (language); bare "Zeme" kept only as the story heading/proper name. Bare "Zeme haikuwa..." forms were normalized to Wazeme.
- Research PDF language labels translated: "English" → "Kiingereza", "Spanish" → "Kihispania" (these name the PDF's language, per the guide).
- Protected terms preserved: CBBT, unfoldingWord, Zeme, Mblego, Tavretsi, Khateni, Ruska Roma, Yuracani, Quipa, FoundationsBT, The Bible Well, Innovation Lab. All URLs, image/video/pdf paths, and inline HTML tags (`<strong>`, `<em>`, `<mark>`, `<br>`, `<a href>`) kept intact, including the nested `<strong><strong>` patterns.

## Terminology choices a native reviewer should verify
- "Church-Based Bible Translation" = **"Tafsiri ya Biblia inayotegemea Kanisa"** — kept from the existing translation for consistency; an alternative is "Tafsiri ya Biblia inayoongozwa na Kanisa" (church-led) if "inayotegemea" (depends on) feels too weak.
- "Impact Stories" = **"Hadithi za Mabadiliko"** (stories of transformation) — used consistently in nav, stories title, and about page. "Hadithi za Matokeo" is a more literal alternative.
- "local church" = **"kanisa la mtaa"** (kept from existing strings); some regions prefer "kanisa la mahali/eneo husika".
- "Local Ownership" = "Umiliki wa Wenyeji"; "Theological Formation" = "Malezi ya Kitheolojia"; "Sustainability" = "Uendelevu"; "Multiplication" = "Kuzidisha" (kept from existing).
- "Quality Assurance" = **"Uhakikisho wa Ubora"**; "QA Mentor" = **"Mwelekezi wa Uhakikisho wa Ubora"** (mentor as mwelekezi; "mshauri" was avoided since it is used for "consultant").
- "Multimodal Translation (MMT)" = **"Tafsiri ya Njia Mbalimbali (MMT)"**, with "njia mbalimbali za mawasiliano" used where "multimodal" modifies engagement/methods. A reviewer may prefer a borrowed term.
- "White Papers" = "Makala za Utafiti" (research papers) — no established Swahili equivalent for "white paper".
- "Open Bible Stories" rendered as "Hadithi Huria za Biblia (Open Bible Stories)" — kept the English product name in parentheses; verify against the official OBS Swahili title if one exists.
- "Global South" = "nchi za Kusini mwa dunia".
- "Ukraine" = "Ukraini" (standard Swahili country name); "South America" = "Amerika Kusini".
- Scripture phrasing follows common Swahili church usage: Biblia, kanisa, injili, Neno la Mungu, Maandiko, kufanya wanafunzi (Mt 28:19), uinjilisti.

## Uncertain / flagged
- "BT Video Series" heading expanded to "Mfululizo wa Video za Tafsiri ya Biblia" (BT = Bible Translation); button label "Mfululizo wa Video wa FoundationsBT" keeps the protected name FoundationsBT.
- The em-dash and ellipsis punctuation from English was retained (…, —); Swahili typography normally accepts both.
- Note (infrastructure, not translation): `scripts/check-locales.mjs` scanned asset URLs for protected-term artifacts, so the English filename `overview_of_ccbt_qa.png` ("ccbt") falsely flagged research.json in every locale. The checker now scans only translatable strings; asset URLs are still verified byte-identical to English by the structural check.
