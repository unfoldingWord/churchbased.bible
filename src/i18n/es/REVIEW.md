# Spanish (es) translation review — churchbased.bible

QA pass against `src/i18n/en/*.json`. Register: Latin American Spanish (site targeted "Español de México"), consistent informal "tú" throughout, warm "Trusted Guide" voice.

## Significant corrections

### Critical machine-translation defects fixed
- **home.json `finalCta.heading`**: "terapia cognitivo-conductual" (cognitive behavioral therapy — the known TranslatePress CBBT defect) replaced with "CBBT".
- **home.json `hero.title` and ui.json `footer.tagline`**: "la forma en que la iglesia *¿Hace el ministerio?*" (English "does ministry" rendered as a question) recast as "la manera en que la iglesia *hace ministerio*"; both occurrences now identical, per the guide.
- **home.json `quote`**: gender errors fixed ("El iglesia" → "La iglesia"; "un solución" → "una solución").
- **home.json `how.title`**: "Cómo CBBT Obras" (word-for-word of "How CBBT Works", with "works" as the noun "obras") → "Cómo funciona la CBBT".
- **home.json how step 2**: "…por el trabajo de traducción…" (wrong preposition) → "…para la obra de traducción…".
- **training.json `intro`**: acronym typo "(CCBT)" corrected to "(CBBT)".
- **stories.json `pdf` (Zeme)**: was `null`, breaking structure parity; restored to `/files/2024/08/Zeme.pdf` (asset fields must match English exactly).
- **stories.json**: "Mblegó" reverted to the protected proper noun "Mblego".

### Untranslated English completed (roughly 30% of strings were still English)
- about.json: `power` heading/body, `nextHeading`, the mixed English/Spanish `next[0].body` ("Revisar la impact stories of Church-Based Bible Translation from around the world!"), condition titles ("Local Ownership", "Theological Formation", "Values, Skills, Training, and Experience"), CTA labels.
- training.json: hero title, resource headings/bodies ("Getting Started", "Understanding The Source", "Going Deeper", "BT Video Series"), `faqHeading`.
- research.json: hero title, intro, `papersHeading`, six untranslated white-paper summaries (Factors, Innovation Lab QA, Evaluating BT, CBBT QA Cycle, QA Mentor, MMT), `videosHeading`, and all three video headings/bodies.
- contact.json: hero title, intro, "Your message matters!", five subject options, success message, back button.
- stories.json: `hero.line2`, all "Read More" buttons, `comingSoon` heading/body.
- ui.json: all `strings` values (form error, 404 title/body, back-home, menu, language).

### Fluency / consistency improvements
- Standardized the program name to **"Traducción Bíblica Basada en la Iglesia (CBBT)"** everywhere (files previously mixed "Traducción de la Biblia Basada en la Iglesia" and "Traducción Bíblica Basada en la Iglesia"). Dropped the recurring gloss "(CBBT son sus siglas en inglés)" in favor of the guide-mandated plain "(CBBT)".
- Unified address form to "tú" (was a mix: "Consulte la página…", "Estos recursos le proporcionarán…", "Comience").
- "Lee los cuentos" ("Read the tales") → "Lee las historias" for the Stories CTAs.
- home.json: missing space fixed ("inmensa.Los"); "traducir la Biblia a los Zeme" (translate the Bible *to the Zeme people*) → "traducir la Biblia al idioma zeme" (into the Zeme language); story title recast ("La Palabra llega a casa Zeme" → "La Palabra llega al hogar de los Zeme").
- about.json: "al rededor" → "alrededor"; "grupos étnicos" kept for "people groups".
- training.json: "sólo" → "solo" (current RAE orthography); "ministerio de evangelismo" → "ministerio del evangelio" ("gospel ministry"); "medio rentable" ("profitable") → "medio de traducción de bajo costo" (cost-effective).
- research.json: fixed "traducción de la Biblica" and a stray mid-sentence period ("agencias de traducción Bíblica. tienen"); lowercased "Bíblica" as an adjective where appropriate.
- contact.json: `email` label had "(requerido)" fused into it, duplicating the separate `required` string — now just "Correo electrónico", with `required` as "(obligatorio)".
- ui.json footer description tightened: "traducir la Biblia por sí mismas, en el idioma de su corazón" mirrors "for themselves—in the language of their hearts".
- PDF language labels on research page kept as "Inglés"/"Español" (they name the PDF's language, translated per guide rule 5).

## For a native reviewer to verify
- **CBBT gender**: I use "la CBBT" (agreeing with "la Traducción"). Confirm this matches other unfoldingWord Spanish materials.
- **"Apropiación local"** for "Local Ownership" — alternatives: "Pertenencia local", "Responsabilidad local". Common missiology usage preferred.
- **"Aseguramiento de la calidad"** for "Quality Assurance" (research.json) — confirm against any existing Spanish translations of these white papers; also "validación por parte de los líderes" for "church leader authentication".
- **"Historias Bíblicas Abiertas"** for "Open Bible Stories" (training.json FAQ) — verify this is the official Spanish title of the OBS resource; if the resource is only published under its English name, revert to "Open Bible Stories".
- **"Documentos de investigación"** for "White Papers" — "libros blancos" exists but is uncommon in this register.
- **"Sur Global"** for "Global South" (kept from the previous translation).
- **"grupos étnicos"** for "people groups" — some Spanish missiology literature prefers "etnias" or "pueblos".
- Existing white-paper title renderings kept as-is ("Confiable y de Confianza", "De No Alcanzado a Establecido", "Soltando el Control", "Aprobando versus Brindando una Opinión") since the Spanish PDFs may use these titles; verify against the actual Spanish PDF covers.

## Unsure / notes
- Proper nouns Zeme, Mblego, Tavretsi, Khateni, Ruska Roma, Yuracani, Quipa, FoundationsBT, The Bible Well, unfoldingWord left untranslated per guide. I lowercase "zeme" when it names the language ("al idioma zeme", "de habla zeme") per Spanish convention of lowercasing language names, but keep "los Zeme" capitalized for the people; a reviewer may prefer uniform capitalization.
- "The Bible Well" button label left in English (protected term). The surrounding body is Spanish.
- The em-dash in the Ruska Roma story was changed to a semicolon ("toda tu vida; de hecho…") to match Spanish punctuation norms.
