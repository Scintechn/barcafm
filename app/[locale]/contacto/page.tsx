import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TrackedLink } from "@/components/TrackedLink";
import {
  defaultLocale,
  getDictionary,
  isLocale,
  locales,
  hreflangMap,
  type Locale,
} from "@/lib/i18n";
import { business, singleLineAddress } from "@/lib/business";

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
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    alternates: {
      canonical: `/${locale}/contacto`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}/contacto`])
      ),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const t = dict.contact;

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
        </Container>
      </Section>

      <Section variant="default">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <ContactCard icon={<Phone className="h-5 w-5" />} title={t.callTitle} subtitle={t.callBody}>
              <TrackedLink
                event="phone_click"
                eventProps={{ location: "contact-page" }}
                href={business.phone.landline.href}
                className="font-display text-2xl font-bold text-ink-900 hover:text-brand-700"
              >
                {business.phone.landline.display}
              </TrackedLink>
            </ContactCard>

            <ContactCard icon={<Mail className="h-5 w-5" />} title={t.emailTitle} subtitle={t.emailBody}>
              <a
                href={business.email.href}
                className="font-display text-lg font-bold text-ink-900 hover:text-brand-700 break-all"
              >
                {business.email.display}
              </a>
            </ContactCard>

            <ContactCard icon={<Clock className="h-5 w-5" />} title={t.hoursTitle} subtitle={t.hoursBody}>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-900">
                <span className="pulse-dot" aria-hidden="true" />
                24/7
              </span>
            </ContactCard>

            <ContactCard icon={<MapPin className="h-5 w-5" />} title={t.visitTitle} subtitle={singleLineAddress()}>
              <TrackedLink
                event="directions_click"
                eventProps={{ location: "contact-page" }}
                href={business.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-brand-500 px-5 text-sm font-semibold text-ink-950 hover:bg-brand-400"
              >
                {t.directionsCta}
              </TrackedLink>
            </ContactCard>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-ink-100 bg-ink-100">
              <iframe
                src={business.mapEmbedSrc}
                width="100%"
                height="520"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa - Barca FM Estúdios"
                className="block"
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function ContactCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
          {icon}
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-ink-900">{title}</h3>
          <p className="mt-0.5 text-sm text-ink-600">{subtitle}</p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}
