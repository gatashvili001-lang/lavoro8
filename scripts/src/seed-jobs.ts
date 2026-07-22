import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";
import { eq, gte } from "drizzle-orm";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const REAL_JOBS = [
  // ─── MAGAZZINO ───
  {
    title: "Operatore di Magazzino",
    company: "Amazon Italia",
    city: "Piacenza",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1450,
    salaryMax: 1750,
    contractType: "Tempo determinato",
    description: `Amazon Italia cerca Operatori di Magazzino per il suo centro logistico di Piacenza (Castel San Giovanni). Il lavoro include la ricezione, lo smistamento, il picking e il confezionamento dei prodotti.

Cosa farai:
• Ricezione e smistamento merci in entrata
• Prelievo prodotti (picking) con scanner
• Confezionamento e preparazione spedizioni
• Manutenzione ordine del magazzino

Requisiti:
• Nessuna esperienza precedente richiesta (formazione inclusa)
• Disponibilità a turni (mattina/pomeriggio/notte)
• Buona resistenza fisica
• Documenti di lavoro regolari

Cosa offriamo:
• Contratto iniziale 6 mesi con possibilità di proroga
• Turni fissi o a rotazione
• Mensa aziendale sovvenzionata
• Bonus produttività
• Ambiente di lavoro sicuro e moderno`,
  },
  {
    title: "Addetto Magazzino — Turno Notturno",
    company: "Lidl Italia",
    city: "Milano",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1380,
    salaryMax: 1680,
    contractType: "Tempo indeterminato",
    description: `Lidl Italia cerca Addetti al Magazzino per il centro di distribuzione di Arcole (VR) e Sesto San Giovanni (MI). Offriamo contratto a tempo indeterminato da subito.

Attività principali:
• Scarico camion e stoccaggio merci
• Preparazione ordini per i punti vendita
• Gestione scaffalature e inventario
• Utilizzo transpallet manuale ed elettrico

Requisiti:
• Disponibilità a lavorare di notte (22:00-06:00)
• Patentino transpallet (preferibile ma non obbligatorio)
• Buona forma fisica
• Puntualità e affidabilità

Offriamo:
• Contratto a tempo indeterminato
• 14° mensilità e buoni pasto
• Maggiorazione notturna (+35%)
• Piano welfare aziendale
• Possibilità di crescita interna`,
  },
  {
    title: "Magazziniere con Patentino Muletto",
    company: "IKEA Italia",
    city: "Roma",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1500,
    salaryMax: 1900,
    contractType: "Tempo indeterminato",
    description: `IKEA Italia cerca un Magazziniere con patentino per carrello elevatore per il punto vendita di Roma Anagnina.

Responsabilità:
• Gestione del magazzino interno (area Self-Service e Bulk)
• Movimentazione merci con carrello elevatore frontale
• Rifornimento reparti e gestione stock
• Inventari periodici

Requisiti obbligatori:
• Patentino per carrello elevatore frontale valido
• Esperienza di almeno 1 anno in magazzino
• Disponibilità a turni (apertura/chiusura punto vendita)
• Conoscenza di base dei sistemi WMS

Cosa offriamo:
• RAL €18.000-€22.000 (14 mensilità)
• Buoni pasto €7/giorno lavorativo
• Sconto dipendente 15% sugli acquisti IKEA
• Assicurazione sanitaria integrativa
• Bonus annuale legato ai risultati`,
  },
  {
    title: "Addetto Picking e Packing",
    company: "GLS Italy",
    city: "Bologna",
    country: "IT",
    category: "Magazzino",
    salaryMin: 1300,
    salaryMax: 1550,
    contractType: "Tempo determinato",
    description: `GLS Italy, uno dei principali operatori di corriere espresso in Italia, cerca Addetti al Picking e Packing per il hub di Bologna.

Mansioni:
• Smistamento colli e pacchi in entrata
• Preparazione spedizioni nazionali e internazionali
• Utilizzo di pistole barcode per la scansione
• Chiusura e pesatura colli

Orario di lavoro:
• Turni mattutini: 06:00 - 14:00
• Turni pomeridiani: 14:00 - 22:00
• Disponibilità al sabato richiesta

Requisiti:
• Esperienza in magazzino (anche breve)
• Buona resistenza fisica (lavoro dinamico)
• Spirito di squadra

Inizierai con contratto in somministrazione con possibilità di inserimento diretto.`,
  },

  // ─── LOGISTICA ───
  {
    title: "Autista Furgone — Consegne Urbane",
    company: "DHL Express Italia",
    city: "Milano",
    country: "IT",
    category: "Logistica",
    salaryMin: 1600,
    salaryMax: 2000,
    contractType: "Tempo indeterminato",
    description: `DHL Express Italia seleziona Autisti Furgone per le consegne express nel territorio milanese. Inserimento diretto in DHL.

Attività:
• Ritiro e consegna pacchi espressi a privati e aziende
• Utilizzo app dedicata per la gestione del giro
• Gestione delle firme e documentazione di consegna
• Cura e manutenzione del furgone assegnato

Requisiti:
• Patente B in corso di validità (min. 2 anni)
• Conoscenza delle strade di Milano e provincia
• Buona conoscenza della lingua italiana
• Puntualità e orientamento al cliente

Offerta:
• Contratto CCNL Logistica e Trasporti
• Furgone aziendale + carta carburante
• Dispositivi mobile aziendali
• Ticket restaurant €8/giorno
• Premi produzione mensili`,
  },
  {
    title: "Corriere Last-Mile",
    company: "BRT — BartoliniNow",
    city: "Napoli",
    country: "IT",
    category: "Logistica",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Tempo determinato",
    description: `BRT (Bartolini) cerca Corrieri per le consegne last-mile nelle province di Napoli e Caserta. Possibilità di proroga e stabilizzazione.

Cosa farei:
• Carico furgone al mattino presso il deposito
• Esecuzione del giro di consegne assegnato (60-90 fermate/giorno)
• Gestione mancate consegne e comunicazioni al cliente
• Restituzione degli insoluti a fine giornata

Requisiti:
• Patente B (almeno 2 anni)
• Conoscenza del territorio napoletano
• Smartphone Android (fornito dall'azienda)
• Massima affidabilità e discrezione

Condizioni:
• Orario: 07:30-17:30 con pausa pranzo
• Sabato mattina obbligatorio
• Mezzo aziendale fornito
• Carburante a carico BRT`,
  },

  // ─── RIDER ───
  {
    title: "Food Delivery Rider",
    company: "Glovo Italy",
    city: "Roma",
    country: "IT",
    category: "Rider",
    salaryMin: 1000,
    salaryMax: 1400,
    contractType: "Part-time",
    description: `Glovo Italia seleziona Rider per le consegne di cibo e prodotti nel centro di Roma. Lavora quando vuoi, guadagna subito.

Come funziona:
• Scegli i tuoi turni direttamente dall'app Glovo
• Ritira gli ordini dai ristoranti partner
• Consegna in bici, scooter o a piedi
• Guadagni per ogni consegna completata + incentivi

Guadagni medi:
• €6-€10 per consegna
• Bonus orari di punta (venerdì sera, weekend)
• Incentivi settimanali per numero di consegne
• Media mensile lavoratori attivi: €1.000-€1.400

Cosa ti serve:
• Bicicletta, monopattino o scooter (borsa termica fornita da Glovo)
• Smartphone con dati mobili
• Documenti in regola

Pagamenti ogni settimana tramite bonifico.`,
  },
  {
    title: "Rider Deliveroo — Part-time Flessibile",
    company: "Deliveroo Italia",
    city: "Torino",
    country: "IT",
    category: "Rider",
    salaryMin: 900,
    salaryMax: 1350,
    contractType: "Part-time",
    description: `Deliveroo Italia cerca Rider su due ruote (bici o scooter) per le consegne di cibo a Torino. Perfetto come lavoro principale o extra.

I vantaggi di lavorare con noi:
• Turni flessibili — decidi tu quando lavorare
• Pagamento ogni settimana (non ogni mese)
• Equipaggiamento gratuito: borsa termica + kit sicurezza
• Assicurazione infortuni inclusa durante le consegne
• App semplice e supporto H24

Fasce orarie più redditizie:
• Pranzo (12:00-14:30): bonus +20%
• Cena (19:00-22:30): bonus +30%
• Weekend tutto il giorno

Requisiti:
• Maggiore età
• Mezzo proprio (bici, e-bike o scooter)
• Smartphone (iOS o Android)
• Permesso di lavoro valido in Italia`,
  },

  // ─── RISTORANTE ───
  {
    title: "Crew Member — Cucina e Sala",
    company: "McDonald's Italia",
    city: "Milano",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1050,
    salaryMax: 1300,
    contractType: "Part-time",
    description: `McDonald's Italia cerca Crew Members per i ristoranti di Milano. Contratto part-time con possibilità di aumento ore. Nessuna esperienza richiesta.

Le tue attività:
• Preparazione dei prodotti secondo gli standard McDonald's
• Accoglienza e servizio ai clienti (cassa e sala)
• Mantenimento degli standard igienici (HACCP)
• Supporto nelle operazioni di apertura/chiusura

Cosa offriamo:
• Contratto CCNL Turismo e Pubblici Esercizi
• Turni flessibili adatti a studenti e lavoratori
• Formazione pagata dal primo giorno
• Pasto gratuito a ogni turno lavorato
• Possibilità di crescita: Crew Trainer → Manager

Requisiti:
• Nessuna esperienza necessaria (formiamo noi)
• Disponibilità nei weekend
• Buona comunicazione e lavoro di squadra`,
  },
  {
    title: "Cameriere/a di Sala",
    company: "Autogrill",
    city: "Bologna",
    country: "IT",
    category: "Ristorante",
    salaryMin: 1200,
    salaryMax: 1500,
    contractType: "Tempo indeterminato",
    description: `Autogrill Italia cerca Addetti di Sala e Banco per i punti di ristorazione sull'Autostrada A1 (area Bologna).

Le tue mansioni:
• Accoglienza clienti al banco e in sala
• Preparazione e somministrazione bevande (caffè, aperitivi, cocktail analcolici)
• Servizio ai tavoli durante l'orario di punta
• Gestione cassa e chiusura giornaliera

Orari:
• Turni a rotazione: mattina (05:30-13:30), pomeriggio (13:30-21:30)
• Disponibilità nei festivi richiesta

Requisiti:
• Esperienza minima 6 mesi in bar o ristorante
• Attestato HACCP valido (o disponibilità ad ottenerlo)
• Ottima presentazione e capacità comunicative
• Possesso di mezzo proprio (sede non raggiungibile con i mezzi)

Offriamo contratto a tempo indeterminato con 14 mensilità.`,
  },

  // ─── HOTEL ───
  {
    title: "Receptionist Front Desk",
    company: "Marriott Hotels Italia",
    city: "Roma",
    country: "IT",
    category: "Hotel",
    salaryMin: 1400,
    salaryMax: 1800,
    contractType: "Tempo indeterminato",
    description: `Marriott Hotels Italia seleziona un Receptionist per la struttura Rome Marriott Park Hotel (4 stelle - Roma Nord).

Responsabilità:
• Check-in e check-out ospiti italiani e internazionali
• Gestione prenotazioni (sistema Opera PMS)
• Risposta telefonica e gestione email in italiano e inglese
• Gestione reclami e richieste speciali degli ospiti
• Coordinamento con housekeeping e concierge

Requisiti:
• Diploma alberghiero o laurea in Turismo
• Inglese fluente (livello B2 minimo); seconda lingua gradita
• Esperienza minima 1 anno in hotel 4 o 5 stelle
• Conoscenza di Opera PMS (o sistema equivalente)
• Disponibilità a turni (mattina 07:00-15:00 / pomeriggio 15:00-23:00 / notte)

Offerta:
• Contratto CCNL Turismo - livello D2
• 14 mensilità + premi di produzione
• Accesso alle strutture Marriott con tariffe scontate`,
  },
  {
    title: "Addetto/a Housekeeping",
    company: "NH Hotels Italia",
    city: "Venezia",
    country: "IT",
    category: "Hotel",
    salaryMin: 1200,
    salaryMax: 1500,
    contractType: "Tempo determinato",
    description: `NH Hotels Italia (Grupo Minor Hotels) cerca Addetti/e al Housekeeping per gli hotel di Venezia Mestre e Venezia centro storico. Avvio immediato, stagione estiva con possibilità di rinnovo.

Attività principali:
• Pulizia e riordino delle camere secondo gli standard NH
• Cambio biancheria e allestimento dei letti
• Pulizia di bagni, aree comuni e corridoi
• Segnalazione guasti e oggetti dimenticati alla reception

Requisiti:
• Esperienza di almeno 6 mesi in housekeeping (hotel o residenze)
• Attenzione ai dettagli e velocità operativa
• Disponibilità al lavoro nei weekend e festivi
• Buona comprensione della lingua italiana

Offerta:
• Contratto stagionale (giugno-ottobre) con possibilità rinnovo
• Turni: 08:00-16:00 (con flessibilità)
• Mensa aziendale
• Trasporto da Mestre verso strutture veneziane`,
  },

  // ─── BADANTE ───
  {
    title: "Badante / Assistente Familiare",
    company: "Korian Italia",
    city: "Milano",
    country: "IT",
    category: "Badante",
    salaryMin: 1100,
    salaryMax: 1450,
    contractType: "Tempo indeterminato",
    description: `Korian Italia, leader europeo nell'assistenza agli anziani, cerca Assistenti Familiari (Badanti) per anziani autosufficienti e non autosufficienti nelle RSA e a domicilio di Milano e hinterland.

Mansioni:
• Assistenza personale (igiene, vestizione, alimentazione)
• Somministrazione terapia sotto supervisione infermieristica
• Compagnia, attività ricreative e passeggiate
• Tenuta in ordine dell'ambiente di vita dell'assistito

Requisiti:
• Qualifica OSS o esperienza comprovata come Assistente Familiare
• Empatia, pazienza e professionalità
• Disponibilità a turni diurni/notturni o convivenza
• Referenze verificabili

Offerta:
• Contratto regolare CCNL Cooperative Sociali
• Formazione continua finanziata da Korian
• Supporto psicologico per il personale
• Buoni pasto o mensa`,
  },

  // ─── EDILIZIA ───
  {
    title: "Operaio Edile Generico",
    company: "Webuild S.p.A.",
    city: "Genova",
    country: "IT",
    category: "Edilizia",
    salaryMin: 1500,
    salaryMax: 1900,
    contractType: "Tempo determinato",
    description: `Webuild S.p.A. (ex Salini Impregilo), uno dei maggiori gruppi mondiali nelle grandi opere, cerca Operai Edili per cantieri in Liguria.

Attività:
• Scavo e movimentazione terra
• Getti in calcestruzzo e armatura ferro
• Lavori di finitura e rifinitura
• Supporto ai tecnici e operatori specializzati

Requisiti:
• Esperienza di almeno 1 anno in cantiere
• Conoscenza delle norme di sicurezza sul lavoro (D.Lgs 81/08)
• Possesso di patente B
• Resistenza fisica e lavoro all'aperto

Documenti richiesti:
• Tesserino INAIL
• Attestato sicurezza cantieri (o disponibilità a formazione a carico azienda)

Offerta:
• CCNL Edilizia Industria
• Trasferte compensate
• DPI forniti dall'azienda
• Possibilità di assunzione a tempo indeterminato`,
  },
];

