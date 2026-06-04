import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Megaphone, ArrowRight, Ear } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { AdvertisersGrid } from "@/components/AdvertisersGrid";
import { Button } from "@/components/ui/Button";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  hreflangMap,
  type Locale,
} from "@/lib/i18n";
import { advertisers } from "@/lib/advertisers";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.advertisers.metaTitle,
    description: dict.advertisers.metaDescription,
    alternates: {
      canonical: `/${locale}/anunciantes`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/anunciantes`])
      ),
    },
  };
}

export default async function AdvertisersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const t = dict.advertisers;

  return (
    <>
      <Section variant="dark" className="!pb-12">
        <Container>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
            <Megaphone className="h-3.5 w-3.5" aria-hidden="true" />
            {t.eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {t.subtitle}
          </p>
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            <Ear className="h-5 w-5 text-brand-300" aria-hidden="true" />
            <span>{t.heardAnAd}</span>
          </div>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <AdvertisersGrid
            advertisers={[...advertisers]}
            categories={dict.categories}
            t={t}
            locale={locale}
          />
        </Container>
      </Section>

      <Section variant="brand">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-ink-950 md:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mt-3 text-base text-ink-900/80 md:text-lg">{t.cta.body}</p>
          </div>
          <Button href={`/${locale}/publicidade#orcamento`} variant="secondary" size="lg">
            {t.cta.button}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </Container>
      </Section>
    </>
  );
}
