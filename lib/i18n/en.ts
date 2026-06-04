import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    siteTitle: "Barca FM 99.6 — Local radio for the Alto Minho",
    siteDescription:
      "Local radio station broadcasting from Ponte da Barca to the Minho and Douro Litoral regions on 99.6 FM. Listen live, browse advertisers, request a quote for your business.",
    pageTitleSuffix: " · Barca FM 99.6",
  },

  nav: {
    home: "Home",
    advertising: "Advertise",
    advertisers: "Advertisers",
    schedule: "Schedule",
    contact: "Contact",
    listenLive: "Listen live",
    requestQuote: "Request a quote",
    skipToContent: "Skip to content",
  },

  liveBadge: {
    onAir: "On air",
    listenNow: "Listen now",
    listening: "Playing",
    pause: "Pause",
    loading: "Connecting…",
  },

  home: {
    eyebrow: "99.6 FM · Ponte da Barca",
    headline: "The radio with the most heart in northern Portugal.",
    subhead:
      "Broadcasting the life of the Minho and Douro Litoral since the 1980s — Portuguese music, real conversation, and the businesses of our region.",
    primaryCta: "Listen live",
    secondaryCta: "Request a quote",

    proofYears: "40+",
    proofYearsLabel: "years on air",
    proofFollowers: "38k",
    proofFollowersLabel: "Facebook followers",
    proofCoverage: "Minho · Douro Litoral",
    proofCoverageLabel: "coverage area",

    aboutEyebrow: "About Barca FM",
    aboutTitle: "Local. Close. Unfiltered.",
    aboutBody: [
      "Barca FM started in Ponte da Barca in the 1980s as a pirate radio and grew into the reference voice of the Alto Minho. Today it broadcasts on 99.6 FM across the region and live online to the Portuguese diaspora worldwide.",
      "We give airtime to the events of the land, to Portuguese artists, to local associations — and yes, to the businesses that make the local economy run.",
    ],

    whyAdvertiseEyebrow: "For businesses",
    whyAdvertiseTitle: "Advertise on Barca FM",
    whyAdvertiseSubtitle:
      "The most direct way to talk to your regional customers. Real, immediate, and priced for local businesses.",
    whyAdvertiseItems: [
      {
        title: "Loyal, local audience",
        body: "Barca FM listeners live in the region. Your message reaches exactly the people who can walk through your door today.",
      },
      {
        title: "Spots produced by us",
        body: "We record your spot in-studio. Voice, music, mixing — you just tell us what you want to say.",
      },
      {
        title: "You stay on the site too",
        body: "Your business gets a page in the advertisers' directory. Listeners who heard the ad find you here in seconds.",
      },
      {
        title: "Events, launches, campaigns",
        body: "Grand opening, seasonal promo, weekend event — we design the campaign around your moment.",
      },
    ],
    whyAdvertiseCta: "Request a quote",

    showsEyebrow: "Directory",
    showsTitle: "The businesses you hear on the radio.",
    showsSubtitle:
      "Heard an ad but didn't catch the number or address? It's all here — one card per advertiser, always available.",
    showsCta: "See all advertisers",

    listenEyebrow: "Where to listen",
    listenTitle: "Live, 24 hours a day.",
    listenSubtitle: "At home, in the car, or anywhere in the world.",
    listenViaWeb: "Right here",
    listenViaWebDesc: "Hit play and listen on any device.",
    listenViaFm: "On 99.6 FM",
    listenViaFmDesc: "In the Minho and Douro Litoral, on the car or home radio.",
    listenViaPortals: "Also on",

    finalCtaEyebrow: "Let's do it",
    finalCtaTitle: "Ready to advertise on Barca FM?",
    finalCtaSubtitle:
      "Tell us who you are and what you want to communicate — we'll send a clear proposal, no strings attached.",
    finalCtaPrimary: "Request a quote",
    finalCtaSecondary: "Call now",
  },

  advertising: {
    metaTitle: "Advertise on Barca FM — request a quote",
    metaDescription:
      "Advertise on Barca FM 99.6 — local radio in Ponte da Barca, broadcasting across the Minho and Douro Litoral. Request a no-obligation quote.",
    eyebrow: "Advertise",
    title: "The most listened radio in the region, working for your business.",
    subtitle:
      "Spot packages, show sponsorships, contests, special events. We reach 38,000 social followers and thousands of regional listeners.",

    formatsTitle: "Available formats",
    formatsSubtitle: "We combine formats to match your goal.",
    formats: [
      { title: "20 or 30-second spots", body: "The classic piece. We record in studio with voice and sound production. Scheduled across multiple dayparts." },
      { title: "Show sponsorship", body: "Your business associated with a fixed slot — bumpers in and out, plus mentions throughout." },
      { title: "On-air contest", body: "You provide the prize, Barca FM runs the mechanic. Real engagement with the audience." },
      { title: "Events & live broadcasts", body: "Live coverage of your opening, party or fair — we broadcast on-site with interviews and atmosphere." },
      { title: "Advertiser listing", body: "Always includes a directory page on the site — address, contacts, hours, promo. They find you after hearing the ad." },
      { title: "Social amplification", body: "Spots and content amplified on Barca FM's social channels (38k on Facebook, plus Instagram)." },
    ],

    processTitle: "How it works",
    processSubtitle: "Simple. No fine print.",
    steps: [
      { title: "1. Fill in the form", body: "Tell us what you sell and when you want to launch." },
      { title: "2. Get a proposal", body: "We send a clear proposal within 48 working hours." },
      { title: "3. We record the spot", body: "Meet in-studio (or remote) and produce the piece." },
      { title: "4. It goes on air", body: "You enter the schedule and the site's advertiser directory." },
    ],

    formTitle: "Request a quote",
    formSubtitle: "Reply within 48 working hours. No obligation.",
    form: {
      nameLabel: "Your name",
      namePlaceholder: "Full name",
      businessLabel: "Business",
      businessPlaceholder: "Business name",
      phoneLabel: "Phone",
      phonePlaceholder: "+351 …",
      emailLabel: "Email",
      emailPlaceholder: "you@business.com",
      goalLabel: "Main goal",
      goalPlaceholder: "Pick an option",
      goalOptions: [
        { value: "spots", label: "Radio spots" },
        { value: "patrocinio", label: "Show sponsorship" },
        { value: "evento", label: "Event coverage" },
        { value: "passatempo", label: "On-air contest" },
        { value: "anunciante", label: "Directory listing only" },
        { value: "outro", label: "Other / to discuss" },
      ],
      messageLabel: "Message",
      messagePlaceholder: "Tell us about your business and what you want to achieve.",
      consentLabel: "I agree to the",
      consentLinkText: "privacy policy",
      submit: "Send request",
      submitting: "Sending…",
      successTitle: "Request received. Thank you!",
      successBody:
        "We'll review your request and reply within 48 working hours. If urgent, call us on +351 258 480 700.",
      errorTitle: "Couldn't send",
      errorBody:
        "Something went wrong sending your request. Please try again in a few minutes, or call us directly on +351 258 480 700.",
      validationError: "Please check the highlighted fields.",
    },
  },

  advertisers: {
    metaTitle: "Barca FM advertisers — local business directory",
    metaDescription:
      "Directory of businesses advertising on Barca FM 99.6. Contacts, addresses, hours and promotions from the shops and services of the Minho region.",
    eyebrow: "Advertisers",
    title: "The businesses you hear on the radio.",
    subtitle:
      "Heard the ad but didn't catch the phone number? Everything's here — a full profile for every advertiser, always available.",
    heardAnAd: "Heard an ad on the radio? Search for the business name.",
    searchPlaceholder: "Search advertiser…",
    allCategories: "All categories",
    emptyResults: "No results. Try a different search.",
    cardWebsite: "Website",
    cardCall: "Call",
    cardDirections: "Directions",
    cardListenAd: "Open profile",
    detail: {
      backToList: "Back to advertisers",
      hoursTitle: "Opening hours",
      contactTitle: "Contact",
      addressTitle: "Where to find us",
      servicesTitle: "Services",
      promoTitle: "Promo for listeners",
      socialTitle: "Social",
    },
    cta: {
      title: "Your business here too",
      body: "Appear in the directory, on air, and across Barca FM's channels. Request a no-obligation quote.",
      button: "Request a quote",
    },
  },

  categories: {
    restauracao: "Food & Dining",
    comercio: "Local shops",
    automovel: "Automotive",
    construcao: "Construction",
    saude: "Health",
    beleza: "Beauty & Wellness",
    servicos: "Services",
    imobiliaria: "Real estate",
    agricultura: "Agriculture",
    eventos: "Events & Tourism",
  },

  schedule: {
    metaTitle: "Schedule — Barca FM 99.6",
    metaDescription:
      "Barca FM 99.6 weekly schedule — Portuguese music, conversation and Alto Minho events, 24 hours a day.",
    eyebrow: "Schedule",
    title: "The Barca FM schedule.",
    subtitle: "Portuguese music, close conversation and the events of the region, 24 hours a day.",
    daysTitle: "Weekdays",
    note: "The schedule may shift slightly for special events and live broadcasts — follow us on social for updates.",
    blocks: [
      { time: "06:00 – 10:00", title: "Good Morning Minho", body: "The morning with energy: music, traffic, and the regional agenda." },
      { time: "10:00 – 13:00", title: "Morning with more heart", body: "Conversation, Portuguese music and the day's highlights." },
      { time: "13:00 – 16:00", title: "Lunch with Barca", body: "Lunch block with music and guests." },
      { time: "16:00 – 19:00", title: "Barca Afternoon", body: "The music that goes with the drive home." },
      { time: "19:00 – 22:00", title: "Barca Nights", body: "Portuguese music, themed specials and interviews." },
      { time: "22:00 – 06:00", title: "Through the night", body: "Music playing through the small hours." },
    ],
  },

  contact: {
    metaTitle: "Contact — Barca FM 99.6",
    metaDescription:
      "Contact Barca FM 99.6: studio address in Ponte da Barca, phone, email and social channels.",
    eyebrow: "Contact",
    title: "Talk to Barca FM.",
    subtitle: "Studio in Ponte da Barca. We handle advertising, content and partnerships.",
    visitTitle: "Visit the studio",
    callTitle: "Call",
    callBody: "Reachable during programming hours.",
    emailTitle: "Email",
    emailBody: "Reply within 48 working hours.",
    socialTitle: "On social",
    directionsCta: "Get directions",
    hoursTitle: "We're on air",
    hoursBody: "24 hours a day, 7 days a week.",
  },

  privacy: {
    metaTitle: "Privacy policy — Barca FM",
    title: "Privacy policy",
    updated: "Updated June 4, 2026",
    body: [
      "Rádio Barca FM respects your privacy. This policy describes the data we collect when you visit barcafm.pt and how we use it.",
      "When you submit the quote form, we collect name, business, phone, email, goal and message. This information is used only to reply and manage your request — never sold or shared for commercial purposes.",
      "We use anonymous Vercel analytics to understand which pages are most visited. We don't use tracking cookies or share data with third-party advertising platforms.",
      "You have the right to access, correct or delete your data. To do so, write to geral@barcafm.pt.",
      "For complaints, you may contact the Portuguese Data Protection Authority (CNPD) at www.cnpd.pt.",
    ],
  },

  terms: {
    metaTitle: "Terms of use — Barca FM",
    title: "Terms of use",
    updated: "Updated June 4, 2026",
    body: [
      "barcafm.pt is operated by Rádio Barca FM, based in Ponte da Barca, Portugal. By using the site you accept these terms.",
      "Site content — text, images, logo, design — belongs to Rádio Barca FM and may not be copied without written permission.",
      "Quote requests submitted via the site are treated as initial proposals. A commercial relationship is only formalized upon written confirmation.",
      "Rádio Barca FM strives to keep the site available 24/7 but does not guarantee it is always free of errors or interruptions.",
      "For consumer disputes, the Portuguese ADR platform is available via CIAB — Centre for Consumer Information, Mediation and Arbitration of Viana do Castelo (www.ciab.pt).",
    ],
  },

  footer: {
    tagline: "The radio with more heart in northern Portugal. 99.6 FM.",
    rights: "All rights reserved.",
    builtBy: "Site renewed in 2026.",
    sectionExplore: "Explore",
    sectionLegal: "Legal",
    sectionListen: "Where to listen",
    sectionContact: "Contact",
  },

  shared: {
    callNow: "Call",
    emailUs: "Email us",
    getDirections: "Get directions",
    requestQuote: "Request a quote",
    requiredField: "Required field",
  },
};
