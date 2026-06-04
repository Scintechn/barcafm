"use client";

import { track } from "@vercel/analytics";
import { whatsappLink } from "@/lib/business";
import type { Dictionary } from "@/lib/i18n/types";

export function WhatsAppFab({ t }: { t: Dictionary["whatsapp"] }) {
  const href = whatsappLink(t.defaultMessage);
  if (!href) return null; // hidden when business.whatsapp.number is null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.ariaLabel}
      onClick={() => track("whatsapp_click", { location: "fab" })}
      className="
        group fixed bottom-4 left-4 z-40 flex h-14 items-center gap-3
        rounded-full bg-[#25D366] px-4 font-semibold text-white
        shadow-xl shadow-[#25D366]/35
        hover:bg-[#1faa51] active:scale-95
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]
        focus-visible:ring-offset-2 focus-visible:ring-offset-white
        dark:focus-visible:ring-offset-ink-950
      "
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
        {/* Inline WhatsApp glyph — lucide doesn't ship the brand mark. */}
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.001 3.2C9.057 3.2 3.401 8.856 3.401 15.8c0 2.231.585 4.41 1.694 6.328L3.2 28.8l6.83-1.789a12.594 12.594 0 0 0 5.97 1.52h.005c6.943 0 12.596-5.657 12.6-12.6 0-3.366-1.31-6.53-3.689-8.907A12.523 12.523 0 0 0 16.001 3.2zm0 23.135h-.004a10.49 10.49 0 0 1-5.345-1.464l-.383-.227-3.97 1.04 1.06-3.87-.25-.398a10.479 10.479 0 0 1-1.602-5.616c0-5.778 4.703-10.481 10.498-10.481 2.802 0 5.434 1.092 7.413 3.074a10.404 10.404 0 0 1 3.065 7.415c-.002 5.778-4.705 10.527-10.482 10.527zm5.748-7.83c-.315-.158-1.864-.92-2.152-1.025-.288-.105-.5-.158-.71.158-.21.315-.815 1.026-.999 1.236-.184.21-.368.236-.683.079-.315-.158-1.33-.49-2.534-1.563-.937-.835-1.57-1.866-1.754-2.18-.184-.316-.02-.486.138-.643.142-.141.315-.368.473-.552.158-.184.21-.316.315-.526.105-.21.053-.394-.026-.552-.079-.158-.71-1.71-.972-2.34-.256-.615-.516-.532-.71-.542l-.604-.011c-.21 0-.552.079-.841.394-.288.315-1.103 1.078-1.103 2.629 0 1.55 1.129 3.05 1.286 3.26.158.21 2.22 3.39 5.38 4.755.752.324 1.339.518 1.797.664.755.24 1.443.206 1.987.125.606-.091 1.864-.762 2.128-1.498.263-.736.263-1.367.184-1.498-.079-.131-.288-.21-.604-.368z" />
        </svg>
      </span>
      <span className="hidden sm:inline">{t.label}</span>
    </a>
  );
}
