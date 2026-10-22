// Supported interface languages, in the order shown in the switcher:
// BM (Bahasa Melayu), EN (English), 中文 (Simplified Chinese), TA (Tamil).
export const locales = ["ms", "en", "zh", "ta"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Short labels shown on the language switcher. These stay in their own script.
export const localeLabels: Record<Locale, string> = {
  ms: "BM",
  en: "EN",
  zh: "中文",
  ta: "TA",
};

// Full names for accessible labels and the mobile menu.
export const localeNames: Record<Locale, string> = {
  ms: "Bahasa Melayu",
  en: "English",
  zh: "中文",
  ta: "தமிழ்",
};

// Valid BCP 47 values for the html lang attribute.
export const localeHtmlLang: Record<Locale, string> = {
  ms: "ms",
  en: "en",
  zh: "zh-Hans",
  ta: "ta",
};

// Locale tags for Intl date formatting (Malaysian market).
export const localeDateTag: Record<Locale, string> = {
  ms: "ms-MY",
  en: "en-MY",
  zh: "zh-Hans-MY",
  ta: "ta-MY",
};