const EUROPE_JOBS = [
  {
    title: "Lagermitarbeiter (m/w/d)",
    company: "Amazon Deutschland",
    city: "München",
    country: "DE",
    category: "Magazzino",
    salaryMin: 1900,
    salaryMax: 2300,
    contractType: "Befristet",
    featured: true,
    description: `Amazon Deutschland sucht Lagermitarbeiter für das Logistikzentrum München. Keine Vorerfahrung nötig, Schulung wird gestellt.

Aufgaben:
• Wareneingang und Kommissionierung
• Verpackung und Versandvorbereitung
• Bedienung von Scannern

Anforderungen:
• Zuverlässigkeit und Teamfähigkeit
• Bereitschaft zu Schichtarbeit
• Gültige Arbeitserlaubnis in der EU

Wir bieten:
• Unbefristeter Vertrag möglich
• Übertarifliche Bezahlung
• Betriebskantine`,
  },
  {
    title: "Chauffeur Livreur",
    company: "DHL France",
    city: "Lyon",
    country: "FR",
    category: "Logistica",
    salaryMin: 1700,
    salaryMax: 2100,
    contractType: "CDI",
    description: `DHL France recrute des chauffeurs livreurs pour la région lyonnaise. Prise de poste immédiate.

Missions:
• Livraison de colis aux particuliers et entreprises
• Utilisation d'une application de tournée
• Encaissement et gestion des documents

Profil recherché:
• Permis B depuis au moins 2 ans
• Bonne connaissance de la région
• Ponctualité et sérieux

Nous offrons:
• CDI avec véhicule de service
• Carte carburant
• Primes de productivité`,
  },
  {
    title: "Operario de Almacén",
    company: "Mercadona",
    city: "Valencia",
    country: "ES",
    category: "Magazzino",
    salaryMin: 1500,
    salaryMax: 1800,
    contractType: "Contrato temporal",
    description: `Mercadona busca operarios de almacén para su centro logístico de Valencia. No se requiere experiencia previa.

Funciones:
• Recepción y clasificación de mercancía
• Preparación de pedidos
• Uso de transpaletas eléctricas

Requisitos:
• Disponibilidad para turnos rotativos
• Buena condición física
• Documentación en regla

Ofrecemos:
• Contrato con posibilidad de indefinido
• Comedor de empresa
• Plan de formación interno`,
  },
  {
    title: "Empregado de Mesa",
    company: "Grupo Pestana",
    city: "Lisboa",
    country: "PT",
    category: "Ristorante",
    salaryMin: 1100,
    salaryMax: 1400,
    contractType: "Tempo determinado",
    description: `Grupo Pestana procura Empregados de Mesa para hotéis em Lisboa. Época alta, possibilidade de renovação.

Funções:
• Atendimento e serviço à mesa
• Apoio na preparação de bebidas
• Manutenção da limpeza da sala

Requisitos:
• Experiência prévia em restauração (preferencial)
• Boa apresentação e simpatia
• Disponibilidade para fins de semana

Oferecemos:
• Alojamento disponível
• Refeições incluídas
• Gorjetas`,
  },
  {
    title: "Magazijnmedewerker",
    company: "Bol.com",
    city: "Rotterdam",
    country: "NL",
    category: "Magazzino",
    salaryMin: 1900,
    salaryMax: 2200,
    contractType: "Tijdelijk contract",
    description: `Bol.com zoekt magazijnmedewerkers voor het distributiecentrum in Rotterdam. Geen ervaring vereist.

Werkzaamheden:
• Orderpicken met een scanner
• In- en uitpakken van bestellingen
• Kwaliteitscontrole

Wat wij vragen:
• Flexibele beschikbaarheid
• Nauwkeurigheid
• Geldige werkvergunning

Wij bieden:
• Reiskostenvergoeding
• Personeelskorting
• Doorgroeimogelijkheden`,
  },
  {
    title: "Ouvrier Polyvalent Entrepôt",
    company: "Colruyt Group",
    city: "Bruxelles",
    country: "BE",
    category: "Magazzino",
    salaryMin: 1800,
    salaryMax: 2100,
    contractType: "CDI",
    description: `Colruyt Group recherche des ouvriers polyvalents pour son entrepôt de Bruxelles.

Tâches:
• Réception et stockage des marchandises
• Préparation des commandes
• Utilisation de transpalettes

Profil:
• Motivation et ponctualité
• Capacité à travailler en équipe
• Permis de travail valide en Belgique

Avantages:
• Salaire attractif selon CCT
• Chèques-repas
• Assurance groupe`,
  },
  {
    title: "Lagerhelfer",
    company: "Spar Österreich",
    city: "Wien",
    country: "AT",
    category: "Magazzino",
    salaryMin: 1700,
    salaryMax: 2000,
    contractType: "Vollzeit",
    description: `Spar Österreich sucht Lagerhelfer für den Standort Wien. Sofortiger Einstieg möglich.

Aufgaben:
• Warenannahme und -kontrolle
• Kommissionierung für Filialen
• Innerbetrieblicher Transport

Anforderungen:
• Körperliche Belastbarkeit
• Bereitschaft zu Schichtarbeit
• Deutschkenntnisse von Vorteil

Wir bieten:
• Kollektivvertragliche Bezahlung
• Mitarbeiterrabatt
• Fixe Anstellung`,
  },
  {
    title: "Aide de Cuisine",
    company: "Nestlé Suisse",
    city: "Genève",
    country: "CH",
    category: "Ristorante",
    salaryMin: 3200,
    salaryMax: 3800,
    contractType: "CDI",
    description: `Nestlé Suisse recherche un aide de cuisine pour son restaurant du personnel à Genève.

Missions:
• Préparation des plats du jour
• Entretien du poste de travail
• Respect des normes d'hygiène HACCP

Profil:
• Expérience en restauration collective appréciée
• Rapidité et sens de l'organisation
• Permis de travail suisse

Nous offrons:
• Salaire compétitif selon standards suisses
• Repas sur place
• Horaires réguliers`,
  },
  {
    title: "Warehouse Operative",
    company: "Tesco Distribution",
    city: "Manchester",
    country: "GB",
    category: "Magazzino",
    salaryMin: 1900,
    salaryMax: 2300,
    contractType: "Full-time",
    featured: true,
    description: `Tesco Distribution is hiring Warehouse Operatives for its Manchester depot. Immediate start available.

Responsibilities:
• Picking and packing orders
• Loading and unloading delivery vehicles
• Maintaining a safe, tidy work area

Requirements:
• Right to work in the UK
• Willingness to work shifts (including nights)
• Good physical fitness

We offer:
• Competitive hourly rate
• Staff discount
• Pension scheme`,
  },
  {
    title: "Pracownik Magazynu",
    company: "Amazon Polska",
    city: "Poznań",
    country: "PL",
    category: "Magazzino",
    salaryMin: 4200,
    salaryMax: 5000,
    contractType: "Umowa o pracę",
    description: `Amazon Polska poszukuje pracowników magazynu w Poznaniu. Brak wymaganego doświadczenia — pełne szkolenie na miejscu.

Zadania:
• Przyjmowanie i sortowanie towaru
• Kompletacja zamówień (picking)
• Pakowanie wysyłek

Wymagania:
• Dyspozycyjność zmianowa
• Dobra kondycja fizyczna
• Prawo do pracy w Polsce

Oferujemy:
• Stabilne zatrudnienie
• Dodatki za pracę w nocy
• Prywatną opiekę medyczną`,
  },
  {
    title: "Muncitor Necalificat Depozit",
    company: "Kaufland România",
    city: "Cluj-Napoca",
    country: "RO",
    category: "Magazzino",
    salaryMin: 2800,
    salaryMax: 3400,
    contractType: "Contract pe durată nedeterminată",
    description: `Kaufland România angajează muncitori pentru depozitul din Cluj-Napoca. Nu este necesară experiență.

Responsabilități:
• Recepția și sortarea mărfii
• Pregătirea comenzilor pentru magazine
• Utilizarea transpaletei manuale

Cerințe:
• Disponibilitate pentru muncă în ture
• Rezistență fizică
• Seriozitate

Oferim:
• Contract pe durată nedeterminată
• Tichete de masă
• Bonusuri de performanță`,
  },
  {
    title: "Skladový Pracovník",
    company: "Alza.cz",
    city: "Praha",
    country: "CZ",
    category: "Magazzino",
    salaryMin: 30000,
    salaryMax: 36000,
    contractType: "Hlavní pracovní poměr",
    description: `Alza.cz hledá skladové pracovníky pro distribuční centrum v Praze.

Náplň práce:
• Příjem a kompletace zboží
• Balení zásilek
• Práce se skenerem

Požadavky:
• Ochota pracovat na směny
• Fyzická zdatnost
• Pracovní povolení v ČR

Nabízíme:
• Stabilní zaměstnání
• Příspěvek na stravování
• Možnost kariérního růstu`,
  },
  {
    title: "Skladový Operátor",
    company: "Kaufland Slovensko",
    city: "Bratislava",
    country: "SK",
    category: "Magazzino",
    salaryMin: 950,
    salaryMax: 1150,
    contractType: "Pracovná zmluva",
    description: `Kaufland Slovensko prijíma skladových operátorov pre distribučné centrum v Bratislave.

Náplň práce:
• Príjem a triedenie tovaru
• Príprava objednávok pre predajne
• Manipulácia s tovarom pomocou paletového vozíka

Požiadavky:
• Ochota pracovať na zmeny
• Fyzická kondícia
• Platné pracovné povolenie

Ponúkame:
• Stabilnú prácu
• Stravné lístky
• Príplatky za nočné zmeny`,
  },
  {
    title: "Raktári Munkatárs",
    company: "Tesco Magyarország",
    city: "Budapest",
    country: "HU",
    category: "Magazzino",
    salaryMin: 320000,
    salaryMax: 380000,
    contractType: "Határozott idejű",
    description: `Tesco Magyarország raktári munkatársakat keres budapesti logisztikai központjába.

Feladatok:
• Áru fogadása és rendezése
• Rendelések összeállítása
• Targoncakezelés (betanítással)

Elvárások:
• Műszakos munkarend vállalása
• Jó fizikai állóképesség
• Munkavállalási engedély

Amit kínálunk:
• Versenyképes fizetés
• Munkásszálló lehetőség
• Cafeteria juttatás`,
  },
  {
    title: "Εργάτης Αποθήκης",
    company: "Sklavenitis",
    city: "Αθήνα",
    country: "GR",
    category: "Magazzino",
    salaryMin: 900,
    salaryMax: 1100,
    contractType: "Πλήρης απασχόληση",
    description: `Η Sklavenitis αναζητά εργάτες αποθήκης για το κέντρο διανομής της Αθήνας.

Καθήκοντα:
• Παραλαβή και ταξινόμηση εμπορευμάτων
• Προετοιμασία παραγγελιών για τα καταστήματα
• Χρήση παλετοφόρου

Προσόντα:
• Διαθεσιμότητα για βάρδιες
• Καλή φυσική κατάσταση
• Άδεια εργασίας εντός ΕΕ

Προσφέρουμε:
• Σταθερή απασχόληση
• Επίδομα βάρδιας
• Δυνατότητα εξέλιξης`,
  },
  {
    title: "Radnik u Skladištu",
    company: "Konzum",
    city: "Zagreb",
    country: "HR",
    category: "Magazzino",
    salaryMin: 900,
    salaryMax: 1100,
    contractType: "Ugovor na neodređeno",
    description: `Konzum traži radnike u skladištu za distribucijski centar u Zagrebu.

Poslovi:
• Zaprimanje i razvrstavanje robe
• Priprema narudžbi za poslovnice
• Rad ručnim paletnim kolicima

Uvjeti:
• Spremnost na rad u smjenama
• Dobra fizička kondicija
• Radna dozvola u EU

Nudimo:
• Stalno zaposlenje
• Naknadu za noćni rad
• Mogućnost napredovanja`,
  },
  {
    title: "Работник в Склад",
    company: "Kaufland България",
    city: "София",
    country: "BG",
    category: "Magazzino",
    salaryMin: 1400,
    salaryMax: 1700,
    contractType: "Постоянен трудов договор",
    description: `Kaufland България търси работници за склад в София. Не се изисква опит.

Задължения:
• Приемане и подреждане на стоки
• Подготовка на поръчки за магазините
• Работа с ръчна количка

Изисквания:
• Готовност за работа на смени
• Добра физическа форма
• Разрешение за работа в ЕС

Предлагаме:
• Постоянна работа
• Бонуси за нощен труд
• Ваучери за храна`,
  },
  {
    title: "Радник у Складишту",
    company: "Delhaize Srbija",
    city: "Beograd",
    country: "RS",
    category: "Magazzino",
    salaryMin: 65000,
    salaryMax: 80000,
    contractType: "Ugovor na neodređeno vreme",
    description: `Delhaize Srbija traži radnike u skladištu za distributivni centar u Beogradu.

Poslovi:
• Prijem i sortiranje robe
• Priprema porudžbina
• Rukovanje paletnim transporterom

Uslovi:
• Spremnost za rad u smenama
• Fizička spremnost
• Radna dozvola

Nudimo:
• Stalno zaposlenje
• Prevoz obezbeđen
• Bonusi za produktivnost`,
  },
  {
    title: "Робітник Складу",
    company: "Nova Poshta",
    city: "Львів",
    country: "UA",
    category: "Logistica",
    salaryMin: 18000,
    salaryMax: 22000,
    contractType: "Постійна робота",
    description: `Nova Poshta шукає робітників складу для відділення у Львові.

Обов'язки:
• Прийом і сортування посилок
• Підготовка відправлень
• Робота зі скануючим обладнанням

Вимоги:
• Готовність до змінного графіку
• Фізична витривалість
• Відповідальність

Пропонуємо:
• Стабільну заробітну плату
• Офіційне оформлення
• Можливість кар'єрного росту`,
  },
  {
    title: "საწყობის მუშაკი",
    company: "Carrefour Georgia",
    city: "თბილისი",
    country: "GE",
    category: "Magazzino",
    salaryMin: 900,
    salaryMax: 1200,
    contractType: "მუდმივი კონტრაქტი",
    description: `Carrefour Georgia ეძებს საწყობის მუშაკებს თბილისის დისტრიბუციის ცენტრში.

მოვალეობები:
• საქონლის მიღება და დახარისხება
• შეკვეთების მომზადება
• ხელით ურიკის გამოყენება

მოთხოვნები:
• ცვლებში მუშაობის მზაობა
• ფიზიკური გამძლეობა
• სამუშაო ნებართვა

ჩვენ ვთავაზობთ:
• სტაბილურ დასაქმებას
• ბონუსებს ღამის ცვლისთვის
• კვების ვაუჩერებს`,
  },
  {
    title: "Depo Elemanı",
    company: "Migros Türkiye",
    city: "İstanbul",
    country: "TR",
    category: "Magazzino",
    salaryMin: 22000,
    salaryMax: 27000,
    contractType: "Belirsiz süreli",
    description: `Migros Türkiye, İstanbul dağıtım merkezi için depo elemanı arıyor. Tecrübe şartı yoktur.

Görevler:
• Ürün kabul ve sınıflandırma
• Sipariş hazırlama
• El paleti kullanımı

Gereksinimler:
• Vardiyalı çalışmaya uygunluk
• İyi fiziksel kondisyon
• Çalışma izni

Sunduklarımız:
• Belirsiz süreli sözleşme
• Yemek kartı
• Servis imkânı`,
  },
  {
    title: "Punëtor Depoje",
    company: "Spar Albania",
    city: "Tiranë",
    country: "AL",
    category: "Magazzino",
    salaryMin: 45000,
    salaryMax: 55000,
    contractType: "Kontratë e përhershme",
    description: `Spar Albania kërkon punëtorë depoje për qendrën e shpërndarjes në Tiranë.

Detyrat:
• Pranimi dhe klasifikimi i mallrave
• Përgatitja e porosive për dyqanet
• Përdorimi i karrocës dore

Kërkesat:
• Gatishmëri për punë me turne
• Kusht fizik i mirë
• Leje pune

Ofrojmë:
• Kontratë të përhershme
• Bonuse për turnin e natës
• Ushqim gjatë punës`,
  },
];

const ALL_JOBS = [...REAL_JOBS, ...EUROPE_JOBS];

async function seedJobs() {
  try {
    console.log("🗑️  Eliminazione annunci di esempio...");
    await db.delete(jobsTable).where(gte(jobsTable.id, 1));
    console.log("✓ Annunci eliminati");

    console.log("\n📥 Inserimento annunci reali...");
    for (const job of ALL_JOBS) {
      await db.insert(jobsTable).values(job as any);
      console.log(`  ✓ ${job.title} — ${job.company} (${job.city}, ${job.country})`);
    }

    console.log(`\n✅ Inseriti ${ALL_JOBS.length} annunci reali in ${new Set(ALL_JOBS.map(j => j.country)).size} paesi!`);
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Errore:", err.message);
    process.exit(1);
  }
}

seedJobs();
