# Arabic (ar) translation review notes

## Significant corrections made
- Translated all strings that were still in English: the hero/tagline, `home` quote, "How CBBT Works" section headings and step 3 body, entire `fromChurch` and `finalCta` sections, `about` power section and next-steps section, all `contact` page content, most of `ui.json` (nav, footer, error strings), `research` hero/intro/headings and papers 5–10 plus all three theology videos, `stories` hero line 2, the Yuracani and Quipa story, the "coming soon" block, and the training hero/intro/resource cards/FAQ heading.
- **Content mismatch fixed in research.json paper 1** ("Trustworthy and Trusted"): the old Arabic body was a duplicate translation of paper 2's description ("contrasts two paradigms..."). Replaced with a faithful translation of the actual English summary about trustworthiness vs. trust and a systematic checking model.
- Restored dropped inline HTML tags: `<strong>` pairs in `about.growth`, `about.paradigmsHeading`, `about.paradigms`, `about.conditionsHeading`, `training.intro` (also restored the missing `<br><br>` paragraph break and the dropped final sentence about trainers being trained), and `stories.comingSoon.heading`.
- Fixed typos/artifacts from the old machine output: "في حالة في حالة الزيمي" duplication and misplaced "فقط" (training FAQ 3), missing space in "CBBTترجمات", stray "الدور.ا." fragment (research paper 4), period inside the contact-form anchor text, and the truncated FAQ 2 answer (restored the final sentence about choosing resources per community needs).
- Fixed a mistranslation in `about.paradigms[0]`: old text said CBBT "provides leaders with a translation" (يزود قادة الكنائس بترجمة); English says it *equips leaders to translate* — now "تجهّز قادة الكنائس المحلية لترجمة الكتاب المقدس".
- "الطلب إلى ترجمة الكتاب المقدس" corrected to the idiomatic "الطلب على..."; made the demand line identical in wording between `about.demand.line1` and the `home.quote`.
- Tagline made identical in `ui.footer.tagline` and `home.hero.title`: "خدمةٌ من الكنيسة؛ وهي طريقة الكنيسة في ممارسة الخدمة."
- Standardized page names across nav, page titles, and cross-references: الرئيسية / من نحن / التدريب / الأبحاث / قصص الأثر / تواصل معنا; "contact form" is consistently "نموذج التواصل".
- Protected terms kept: CBBT (Latin, never expanded), unfoldingWord untouched, "The Bible Well" and "FoundationsBT" kept in Latin script. PDF language labels translated (English → الإنجليزية, Spanish → الإسبانية; fixed old spelling الأسبانية).
- Proper-noun transliterations kept/normalized: الزيميون (Zeme), تافريتسي وخاتيني, روسكا روما; added يوراكاني وكيبا (Yuracani and Quipa) and changed Mblego from "مبلجو" to "مبليغو" (the /g/ sound is conventionally غ in MSA transliteration).

## Choices a native reviewer should verify
- **Tagline rendering**: "A ministry of the church; the way the church does ministry" → "خدمةٌ من الكنيسة؛ وهي طريقة الكنيسة في ممارسة الخدمة." The English wordplay (ministry/does ministry) is hard to mirror exactly; `<em>` was placed around "ممارسة الخدمة".
- **"Church-Based Bible Translation"** kept as the pre-existing "ترجمة الكتاب المقدس على أساس الكنيسة" for continuity. A reviewer may prefer "الترجمة الكنسيّة للكتاب المقدس" or "ترجمة الكتاب المقدس المرتكزة على الكنيسة".
- **"make disciples of Jesus"** rendered "تلمذة الناس ليسوع" (following the تلمذوا verb of Matthew 28:19 Van Dyck). Verify against local ministry usage (alternatives: صنع تلاميذ، تلمذة أتباع يسوع).
- **"unreached"** rendered "لم يبلغها/يبلغه الإنجيل" (research paper 2 title, Yuracani story). Missiological Arabic sometimes uses "الشعوب غير المُوصَلة" — reviewer's call.
- **"Letting Go"** paper title kept as the pre-existing "التخلي عن الحقوق" (interpretive but clear in context).
- **"Open Bible Stories"** rendered "قصص الكتاب المقدس المفتوحة" (training FAQ 2); if the product's official Arabic name differs, use that.
- **"gospel"** rendered "البشارة" in narrative contexts and "الإنجيل" where doctrinal ("مؤسَّسة في الإنجيل"); "evangelism/gospel ministry" → "الكرازة/الخدمة الكرازية" (fits common Arabic church usage better than "التبشير").
- **Back button arrow** (`contact.form.back`): changed "← Back" to "→ رجوع" because in an RTL layout "back" points right. If the site component flips arrows automatically via CSS, revert to "←".
- Technical QA vocabulary in research papers: "ضمان الجودة التكراري" (iterative QA), "متعددة الوسائط" (multimodal, MMT), "قابلية التوسّع العملية" (practical scalability), "مصادقة قادة الكنيسة" (church leader authentication) — worth a domain-expert check.

## Uncertainties
- "Innovation Lab" translated as "مختبر الابتكار"; if uW brands it untranslated in Arabic materials, keep the English.
- Zeme demonym: kept the existing الزيميون/الزيميين/اللغة الزيمية pattern; a reviewer may prefer شعب زيمي without the definite adaptation.
- The single string the checker still flags as identical to English is the protected proper noun "The Bible Well" (training resource button) — intentional.
