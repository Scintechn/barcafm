import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  Globe,
  MapPin,
  Clock,
  Tag,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { TrackedLink } from "@/components/TrackedLink";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  hreflangMap,
  type Locale,
} from "@/lib/i18n";
import { advertisers, getAdvertiser } from "@/lib/advertisers";
import { business } from "@/lib/business";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    advertisers.map((a) => ({ locale, slug: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const ad = getAdvertiser(slug);
  if (!ad) return {};
  return {
    title: `${ad.name} — ${getDictionary(locale).advertisers.metaTitle}`,
    description: ad.shortDescription,
    alternates: {
      canonical: `/${locale}/anunciantes/${slug}`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/anunciantes/${slug}`])
      ),
    },
  };
}

export default async function AdvertiserDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const ad = getAdvertiser(slug);
  if (!ad) notFound();

  const dict = getDictionary(locale);
  const t = dict.advertisers;
  const category = dict.categories[ad.category];

  const directionsUrl = ad.mapDirectionsUrl
    ?? (ad.address
      ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
          `${ad.address.street}, ${ad.address.postalCode} ${ad.address.locality}`
        )}`
      : null);

  return (
    <>
      <Section variant="soft" className="!py-8">
        <Container>
          <Link
            href={`/${locale}/anunciantes`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink-600 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.detail.backToList}
          </Link>
        </Container>
      </Section>

      <Section variant="default" className="!pt-8">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-300">
                {category}
              </span>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink-900 md:text-5xl dark:text-white">
                {ad.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-ink-700 md:text-lg dark:text-ink-300">
                {ad.shortDescription}
              </p>
              {ad.longDescription && (
                <p className="mt-3 text-base leading-relaxed text-ink-600 dark:text-ink-400">
                  {ad.longDescription}
                </p>
              )}

              {ad.promo && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-brand-50 p-4 dark:bg-brand-500/15">
                  <Tag className="h-5 w-5 shrink-0 text-brand-700 mt-0.5 dark:text-brand-300" aria-hidden="true" />
                  <div>
                    <h3 className="font-display text-base font-bold text-brand-900 dark:text-brand-100">
                      {t.detail.promoTitle}
                    </h3>
                    <p className="mt-1 text-sm text-brand-900 dark:text-brand-100">
                      {ad.promo.code && <strong>{ad.promo.code}: </strong>}
                      {ad.promo.description}
                    </p>
                    {ad.promo.validUntil && (
                      <p className="mt-1 text-xs text-brand-800 dark:text-brand-300">
                        {ad.promo.validUntil}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {ad.services && ad.services.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-display text-lg font-bold text-ink-900 dark:text-white">
                    {t.detail.servicesTitle}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {ad.services.map((s) => (
                      <li
                        key={s}
                        className="rounded-full bg-ink-100 px-3 py-1.5 text-sm text-ink-700 dark:bg-ink-800 dark:text-ink-200"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                {ad.phone && (
                  <TrackedLink
                    event="advertiser_phone_click"
                    eventProps={{ slug: ad.slug }}
                    href={ad.phone.href}
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-brand-500 px-6 font-semibold text-ink-950 hover:bg-brand-400 transition-colors"
                  >
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    {t.cardCall} {ad.phone.display}
                  </TrackedLink>
                )}
                {directionsUrl && (
                  <TrackedLink
                    event="advertiser_directions_click"
                    eventProps={{ slug: ad.slug }}
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink-200 px-6 font-semibold text-ink-900 hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-white dark:hover:border-brand-500 dark:hover:text-brand-300"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {t.cardDirections}
                  </TrackedLink>
                )}
                {ad.website && (
                  <a
                    href={ad.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink-200 px-6 font-semibold text-ink-900 hover:border-brand-500 hover:text-brand-700 dark:border-ink-700 dark:text-white dark:hover:border-brand-500 dark:hover:text-brand-300"
                  >
                    <Globe className="h-4 w-4" aria-hidden="true" />
                    {t.cardWebsite}
                  </a>
                )}
              </div>
            </div>

            <aside className="lg:col-span-5 lg:col-start-8">
              <div className="space-y-4">
                {(ad.phone || ad.email) && (
                  <Card title={t.detail.contactTitle}>
                    {ad.phone && (
                      <Row icon={<Phone className="h-4 w-4" />}>
                        <a href={ad.phone.href} className="hover:text-brand-700">
                          {ad.phone.display}
                        </a>
                      </Row>
                    )}
                    {ad.email && (
                      <Row icon={<Mail className="h-4 w-4" />}>
                        <a href={ad.email.href} className="hover:text-brand-700 break-all">
                          {ad.email.display}
                        </a>
                      </Row>
                    )}
                    {ad.website && (
                      <Row icon={<Globe className="h-4 w-4" />}>
                        <a
                          href={ad.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-brand-700"
                        >
                          {ad.website.replace(/^https?:\/\//, "")}
                        </a>
                      </Row>
                    )}
                  </Card>
                )}

                {ad.address && (
                  <Card title={t.detail.addressTitle}>
                    <Row icon={<MapPin className="h-4 w-4" />}>
                      <span>
                        {ad.address.street}
                        <br />
                        {ad.address.postalCode} {ad.address.locality}
                      </span>
                    </Row>
                  </Card>
                )}

                {ad.hours && (
                  <Card title={t.detail.hoursTitle}>
                    <Row icon={<Clock className="h-4 w-4" />}>
                      <span>{ad.hours.summary}</span>
                    </Row>
                  </Card>
                )}

                {ad.social && (ad.social.facebook || ad.social.instagram) && (
                  <Card title={t.detail.socialTitle}>
                    <div className="flex items-center gap-3">
                      {ad.social.facebook && (
                        <a
                          href={ad.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-700 hover:bg-brand-500 hover:text-ink-950"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                            <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
                          </svg>
                        </a>
                      )}
                      {ad.social.instagram && (
                        <a
                          href={ad.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-100 text-ink-700 hover:bg-brand-500 hover:text-ink-950"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                            <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 3.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm0 7.3a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8zm5.6-7.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section variant="brand">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-bold text-ink-950 md:text-3xl">
              {t.cta.title}
            </h2>
            <p className="mt-2 text-ink-900/80">{t.cta.body}</p>
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

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-5 dark:border-ink-800 dark:bg-ink-900">
      <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-ink-500 dark:text-ink-400">
        {title}
      </h3>
      <div className="mt-3 space-y-2 text-sm text-ink-700 dark:text-ink-300">{children}</div>
    </div>
  );
}

function Row({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 text-ink-400 dark:text-ink-500" aria-hidden="true">
        {icon}
      </span>
      <div className="min-w-0">{children}</div>
    </div>
  );
}
