import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const NEW_JOBS = [
  // ─── MAGAZZINO ───
  {
    title: "Magazziniere Smistamento Pacchi — Amazon",
    company: "Amazon Logistics Italy",
    city: "Torrazza Piemonte",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1500,
    salaryMax: 1750,
    contractType: "Tempo determinato",
    description: `Amazon Logistics Italy cerca magazzinieri per il centro di distribuzione di Torrazza Piemonte (TO).

Mansioni:
• Smistamento e scansione pacchi su nastro trasportatore
• Verifica integrità colli in entrata e uscita
• Utilizzo di scanner portatile (RF)
• Rispetto dei tempi di throughput giornalieri

Requisiti:
• Disponibilità a turni rotanti (mattina/pomeriggio/notte)
• Resistenza fisica (lavoro in piedi 8-10 ore)
• Documenti validi per lavorare in Italia
• Nessuna esperienza necessaria — formazione interna

Offriamo:
• Contratto iniziale 3 mesi + rinnovo
• Buoni pasto €7/giorno
• Navetta gratuita da Chivasso e Torino
• Possibilità assunzione a tempo indeterminato`,
  },
  {
    title: "Operatore Logistico Picking — Turno Mattina",
    company: "DHL Supply Chain Italia",
    city: "Peschiera Borromeo",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1350,
    salaryMax: 1550,
    contractType: "Tempo determinato",
    description: `DHL Supply Chain Italia cerca operatori logistici per il magazzino di Peschiera Borromeo (MI).

Mansioni:
• Picking manuale con lista cartacea o terminale vocale
• Palettizzazione e filmatura
• Rifornimento scaffali e posizioni di prelievo
• Inventario periodico

Requisiti:
• Esperienza minima 6 mesi in magazzino
• Conoscenza base del WMS
• Disponibilità turno fisso mattina 06:00-14:00
• Patente B (raggiungibilità sede)

Offriamo:
• €1.350–1.550/mese
• Buoni pasto €6/giorno
• Formazione su sistemi DHL
• Ambiente multinazionale strutturato`,
  },
  {
    title: "Carrellista Muletto Frontale e Retrattile",
    company: "GXO Logistics",
    city: "Stradella",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1500,
    salaryMax: 1800,
    contractType: "Tempo indeterminato",
    description: `GXO Logistics, leader mondiale nella logistica in outsourcing, cerca carrellisti qualificati per il magazzino di Stradella (PV).

Mansioni:
• Movimentazione merci con muletto frontale e retrattile
• Stoccaggio ad alta quota (scaffalature verticali fino a 12m)
• Carico/scarico mezzi pesanti
• Gestione UDC con terminale RF

Requisiti:
• Patente muletto frontale + retrattile obbligatoria
• Esperienza minima 2 anni
• Abitudine a lavoro in quota
• Flessibilità su turni

Offriamo:
• Contratto diretto a tempo indeterminato
• RAL €22.000–26.000
• Maggiorazione notturna 30%
• Piano welfare aziendale`,
  },
  // ─── LOGISTICA / TRASPORTI ───
  {
    title: "Autista Patente C con CQC — Distribuzione Locale",
    company: "BRT Corriere Espresso",
    city: "Napoli",
    country: "IT",
    category: "Logistica",
    salaryMin: 1600,
    salaryMax: 1900,
    contractType: "Tempo indeterminato",
    description: `BRT Corriere Espresso cerca autisti con patente C e CQC per la distribuzione locale nell'area napoletana.

Mansioni:
• Consegna pacchi e pallet a clienti commerciali e privati
• Gestione spunta con palmare aziendale
• Rispetto del codice della strada e dei KPI di consegna
• Piccola manutenzione mezzo (controllo livelli, pneumatici)

Requisiti:
• Patente C + CQC in corso di validità
• Carta tachigrafica personale
• Conoscenza zona Napoli e provincia
• Puntualità e autonomia

Offriamo:
• Contratto CCNL Logistica a tempo indeterminato
• €1.600–1.900/mese
• Mezzo aziendale
• Rimborso pedaggi e carburante`,
  },
  {
    title: "Autista Van Furgone — Consegne Last Mile",
    company: "SDA Express Courier",
    city: "Roma",
    country: "IT",
    category: "Logistica",
    salaryMin: 1300,
    salaryMax: 1550,
    contractType: "Tempo determinato",
    description: `SDA Express Courier cerca autisti furgone per consegne last-mile nella zona di Roma Nord/Est.

Mansioni:
• Consegne pacchi a domicilio (80-120 fermate/giorno)
• Gestione resi e giacenze
• Utilizzo app di navigazione e palmare
• Interfaccia con clienti finali

Requisiti:
• Patente B in corso di validità (almeno 2 anni)
• Conoscenza di Roma
• Disponibilità lunedì–sabato 08:00-18:00
• Nessuna esperienza pregressa richiesta

Offriamo:
• €1.300–1.550/mese
• Contratto 6 mesi + rinnovo
• Furgone aziendale
• Smartphone e app aziendali`,
  },
  // ─── RISTORAZIONE ───
  {
    title: "Cuoco di Linea — Ristorante Centro Storico",
    company: "Ristorante Da Carmine",
    city: "Firenze",
    country: "IT",
    category: "Ristorazione",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo indeterminato",
    description: `Ristorante Da Carmine, locale storico nel centro di Firenze, cerca cuoco di linea per rinforzo brigata.

Mansioni:
• Gestione di una o più partite (antipasti/primi/secondi)
• Preparazione mise en place
• Rispetto delle ricette e degli standard qualitativi
• Mantenimento pulizia postazione e cucina

Requisiti:
• Esperienza minima 2 anni come cuoco di linea
• Conoscenza cucina toscana tradizionale (preferenziale)
• Flessibilità su turni spezzati
• Attestato HACCP

Offriamo:
• Contratto CCNL Turismo a tempo indeterminato
• €1.400–1.700/mese
• 2 giorni di riposo settimanale
• Pasto di servizio gratuito`,
  },
  {
    title: "Pizzaiolo Esperto — Pizzeria Napoletana",
    company: "Pizzeria Vesuvio",
    city: "Milano",
    country: "IT",
    category: "Ristorazione",
    salaryMin: 1600,
    salaryMax: 2100,
    contractType: "Tempo indeterminato",
    description: `Pizzeria Vesuvio, pizzeria napoletana STG con forno a legna, cerca pizzaiolo esperto per la sede di Milano Navigli.

Mansioni:
• Preparazione e stesura impasto napoletano
• Gestione forno a legna (temperatura e infornata)
• Creazione di pizze classiche e fuori menù
• Supervisione qualità e consistenza prodotto

Requisiti:
• Almeno 3 anni esperienza come pizzaiolo napoletano
• Conoscenza tecnica dell'impasto e della lievitazione
• Velocità e precisione sotto pressione
• Passione per la tradizione napoletana

Offriamo:
• €1.600–2.100/mese in base all'esperienza
• 2 giorni di riposo + ferie regolari
• Ambiente giovane e stimolante
• Possibilità di crescita`,
  },
  {
    title: "Cameriere/a di Sala — Ristorante Fine Dining",
    company: "Ristorante Il Portico",
    city: "Bologna",
    country: "IT",
    category: "Ristorazione",
    salaryMin: 1300,
    salaryMax: 1600,
    contractType: "Tempo indeterminato",
    description: `Ristorante Il Portico, locale di fine dining con 30 coperti nel centro di Bologna, cerca cameriere/a di sala.

Mansioni:
• Accoglienza e gestione clienti
• Presa ordini e servizio al tavolo
• Conoscenza della carta vini di base
• Collaborazione con brigata di cucina

Requisiti:
• Esperienza minima 1 anno in sala
• Ottimo italiano; inglese di base
• Bella presenza e ottime doti relazionali
• Disponibilità sera e weekend

Offriamo:
• €1.300–1.600 + mance
• Contratto CCNL Turismo
• 2 giorni di riposo
• Formazione interna su vini e servizio`,
  },
  {
    title: "Lavapiatti e Aiuto Cucina",
    company: "McDonald's Italia",
    city: "Torino",
    country: "IT",
    category: "Ristorazione",
    salaryMin: 1050,
    salaryMax: 1200,
    contractType: "Part-time",
    description: `McDonald's Italia cerca lavapiatti e aiuto cucina per il ristorante di Torino Centro.

Mansioni:
• Lavaggio stoviglie e attrezzature cucina
• Pulizia e sanificazione aree di lavoro
• Supporto preparazione ingredienti
• Rifornimento frigoriferi e dispensa

Requisiti:
• Nessuna esperienza necessaria
• Disponibilità turni spezzati e weekend
• Affidabilità e puntualità
• Documenti validi per lavorare in Italia

Offriamo:
• Part-time 20-25 ore/settimana
• €1.050–1.200/mese proporzionale
• Pasto gratuito durante il turno
• Possibilità di aumentare le ore`,
  },
  // ─── HOTEL ───
  {
    title: "Receptionist Hotel — Turno Notte",
    company: "NH Hotels Italia",
    city: "Roma",
    country: "IT",
    category: "Hotel",
    salaryMin: 1350,
    salaryMax: 1600,
    contractType: "Tempo indeterminato",
    description: `NH Hotels Italia cerca receptionist per il turno di notte (22:00-07:00) presso l'NH Roma Centro.

Mansioni:
• Check-in e check-out ospiti
• Gestione prenotazioni con PMS Opera
• Risposta telefonate e email
• Audit notturno e chiusura cassa
• Gestione eventuali emergenze

Requisiti:
• Esperienza minima 1 anno in reception alberghiera
• Inglese fluente (altre lingue un plus)
• Conoscenza PMS Opera o simili
• Disponibilità turno notturno fisso

Offriamo:
• Contratto CCNL Turismo a tempo indeterminato
• Maggiorazione notturna
• Vitto e alloggio disponibili
• Programma sviluppo carriera NH`,
  },
  {
    title: "Addetto/a Pulizie Camere — Housekeeping",
    company: "Marriott Hotels Italy",
    city: "Milano",
    country: "IT",
    category: "Hotel",
    salaryMin: 1200,
    salaryMax: 1400,
    contractType: "Tempo determinato",
    description: `Marriott Hotels Italy cerca addetti/e alle pulizie camere per il Marriott Milano Malpensa.

Mansioni:
• Pulizia e riassetto camere secondo standard Marriott
• Cambio biancheria e riassortimento amenities
• Verifica funzionamento attrezzature in camera
• Comunicazione con front desk per camere pronte

Requisiti:
• Esperienza preferenziale in housekeeping alberghiero
• Attenzione ai dettagli e precisione
• Resistenza fisica
• Disponibilità weekend e festivi

Offriamo:
• €1.200–1.400/mese
• Contratto 6 mesi rinnovabile
• Uniforme e pasto di servizio forniti
• Sconti dipendenti Marriott Bonvoy`,
  },
  {
    title: "Barista Hotel Colazione — Turno Mattina",
    company: "Hilton Garden Inn",
    city: "Venezia",
    country: "IT",
    category: "Hotel",
    salaryMin: 1300,
    salaryMax: 1500,
    contractType: "Tempo indeterminato",
    description: `Hilton Garden Inn Venezia cerca barista per il servizio colazione e bar hotel (turno 06:30-14:30).

Mansioni:
• Preparazione e servizio colazione buffet
• Bar espresso e bevande calde
• Servizio ai tavoli durante colazione
• Gestione cassa e POS

Requisiti:
• Esperienza in bar o hotel almeno 1 anno
• Conoscenza macchina espresso professionale
• Inglese di base (clientela internazionale)
• Puntualità e cura nell'aspetto

Offriamo:
• Contratto CCNL Turismo
• €1.300–1.500/mese
• 2 giorni di riposo settimanale
• Pasto di servizio + uniforme`,
  },
  // ─── RIDER / CONSEGNE ───
  {
    title: "Rider Consegne — Bici o Scooter",
    company: "Glovo Italy",
    city: "Palermo",
    country: "IT",
    category: "Rider",
    salaryMin: 900,
    salaryMax: 1400,
    contractType: "Freelance",
    description: `Glovo Italy cerca rider per consegne food e grocery a Palermo. Lavora quando vuoi!

Come funziona:
• Scarichi l'app Glovo Courier
• Scegli i tuoi slot orari preferiti
• Consegni ordini di ristoranti, supermercati e negozi
• Guadagni per ogni consegna completata

Requisiti:
• Bici, bici elettrica o scooter personale
• Smartphone Android o iOS
• Documenti validi in Italia (permesso di soggiorno se non UE)
• Zaino termico (fornito da Glovo)

Guadagni:
• €3–6 a consegna
• Media €900–1.400/mese con orario full-time
• Bonus ore di punta (cena/weekend)
• Pagamento settimanale`,
  },
  {
    title: "Fattorino Consegne Farmaci — Auto o Moto",
    company: "Pharmap",
    city: "Genova",
    country: "IT",
    category: "Rider",
    salaryMin: 1100,
    salaryMax: 1400,
    contractType: "Tempo determinato",
    description: `Pharmap, servizio di consegna farmaci a domicilio, cerca fattorini per la zona di Genova.

Mansioni:
• Ritiro farmaci in farmacia e consegna a domicilio
• Gestione del percorso ottimizzato tramite app
• Interfaccia rispettosa con clienti (spesso anziani)
• Gestione piccola cassa e pagamenti

Requisiti:
• Auto o moto propria
• Patente B o A
• Pazienza e gentilezza con clienti anziani
• Smartphone con GPS

Offriamo:
• €1.100–1.400/mese
• Rimborso chilometrico
• Turni flessibili (mattina o pomeriggio)
• Contratto 3 mesi + rinnovo`,
  },
  // ─── EDILIZIA ───
  {
    title: "Muratore Esperto — Ristrutturazioni Civili",
    company: "Costruzioni Ferretti Srl",
    city: "Verona",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1600,
    salaryMax: 2000,
    contractType: "Tempo indeterminato",
    description: `Costruzioni Ferretti Srl, azienda edile attiva da 30 anni nel veronese, cerca muratore esperto per ristrutturazioni civili.

Mansioni:
• Demolizioni e ricostruzioni murarie
• Posa mattoni, blocchi e tramezze
• Intonacatura e rasatura pareti
• Posa pavimenti e rivestimenti ceramica
• Lettura basilare di disegni tecnici

Requisiti:
• Esperienza minima 5 anni come muratore
• Conoscenza tecniche costruzione italiana
• Capacità di lavoro in autonomia
• Patente B (spostamenti tra cantieri)

Offriamo:
• Contratto CCNL Edilizia a tempo indeterminato
• €1.600–2.000/mese
• Trasferte pagate
• Furgone aziendale per spostamenti`,
  },
  {
    title: "Imbianchino — Appartamenti e Uffici",
    company: "ColorVerde Impresa Edile",
    city: "Padova",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo indeterminato",
    description: `ColorVerde Impresa Edile cerca imbianchino per lavori di tinteggiatura in appartamenti privati e uffici.

Mansioni:
• Preparazione superfici (stuccatura, carteggio)
• Tinteggiatura pareti e soffitti
• Verniciatura infissi e serramenti
• Posa carta da parati e rivestimenti decorativi
• Ordine e pulizia cantiere

Requisiti:
• Esperienza minima 2 anni come imbianchino
• Conoscenza di pitture, vernici e stucchi
• Precisione e cura nei dettagli
• Patente B

Offriamo:
• €1.400–1.700/mese
• Contratto a tempo indeterminato
• Attrezzatura fornita
• Lavoro in zona Padova e provincia`,
  },
  {
    title: "Elettricista Civile e Industriale",
    company: "Elettro System Srl",
    city: "Brescia",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1700,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Elettro System Srl, azienda di impianti elettrici civili e industriali, cerca elettricista qualificato per la zona di Brescia.

Mansioni:
• Installazione e manutenzione impianti elettrici civili
• Cablaggi quadri elettrici
• Impianti fotovoltaici residenziali
• Lettura schemi elettrici
• Interventi di manutenzione straordinaria

Requisiti:
• Diploma tecnico (perito elettrico o similare)
• Abilitazione art. 71 D.Lgs 81/08
• Esperienza minima 3 anni
• Patente B

Offriamo:
• €1.700–2.200/mese
• Contratto a tempo indeterminato
• Auto aziendale
• Formazione continua (CEI, PV, BT)`,
  },
  // ─── BADANTE / COLF ───
  {
    title: "Badante Convivente per Anziano Autosufficiente",
    company: "Famiglia Rossi",
    city: "Torino",
    country: "IT",
    category: "Badante",
    salaryMin: 900,
    salaryMax: 1100,
    contractType: "Tempo indeterminato",
    description: `Famiglia privata cerca badante convivente per signore anziano di 82 anni, autosufficiente, zona Torino Crocetta.

Mansioni:
• Compagnia e assistenza quotidiana
• Preparazione pasti leggeri
• Accompagnamento a visite mediche e passeggiate
• Gestione farmaci (promemoria)
• Piccole commissioni (farmacia, supermercato)

Requisiti:
• Esperienza in assistenza anziani
• Pazienza e empatia
• Italiano comunicativo
• Permesso di soggiorno regolare (se non UE)
• Referenze verificabili

Offriamo:
• Vitto e alloggio inclusi
• €900–1.100/mese
• Giorno libero settimanale
• Contratto CCNL Colf e Badanti`,
  },
  {
    title: "Colf Part-Time — Pulizie Domestiche",
    company: "Famiglia Bianchi",
    city: "Milano",
    country: "IT",
    category: "Colf",
    salaryMin: 600,
    salaryMax: 800,
    contractType: "Part-time",
    description: `Famiglia privata in zona Milano Brera cerca colf per pulizie domestiche 3 giorni a settimana.

Mansioni:
• Pulizia e sanificazione appartamento 120mq
• Stiratura e gestione biancheria
• Riordino e gestione della casa
• Occasionalmente: preparazione pasti semplici

Requisiti:
• Esperienza come colf almeno 1 anno
• Affidabilità e discrezione
• Italiano di base
• Disponibilità lunedì, mercoledì, venerdì (09:00-14:00)

Offriamo:
• €12–14/ora
• €600–800/mese (15 ore/settimana)
• Contratto regolare CCNL
• Ambiente familiare e rispettoso`,
  },
  // ─── AGRICOLTURA ───
  {
    title: "Operaio Agricolo — Raccolta Frutta Stagionale",
    company: "Azienda Agricola Bertolini",
    city: "Cuneo",
    country: "IT",
    category: "Agricoltura",
    salaryMin: 1100,
    salaryMax: 1300,
    contractType: "Stagionale",
    description: `Azienda Agricola Bertolini cerca operai agricoli per la raccolta di pesche e mele nella zona di Cuneo (CN). Inizio: luglio–ottobre.

Mansioni:
• Raccolta manuale frutta (pesche, mele, pere)
• Selezione e cernita prodotto
• Carico cassoni e gestione campo
• Potatura invernale (per chi resta)

Requisiti:
• Resistenza fisica al lavoro all'aperto
• Disponibilità a lavorare in campo
• Preferenza per chi ha esperienza agricola
• Alloggio disponibile in azienda

Offriamo:
• €1.100–1.300/mese
• Alloggio in azienda (deducibile €150/mese)
• Contratto stagionale CCNL Agricoltura
• Pasto di mezzogiorno fornito`,
  },
  // ─── GERMANIA ───
  {
    title: "Lagerarbeiter — Vollzeit Tagschicht",
    company: "Dachser Logistics GmbH",
    city: "München",
    country: "DE",
    category: "Magazzino",
    salaryMin: 2100,
    salaryMax: 2500,
    contractType: "Unbefristeter Vertrag",
    description: `Dachser Logistics GmbH sucht Lagerarbeiter für den Standort München-Riem in Vollzeit (Tagschicht 06:00-14:30).

Tätigkeiten:
• Kommissionierung und Verpackung von Waren
• Be- und Entladen von LKWs
• Scannen und Dokumentation mit RF-Terminal
• Mitarbeit bei Inventuren

Anforderungen:
• Erste Erfahrung in Lager oder Logistik von Vorteil
• Körperliche Belastbarkeit
• Grundkenntnisse Deutsch oder Englisch
• Gültige Arbeitsgenehmigung für Deutschland

Wir bieten:
• €2.100–2.500/Monat
• Unbefristeter Vertrag nach Probezeit
• Deutschlandticket für ÖPNV
• Weiterbildung zum Gabelstaplerfahrer möglich`,
  },
  {
    title: "Küchenhilfe — Vollzeit oder Teilzeit",
    company: "Vapiano München",
    city: "München",
    country: "DE",
    category: "Ristorazione",
    salaryMin: 1900,
    salaryMax: 2200,
    contractType: "Unbefristeter Vertrag",
    description: `Vapiano München sucht zuverlässige Küchenhilfen für unsere Restaurants in der Münchner Innenstadt.

Tätigkeiten:
• Vor- und Zubereitung von Zutaten (Schneiden, Portionieren)
• Abwaschen und Reinigen von Küchengeräten
• Mitarbeit bei der Essensausgabe
• Einhaltung der Hygienestandards (HACCP)

Anforderungen:
• Keine Vorkenntnisse nötig — wir schulen dich ein
• Flexibilität bei Schichten (Mittag und Abend)
• Teamgeist und Zuverlässigkeit
• Sprachkenntnisse nicht zwingend erforderlich

Wir bieten:
• €1.900–2.200/Monat
• Vollzeit oder Teilzeit möglich
• Kostenlose Mahlzeit pro Schicht
• Joviales Teamumfeld`,
  },
  // ─── ROMANIA ───
  {
    title: "Operator Depozit — Tura de Noapte",
    company: "Cargus Romania",
    city: "București",
    country: "RO",
    category: "Magazzino",
    salaryMin: 3500,
    salaryMax: 4200,
    contractType: "Perioadă nedeterminată",
    description: `Cargus Romania angajează operatori depozit pentru tura de noapte (22:00-06:00) la depozitul central din București.

Activități:
• Sortarea coletelor pe rute de livrare
• Scanarea și verificarea coletelor
• Încărcarea/descărcarea mașinilor de livrare
• Gestionarea neconformităților

Cerințe:
• Experiență în depozit sau curierat (de preferat)
• Disponibilitate tură de noapte fixă
• Condiție fizică bună
• Documente de muncă valabile

Oferim:
• 3.500–4.200 RON/lună + spor noapte 25%
• Contract pe perioadă nedeterminată
• Tichete de masă 30 RON/zi
• Transport la/de la locul de muncă`,
  },
];

async function main() {
  console.log(`Inserting ${NEW_JOBS.length} new jobs (batch 6)...`);
  let ok = 0;
  for (const job of NEW_JOBS) {
    await db.insert(jobsTable).values({
      title: job.title,
      company: job.company,
      city: job.city,
      country: job.country,
      category: job.category,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      contractType: job.contractType,
      description: job.description,
      featured: false,
    });
    ok++;
    console.log(`  ✓ ${job.title} (${job.city})`);
  }
  console.log(`\n✅ Done — inserted ${ok} jobs.`);
  await pool.end();
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
