import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = "info@lavoro8.com";
const FROM_NAME = "Lavoro8.com";

type Company = {
  name: string;
  email: string;
  sector: string;
  country: string;
  lang: "it" | "de" | "ro" | "fr" | "es" | "pl" | "en";
};

const COMPANIES: Company[] = [
  // ── GERMANIA 🇩🇪 ──
  { name: "DHL Fulfillment GmbH", email: "hr@dhl-fulfillment.de", sector: "Logistica", country: "DE", lang: "de" },
  { name: "Lidl Deutschland GmbH", email: "bewerbung@lidl.de", sector: "GDO", country: "DE", lang: "de" },
  { name: "Amazon Logistics DE", email: "hr@amazon.de", sector: "Logistica", country: "DE", lang: "de" },
  { name: "DB Schenker GmbH", email: "karriere@dbschenker.com", sector: "Logistica", country: "DE", lang: "de" },
  { name: "Dachser GmbH", email: "karriere@dachser.com", sector: "Logistica", country: "DE", lang: "de" },
  { name: "Vapiano Deutschland", email: "jobs@vapiano.de", sector: "Ristorazione", country: "DE", lang: "de" },
  { name: "McDonald's Deutschland", email: "jobs@mcdonalds.de", sector: "Ristorazione", country: "DE", lang: "de" },
  { name: "Marriott Deutschland", email: "hr.germany@marriott.com", sector: "Hotel", country: "DE", lang: "de" },
  { name: "Randstad Deutschland", email: "info@randstad.de", sector: "Agenzia", country: "DE", lang: "de" },
  { name: "Adecco Deutschland", email: "info@adecco.de", sector: "Agenzia", country: "DE", lang: "de" },

  // ── ROMANIA 🇷🇴 ──
  { name: "Cargus Romania", email: "hr@cargus.ro", sector: "Logistica", country: "RO", lang: "ro" },
  { name: "Fan Courier", email: "recrutare@fancourier.ro", sector: "Logistica", country: "RO", lang: "ro" },
  { name: "Lidl Romania", email: "angajari@lidl.ro", sector: "GDO", country: "RO", lang: "ro" },
  { name: "Kaufland Romania", email: "recrutare@kaufland.ro", sector: "GDO", country: "RO", lang: "ro" },
  { name: "McDonald's Romania", email: "hr@mcdonalds.ro", sector: "Ristorazione", country: "RO", lang: "ro" },
  { name: "Randstad Romania", email: "info@randstad.ro", sector: "Agenzia", country: "RO", lang: "ro" },
  { name: "Adecco Romania", email: "info@adecco.ro", sector: "Agenzia", country: "RO", lang: "ro" },
  { name: "Trenkwalder Romania", email: "info@trenkwalder.ro", sector: "Agenzia", country: "RO", lang: "ro" },

  // ── FRANȚA 🇫🇷 ──
  { name: "Geodis France", email: "recrutement@geodis.com", sector: "Logistica", country: "FR", lang: "fr" },
  { name: "Chronopost France", email: "rh@chronopost.fr", sector: "Logistica", country: "FR", lang: "fr" },
  { name: "Lidl France", email: "recrutement@lidl.fr", sector: "GDO", country: "FR", lang: "fr" },
  { name: "McDonald's France", email: "emploi@fr.mcd.com", sector: "Ristorazione", country: "FR", lang: "fr" },
  { name: "Accor France", email: "recrutement@accor.com", sector: "Hotel", country: "FR", lang: "fr" },
  { name: "Adecco France", email: "info@adecco.fr", sector: "Agenzia", country: "FR", lang: "fr" },
  { name: "Manpower France", email: "info@manpower.fr", sector: "Agenzia", country: "FR", lang: "fr" },

  // ── SPAGNA 🇪🇸 ──
  { name: "Correos Express", email: "rrhh@correosexpress.com", sector: "Logistica", country: "ES", lang: "es" },
  { name: "Mercadona", email: "empleo@mercadona.es", sector: "GDO", country: "ES", lang: "es" },
  { name: "Lidl España", email: "empleo@lidl.es", sector: "GDO", country: "ES", lang: "es" },
  { name: "McDonald's España", email: "rrhh@mcdonalds.es", sector: "Ristorazione", country: "ES", lang: "es" },
  { name: "Meliá Hotels", email: "rrhh@melia.com", sector: "Hotel", country: "ES", lang: "es" },
  { name: "Randstad España", email: "info@randstad.es", sector: "Agenzia", country: "ES", lang: "es" },
  { name: "Adecco España", email: "info@adecco.es", sector: "Agenzia", country: "ES", lang: "es" },

  // ── POLONIA 🇵🇱 ──
  { name: "InPost Polska", email: "praca@inpost.pl", sector: "Logistica", country: "PL", lang: "pl" },
  { name: "DPD Polska", email: "praca@dpd.com.pl", sector: "Logistica", country: "PL", lang: "pl" },
  { name: "Lidl Polska", email: "praca@lidl.pl", sector: "GDO", country: "PL", lang: "pl" },
  { name: "McDonald's Polska", email: "praca@mcdonalds.pl", sector: "Ristorazione", country: "PL", lang: "pl" },
  { name: "Adecco Polska", email: "info@adecco.pl", sector: "Agenzia", country: "PL", lang: "pl" },
  { name: "Randstad Polska", email: "info@randstad.pl", sector: "Agenzia", country: "PL", lang: "pl" },
];

