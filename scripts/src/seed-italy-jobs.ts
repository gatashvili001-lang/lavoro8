import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const NEW_JOBS = [
  // ─── BADANTE — ITALIA ───
  {
    title: "Badante Convivente per Coppia di Anziani",
    company: "Famiglia privata — Bologna",
    city: "Bologna",
    country: "IT",
    category: "Badante",
    salaryMin: 1200,
    salaryMax: 1450,
    contractType: "Tempo indeterminato",
    description: `Famiglia a Bologna cerca badante convivente per assistere coppia di anziani (lui 84, lei 81 anni), entrambi parzialmente autosufficienti.

Mansioni:
• Assistenza nelle attività quotidiane (igiene, vestizione)
• Preparazione dei pasti secondo indicazioni mediche
• Pulizia e riordino della casa
• Accompagnamento a visite mediche e spesa settimanale
• Compagnia e supervisione costante

Requisiti:
• Almeno 2 anni di esperienza con anziani
• Referenze verificabili
• Documenti in regola per lavorare in Italia
• Italiano parlato di livello sufficiente

Offriamo:
• Camera singola con bagno privato
• Contratto CCNL colf e badanti con contributi INPS
• Tredicesima e ferie retribuite
• Riposo settimanale sabato pomeriggio e domenica`,
  },
  {
    title: "Badante Diurna per Signora Anziana — Zona Navigli",
    company: "Famiglia privata — Milano",
    city: "Milano",
    country: "IT",
    category: "Badante",
    salaryMin: 950,
    salaryMax: 1200,
    contractType: "Part-time",
    description: `Cerchiamo badante ad ore (9:00-17:00, lunedì-venerdì) per signora di 89 anni con mobilità ridotta, zona Navigli, Milano.

Mansioni:
• Aiuto nell'igiene personale e nella vestizione
• Preparazione pranzo e merenda
• Passeggiate quando il tempo lo permette
• Piccole commissioni (farmacia, spesa)
• Compagnia e lettura

Requisiti:
• Esperienza con persone con mobilità ridotta
• Conoscenza uso sollevatore (formazione fornita se necessario)
• Puntualità e affidabilità
• Permesso di soggiorno valido

Offriamo:
• Contratto regolare part-time 40 ore settimanali
• Retribuzione puntuale ogni fine mese
• Ambiente familiare sereno
• Possibilità di passaggio a convivenza in futuro`,
  },
  {
    title: "Badante Convivente Weekend e Sostituzioni",
    company: "Agenzia AssistenzaCasa",
    city: "Firenze",
    country: "IT",
    category: "Badante",
    salaryMin: 600,
    salaryMax: 850,
    contractType: "Tempo determinato",
    description: `Agenzia specializzata in assistenza domiciliare cerca badanti per weekend (sabato mattina - lunedì mattina) e sostituzioni ferie a Firenze e provincia.

Mansioni:
• Assistenza completa alla persona durante il fine settimana
• Preparazione pasti e gestione farmaci
• Igiene personale e mobilizzazione

Requisiti:
• Esperienza minima 1 anno
• Disponibilità immediata nei weekend
• Referenze recenti
• Documenti regolari

Offriamo:
• Retribuzione settimanale puntuale
• Possibilità di lavoro continuativo tutto l'anno
• Formazione gratuita iniziale
• Ottima opportunità per integrare altre entrate`,
  },
  {
    title: "Assistente Domiciliare per Signore Non Autosufficiente",
    company: "Famiglia privata — Napoli",
    city: "Napoli",
    country: "IT",
    category: "Badante",
    salaryMin: 1050,
    salaryMax: 1300,
    contractType: "Tempo indeterminato",
    description: `Famiglia a Napoli (zona Vomero) cerca badante convivente per signore di 78 anni non autosufficiente a seguito di ictus.

Mansioni:
• Assistenza completa nelle attività quotidiane
• Mobilizzazione con ausili (formazione fornita)
• Somministrazione farmaci secondo prescrizione medica
• Preparazione pasti e gestione della casa
• Collaborazione con fisioterapista domiciliare

Requisiti:
• Esperienza documentata con pazienti non autosufficienti
• Preferibile corso OSS o equivalente
• Pazienza, forza fisica e professionalità
• Documenti in regola

Offriamo:
• Vitto e alloggio in camera singola
• Contratto CCNL livello CS con contributi
• Tredicesima, ferie e TFR regolari
• Famiglia presente e collaborativa`,
  },
  {
    title: "Badante Notturna per RSA Privata",
    company: "Residenza Villa Serena",
    city: "Verona",
    country: "IT",
    category: "Badante",
    salaryMin: 1100,
    salaryMax: 1400,
    contractType: "Tempo indeterminato",
    description: `Residenza per anziani a Verona cerca assistenti per turni notturni (20:00-08:00), 4 notti a settimana.

Mansioni:
• Sorveglianza notturna degli ospiti
• Cambio posturale e assistenza ai bisogni notturni
• Segnalazione emergenze al personale infermieristico
• Compilazione diario notturno

Requisiti:
• Esperienza in strutture o assistenza domiciliare
• Attestato OSS titolo preferenziale (non obbligatorio)
• Affidabilità e capacità di lavorare in autonomia
• Documenti regolari

Offriamo:
• Contratto a tempo indeterminato dopo periodo di prova
• Maggiorazione notturna e festiva
• Ambiente di lavoro strutturato e formazione continua
• Mensa interna gratuita`,
  },
  // ─── COLF — ITALIA ───
  {
    title: "Colf a Ore per Famiglia con Villa",
    company: "Famiglia privata — Roma",
    city: "Roma",
    country: "IT",
    category: "Colf",
    salaryMin: 800,
    salaryMax: 1000,
    contractType: "Part-time",
    description: `Famiglia a Roma Nord (zona Cassia) cerca colf per 25 ore settimanali, orario flessibile mattutino.

Mansioni:
• Pulizia completa della villa (300 mq su due piani)
• Stiro e gestione guardaroba
• Cambio biancheria e gestione lavanderia
• Occasionale preparazione pranzi semplici

Requisiti:
• Esperienza pregressa come colf
• Precisione e cura dei dettagli
• Referenze verificabili
• Automunita (preferibile)

Offriamo:
• Contratto regolare CCNL lavoro domestico
• Orario stabile e concordato
• Ambiente rispettoso e sereno
• Bonus annuale a dicembre`,
  },
  {
    title: "Colf Convivente per Famiglia Numerosa",
    company: "Famiglia privata — Milano",
    city: "Milano",
    country: "IT",
    category: "Colf",
    salaryMin: 1100,
    salaryMax: 1350,
    contractType: "Tempo indeterminato",
    description: `Famiglia con tre figli a Milano (zona Città Studi) cerca colf convivente per gestione completa della casa.

Mansioni:
• Pulizie quotidiane e riordino
• Preparazione dei pasti per la famiglia
• Stiro e lavanderia
• Spesa settimanale
• Supporto organizzativo generale

Requisiti:
• Esperienza come colf convivente
• Capacità di cucinare piatti italiani di base
• Ordine, discrezione e autonomia
• Documenti in regola

Offriamo:
• Camera singola con bagno
• Contratto regolare con contributi
• Weekend liberi (sabato dalle 14:00)
• Tredicesima e ferie pagate`,
  },
  {
    title: "Addetta alle Pulizie Domestiche — Più Famiglie",
    company: "PulitoCasa Servizi",
    city: "Torino",
    country: "IT",
    category: "Colf",
    salaryMin: 900,
    salaryMax: 1150,
    contractType: "Tempo determinato",
    description: `Agenzia di servizi domestici cerca addette alle pulizie per famiglie a Torino, zone Crocetta e San Salvario.

Mansioni:
• Pulizie domestiche presso 3-4 famiglie fisse
• Stiro su richiesta
• Piccole commissioni

Requisiti:
• Esperienza nelle pulizie domestiche
• Serietà e puntualità
• Disponibilità 30 ore settimanali
• Documenti regolari

Offriamo:
• Contratto regolare con l'agenzia (non lavoro nero)
• Clienti fissi e orari stabili
• Rimborso trasporti urbani
• Possibilità di aumento ore`,
  },
  // ─── BABY-SITTER — ITALIA ───
  {
    title: "Baby-sitter Pomeridiana per Due Bambini",
    company: "Famiglia privata — Milano",
    city: "Milano",
    country: "IT",
    category: "Baby-sitter",
    salaryMin: 700,
    salaryMax: 900,
    contractType: "Part-time",
    description: `Famiglia a Milano (zona Isola) cerca baby-sitter per due bambini di 4 e 7 anni, dal lunedì al venerdì dalle 15:30 alle 19:30.

Mansioni:
• Ritiro dei bambini da scuola e asilo
• Merenda e supporto compiti per il più grande
• Giochi e attività ricreative
• Accompagnamento ad attività sportive (piscina il martedì)

Requisiti:
• Esperienza documentata con bambini
• Referenze di altre famiglie
• Italiano fluente
• Preferibile formazione in ambito educativo

Offriamo:
• Contratto regolare part-time
• Retribuzione puntuale mensile
• Famiglia presente e disponibile
• Possibilità di ore extra serali pagate a parte`,
  },
  {
    title: "Tata Convivente per Neonato",
    company: "Famiglia privata — Roma",
    city: "Roma",
    country: "IT",
    category: "Baby-sitter",
    salaryMin: 1200,
    salaryMax: 1500,
    contractType: "Tempo indeterminato",
    description: `Famiglia a Roma (zona Parioli) cerca tata convivente esperta per neonato di 3 mesi, con entrambi i genitori che lavorano.

Mansioni:
• Cura completa del neonato durante il giorno
• Preparazione biberon e prime pappe
• Bagnetto, nanna e passeggiate
• Gestione del corredo e della cameretta

Requisiti:
• Esperienza specifica con neonati (minimo 3 anni)
• Corso di disostruzione pediatrica (o disponibilità a farlo, a nostre spese)
• Referenze eccellenti verificabili
• Documenti in regola

Offriamo:
• Camera singola con bagno privato
• Contratto CCNL con contributi versati
• Stipendio sopra la media per profilo esperto
• Weekend liberi`,
  },
  // ─── RISTORANTE — ITALIA ───
  {
    title: "Cameriere/a di Sala — Trattoria Storica",
    company: "Trattoria Da Peppino",
    city: "Firenze",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1300,
    salaryMax: 1600,
    contractType: "Tempo indeterminato",
    description: `Trattoria storica nel centro di Firenze cerca cameriere/a di sala con esperienza per servizio pranzo e cena.

Mansioni:
• Accoglienza clienti e gestione tavoli (sala da 45 coperti)
• Presa comande con palmare
• Servizio ai tavoli e consiglio sui piatti
• Preparazione sala e mise en place

Requisiti:
• Esperienza minima 2 anni in sala
• Italiano fluente, inglese di base per i turisti
• Bella presenza e attitudine al contatto col pubblico
• Disponibilità weekend e festivi (2 giorni di riposo infrasettimanali)

Offriamo:
• Contratto CCNL turismo a tempo indeterminato
• Mance settimanali condivise dal team
• Pasti inclusi durante i turni
• Ambiente storico con clientela affezionata`,
  },
  {
    title: "Aiuto Cuoco per Ristorante di Pesce",
    company: "Ristorante Il Gabbiano",
    city: "Bari",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo indeterminato",
    description: `Ristorante di pesce sul lungomare di Bari cerca aiuto cuoco per la linea del pranzo e della cena.

Mansioni:
• Preparazione ingredienti e mise en place di cucina
• Pulizia e sfilettatura del pesce
• Supporto allo chef su primi e antipasti
• Mantenimento ordine e igiene della postazione

Requisiti:
• Esperienza in cucina professionale (minimo 1 anno)
• Preferibile esperienza con il pesce
• HACCP valido o disponibilità a conseguirlo
• Resistenza ai ritmi intensi del servizio

Offriamo:
• Contratto regolare full-time
• Crescita professionale verso ruolo di capo partita
• Pasti inclusi e divisa fornita
• Chiusura domenica sera e lunedì`,
  },
  {
    title: "Pizzaiolo Esperto Forno a Legna",
    company: "Pizzeria Vesuvio",
    city: "Napoli",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1500,
    salaryMax: 1900,
    contractType: "Tempo indeterminato",
    description: `Storica pizzeria napoletana cerca pizzaiolo esperto con forno a legna per il proprio locale nel centro di Napoli.

Mansioni:
• Preparazione impasti secondo tradizione napoletana
• Gestione completa del forno a legna
• Stesura, farcitura e cottura (150-250 pizze a servizio)
• Controllo qualità ingredienti e ordini fornitori

Requisiti:
• Esperienza minima 3 anni come pizzaiolo
• Padronanza del forno a legna
• Conoscenza impasti a lunga lievitazione
• Serietà e spirito di squadra

Offriamo:
• Stipendio tra i più alti del settore in città
• Contratto a tempo indeterminato
• Un giorno e mezzo di riposo settimanale
• Premio produzione estivo`,
  },
  {
    title: "Barista per Caffetteria del Centro",
    company: "Caffè Duomo",
    city: "Milano",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1250,
    salaryMax: 1500,
    contractType: "Tempo indeterminato",
    description: `Caffetteria a due passi dal Duomo di Milano cerca barista per turno mattutino (6:30-14:30).

Mansioni:
• Preparazione caffetteria classica ed espresso
• Servizio colazioni al banco e ai tavoli
• Preparazione aperitivi semplici a fine turno
• Gestione cassa e riordino banco

Requisiti:
• Esperienza al banco bar (minimo 1 anno)
• Velocità e cortesia anche nelle ore di punta
• Italiano fluente, inglese base gradito
• Disponibilità dal lunedì al sabato

Offriamo:
• Contratto CCNL pubblici esercizi
• Domenica sempre libera
• Colazione e pranzo inclusi
• Tredicesima e quattordicesima`,
  },
  // ─── MAGAZZINO / LOGISTICA — ITALIA ───
  {
    title: "Magazziniere con Patentino Muletto",
    company: "LogiPoint Italia",
    city: "Piacenza",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1450,
    salaryMax: 1700,
    contractType: "Tempo indeterminato",
    description: `Polo logistico di Piacenza cerca magazzinieri con patentino del muletto in corso di validità per ampliamento organico.

Mansioni:
• Carico e scarico merci con carrello elevatore
• Stoccaggio pallet e gestione ubicazioni
• Picking con terminale radiofrequenza
• Controllo qualità e quantità merce in ingresso

Requisiti:
• Patentino muletto valido (obbligatorio)
• Esperienza minima 1 anno in magazzino
• Disponibilità su 3 turni (6-14 / 14-22 / 22-6)
• Documenti in regola

Offriamo:
• Contratto diretto con l'azienda, no agenzia
• Maggiorazioni per turni notturni e straordinari
• Buoni pasto da 8€
• Premio presenza mensile`,
  },
  {
    title: "Addetto Picking E-commerce — Anche Prima Esperienza",
    company: "FastWarehouse Srl",
    city: "Roma",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1250,
    salaryMax: 1450,
    contractType: "Tempo determinato",
    description: `Magazzino e-commerce in zona Tiburtina (Roma) cerca addetti al picking anche senza esperienza: formazione completa a carico nostro.

Mansioni:
• Prelievo articoli con lettore barcode
• Imballaggio e preparazione spedizioni
• Etichettatura pacchi
• Riordino postazioni a fine turno

Requisiti:
• Nessuna esperienza richiesta, la formazione la facciamo noi
• Puntualità e voglia di lavorare
• Disponibilità a turni anche il sabato
• Documenti regolari

Offriamo:
• Contratto iniziale 6 mesi con reale possibilità di stabilizzazione
• Navetta gratuita dalla metro Rebibbia
• Ambiente giovane e dinamico
• Straordinari sempre pagati`,
  },
  {
    title: "Autista Patente C per Consegne Regionali",
    company: "TransPuglia Logistica",
    city: "Bari",
    country: "IT",
    category: "Logistica",
    salaryMin: 1600,
    salaryMax: 1950,
    contractType: "Tempo indeterminato",
    description: `Azienda di trasporti pugliese cerca autisti con patente C + CQC per consegne regionali (rientro giornaliero a casa).

Mansioni:
• Consegne a supermercati e negozi in Puglia e Basilicata
• Carico/scarico con transpallet elettrico
• Gestione documenti di trasporto
• Cura del mezzo assegnato

Requisiti:
• Patente C e CQC in corso di validità
• Carta tachigrafica
• Esperienza minima 1 anno alla guida di mezzi pesanti
• Affidabilità e cortesia con i clienti

Offriamo:
• Rientro a casa tutte le sere
• Contratto CCNL trasporti a tempo indeterminato
• Trasferte pagate a parte
• Mezzo recente e ben mantenuto`,
  },
  // ─── HOTEL — ITALIA ───
  {
    title: "Cameriera ai Piani — Hotel 4 Stelle",
    company: "Grand Hotel Riviera",
    city: "Rimini",
    country: "IT",
    category: "Hotel",
    salaryMin: 1200,
    salaryMax: 1450,
    contractType: "Tempo determinato",
    description: `Hotel 4 stelle sul lungomare di Rimini cerca cameriere ai piani per la stagione, con possibilità di conferma annuale.

Mansioni:
• Rifacimento camere e pulizia bagni (14-16 camere a turno)
• Cambio biancheria e rifornimento cortesie
• Segnalazione manutenzioni necessarie
• Pulizia aree comuni a rotazione

Requisiti:
• Esperienza come cameriera ai piani (preferibile)
• Velocità, precisione e discrezione
• Disponibilità weekend e festivi
• Documenti in regola

Offriamo:
• Vitto e alloggio disponibili per chi viene da fuori
• Contratto stagionale CCNL turismo
• Possibilità di conferma per hotel invernale del gruppo
• Ambiente di lavoro corretto e organizzato`,
  },
  {
    title: "Receptionist Turno Notturno — Inglese Fluente",
    company: "Hotel Colosseo Palace",
    city: "Roma",
    country: "IT",
    category: "Hotel",
    salaryMin: 1400,
    salaryMax: 1650,
    contractType: "Tempo indeterminato",
    description: `Hotel 4 stelle vicino al Colosseo cerca receptionist per il turno di notte (23:00-7:00), 4 notti a settimana.

Mansioni:
• Check-in tardivi e check-out anticipati
• Gestione centralino e richieste ospiti notturne
• Chiusura contabile giornaliera
• Sorveglianza generale della struttura

Requisiti:
• Inglese fluente (seconda lingua gradita)
• Esperienza in reception o front office
• Conoscenza gestionali alberghieri (preferibile Opera)
• Affidabilità assoluta

Offriamo:
• Contratto a tempo indeterminato
• Maggiorazione notturna in busta paga
• Sole 4 notti lavorative a settimana
• Formazione sui sistemi interni`,
  },
  // ─── RIDER — ITALIA ───
  {
    title: "Rider con Scooter Aziendale — Zona Centro",
    company: "ConsegnaVeloce Milano",
    city: "Milano",
    country: "IT",
    category: "Rider",
    salaryMin: 1100,
    salaryMax: 1500,
    contractType: "Tempo determinato",
    description: `Servizio di consegne food a Milano cerca rider con contratto da dipendente (non a cottimo) e scooter aziendale fornito.

Mansioni:
• Consegne food nel centro di Milano
• Turni fissi concordati (pranzo o cena)
• Cura dello scooter aziendale assegnato

Requisiti:
• Patente AM o superiore
• Conoscenza della città
• Puntualità e cortesia
• Smartphone personale

Offriamo:
• Contratto da dipendente con paga oraria fissa
• Scooter, casco e divisa forniti dall'azienda
• Benzina rimborsata
• Bonus consegne nei weekend`,
  },
  // ─── EDILIZIA — ITALIA ───
  {
    title: "Muratore Esperto per Ristrutturazioni",
    company: "EdilNova Costruzioni",
    city: "Bergamo",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1700,
    salaryMax: 2100,
    contractType: "Tempo indeterminato",
    description: `Impresa edile di Bergamo specializzata in ristrutturazioni residenziali cerca muratori esperti per cantieri in città e provincia.

Mansioni:
• Opere murarie di ristrutturazione (tramezzi, intonaci, massetti)
• Posa mattoni e blocchi
• Lettura disegni tecnici di base
• Collaborazione con idraulici ed elettricisti in cantiere

Requisiti:
• Esperienza minima 3 anni come muratore
• Conoscenza delle tecniche di ristrutturazione
• Corso sicurezza 16 ore valido
• Preferibile patente B

Offriamo:
• Contratto CCNL edilizia a tempo indeterminato
• Busta paga puntuale con straordinari pagati
• Cassa edile con ferie e gratifiche
• Cantieri solo in zona, niente trasferte lunghe`,
  },
  {
    title: "Manovale Edile — Si Offre Formazione",
    company: "Cooperativa CostruireInsieme",
    city: "Palermo",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1300,
    salaryMax: 1550,
    contractType: "Tempo determinato",
    description: `Cooperativa edile a Palermo cerca manovali anche alla prima esperienza per cantieri di edilizia pubblica.

Mansioni:
• Supporto ai muratori nelle lavorazioni
• Movimentazione materiali in cantiere
• Preparazione malte e pulizia aree di lavoro
• Montaggio e smontaggio ponteggi (dopo formazione)

Requisiti:
• Buona forma fisica e voglia di imparare
• Serietà e rispetto delle regole di sicurezza
• Documenti in regola
• Corso sicurezza a carico nostro se non posseduto

Offriamo:
• Formazione completa retribuita
• Contratto regolare con cassa edile
• Percorso di crescita verso qualifica di muratore
• Cantieri di lunga durata (2+ anni)`,
  },
  // ─── AGRICOLTURA — ITALIA ───
  {
    title: "Operaio Agricolo Serre di Pomodori",
    company: "Azienda Agricola Sole di Sicilia",
    city: "Ragusa",
    country: "IT",
    category: "Agricoltura",
    salaryMin: 1200,
    salaryMax: 1400,
    contractType: "Tempo determinato",
    description: `Azienda agricola nel ragusano cerca operai per lavorazioni in serra (pomodoro ciliegino) con contratto regolare.

Mansioni:
• Trapianto, potatura e raccolta in serra
• Selezione e confezionamento prodotto
• Manutenzione ordinaria impianti di irrigazione

Requisiti:
• Preferibile esperienza agricola (non obbligatoria)
• Resistenza al lavoro fisico
• Documenti in regola — contratto solo regolare
• Disponibilità 6 giorni su 7 in alta stagione

Offriamo:
• Contratto agricolo con giornate registrate (disoccupazione agricola)
• Alloggio disponibile a prezzo agevolato
• Paga puntuale ogni 15 giorni
• Lavoro garantito 9 mesi l'anno`,
  },
  // ─── GERMANIA ───
  {
    title: "Lagermitarbeiter / Addetto Magazzino — Vitto e Alloggio",
    company: "RheinLogistik GmbH",
    city: "Colonia",
    country: "DE",
    category: "Magazzino",
    salaryMin: 2200,
    salaryMax: 2600,
    contractType: "Tempo indeterminato",
    description: `Centro logistico a Colonia (Germania) cerca addetti magazzino. Supporto per l'alloggio nei primi mesi e aiuto con le pratiche di registrazione.

Mansioni:
• Picking e packing con scanner
• Carico/scarico e smistamento pacchi
• Controllo merce in entrata

Requisiti:
• Non serve il tedesco: team internazionale, si parla anche inglese
• Documenti UE o permesso di lavoro tedesco
• Disponibilità su 2 turni
• Puntualità e costanza

Offriamo:
• Stipendio tedesco con contratto regolare
• Alloggio aziendale nei primi 6 mesi (300€/mese)
• Aiuto con Anmeldung e conto bancario
• Straordinari pagati al 125%`,
  },
  {
    title: "Badante per Famiglia Italiana a Monaco",
    company: "Famiglia privata — Monaco di Baviera",
    city: "Monaco di Baviera",
    country: "DE",
    category: "Badante",
    salaryMin: 1800,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Famiglia italiana residente a Monaco di Baviera cerca badante convivente italofona per nonna di 88 anni.

Mansioni:
• Assistenza quotidiana alla signora (autosufficiente)
• Cucina italiana casalinga
• Compagnia in italiano e passeggiate
• Gestione della casa

Requisiti:
• Italiano madrelingua o fluente (la signora parla solo italiano)
• Esperienza con anziani
• Disponibilità a trasferirsi a Monaco
• Documenti UE

Offriamo:
• Stipendio tedesco, ben sopra la media italiana
• Camera con bagno privato, vitto incluso
• Volo iniziale rimborsato
• Contratto regolare tedesco (Minijob escluso, contratto pieno)`,
  },
  {
    title: "Cameriere per Ristorante Italiano a Berlino",
    company: "Osteria La Toscana Berlin",
    city: "Berlino",
    country: "DE",
    category: "Ristorante",
    salaryMin: 2000,
    salaryMax: 2500,
    contractType: "Tempo indeterminato",
    description: `Ristorante italiano a Berlino (Charlottenburg) cerca camerieri italiani per la sala. Le mance in Germania sono molto generose.

Mansioni:
• Servizio ai tavoli in stile italiano
• Consiglio vini e piatti alla clientela tedesca
• Preparazione sala

Requisiti:
• Esperienza in sala minimo 1 anno
• Tedesco base o inglese fluente (il tedesco si impara)
• Bella presenza e simpatia
• Documenti UE

Offriamo:
• Stipendio base + mance (150-300€/settimana extra)
• Aiuto nella ricerca dell'alloggio
• Contratto regolare tedesco con assicurazione sanitaria
• Team per metà italiano`,
  },
  // ─── SPAGNA ───
  {
    title: "Camarero/a per Beach Club — Stagione Lunga",
    company: "Playa Sol Group",
    city: "Marbella",
    country: "ES",
    category: "Ristorante",
    salaryMin: 1500,
    salaryMax: 1900,
    contractType: "Tempo determinato",
    description: `Beach club a Marbella cerca camerieri per la stagione lunga (marzo-novembre), con alloggio staff disponibile.

Mansioni:
• Servizio ai lettini e ai tavoli del ristorante
• Preparazione cocktail semplici
• Gestione comande con palmare

Requisiti:
• Spagnolo o inglese fluente
• Esperienza in ristorazione o beach club
• Energia e attitudine al cliente internazionale
• Documenti UE

Offriamo:
• Alloggio staff a 200€/mese
• Mance ottime nella stagione alta
• Contratto spagnolo regolare
• Possibilità di ritorno ogni stagione`,
  },
  {
    title: "Mozo de Almacén — Magazzino Frutta e Verdura",
    company: "Frutas del Levante SA",
    city: "Valencia",
    country: "ES",
    category: "Magazzino",
    salaryMin: 1300,
    salaryMax: 1550,
    contractType: "Tempo determinato",
    description: `Azienda ortofrutticola a Valencia cerca addetti magazzino per selezione e confezionamento agrumi.

Mansioni:
• Selezione e calibratura frutta
• Confezionamento e pallettizzazione
• Carico camion con transpallet

Requisiti:
• Non serve esperienza, formazione inclusa
• Resistenza al lavoro in ambiente refrigerato
• Documenti UE o NIE spagnolo
• Disponibilità immediata

Offriamo:
• Contratto regolare spagnolo
• Lavoro garantito ottobre-maggio
• Straordinari pagati
• Ambiente internazionale`,
  },
  // ─── FRANCIA ───
  {
    title: "Femme/Valet de Chambre — Hotel Parigi",
    company: "Hôtel Lumière Paris",
    city: "Parigi",
    country: "FR",
    category: "Hotel",
    salaryMin: 1800,
    salaryMax: 2100,
    contractType: "Tempo indeterminato",
    description: `Hotel 4 stelle nel 9° arrondissement di Parigi cerca personale ai piani, contratto CDI francese.

Mansioni:
• Rifacimento camere secondo standard 4 stelle
• Gestione carrello e biancheria
• Segnalazione manutenzioni

Requisiti:
• Esperienza in hotel (preferibile)
• Francese base o inglese
• Precisione e velocità
• Documenti UE

Offriamo:
• CDI (tempo indeterminato francese) da subito
• 13esima mensilità
• Mutuelle (assicurazione sanitaria integrativa) aziendale
• Rimborso 50% abbonamento metro`,
  },
  {
    title: "Vendemmiatori per Champagne — Vitto e Alloggio",
    company: "Domaine des Coteaux",
    city: "Reims",
    country: "FR",
    category: "Agricoltura",
    salaryMin: 1600,
    salaryMax: 2000,
    contractType: "Tempo determinato",
    description: `Storica azienda vinicola nella regione dello Champagne cerca vendemmiatori per la campagna di settembre (2-3 settimane intensive).

Mansioni:
• Raccolta manuale dell'uva
• Trasporto cassette al punto di raccolta
• Selezione grappoli

Requisiti:
• Buona forma fisica
• Disponibilità per tutto il periodo della vendemmia
• Documenti UE
• Spirito di squadra

Offriamo:
• Paga oraria francese + straordinari
• Vitto e alloggio gratuiti in azienda
• Possibilità di proseguire con altre aziende della zona
• Contratto vendange regolare`,
  },
  // ─── PAESI BASSI ───
  {
    title: "Addetto Serra Fiori — Contratto Olandese",
    company: "Westland Flowers BV",
    city: "L'Aia",
    country: "NL",
    category: "Agricoltura",
    salaryMin: 2100,
    salaryMax: 2500,
    contractType: "Tempo determinato",
    description: `Grande azienda floricola nella zona di Westland (vicino a L'Aia) cerca operai per le serre di tulipani e rose.

Mansioni:
• Raccolta e selezione fiori
• Confezionamento mazzi per l'export
• Cura delle piante in serra

Requisiti:
• Non serve esperienza né olandese (team internazionale)
• Documenti UE
• Disponibilità minima 3 mesi
• Puntualità

Offriamo:
• Salario olandese con contratto regolare
• Alloggio organizzato dall'agenzia (110€/settimana)
• Bicicletta fornita per gli spostamenti
• Assicurazione sanitaria inclusa`,
  },
  // ─── AUSTRIA ───
  {
    title: "Cameriera ai Piani — Hotel Alpino con Alloggio",
    company: "Alpenhotel Edelweiss",
    city: "Innsbruck",
    country: "AT",
    category: "Hotel",
    salaryMin: 1700,
    salaryMax: 2000,
    contractType: "Tempo determinato",
    description: `Hotel alpino 4 stelle vicino a Innsbruck cerca personale ai piani per la stagione invernale (dicembre-aprile), vitto e alloggio inclusi.

Mansioni:
• Pulizia camere e suite
• Gestione biancheria e lavanderia
• Supporto occasionale alla colazione

Requisiti:
• Esperienza in hotel preferibile
• Tedesco base o inglese
• Disponibilità per tutta la stagione
• Documenti UE

Offriamo:
• Vitto e alloggio gratuiti in hotel
• Stipendio austriaco netto quasi interamente risparmiabile
• Skipass scontato per i giorni liberi
• Possibilità di stagione estiva successiva`,
  },
  // ─── SVIZZERA ───
  {
    title: "Lavapiatti/Aiuto Cucina — Stipendio Svizzero",
    company: "Ristorante Bellavista Lugano",
    city: "Lugano",
    country: "CH",
    category: "Ristorante",
    salaryMin: 3200,
    salaryMax: 3700,
    contractType: "Tempo indeterminato",
    description: `Ristorante a Lugano (Svizzera italiana) cerca lavapiatti/aiuto cucina. Si parla italiano, perfetto come primo lavoro in Svizzera.

Mansioni:
• Lavaggio stoviglie e pentolame
• Pulizia cucina a fine servizio
• Supporto base alla preparazione (pelare, tagliare)

Requisiti:
• Serietà e resistenza fisica
• Documenti UE (il permesso svizzero lo richiediamo noi)
• Disponibilità weekend
• Nessuna esperienza richiesta

Offriamo:
• Stipendio svizzero: 3.200-3.700 CHF lordi
• Contratto regolare con permesso di lavoro
• Pasti inclusi nei turni
• Zona italofona: nessuna barriera linguistica`,
  },
  // ─── BELGIO ───
  {
    title: "Operaio Confezionamento Cioccolato",
    company: "Chocolaterie Royale",
    city: "Bruxelles",
    country: "BE",
    category: "Magazzino",
    salaryMin: 2000,
    salaryMax: 2300,
    contractType: "Tempo determinato",
    description: `Storica cioccolateria belga cerca operai per il reparto confezionamento nel periodo pre-natalizio e oltre.

Mansioni:
• Confezionamento praline e tavolette
• Controllo qualità visivo
• Preparazione ordini per le boutique

Requisiti:
• Precisione e pulizia
• Certificato HACCP (o formazione interna)
• Documenti UE
• Francese o inglese base

Offriamo:
• Salario belga con indicizzazione
• Buoni pasto da 8€
• Contratto interinale con possibilità di assunzione diretta
• Sconto dipendenti sui prodotti`,
  },
  // ─── REGNO UNITO ───
  {
    title: "Kitchen Porter — Ristorante Italiano Londra",
    company: "Osteria Fiorentina London",
    city: "Londra",
    country: "GB",
    category: "Ristorante",
    salaryMin: 1900,
    salaryMax: 2300,
    contractType: "Tempo indeterminato",
    description: `Ristorante italiano a Londra (Soho) cerca kitchen porter. Necessario visto di lavoro UK già valido (post-Brexit).

Mansioni:
• Lavaggio stoviglie e attrezzature
• Pulizia e sanificazione cucina
• Ricezione e sistemazione consegne

Requisiti:
• Visto di lavoro UK valido (obbligatorio, verificato)
• Inglese base
• Affidabilità e velocità
• Esperienza preferibile ma non necessaria

Offriamo:
• Paga sopra il London Living Wage
• Pasti del personale inclusi
• Team italiano in cucina
• Crescita verso commis chef possibile`,
  },
];

async function seedItalyJobs() {
  try {
    console.log(`📥 Inserimento ${NEW_JOBS.length} nuovi annunci...`);
    for (const job of NEW_JOBS) {
      await db.insert(jobsTable).values(job as any);
      console.log(`  ✓ ${job.title} — ${job.city} (${job.country})`);
    }
    console.log(`\n✅ Inseriti ${NEW_JOBS.length} nuovi annunci senza toccare quelli esistenti.`);
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Errore:", err.message);
    process.exit(1);
  }
}

seedItalyJobs();
