import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./ui/Container";
import { TrackedLink } from "./TrackedLink";
import { business, singleLineAddress } from "@/lib/business";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n";

export function Footer({ t, nav, locale }: { t: Dictionary["footer"]; nav: Dictionary["nav"]; locale: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-ink-200">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="flex flex-col gap-4 md:col-span-1">
          <div className="text-white">
            <Logo />
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-ink-300">{t.tagline}</p>
          <div className="flex items-center gap-3">
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-brand-500 hover:text-ink-950 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.8 3.7-3.8 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href={business.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-brand-500 hover:text-ink-950 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2 0 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 2c-3.1 0-3.5 0-4.7.1-1.1 0-1.7.2-2.1.3-.5.2-.9.4-1.2.8-.4.4-.6.8-.8 1.2-.1.4-.3 1-.3 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 1.1.2 1.7.3 2.1.2.5.4.9.8 1.2.4.4.8.6 1.2.8.4.1 1 .3 2.1.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1 0 1.7-.2 2.1-.3.5-.2.9-.4 1.2-.8.4-.4.6-.8.8-1.2.1-.4.3-1 .3-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-1.1-.2-1.7-.3-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.8-.6-1.2-.8-.4-.1-1-.3-2.1-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.4a4.4 4.4 0 1 1 0 8.8 4.4 4.4 0 0 1 0-8.8zm0 7.3a2.9 2.9 0 1 0 0-5.8 2.9 2.9 0 0 0 0 5.8zm5.6-7.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </a>
            <a
              href={business.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-brand-500 hover:text-ink-950 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M23.5 6.2c-.3-1-1-1.8-2-2-1.8-.5-9-.5-9-.5s-7.2 0-9 .5c-1 .2-1.8 1-2 2C1 8 1 12 1 12s0 4 .5 5.8c.3 1 1 1.8 2 2 1.8.5 9 .5 9 .5s7.2 0 9-.5c1-.2 1.8-1 2-2C23.5 16 23.5 12 23.5 12s0-4-.5-5.8zM9.7 15.4V8.6L15.8 12l-6.1 3.4z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
            {t.sectionExplore}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href={`/${locale}`} className="hover:text-brand-400">{nav.home}</Link></li>
            <li><Link href={`/${locale}/programacao`} className="hover:text-brand-400">{nav.schedule}</Link></li>
            <li><Link href={`/${locale}/anunciantes`} className="hover:text-brand-400">{nav.advertisers}</Link></li>
            <li><Link href={`/${locale}/publicidade`} className="hover:text-brand-400">{nav.advertising}</Link></li>
            <li><Link href={`/${locale}/contacto`} className="hover:text-brand-400">{nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
            {t.sectionListen}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="text-ink-200">99.6 FM · Minho</li>
            {business.listenPortals.map((p) => (
              <li key={p.url}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-400">
            {t.sectionContact}
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="text-ink-300">{singleLineAddress()}</li>
            <li>
              <TrackedLink
                event="phone_click"
                eventProps={{ location: "footer" }}
                href={business.phone.landline.href}
                className="hover:text-brand-400"
              >
                {business.phone.landline.display}
              </TrackedLink>
            </li>
            <li>
              <a href={business.email.href} className="hover:text-brand-400">
                {business.email.display}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink-800">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>© {year} {business.legalName}. {t.rights}</p>
          <div className="flex items-center gap-4">
            <Link href={`/${locale}/privacidade`} className="hover:text-brand-400">
              {locale === "pt" ? "Privacidade" : "Privacy"}
            </Link>
            <Link href={`/${locale}/termos`} className="hover:text-brand-400">
              {locale === "pt" ? "Termos" : "Terms"}
            </Link>
            <span className="text-ink-500">{t.builtBy}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
