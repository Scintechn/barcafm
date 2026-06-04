import type { Dictionary } from "./types";
import { pt } from "./pt";
import { en } from "./en";

export const locales = ["pt", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

// hreflang codes for <link rel="alternate">
export const hreflangMap: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function pathFor(locale: Locale, path = ""): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean === "/" ? "" : clean}`;
}
