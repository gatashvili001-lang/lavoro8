import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const NEW_JOBS = [
  // ─── ITALIA — badante/colf/baby-sitter ───
  {
    title: "Badante per Anziano Diabetico — Firenze",
    company: "Famiglia privata — Firenze",
    city: "Firenze",
    country: "IT",
    category: "Badante",
    salaryMin: 950,
    salaryMax: 1200,
    contractType: "Part-time",
    description: `Famiglia fiorentina cerca badante per signore di 77 anni con diabete di tipo 2, parzialmente autosufficiente.

Mansioni:
• Controllo glicemia e registrazione valori (si impara, non serve esperienza medica)
• Preparazione pasti iposodici e a basso indice glicemico
• Accompagnamento a visite ogni 15 giorni
• Compagnia e stimolazione cognitiva

Orario: lunedì-venerdì 8:00-14:00 + sabato mattina

Requisiti:
• Esperienza con anziani o pazienti cronici
• Pazienza e affidabilità
• Referenze verificabili
• Italiano buono

Offriamo:
• Contratto CCNL badanti regolare
• Paga sopra la tabella per la specializzazione
• Rimborso abbonamento bus
• Famiglia discreta e rispettosa`,
  },
  {
    title: "Colf Full-Time — Villa Privata con Cucina",
    company: "Famiglia privata — Napoli (Posillipo)",
    city: "Napoli",
    country: "IT",
    category: "Colf",
    salaryMin: 1300,
    salaryMax: 1600,
    contractType: "Tempo indeterminato",
    description: `Famiglia benestante a Posillipo (Napoli) cerca collaboratrice domestica esperta per villa con giardino.

Mansioni:
• Pulizia approfondita degli ambienti (5 camere, 4 bagni)
• Preparazione pranzo per 2 persone e gestione cucina
• Cura argenti, porcellane e tessuti pregiati
• Lavanderia e stireria
• Gestione quotidiana della villa in assenza dei datori

Requisiti:
• Esperienza minima 5 anni in ville o abitazioni di pregio
• Massima riservatezza e discrezione
• Capacità culinaria: cucina napoletana tradizionale
• Referenze eccellenti verificabili
• Patente B (gradita)

Offriamo:
• Contratto a tempo indeterminato, 40 ore settimanali
• Stipendio superiore al contratto nazionale
• Tredicesima + quattordicesima
• Uso autovettura per commissioni`,
  },
  {
    title: "Baby-sitter Esperta per Neonato",
    company: "Famiglia privata — Milano (Brera)",
    city: "Milano",
    country: "IT",
    category: "Baby-sitter",
    salaryMin: 1500,
    salaryMax: 1900,
    contractType: "Tempo indeterminato",
    description: `Coppia di professionisti nel quartiere Brera di Milano cerca baby-sitter esperta per neonato di 4 mesi. Partenza settembre.

Mansioni:
• Cura quotidiana del neonato (bagno, pasti, sonno)
• Routine strutturata (siamo genitori organizzati)
• Uscite quotidiane al parco
• Gestione emergenze di primo soccorso

Orario: 8:00-18:00 dal lunedì al venerdì

Requisiti:
• Esperienza documentata con neonati (0-12 mesi)
• Corso primo soccorso pediatrico (o disponibilità a farlo pagato da noi)
• Referenze verificabili da almeno 2 famiglie
• Italiano fluente, inglese gradito
• Carattere calmo e maturo

Offriamo:
• Retribuzione netta sopra la media milanese
• Contratto regolare con contributi
• Rimborso trasporti
• 2 settimane di ferie pagate`,
  },
  {
    title: "Assistente Familiare Notturna — Roma",
    company: "Clinica Villa Serena srl",
    city: "Roma",
    country: "IT",
    category: "Badante",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo indeterminato",
    description: `Struttura assistenziale privata di Roma cerca OSS o assistenti familiari per il turno notturno.

Mansioni:
• Sorveglianza e assistenza agli ospiti durante la notte
• Igiene e mobilizzazione degli ospiti non autosufficienti
• Gestione emergenze e chiamata al medico reperibile
• Compilazione delle schede di rilevazione notturna

Turno: 22:00-6:00, 5 notti su 7 a rotazione

Requisiti:
• Attestato OSS o esperienza equivalente certificata
• Abitudine al lavoro notturno
• Capacità di lavorare in autonomia mantenendo la calma
• Documenti regolari

Offriamo:
• Stipendio base + 30% maggiorazione notturna
• Contratto collettivo RSA
• Formazione continua interna
• Turni stabili, niente variazioni dell'ultimo minuto`,
  },
  // ─── ITALIA — ristorazione/hotel ───
  {
    title: "Pizzaiolo con Esperienza — Pizzeria Napoletana DOC",
    company: "Pizzeria da Salvatore",
    city: "Napoli",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1600,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Pizzeria napoletana doc nel centro di Napoli cerca pizzaiolo con esperienza nella pizza verace.

Mansioni:
• Impasto e lievitazione con metodo napoletano tradizionale
• Stesura a mano e cottura in forno a legna
• Gestione delle temperature e dei tempi di cottura
• Inventario farina e ingredienti

Requisiti:
• Esperienza minima 3 anni come pizzaiolo napoletano
• Conoscenza dell'impasto ad alta idratazione
• Velocità in linea (serviamo 200+ coperti/sera nei weekend)
• Referenze da pizzerie strutturate

Offriamo:
• Contratto CCNL turismo a tempo indeterminato
• Stipendio molto competitivo per Napoli
• 2 giorni di riposo consecutivi
• Pasto di lavoro incluso`,
  },
  {
    title: "Receptionist Hotel 4 Stelle — Lago di Garda",
    company: "Hotel Bellavista Garda",
    city: "Verona",
    country: "IT",
    category: "Hotel",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo determinato",
    description: `Hotel 4 stelle sul Lago di Garda cerca receptionist per la stagione aprile-ottobre con possibilità di rinnovo annuale.

Mansioni:
• Check-in/check-out ospiti nazionali e internazionali
• Gestione prenotazioni e PMS (preferibile Opera o Cloudbeds)
• Servizio concierge: ristoranti, escursioni, taxi
• Risposta alle recensioni online

Requisiti:
• Italiano fluente, inglese ottimo, terza lingua gradita (tedesco/francese)
• Esperienza in hotel 3-4 stelle
• Presentazione curata e sorriso professionale
• Disponibilità ai turni (mattina e pomeriggio, no notte)

Offriamo:
• Alloggio staff in struttura o contributo affitto
• Pasti inclusi durante il turno
• Contratto stagionale con benefit
• Ambiente internazionale su uno dei laghi più belli d'Italia`,
  },
  {
    title: "Cameriere/a di Sala — Ristorante sul Mare",
    company: "Ristorante Acqua e Sale",
    city: "Palermo",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1200,
    salaryMax: 1550,
    contractType: "Tempo determinato",
    description: `Ristorante di pesce fresco a Mondello (Palermo) cerca camerieri per la stagione estiva giugno-settembre.

Mansioni:
• Servizio ai tavoli con 60+ coperti a pranzo e cena
• Presentazione e consiglio dei piatti del giorno (pesce fresco)
• Gestione comande e POS
• Allestimento sala e mise en place

Requisiti:
• Esperienza nella ristorazione
• Italiano e inglese (turisti stranieri frequenti)
• Dinamismo e resistenza fisica nei turni intensi
• Disponibilità weekend e festivi

Offriamo:
• Contratto stagionale CCNL turismo
• Mance significative in stagione
• Pasto incluso ogni turno
• Possibilità di proroga e richiamo l'anno successivo`,
  },
  {
    title: "Commis de Cuisine — Hotel Termale",
    company: "Grand Hotel Terme Abano",
    city: "Padova",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1300,
    salaryMax: 1600,
    contractType: "Tempo determinato",
    description: `Hotel termale 4 stelle ad Abano Terme (Padova) cerca commis di cucina per la stagione.

Mansioni:
• Preparazione mise en place per tutti i reparti
• Supporto ai capo partita in tutte le aree (freddo, caldo, pasticceria)
• Apprendimento delle tecniche in una cucina strutturata
• Rispetto igiene e pulizia postazione HACCP

Requisiti:
• Diploma alberghiero o esperienza minima 1 anno
• Voglia di imparare e crescere nella professione
• Resistenza fisica (turni di 8 ore in cucina)
• Disponibilità a residere ad Abano (aiutiamo nella ricerca casa)

Offriamo:
• Contratto con vero piano di formazione
• Ambiente professionale da cui escono ottimi cuochi
• Pasto dipendenti e divisa fornita
• Possibilità di contratto annuale dopo la stagione`,
  },
  // ─── ITALIA — magazzino/logistica ───
  {
    title: "Magazziniere con Muletto — Settore Farmaceutico",
    company: "PharmaDist srl — Milano",
    city: "Milano",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1550,
    salaryMax: 1850,
    contractType: "Tempo indeterminato",
    description: `Distributore farmaceutico di Milano (zona Sesto San Giovanni) cerca magazzinieri con patentino muletto per turno pomeridiano.

Mansioni:
• Picking ordini farmaci con sistema WMS e PDA
• Controllo lotto e scadenza per ogni spedizione
• Scarico merci e sistemazione in scaffalatura verticale
• Pulizia e ordine costante del magazzino (prodotti sanitari)

Turno: 14:00-22:00 dal lunedì al venerdì

Requisiti:
• Patentino carrello elevatore in corso di validità (obbligatorio)
• Esperienza in magazzini farmaceutici o alimentari (preferibile)
• Precisione maniacale — errore zero su farmaci
• Documenti regolari

Offriamo:
• Contratto logistica a tempo indeterminato
• Maggiorazione pomeridiana + ticket restaurant
• Formazione normativa ADR e GDP
• Piano di crescita a team leader dopo 18 mesi`,
  },
  {
    title: "Autista Patente C+E — Tratte Nazionali",
    company: "Trasporti Bianchi & Figli",
    city: "Bologna",
    country: "IT",
    category: "Logistica",
    salaryMin: 2000,
    salaryMax: 2600,
    contractType: "Tempo indeterminato",
    description: `Azienda di trasporti con base a Bologna cerca autisti con patente C+E per tratte nazionali a lunga percorrenza.

Mansioni:
• Guida mezzi pesanti su tratte Italia (prevalentemente Nord-Centro)
• Carico e scarico con sponda idraulica
• Gestione documentazione DDT, CMR, ADR
• Controllo e segnalazione anomalie mezzo

Requisiti:
• Patente C+E + CQC merci in corso di validità
• Carta tachigrafica
• Almeno 2 anni di esperienza in autotrasporto
• Conoscenza della normativa sui tempi di guida

Offriamo:
• Contratto CCNL logistica e trasporto — tra i migliori del settore
• Indennità trasferta giornaliera + pasti pagati
• Mezzo moderno (trattore 2023)
• Anticipi spese aziendale Mastercard
• Stipendio tra 2.000 e 2.600€ lordi + variabile`,
  },
  {
    title: "Addetto Smistamento Pacchi — Turno Notturno",
    company: "PostExpress Hub Torino",
    city: "Torino",
    country: "IT",
    category: "Logistica",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo indeterminato",
    description: `Hub corrieristico di Torino cerca addetti allo smistamento per il turno notturno (23:00-7:00), assunzione diretta.

Mansioni:
• Smistamento pacchi su nastri automatizzati
• Scansione e verifica codici con pistola
• Carico e scarico furgoni (colli fino a 30 kg)
• Segnalazione danni e anomalie

Requisiti:
• Nessuna esperienza richiesta (formazione interna di 3 giorni)
• Forma fisica adeguata al lavoro manuale
• Disponibilità fissa al turno notturno
• Documenti regolari

Offriamo:
• Contratto diretto (non interinale) a tempo indeterminato
• 30% di maggiorazione notturna esentasse
• Mensa h24 gratuita
• Navetta dalla stazione Torino Porta Nuova
• Stipendio netto effettivo: ~1.400-1.700€`,
  },
  {
    title: "Rider Consegne Pasti — Bari",
    company: "FoodFlash Bari",
    city: "Bari",
    country: "IT",
    category: "Rider",
    salaryMin: 900,
    salaryMax: 1300,
    contractType: "Part-time",
    description: `Startup di food delivery di Bari cerca rider con mezzo proprio per consegne nei quartieri centrali.

Orario flessibile: scegli tu i turni (pranzo, cena o entrambi).

Mansioni:
• Ritiro ordini da ristoranti partner
• Consegna rapida a domicilio con app aziendale
• Cura del packaging durante il trasporto

Requisiti:
• Motorino o bici elettrica propria
• Smartphone con connessione dati
• Conoscenza di Bari centro
• Affidabilità negli orari presi

Offriamo:
• Paga a consegna + bonus velocità
• Media 5-6€ a consegna, picco 8-10 consegne/ora
• Nessun vincolo orario — lavori quando vuoi
• Rimborso carburante per i motorini
• Assicurazione aggiuntiva inclusa`,
  },
  // ─── ITALIA — edilizia/agricoltura ───
  {
    title: "Elettricista Civile e Industriale",
    company: "Impianti Rossi srl",
    city: "Roma",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1700,
    salaryMax: 2300,
    contractType: "Tempo indeterminato",
    description: `Impresa elettrica di Roma cerca elettricisti qualificati per cantieri civili e industriali in tutta la capitale.

Mansioni:
• Installazione impianti elettrici civili (ristrutturazioni appartamenti)
• Quadri elettrici MT/BT per capannoni industriali
• Certificazione impianti secondo norma CEI
• Manutenzione impianti esistenti

Requisiti:
• Qualifica di elettricista (diploma o 3 anni di esperienza)
• Abilitazione art. 15 DM 37/08 (o disponibilità a conseguirla)
• Patente B
• Corsi sicurezza validi (offriamo aggiornamenti)

Offriamo:
• CCNL edilizia artigianato — retribuzione reale tra le migliori del mercato romano
• Furgone attrezzato + telefono aziendale
• DPI e attrezzatura sempre nuovi
• Partecipazione agli utili dopo 2 anni`,
  },
  {
    title: "Idraulico Termoidraulico — Installazione e Riparazione",
    company: "Thermo Service Milano",
    city: "Milano",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1800,
    salaryMax: 2400,
    contractType: "Tempo indeterminato",
    description: `Azienda termoidraulica di Milano cerca idraulici per installazione e manutenzione di impianti civili e condominiali.

Mansioni:
• Installazione caldaie (gas, pompe di calore)
• Manutenzione programmata con clienti fidelizzati
• Riparazioni urgenti h24 (turno di reperibilità a rotazione)
• Installazione sanitari e impianti idrici

Requisiti:
• Abilitazione alla conduzione e installazione caldaie (obbligatoria)
• Esperienza minima 3 anni
• Patente B
• Cordialità con i clienti (lavoriamo in casa loro)

Offriamo:
• Furgone + telefono + tablet aziendale
• Reperibilità pagata a parte
• Premi fedeltà e partecipazione agli utili
• Clienti fidelizzati da 15 anni: zero periodi di inattività`,
  },
  {
    title: "Operaio Agricolo Raccolta Olive — Puglia",
    company: "Masseria Olearia Pugliese",
    city: "Bari",
    country: "IT",
    category: "Agricoltura",
    salaryMin: 950,
    salaryMax: 1200,
    contractType: "Tempo determinato",
    description: `Masseria olivicola in provincia di Bari cerca operai stagionali per la raccolta delle olive, ottobre-dicembre.

Mansioni:
• Raccolta olive con agevolatori meccanici
• Trasporto casse al frantoio aziendale
• Pulizia degli oliveti

Requisiti:
• Buona forma fisica (lavoro all'aperto)
• Disponibilità minima 4 settimane
• Documenti regolari
• Esperienza agricola gradita ma non obbligatoria

Offriamo:
• Contratto agricolo giornaliero o mensile a scelta
• Alloggio in masseria (camera condivisa) a €40/settimana
• Pasti cucinati dalla masseria
• Olio extravergine DOP in omaggio`,
  },
  {
    title: "Potatore e Giardiniere Professionista",
    company: "Verde Pubblico srl — Firenze",
    city: "Firenze",
    country: "IT",
    category: "Agricoltura",
    salaryMin: 1350,
    salaryMax: 1650,
    contractType: "Tempo indeterminato",
    description: `Cooperativa di verde urbano di Firenze cerca potatori e giardinieri professionisti per contratti con Comune e ville storiche.

Mansioni:
• Potatura alberi ad alto fusto (con piattaforma)
• Cura parchi e giardini storici fiorentini
• Stesura teli, trattamenti fitosanitari e irrigazione
• Piccoli interventi di giardinaggio residenziale

Requisiti:
• Esperienza con piattaforma aerea o arrampicata su alberi
• Qualifica di potatore (o patentino arboricoltura)
• Patente B o BE
• Passione per il verde

Offriamo:
• Contratto commercio a tempo indeterminato
• Furgone + attrezzatura professionale
• Formazione continua (arboricoltura, fitofarmaci)
• Lavoro a contatto con i monumenti verdi di Firenze`,
  },
  // ─── ITALIA — vari ───
  {
    title: "Operatore Socio Sanitario — RSA",
    company: "Casa di Riposo San Giuseppe",
    city: "Brescia",
    country: "IT",
    category: "Badante",
    salaryMin: 1450,
    salaryMax: 1750,
    contractType: "Tempo indeterminato",
    description: `RSA convenzionata di Brescia cerca OSS con attestato per turni diurni e notturni in struttura.

Mansioni:
• Assistenza diretta agli ospiti nelle attività quotidiane
• Igiene personale, mobilizzazione e prevenzione piaghe da decubito
• Collaborazione con infermieri e terapisti
• Compilazione cartella assistenziale informatizzata

Requisiti:
• Attestato OSS rilasciato da ente regionale (obbligatorio)
• Esperienza preferibile ma valutiamo anche neoqualificati
• Empatia e resistenza emotiva
• Disponibilità a turni inclusi festivi

Offriamo:
• CCNL UNEBA — uno dei migliori per il settore
• Turni programmati con anticipo di 4 settimane
• Formazione ECM annuale pagata
• Mensa convenzionata a €2/pasto
• Supporto psicologico per il personale`,
  },
  {
    title: "Cassiere/a Supermercato — Turni Part-time",
    company: "Supermercati EuroSpesa",
    city: "Roma",
    country: "IT",
    category: "Altro",
    salaryMin: 850,
    salaryMax: 1100,
    contractType: "Part-time",
    description: `Catena di supermercati a Roma cerca cassieri/e e addetti alle vendite per part-time mattutino o serale.

Mansioni:
• Cassa e operazioni di apertura/chiusura
• Rifornimento scaffali
• Assistenza clienti e gestione reclami semplici

Turni disponibili: 7:30-13:30 oppure 15:00-20:00

Requisiti:
• Diploma di scuola media superiore
• Esperienza in cassa o GDO (gradita ma non necessaria)
• Italiano fluente
• Sorriso e pazienza con i clienti

Offriamo:
• Contratto commercio part-time con possibilità full-time
• Sconto dipendenti del 15% sugli acquisti
• Turni fissi, nessuna variazione improvvisa
• Piani di carriera interni (molti responsabili vengono dalla cassa)`,
  },
  {
    title: "Saldatore MIG/MAG — Officina Meccanica",
    company: "Officine Meccaniche Nord",
    city: "Torino",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1700,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Officina meccanica di Torino (settore automotive e carpenteria) cerca saldatori qualificati MIG/MAG.

Mansioni:
• Saldatura su acciaio dolce e inox
• Lettura disegni tecnici e tolleranze
• Autocontrollo qualità del giunto
• Manutenzione attrezzatura di saldatura

Requisiti:
• Qualifica saldatore MIG/MAG (patente saldatore UNI EN preferibile)
• Esperienza minima 2 anni in officina o carpenteria
• Capacità di lavoro autonomo su disegno
• Puntualità e serietà

Offriamo:
• CCNL metalmeccanico pieno
• DPI e abbigliamento ignifugo forniti
• Straordinari pagati al 130%
• Officina moderna con macchine saldatura di ultima generazione
• Premio annuale di produzione`,
  },
  {
    title: "Addetto Lavaggio e Preparazione Auto — Concessionaria",
    company: "Concessionaria BMW Milano Nord",
    city: "Milano",
    country: "IT",
    category: "Altro",
    salaryMin: 1100,
    salaryMax: 1350,
    contractType: "Tempo indeterminato",
    description: `Concessionaria BMW di Sesto San Giovanni cerca addetto al lavaggio e alla preparazione veicoli prima della consegna.

Mansioni:
• Lavaggio esterno e interno con prodotti professionali
• Lucidatura carrozzeria e trattamenti protettivi
• Preparazione vetture nuove per la consegna ai clienti
• Gestione piccoli spostamenti in area concessionaria

Requisiti:
• Patente B da almeno 1 anno
• Cura e attenzione per i veicoli di pregio
• Esperienza in car detailing (gradita)
• Precisione: lavoriamo su auto da 60.000€+

Offriamo:
• Contratto commercio a tempo indeterminato
• Formazione professionale BMW sui prodotti e metodi
• Ambiente curato e colleghi stabili
• Possibilità di crescita verso il reparto post-vendita`,
  },
  // ─── ESTERO ───
  {
    title: "Badante per Famiglia Italiana — Lugano",
    company: "Famiglia privata — Lugano",
    city: "Lugano",
    country: "CH",
    category: "Badante",
    salaryMin: 3000,
    salaryMax: 3800,
    contractType: "Tempo indeterminato",
    description: `Famiglia italiana residente a Lugano cerca badante per nonna di 81 anni con ridotta mobilità. Italiano lingua principale.

Mansioni:
• Assistenza personale (bagno, vestizione, pasti)
• Accompagnamento a visite e passeggiate
• Compagnia e giochi di stimolazione cognitiva
• Comunicazione quotidiana con la famiglia

Requisiti:
• Esperienza con anziani
• Italiano fluente (la signora parla solo italiano)
• Carattere allegro e paziente
• Permesso di lavoro CH (frontaliero G o B — aiutiamo)

Offriamo:
• Stipendio svizzero (3.000-3.800 CHF/mese)
• Contratto AVS/LPP (previdenza svizzera)
• Alloggio a Lugano (camera propria, 300 CHF/mese)
• Un weekend libero su due`,
  },
  {
    title: "Operaio Metalmeccanico — Zona Industriale Monaco",
    company: "Bayern Metall GmbH",
    city: "Monaco di Baviera",
    country: "DE",
    category: "Edilizia",
    salaryMin: 2600,
    salaryMax: 3100,
    contractType: "Tempo indeterminato",
    description: `Azienda metalmeccanica nell'area industriale di Monaco cerca operai per la lavorazione di componenti meccanici di precisione.

Mansioni:
• Tornitura CNC con macchine Mazak e DMG Mori
• Controllo qualità con strumenti di misura
• Piccola manutenzione delle macchine

Requisiti:
• Esperienza come tornitore o fresatore CNC (minimo 2 anni)
• Tedesco base (impariamo insieme) o inglese
• Disponibilità a trasferirti a Monaco
• Documenti UE

Offriamo:
• Contratto metalmeccanico tedesco
• Supporto alloggio durante i primi 3 mesi
• Corsi di tedesco pagati dall'azienda
• 30 giorni ferie, 13a mensilità`,
  },
  {
    title: "Guida Turistica Italiana — Barcellona",
    company: "Barcelona Italian Tours",
    city: "Barcellona",
    country: "ES",
    category: "Altro",
    salaryMin: 1500,
    salaryMax: 2200,
    contractType: "Tempo determinato",
    description: `Agenzia turistica di Barcellona specializzata nei visitatori italiani cerca guide turistiche in lingua italiana.

Mansioni:
• Tour guidati del centro storico, Sagrada Familia e Park Güell in italiano
• Tour personalizzati per famiglie e gruppi
• Gestione piccoli gruppi (5-15 persone)
• Promozione dei tour sui social in italiano

Requisiti:
• Italiano madrelingua o livello madrelingua
• Conoscenza storico-artistica di Barcellona
• Licenza di guida turistica spagnola (aiutiamo a ottenerla)
• Personalità carismatica e amore per la Catalogna

Offriamo:
• Contratto stagionale aprile-ottobre (con possibilità annuale)
• Paga oraria + commissioni sui tour acquistati dai clienti
• Flessibilità di orari (organizzi i tuoi tour)
• Vivere e lavorare nella città più bella del Mediterraneo`,
  },
  {
    title: "Elettricista per Cantieri Navali — Marsiglia",
    company: "Chantiers Navals Méditerranée",
    city: "Marsiglia",
    country: "FR",
    category: "Edilizia",
    salaryMin: 2800,
    salaryMax: 3400,
    contractType: "Tempo indeterminato",
    description: `Cantiere navale di Marsiglia cerca elettricisti per impianti navali su yacht e navi da crociera.

Mansioni:
• Installazione impianti elettrici su imbarcazioni di lusso
• Cablaggio quadri e sistemi di navigazione
• Test e certificazione sistemi

Requisiti:
• Qualifica di elettricista (esperienza navale preferibile)
• Francese base o inglese tecnico
• Documenti UE
• Disponibilità occasionale a trasferte sui cantieri clienti

Offriamo:
• Contratto metalmeccanico navale francese
• Premi di cantiere significativi
• Formazione specialistica certificata STCW
• Marsiglia: mare, sole e ottimo cibo`,
  },
  {
    title: "Muratore per Costruzioni Residenziali — Amsterdam",
    company: "BouwTeam Nederland BV",
    city: "Amsterdam",
    country: "NL",
    category: "Edilizia",
    salaryMin: 2800,
    salaryMax: 3400,
    contractType: "Tempo indeterminato",
    description: `Impresa edile olandese cerca muratori qualificati per costruzioni e ristrutturazioni residenziali ad Amsterdam.

Mansioni:
• Murature, intonaci e finiture su nuove costruzioni
• Ristrutturazioni di antichi edifici nel centro storico
• Collaborazione con team internazionale

Requisiti:
• Esperienza come muratore qualificato (minimo 3 anni)
• Olandese non richiesto (team multilingue), inglese base sufficiente
• Documenti UE
• Disponibilità a lavorare con furgone da base fissa (no trasferte lontane)

Offriamo:
• Salario olandese pieno + indennità
• Alloggio organizzato (stanza singola ~600€/mese)
• Bicicletta aziendale
• Olanda: costo della vita alto ma stipendi molto alti`,
  },
  {
    title: "Receptionist di Notte — Hotel Vienna Centro",
    company: "Hotel Stefanie Wien",
    city: "Vienna",
    country: "AT",
    category: "Hotel",
    salaryMin: 1900,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Hotel 4 stelle nel centro di Vienna (il più antico d'Austria) cerca night auditor/receptionist di notte.

Mansioni:
• Check-in degli arrivi tardivi
• Chiusura contabile del giorno (night audit)
• Sorveglianza della struttura
• Preparazione report per la direzione mattutina

Turno: 23:00-7:00, 5 notti su 7

Requisiti:
• Tedesco base o inglese (clientela internazionale)
• Esperienza in hotel o capacità di imparare il PMS
• Affidabilità assoluta (sei da solo in hotel la notte)
• Documenti UE

Offriamo:
• 14 mensilità austriache (una delle migliori tutele d'Europa)
• Maggiorazione notturna
• Pasti inclusi
• Hotel storico fondato nel 1600 — un posto unico`,
  },
  {
    title: "Addetto Ortofrutta — Supermercato Lussemburgo",
    company: "Naturmarkt Luxembourg",
    city: "Lussemburgo",
    country: "BE",
    category: "Altro",
    salaryMin: 2400,
    salaryMax: 2800,
    contractType: "Tempo indeterminato",
    description: `Catena di supermercati biologici in Lussemburgo cerca addetti al reparto ortofrutta. Italiano, francese o inglese sufficiente.

Mansioni:
• Allestimento e cura del banco ortofrutta
• Controllo qualità e rotazione prodotti
• Assistenza clienti

Requisiti:
• Esperienza in GDO o mercati ortofrutticoli
• Italiano, francese o inglese
• Documenti UE
• Affidabilità

Offriamo:
• Salario lussemburghese (il più alto in EU per salario minimo)
• Contratto stabile con 25 giorni di ferie
• Costo della vita alto, ma niente imposte sui redditi bassi
• Lussemburgo: hub europeo ideale per chi vuole crescere`,
  },
  {
    title: "Infermiere/a per Clinica Privata — Londra",
    company: "London Care Clinic",
    city: "Londra",
    country: "GB",
    category: "Badante",
    salaryMin: 3200,
    salaryMax: 4000,
    contractType: "Tempo indeterminato",
    description: `Clinica privata di Londra cerca infermieri/e con laurea riconosciuta dall'NMC per reparto geriatrico.

Mansioni:
• Assistenza infermieristica completa ai pazienti anziani
• Gestione farmacologica e documentazione
• Coordinamento con équipe medica

Requisiti:
• Laurea in infermieristica riconosciuta da NMC (aiutiamo per il riconoscimento)
• Esperienza minima 2 anni
• Inglese B2+ (obbligatorio per l'NMC)
• Visto di lavoro UK (aiutiamo con il processo)

Offriamo:
• Stipendio NHS-equivalente + benefit privata
• Supporto completo per riconoscimento NMC e visto
• Alloggio staff nei primi 3 mesi
• Corsi di aggiornamento ECM`,
  },
];

async function seedJobsBatch4() {
  try {
    console.log(`📥 Inserimento ${NEW_JOBS.length} nuovi annunci...`);
    for (const job of NEW_JOBS) {
      await db.insert(jobsTable).values(job as any);
      console.log(`  ✓ ${job.title} — ${job.city} (${job.country})`);
    }
    console.log(`\n✅ Inseriti ${NEW_JOBS.length} annunci senza toccare quelli esistenti.`);
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Errore:", err.message);
    process.exit(1);
  }
}

seedJobsBatch4();
