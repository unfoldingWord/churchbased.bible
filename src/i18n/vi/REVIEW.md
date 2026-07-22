# Vietnamese (vi) translation review notes

## Significant corrections made
- **"Church-Based Bible Translation" standardized** to "Phiên dịch Kinh Thánh dựa trên Hội thánh" everywhere (with "(CBBT)" kept where English pairs it). The machine output used at least five inconsistent renderings, several of them wrong or Catholic-register: "Bản dịch Kinh thánh của Giáo hội" (a translation *belonging to* the [Catholic] Church), "Dịch thuật Kinh thánh tại Giáo hội", "Bản dịch Kinh Thánh dựa trên Giáo hội", "Bản dịch Kinh thánh dựa trên nhà thờ", "việc dịch Kinh thánh tại nhà thờ".
- **Church register fixed throughout**: "Giáo hội" (Catholic-flavored) and "nhà thờ" (church *building*) replaced with "hội thánh" (Protestant congregation/church), matching the requested register.
- **"CBBT" preserved** as-is everywhere (no expansion, no altered acronym).
- **Remaining English translated** (~45–50% of strings were untouched English): entire footer/UI strings block, nav labels ("About", "Research", "Impact Stories"), the tagline, home hero title, home "quote", "How CBBT Works" headings, fromChurch and finalCta blocks, about-page power/growth/paradigms/conditions headings, all of training intro and resource headings/bodies, six untranslated research paper summaries, all three video descriptions, stories page (Yuracani/Quipa story, coming-soon block, "Read More"), and most of contact.json (hero, intro, form options, success message).
- **Tagline consistency**: `ui.footer.tagline` and `home.hero.title` are now the identical string "Một mục vụ của <strong>hội thánh</strong>; cách hội thánh <em>thi hành mục vụ</em>."
- **MT howlers recast**:
  - research: "Đáng tin cậy và đáng tin cậy" ("Trustworthy and Trustworthy") → "Đáng tin cậy và được tin cậy" (Trustworthy and Trusted).
  - research PDF labels: "người Tây Ban Nha" ("a Spanish person") → "Tiếng Tây Ban Nha" (the Spanish language); "English" → "Tiếng Anh" (guide says language labels are translated).
  - about: "Phép nhân" (arithmetic multiplication) → "Sự nhân rộng" (Multiplication of ministry).
  - about: "Hội thánh được thành lập trong phúc âm" ("founded/incorporated in the gospel") → "được vững lập trong Phúc Âm" (established/grounded).
  - about: mixed-language sentence "Kiểm tra <strong>impact stories</strong> of Church-Based..." fully recast in Vietnamese.
  - stories: "Tôi quá gánh nặng cho người dân của mình" ("I am too much of a burden to my people" — reversed meaning) → "Tôi mang gánh nặng lớn cho dân tộc mình" (I carry a great burden for my people).
  - stories: "một nhóm đông người" ("a large crowd") → "một dân tộc đông người" (a large people group); "people groups" rendered "dân tộc" rather than "nhóm người" throughout.
  - training/stories: typo "Mâu liên hệ" → "biểu mẫu liên hệ" (contact form).
  - contact: "Nộp" (submit homework/paperwork) → "Gửi" (send); "(yêu cầu)" → "(bắt buộc)" (required field).
  - "spiritual maturity": "tâm linh" (generic/folk-religious spirituality) → "thuộc linh" (Protestant term).
- **Terminology normalized**: "Kinh Thánh" capitalized consistently (was mixed "Kinh thánh"/"Kinh Thánh"); "Chúa Giê-su"/"Chúa Giêsu" → "Chúa Giê-xu" (Protestant spelling); "đào tạo môn đồ" → "môn đồ hóa" for "make disciples"; "huấn luyện" preferred over "đào tạo" for ministry training (nav, page title, headings); God rendered "Đức Chúa Trời", gospel "Phúc Âm".
- **Proper nouns kept**: Zeme, Mblego, Tavretsi, Khateni, Ruska Roma, Yuracani, Quipa, FoundationsBT, The Bible Well, unfoldingWord, Open Bible Stories (glossed "Truyện Kinh Thánh Mở (Open Bible Stories)").
- All URLs, `image`/`icon`/`video`/`pdf`/`href`/`cycleImage` values, JSON structure, and inline HTML tags (including the nested `<strong><em>` in the training hero and the `<mark>` quote) preserved exactly.

## For a native reviewer to verify
- The CBBT term of art "Phiên dịch Kinh Thánh dựa trên Hội thánh" — an alternative is "Dịch Kinh Thánh do Hội thánh thực hiện"; confirm which reads best to Vietnamese church leaders and that "dựa trên" doesn't sound too technical.
- "môn đồ hóa cho Chúa Giê-xu" for "make disciples of Jesus" — confirm this is natural in your church tradition (alternative: "đào tạo môn đồ cho Chúa Giê-xu").
- "thi hành mục vụ" in the tagline for "does ministry" (alternatives: "làm mục vụ", "thực thi mục vụ").
- "Nam Bán cầu" for "Global South" — widely used but check it reads as the missiological term, not merely geographic.
- "đại tự sự Kinh Thánh" for "biblical metanarrative" (research videos) — somewhat academic; a reviewer may prefer "câu chuyện tổng thể của Kinh Thánh".
- "Truyện Kinh Thánh Mở (Open Bible Stories)" — confirm against any existing Vietnamese OBS branding.
- "Tài liệu chuyên đề" for "White Papers"; "liên hệ phái" for "cross-denominationally"; "Âu-Á" for "Eurasia"; "Ukraina" for "Ukraine" (VN media also uses "Ukraine").
- Honorific capitalization of pronouns for God ("Ngài", "Lời Ngài") was used; confirm house style.

## Uncertainties
- "Trình đơn" for the "Menu" label is formal; many Vietnamese sites keep the English "Menu". I chose the Vietnamese word since the guide asks for full translation.
- Story titles like "Buông tay" (Letting Go) and "Từ chưa được vươn đến trở nên vững lập" (From Unreached to Established) are my renderings of paper titles that have no published Vietnamese titles; the PDFs themselves remain English/Spanish.
- Left identical to English (protected/standard): Zeme, Mblego, Ruska Roma, Sudan, The Bible Well, Email — these account for the 3.3% "untranslated" ratio in check-locales.
