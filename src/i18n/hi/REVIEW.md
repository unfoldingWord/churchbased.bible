# Hindi (hi) translation review notes

## Significant corrections made
- Translated all remaining English strings (roughly half the strings were untranslated: home hero/quote/how/fromChurch/finalCta, most of about.json, training intro and hero, five research paper summaries and the entire video section, stories headings/CTAs, contact hero/intro/options, and nearly all of ui.json).
- Fixed the protected-term violation: "सी.बी.बी.टी." / "सीबीबीटी" (TranslatePress transliterations) replaced with the exact Latin acronym "CBBT" everywhere.
- Fixed the classic MT error "मंत्रालय" for "ministry" (means a government ministry in Hindi); replaced with "सेवकाई", the standard Hindi Christian term.
- Standardized "church" as "कलीसिया" (the term used in Hindi Bibles, e.g. IRV/OV) instead of the earlier mix of "चर्च" and "कलीसिया"; "Church-Based Bible Translation" is now consistently "कलीसिया-आधारित बाइबल अनुवाद".
- "make disciples" now uses the biblical phrase "चेले बनाना" (Matt. 28:19 wording in Hindi Bibles) instead of "शिष्य बनाना"; "discipleship" → "चेलापन".
- Tagline made identical in ui.footer.tagline and home.hero.title: "<strong>कलीसिया</strong> की एक सेवकाई; जिस रीति से कलीसिया <em>सेवकाई करती है</em>।"
- Fixed the awkward contact-form links "संपर्क करें प्रपत्र" (training.json, stories.json) → "संपर्क फ़ॉर्म", with natural sentence structure around the `<a>` tag.
- ui.nav "घर" (house) for "Home" → "मुख पृष्ठ"; contact submit "जमा करना" (infinitive "to deposit") → "भेजें".
- Stories: "बोझिल महसूस कर रहा हूँ" recast as "मुझ पर अपने लोगों के लिए बड़ा बोझ है"; "Yuracani and Quipa" transliterated as "युराकानी और क्विपा" for consistency with the other transliterated people-group names; "Read More" → "आगे पढ़ें".
- Research PDF language labels: "English" → "अंग्रेज़ी" (they name the PDF's language, per the guide); "Spanish" kept as "स्पैनिश".
- About: "संसाधनों" (wrong oblique case as a heading) → "संसाधन"; "वहनीयता" (affordability) for Sustainability → "स्थिरता"; "गुणा" (arithmetic multiplication) → "गुणन"; "संयुक्तता" for Connectedness → "परस्पर जुड़ाव"; fixed the half-English sentence in next[0].
- All inline HTML tags (`<strong>`, `<em>`, `<mark>`, `<br>`, `<a href>`) preserved and repositioned around the corresponding Hindi words; all URLs, image/video/pdf/icon/cycleImage paths untouched; JSON structure unchanged.

## Choices a native reviewer should verify
- "कलीसिया" vs "चर्च": कलीसिया is the Hindi Bible term and common in Hindi Christian writing, but some urban Indian readers say "चर्च" in everyday speech. Verify the preferred register for this audience.
- "सेवकाई" for ministry, "अगुवे/अगुवों" for leaders, "चेलापन" for discipleship — standard in Hindi Christian usage but worth confirming.
- "अगम्य से स्थापित तक" for "From Unreached to Established" — "अगम्य" is common Hindi missiology usage for "unreached"; confirm.
- "बहुविध (मल्टीमॉडल)" for "multimodal" and "महावृत्तांत" for "metanarrative" — technical coinages; a reviewer may prefer transliterations (मल्टीमॉडल, मेटानैरेटिव).
- "श्वेत पत्र" for "White Papers"; "गुणवत्ता आश्वासन" for "Quality Assurance"; "मेंटर" kept as a loanword.
- "“स्वीकृति देना”, “सुझाव देना”" for the paper title "“Signing off”, “Giving Input”" — previously the loan transliteration "साइन ऑफ" was used; confirm which reads better.
- Hero title on training page reorders the emphasis tags to fit Hindi word order (आज ही … शुरू); check the rendered emphasis looks right.
- "धर्मवैज्ञानिक नींव" for "Theological Formation" and "धर्मविज्ञान" for theology — some communities prefer "ईश्वरविज्ञान".

## Uncertainties
- "The Bible Well" and "FoundationsBT" left in Latin script as protected product names (only the descriptive words around them translated).
- "Open Bible Stories" given as "ओपन बाइबल स्टोरीज़ (Open Bible Stories)" — dual form so readers can find the product; reviewer may prefer one form only.
- "ग्लोबल साउथ" kept as a transliterated loan term (no established Hindi equivalent).
- The check script counts a few strings as identical to English by design: protected terms/labels like "The Bible Well" and "FoundationsBT वीडियो शृंखला" partial matches.
