// One-off: (1) replace the Stories "coming soon" block with the new
// "Submit your impact story!" copy, (2) add footer Stay Connected strings.
// All 16 locales; email rendered as a mailto link.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const EMAIL = 'churchbased.bible@unfoldingword.org';
const MAILTO = `<a href="mailto:${EMAIL}">${EMAIL}</a>`;

const comingSoonHeading = {
  en: 'Submit <strong>your impact</strong> story!',
  es: '¡Envía <strong>tu historia de impacto</strong>!',
  fr: 'Envoyez-nous <strong>votre histoire d’impact</strong> !',
  hi: '<strong>अपनी प्रभाव की कहानी</strong> भेजें!',
  ru: 'Поделитесь <strong>вашей историей влияния</strong>!',
  ar: 'أرسلوا <strong>قصة الأثر الخاصة بكم</strong>!',
  zh: '提交<strong>您的影响故事</strong>！',
  sw: 'Tutumie <strong>hadithi yako ya mabadiliko</strong>!',
  pt: 'Envie <strong>a sua história de impacto</strong>!',
  id: 'Kirimkan <strong>kisah dampak Anda</strong>!',
  vi: 'Hãy gửi <strong>câu chuyện tác động của bạn</strong>!',
  bn: '<strong>আপনার প্রভাবের গল্প</strong> পাঠান!',
  ur: '<strong>اپنی تبدیلی کی کہانی</strong> بھیجیں!',
  fa: '<strong>داستان تأثیر خود</strong> را برای ما بفرستید!',
  my: '<strong>သင်၏ အကျိုးသက်ရောက်မှု ဇာတ်လမ်း</strong>ကို ပေးပို့ပါ!',
  nl: 'Deel <strong>jouw impactverhaal</strong>!',
};

const comingSoonBody = {
  en: `Every story shows how God is working through His church to make His Word known. Want to see your story featured? Send us an email at: ${MAILTO}.`,
  es: `Cada historia muestra cómo Dios obra a través de Su iglesia para dar a conocer Su Palabra. ¿Quieres que tu historia aparezca aquí? Escríbenos a: ${MAILTO}.`,
  fr: `Chaque histoire montre comment Dieu agit à travers Son Église pour faire connaître Sa Parole. Vous souhaitez voir votre histoire publiée ? Écrivez-nous à : ${MAILTO}.`,
  hi: `हर कहानी दिखाती है कि परमेश्वर अपने वचन को प्रकट करने के लिए अपनी कलीसिया के द्वारा कैसे काम कर रहे हैं। क्या आप चाहते हैं कि आपकी कहानी यहाँ दिखे? हमें ईमेल करें: ${MAILTO}।`,
  ru: `Каждая история показывает, как Бог действует через Свою церковь, чтобы Его Слово стало известным. Хотите, чтобы ваша история появилась здесь? Напишите нам: ${MAILTO}.`,
  ar: `كل قصة تُظهر كيف يعمل الله من خلال كنيسته ليُعرِّف بكلمته. أتريدون أن تُنشر قصتكم هنا؟ راسلونا عبر البريد الإلكتروني: ${MAILTO}.`,
  zh: `每一个故事都见证着神如何借着祂的教会使祂的话语被人认识。想让您的故事在这里展示吗？请发送电子邮件至：${MAILTO}。`,
  sw: `Kila hadithi huonyesha jinsi Mungu anavyofanya kazi kupitia kanisa lake ili Neno lake lijulikane. Ungependa hadithi yako ionekane hapa? Tutumie barua pepe: ${MAILTO}.`,
  pt: `Cada história mostra como Deus está agindo por meio da Sua igreja para tornar conhecida a Sua Palavra. Quer ver a sua história aqui? Envie-nos um e-mail: ${MAILTO}.`,
  id: `Setiap kisah menunjukkan bagaimana Allah bekerja melalui gereja-Nya untuk memperkenalkan firman-Nya. Ingin kisah Anda ditampilkan? Kirim email kepada kami di: ${MAILTO}.`,
  vi: `Mỗi câu chuyện cho thấy Đức Chúa Trời đang hành động qua hội thánh Ngài để bày tỏ Lời Ngài. Bạn muốn câu chuyện của mình được giới thiệu? Hãy gửi email cho chúng tôi tại: ${MAILTO}.`,
  bn: `প্রতিটি গল্প দেখায় ঈশ্বর কীভাবে তাঁর বাক্য প্রচারের জন্য তাঁর মণ্ডলীর মাধ্যমে কাজ করছেন। আপনার গল্প এখানে দেখতে চান? আমাদের ইমেল করুন: ${MAILTO}।`,
  ur: `ہر کہانی دکھاتی ہے کہ خدا اپنے کلام کو معروف کرنے کے لیے اپنی کلیسیا کے ذریعے کیسے کام کر رہا ہے۔ چاہتے ہیں کہ آپ کی کہانی یہاں شامل ہو؟ ہمیں ای میل کریں: ${MAILTO}۔`,
  fa: `هر داستان نشان می‌دهد که خدا چگونه از طریق کلیسای خود کار می‌کند تا کلامش شناخته شود. می‌خواهید داستان شما اینجا معرفی شود؟ به ما ایمیل بزنید: ${MAILTO}.`,
  my: `ဇာတ်လမ်းတိုင်းသည် ဘုရားသခင်၏ နှုတ်ကပတ်တော်ကို လူသိများစေရန် အသင်းတော်မှတစ်ဆင့် မည်သို့ လုပ်ဆောင်နေသည်ကို ပြသသည်။ သင့်ဇာတ်လမ်းကို ဖော်ပြစေလိုပါသလား။ ကျွန်ုပ်တို့ထံ အီးမေးလ် ပို့ပါ— ${MAILTO}။`,
  nl: `Elk verhaal laat zien hoe God door Zijn kerk heen werkt om Zijn Woord bekend te maken. Wil je jouw verhaal hier terugzien? Stuur ons een e-mail: ${MAILTO}.`,
};

