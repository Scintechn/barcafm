// Shape of every locale dictionary. Adding a key here forces every locale
// file to provide it (TypeScript fails the build otherwise).

export type Dictionary = {
  meta: {
    siteTitle: string;
    siteDescription: string;
    pageTitleSuffix: string;
  };

  nav: {
    home: string;
    advertising: string;
    advertisers: string;
    schedule: string;
    contact: string;
    listenLive: string;
    requestQuote: string;
    skipToContent: string;
  };

  liveBadge: {
    onAir: string;
    listenNow: string;
    listening: string;
    pause: string;
    loading: string;
  };

  whatsapp: {
    label: string;
    ariaLabel: string;
    defaultMessage: string;
  };

  home: {
    eyebrow: string;
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
    proofYears: string;
    proofYearsLabel: string;
    proofFollowers: string;
    proofFollowersLabel: string;
    proofCoverage: string;
    proofCoverageLabel: string;

    aboutEyebrow: string;
    aboutTitle: string;
    aboutBody: string[];

    reachEyebrow: string;
    reachTitle: string;
    reachSubtitle: string;
    reachStats: { value: string; label: string; detail: string }[];
    reachAreasTitle: string;
    reachAreas: string[];
    reachClosingLine: string;

    whyAdvertiseEyebrow: string;
    whyAdvertiseTitle: string;
    whyAdvertiseSubtitle: string;
    whyAdvertiseItems: { title: string; body: string }[];
    whyAdvertiseCta: string;

    showsEyebrow: string;
    showsTitle: string;
    showsSubtitle: string;
    showsCta: string;

    listenEyebrow: string;
    listenTitle: string;
    listenSubtitle: string;
    listenViaWeb: string;
    listenViaWebDesc: string;
    listenViaFm: string;
    listenViaFmDesc: string;
    listenViaPortals: string;

    finalCtaEyebrow: string;
    finalCtaTitle: string;
    finalCtaSubtitle: string;
    finalCtaPrimary: string;
    finalCtaSecondary: string;
  };

  advertising: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    subtitle: string;

    formatsTitle: string;
    formatsSubtitle: string;
    formats: { title: string; body: string }[];

    processTitle: string;
    processSubtitle: string;
    steps: { title: string; body: string }[];

    formTitle: string;
    formSubtitle: string;
    form: QuoteFormStrings;
  };

  schedule: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    daysTitle: string;
    note: string;
    blocks: { time: string; title: string; body: string }[];
  };

  advertisers: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    heardAnAd: string;
    searchPlaceholder: string;
    allCategories: string;
    emptyResults: string;
    cardWebsite: string;
    cardCall: string;
    cardDirections: string;
    cardListenAd: string;
    detail: {
      backToList: string;
      hoursTitle: string;
      contactTitle: string;
      addressTitle: string;
      servicesTitle: string;
      promoTitle: string;
      socialTitle: string;
    };
    cta: {
      title: string;
      body: string;
      button: string;
    };
  };

  categories: Record<string, string>;

  contact: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    visitTitle: string;
    callTitle: string;
    callBody: string;
    emailTitle: string;
    emailBody: string;
    socialTitle: string;
    directionsCta: string;
    hoursTitle: string;
    hoursBody: string;
  };

  privacy: {
    metaTitle: string;
    title: string;
    updated: string;
    body: string[];
  };

  terms: {
    metaTitle: string;
    title: string;
    updated: string;
    body: string[];
  };

  footer: {
    tagline: string;
    rights: string;
    builtBy: string;
    sectionExplore: string;
    sectionLegal: string;
    sectionListen: string;
    sectionContact: string;
  };

  shared: {
    callNow: string;
    emailUs: string;
    getDirections: string;
    requestQuote: string;
    requiredField: string;
  };
};

export type QuoteFormStrings = {
  nameLabel: string;
  namePlaceholder: string;
  businessLabel: string;
  businessPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  goalLabel: string;
  goalPlaceholder: string;
  goalOptions: { value: string; label: string }[];
  messageLabel: string;
  messagePlaceholder: string;
  consentLabel: string;
  consentLinkText: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  validationError: string;
};
