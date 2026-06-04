import Link from "next/link";
import { Phone, MapPin, Globe, ArrowRight, Tag } from "lucide-react";
import type { Advertiser } from "@/lib/advertisers";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n";

export function AdvertiserCard({
  advertiser,
  categoryLabel,
  t,
  locale,
}: {
  advertiser: Advertiser;
  categoryLabel: string;
  t: Dictionary["advertisers"];
  locale: Locale;
}) {
  const initial = advertiser.name.slice(0, 1);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg dark:border-ink-800 dark:bg-ink-900 dark:hover:border-brand-500/60 dark:hover:shadow-brand-500/10">
      <div className="flex items-start gap-4 p-5">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-300 font-display text-xl font-extrabold text-brand-900"
          aria-hidden="true"
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700 dark:text-brand-300">
            {categoryLabel}
          </span>
          <h3 className="mt-1 font-display text-lg font-bold leading-tight text-ink-900 dark:text-white">
            <Link
              href={`/${locale}/anunciantes/${advertiser.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {advertiser.name}
            </Link>
          </h3>
        </div>
      </div>

      <p className="px-5 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
        {advertiser.shortDescription}
      </p>

      {advertiser.promo && (
        <div className="mx-5 mt-4 flex items-start gap-2 rounded-xl bg-brand-50 px-3 py-2.5 text-xs dark:bg-brand-500/15">
          <Tag className="h-3.5 w-3.5 shrink-0 text-brand-700 mt-0.5 dark:text-brand-300" aria-hidden="true" />
          <span className="text-brand-900 leading-snug dark:text-brand-100">
            <strong>{advertiser.promo.code ? `${advertiser.promo.code}: ` : ""}</strong>
            {advertiser.promo.description}
          </span>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 px-5 pb-5 pt-5 text-xs text-ink-600 dark:text-ink-400">
        {advertiser.phone && (
          <span className="inline-flex items-center gap-1">
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{advertiser.phone.display}</span>
          </span>
        )}
        {advertiser.address && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{advertiser.address.locality}</span>
          </span>
        )}
        {advertiser.website && (
          <span className="inline-flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Web</span>
          </span>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-ink-100 bg-ink-50/60 px-5 py-3 text-sm font-semibold text-brand-700 transition-colors group-hover:bg-brand-50 dark:border-ink-800 dark:bg-ink-950/40 dark:text-brand-300 dark:group-hover:bg-brand-500/15">
        <span>{t.cardListenAd}</span>
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </div>
    </article>
  );
}
