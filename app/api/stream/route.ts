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

export async function GET(request: Request) {
  const upstream = business.stream.url;

  try {
    const res = await fetch(upstream, {
      // Identify as a browser — some Shoutcast servers refuse fetch's default UA.
      headers: { "User-Agent": "Mozilla/5.0 (compatible; BarcaFMProxy/1.0)" },
      // Forward client abort to upstream so we don't leak the upstream socket.
      signal: request.signal,
      cache: "no-store",
      redirect: "follow",
    });

    if (!res.ok || !res.body) {
      return new Response("Upstream unavailable", { status: 502 });
    }

    const contentType = res.headers.get("content-type") ?? business.stream.format;

    return new Response(res.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        // Browsers ignore range on a live stream, but reflecting upstream avoids surprise.
        "Accept-Ranges": "none",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Stream proxy error", { status: 502 });
  }
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: { "Content-Type": business.stream.format },
  });
}
