"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname() || "/";
  // Strip the current locale prefix
  const withoutLocale = pathname.replace(/^\/(pt|en)(?=\/|$)/, "") || "/";

  return (
    <div className="flex items-center gap-1 rounded-full border border-ink-200 p-0.5 text-xs font-semibold dark:border-ink-700">
      {locales.map((l) => {
        const href = `/${l}${withoutLocale === "/" ? "" : withoutLocale}`;
        const active = l === current;
        return (
          <Link
            key={l}
            href={href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase tracking-wide transition-colors",
              active
                ? "bg-ink-900 text-white dark:bg-brand-500 dark:text-ink-950"
                : "text-ink-600 hover:text-ink-900 dark:text-ink-400 dark:hover:text-white"
            )}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
