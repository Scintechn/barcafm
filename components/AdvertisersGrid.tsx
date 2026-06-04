"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AdvertiserCard } from "./AdvertiserCard";
import { categoryOrder, type Advertiser, type AdvertiserCategory } from "@/lib/advertisers";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function AdvertisersGrid({
  advertisers,
  categories,
  t,
  locale,
}: {
  advertisers: Advertiser[];
  categories: Record<string, string>;
  t: Dictionary["advertisers"];
  locale: Locale;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AdvertiserCategory | "all">("all");

  const usedCategories = useMemo(() => {
    const set = new Set<AdvertiserCategory>(advertisers.map((a) => a.category));
    return categoryOrder.filter((c) => set.has(c));
  }, [advertisers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return advertisers.filter((a) => {
      if (category !== "all" && a.category !== category) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.shortDescription.toLowerCase().includes(q) ||
        a.services?.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [advertisers, query, category]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        <label className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
            className="h-12 w-full rounded-full border border-ink-200 bg-white pl-11 pr-4 text-base text-ink-900 placeholder:text-ink-400 outline-none focus:border-brand-500 dark:border-ink-700 dark:bg-ink-900 dark:text-white dark:placeholder:text-ink-500"
          />
        </label>
      </div>

      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:flex-wrap md:overflow-visible">
        <CatButton active={category === "all"} onClick={() => setCategory("all")}>
          {t.allCategories}
        </CatButton>
        {usedCategories.map((c) => (
          <CatButton key={c} active={category === c} onClick={() => setCategory(c)}>
            {categories[c]}
          </CatButton>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink-200 px-6 py-16 text-center dark:border-ink-700">
          <p className="text-ink-500 dark:text-ink-400">{t.emptyResults}</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <AdvertiserCard
              key={a.slug}
              advertiser={a}
              categoryLabel={categories[a.category]}
              t={t}
              locale={locale}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CatButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
        active
          ? "bg-ink-900 text-white dark:bg-brand-500 dark:text-ink-950"
          : "bg-ink-50 text-ink-700 hover:bg-ink-100 dark:bg-ink-800 dark:text-ink-300 dark:hover:bg-ink-700 dark:hover:text-white"
      )}
    >
      {children}
    </button>
  );
}
