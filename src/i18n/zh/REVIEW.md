# zh (Simplified Chinese) — Translation QA review

## Significant corrections made

- **Tagline rebuilt** (ui.footer.tagline + home.hero.title): the machine output "一个部门 <strong>教会</strong>; 教会的方式 <em>事工</em>." was word-salad ("a department church; the church's way ministry"). Recast as "这是<strong>教会</strong>的事工，也是教会<em>做事工</em>的方式。" and kept identical in both places per the guide.
- **"How CBBT Works"** was rendered "如何 <strong>CBBT</strong> 作品" ("how CBBT artworks") — fixed to "<strong>CBBT</strong> 如何运作".
- **Broken mid-sentence tag splits** in home.json (quote, story title) reassembled into natural Chinese word order with all tags preserved around the corresponding words.
- **教堂 → 教会 throughout**: 教堂 means the church *building*; the body of believers is 教会 (about.json demand.line2, stories.json Ruska Roma body).
- **Mistranslated condition titles in about.json**: "乘法" (arithmetic multiplication) → "倍增" (Multiplication); "统一" (political unification) → "合一" (Unity, the standard Christian term); "连通性" (network connectivity) → "彼此联结" (Connectedness); "Local Ownership" → "本地主导"; "Theological Formation" → "神学造就".
- **"精神成熟" → "灵命成熟"** (spiritual maturity — 灵命 is the Christian term; 精神 reads as mental/psychological).
- **Untranslated English filled in** (roughly 30–40% of strings): about.json (power section, growth, paradigms, conditions headings, nextHeading), training.json (hero, intro, resource headings/bodies, FAQ heading), research.json (hero, intro, papers 5–10, all videos), stories.json (line2, readMore, Yuracani & Quipa story, comingSoon), contact.json (hero, intro, form labels, subject options), ui.json (nav, footer description, all strings).
- **Double punctuation "。." and stray periods after tags** removed (home.json, ui.json).
- **Zeme transliteration unified**: machine output mixed 泽梅 / 泽姆 / 泽米; standardized on 泽梅 (泽梅人, 泽梅语) everywhere, matching the existing stories.json heading.
- **"劳动力" → "人力"** for the church's "workforce" (劳动力 sounds like labor-market economics).
- **"我为我的人民感到十分难过" → "我为我的同胞深感负担"** — "I am so burdened for my people" uses the standard Christian idiom 有负担/深感负担, not "feel very sad".
- **ui.footer.description**: "最能诠释圣言的教会" ("best interprets") corrected to translation ("最适合翻译这话语的教会") to match the English "best positioned to translate it".
- **Research paper titles**: "值得信赖" → "可信，且被信任" (Trustworthy *and* Trusted — the contrast is the point of the paper); "放开" → "放手" (Letting Go); "从未得之民到已得之民" → "从未得之民到教会立足" (English is "From Unreached to Established", not "to reached").
- **PDF language labels**: "English" → "英语" (kept "西班牙语" for Spanish) per the guide's rule that these name the PDF's language.
- **Protected terms verified**: CBBT kept as "CBBT" everywhere; unfoldingWord untouched (appears only in a URL); The Bible Well, FoundationsBT left as-is.
- **Terminology standardized**: "Church-Based Bible Translation" → 以教会为本的圣经翻译 (previous files mixed 基于教会的圣经翻译 / 教会圣经翻译 / 教会翻译圣经项目); "God's Word" → 神的话语 (was mixed 上帝/圣言); "make disciples of Jesus" → 使人作耶稣的门徒 (和合本 phrasing, cf. 太28:19 使万民作我的门徒).

## Choices a native reviewer should verify

- **神 vs 上帝**: I standardized on 神 (Shen edition convention, most common in mainland simplified-Chinese church use). Communities preferring 上帝 would want a global swap.
- **"以教会为本的圣经翻译"** as the standing rendering of Church-Based Bible Translation — alternatives include 以教会为基础的圣经翻译 or 教会主导的圣经翻译.
- **Proper-noun transliterations**: 泽梅 (Zeme), 姆布莱戈 (Mblego), 塔夫雷茨与哈泰尼 (Tavretsi & Khateni — I changed the earlier 哈捷尼 to 哈泰尼 to better match the pronunciation), 鲁斯卡·罗姆 (Ruska Roma — 罗姆 matches the standard Chinese name for the Roma people; the MT had 罗玛), 尤拉卡尼与奇帕 (Yuracani & Quipa). These pseudonymous group names have no established Chinese forms.
- **《开放式圣经故事》（Open Bible Stories）**: I kept the English name in parentheses on first mention since the resource is published under its English title; drop the parenthesis if a Chinese edition title is established.
- **"multimodal" → 多模态** (research.json): standard academic term; some church audiences may prefer 多种形式/多媒介.
- **"Global South" → 全球南方**: the standard rendering, but 南半球国家 is sometimes used in church writing.
- **"引人乐读" for "appealing"** (home.json how.steps[1]) is interpretive; a reviewer may prefer 具有吸引力.

## Uncertainties

- training.json hero has nested tags (`<strong><em>begin</em></strong>` … `<strong>today</strong>` inside an outer `<strong>`). Chinese word order requires 今天 (today) before 开始 (begin), so the two inner tag groups appear in the reverse of the English order; all tags are preserved around the corresponding words.
- "感谢您的来信。✨" for the form success message assumes the ✨ emoji should be kept.
- Paper 8's English title says "Church and Community Based (CBBT)" — I rendered it 教会与社区为本（CBBT）, keeping the (CBBT) acronym exactly per the guide even though the C-and-C expansion differs.