const SUBJECTS: Record<string, string> = {
  de: "Veröffentlichen Sie Ihre Stellenanzeigen auf Lavoro8.com — 1. Anzeige kostenlos",
  ro: "Publicați ofertele de muncă pe Lavoro8.com — Prima ofertă gratuită",
  fr: "Publiez vos offres d'emploi sur Lavoro8.com — 1ère annonce gratuite",
  es: "Publica tus ofertas de empleo en Lavoro8.com — 1ª oferta gratuita",
  pl: "Opublikuj oferty pracy na Lavoro8.com — 1. ogłoszenie bezpłatne",
  en: "Post your job offers on Lavoro8.com — 1st listing free",
};

const BODIES: Record<string, (name: string) => string> = {
  de: (name) => `
    <p>Sehr geehrtes HR-Team von <strong>${name}</strong>,</p>
    <p>mein Name ist [Ihr Name] und ich bin Gründer von <strong>Lavoro8.com</strong>, einer Jobbörse speziell für gewerbliche und operative Arbeitnehmer in Italien und Europa (Lager, Logistik, Gastronomie, Hotel, Bau).</p>
    <p>Wir haben derzeit <strong>über 550 aktive Stellenanzeigen</strong> und erhalten qualifizierte Bewerber aus 23 europäischen Ländern, mit starker Präsenz aus Osteuropa.</p>
    <div style="background:#f0f7ff;border-left:4px solid #1a56db;padding:15px;margin:20px 0;">
      <strong>Was wir bieten:</strong>
      <ul style="margin:10px 0;padding-left:20px;">
        <li>📋 Veröffentlichung von Anzeigen mit Bewerbungen innerhalb von 2 Stunden</li>
        <li>🌍 Automatische Sichtbarkeit in 23 europäischen Sprachen</li>
        <li>📎 Bewerbung mit Lebenslauf — kein Aufwand für Bewerber</li>
        <li>✅ <strong>Erste Anzeige KOSTENLOS</strong></li>
      </ul>
    </div>
    <p>Wir würden uns über eine Zusammenarbeit mit ${name} sehr freuen.</p>`,

  ro: (name) => `
    <p>Stimată echipă HR a <strong>${name}</strong>,</p>
    <p>mă numesc [Numele dumneavoastră] și sunt fondatorul <strong>Lavoro8.com</strong>, un job board specializat pentru lucrători operaționali din Italia și Europa (depozit, logistică, restaurante, hoteluri, construcții).</p>
    <p>În prezent avem <strong>peste 550 de oferte active</strong> și primim candidați calificați din 23 de țări europene.</p>
    <div style="background:#f0f7ff;border-left:4px solid #1a56db;padding:15px;margin:20px 0;">
      <strong>Ce oferim:</strong>
      <ul style="margin:10px 0;padding-left:20px;">
        <li>📋 Publicare anunț cu CV-uri primite în 2 ore</li>
        <li>🌍 Vizibilitate automată în 23 de limbi europene</li>
        <li>📎 Candidatură cu CV atașat — zero birocrație</li>
        <li>✅ <strong>Prima ofertă GRATUITĂ</strong></li>
      </ul>
    </div>
    <p>Ne-ar face plăcere să colaborăm cu ${name}.</p>`,

  fr: (name) => `
    <p>Chère équipe RH de <strong>${name}</strong>,</p>
    <p>je m'appelle [Votre nom] et je suis le fondateur de <strong>Lavoro8.com</strong>, un job board spécialisé pour les travailleurs manuels et opérationnels en Italie et en Europe (entrepôt, logistique, restauration, hôtellerie, construction).</p>
    <p>Nous avons actuellement <strong>plus de 550 offres actives</strong> et recevons des candidats qualifiés de 23 pays européens.</p>
    <div style="background:#f0f7ff;border-left:4px solid #1a56db;padding:15px;margin:20px 0;">
      <strong>Ce que nous offrons :</strong>
      <ul style="margin:10px 0;padding-left:20px;">
        <li>📋 Publication d'annonces avec CV reçus en 2 heures</li>
        <li>🌍 Visibilité automatique en 23 langues européennes</li>
        <li>📎 Candidature avec CV joint — zéro bureaucratie</li>
        <li>✅ <strong>Première annonce GRATUITE</strong></li>
      </ul>
    </div>
    <p>Ce serait un plaisir de collaborer avec ${name}.</p>`,

  es: (name) => `
    <p>Estimado equipo de RRHH de <strong>${name}</strong>,</p>
    <p>me llamo [Su nombre] y soy el fundador de <strong>Lavoro8.com</strong>, un portal de empleo especializado en trabajadores manuales y operativos en Italia y Europa (almacén, logística, hostelería, hotel, construcción).</p>
    <p>Actualmente tenemos <strong>más de 550 ofertas activas</strong> y recibimos candidatos cualificados de 23 países europeos.</p>
    <div style="background:#f0f7ff;border-left:4px solid #1a56db;padding:15px;margin:20px 0;">
      <strong>Lo que ofrecemos:</strong>
      <ul style="margin:10px 0;padding-left:20px;">
        <li>📋 Publicación de anuncios con CVs recibidos en 2 horas</li>
        <li>🌍 Visibilidad automática en 23 idiomas europeos</li>
        <li>📎 Candidatura con CV adjunto — sin burocracia</li>
        <li>✅ <strong>Primera oferta GRATUITA</strong></li>
      </ul>
    </div>
    <p>Sería un placer colaborar con ${name}.</p>`,

  pl: (name) => `
    <p>Szanowny Zespole HR firmy <strong>${name}</strong>,</p>
    <p>nazywam się [Twoje imię] i jestem założycielem <strong>Lavoro8.com</strong>, portalu pracy specjalizującego się w pracownikach fizycznych i operacyjnych we Włoszech i Europie (magazyn, logistyka, gastronomia, hotelarstwo, budownictwo).</p>
    <p>Posiadamy obecnie <strong>ponad 550 aktywnych ofert</strong> i otrzymujemy wykwalifikowanych kandydatów z 23 krajów europejskich.</p>
    <div style="background:#f0f7ff;border-left:4px solid #1a56db;padding:15px;margin:20px 0;">
      <strong>Co oferujemy:</strong>
      <ul style="margin:10px 0;padding-left:20px;">
        <li>📋 Publikacja ogłoszeń z CV otrzymanymi w 2 godziny</li>
        <li>🌍 Automatyczna widoczność w 23 językach europejskich</li>
        <li>📎 Aplikacja z CV w załączniku — zero biurokracji</li>
        <li>✅ <strong>Pierwsze ogłoszenie BEZPŁATNE</strong></li>
      </ul>
    </div>
    <p>Byłoby nam miło współpracować z ${name}.</p>`,
};

