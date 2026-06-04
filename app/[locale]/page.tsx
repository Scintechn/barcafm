import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Radio,
  Mic,
  Users,
  Calendar,
  ArrowRight,
  Phone,
  Sparkles,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { LivePlayer } from "@/components/LivePlayer";
import { AdvertiserCard } from "@/components/AdvertiserCard";
import { TrackedLink } from "@/components/TrackedLink";
import { defaultLocale, getDictionary, isLocale, locales, hreflangMap, type Locale } from "@/lib/i18n";
import { business } from "@/lib/business";
import { getFeatured } from "@/lib/advertisers";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [hreflangMap[l], `/${l}`])),
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);
  const t = dict.home;
  const featured = getFeatured();

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(124,196,42,0.30), transparent 40%), radial-gradient(circle at 80% 60%, rgba(124,196,42,0.18), transparent 45%)",
          }}
          aria-hidden="true"
        />
        <Container className="relative z-10 grid gap-10 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
              <Radio className="h-3.5 w-3.5" aria-hidden="true" />
              {t.eyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              {t.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75 md:text-xl">
              {t.subhead}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="#listen" size="lg">
                {t.primaryCta}
              </Button>
              <Button href={`/${locale}/publicidade#orcamento`} variant="secondary" size="lg">
                {t.secondaryCta}
              </Button>
            </div>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <Stat value={t.proofYears} label={t.proofYearsLabel} />
              <Stat value={t.proofFollowers} label={t.proofFollowersLabel} />
              <Stat value={t.proofCoverage} label={t.proofCoverageLabel} />
            </dl>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <LivePlayer t={dict.liveBadge} variant="hero" location="hero" />
          </div>
        </Container>
      </section>

      {/* ABOUT */}
      <Section variant="default" id="about">
        <Container className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-4">
            <Eyebrow>{t.aboutEyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              {t.aboutTitle}
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 flex flex-col gap-4 text-base leading-relaxed text-ink-700 md:text-lg dark:text-ink-300">
            {t.aboutBody.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* REACH / ALCANCE */}
      <Section variant="default" id="reach" className="!pt-0">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-950 to-ink-900 px-6 py-12 text-white md:px-12 md:py-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(circle at 15% 20%, rgba(124,196,42,0.18), transparent 45%), radial-gradient(circle at 90% 80%, rgba(124,196,42,0.12), transparent 45%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
                  <Radio className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.reachEyebrow}
                </span>
                <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                  {t.reachTitle}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
                  {t.reachSubtitle}
                </p>
              </div>

              <dl className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {t.reachStats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 60}>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-brand-400/40">
                      <dt className="font-display text-3xl font-extrabold text-brand-300 md:text-4xl">
                        {s.value}
                      </dt>
                      <dd>
                        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-white/90">
                          {s.label}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-white/55">
                          {s.detail}
                        </p>
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
                  {t.reachAreasTitle}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {t.reachAreas.map((a) => (
                    <li
                      key={a}
                      className="rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-white/85 ring-1 ring-white/10"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-8 max-w-3xl text-base italic text-white/65 md:text-lg">
                {t.reachClosingLine}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* WHY ADVERTISE */}
      <Section variant="soft" id="advertise">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>{t.whyAdvertiseEyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
              {t.whyAdvertiseTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600 md:text-lg dark:text-ink-300">
              {t.whyAdvertiseSubtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {t.whyAdvertiseItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 transition-all hover:-translate-y-1 hover:border-brand-300 hover:shadow-md dark:border-ink-800 dark:bg-ink-950 dark:hover:border-brand-500/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                    <WhyIcon i={i} />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600 dark:text-ink-300">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <Button href={`/${locale}/publicidade#orcamento`} size="lg">
              {t.whyAdvertiseCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </Section>

      {/* ADVERTISERS / DIRECTORY */}
      <Section variant="default" id="advertisers">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>{t.showsEyebrow}</Eyebrow>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                {t.showsTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-600 md:text-lg dark:text-ink-300">
                {t.showsSubtitle}
              </p>
            </div>
            <Button href={`/${locale}/anunciantes`} variant="outline" size="md">
              {t.showsCta}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((a) => (
              <AdvertiserCard
                key={a.slug}
                advertiser={a}
                categoryLabel={dict.categories[a.category]}
                t={dict.advertisers}
                locale={locale}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* LISTEN */}
      <Section variant="dark" id="listen">
        <Container className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <Eyebrow tone="brand">{t.listenEyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-4xl">
              {t.listenTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/70 md:text-lg">
              {t.listenSubtitle}
            </p>
            <div className="mt-8">
              <LivePlayer t={dict.liveBadge} variant="hero" location="listen-section" />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 grid gap-4">
            <ListenWay
              icon={<Radio className="h-5 w-5" aria-hidden="true" />}
              title={t.listenViaFm}
              body={t.listenViaFmDesc}
            />
            <ListenWay
              icon={<Sparkles className="h-5 w-5" aria-hidden="true" />}
              title={t.listenViaWeb}
              body={t.listenViaWebDesc}
            />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
                {t.listenViaPortals}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {business.listenPortals.map((p) => (
                  <li key={p.url}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500 hover:text-ink-950 transition-colors"
                    >
                      {p.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section variant="brand">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow tone="dark">{t.finalCtaEyebrow}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-ink-950 md:text-4xl">
              {t.finalCtaTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-900/80 md:text-lg">
              {t.finalCtaSubtitle}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={`/${locale}/publicidade#orcamento`} variant="secondary" size="lg">
              {t.finalCtaPrimary}
            </Button>
            <TrackedLink
              event="phone_click"
              eventProps={{ location: "home-final-cta" }}
              href={business.phone.landline.href}
              className="inline-flex h-12 items-center gap-2 rounded-full border-2 border-ink-950 px-7 font-semibold text-ink-950 hover:bg-ink-950 hover:text-brand-300 transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {t.finalCtaSecondary}
            </TrackedLink>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Eyebrow({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "brand" | "dark";
}) {
  const tones = {
    default: "text-brand-700 dark:text-brand-300",
    brand: "text-brand-300",
    dark: "text-ink-950",
  };
  return (
    <span className={`text-xs font-bold uppercase tracking-[0.18em] ${tones[tone]}`}>
      {children}
    </span>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-extrabold text-brand-300 md:text-3xl">
        {value}
      </dt>
      <dd className="mt-1 text-xs uppercase tracking-wider text-white/60">{label}</dd>
    </div>
  );
}

function WhyIcon({ i }: { i: number }) {
  const icons = [
    <Users key="u" className="h-5 w-5" aria-hidden="true" />,
    <Mic key="m" className="h-5 w-5" aria-hidden="true" />,
    <MapPin key="p" className="h-5 w-5" aria-hidden="true" />,
    <Calendar key="c" className="h-5 w-5" aria-hidden="true" />,
  ];
  return icons[i] ?? icons[0];
}

function ListenWay({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-lg font-bold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/70">{body}</p>
      </div>
    </div>
  );
}
