import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "info@lavoro8.com";
const FROM_NAME = "Lavoro8.com";

const COMPANIES = [
  // AGENZIE INTERINALI — per prime (hanno molte offerte)
  { name: "Adecco Italy", email: "info@adecco.it", sector: "Agenzia" },
  { name: "Gi Group", email: "info@gigroup.com", sector: "Agenzia" },
  { name: "Randstad Italy", email: "info@randstad.it", sector: "Agenzia" },
  { name: "Manpower Italy", email: "info@manpower.it", sector: "Agenzia" },
  { name: "Synergie Italia", email: "info@synergie-italia.it", sector: "Agenzia" },
  { name: "Umana", email: "info@umana.it", sector: "Agenzia" },
  { name: "ALI Agenzie", email: "info@alispa.it", sector: "Agenzia" },
  // LOGISTICA
  { name: "DHL Supply Chain Italia", email: "hr.italy@dhl.com", sector: "Logistica" },
  { name: "GLS Italy", email: "recruiting@gls-italy.com", sector: "Logistica" },
  { name: "BRT Corriere Espresso", email: "lavoro@brt.it", sector: "Logistica" },
  { name: "SDA Express Courier", email: "hr@sda.it", sector: "Logistica" },
  { name: "Fercam", email: "hr@fercam.com", sector: "Logistica" },
  { name: "Arcese", email: "lavoro@arcese.com", sector: "Logistica" },
  // RISTORAZIONE
  { name: "Autogrill", email: "selezione@autogrill.com", sector: "Ristorazione" },
  { name: "Roadhouse Restaurant", email: "selezione@roadhouse.it", sector: "Ristorazione" },
  { name: "Old Wild West", email: "lavoro@oldwildwest.it", sector: "Ristorazione" },
  // HOTEL
  { name: "NH Hotels Italia", email: "jobs.italy@nh-hotels.com", sector: "Hotel" },
  { name: "UNA Hotels", email: "recruiting@unahotels.it", sector: "Hotel" },
  { name: "B&B Hotels Italy", email: "jobs.it@hotel-bb.com", sector: "Hotel" },
  // GDO
  { name: "Lidl Italia", email: "lavoro@lidl.it", sector: "GDO" },
  { name: "Conad", email: "lavoro@conad.it", sector: "GDO" },
  { name: "Penny Market Italia", email: "hr@penny.it", sector: "GDO" },
];

function buildEmailHtml(companyName: string): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
  <div style="background: #1a56db; padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">lavoro8<span style="color: #fbbf24;">.com</span></h1>
    <p style="color: #bfdbfe; margin: 5px 0 0;">La job board per lavoratori operativi in Europa</p>
  </div>

  <div style="padding: 30px 20px;">
    <p>Gentile Team HR di <strong>${companyName}</strong>,</p>

    <p>mi chiamo e sono il fondatore di <strong>Lavoro8.com</strong>, una job board specializzata in offerte di lavoro per lavoratori manuali e operativi in Italia e in Europa (magazzino, logistica, ristorazione, hotel, edilizia, badante).</p>

    <p>Abbiamo attualmente <strong>oltre 550 offerte attive</strong> e riceviamo candidati qualificati da 23 paesi europei, con forte presenza di lavoratori dall'Est Europa (Romania, Polonia, Ucraina, Bulgaria) e dall'Asia.</p>

    <div style="background: #f0f7ff; border-left: 4px solid #1a56db; padding: 15px; margin: 20px 0;">
      <strong>Cosa offriamo:</strong>
      <ul style="margin: 10px 0; padding-left: 20px;">
        <li>📋 Pubblicazione annunci con CV ricevuti entro 2 ore</li>
        <li>🌍 Visibilità automatica in 23 lingue europee</li>
        <li>📎 Candidatura con CV allegato — zero burocrazia</li>
        <li>✅ <strong>Primo annuncio GRATUITO</strong> per provare il servizio</li>
      </ul>
    </div>

    <p>Sarebbe un piacere collaborare con ${companyName}. Rispondo entro poche ore e sono disponibile per una breve chiamata conoscitiva se lo ritenete utile.</p>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://lavoro8.com/pubblica" style="background: #1a56db; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold;">
        Pubblica la tua offerta →
      </a>
    </div>

    <p>Cordiali saluti,<br>
    <strong>Il Team di Lavoro8.com</strong><br>
    📧 info@lavoro8.com<br>
    🌐 <a href="https://lavoro8.com">lavoro8.com</a></p>
  </div>

  <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280;">
    Lavoro8.com — La job board per lavoratori operativi in Italia e Europa<br>
    Per cancellarti da questa lista rispondi con "CANCELLA"
  </div>
</body>
</html>`;
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");

  if (dryRun) {
    console.log("🔍 DRY RUN — nessuna email verrà inviata\n");
  }

  console.log(`📧 Invio email a ${COMPANIES.length} aziende...\n`);

  let ok = 0;
  let fail = 0;

  for (const company of COMPANIES) {
    const subject = `Pubblica le tue offerte su Lavoro8.com — 1° annuncio gratuito`;
    const html = buildEmailHtml(company.name);

    if (dryRun) {
      console.log(`✓ [DRY] ${company.name} <${company.email}> (${company.sector})`);
      ok++;
      continue;
    }

    try {
      const { data, error } = await resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: company.email,
        subject,
        html,
        replyTo: FROM_EMAIL,
      });

      if (error) {
        console.error(`  ✗ ${company.name}: ${error.message}`);
        fail++;
      } else {
        console.log(`  ✓ ${company.name} <${company.email}>`);
        ok++;
      }
    } catch (e: any) {
      console.error(`  ✗ ${company.name}: ${e.message}`);
      fail++;
    }

    // პაუზა spam-ის თავიდან ასაცილებლად
    await new Promise(r => setTimeout(r, 1500));
  }

  console.log(`\n✅ გაგზავნილია: ${ok} | ❌ შეცდომა: ${fail}`);
}

main().catch(e => { console.error("❌", e.message); process.exit(1); });
