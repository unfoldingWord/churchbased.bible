# Russian (ru) translation QA review

## Significant corrections made

- **Restored the protected acronym "CBBT" everywhere.** The machine translation had invented two competing Russian acronyms, "ЦОПБ" (home.json) and "ЦОБП" (about.json), and used them inconsistently. Per the guide, the acronym now stays "CBBT" in all files; the full name "Church-Based Bible Translation" is translated as "перевод Библии силами церкви" (see terminology note below).
- **Fixed two corrupted `pdf` URLs in stories.json.** The machine pass had transliterated the file paths into Cyrillic (`/files/2024/08/Тавреци-и-Хатени.pdf`, `/files/2024/08/Руска-Рома.pdf`), which would 404. Restored to the English values (`Tavretsi-and-Khateni.pdf`, `Ruska-Roma.pdf`).
- **Translated all remaining English strings** (roughly 40–50% of the corpus was untouched English): the entire ui.json footer/error strings and half the nav, the site tagline, home hero title, quote, section headings and two full sections (fromChurch, finalCta), about.json power/nextHeading/two condition titles, most of research.json (6 of 10 paper summaries, all 3 videos, hero, intro), training hero/headings/FAQ heading/two resource cards, contact hero/intro/form options, stories hero line 2 / "Read More" / comingSoon heading.
- **Fixed mixed-language strings**, e.g. about.json "Проверьте <strong>impact stories</strong> of Church-Based Bible Translation from around the world!" and training hero "You can begin Церковно-Ориентированный Библейский Перевод today!".
- **Fixed a Latin-script typo**: training button "Kypc 1" was typed with Latin K/y/p/c; now Cyrillic "Курс 1".
- **Fixed wrong word choices from machine translation:**
  - "evangelism" had been rendered "просвещение" (enlightenment/education) — now "благовестие".
  - "Обучение Pесурсы" (ungrammatical, plus a Latin "P") — now "Учебные ресурсы".
  - "workforce of the local church" was "рабочая сила поместной церкви" (industrial-labor connotation) — now "служители поместной церкви".
  - contact.json email label had "(обязательно)" baked in while `required` exists as its own key — removed the duplication.
  - contact.json "Other" was "Другой" (wrong gender for a form option) — now "Другое".
- **Fixed grammar/agreement errors**, e.g. home.json "чтобы переводы заслуживающий доверия, понятный, уместный..." (broken case agreement) — recast as "чтобы переводы были достоверными, понятными, уместными и привлекательными"; "народные группы" for "people groups" — now "народы".
- **Unified the tagline** (ui.footer.tagline and home.hero.title) as "Служение <strong>церкви</strong> — и то, как церковь <em>совершает служение</em>." — previously both were untranslated and only present in English.
- **Aligned repeated copy**: the "demand" line on About now matches the home-page quote ("Потребность в переводе Библии велика как никогда. Церкви нужно решение." — the old About line paraphrased it as "ответить на запрос времени").
- Training intro had drifted far from the English source (added claims, missing the "ongoing evaluation and revision after publication" emphasis, typo "публикациии") — retranslated to match the source.
- Research PDF language labels: "English"/"Spanish" now "Английский"/"Испанский" (capitalized as labels; the old file had lowercase "испанский" and untranslated "English").
- All inline HTML tags (`<strong>`, `<em>`, `<mark>`, `<br>`, `<a href>`) verified against English placement, including the nested tags in the training hero and the double-`<strong>` in the research hero.

## Terminology choices a native reviewer should verify

- **"Church-Based Bible Translation" → "перевод Библии силами церкви"** (lit. "Bible translation by the strength/efforts of the church"), with "(CBBT)" kept on first pairing. The machine output's "Церковно-Ориентированный Библейский Перевод" is a stilted calque with un-Russian Title Case. A reviewer may prefer "церковный перевод Библии" or "перевод Библии на базе церкви"; whatever is chosen should be applied consistently.
- **"make disciples" → "взращивать учеников Иисуса"**. Alternatives common in Russian evangelical usage: "подготавливать учеников", "воспитывать учеников" (Matt 28:19 Synodal: "научите все народы"). Verify against the partner churches' preferred discipleship vocabulary.
- **"Local Ownership" → "Местная ответственность"** — "ownership" has no exact Russian equivalent; alternatives: "местная сопричастность", "чувство хозяина у поместной церкви".
- **"White Papers" → "Аналитические статьи"** — no standard Russian term; "белые книги" is a poor calque.
- **"Impact Stories" → "Истории влияния"** — a reviewer may prefer "Истории перемен" (stories of change).
- **"discipleship resources" → "материалы для ученичества"** — "ученичество" is standard in evangelical circles but check the audience.
- **"community" → "община"** (and "сообщество" in the QA-community context) — chosen over "сообщество" for local-community senses.
- **Ethnonyms**: "земе" (lowercase per Russian style for ethnic groups; capitalized "Земе" only as a story card title), "Мблего", "Тавреци и Хатени", "Руска рома", "Юракани и Кипа" — transliterations should be checked, especially "Юракани" (Yuracani) and "Кипа" (Quipa).
- **"BT Video Series" heading → "Видеокурс по переводу Библии"** — expanded the "BT" abbreviation since a Russian reader would not recognize it; verify this is the desired framing. "FoundationsBT" and "The Bible Well" left untranslated as protected names.
- The letter "ё" is written as "е" throughout (matching the pre-existing style of the files and common web practice).

## Uncertainties

- **Paper title "«Утверждать» или «давать рекомендации»"** ("Signing off", "Giving Input"): these are consultant-role terms of art; the Russian rendering is interpretive. A reviewer familiar with translation-consultant terminology should confirm.
- **"От недостигнутых к утвержденным"** (From Unreached to Established): "утвержденным" (established/confirmed churches) vs. "укоренившимся"; the old machine choice "к установленному" was wrong.
- **"Достойный доверия — и пользующийся доверием"** (Trustworthy and Trusted): the distinction is hard to render compactly in Russian; verify it matches the terminology used inside the Spanish/English PDFs if a Russian PDF is ever produced.
- **Tagline** "A ministry of the church; the way the church does ministry" is a wordplay; the Russian keeps the mirror structure but a native copywriter may find a punchier equivalent.
- home.json "how" step headings form one sentence across three cards ("Подготавливая церковь… …к делу перевода… …чтобы взращивать учеников Иисуса.") — check that the ellipsis flow reads naturally in the rendered layout.
