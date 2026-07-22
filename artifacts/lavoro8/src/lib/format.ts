const COUNTRY_CURRENCY: Record<string, { code: string; locale: string }> = {
  IT: { code: "EUR", locale: "it-IT" },
  DE: { code: "EUR", locale: "de-DE" },
  FR: { code: "EUR", locale: "fr-FR" },
  ES: { code: "EUR", locale: "es-ES" },
  NL: { code: "EUR", locale: "nl-NL" },
  BE: { code: "EUR", locale: "nl-BE" },
  AT: { code: "EUR", locale: "de-AT" },
  PT: { code: "EUR", locale: "pt-PT" },
  GR: { code: "EUR", locale: "el-GR" },
  LU: { code: "EUR", locale: "fr-LU" },
  IE: { code: "EUR", locale: "en-IE" },
  HR: { code: "EUR", locale: "hr-HR" },
  SK: { code: "EUR", locale: "sk-SK" },
  SI: { code: "EUR", locale: "sl-SI" },
  GB: { code: "GBP", locale: "en-GB" },
  CH: { code: "CHF", locale: "de-CH" },
  SE: { code: "SEK", locale: "sv-SE" },
  NO: { code: "NOK", locale: "nb-NO" },
  DK: { code: "DKK", locale: "da-DK" },
  PL: { code: "PLN", locale: "pl-PL" },
  CZ: { code: "CZK", locale: "cs-CZ" },
  HU: { code: "HUF", locale: "hu-HU" },
  RO: { code: "RON", locale: "ro-RO" },
  BG: { code: "BGN", locale: "bg-BG" },
  RS: { code: "RSD", locale: "sr-RS" },
  UA: { code: "UAH", locale: "uk-UA" },
  GE: { code: "GEL", locale: "ka-GE" },
  TR: { code: "TRY", locale: "tr-TR" },
  AL: { code: "ALL", locale: "sq-AL" },
  US: { code: "USD", locale: "en-US" },
};

export function formatCurrency(amount?: number | null) {
  if (amount == null || isNaN(amount)) return "€0";
  try {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `€${amount}`;
  }
}

export function formatJobSalary(amount?: number | null, country?: string | null): string {
  if (amount == null || isNaN(amount)) return "";
  const cur = country ? (COUNTRY_CURRENCY[country] ?? COUNTRY_CURRENCY["IT"]) : COUNTRY_CURRENCY["IT"];
  try {
    return new Intl.NumberFormat(cur.locale, {
      style: "currency",
      currency: cur.code,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${amount} ${cur.code}`;
  }
}

export function getCurrencyCode(country?: string | null): string {
  return country ? (COUNTRY_CURRENCY[country]?.code ?? "EUR") : "EUR";
}

export function formatDate(dateString?: string | null) {
  if (!dateString) return "";
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateString;
  }
}
