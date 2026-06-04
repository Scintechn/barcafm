// Proxies the upstream Shoutcast HTTP stream over our own HTTPS domain so the
// browser doesn't block mixed content on production.
//
// Cost note: each open listener holds an active connection for the duration of
// their listening session. At small local-radio volume this is negligible on
// Vercel Fluid Compute, but if listener counts grow significantly, move the
// stream behind a dedicated HTTPS endpoint at the broadcaster's host (e.g.
// Shoutcast over TLS via Centova) and point the player straight at it.

import { business } from "@/lib/business";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = {
  // Identify as a browser — some Shoutcast servers refuse fetch's default UA.
  "User-Agent": "Mozilla/5.0 (compatible; BarcaFMProxy/1.0)",
} as const;

async function tryFetch(url: string, signal: AbortSignal) {
  try {
    return await fetch(url, {
      headers: HEADERS,
      signal,
      cache: "no-store",
      redirect: "follow",
    });
  } catch (e) {
    console.error(`[api/stream] upstream fetch failed: ${url}`, e);
    return null;
  }
}

export async function GET(request: Request) {
  // Try the primary upstream, then fall back to the legacy Shoutcast .nsv path.
  let res = await tryFetch(business.stream.url, request.signal);
  if (!res || !res.ok || !res.body) {
    res = await tryFetch(business.stream.fallbackUrl, request.signal);
  }

  if (!res || !res.ok || !res.body) {
    return new Response("Upstream unavailable", { status: 502 });
  }

  const contentType = res.headers.get("content-type") ?? business.stream.format;

  return new Response(res.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      "Accept-Ranges": "none",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "Content-Type": business.stream.format },
  });
}