function buildHtml(company: Company): string {
  const body = BODIES[company.lang]?.(company.name) ?? BODIES["de"](company.name);
  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;line-height:1.6;">
  <div style="background:#1a56db;padding:20px;text-align:center;">
    <h1 style="color:white;margin:0;font-size:24px;">lavoro8<span style="color:#fbbf24;">.com</span></h1>
    <p style="color:#bfdbfe;margin:5px 0 0;">Job board for operational workers across Europe</p>
  </div>
  <div style="padding:30px 20px;">
    ${body}
    <div style="text-align:center;margin:30px 0;">
      <a href="https://lavoro8.com/pubblica" style="background:#1a56db;color:white;padding:12px 30px;text-decoration:none;border-radius:6px;font-weight:bold;">
        Post a job →
      </a>
    </div>
    <p>
      <strong>Lavoro8.com Team</strong><br>
      📧 info@lavoro8.com<br>
      🌐 <a href="https://lavoro8.com">lavoro8.com</a>
    </p>
  </div>
  <div style="background:#f3f4f6;padding:15px;text-align:center;font-size:12px;color:#6b7280;">
    Lavoro8.com — Job board for operational workers in Italy & Europe
  </div>
</body>
</html>`;
}

async function main() {
  const dryRun = process.argv.includes("--dry-run");
  if (dryRun) console.log("🔍 DRY RUN\n");

  const byCountry: Record<string, Company[]> = {};
  for (const c of COMPANIES) {
    (byCountry[c.country] ??= []).push(c);
  }

  for (const [country, list] of Object.entries(byCountry)) {
    console.log(`\n🌍 ${country} (${list.length} companies):`);
    for (const company of list) {
      if (dryRun) {
        console.log(`  ✓ [DRY] ${company.name} <${company.email}> [${company.lang}]`);
        continue;
      }
      try {
        const { error } = await resend.emails.send({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: company.email,
          subject: SUBJECTS[company.lang],
          html: buildHtml(company),
          replyTo: FROM_EMAIL,
        });
        if (error) {
          console.error(`  ✗ ${company.name}: ${error.message}`);
        } else {
          console.log(`  ✓ ${company.name} <${company.email}>`);
        }
      } catch (e: any) {
        console.error(`  ✗ ${company.name}: ${e.message}`);
      }
      await new Promise(r => setTimeout(r, 1500));
    }
  }

  console.log("\n✅ Done!");
}

main().catch(e => { console.error("❌", e.message); process.exit(1); });
