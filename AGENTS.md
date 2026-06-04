<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Barca FM — Agent notes

Modern marketing site for Rádio Barca FM (99.6 FM, Ponte da Barca). Built with the
`business-site-builder` skill conventions: Next.js 16 App Router + Tailwind v4 +
TypeScript strict, locale-prefixed routes, server-by-default, near-zero vendor cost.

## Two single sources of truth

- **`lib/business.ts`** — every business fact (phone, address, frequency, stream URL,
  social URLs, follower counts). To change a phone number, edit only this file.
- **`lib/i18n/{pt,en}.ts`** — every user-facing string. PT is primary. Adding a key
  to `lib/i18n/types.ts` fails the build until every locale provides it.
- **`lib/advertisers.ts`** — the radio's advertiser directory. Add an entry → the
  card on `/anunciantes` and the detail page at `/anunciantes/{slug}` exist.

## Routing

- All public routes live under `app/[locale]/`. `proxy.ts` redirects `/foo` → `/pt/foo`.
- Locales: `pt` (default), `en`. Inline both in `proxy.ts`'s `LOCALES`.

## Primary conversion

The "Pedir orçamento" (ad quote) form on `/publicidade#orcamento` delivers to a
Telegram bot. See `app/[locale]/publicidade/actions.ts`. Configure env vars
(`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) in Vercel — see `.env.local.example`.

## Dev

```bash
pnpm dev          # http://localhost:3001
pnpm build
pnpm start
```

## Deviations from the skill default

- **Always-on broadcaster**: `business.hours.alwaysOn = true`. Surfaced as 24/7 badge.
- **No WhatsApp**: replaced WhatsApp FAB with the live-audio player FAB.
- **Advertisers directory**: added as a first-class section per the brief — listeners
  often hear an ad but can't catch the details, so the site preserves them.
