import type { Locale } from "./config";
import en from "./dictionaries/en";
import ms from "./dictionaries/ms";
import zh from "./dictionaries/zh";
import ta from "./dictionaries/ta";

// English is the source of truth for the shape; every locale must match it.
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { ms, en, zh, ta };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

// Replace {name} placeholders in a dictionary string.
export function format(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in values ? String(values[key]) : match,
  );
}
