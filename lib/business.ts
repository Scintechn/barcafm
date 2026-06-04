// Single source of truth for business facts.
// Update here — every page reads from this file.

export const business = {
  legalName: "Rádio Barca FM",
  brandName: "Barca FM",
  tagline: "A rádio com mais emoção",
  taglineLong: "A rádio com mais música portuguesa e com mais emoção",
  frequency: "99.6 FM",
  siteUrl: "https://www.barcafm.pt",
  foundedYear: 1980,
  coverage: "Minho e Douro Litoral",

  address: {
    street: "Edifício Afonso III, R. do Emigrante 14, Loja N",
    postalCode: "4980-648",
    locality: "Ponte da Barca",
    country: "Portugal",
    countryCode: "PT",
  },

  phone: {
    landline: { display: "+351 258 480 700", href: "tel:+351258480700" },
  },

  email: { display: "geral@barcafm.pt", href: "mailto:geral@barcafm.pt" },

  // Always-on broadcaster; surface "24h no ar" instead of opening hours.
  hours: { alwaysOn: true },

  geo: { lat: 41.8033, lng: -8.4143 },
  mapDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Edif%C3%ADcio+Afonso+III+R.+do+Emigrante+14+Loja+N+4980-648+Ponte+da+Barca&destination_place_id=",
  mapEmbedSrc:
    "https://www.google.com/maps?q=Edif%C3%ADcio+Afonso+III+R.+do+Emigrante+14+Ponte+da+Barca&output=embed",

  // Stream — exposed publicly, surfaced in the HTML <audio> element.
  stream: {
    url: "https://centova.radios.pt:8483/stream",
    fallbackUrl: "http://centova.radios.pt:8483/;stream.nsv",
    bitrate: "128 kbps",
    format: "audio/mpeg",
  },

  social: {
    facebook: "https://www.facebook.com/barcafmradio",
    instagram: "https://www.instagram.com/barcafmradio",
    youtube: "https://www.youtube.com/@barcafmradio",
    linkedin: "https://www.linkedin.com/company/barca-fm-radio",
  },

  socialProof: {
    facebookFollowers: 38000,
    instagramFollowers: 1841,
    googleRating: 5,
    googleReviewCount: 1,
  },

  // External listen-anywhere portals (already indexed by Google).
  listenPortals: [
    { name: "OnlineRadioBox", url: "https://onlineradiobox.com/pt/barca996/" },
    { name: "Streema", url: "https://streema.com/radios/Radio_Barca" },
    { name: "Radios.com.br", url: "https://www.radios.com.br/aovivo/radio-barca-996-fm/4929" },
  ],
} as const;

export type Business = typeof business;

// Helpers — keep small, keep here.
export function singleLineAddress(): string {
  const { street, postalCode, locality, country } = business.address;
  return `${street}, ${postalCode} ${locality}, ${country}`;
}

export function fullName(): string {
  return `${business.brandName} • ${business.frequency}`;
}
