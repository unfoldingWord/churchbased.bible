# Urdu (ur) translation QA review

## The flagged "CBT" artifact

- The check script's CBT/therapy scan matched the **English asset filename** `overview_of_ccbt_qa.png` in `research.json` (lowercase `ccbt` survived the case-sensitive `CBBT` strip, then matched the case-insensitive `/CBT/` test). This filename is a protected asset value that must stay byte-identical to English, so the fix belonged in the script, not the JSON: the protected-term scan now runs over translatable strings only (asset/URL values excluded). The Urdu prose itself contained no CBT/cognitive-therapy artifact — verified by grep before and after. All "CBBT" occurrences remain exactly "CBBT" in Latin letters.

## Significant corrections made

- **~57% of strings were still English** (103/181). All user-facing strings are now fully in Urdu; only the protected product name "The Bible Well" remains identical to English (1/181 = 0.6%).
- **"ministry" mistranslated as وزارت** (government ministry) in machine output — recast as خدمت throughout (e.g. home story step 1, tagline).
- **Islamic register for Jesus fixed**: stories.json (Mblego) had "حضرت عیسیٰ علیہ السلام" — changed to یسوع, the wording of the Urdu Bible (کتابِ مقدس) used by Pakistani Christians. "follower of Jesus" → یسوع کا پیروکار; "disciples of Jesus" → یسوع کے شاگرد.
- **church standardized to کلیسیا** (Pakistani Christian usage). The old files mixed چرچ, گرجا گھر, and گرجہ گھر — گرجا گھر means the building, not the body of believers.
- **"Trustworthy and Trusted" was rendered "قابل اعتماد اور قابل اعتماد"** (the same word twice) — now "قابلِ اعتماد اور معتبر" to preserve the paper's trustworthiness-vs-trust distinction.
- **Garbled MT recast**: "From Unreached to Established" was "غیر پہنچ سے قائم تک" (ungrammatical) → "غیر رسائی شدہ سے قائم شدہ تک"; "contrasts two paradigms" had been mistranslated as "دو نمونوں سے متصادم ہے" ("clashes with two paradigms") → موازنہ (compares); "contribute and support" was "تعاون اور تعاون" (support and support) → fixed.
- **Broken sentence order around inline links fixed**: training.json `resourcesIntro` ended "…کے ذریعے رابطہ کریں۔ `<a>`رابطہ فارم`</a>`." (link dangling after the full stop) — the `<a href="/contact/">` link is now embedded naturally mid-sentence. Same pattern fixed in stories.json `comingSoon.body`.
- **Tagline consistency**: `ui.footer.tagline` and `home.hero.title` now carry the identical Urdu rendering ("کلیسیا کی ایک خدمت؛ وہ طریقہ جس سے کلیسیا خدمت انجام دیتی ہے۔") with the same `<strong>`/`<em>` placement.
- **PDF language labels translated**: "English" → انگریزی, "Spanish" → ہسپانوی (they name the PDF's language, per the guide).
- **Proper nouns transliterated consistently into Urdu script** (previously mixed Latin/Urdu): زیمے (Zeme — old files also had زیم), مبلیگو (Mblego), تاوریتسی اور کھاتینی (Tavretsi and Khateni), روسکا روما (Ruska Roma — removed stray trailing ۔), یوراکانی اور کیپا (Yuracani and Quipa). Kept in Latin: CBBT, unfoldingWord, FoundationsBT, The Bible Well.
- All JSON structure, key order, array lengths, URLs, and inline HTML tag sets preserved (validated by `scripts/check-locales.mjs`: 0 errors).

## Terminology choices for a native reviewer to verify

- **کلیسیا** for "church" (vs چرچ, common in speech). کلیسیا is the کتابِ مقدس (Urdu Bible) term and reads well for church leaders; confirm register for a general audience.
- **کلامِ مقدس** for "Scripture" and **بائبل** for "Bible"; **خدا کا کلام** for "God's Word". Confirm whether the audience prefers خدا or خداوند in general references to God.
- **خوشخبری** for "gospel" (message) and **انجیل** where the English "gospel/Gospel message" is doctrinal (about.json "established in the gospel" → انجیل میں قائم). Verify the split.
- **تبدیلی کی کہانیاں** for "Impact Stories" (lit. "stories of transformation") — used consistently in nav, page title, and body copy. Alternative: اثر کی کہانیاں.
- **قوم** for "people group" (e.g. زیمے قوم). Urdu has no exact equivalent; لسانی برادری felt too technical.
- **معیار کی جانچ** for "quality assurance" (with کوالٹی اشورنس gloss avoided except مربی/مینٹر gloss in one heading); **کثیر الاسلوب (ملٹی موڈل)** for "multimodal"; **عالمی جنوب (گلوبل ساؤتھ)** for "Global South" — glosses included on first use per page.
- **الٰہیاتی تشکیل** for "Theological Formation" and **بائبلی الٰہیات** for "biblical theology" — confirm علمِ الٰہیات vs الٰہیات preference.
- **افزائش** for "Multiplication" (old MT had ضرب, the arithmetic operation — wrong sense).
- **مشیر (کنسلٹنٹ)** for "consultant"; **مربی (مینٹر)** for "mentor".
- **بھارت** for "India" in stories.json (old file used انڈیا in one place); بھارت is standard Pakistani press usage — confirm preference.

## Uncertainties

- "Signing off" / "Giving Input" (research paper title): rendered ”منظوری دینا“ / ”رائے دینا“ — idiomatic but a reviewer should confirm these capture the workflow nuance.
- "BT Video Series" heading: expanded to بائبل ترجمہ ویڈیو سیریز (BT = Bible Translation); the button keeps the product name "FoundationsBT ویڈیو سیریز".
- "unreached" (stories/Yuracani): rendered خوشخبری سے محروم ("deprived of the good news"); missiological term غیر رسائی شدہ used in the research paper title. Consistent single term may be preferable.
- Curly quotation marks: used Urdu-style ”…“ inside body text; confirm site font renders these well in RTL.
- The RTL/LTR mix in strings containing Latin tokens (CBBT, MMT, FoundationsBT) relies on the site setting `dir="rtl"`; spot-check rendering of lines like "…CBBT کی تربیت دی۔" for bidi ordering.
