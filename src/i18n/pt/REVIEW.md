# pt (Português do Brasil) — Translation QA review

## Significant corrections made
- **Wrong language string**: `contact.json` form.email was Russian ("электронная почта") — replaced with "E-mail".
- **Large untranslated blocks**: roughly 40–50% of strings were still English (all of `ui.json` strings/footer, most of `research.json` papers 5–10 and all videos, `home.json` hero/quote/fromChurch/finalCta, `about.json` power/growth/paradigms sections, `training.json` hero/intro and several resource cards, `stories.json` Yuracani/Quipa story and comingSoon, `contact.json` hero/intro/subject options). All fully translated into Brazilian Portuguese.
- **Nav "Home" was "Lar"** (home as dwelling — a classic MT error) — corrected to "Início".
- **Paper title "Trustworthy and Trusted" was "Confiável e confiável"** (same adjective twice, losing the paper's core distinction) — corrected to "Confiável e digna de confiança", distinguishing "confiabilidade" (trustworthiness) from "confiança" (trust) in the body text.
- **European Portuguese forms normalized to Brazilian**: "planeiam" → "planejam", "vêem" → "veem" (also pre-reform spelling), "rever" → "revisar", "partilha" → "compartilha", "fiabilidade" → "confiabilidade", "permitiu-lhes" recast, "demasiados projetos ... para acompanharem" recast, "Dito isto" → "Dito isso".
- **CBBT gender consistency**: mixed "o CBBT"/"a CBBT" unified to feminine "a CBBT" (agreeing with "a Tradução"). "CBBT" kept exactly as the acronym everywhere (never expanded or altered).
- **Mixed-language sentence** in `about.json` next[0] ("Confira a <strong>impact stories</strong> of Church-Based...") fully recast.
- **Tagline consistency**: `ui.footer.tagline` and `home.hero.title` now identical: "Um ministério da <strong>igreja</strong>; a maneira como a igreja <em>faz ministério</em>."
- **PDF language labels** translated ("English" → "Inglês"; "Spanish" → "Espanhol") while hrefs left untouched.
- **"People groups"** rendered as "povos" (standard Brazilian missiology usage) instead of the literal "grupos de pessoas".
- All URLs, `image`/`icon`/`video`/`pdf`/`href`/`cycleImage` values, JSON structure, array lengths, and inline HTML tags (including the doubled `<strong>` in research hero and the trailing-space tag quirks in home quote and about paradigms) preserved exactly.

## Choices a native reviewer should verify
- **"Tradução da Bíblia Baseada na Igreja"** as the standing rendering of "Church-Based Bible Translation" (kept from the existing files; always paired with "(CBBT)" where English does).
- **"Local Ownership" → "Protagonismo local"** (about.json condition title). Alternatives: "Apropriação local" or "Propriedade local"; "protagonismo" reads most naturally in Brazilian church/missions register but is slightly interpretive.
- **"White Papers" → "Artigos de pesquisa"** (research.papersHeading). Brazil often keeps the English "white papers"; verify preference.
- **"Innovation Lab" → "Laboratório de Inovação"** in one paper title. If Innovation Lab is treated as a uW program proper noun, it may need to stay in English.
- **"BT Video Series" → "Série de vídeos sobre tradução da Bíblia"** — expanded the "BT" acronym since it is opaque in Portuguese. Button label kept "FoundationsBT" (protected name): "Série de vídeos FoundationsBT".
- **"Open Bible Stories" → "Histórias Bíblicas Abertas (Open Bible Stories)"** in training FAQ — kept the English resource name in parentheses since the product is distributed under its English brand.
- **Mblego quote**: "I am so burdened for my people" → "Carrego um grande fardo pelo meu povo" — idiomatic choice for the missions register.
- **The Word Comes Home** (home story title) → "A Palavra chega ao lar dos Zeme" — the "comes home" metaphor is rendered with "lar"; verify it lands naturally.
- **Church capitalization**: English footer capitalizes "Church" mid-sentence; Portuguese normally lowercases "igreja", which I followed (except where it starts a sentence or is part of the CBBT name).

## Uncertainties
- Zeme, Mblego, Tavretsi, Khateni, Ruska Roma, Yuracani, Quipa, The Bible Well, FoundationsBT, unfoldingWord left untransliterated per guide; "os Zeme" treated as invariable plural.
- Scripture-adjacent phrasing ("De toda nação e língua", "edificando a Sua igreja", "fazer discípulos de Jesus") follows common Almeida-tradition wording but was not checked against a specific Bible edition.
- Second-person forms use "você" consistently (Brazilian standard for this register).
