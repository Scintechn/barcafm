// Directory of current radio advertisers.
// Add a new entry, redeploy, and the directory + detail page are live.
// Listeners who heard an ad on-air can find every detail here.

export type AdvertiserCategory =
  | "restauracao"
  | "comercio"
  | "automovel"
  | "construcao"
  | "saude"
  | "beleza"
  | "servicos"
  | "imobiliaria"
  | "agricultura"
  | "eventos";

export type Advertiser = {
  slug: string;
  name: string;
  category: AdvertiserCategory;
  shortDescription: string;
  longDescription?: string;
  services?: string[];

  phone?: { display: string; href: string };
  whatsapp?: { display: string; href: string };
  email?: { display: string; href: string };
  website?: string;

  address?: {
    street: string;
    postalCode: string;
    locality: string;
  };
  geo?: { lat: number; lng: number };
  mapDirectionsUrl?: string;

  hours?: {
    summary: string; // short human-readable
    detailed?: { day: string; open: string; close: string }[];
  };

  social?: {
    facebook?: string;
    instagram?: string;
  };

  promo?: { code?: string; description: string; validUntil?: string };
  logoUrl?: string; // /advertisers/{slug}.png in /public when available
  brandColor?: string; // hex; used for accent on detail page
  featured?: boolean; // pinned to homepage
};

// Seed entries — placeholders for the demo. Replace with real advertisers
// supplied by the station after launch. Each is a realistic local-business
// shape so the UI looks correct from day one.
export const advertisers: Advertiser[] = [
  {
    slug: "talho-do-emigrante",
    name: "Talho do Emigrante",
    category: "comercio",
    shortDescription: "Talho tradicional em Ponte da Barca — carne nacional, fumeiro caseiro.",
    services: ["Carne fresca nacional", "Fumeiro caseiro", "Encomendas para eventos"],
    phone: { display: "+351 258 000 001", href: "tel:+351258000001" },
    address: { street: "R. do Comércio 12", postalCode: "4980-000", locality: "Ponte da Barca" },
    hours: { summary: "Seg–Sáb 08:00–19:30 · Dom encerrado" },
    promo: { description: "5% no fumeiro para ouvintes da Barca FM (até fim do mês)." },
    featured: true,
  },
  {
    slug: "auto-mecanica-do-lima",
    name: "Auto Mecânica do Lima",
    category: "automovel",
    shortDescription: "Mecânica auto multimarca em Vila Nova da Muía. Inspeção, revisão, AC.",
    services: ["Revisão multimarca", "Pré-inspeção", "Ar condicionado", "Pneus"],
    phone: { display: "+351 258 000 002", href: "tel:+351258000002" },
    address: { street: "Zona Industrial Lote 4", postalCode: "4980-619", locality: "Vila Nova da Muía" },
    hours: { summary: "Seg–Sex 08:30–18:30 · Sáb 09:00–13:00" },
    featured: true,
  },
  {
    slug: "padaria-pao-da-barca",
    name: "Padaria Pão da Barca",
    category: "restauracao",
    shortDescription: "Pão de lenha, broa de Avintes e doçaria regional. Aberto todos os dias.",
    services: ["Pão de lenha", "Doçaria conventual", "Encomendas para eventos"],
    phone: { display: "+351 258 000 003", href: "tel:+351258000003" },
    address: { street: "Largo da Igreja 4", postalCode: "4980-635", locality: "Ponte da Barca" },
    hours: { summary: "Todos os dias 07:00–20:00" },
  },
  {
    slug: "construcoes-minho",
    name: "Construções Minho",
    category: "construcao",
    shortDescription: "Construção e remodelação chave-na-mão no Alto Minho.",
    services: ["Remodelação", "Construção nova", "Isolamento térmico"],
    phone: { display: "+351 258 000 004", href: "tel:+351258000004" },
    email: { display: "geral@construcoesminho.pt", href: "mailto:geral@construcoesminho.pt" },
    address: { street: "Av. dos Combatentes 88", postalCode: "4980-617", locality: "Ponte da Barca" },
    hours: { summary: "Seg–Sex 09:00–18:00" },
  },
  {
    slug: "clinica-dentaria-sorriso",
    name: "Clínica Dentária Sorriso",
    category: "saude",
    shortDescription: "Medicina dentária, implantologia e ortodontia em Ponte da Barca.",
    services: ["Higiene oral", "Implantes", "Ortodontia", "Branqueamento"],
    phone: { display: "+351 258 000 005", href: "tel:+351258000005" },
    address: { street: "R. Dr. Joaquim Moreira 21", postalCode: "4980-639", locality: "Ponte da Barca" },
    hours: { summary: "Seg–Sex 09:00–13:00, 14:30–19:00" },
  },
  {
    slug: "casa-rural-do-vale",
    name: "Casa Rural do Vale",
    category: "eventos",
    shortDescription: "Turismo rural e espaço para casamentos no Vale do Lima.",
    services: ["Alojamento", "Casamentos", "Eventos corporativos"],
    phone: { display: "+351 258 000 006", href: "tel:+351258000006" },
    website: "https://example.com",
    address: { street: "Lugar do Vale", postalCode: "4980-571", locality: "Paço Vedro de Magalhães" },
    hours: { summary: "Aberto todo o ano · marcação prévia" },
    featured: true,
  },
];

export function getAdvertiser(slug: string): Advertiser | undefined {
  return advertisers.find((a) => a.slug === slug);
}

export function getAdvertisersByCategory(): Map<AdvertiserCategory, Advertiser[]> {
  const map = new Map<AdvertiserCategory, Advertiser[]>();
  for (const a of advertisers) {
    if (!map.has(a.category)) map.set(a.category, []);
    map.get(a.category)!.push(a);
  }
  return map;
}

export function getFeatured(): Advertiser[] {
  return advertisers.filter((a) => a.featured);
}

export const categoryOrder: AdvertiserCategory[] = [
  "restauracao",
  "comercio",
  "automovel",
  "construcao",
  "saude",
  "beleza",
  "servicos",
  "imobiliaria",
  "agricultura",
  "eventos",
];
