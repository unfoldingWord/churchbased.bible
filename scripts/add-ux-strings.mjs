// One-off: add UI strings introduced by the UX pass (localized) to every locale.
//   ui.json      → strings.close
//   contact.json → form.errorRequired, form.errorEmail, form.fallbackLead
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;

const close = {
  en: 'Close', es: 'Cerrar', fr: 'Fermer', hi: 'बंद करें', ru: 'Закрыть',
  ar: 'إغلاق', zh: '关闭', sw: 'Funga', pt: 'Fechar', id: 'Tutup',
  vi: 'Đóng', bn: 'বন্ধ করুন', ur: 'بند کریں', fa: 'بستن', my: 'ပိတ်ရန်', nl: 'Sluiten',
};

const errorRequired = {
  en: 'This field is required.',
  es: 'Este campo es obligatorio.',
  fr: 'Ce champ est obligatoire.',
  hi: 'यह फ़ील्ड आवश्यक है।',
  ru: 'Это поле обязательно для заполнения.',
  ar: 'هذا الحقل مطلوب.',
  zh: '此字段为必填项。',
  sw: 'Sehemu hii inahitajika.',
  pt: 'Este campo é obrigatório.',
  id: 'Kolom ini wajib diisi.',
  vi: 'Trường này là bắt buộc.',
  bn: 'এই ঘরটি আবশ্যক।',
  ur: 'یہ خانہ ضروری ہے۔',
  fa: 'این فیلد الزامی است.',
  my: 'ဤအကွက်ကို ဖြည့်ရန် လိုအပ်သည်။',
  nl: 'Dit veld is verplicht.',
};

const errorEmail = {
  en: 'Please enter a valid email address.',
  es: 'Introduce una dirección de correo electrónico válida.',
  fr: 'Veuillez saisir une adresse e-mail valide.',
  hi: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
  ru: 'Пожалуйста, введите действительный адрес электронной почты.',
  ar: 'يرجى إدخال عنوان بريد إلكتروني صالح.',
  zh: '请输入有效的电子邮件地址。',
  sw: 'Tafadhali weka anwani sahihi ya barua pepe.',
  pt: 'Insira um endereço de e-mail válido.',
  id: 'Masukkan alamat email yang valid.',
  vi: 'Vui lòng nhập địa chỉ email hợp lệ.',
  bn: 'একটি বৈধ ইমেল ঠিকানা লিখুন।',
  ur: 'براہ کرم ایک درست ای میل پتہ درج کریں۔',
  fa: 'لطفاً یک نشانی ایمیل معتبر وارد کنید.',
  my: 'မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်ပါ။',
  nl: 'Voer een geldig e-mailadres in.',
};

const fallbackLead = {
  en: 'Prefer email? Write to us at',
  es: '¿Prefieres el correo electrónico? Escríbenos a',
  fr: 'Vous préférez l’e-mail ? Écrivez-nous à',
  hi: 'ईमेल पसंद करते हैं? हमें यहाँ लिखें:',
  ru: 'Предпочитаете электронную почту? Напишите нам:',
  ar: 'تفضّل البريد الإلكتروني؟ راسلنا على',
  zh: '更喜欢电子邮件？请写信至',
  sw: 'Unapendelea barua pepe? Tuandikie:',
  pt: 'Prefere e-mail? Escreva para nós em',
  id: 'Lebih suka email? Tulis kepada kami di',
  vi: 'Bạn thích gửi email hơn? Hãy viết cho chúng tôi tại',
  bn: 'ইমেল পছন্দ করেন? আমাদের লিখুন:',
  ur: 'ای میل کو ترجیح دیتے ہیں؟ ہمیں لکھیں:',
  fa: 'ایمیل را ترجیح می‌دهید؟ برای ما بنویسید:',
  my: 'အီးမေးလ်ကို ပိုနှစ်သက်ပါသလား? ကျွန်ုပ်တို့ထံ စာရေးပါ—',
  nl: 'Liever e-mailen? Schrijf ons op',
};

const LOCALES = Object.keys(close);

for (const loc of LOCALES) {
  const uiPath = join(ROOT, 'src/i18n', loc, 'ui.json');
  const ui = JSON.parse(readFileSync(uiPath, 'utf8'));
  ui.strings = ui.strings || {};
  ui.strings.close = close[loc];
  writeFileSync(uiPath, JSON.stringify(ui, null, 2) + '\n');

  const cPath = join(ROOT, 'src/i18n', loc, 'contact.json');
  const c = JSON.parse(readFileSync(cPath, 'utf8'));
  c.form.errorRequired = errorRequired[loc];
  c.form.errorEmail = errorEmail[loc];
  c.form.fallbackLead = fallbackLead[loc];
  writeFileSync(cPath, JSON.stringify(c, null, 2) + '\n');
}
console.log(`Patched ${LOCALES.length} locales.`);
