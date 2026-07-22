import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const NEW_JOBS = [
  // ─── MAGAZZINO ───
  {
    title: "Magazziniere con Muletto — Turno Notturno",
    company: "LogiTrans Italia Srl",
    city: "Bergamo",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1400,
    salaryMax: 1650,
    contractType: "Tempo indeterminato",
    description: `LogiTrans Italia cerca magazzinieri con patente muletto per turno notturno (22:00-06:00) presso il nostro hub logistico di Bergamo.

Mansioni:
• Scarico e carico merci con carrello elevatore
• Gestione stock con sistema WMS
• Controllo qualità colli in entrata/uscita
• Etichettatura e palettizzazione

Requisiti:
• Patente muletto frontale e retrattile
• Disponibilità turno notturno fisso
• Esperienza minima 1 anno in magazzino
• Documenti regolari per lavorare in Italia

Offriamo:
• Contratto a tempo indeterminato dopo 3 mesi
• Maggiorazione notturna del 30%
• Buoni pasto €8/giorno
• Formazione continua su sistemi WMS`,
  },
  {
    title: "Operatore Magazzino E-commerce — Pomeriggio",
    company: "FastShip Hub",
    city: "Piacenza",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1250,
    salaryMax: 1400,
    contractType: "Tempo determinato",
    description: `FastShip Hub, centro logistico e-commerce, cerca operatori di magazzino per il turno pomeridiano (14:00-22:00).

Mansioni:
• Picking e packing ordini online
• Utilizzo scanner barcode
• Smistamento pacchi per corrieri
• Gestione resi

Requisiti:
• Velocità e precisione nel picking
• Resistenza fisica (lavoro in piedi)
• Base informatica
• Disponibilità sabato

Offriamo:
• Formazione sul campo dal primo giorno
• Contratto 6 mesi rinnovabile
• Ambiente dinamico e multinazionale
• Possibilità straordinari retribuiti`,
  },
  {
    title: "Addetto Magazzino Farmaceutico",
    company: "PharmaDist SpA",
    city: "Milano",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1350,
    salaryMax: 1550,
    contractType: "Tempo indeterminato",
    description: `PharmaDist SpA, distributore farmaceutico, cerca addetti magazzino per il centro di Milano.

Mansioni:
• Gestione prodotti farmaceutici in temperatura controllata
• Preparazione ordini farmacie e ospedali
• Controllo scadenze e lotti
• Inventari periodici

Requisiti:
• Attenzione al dettaglio e precisione
• Preferibile esperienza in settore farmaceutico o alimentare
• Attestato HACCP (o disponibilità a conseguirlo)
• Italiano base

Offriamo:
• Contratto a tempo indeterminato
• Formazione certificata
• Ambiente pulito e climatizzato
• Mensa aziendale`,
  },
  // ─── RIDER ───
  {
    title: "Rider Consegne Alimentari — Bicicletta o Scooter",
    company: "QuickEat Delivery",
    city: "Torino",
    country: "IT",
    category: "Rider",
    salaryMin: 1100,
    salaryMax: 1350,
    contractType: "Partita IVA / Collaborazione",
    description: `QuickEat Delivery cerca rider per consegne ristoranti a Torino centro e zone limitrofe.

Mansioni:
• Ritiro ordini dai ristoranti partner
• Consegna a domicilio in tempi rapidi
• Gestione app aziendale (ordini e navigazione)
• Cura del mezzo di trasporto

Requisiti:
• Bicicletta, e-bike o scooter proprio (o noleggio aziendale disponibile)
• Smartphone Android o iOS
• Conoscenza base della città
• Disponibilità weekend (obbligatoria)

Offriamo:
• Pagamento a consegna + bonus weekend
• Zaino termico e kit sicurezza forniti
• Orari flessibili (scegli i tuoi turni)
• Bonus fedeltà mensile`,
  },
  {
    title: "Rider Corriere Espresso — Furgone",
    company: "SpeedCourier Italia",
    city: "Roma",
    country: "IT",
    category: "Rider",
    salaryMin: 1300,
    salaryMax: 1500,
    contractType: "Tempo determinato",
    description: `SpeedCourier Italia cerca autisti corrieri con furgone per la distribuzione pacchi zona Roma nord.

Mansioni:
• Carico furgone al mattino (07:00)
• Consegna 80-100 pacchi/giorno
• Gestione PDA per scansione colli
• Rapporto con clienti privati e aziende

Requisiti:
• Patente B (da almeno 2 anni)
• Conoscenza Roma e GPS
• Resistenza fisica
• Serietà e puntualità

Offriamo:
• Furgone aziendale fornito
• Carburante a carico dell'azienda
• Contratto 6 mesi + assunzione
• Percorso fisso (stessa zona ogni giorno)`,
  },
  // ─── RISTORAZIONE ───
  {
    title: "Cuoco/a di Linea — Ristorante Centro Storico",
    company: "Osteria Il Portone",
    city: "Venezia",
    country: "IT",
    category: "Ristorazione",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo indeterminato",
    description: `Osteria Il Portone, ristorante tradizionale veneziano con 60 coperti, cerca cuoco di linea per rinforzo brigata.

Mansioni:
• Preparazione antipasti e primi piatti della tradizione veneta
• Gestione postazione con autonomia
• Supporto chef nella creazione menu stagionali
• Pulizia e sanificazione postazione

Requisiti:
• Almeno 2 anni esperienza cucina professionale
• Conoscenza cucina italiana (preferibile veneta)
• Capacità di lavorare sotto pressione
• Disponibilità sera e weekend

Offriamo:
• Contratto CCNL turismo a tempo indeterminato
• 2 giorni di riposo consecutivi
• Pasto staff incluso
• Possibilità alloggio a tariffa agevolata`,
  },
  {
    title: "Pizzaiolo/a Esperto — Pizzeria con Forno a Legna",
    company: "Pizzeria Napoletana Da Ciro",
    city: "Napoli",
    country: "IT",
    category: "Ristorazione",
    salaryMin: 1500,
    salaryMax: 1900,
    contractType: "Tempo indeterminato",
    description: `Pizzeria tradizionale napoletana cerca pizzaiolo esperto con tecnica di impasto napoletano.

Mansioni:
• Stesura, condimento e infornamento pizze
• Gestione lievitazione e impasti (48-72 ore)
• Controllo temperatura forno a legna
• Formazione aiuto pizzaiolo

Requisiti:
• Minimo 3 anni esperienza come pizzaiolo
• Conoscenza impasto napoletano (lunga lievitazione)
• Velocità in servizio (fino a 300 pizze/sera weekend)
• Attestato HACCP

Offriamo:
• Stipendio tra i migliori della categoria
• Contratto a tempo indeterminato immediato
• 2 giorni liberi settimanali
• Possibilità partecipazione a concorsi e fiere`,
  },
  {
    title: "Cameriere/a di Sala — Hotel 4 Stelle",
    company: "Grand Hotel Excelsior",
    city: "Firenze",
    country: "IT",
    category: "Ristorazione",
    salaryMin: 1300,
    salaryMax: 1500,
    contractType: "Stagionale",
    description: `Grand Hotel Excelsior 4 stelle di Firenze cerca camerieri di sala per ristorante e colazioni (stagione aprile-ottobre).

Mansioni:
• Accoglienza e accompagnamento ospiti al tavolo
• Presa comande e servizio ai tavoli
• Allestimento sala e mise en place
• Gestione buffet colazioni

Requisiti:
• Esperienza minima 1 anno in sala
• Inglese livello B1 (clientela internazionale)
• Eleganza e professionalità
• Disponibilità turni spezzati

Offriamo:
• Contratto stagionale CCNL turismo
• Mance incluse nel compenso
• Vitto e alloggio disponibile
• Possibilità conferma stagione successiva`,
  },
  // ─── HOTEL ───
  {
    title: "Receptionist Hotel — Turno Notte",
    company: "Hotel Terminus Milano",
    city: "Milano",
    country: "IT",
    category: "Hotel",
    salaryMin: 1300,
    salaryMax: 1500,
    contractType: "Tempo indeterminato",
    description: `Hotel Terminus 3 stelle Superior, vicino Stazione Centrale Milano, cerca receptionist per turno notte (22:30-07:00).

Mansioni:
• Check-in tardivi e check-out anticipati
• Gestione richieste ospiti notturne
• Controllo sicurezza struttura
• Chiusura cassa giornaliera e report notte

Requisiti:
• Inglese fluente (obbligatorio), altra lingua gradita
• Esperienza in hotel o front office
• Autonomia e problem solving
• Affidabilità e discrezione

Offriamo:
• Contratto a tempo indeterminato
• Maggiorazione notturna
• Formazione su PMS Hotel alberghiero
• Ambiente internazionale`,
  },
  {
    title: "Addetto/a Housekeeping — Catena Alberghiera",
    company: "NH Hotel Group",
    city: "Roma",
    country: "IT",
    category: "Hotel",
    salaryMin: 1200,
    salaryMax: 1400,
    contractType: "Tempo determinato",
    description: `NH Hotel Group cerca addetti/e housekeeping per hotel 4 stelle a Roma (zona EUR e Centro).

Mansioni:
• Pulizia e riassetto camere (standard 20-25 camere/turno)
• Cambio biancheria e rifornimento cortesie
• Controllo qualità secondo standard NH
• Segnalazione guasti e anomalie

Requisiti:
• Esperienza in hotel o pulizie professionali
• Attenzione ai dettagli e velocità
• Resistenza fisica
• Flessibilità orari (mattina o pomeriggio)

Offriamo:
• Contratto 6 mesi rinnovabile
• Formazione sugli standard internazionali NH
• Divisa e materiali forniti
• Possibilità straordinari`,
  },
  {
    title: "Chef de Partie — Hotel 5 Stelle",
    company: "Belmond Villa San Michele",
    city: "Fiesole",
    country: "IT",
    category: "Hotel",
    salaryMin: 1700,
    salaryMax: 2100,
    contractType: "Stagionale",
    description: `Belmond Villa San Michele, storico hotel 5 stelle a Fiesole, cerca Chef de Partie per la stagione primavera-estate.

Mansioni:
• Gestione autonoma di una partita (antipasti/secondi/dolci)
• Supervisione commis di cucina
• Contributo allo sviluppo menu gourmet
• Controllo qualità materie prime

Requisiti:
• Almeno 3 anni in cucina di livello con stelle o equivalente
• Creatività e passione per la cucina d'autore
• Inglese lavorativo
• Disponibilità a trasferirsi a Fiesole (alloggio fornito)

Offriamo:
• Retribuzione d'eccellenza
• Alloggio e vitto inclusi
• Formazione con Executive Chef rinomato
• Rete professionale internazionale`,
  },
  // ─── BADANTE ───
  {
    title: "Assistente Familiare per Signore con Alzheimer lieve",
    company: "Famiglia privata — Torino",
    city: "Torino",
    country: "IT",
    category: "Badante",
    salaryMin: 1300,
    salaryMax: 1500,
    contractType: "Tempo indeterminato",
    description: `Famiglia di Torino zona Crocetta cerca assistente familiare convivente per signora 82enne con diagnosi Alzheimer lieve.

Mansioni:
• Assistenza nelle attività quotidiane (igiene, pasti, vestizione)
• Stimolazione cognitiva (lettura, giochi di memoria)
• Accompagnamento a visite mediche
• Piccole faccende domestiche
• Comunicazione quotidiana con la famiglia

Requisiti:
• Esperienza con pazienti affetti da deterioramento cognitivo
• Pazienza, empatia e stabilità emotiva
• Italiano comunicativo
• Referenze di precedenti famiglie

Offriamo:
• Camera singola arredata con bagno
• Vitto completo incluso
• Contratto CCNL colf categoria CS con contributi
• 1 giorno e mezzo libero a settimana
• Supporto psicologo per il caregiver`,
  },
  {
    title: "Colf Multiservizi — Zona Parioli",
    company: "Famiglia privata — Roma",
    city: "Roma",
    country: "IT",
    category: "Badante",
    salaryMin: 900,
    salaryMax: 1100,
    contractType: "Part-time",
    description: `Famiglia benestante zona Parioli cerca colf per pulizie, stiratura e piccoli commissioni (20 ore/settimana, dal lunedì al venerdì).

Mansioni:
• Pulizia quotidiana appartamento 180mq
• Stiratura e cura biancheria
• Preparazione pasti semplici (colazione, pranzo)
• Spesa e commissioni di quartiere

Requisiti:
• Esperienza in case private di livello
• Cura e rispetto degli ambienti
• Discrezione assoluta
• Italiano fluente

Offriamo:
• Contratto CCNL colf regolare
• Orari fissi lunedì-venerdì 9:00-14:00
• Ambiente signorile e rispettoso
• Tredicesima e ferie pagate`,
  },
  // ─── EDILIZIA ───
  {
    title: "Manovale Edile — Cantieri Residenziali",
    company: "Costruzioni Bianchi & Figli",
    city: "Milano",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1400,
    salaryMax: 1600,
    contractType: "Tempo determinato",
    description: `Impresa edile con 30 anni di esperienza cerca manovalanza per cantieri residenziali nella zona di Milano e hinterland.

Mansioni:
• Assistenza muratori e posatori
• Movimentazione materiali (cemento, laterizi, sabbia)
• Pulizia cantiere e smaltimento detriti
• Montaggio e smontaggio ponteggi

Requisiti:
• Esperienza minima in cantiere (anche breve)
• Resistenza fisica e attitudine al lavoro manuale
• Rispetto norme sicurezza (DPI)
• Disponibilità trasferte zona Milano

Offriamo:
• Contratto CCNL edilizia
• Corsi sicurezza a carico azienda
• DPI e abbigliamento da lavoro forniti
• Possibilità assunzione a tempo indeterminato`,
  },
  {
    title: "Piastrellista / Posatore Ceramiche",
    company: "Ristrutturazioni Moderni",
    city: "Bologna",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1600,
    salaryMax: 2000,
    contractType: "Tempo indeterminato",
    description: `Azienda specializzata in ristrutturazioni chiavi in mano cerca piastrellista esperto per appartamenti e ville private a Bologna e provincia.

Mansioni:
• Posa piastrelle pavimento e rivestimento
• Taglio e lavorazione ceramiche e gres porcellanato
• Stuccatura e sigillatura
• Lettura disegni tecnici

Requisiti:
• Almeno 3 anni esperienza come piastrellista
• Capacità di lavoro autonomo e in squadra
• Precisione e cura del dettaglio
• Patente B (cantieri dislocati)

Offriamo:
• Retribuzione sopra la media di categoria
• Contratto a tempo indeterminato
• Furgone aziendale per spostamenti
• Clientela alto standing`,
  },
  {
    title: "Elettricista Civile e Industriale",
    company: "Impianti Elettrici Rossi",
    city: "Verona",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1700,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Impianti Elettrici Rossi cerca elettricista qualificato per lavori su impianti civili e industriali nella provincia di Verona.

Mansioni:
• Installazione impianti elettrici civili (appartamenti, uffici)
• Manutenzione quadri elettrici industriali
• Cablaggi e certificazioni
• Interventi guasto in pronta reperibilità

Requisiti:
• Diploma tecnico o qualifica professionale elettricista
• Abilitazione CEI 11-27 (o equivalente)
• Esperienza minima 2 anni
• Patente B

Offriamo:
• RAL tra i più alti della zona
• Auto aziendale + telefono
• Formazione continua e certificazioni
• Ticket restaurant €8/giorno`,
  },
  // ─── GERMANIA ───
  {
    title: "Lagerarbeiter / Magazziniere — Monaco",
    company: "Bayern Logistik GmbH",
    city: "Monaco",
    country: "DE",
    category: "Magazzino",
    salaryMin: 1800,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Bayern Logistik GmbH cerca magazzinieri per centro logistico a Monaco di Baviera. Nessun tedesco richiesto inizialmente.

Mansioni:
• Smistamento e stoccaggio merci
• Utilizzo transpallet elettrico
• Picking con scanner
• Inventari periodici

Requisiti:
• Esperienza in magazzino (preferibile)
• Disponibilità turni a rotazione (mattina/pomeriggio)
• Affidabilità e puntualità
• Permesso di lavoro UE

Offriamo:
• Stipendio netto €1.800-2.200/mese
• Corsi di tedesco gratuiti in azienda
• Supporto per alloggio (lista appartamenti partner)
• Contratto tedesco con tutti i diritti`,
  },
  // ─── SVIZZERA ───
  {
    title: "Operaio Edile — Cantieri Ticino",
    company: "Costruzioni Ticino SA",
    city: "Lugano",
    country: "CH",
    category: "Edilizia",
    salaryMin: 2800,
    salaryMax: 3400,
    contractType: "Tempo determinato",
    description: `Costruzioni Ticino SA cerca operai edili per cantieri residenziali e stradali nel Cantone Ticino.

Mansioni:
• Lavori di muratura, scavi e gettate
• Posa di fondamenta e strutture
• Assistenza macchinari da cantiere
• Rispetto normative sicurezza svizzere

Requisiti:
• Esperienza in edilizia (minimo 1 anno)
• Documenti UE o permesso G (frontaliero)
• Italiano (lingua di lavoro in Ticino)
• Resistenza fisica

Offriamo:
• Stipendio lordo CHF 3.200-4.000/mese (netto €2.800-3.400)
• Indennità trasferta e vitto
• CCL edilizia svizzera (ferie, LPP)
• Possibilità rinnovo e stabilizzazione`,
  },
  // ─── SPAGNA ───
  {
    title: "Camarero/a — Restaurante Italiano Barcelona",
    company: "Ristorante La Piazza Barcelona",
    city: "Barcellona",
    country: "ES",
    category: "Ristorazione",
    salaryMin: 1200,
    salaryMax: 1500,
    contractType: "Tempo indeterminato",
    description: `Ristorante italiano nel centro di Barcellona (Eixample) cerca camerieri italiani o italofoni.

Mansioni:
• Servizio ai tavoli (pranzo e cena)
• Accoglienza clienti prevalentemente italiani e turisti
• Gestione comande con tablet
• Collaborazione con cucina italiana

Requisiti:
• Italiano madrelingua o fluente
• Spagnolo base (si impara sul posto)
• Esperienza in sala
• Carattere socievole e professionale

Offriamo:
• Contratto spagnolo indefinido
• Mance incluse (media €200-400/mese extra)
• Pasto durante il turno
• Supporto per NIE e burocrazia`,
  },
];

async function main() {
  console.log(`Inserting ${NEW_JOBS.length} new jobs...`);

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
      isActive: true,
    });
    console.log(`✓ ${job.title} — ${job.city}`);
  }

  console.log("\nDone! All jobs inserted.");
  await pool.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
