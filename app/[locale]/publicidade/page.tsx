import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mic, Megaphone, Trophy, Calendar, ListChecks, Share2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
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
    title: dict.advertising.metaTitle,
    description: dict.advertising.metaDescription,
    alternates: {
      canonical: `/${locale}/publicidade`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/publicidade`])
      ),
    },
  };
}

export default async function AdvertisingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const t = dict.advertising;

  const FormatIcon = [Mic, Megaphone, Trophy, Calendar, ListChecks, Share2];

  return (
    <>
      <Section variant="dark" className="!pb-12">
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
        </Container>
      </Section>

      <Section variant="default">
        <Container>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              {t.formatsTitle}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              {t.formatsSubtitle}
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {t.formats.map((f, i) => {
              const Icon = FormatIcon[i] || Mic;
              return (
                <Reveal key={f.title} delay={i * 60}>
                  <div className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-md">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {f.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section variant="soft">
        <Container>
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              {t.processTitle}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              {t.processSubtitle}
            </h2>
          </div>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((s, i) => (
              <li
                key={s.title}
                className="rounded-2xl border border-ink-100 bg-white p-6"
              >
                <div className="font-display text-3xl font-extrabold text-brand-500">
                  0{i + 1}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-ink-900">
                  {s.title.replace(/^\d+\.\s*/, "")}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section variant="default" id="orcamento">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
              {t.formTitle}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              {t.formSubtitle}
            </h2>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <QuoteForm t={t.form} locale={locale} />
          </div>
        </Container>
      </Section>
    </>
  );
}
