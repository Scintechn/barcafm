"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { TrackedLink } from "./TrackedLink";
import { cn } from "@/lib/cn";
import { business } from "@/lib/business";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/i18n";

type NavItem = { href: string; label: string };

export function Header({
  t,
  locale,
}: {
  t: Dictionary["nav"];
  locale: Locale;
}) {
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/programacao`, label: t.schedule },
    { href: `/${locale}/anunciantes`, label: t.advertisers },
    { href: `/${locale}/publicidade`, label: t.advertising },
    { href: `/${locale}/contacto`, label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-white/85 backdrop-blur-md dark:border-ink-800 dark:bg-ink-950/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink-900 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
      >
        {t.skipToContent}
      </a>

      <Container className="flex h-16 items-center justify-between gap-3 md:h-20">
        <Link
          href={`/${locale}`}
          aria-label="Barca FM"
          className="flex items-center"
        >
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-ink-700 transition-colors hover:bg-ink-100 hover:text-ink-900 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <TrackedLink
            event="phone_click"
            eventProps={{ location: "header" }}
            href={business.phone.landline.href}
            aria-label={business.phone.landline.display}
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 text-ink-700 hover:bg-ink-100 dark:border-ink-700 dark:text-ink-300 dark:hover:bg-ink-800 dark:hover:text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </TrackedLink>
          <ThemeToggle className="hidden md:inline-flex" />
          <div className="hidden sm:block">
            <LocaleSwitcher current={locale} />
          </div>
          <Button
            href={`/${locale}/publicidade#orcamento`}
            size="sm"
            className="hidden lg:inline-flex"
          >
            {t.requestQuote}
          </Button>
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 dark:border-ink-700 dark:text-ink-200"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-white dark:border-ink-800 dark:bg-ink-950">
          <Container className="py-4">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-base font-semibold text-ink-800 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-ink-800"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <LocaleSwitcher current={locale} />
                <ThemeToggle />
              </div>
              <Button
                href={`/${locale}/publicidade#orcamento`}
                size="lg"
                className="mt-3 w-full"
              >
                {t.requestQuote}
              </Button>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
