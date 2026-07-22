import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const NEW_JOBS = [
  // ─── ITALIA ───
  {
    title: "Badante Convivente per Signora con Demenza Senile",
    company: "Famiglia privata — Catania",
    city: "Catania",
    country: "IT",
    category: "Badante",
    salaryMin: 1000,
    salaryMax: 1250,
    contractType: "Tempo indeterminato",
    description: `Famiglia a Catania cerca badante convivente per signora di 83 anni con demenza senile in fase moderata.

Mansioni:
• Assistenza continua e supervisione della signora
• Igiene personale e vestizione
• Preparazione pasti e somministrazione farmaci
• Gestione della routine quotidiana con pazienza

Requisiti:
• Esperienza con demenza o Alzheimer (importante)
• Carattere paziente ed equilibrato
• Referenze verificabili
• Documenti in regola

Offriamo:
• Camera singola, vitto incluso
• Contratto CCNL colf e badanti con contributi
• Riposo settimanale garantito + tredicesima
• Supporto costante della famiglia (figlia abita accanto)`,
  },
  {
    title: "Badante a Ore per Coppia di Anziani — Mattina",
    company: "Famiglia privata — Cagliari",
    city: "Cagliari",
    country: "IT",
    category: "Badante",
    salaryMin: 800,
    salaryMax: 950,
    contractType: "Part-time",
    description: `Famiglia a Cagliari (quartiere Genneruxi) cerca badante per coppia di anziani, orario mattutino 8:00-13:00 dal lunedì al sabato.

Mansioni:
• Aiuto nell'igiene e nella vestizione
• Preparazione del pranzo
• Riordino della casa e spesa
• Accompagnamento a visite mediche

Requisiti:
• Esperienza con anziani
• Automunita (preferibile)
• Puntualità e affidabilità
• Documenti regolari

Offriamo:
• Contratto regolare part-time 30 ore
• Orario comodo, pomeriggi sempre liberi
• Retribuzione puntuale
• Possibilità di ore aggiuntive retribuite`,
  },
  {
    title: "Colf e Aiuto Cucina per B&B Familiare",
    company: "B&B Vista Mare Trieste",
    city: "Trieste",
    country: "IT",
    category: "Colf",
    salaryMin: 1100,
    salaryMax: 1300,
    contractType: "Tempo determinato",
    description: `B&B a conduzione familiare a Trieste cerca collaboratrice per pulizie camere e supporto colazioni.

Mansioni:
• Pulizia e riassetto delle 6 camere del B&B
• Preparazione e servizio colazioni (7:30-10:30)
• Gestione lavanderia e stireria
• Piccole commissioni

Requisiti:
• Esperienza in pulizie professionali o hotel
• Precisione e gentilezza con gli ospiti
• Italiano buono, inglese base gradito
• Disponibilità weekend

Offriamo:
• Contratto stagionale con possibilità di rinnovo annuale
• Ambiente familiare e rispettoso
• Orario continuato senza turni serali
• Bonus fine stagione`,
  },
  {
    title: "Cuoco Capo Partita — Ristorante Gourmet",
    company: "Ristorante La Lanterna",
    city: "Genova",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1700,
    salaryMax: 2100,
    contractType: "Tempo indeterminato",
    description: `Ristorante gourmet nel centro storico di Genova cerca capo partita per la linea dei primi piatti.

Mansioni:
• Gestione autonoma della partita dei primi
• Preparazione pasta fresca quotidiana
• Controllo scorte e ordini del reparto
• Rispetto standard HACCP

Requisiti:
• Esperienza minima 3 anni in cucine strutturate
• Padronanza della pasta fresca ligure (trofie, pansoti)
• Capacità di reggere il servizio nei picchi
• Spirito di brigata

Offriamo:
• Stipendio commisurato all'esperienza
• Contratto a tempo indeterminato CCNL turismo
• 2 giorni di riposo consecutivi (domenica sera + lunedì)
• Possibilità di crescita a sous chef`,
  },
  {
    title: "Addetto Ricevimento Merci — Ortofrutta",
    company: "Mercato Agroalimentare Padova",
    city: "Padova",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1350,
    salaryMax: 1600,
    contractType: "Tempo indeterminato",
    description: `Piattaforma ortofrutticola di Padova cerca addetti al ricevimento merci per il turno notturno/mattutino (4:00-12:00).

Mansioni:
• Scarico e controllo qualità frutta e verdura in arrivo
• Pesatura e registrazione a sistema
• Smistamento verso le celle frigorifere
• Preparazione ordini per i clienti grossisti

Requisiti:
• Disponibilità al turno mattutino presto
• Preferibile esperienza nel settore ortofrutticolo
• Patentino muletto gradito (non obbligatorio)
• Affidabilità e precisione

Offriamo:
• Contratto a tempo indeterminato
• Maggiorazione oraria per il turno notturno
• Pomeriggi sempre liberi
• Premio di produzione annuale`,
  },
  {
    title: "Operatore Ecologico / Addetto Raccolta Rifiuti",
    company: "Servizi Ambientali Brescia",
    city: "Brescia",
    country: "IT",
    category: "Altro",
    salaryMin: 1450,
    salaryMax: 1700,
    contractType: "Tempo indeterminato",
    description: `Azienda di servizi ambientali cerca operatori ecologici per la raccolta differenziata porta a porta a Brescia e comuni limitrofi.

Mansioni:
• Raccolta rifiuti porta a porta con mezzo aziendale
• Svuotamento cestini e pulizia aree pubbliche
• Segnalazione anomalie sul percorso

Requisiti:
• Patente B (patente C titolo preferenziale)
• Buona forma fisica
• Disponibilità a partire dalle 5:00 del mattino
• Serietà e costanza

Offriamo:
• Contratto CCNL igiene ambientale (tra i più tutelati)
• Stipendio puntuale + indennità
• Vestiario e DPI forniti
• Posto stabile con prospettiva pensionistica`,
  },
  {
    title: "Baby-sitter con Inglese per Famiglia Bilingue",
    company: "Famiglia privata — Torino",
    city: "Torino",
    country: "IT",
    category: "Baby-sitter",
    salaryMin: 850,
    salaryMax: 1100,
    contractType: "Part-time",
    description: `Famiglia bilingue a Torino (zona Crocetta) cerca baby-sitter con buon inglese per bambina di 5 anni, 20 ore settimanali pomeridiane.

Mansioni:
• Ritiro dalla scuola materna
• Giochi e attività in inglese
• Merenda e accompagnamento a danza
• Supporto alla routine serale 2 sere a settimana

Requisiti:
• Inglese fluente (parlato quotidiano con la bambina)
• Esperienza con bambini in età prescolare
• Referenze
• Preferibile formazione Montessori o educativa

Offriamo:
• Paga oraria sopra la media per il profilo linguistico
• Contratto regolare
• Famiglia flessibile e organizzata
• Estate: possibilità di trasferta al mare retribuita`,
  },
  {
    title: "Carpentiere per Cantiere Navale",
    company: "Cantieri Navali Adriatico",
    city: "Venezia",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1800,
    salaryMax: 2200,
    contractType: "Tempo indeterminato",
    description: `Cantiere navale a Marghera (Venezia) cerca carpentieri in ferro per costruzioni e refitting navale.

Mansioni:
• Lettura disegni tecnici e tracciatura
• Taglio, sagomatura e montaggio elementi in acciaio
• Saldatura di base (corsi di specializzazione interni)
• Lavoro in squadra su scafi e sovrastrutture

Requisiti:
• Esperienza come carpentiere in ferro (edile o navale)
• Corso sicurezza valido
• Disponibilità a lavoro su ponteggi e spazi confinati (formazione fornita)
• Precisione e rispetto delle procedure

Offriamo:
• Contratto metalmeccanico a tempo indeterminato
• Retribuzione tra le più alte del settore operaio
• Formazione specialistica retribuita
• Mensa aziendale e trasporto da Mestre`,
  },
  {
    title: "Commesso/a Panetteria con Laboratorio",
    company: "Panificio Antico Forno",
    city: "Bologna",
    country: "IT",
    category: "Altro",
    salaryMin: 1250,
    salaryMax: 1450,
    contractType: "Tempo indeterminato",
    description: `Storico panificio di Bologna cerca commesso/a per la vendita al banco e supporto al laboratorio.

Mansioni:
• Vendita pane, pasticceria e prodotti da forno
• Allestimento banco e vetrine
• Gestione cassa
• Supporto al confezionamento

Requisiti:
• Esperienza nella vendita alimentare (preferibile)
• Cordialità e cura dell'igiene
• Disponibilità dalle 6:30 (turno mattino) a rotazione
• Italiano fluente

Offriamo:
• Contratto CCNL panificazione
• Domenica pomeriggio e lunedì liberi
• Prodotti del giorno in omaggio
• Ambiente storico e clientela affezionata`,
  },
  {
    title: "Autista Consegne Farmaci — Patente B",
    company: "FarmaExpress Roma",
    city: "Roma",
    country: "IT",
    category: "Logistica",
    salaryMin: 1300,
    salaryMax: 1500,
    contractType: "Tempo determinato",
    description: `Azienda di distribuzione farmaceutica cerca autisti con patente B per consegne a farmacie di Roma e provincia.

Mansioni:
• Consegne programmate a farmacie (2 giri al giorno)
• Gestione documenti di consegna con palmare
• Cura del furgone refrigerato assegnato

Requisiti:
• Patente B da almeno 3 anni
• Conoscenza di Roma e GRA
• Precisione negli orari (le farmacie aspettano i farmaci)
• Nessun carico pesante: colli leggeri

Offriamo:
• Contratto iniziale 12 mesi con stabilizzazione
• Furgone aziendale e carburante
• Percorsi fissi, si impara in una settimana
• Sabato pomeriggio e domenica liberi`,
  },
  // ─── ESTERO ───
  {
    title: "Magazziniere Notturno — Hub Aeroportuale",
    company: "CargoLog Frankfurt",
    city: "Francoforte",
    country: "DE",
    category: "Magazzino",
    salaryMin: 2400,
    salaryMax: 2800,
    contractType: "Tempo indeterminato",
    description: `Hub cargo dell'aeroporto di Francoforte cerca magazzinieri per il turno notturno, stipendio maggiorato del 25%.

Mansioni:
• Smistamento colli aerei con scanner
• Carico/scarico unità di carico aeree (ULD)
• Controllo documentale spedizioni

Requisiti:
• Inglese o tedesco base
• Documenti UE (badge aeroportuale richiesto da noi)
• Disponibilità notturna fissa (22:00-6:00)
• Affidabilità assoluta

Offriamo:
• Stipendio base + 25% maggiorazione notturna esentasse
• Contratto tedesco a tempo indeterminato
• Navetta aziendale dalla stazione
• 30 giorni di ferie l'anno`,
  },
  {
    title: "Cameriera ai Piani — Hotel 5 Stelle Salisburgo",
    company: "Hotel Mozart Palace",
    city: "Salisburgo",
    country: "AT",
    category: "Hotel",
    salaryMin: 1800,
    salaryMax: 2100,
    contractType: "Tempo indeterminato",
    description: `Hotel 5 stelle nel centro di Salisburgo cerca cameriere ai piani per contratto annuale (non solo stagione).

Mansioni:
• Pulizia camere e suite secondo standard 5 stelle
• Servizio turndown serale a rotazione
• Gestione minibar e biancheria pregiata

Requisiti:
• Esperienza in hotel 4-5 stelle
• Tedesco base o inglese
• Cura del dettaglio ai massimi livelli
• Documenti UE

Offriamo:
• Contratto annuale austriaco (14 mensilità!)
• Alloggio staff a 150€/mese
• Pasti inclusi nei turni
• Bonus presenze trimestrale`,
  },
  {
    title: "Operaio Produzione Alimentare — Fabbrica Dolciaria",
    company: "Kraków Sweets Sp. z o.o.",
    city: "Cracovia",
    country: "PL",
    category: "Altro",
    salaryMin: 1100,
    salaryMax: 1350,
    contractType: "Tempo determinato",
    description: `Fabbrica dolciaria a Cracovia cerca operai di produzione, ottimo rapporto stipendio/costo della vita.

Mansioni:
• Lavoro sulla linea di produzione e confezionamento
• Controllo qualità visivo
• Pulizia postazione secondo HACCP

Requisiti:
• Nessuna esperienza richiesta
• Documenti UE
• Disponibilità su 3 turni
• Puntualità

Offriamo:
• Contratto polacco regolare
• Alloggio organizzato a 80€/mese (il costo della vita a Cracovia è basso)
• Mensa gratuita in fabbrica
• Straordinari pagati al 150%`,
  },
  {
    title: "Cameriere/a Stagione Estiva — Isole Greche",
    company: "Santorini Resort Group",
    city: "Atene",
    country: "GR",
    category: "Ristorante",
    salaryMin: 1200,
    salaryMax: 1600,
    contractType: "Tempo determinato",
    description: `Gruppo alberghiero greco seleziona ad Atene camerieri per i resort di Santorini e Mykonos, stagione maggio-ottobre.

Mansioni:
• Servizio ristorante e bar a bordo piscina
• Colazioni a buffet
• Servizio eventi e matrimoni

Requisiti:
• Inglese fluente (clientela internazionale)
• Esperienza in ristorazione
• Disponibilità per l'intera stagione
• Documenti UE

Offriamo:
• Vitto e alloggio gratuiti nel resort
• Mance eccellenti (clientela internazionale)
• Stipendio interamente risparmiabile
• Volo di ritorno rimborsato a fine stagione`,
  },
  {
    title: "Autista Ride-sharing con Auto Aziendale",
    company: "Praha Drive s.r.o.",
    city: "Praga",
    country: "CZ",
    category: "Logistica",
    salaryMin: 1300,
    salaryMax: 1700,
    contractType: "Tempo determinato",
    description: `Flotta di ride-sharing a Praga cerca autisti: auto aziendale fornita, guadagni legati ai turni scelti.

Mansioni:
• Guida per piattaforme ride-sharing con auto della flotta
• Cura e pulizia del veicolo
• Turni flessibili scelti da te

Requisiti:
• Patente B da almeno 2 anni, guida pulita
• Inglese base per i turisti
• Documenti UE
• Smartphone

Offriamo:
• Auto, assicurazione e manutenzione a carico nostro
• Guadagno medio 1.300-1.700€/mese netti
• Turni completamente flessibili
• Supporto per le pratiche di licenza ceca`,
  },
  {
    title: "Receptionist Ostello Internazionale",
    company: "Budapest Central Hostel",
    city: "Budapest",
    country: "HU",
    category: "Hotel",
    salaryMin: 950,
    salaryMax: 1200,
    contractType: "Tempo determinato",
    description: `Ostello nel centro di Budapest cerca receptionist per team internazionale, inglese obbligatorio.

Mansioni:
• Check-in/check-out ospiti internazionali
• Organizzazione eventi e tour per gli ospiti
• Gestione prenotazioni (Booking, Hostelworld)
• Turno serale a rotazione

Requisiti:
• Inglese fluente (altre lingue benvenute)
• Attitudine social e accogliente
• Esperienza in ostelli o hotel gradita
• Documenti UE

Offriamo:
• Stipendio + alloggio gratuito in ostello (stanza staff)
• Budapest: costo della vita molto basso
• Team giovane da 12 nazionalità
• Turni 4 giorni lavoro / 3 riposo`,
  },
  {
    title: "Operaio Cantiere Navale — Rijeka",
    company: "Brodogradilište Rijeka",
    city: "Rijeka",
    country: "HR",
    category: "Edilizia",
    salaryMin: 1300,
    salaryMax: 1650,
    contractType: "Tempo determinato",
    description: `Cantiere navale di Rijeka (Croazia) cerca operai metalmeccanici e manovali per commesse navali 2026-2027.

Mansioni:
• Supporto a saldatori e carpentieri navali
• Movimentazione materiali in cantiere
• Molatura e preparazione superfici

Requisiti:
• Esperienza in cantieri o officine (preferibile)
• Corso sicurezza (o formazione a carico nostro)
• Documenti UE
• Buona forma fisica

Offriamo:
• Contratto croato regolare (Croazia è in area euro)
• Alloggio in foresteria a 100€/mese
• Mensa aziendale
• Commesse garantite per 2 anni`,
  },
  {
    title: "Barista Specialty Coffee — Centro Belgrado",
    company: "Kafeterija Beograd",
    city: "Belgrado",
    country: "RS",
    category: "Ristorante",
    salaryMin: 800,
    salaryMax: 1000,
    contractType: "Tempo indeterminato",
    description: `Catena di specialty coffee a Belgrado cerca baristi appassionati, formazione da barista specialty inclusa.

Mansioni:
• Preparazione espresso e metodi filtro (V60, aeropress)
• Latte art e caffetteria moderna
• Servizio al banco e gestione cassa

Requisiti:
• Passione per il caffè (l'esperienza si può imparare)
• Inglese base
• Cordialità e precisione
• Permesso di lavoro serbo (aiutiamo con le pratiche)

Offriamo:
• Formazione specialty completa (valore 500€) gratuita
• Stipendio sopra la media locale + mance
• Costo della vita a Belgrado molto contenuto
• Crescita a head barista`,
  },
  {
    title: "Operatore Call Center Italiano — Tbilisi",
    company: "Global Contact Georgia",
    city: "Tbilisi",
    country: "GE",
    category: "Altro",
    salaryMin: 900,
    salaryMax: 1300,
    contractType: "Tempo indeterminato",
    description: `Contact center internazionale a Tbilisi cerca operatori madrelingua o fluenti in italiano per assistenza clienti di brand europei.

Mansioni:
• Assistenza clienti in italiano (telefono, chat, email)
• Gestione ordini e resi per e-commerce
• Nessuna vendita a freddo: solo supporto

Requisiti:
• Italiano fluente scritto e parlato (obbligatorio)
• Inglese base per la formazione interna
• Computer skills di base
• Non serve esperienza: formazione pagata di 3 settimane

Offriamo:
• Stipendio molto sopra la media georgiana
• Bonus performance mensile
• Ufficio moderno in centro a Tbilisi
• Assicurazione sanitaria privata`,
  },
  {
    title: "Cuoco Italiano per Ristorante — Istanbul",
    company: "Trattoria Bella Istanbul",
    city: "Istanbul",
    country: "TR",
    category: "Ristorante",
    salaryMin: 1400,
    salaryMax: 1900,
    contractType: "Tempo indeterminato",
    description: `Ristorante italiano di alto livello a Istanbul (quartiere Nişantaşı) cerca cuoco italiano per guidare la linea.

Mansioni:
• Preparazione menu italiano autentico
• Formazione della brigata locale
• Controllo qualità ingredienti (import italiano disponibile)
• Sviluppo menu stagionale con lo chef patron

Requisiti:
• Esperienza minima 3 anni in cucina italiana
• Capacità di insegnare e guidare
• Inglese base per la brigata
• Disponibilità a trasferirsi (permesso di lavoro a carico nostro)

Offriamo:
• Stipendio netto in euro + alloggio pagato
• Volo iniziale e permesso di lavoro a carico nostro
• 1 volo A/R in Italia all'anno pagato
• Posizione di prestigio nella scena gastronomica di Istanbul`,
  },
  {
    title: "Animatore Turistico per Villaggi — Albania",
    company: "Riviera Resort Albania",
    city: "Durazzo",
    country: "AL",
    category: "Hotel",
    salaryMin: 900,
    salaryMax: 1200,
    contractType: "Tempo determinato",
    description: `Resort sulla riviera albanese cerca animatori turistici per la stagione estiva, clientela italiana e internazionale.

Mansioni:
• Animazione diurna (giochi, tornei, acquagym)
• Spettacoli serali e mini club
• Contatto quotidiano con gli ospiti italiani

Requisiti:
• Italiano fluente (clientela in maggioranza italiana)
• Energia, simpatia e spirito di squadra
• Esperienza in animazione gradita ma non necessaria
• Disponibilità giugno-settembre

Offriamo:
• Vitto e alloggio gratuiti nel resort
• Stipendio interamente risparmiabile
• Formazione pre-stagione pagata
• La riviera albanese è la nuova destinazione emergente`,
  },
  {
    title: "Warehouse Associate — Atlanta Distribution Center",
    company: "Peach State Logistics",
    city: "Atlanta",
    country: "US",
    category: "Magazzino",
    salaryMin: 2800,
    salaryMax: 3400,
    contractType: "Tempo indeterminato",
    description: `Distribution center in Atlanta, GA is hiring warehouse associates for day and night shifts. Work authorization required.

Responsibilities:
• Picking and packing with RF scanner
• Loading/unloading trailers
• Inventory cycle counts

Requirements:
• Valid US work authorization (required — verified)
• Ability to lift up to 50 lbs
• Reliability and punctuality
• Forklift certification a plus (training available)

We offer:
• $17-20/hour + overtime at 1.5x
• Health, dental and vision insurance after 60 days
• 401(k) with company match
• Weekly pay`,
  },
  {
    title: "Housekeeper — Boutique Hotel Lisbona",
    company: "Lisboa Charm Hotels",
    city: "Lisbona",
    country: "PT",
    category: "Hotel",
    salaryMin: 1000,
    salaryMax: 1200,
    contractType: "Tempo indeterminato",
    description: `Boutique hotel nel quartiere Alfama di Lisbona cerca addette/i alle camere per contratto annuale.

Mansioni:
• Pulizia e riassetto di 12-14 camere a turno
• Gestione biancheria e lavanderia
• Cura delle aree comuni

Requisiti:
• Esperienza in hotel preferibile
• Portoghese base, spagnolo o inglese
• Precisione e discrezione
• Documenti UE

Offriamo:
• Contratto portoghese regolare con 14 mensilità
• Pasti inclusi
• Sussidio trasporti
• Ambiente accogliente in hotel di charme`,
  },
  {
    title: "Addetto Vendemmia e Cantina — Bordeaux",
    company: "Château Belle Vigne",
    city: "Bordeaux",
    country: "FR",
    category: "Agricoltura",
    salaryMin: 1650,
    salaryMax: 1950,
    contractType: "Tempo determinato",
    description: `Château nella regione di Bordeaux cerca lavoratori per vendemmia e successivi lavori di cantina (settembre-dicembre).

Mansioni:
• Raccolta manuale nelle parcelle selezionate
• Selezione grappoli sul tavolo di cernita
• Lavori di cantina: rimontaggi, pulizia vasche
• Imbottigliamento (per chi prosegue)

Requisiti:
• Buona forma fisica
• Documenti UE
• Preferibile esperienza agricola o in cantina
• Disponibilità minima 6 settimane

Offriamo:
• Contratto francese vendange + cave
• Alloggio gratuito nella dependance del castello
• Pranzo del personale incluso
• Possibilità di contratto lungo fino a dicembre`,
  },
  {
    title: "Addetto Confezionamento Bulbi di Tulipano",
    company: "Holland Bulbs Export BV",
    city: "Amsterdam",
    country: "NL",
    category: "Agricoltura",
    salaryMin: 2100,
    salaryMax: 2450,
    contractType: "Tempo determinato",
    description: `Azienda esportatrice di bulbi di tulipano vicino ad Amsterdam cerca operai per il confezionamento, alta stagione agosto-dicembre.

Mansioni:
• Selezione e calibratura bulbi
• Confezionamento per l'export mondiale
• Etichettatura e pallettizzazione

Requisiti:
• Nessuna esperienza necessaria
• Documenti UE
• Disponibilità minima 3 mesi
• Costanza nel lavoro ripetitivo

Offriamo:
• Salario olandese pieno con contratto regolare
• Alloggio in park aziendale (115€/settimana, camera singola)
• Bicicletta gratuita
• Bonus fine stagione per chi completa il periodo`,
  },
  {
    title: "Muratore Finiture di Pregio — Cantieri Ginevra",
    company: "Bâtiment Suisse SA",
    city: "Ginevra",
    country: "CH",
    category: "Edilizia",
    salaryMin: 4200,
    salaryMax: 5000,
    contractType: "Tempo indeterminato",
    description: `Impresa edile svizzera cerca muratori qualificati per cantieri residenziali di pregio a Ginevra. Stipendi svizzeri, contratto CCL edilizia.

Mansioni:
• Murature e finiture di alta qualità
• Intonaci decorativi e rasature
• Posa blocchi e mattoni faccia a vista
• Lettura piani in autonomia

Requisiti:
• Esperienza minima 5 anni come muratore
• Precisione da finitura di pregio
• Francese base o disponibilità a impararlo
• Documenti UE (permesso G o B, aiutiamo noi)

Offriamo:
• 4.200-5.000 CHF lordi/mese (CCL edilizia svizzera)
• 13esima mensilità obbligatoria
• Indennità pasti e trasferte
• Formazione continua pagata`,
  },
  {
    title: "Picker/Packer E-commerce Moda — Anversa",
    company: "Fashion Hub Antwerp",
    city: "Anversa",
    country: "BE",
    category: "Magazzino",
    salaryMin: 2050,
    salaryMax: 2350,
    contractType: "Tempo determinato",
    description: `Magazzino e-commerce moda ad Anversa cerca addetti picking per il periodo settembre-gennaio (picco saldi e feste).

Mansioni:
• Prelievo capi con scanner
• Controllo qualità e imballaggio curato
• Gestione resi

Requisiti:
• Precisione con capi delicati
• Documenti UE
• Inglese, francese o olandese base
• Disponibilità straordinari nel Black Friday

Offriamo:
• Salario belga + buoni pasto 8€/giorno
• Straordinari al 150%
• Contratto interinale con possibilità assunzione
• Sconto 40% sui brand del magazzino`,
  },
  {
    title: "Cameriere/a per Pub Storico — Edimburgo",
    company: "The Royal Thistle Pub",
    city: "Edimburgo",
    country: "GB",
    category: "Ristorante",
    salaryMin: 1900,
    salaryMax: 2400,
    contractType: "Tempo indeterminato",
    description: `Pub storico nel centro di Edimburgo cerca staff di sala. Necessario visto UK valido (post-Brexit, verifichiamo prima del colloquio).

Mansioni:
• Servizio ai tavoli e al banco
• Spillatura birre e cask ale
• Servizio food durante pranzo e cena

Requisiti:
• Visto di lavoro UK valido (obbligatorio)
• Inglese buono
• Esperienza in pub o ristoranti
• Disponibilità weekend

Offriamo:
• Paga sopra il Living Wage scozzese + mance
• Pasti inclusi nei turni
• Ambiente storico nel cuore di Edimburgo
• Straordinari sempre pagati`,
  },
];

async function seedJobsBatch3() {
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

seedJobsBatch3();
