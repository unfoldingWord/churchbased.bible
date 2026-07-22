# Dutch (nl) translation review notes

## The flagged "CBT" artifact
- The check script's flag on `nl/research.json` was a **false positive**: the only CBT-like string is the
  English image filename `overview_of_ccbt_qa.png` (line 93), which is identical in `en/research.json` and
  must not be changed. No cognitive-therapy mistranslation ever existed in the Dutch text. The script has
  since been updated (by the QA pass) to scan only translatable strings, which resolves the flag.

## Significant corrections made
- **Removed the invented Dutch acronym "KGBV"** ("Kerk-Georiënteerde Bijbelvertaling") everywhere. Per the
  glossary, the acronym must remain exactly "CBBT". The concept name is now rendered consistently as
  "kerkgebaseerde Bijbelvertaling" (capitalized at sentence start), with "(CBBT)" kept where English has it.
- **Translated the ~53% of strings that were still English**, including: the tagline, the entire "How CBBT
  Works" headings, `about.json` power/demand/next sections, most of `research.json` (7 of 10 paper
  summaries and all three videos), `training.json` resource headings and intro, `stories.json` hero and
  comingSoon, `contact.json` intro and form options, and all `ui.json` nav/footer/strings.
- **stories.json structural defect fixed**: the machine translation had appended line2's content
  ("Hier zijn hun verhalen.") inside `hero.line1` while leaving `line2` in English. Now line1/line2 match
  the English split.
- **contact.json**: `form.email` was "Email(verplicht)" (label and required-marker glued together); now
  "E-mailadres" with "(verplicht)" only in the `required` field.
- Fixed typos/awkward MT output: "om te Bijbel te vertalen" -> "om de Bijbel ... te vertalen";
  "controleerde ... voor accuratesse" -> "op nauwkeurigheid"; "éénentwintig" -> "eenentwintig" (standard
  spelling); missing sentence-final periods restored.
- "Global South" was mistranslated as "het Zuidelijk Halfrond" (Southern Hemisphere); corrected to
  "het mondiale Zuiden".
- "over 900 people groups" had lost "over"; now "meer dan 900 bevolkingsgroepen".
- Tagline is identical in `ui.footer.tagline` and `home.hero.title` as required.

## Choices a native reviewer should verify
- **Tagline wordplay**: "A ministry of the church; the way the church does ministry" is rendered as
  "Een bediening van de kerk; de manier waarop de kerk haar bediening vormgeeft". The English repetition of
  "ministry" is kept via "bediening", but a punchier Dutch line may exist.
- **"kerkgebaseerde Bijbelvertaling"**: chosen over the previous "Kerk-Georiënteerde" (church-*oriented*,
  semantically off) and over longer paraphrases. Verify this reads naturally for Dutch church audiences.
- **Register**: informal "je/jij" used throughout (consistent with the prior translation and common on
  Dutch evangelical sites). Verify this fits the intended audience; switching to "u" would touch many strings.
- **Whitepaper titles** (research page): translated into Dutch, with the original English title kept in
  parentheses for the first three (Trustworthy and Trusted, From Unreached to Established, Letting Go)
  since the linked PDFs are English/Spanish only. Verify whether the team prefers all titles left in
  English instead.
- **Terminology**: "Resourcing" -> "Middelen"; "Quality Assurance" -> "kwaliteitsborging"; "consultants" ->
  "consulenten" (Bijbelvertaalconsulenten); "discipleship resources" -> "discipelschapsmaterialen";
  "metanarrative" -> "het overkoepelende verhaal"; "people group" -> "bevolkingsgroep" (missiological
  literature sometimes uses "volksgroep"). "Open Bible Stories", "The Bible Well", "FoundationsBT" kept
  as proper names.
- Church register uses "de Schrift" for Scripture, "het evangelie" lowercase, "Zijn Woord" with reverential
  capital for pronouns referring to God (consistent with HSV conventions).

## Unsure about
- "Innovation Lab" (paper title) kept as an English proper name: "Aanbevelingen voor kwaliteitsborging van
  het Innovation Lab".
- Nav label "Training" and page title "Training" are identical to English (the loanword is standard Dutch);
  likewise "Home", "Contact", "Menu". These show up as "untranslated" in the ratio but are correct Dutch.
