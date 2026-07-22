# Burmese (my) translation review notes

## The flagged "CBT" artifact
- The check-script error `my/research: suspicious CBT/therapy artifact` was a **false positive**, not a
  translation defect: `/CBT/i` matched the lowercase "ccbt" inside the protected English asset filename
  `/images/uploads/2025/03/overview_of_ccbt_qa.png`, which is byte-identical in `en/research.json`
  (the checker simply skips `en`). No cognitive-therapy wording existed anywhere in the Burmese files.
- Fix applied in `scripts/check-locales.mjs`: word-boundary regex (`\bCBT\b`); a concurrent session also
  excluded asset/link values from the protected-term scan. Both changes are complementary; real artifacts
  (standalone "CBT", "terapia cognitivo…") are still caught.

## Significant corrections made
- **"Spanish" was rendered "ငပိ" (ngapi, "fermented shrimp paste")** on the three research PDF labels —
  a severe TranslatePress defect. Corrected to "စပိန်ဘာသာ"; "English" labels translated to "အင်္ဂလိပ်ဘာသာ".
- **"Sustainability" was rendered "ညီလေး" ("little brother")** in about.json — corrected to "ရေရှည်တည်တံ့မှု".
  "Multiplication" was a bare "ပွား" — now "ပွားများတိုးပွားမှု".
- **"Unity" body reversed the meaning** (it read roughly "value unity on disagreements about nonessentials").
  Recast as: unity on essentials valued over disagreement on nonessentials.
- **Contact form used the familiar/rude pronoun "မင်း"** for "your" — replaced with polite "သင်".
  "Submit" ("တင်ပြပါ။", "report/present") corrected to "ပေးပို့ရန်".
- **"church" was inconsistently rendered** as ဘုရားကျောင်း (church building), ချာ့ခ်ျ/ချာ့ချ် (ad-hoc
  transliterations, inconsistently spelled) and အသင်းတော်. Standardized on **အသင်းတော်** (the church as a
  body of believers — the standard term among Myanmar Christians) throughout all 7 files.
- Translated the ~58% of strings still left in English (all of ui.json footer/strings, most of home.json,
  research.json papers 5–10 and all videos, training intro/FAQ headings, stories items 5 and comingSoon,
  contact hero/intro/options, etc.).
- Duplicated-word paper title "ယုံကြည်စိတ်ချရသော၊ ယုံကြည်စိတ်ချရသော" ("Trustworthy and Trusted") recast as
  "ယုံကြည်စိတ်ချထိုက်ခြင်းနှင့် ယုံကြည်ခံရခြင်း" to preserve the trustworthiness-vs-trust distinction the
  paper is about.
- Register harmonized to formal written Burmese (…သည်/…ပါသည်); several colloquial machine-output sentences
  (…တယ်/…လဲ) in about.json and training.json were recast.
- Tagline unified: `ui.footer.tagline` and `home.hero.title` are now the identical string
  "<strong>အသင်းတော်</strong>၏ အမှုတော်တစ်ခု၊ အသင်းတော် <em>အမှုတော်ဆောင်သည့်</em> နည်းလမ်း။"
- Burmese numerals used in prose (နှစ်ပေါင်း ၁၀၀, ၉၀၀ ကျော်, ၂၁ ရာစု), matching existing fluent strings.

## Protected terms
- "CBBT", "unfoldingWord", "FoundationsBT", "The Bible Well", "Open Bible Stories" and people-group names
  (Zeme, Mblego, Tavretsi, Khateni, Ruska Roma, Yuracani, Quipa) kept in Latin script. The previous file had
  half-transliterated "Ruska ရိုးမား" — normalized to "Ruska Roma". "Ahmed" kept as the existing
  transliteration အာမက် (with the * footnote marker preserved).
- All URLs, image/video/pdf/href values, and inline HTML tags (including the double `<strong>` in the
  research hero and the nested `<strong><em>` in the training hero) preserved exactly.

## For a native reviewer to verify
- **အသင်းတော် for "church"** everywhere, including "village churches" (ရွာအသင်းတော်များ) — confirm this reads
  naturally where the building/local congregation nuance matters.
- **Key terminology choices**: "ယုံကြည်စိတ်ချထိုက်မှု" (trustworthiness) vs "ယုံကြည်ကိုးစားမှု" (trust);
  "အရည်အသွေးအာမခံမှု" (quality assurance); "နည်းလမ်းပေါင်းစုံ ဘာသာပြန်ခြင်း" for "Multimodal Translation (MMT)";
  "ပွင့်လင်းလိုင်စင်" for "open-licensed"; "ပုံစံသစ်များ" for "(emerging) paradigms"; "စက်ဝန်း" for "(QA) cycle";
  "သာသနာမရောက်သေးသော" for "unreached"; "ကမ္ဘာ့တောင်ပိုင်းဒေသ (Global South)".
- **Scripture phrasing**: "နှုတ်ကပတ်တော်" (Word of God, Judson-tradition spelling; the old file mixed in
  "နှုတ်ကပါဌ်တော်"), "ဧဝံဂေလိတရား" (gospel), "တပည့်တော်ဖြစ်စေခြင်း" (make disciples). Confirm these match the
  Bible edition most used by the target churches.
- "White Papers" rendered as "သုတေသနစာတမ်းများ" (research papers) — no established Burmese equivalent for the
  genre "white paper"; verify acceptability.
- "Eurasia" transliterated "ယူရေးရှား" — uncommon in Burmese; an alternative is "ဥရောပ-အာရှဒေသ".
- "Innovation Lab" left in English in the paper title (it functions as a program name); verify.
- Form-field label "Message" rendered "ပေးပို့လိုသောစာ" — a shorter UI-style alternative is "မက်ဆေ့ချ်".

## Uncertainties
- "From Unreached to Established" title rendered as "သာသနာမရောက်သေးသော အခြေအနေမှ တည်မြဲသောအသင်းတော်ဆီသို့" —
  interpretive (establishing the church is the paper's sense); a native check on the title is worthwhile.
- Mblego quote "I am so burdened for my people" rendered idiomatically as
  "ငါ့လူမျိုးအတွက် ငါ့စိတ်နှလုံး အလွန်လေးလံနေသည်" (my heart is very heavy for my people).
