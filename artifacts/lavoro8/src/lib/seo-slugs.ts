export const COUNTRY_SLUGS: Record<string, { code: string; label: string; flag: string; labelKey: string }> = {
  italy: { code: "IT", label: "Italia", flag: "it", labelKey: "countryItalia" },
  germany: { code: "DE", label: "Germania", flag: "de", labelKey: "countryGermania" },
  france: { code: "FR", label: "Francia", flag: "fr", labelKey: "countryFrancia" },
  spain: { code: "ES", label: "Spagna", flag: "es", labelKey: "countrySpagna" },
  portugal: { code: "PT", label: "Portogallo", flag: "pt", labelKey: "countryPortogallo" },
  netherlands: { code: "NL", label: "Paesi Bassi", flag: "nl", labelKey: "countryPaesiBassi" },
  belgium: { code: "BE", label: "Belgio", flag: "be", labelKey: "countryBelgio" },
  austria: { code: "AT", label: "Austria", flag: "at", labelKey: "countryAustria" },
  switzerland: { code: "CH", label: "Svizzera", flag: "ch", labelKey: "countrySvizzera" },
  "united-kingdom": { code: "GB", label: "Regno Unito", flag: "gb", labelKey: "countryRegnoUnito" },
  poland: { code: "PL", label: "Polonia", flag: "pl", labelKey: "countryPolonia" },
  romania: { code: "RO", label: "Romania", flag: "ro", labelKey: "countryRomania" },
  "czech-republic": { code: "CZ", label: "Repubblica Ceca", flag: "cz", labelKey: "countryRepubblicaCeca" },
  slovakia: { code: "SK", label: "Slovacchia", flag: "sk", labelKey: "countrySlovacchia" },
  hungary: { code: "HU", label: "Ungheria", flag: "hu", labelKey: "countryUngheria" },
  greece: { code: "GR", label: "Grecia", flag: "gr", labelKey: "countryGrecia" },
  croatia: { code: "HR", label: "Croazia", flag: "hr", labelKey: "countryCroazia" },
  bulgaria: { code: "BG", label: "Bulgaria", flag: "bg", labelKey: "countryBulgaria" },
  serbia: { code: "RS", label: "Serbia", flag: "rs", labelKey: "countrySerbia" },
  ukraine: { code: "UA", label: "Ucraina", flag: "ua", labelKey: "countryUcraina" },
  georgia: { code: "GE", label: "Georgia", flag: "ge", labelKey: "countryGeorgia" },
  turkey: { code: "TR", label: "Turchia", flag: "tr", labelKey: "countryTurchia" },
  albania: { code: "AL", label: "Albania", flag: "al", labelKey: "countryAlbania" },
  "united-states": { code: "US", label: "Stati Uniti", flag: "us", labelKey: "countryStatiUniti" },
};

export const CATEGORY_SLUGS: Record<string, string> = {
  warehouse: "Magazzino",
  logistics: "Logistica",
  rider: "Rider",
  driver: "Logistica",
  restaurant: "Ristorante",
  waiter: "Ristorante",
  hotel: "Hotel",
  caregiver: "Badante",
  cleaner: "Colf",
  babysitter: "Baby-sitter",
  construction: "Edilizia",
  agriculture: "Agricoltura",
  other: "Altro",
};

export const CATEGORY_SLUG_LABEL_KEYS: Record<string, string> = {
  warehouse: "catMagazzino",
  logistics: "catLogistica",
  rider: "catRider",
  driver: "catLogistica",
  restaurant: "catRistorante",
  waiter: "catRistorante",
  hotel: "catHotel",
  caregiver: "catBadante",
  cleaner: "catColf",
  babysitter: "catBabysitter",
  construction: "catEdilizia",
  agriculture: "catAgricoltura",
  other: "catAltro",
};

export const MAJOR_COUNTRY_SLUGS = [
  "italy",
  "germany",
  "france",
  "spain",
  "netherlands",
  "poland",
] as const;

export const CITY_LANDING_PAGES: { countrySlug: string; citySlug: string; cityLabel: string; cityLabelKey: string }[] = [
  { countrySlug: "germany", citySlug: "berlin", cityLabel: "Berlino", cityLabelKey: "cityBerlino" },
  { countrySlug: "germany", citySlug: "munich", cityLabel: "Monaco", cityLabelKey: "cityMonaco" },
  { countrySlug: "italy", citySlug: "milan", cityLabel: "Milano", cityLabelKey: "cityMilano" },
  { countrySlug: "italy", citySlug: "rome", cityLabel: "Roma", cityLabelKey: "cityRoma" },
  { countrySlug: "netherlands", citySlug: "amsterdam", cityLabel: "Amsterdam", cityLabelKey: "cityAmsterdam" },
];

export function comboSlug(categorySlug: string, countrySlug: string): string {
  return `${categorySlug}-${countrySlug}`;
}

export function getAllComboSlugs(): { slug: string; categorySlug: string; category: string; countrySlug: string; countryLabel: string }[] {
  const combos: { slug: string; categorySlug: string; category: string; countrySlug: string; countryLabel: string }[] = [];
  for (const [categorySlug, category] of Object.entries(CATEGORY_SLUGS)) {
    for (const [countrySlug, country] of Object.entries(COUNTRY_SLUGS)) {
      combos.push({
        slug: comboSlug(categorySlug, countrySlug),
        categorySlug,
        category,
        countrySlug,
        countryLabel: country.label,
      });
    }
  }
  return combos;
}

export type ParsedJobsSlug =
  | { type: "country"; countrySlug: string; countryCode: string; countryLabel: string; countryFlag: string }
  | { type: "combo"; categorySlug: string; category: string; countrySlug: string; countryCode: string; countryLabel: string; countryFlag: string }
  | null;

export function parseJobsSlug(slug: string): ParsedJobsSlug {
  const lower = slug.toLowerCase();

  if (COUNTRY_SLUGS[lower]) {
    const c = COUNTRY_SLUGS[lower];
    return { type: "country", countrySlug: lower, countryCode: c.code, countryLabel: c.label, countryFlag: c.flag };
  }

  for (const countrySlug of Object.keys(COUNTRY_SLUGS)) {
    const suffix = `-${countrySlug}`;
    if (lower.endsWith(suffix)) {
      const categorySlug = lower.slice(0, lower.length - suffix.length);
      if (CATEGORY_SLUGS[categorySlug]) {
        const c = COUNTRY_SLUGS[countrySlug];
        return {
          type: "combo",
          categorySlug,
          category: CATEGORY_SLUGS[categorySlug],
          countrySlug,
          countryCode: c.code,
          countryLabel: c.label,
          countryFlag: c.flag,
        };
      }
    }
  }

  return null;
}
