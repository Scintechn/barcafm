import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LivePlayer } from "@/components/LivePlayer";
import {
  locales,
  defaultLocale,
  getDictionary,
  hreflangMap,
  isLocale,
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
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [hreflangMap[l], `/${l}`])
      ),
    },
    openGraph: {
      type: "website",
      siteName: business.brandName,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      locale: hreflangMap[locale],
      url: `${business.siteUrl}/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RadioStation",
    "@id": `${business.siteUrl}/#radio`,
    name: business.legalName,
    alternateName: business.brandName,
    url: business.siteUrl,
    logo: `${business.siteUrl}/icon.svg`,
    image: `${business.siteUrl}/icon.svg`,
    slogan: business.tagline,
    description: dict.meta.siteDescription,
    telephone: business.phone.landline.display,
    email: business.email.display,
    foundingDate: String(business.foundedYear),
    broadcastFrequency: {
      "@type": "BroadcastFrequencySpecification",
      broadcastFrequencyValue: 99.6,
      broadcastFrequencyUnit: "MHz",
      broadcastSignalModulation: "FM",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Minho" },
      { "@type": "AdministrativeArea", name: "Douro Litoral" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.locality,
      addressCountry: business.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    sameAs: [
      business.social.facebook,
      business.social.instagram,
      business.social.youtube,
      business.social.linkedin,
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: business.phone.landline.display,
        email: business.email.display,
        availableLanguage: ["Portuguese", "English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: business.phone.landline.display,
        email: business.email.display,
        availableLanguage: ["Portuguese", "English"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex min-h-screen flex-col">
        <Header t={dict.nav} liveBadge={dict.liveBadge} locale={locale} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer t={dict.footer} nav={dict.nav} locale={locale} />
      </div>
      <LivePlayer t={dict.liveBadge} variant="fab" location="fab" />
      <Analytics />
      <span className="sr-only">{singleLineAddress()}</span>
    </>
  );
}