const stayConnected = {
  en: 'Stay Connected',
  es: 'Mantente conectado',
  fr: 'Restez connecté',
  hi: 'जुड़े रहें',
  ru: 'Оставайтесь на связи',
  ar: 'ابقوا على تواصل',
  zh: '保持联系',
  sw: 'Tuwasiliane',
  pt: 'Fique conectado',
  id: 'Tetap Terhubung',
  vi: 'Giữ liên lạc',
  bn: 'যুক্ত থাকুন',
  ur: 'رابطے میں رہیں',
  fa: 'در ارتباط باشید',
  my: 'ဆက်သွယ်နေပါ',
  nl: 'Blijf verbonden',
};

// Lead-in only — the Footer component appends the mailto link.
const stayConnectedBody = {
  en: 'Looking for more information or help getting started? Send us an email at:',
  es: '¿Buscas más información o ayuda para comenzar? Escríbenos a:',
  fr: 'Vous cherchez plus d’informations ou de l’aide pour commencer ? Écrivez-nous à :',
  hi: 'अधिक जानकारी चाहिए या शुरुआत करने में मदद? हमें ईमेल करें:',
  ru: 'Нужна дополнительная информация или помощь, чтобы начать? Напишите нам:',
  ar: 'هل تبحثون عن مزيد من المعلومات أو مساعدة للبدء؟ راسلونا عبر البريد الإلكتروني:',
  zh: '想了解更多信息或需要入门帮助？请发送电子邮件至：',
  sw: 'Unatafuta maelezo zaidi au msaada wa kuanza? Tutumie barua pepe:',
  pt: 'Procurando mais informações ou ajuda para começar? Envie-nos um e-mail:',
  id: 'Mencari informasi lebih lanjut atau bantuan untuk memulai? Kirim email kepada kami di:',
  vi: 'Bạn cần thêm thông tin hoặc trợ giúp để bắt đầu? Hãy gửi email cho chúng tôi tại:',
  bn: 'আরও তথ্য বা শুরু করতে সাহায্য চান? আমাদের ইমেল করুন:',
  ur: 'مزید معلومات یا آغاز کے لیے مدد درکار ہے؟ ہمیں ای میل کریں:',
  fa: 'به دنبال اطلاعات بیشتر یا کمک برای شروع هستید؟ به ما ایمیل بزنید:',
  my: 'နောက်ထပ် အချက်အလက် သို့မဟုတ် စတင်ရန် အကူအညီ လိုပါသလား။ ကျွန်ုပ်တို့ထံ အီးမေးလ် ပို့ပါ—',
  nl: 'Op zoek naar meer informatie of hulp om te beginnen? Stuur ons een e-mail:',
};

for (const loc of Object.keys(stayConnected)) {
  const sPath = join(ROOT, 'src/i18n', loc, 'stories.json');
  const s = JSON.parse(readFileSync(sPath, 'utf8'));
  s.comingSoon.heading = comingSoonHeading[loc];
  s.comingSoon.body = comingSoonBody[loc];
  writeFileSync(sPath, JSON.stringify(s, null, 2) + '\n');

  const uPath = join(ROOT, 'src/i18n', loc, 'ui.json');
  const u = JSON.parse(readFileSync(uPath, 'utf8'));
  u.strings = u.strings || {};
  u.strings.stayConnected = stayConnected[loc];
  u.strings.stayConnectedBody = stayConnectedBody[loc];
  writeFileSync(uPath, JSON.stringify(u, null, 2) + '\n');
}
console.log('Patched 16 locales.');
