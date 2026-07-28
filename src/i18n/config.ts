export interface LocaleDef {
  code: string;
  /** Language name in its own language — shown in the switcher. */
  name: string;
  /** BCP-47 tag emitted in <html lang> and hreflang. */
  tag: string;
  dir: 'ltr' | 'rtl';
  /** Flag emoji used by the current site's switcher. */
  flag: string;
  /**
   * Which self-hosted webfont pack the locale needs beyond the system stack.
   * Latin and Cyrillic render well from system fonts, so they load none.
   * Other values name a stylesheet generated into public/fonts/ by
   * scripts/build-font-css.mjs and <link>ed by Base.astro — see fontPackFor().
   * Must stay in sync with the :lang() rules in src/styles/global.css.
   */
  script: 'latin' | 'cyrillic' | 'arabic' | 'nastaliq' | 'devanagari' | 'bengali' | 'myanmar' | 'han';
}

/** Stylesheet path for the locale's script, or null when the system stack suffices. */
export function fontPackFor(code: string): string | null {
  const { script } = byCode(code);
  return script === 'latin' || script === 'cyrillic' ? null : `/fonts/${script}.css`;
}

export const locales: LocaleDef[] = [
  { code: 'en', name: 'English',           tag: 'en',    dir: 'ltr', flag: '🇺🇸', script: 'latin' },
  { code: 'es', name: 'Español',           tag: 'es-MX', dir: 'ltr', flag: '🇲🇽', script: 'latin' },
  { code: 'fr', name: 'Français',          tag: 'fr',    dir: 'ltr', flag: '🇫🇷', script: 'latin' },
  { code: 'hi', name: 'हिन्दी',              tag: 'hi',    dir: 'ltr', flag: '🇮🇳', script: 'devanagari' },
  { code: 'ru', name: 'Русский',           tag: 'ru',    dir: 'ltr', flag: '🇷🇺', script: 'cyrillic' },
  { code: 'ar', name: 'العربية',            tag: 'ar',    dir: 'rtl', flag: '🇸🇦', script: 'arabic' },
  { code: 'zh', name: '简体中文',           tag: 'zh-Hans', dir: 'ltr', flag: '🇨🇳', script: 'han' },
  { code: 'sw', name: 'Kiswahili',         tag: 'sw',    dir: 'ltr', flag: '🇰🇪', script: 'latin' },
  { code: 'pt', name: 'Português',         tag: 'pt-BR', dir: 'ltr', flag: '🇧🇷', script: 'latin' },
  { code: 'id', name: 'Bahasa Indonesia',  tag: 'id',    dir: 'ltr', flag: '🇮🇩', script: 'latin' },
  { code: 'vi', name: 'Tiếng Việt',        tag: 'vi',    dir: 'ltr', flag: '🇻🇳', script: 'latin' },
  { code: 'bn', name: 'বাংলা',              tag: 'bn',    dir: 'ltr', flag: '🇧🇩', script: 'bengali' },
  { code: 'ur', name: 'اردو',               tag: 'ur',    dir: 'rtl', flag: '🇵🇰', script: 'nastaliq' },
  { code: 'fa', name: 'فارسی',              tag: 'fa',    dir: 'rtl', flag: '🇮🇷', script: 'arabic' },
  { code: 'my', name: 'ဗမာစာ',             tag: 'my',    dir: 'ltr', flag: '🇲🇲', script: 'myanmar' },
  { code: 'nl', name: 'Nederlands',        tag: 'nl',    dir: 'ltr', flag: '🇳🇱', script: 'latin' },
];

export const defaultLocale = 'en';

export const pageSlugs = ['home', 'about', 'training', 'research', 'stories'] as const;
export type PageSlug = (typeof pageSlugs)[number];

export function byCode(code: string): LocaleDef {
  const found = locales.find((l) => l.code === code);
  if (!found) throw new Error(`Unknown locale: ${code}`);
  return found;
}

/** Path for a page in a locale, preserving the old site's URL scheme. */
export function localePath(locale: string, slug: PageSlug): string {
  const page = slug === 'home' ? '' : `${slug}/`;
  return locale === defaultLocale ? `/${page}` : `/${locale}/${page}`;
}
