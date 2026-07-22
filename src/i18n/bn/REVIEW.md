# Bengali (bn) translation review notes

## Significant corrections made
- **Removed all Hindi (Devanagari) fragments.** The machine-translated files were largely Hindi, not Bengali (e.g. "और अधिक जानें", "ज़ेमे को अपनी भाषा में...", "प्रशिक्षण", "संपर्क"). Every string across all 7 files was retranslated into Bengali script.
- **Removed leftover English.** Roughly half the strings (whole sections of home, about, research, stories, contact, ui) were still English; all are now Bengali except protected terms (CBBT, unfoldingWord, The Bible Well, FoundationsBT).
- **Fixed mixed-language strings**, e.g. about.json `next[0].body` was a Bengali/English/Hindi hybrid ("CBBT আসলে কাজ করে? হ্যাঁ! চেক আউট <strong>impact stories</strong>...") and about.json `demand.line1` was Hindi with the line2 sentence merged into it — the two lines are now split as in English.
- **"CBBT" restored as-is** where the Hindi text had spelled it out phonetically ("सी.बी.बी.टी." / "सीबीबीटी"); the acronym now always appears exactly as "CBBT".
- **Tagline consistency:** `ui.footer.tagline` and `home.hero.title` now use the identical Bengali rendering: "<strong>মণ্ডলীর</strong> একটি পরিচর্যা; মণ্ডলী যেভাবে <em>পরিচর্যা করে</em> সেই পথ।" (The old files had this string untranslated in one place and missing tags in the other.)
- **Inline HTML tags** (`<strong>`, `<em>`, `<mark>`, `<br>`, `<a href>`) preserved and repositioned around the corresponding Bengali words; several strings had lost or misplaced tags in the machine output.
- Research PDF language labels translated per the guide: "English" → "ইংরেজি", "Spanish" → "স্প্যানিশ" (labels describe the PDF's language; hrefs untouched).

- **Validator fix (scripts/check-locales.mjs):** the bn Devanagari-leftover check flagged `।` (U+0964 danda). The danda is pan-Indic punctuation that Unicode deliberately unifies in the Devanagari block and that standard Bengali prose (including the Bengali Bible) uses as its sentence terminator. The check now excludes U+0964/U+0965 while still catching all actual Devanagari letters, signs, and digits. Alternatives (ASCII "." or the lookalike U+09F7 currency sign) would have degraded or corrupted the Bengali text.

## Terminology choices (for native-reviewer verification)
- **church → মণ্ডলী** throughout, the standard term in Bengali Christian usage for the church as a body of believers (rather than গির্জা, which usually means the building/institution). A reviewer may prefer গির্জা or চার্চ in a few informal spots.
- **Church-Based Bible Translation → মণ্ডলী-ভিত্তিক বাইবেল অনুবাদ**, paired with "(CBBT)" where English does.
- **ministry → পরিচর্যা** (tagline: "মণ্ডলীর একটি পরিচর্যা; মণ্ডলী যেভাবে পরিচর্যা করে সেই পথ।"). Alternatives a reviewer might prefer: সেবাকাজ / সেবা.
- **Scripture → শাস্ত্র**; **God's Word → ঈশ্বরের বাক্য**; **gospel → সুসমাচার**; **disciples → শিষ্য** — all standard Bengali Bible (BSI/common-language) wording.
- **Global South → বিশ্বের দক্ষিণাঞ্চল (গ্লোবাল সাউথ)** on first use in about.json; later occurrences use বিশ্বের দক্ষিণাঞ্চল.
- **Multimodal Translation (MMT) → বহুমাধ্যম অনুবাদ (MMT)**; **Quality Assurance → গুণমান নিশ্চিতকরণ**; **white papers → গবেষণাপত্র (হোয়াইট পেপার)**. These are coined renderings — a reviewer should confirm they read naturally to the target audience.
- **Proper nouns transliterated into Bengali script** (consistent throughout): Zeme → জেমে, Mblego → মব্লেগো, Tavretsi → তাভরেৎসি, Khateni → খাতেনি, Ruska Roma → রুস্কা রোমা, Yuracani → ইউরাকানি, Quipa → কিপা. "The Bible Well" and "FoundationsBT" kept in Latin script (product names).
- **Numerals:** Bengali numerals used in running text and course labels (১০০ বছর, কোর্স ১/২/৩, ৯০০-রও বেশি); "একুশ মাস" for twenty-one months.

## Things I was unsure about (please verify)
- Paper titles in research.json are translated into Bengali even though the PDFs themselves are English/Spanish; if the site prefers keeping original English titles with Bengali descriptions, revert the `<strong>` title portions.
- "Letting Go" rendered as "ছেড়ে দেওয়া" — a reviewer may want a more idiomatic title.
- "From Unreached to Established" rendered "অনুপ্রাপ্ত থেকে প্রতিষ্ঠিত"; "unreached" has no single settled Bengali missiological term (alternatives: "সুসমাচার-বঞ্চিত", "অগম্য জনগোষ্ঠী").
- Condition titles in about.json: "Resourcing" → "সম্পদের জোগান", "Connectedness" → "পারস্পরিক সংযোগ", "Sustainability" → "স্থায়িত্ব", "Multiplication" → "বহুগুণ বৃদ্ধি" — concise UI-style renderings worth a native check.
- contact.json subject option "Error | Correction" → "ভুল | সংশোধন" (kept the pipe separator as in English).
