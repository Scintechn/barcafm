import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LivePlayer } from "@/components/LivePlayer";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  hreflangMap,
  type Locale,
} from "@/lib/i18n";

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
    title: dict.schedule.metaTitle,
    description: dict.schedule.metaDescription,
    alternates: {
      canonical: `/${locale}/programacao`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/programacao`])
      ),
    },
  };
}

export default async function SchedulePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const t = dict.schedule;

  return (
    <>
      <Section variant="dark">
        <Container>
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
            {t.eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {t.subtitle}
          </p>
          <div className="mt-8 max-w-md">
            <LivePlayer t={dict.liveBadge} variant="hero" location="schedule-hero" />
          </div>
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <h2 className="font-display text-2xl font-bold text-ink-900 md:text-3xl">
            {t.daysTitle}
          </h2>
          <ol className="mt-8 space-y-3">
            {t.blocks.map((b) => (
              <li
                key={b.title}
                className="group grid items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 transition-colors hover:border-brand-300 md:grid-cols-12 md:p-6"
              >
                <div className="md:col-span-3">
                  <span className="rounded-full bg-brand-100 px-3 py-1 font-display text-sm font-bold text-brand-900">
                    {b.time}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-lg font-bold text-ink-900 md:text-xl">
                    {b.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600 md:text-base">
                    {b.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm italic text-ink-500">{t.note}</p>
        </Container>
      </Section>
    </>
  );
}
