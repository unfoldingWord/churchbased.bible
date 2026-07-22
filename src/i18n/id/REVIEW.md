# Translation review notes — id (Bahasa Indonesia)

Reviewer summary of the QA pass on the machine-translated (TranslatePress) Indonesian locale.

## Significant corrections made

- **Protected acronym restored**: the MT output had localized "CBBT" to "PABG" throughout
  (home, about, training, research). Per the guide, "CBBT" must stay exactly "CBBT"; every
  occurrence of "PABG" was replaced with "CBBT". The full name "Penerjemahan Alkitab Berbasis
  Gereja" is kept, paired with "(CBBT)" where English pairs it.
- **Russian leftover removed** (contact.json): the Email field label was
  `Email(обязательно)` — a Russian "(required)" fragment leaked in by TranslatePress. Fixed
  to `Email`, with `(wajib diisi)` in the separate `required` key.
- **Wrong field label** (contact.json): the Name field was labeled "Kontak" (Contact).
  Fixed to "Nama".
- **Changed PDF URL restored** (stories.json): the Tavretsi/Khateni story PDF had been
  "translated" to `/files/2024/08/Tavretsi-dan-Khateni.pdf`. Restored to the English value
  `/files/2024/08/Tavretsi-and-Khateni.pdf` (asset paths must never change).
- **~40% English leftovers translated**: hero tagline, quote banner, "How CBBT Works"
  headings, fromChurch/finalCta sections (home); power/nextHeading/CTAs and two condition
  titles (about); hero, FAQ heading, resource headings/bodies (training); hero, intro,
  papers 5–10, video library section (research); story 5 (Yuracani/Quipa), "Read More"
  buttons, comingSoon section (stories); hero, intro, form options, success/back strings
  (contact); nav labels, footer tagline/description, error/404 strings (ui).
- **Tagline consistency**: `ui.footer.tagline` and `home.hero.title` now both read
  "Sebuah pelayanan dari <strong>gereja</strong>; cara gereja <em>melakukan pelayanan</em>."
- **Terminology standardization**: research paper bodies now consistently use "Makalah ini…"
  (previously a mix of "Karya tulis ini…" and untranslated English); "belahan dunia Selatan"
  for "Global South" (consistent casing); "suku Zeme / suku bangsa" for people groups;
  "penjaminan mutu" for quality assurance; "bahan-bahan" for resources (matching the
  Pelatihan page); "iteratif" for iterative.
- **Awkward MT recast**: about.paradigms[1] had a double "dengan … dengan" construction
  ("dengan melibatkan masyarakat dengan Kitab Suci") — recast as "dengan mengajak komunitas
  berinteraksi dengan Kitab Suci sepanjang proses penerjemahan". about.next[1] said "Anda
  dapat belajar cara menggunakan metode PABG" for "You can participate in CBBT!" — recast as
  "Anda dapat ikut ambil bagian dalam CBBT!".
- PDF language labels kept translated ("Bahasa Inggris", "Bahasa Spanyol") per the guide.

## Choices a native reviewer should verify

- **Tagline rendering**: "A ministry of the church; the way the church does ministry" →
  "Sebuah pelayanan dari gereja; cara gereja melakukan pelayanan". The English wordplay
  (ministry/does ministry) is hard to mirror; confirm this reads naturally.
- **"Memuridkan orang bagi Yesus"** for "make disciples of Jesus" — standard in Indonesian
  church usage, but confirm the preferred phrasing (alternative: "menjadikan semua orang
  murid Yesus", echoing Mat. 28:19 TB).
- **"Cerita Alkitab Terbuka (Open Bible Stories)"** (training FAQ) — I kept the Indonesian
  name with the English resource name in parentheses; verify against the official Indonesian
  OBS product name.
- **Paper titles** (research): "Dapat Dipercaya dan Terpercaya" (Trustworthy and Trusted),
  "Dari Belum Terjangkau Menjadi Mapan" (From Unreached to Established — "Mapan" chosen for
  "Established" in the church-planting sense; "berakar" or "tertanam" are alternatives),
  "Melepaskan" (Letting Go), and "Mengesahkan"/"Memberi Masukan" for "Signing off"/"Giving
  Input". These are translated titles of English-only PDFs; confirm they should be translated
  rather than left in English.
- **"Innovation Lab"** left untranslated (treated as a program name). Verify.
- **"Penjaminan mutu"** vs "jaminan kualitas" for Quality Assurance; and "skalabilitas
  praktis" for "practical scalability" (borrowed term).
- **"Teologi biblika"** for "biblical theology" (seminary register) — alternative:
  "teologi Alkitab".
- **"Belahan dunia Selatan"** for "Global South" — some Indonesian writing uses
  "Dunia Selatan" or keeps English "Global South".
- **Register**: "Anda" (capitalized, polite) used consistently for "you".
- **"Firman Itu Pulang ke Tengah Suku Zeme"** for "The Word Comes Home to the Zeme" —
  idiomatic choice; confirm "pulang" conveys the intended warmth.

## Unsure / flagged

- "The Bible Well" and "FoundationsBT" left untranslated as proper nouns (protected terms);
  the descriptor "Seri Video" was translated in the FoundationsBT button label
  ("Seri Video FoundationsBT").
- English uses em-dash and semicolon rhythm heavily; Indonesian versions keep them where
  natural but a native reviewer may prefer lighter punctuation.
- contact.success keeps the ✨ emoji from the English source.
