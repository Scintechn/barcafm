import { NextResponse, type NextRequest } from "next/server";

// Keep in sync with lib/i18n/index.ts. Inlined here so the proxy bundle
// doesn't pull the entire dictionaries.
const LOCALES = ["pt", "en"] as const;
const DEFAULT_LOCALE = "pt";
const PUBLIC_FILE = /\.[\w-]+$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // CRITICAL: /_vercel/* must be excluded — Vercel Analytics serves its
  // script there and 308-redirecting it silently kills analytics.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/_vercel") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/|_vercel/|api/|.*\\.[\\w-]+$).*)"],
};
