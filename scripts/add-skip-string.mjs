// One-off: add ui.strings.skipToContent (the keyboard skip link) to all locales.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

const skipToContent = {
  en: 'Skip to content',
  es: 'Saltar al contenido',
  fr: 'Aller au contenu',
  hi: 'सामग्री पर जाएँ',
  ru: 'Перейти к содержанию',
  ar: 'الانتقال إلى المحتوى',
  zh: '跳到主要内容',
  sw: 'Nenda kwa maudhui',
  pt: 'Ir para o conteúdo',
  id: 'Lompat ke konten',
  vi: 'Chuyển đến nội dung',
  bn: 'মূল বিষয়বস্তুতে যান',
  ur: 'مواد پر جائیں',
  fa: 'رفتن به محتوا',
  my: 'အဓိကအကြောင်းအရာသို့ ကျော်ပါ',
  nl: 'Naar inhoud',
};

for (const [loc, value] of Object.entries(skipToContent)) {
  const p = join(ROOT, 'src/i18n', loc, 'ui.json');
  const ui = JSON.parse(readFileSync(p, 'utf8'));
  ui.strings = ui.strings || {};
  ui.strings.skipToContent = value;
  writeFileSync(p, JSON.stringify(ui, null, 2) + '\n');
}
console.log(`Patched ${Object.keys(skipToContent).length} locales.`);
