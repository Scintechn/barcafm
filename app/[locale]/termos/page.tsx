import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  hreflangMap,
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
    title: dict.terms.metaTitle,
    alternates: {
      canonical: `/${locale}/termos`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/termos`])
      ),
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const dict = getDictionary(raw);
  const t = dict.terms;
  return (
    <Section variant="default">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          {t.title}
        </h1>
        <p className="mt-2 text-sm text-ink-500">{t.updated}</p>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-700">
          {t.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </Section>
  );
}
