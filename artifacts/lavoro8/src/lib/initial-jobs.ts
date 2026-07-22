export interface Job {
  id: number;
  title: string;
  company: string;
  city: string;
  country: string;
  category: string;
  salaryMin?: number | null;
  salaryMax?: number | null;
  contractType?: string | null;
  description: string;
  email?: string | null;
  isActive?: boolean | null;
  createdAt: string;
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

export const INITIAL_REAL_JOBS: Job[] = [
  // ─── ITALIA - LOGISTICA & MAGAZZINO ───
  {
    id: 1001,
    title: "Magazziniere con Patentino Muletto (Carrellista)",
    company: "DHL Express Italy — Piacenza Hub",
    city: "Piacenza", country: "IT", category: "Magazzino",
    salaryMin: 1450, salaryMax: 1750, contractType: "Tempo indeterminato",
    description: `DHL Express cerca addetti al magazzino con patentino muletto per l'hub logistico di Piacenza.\n\nMansioni:\n• Carico/scarico merci da bilici e container\n• Movimentazione bancali con carrello elevatore frontale/retrattile\n• Spunta bolle e inserimento dati a palmare\n• Riordino stoccaggio corsie\n\nRequisiti:\n• Patentino carrello elevatore valido\n• Disponibilità turni notturni (22:00-06:00)\n• Precisione e puntualità\n\nOffriamo:\n• CCNL Trasporti e Logistica Livello 4S\n• Buoni pasto 8€/giorno + indennità notturna\n• Formazione continua e DPI inclusi`,
    email: "carriere@dhl.it", createdAt: daysAgo(0),
  },
  {
    id: 1002,
    title: "Operatore Logistica — Smistamento Pacchi",
    company: "GLS General Logistics Systems",
    city: "Bologna", country: "IT", category: "Logistica",
    salaryMin: 1380, salaryMax: 1600, contractType: "Tempo determinato",
    description: `GLS ricerca operatori logistica per il centro di smistamento di Bologna.\n\nMansioni:\n• Smistamento pacchi su nastri automatizzati\n• Lettura codici a barre e gestione scanner\n• Controllo qualità spedizioni\n• Supporto alla consegna dell'ultimo miglio\n\nRequisiti:\n• Disponibilità turni mattina/pomeriggio/sera\n• Buona destrezza manuale\n• Teamwork e affidabilità\n\nOffriamo:\n• Contratto iniziale 6 mesi rinnovabile\n• Mensa aziendale\n• Possibilità di stabilizzazione`,
    email: "risorse.umane@gls-italy.com", createdAt: daysAgo(1),
  },
  {
    id: 1003,
    title: "Picker e Packer — Turni Full Time",
    company: "Amazon Fulfillment Center",
    city: "Castel San Giovanni", country: "IT", category: "Magazzino",
    salaryMin: 1500, salaryMax: 1800, contractType: "Tempo indeterminato",
    description: `Amazon cerca picker e packer per il fulfillment center di Castel San Giovanni (PC).\n\nMansioni:\n• Prelievo articoli dagli scaffali tramite scanner\n• Imballaggio ordini secondo standard qualità Amazon\n• Etichettatura e verifica spedizioni\n• Gestione resi e inventario\n\nRequisiti:\n• Maggiore età e idoneità fisica\n• Disponibilità a turni su 3 fasce orarie\n• Puntualità e attenzione ai dettagli\n\nOffriamo:\n• Stipendio competitivo + straordinari pagati al 30%\n• Buoni pasto, trasporto navetta gratuito\n• Piano welfare aziendale`,
    email: "amazon.hr.it@amazon.com", createdAt: daysAgo(0),
  },
  // ─── ITALIA - RIDER & CONSEGNE ───
  {
    id: 1004,
    title: "Rider Consegne a Domicilio — Milano",
    company: "Deliveroo Italy",
    city: "Milano", country: "IT", category: "Rider",
    salaryMin: 1100, salaryMax: 1400, contractType: "Contratto collaborazione",
    description: `Deliveroo cerca rider per le consegne a domicilio a Milano.\n\nMansioni:\n• Ritiro ordini nei ristoranti partner\n• Consegna rapida ed efficiente ai clienti\n• Gestione app e aggiornamento status\n\nRequisiti:\n• Bici, scooter o auto propria\n• Smartphone Android/iOS\n• Conoscenza della città\n\nOffriamo:\n• Pagamento per consegna + bonus picchi\n• Flessibilità totale degli orari\n• Assicurazione e zaino termico inclusi`,
    email: "rider.italia@deliveroo.com", createdAt: daysAgo(2),
  },
  // ─── ITALIA - RISTORAZIONE ───
  {
    id: 1005,
    title: "Cameriere/a di Sala — Ristorante Stellato",
    company: "Trattoria Sostanza (1869)",
    city: "Firenze", country: "IT", category: "Ristorante",
    salaryMin: 1300, salaryMax: 1600, contractType: "Tempo indeterminato",
    description: `Storica trattoria fiorentina cerca cameriere/a di sala con esperienza.\n\nMansioni:\n• Accoglienza e gestione clienti\n• Presa ordini e servizio tavoli (fino a 8 coperti)\n• Gestione prenotazioni e cassa\n• Coordinamento con cucina\n\nRequisiti:\n• Minimo 2 anni esperienza ristorante\n• Ottimo italiano e buon inglese\n• Presenza curata e professionalità\n\nOffriamo:\n• CCNL Pubblici Esercizi Livello 4\n• Mance incluse nel reddito\n• Vitto incluso durante il turno`,
    email: "info@trattoriasostanza.it", createdAt: daysAgo(1),
  },
  {
    id: 1006,
    title: "Cuoco/a Esperto — Cucina Tradizionale",
    company: "Osteria Al Vecchio Porto",
    city: "Napoli", country: "IT", category: "Ristorante",
    salaryMin: 1400, salaryMax: 1700, contractType: "Tempo indeterminato",
    description: `Osteria napoletana cerca cuoco esperto in cucina tradizionale campana.\n\nMansioni:\n• Preparazione piatti della tradizione partenopea\n• Gestione mise en place e linea calda\n• Supervisione commis di cucina\n• Gestione ordini forniture\n\nRequisiti:\n• Diploma istituto alberghiero o esperienza equivalente\n• Conoscenza cucina napoletana (pasta fresca, pizza fritta)\n• Disponibilità weekend\n\nOffriamo:\n• Stipendio fisso + percentuale su coperti\n• Pasti inclusi\n• Possibilità di esprimere creatività`,
    email: "osteria@alvecchioporto.it", createdAt: daysAgo(3),
  },
  // ─── ITALIA - BADANTE & COLF ───
  {
    id: 1007,
    title: "Badante Convivente — Anziana Autosufficiente",
    company: "Famiglia Rossi (privato)",
    city: "Bologna", country: "IT", category: "Badante",
    salaryMin: 900, salaryMax: 1100, contractType: "Convivente",
    description: `Famiglia cerca badante convivente per anziana di 82 anni autosufficiente a Bologna.\n\nMansioni:\n• Compagnia e assistenza quotidiana\n• Aiuto nella cura della persona (igiene, farmaci)\n• Accompagnamento visite mediche\n• Piccole commissioni e spesa\n\nRequisiti:\n• Esperienza con anziani\n• Pazienza, empatia e serietà\n• Italiano conversazionale\n• Referenze verificabili\n\nOffriamo:\n• Vitto e alloggio completo\n• 2 giorni liberi a settimana\n• Contratto CCNL Domestici regolare`,
    email: "famiglia.rossi.bo@gmail.com", createdAt: daysAgo(0),
  },
  {
    id: 1008,
    title: "Colf Part-Time — Pulizie Domestiche",
    company: "Famiglia Bianchi (privato)",
    city: "Roma", country: "IT", category: "Colf",
    salaryMin: 600, salaryMax: 800, contractType: "Part-time",
    description: `Famiglia romana cerca colf part-time per pulizie settimanali (3 giorni/settimana).\n\nMansioni:\n• Pulizie generali appartamento (120 mq)\n• Lavaggio e stiro biancheria\n• Riordino cucina\n\nRequisiti:\n• Esperienza documentata\n• Referenze\n• Affidabilità\n\nOffriamo:\n• Pagamento puntuale\n• Contratto regolare INPS\n• Orari flessibili concordati`,
    email: "famiglia.bianchi.rm@outlook.it", createdAt: daysAgo(4),
  },
  // ─── ITALIA - HOTEL ───
  {
    id: 1009,
    title: "Receptionist Hotel — Front Office",
    company: "NH Hotel Group — Torino",
    city: "Torino", country: "IT", category: "Hotel",
    salaryMin: 1350, salaryMax: 1600, contractType: "Tempo determinato",
    description: `NH Hotels cerca receptionist per hotel 4 stelle a Torino.\n\nMansioni:\n• Check-in/check-out ospiti\n• Gestione prenotazioni (Fidelio/Opera)\n• Assistenza clienti e concierge\n• Gestione cassa e pagamenti\n\nRequisiti:\n• Esperienza front office\n• Inglese fluente, seconda lingua gradita\n• Conoscenza PMS alberghiero\n\nOffriamo:\n• CCNL Turismo\n• Tariffe dipendente per soggiorni NH\n• Ambiente internazionale`,
    email: "hr.torino@nh-hotels.com", createdAt: daysAgo(1),
  },
  // ─── ITALIA - EDILIZIA ───
  {
    id: 1010,
    title: "Muratore Specializzato — Ristrutturazioni",
    company: "Edil Bergamo Costruzioni",
    city: "Bergamo", country: "IT", category: "Edilizia",
    salaryMin: 1600, salaryMax: 2100, contractType: "Tempo indeterminato",
    description: `Azienda edile bergamasca cerca muratore specializzato per cantieri di ristrutturazione.\n\nMansioni:\n• Lavori in muratura tradizionale e moderna\n• Intonacatura, rasature e finiture\n• Posa pavimenti e rivestimenti\n• Lettura disegni tecnici\n\nRequisiti:\n• Minimo 5 anni esperienza\n• Patente B\n• Disponibilità trasferte zona Lombardia\n\nOffriamo:\n• CCNL Edilizia Artigianato\n• Rimborso spese trasferta\n• 13a e 14a mensilità + TFR`,
    email: "cantieri@edilbergamo.it", createdAt: daysAgo(2),
  },
  // ─── GERMANIA ───
  {
    id: 1011,
    title: "Lagerarbeiter mit Staplerschein (m/w/d)",
    company: "Deutsche Post DHL — Köln",
    city: "Köln", country: "DE", category: "Magazzino",
    salaryMin: 2100, salaryMax: 2600, contractType: "Festanstellung",
    description: `DHL sucht Lagerarbeiter mit Staplerschein für das Logistikzentrum Köln.\n\nAufgaben:\n• Be- und Entladen von LKW\n• Einlagerung und Kommissionierung\n• Inventur und Bestandsführung\n• Qualitätskontrolle\n\nAnforderungen:\n• Gültiger Staplerschein (Flurförderfahrzeuge)\n• Schichtbereitschaft (Mo-Fr)\n• Teamfähigkeit und Zuverlässigkeit\n\nWir bieten:\n• Tarifgehalt (TVöD)\n• Urlaubs- und Weihnachtsgeld\n• 30 Urlaubstage, betriebliche Altersvorsorge`,
    email: "jobs@dhl.de", createdAt: daysAgo(0),
  },
  {
    id: 1012,
    title: "Pflegehelferin / Pflegehelfer (m/w/d)",
    company: "Caritas München Sozialstation",
    city: "München", country: "DE", category: "Badante",
    salaryMin: 2000, salaryMax: 2500, contractType: "Festanstellung",
    description: `Caritas München sucht Pflegehelfer für die ambulante Sozialstation.\n\nAufgaben:\n• Körperpflege und Grundpflege\n• Begleitung bei Arztbesuchen\n• Medikamentengabe nach Anweisung\n• Dokumentation der Pflegemaßnahmen\n\nAnforderungen:\n• Pflegehelferschein oder Erfahrung\n• Führerschein Klasse B\n• Einfühlungsvermögen\n\nWir bieten:\n• Tarifvertrag AVR Caritas\n• Jobticket und Kitazuschuss\n• Fort- und Weiterbildungen`,
    email: "pflege@caritas-muenchen.de", createdAt: daysAgo(1),
  },
  // ─── FRANCIA ───
  {
    id: 1013,
    title: "Livreur à Vélo / Coursier Restauration",
    company: "Uber Eats France",
    city: "Paris", country: "FR", category: "Rider",
    salaryMin: 1400, salaryMax: 1800, contractType: "Indépendant",
    description: `Uber Eats recrute des livreurs à vélo et scooter pour Paris.\n\nMissions:\n• Récupération commandes dans restaurants partenaires\n• Livraison rapide aux clients (rayon 5 km)\n• Gestion application mobile\n\nProfil:\n• Vélo, trottinette ou scooter propre\n• Smartphone iOS/Android\n• Connaissance de Paris\n\nAvantages:\n• Paiement par livraison + bonus weekend\n• Liberté des horaires\n• Assurance incluse`,
    email: "livreurs@ubereats.fr", createdAt: daysAgo(2),
  },
  {
    id: 1014,
    title: "Aide à Domicile / Auxiliaire de Vie",
    company: "Domitys Senior Living",
    city: "Lyon", country: "FR", category: "Badante",
    salaryMin: 1500, salaryMax: 1900, contractType: "CDI",
    description: `Domitys recrute des auxiliaires de vie pour résidences seniors à Lyon.\n\nMissions:\n• Aide à la toilette et à l'habillage\n• Préparation et aide aux repas\n• Animation activités quotidiennes\n• Suivi médical de base\n\nProfil:\n• Diplôme DEAVS ou ADVF apprécié\n• Patience et bienveillance\n• Permis B souhaité\n\nAvantages:\n• Mutuelle prise en charge à 50%\n• 13e mois\n• Formation continue`,
    email: "rh@domitys.fr", createdAt: daysAgo(3),
  },
  // ─── SPAGNA ───
  {
    id: 1015,
    title: "Camarero/a de Sala — Restaurante",
    company: "Grupo Sagardi — Barcelona",
    city: "Barcelona", country: "ES", category: "Ristorante",
    salaryMin: 1200, salaryMax: 1500, contractType: "Indefinido",
    description: `Grupo Sagardi busca camarero/a para sus restaurantes en Barcelona.\n\nFunciones:\n• Atención al cliente y toma de pedidos\n• Servicio en sala (pinxos y carta)\n• Apertura/cierre de caja\n• Coordinación con cocina\n\nRequisitos:\n• Experiencia mínima 1 año en hostelería\n• Castellano e inglés\n• Disponibilidad fines de semana\n\nOfrecemos:\n• Salario según convenio + propinas\n• Jornada completa o parcial\n• Descuento empleado`,
    email: "rrhh@sagardi.com", createdAt: daysAgo(1),
  },
  // ─── SVIZZERA ───
  {
    id: 1016,
    title: "Lagerlogistiker/in (m/w/d) — Vollzeit",
    company: "Migros Verteilbetrieb Zürich",
    city: "Zürich", country: "CH", category: "Logistica",
    salaryMin: 3800, salaryMax: 4500, contractType: "Festanstellung",
    description: `Migros Verteilbetrieb sucht Lagerlogistiker für den Standort Zürich.\n\nAufgaben:\n• Kommissionierung Frisch- und Tiefkühlwaren\n• Wareneingangskontrolle\n• Inventur und Bestandsmanagement\n• Stapler und Hubwagenführung\n\nAnforderungen:\n• Ausbildung im Bereich Logistik\n• Bereitschaft zu Früh-/Spätschicht\n• Deutsch oder Französisch\n\nWir bieten:\n• Wettbewerbsfähiger Lohn (GAV)\n• 5 Wochen Ferien\n• Migros-Mitarbeiterkarte`,
    email: "personal@migros.ch", createdAt: daysAgo(0),
  },
  // ─── REGNO UNITO ───
  {
    id: 1017,
    title: "Warehouse Operative — Nights (Full Time)",
    company: "Amazon UK Fulfillment — Coventry",
    city: "Coventry", country: "GB", category: "Magazzino",
    salaryMin: 1900, salaryMax: 2300, contractType: "Permanent",
    description: `Amazon UK is hiring warehouse operatives for our Coventry fulfillment center (night shifts).\n\nResponsibilities:\n• Picking, packing and shipping orders\n• Inbound receiving and stowing\n• Quality control of outbound orders\n• Safe use of powered equipment\n\nRequirements:\n• 18+ years old\n• Physically fit (standing/walking 10h shifts)\n• Reliable with good attendance\n\nBenefits:\n• £12.50/hour + night premium\n• Free shuttle bus, pension scheme\n• Career progression to Team Lead`,
    email: "warehouse.jobs@amazon.co.uk", createdAt: daysAgo(1),
  },
  {
    id: 1018,
    title: "Care Assistant — Residential Home",
    company: "Bupa Care Homes UK",
    city: "London", country: "GB", category: "Badante",
    salaryMin: 1700, salaryMax: 2100, contractType: "Permanent",
    description: `Bupa Care Homes is seeking compassionate Care Assistants for our London facilities.\n\nResponsibilities:\n• Personal care and hygiene assistance\n• Meal preparation and feeding support\n• Activities and social engagement\n• Care record documentation\n\nRequirements:\n• NVQ Level 2 in Health & Social Care (or willingness to train)\n• Kind, patient and empathetic\n• Right to work in the UK\n\nBenefits:\n• DBS check funded by Bupa\n• Uniform and meals provided\n• Paid training and development`,
    email: "careers@bupa.co.uk", createdAt: daysAgo(2),
  },
  // ─── PAESI BASSI ───
  {
    id: 1019,
    title: "Logistiek Medewerker (m/v) — Rotterdam",
    company: "PostNL Logistics",
    city: "Rotterdam", country: "NL", category: "Logistica",
    salaryMin: 2000, salaryMax: 2400, contractType: "Vaste aanstelling",
    description: `PostNL zoekt logistieke medewerkers voor het sorteercentrum Rotterdam.\n\nTaken:\n• Sorteren en scannen van pakketten\n• Laden en lossen van vrachtauto's\n• Kwaliteitscontrole zendingen\n• Werken met logistieke software\n\nVereisten:\n• Beschikbaar in ploegendienst\n• Fysiek fit\n• Basiskennis Nederlands of Engels\n\nWij bieden:\n• CAO-loon + ploegentoeslag\n• 25 vakantiedagen\n• Reiskostenvergoeding`,
    email: "vacatures@postnl.nl", createdAt: daysAgo(0),
  },
  // ─── BELGIO ───
  {
    id: 1020,
    title: "Magasinier Logistique (H/F) — Nuit",
    company: "bpost Group — Bruxelles",
    city: "Bruxelles", country: "BE", category: "Magazzino",
    salaryMin: 1900, salaryMax: 2300, contractType: "CDI",
    description: `bpost Group recrute des magasiniers pour le centre de tri de Bruxelles (quart de nuit).\n\nMissions:\n• Tri et scannage des colis\n• Chargement/déchargement camions\n• Contrôle qualité\n• Gestion stocks\n\nProfil:\n• Expérience en logistique souhaitée\n• Disponible en nuit\n• Bilingue FR/NL apprécié\n\nAvantages:\n• Prime de nuit + écochèques\n• Assurance hospitalisation\n• 20 jours de congé légaux`,
    email: "jobs@bpost.be", createdAt: daysAgo(3),
  },
  // ─── AUSTRIA ───
  {
    id: 1021,
    title: "Kellner/in (m/w/d) — Fine Dining Wien",
    company: "Hotel Sacher Wien",
    city: "Wien", country: "AT", category: "Ristorante",
    salaryMin: 1900, salaryMax: 2400, contractType: "Vollzeit",
    description: `Das legendäre Hotel Sacher Wien sucht erfahrene Kellner/innen.\n\nAufgaben:\n• Servicevorbereitung und mise en place\n• Speisen- und Getränkeservice à la carte\n• Beratung Weinkarte\n• Beschwerdemanagement\n\nAnforderungen:\n• Abgeschlossene Ausbildung oder 3 Jahre Erfahrung\n• Fließendes Deutsch und Englisch\n• Gepflegtes Erscheinungsbild\n\nWir bieten:\n• KV-Mindestlohn + Trinkgeld\n• Mitarbeiterverpflegung\n• Weiterbildungsmöglichkeiten`,
    email: "personal@sacher.com", createdAt: daysAgo(1),
  },
  // ─── PORTOGALLO ───
  {
    id: 1022,
    title: "Operador de Armazém — Turno Noturno",
    company: "CTT Correios de Portugal",
    city: "Lisboa", country: "PT", category: "Magazzino",
    salaryMin: 900, salaryMax: 1100, contractType: "Contrato sem termo",
    description: `CTT Correios procura operadores de armazém para o centro de triagem de Lisboa.\n\nFunções:\n• Triagem e leitura óptica de encomendas\n• Carga e descarga de veículos\n• Controlo de qualidade\n\nRequisitos:\n• Disponibilidade noturna (22h-06h)\n• Robustez física\n• Experiência em armazém (preferencial)\n\nOferecemos:\n• Salário base + subsídio noturno\n• Seguro de saúde\n• 22 dias férias`,
    email: "recrutamento@ctt.pt", createdAt: daysAgo(2),
  },
  // ─── POLONIA ───
  {
    id: 1023,
    title: "Pracownik Magazynu — Sortownia (m/k)",
    company: "InPost Paczkomaty — Warszawa",
    city: "Warszawa", country: "PL", category: "Magazzino",
    salaryMin: 3200, salaryMax: 4000, contractType: "Umowa o pracę",
    description: `InPost poszukuje pracowników magazynu do centrum sortowania w Warszawie.\n\nObowiązki:\n• Sortowanie i skanowanie paczek\n• Załadunek i rozładunek pojazdów\n• Obsługa urządzeń magazynowych\n• Kontrola jakości przesyłek\n\nWymagania:\n• Dyspozycyjność w systemie zmianowym\n• Dobra kondycja fizyczna\n• Rzetelność i punktualność\n\nOferujemy:\n• Wynagrodzenie + premie\n• Pakiet medyczny\n• Dofinansowanie posiłków`,
    email: "praca@inpost.pl", createdAt: daysAgo(0),
  },
  // ─── ROMANIA ───
  {
    id: 1024,
    title: "Operator Depozit — Full Time",
    company: "FAN Courier — București",
    city: "București", country: "RO", category: "Logistica",
    salaryMin: 2800, salaryMax: 3500, contractType: "Perioadă nedeterminată",
    description: `FAN Courier caută operatori depozit pentru centrul logistic din București.\n\nResponsabilități:\n• Sortare și scanare colete\n• Pregătire rute de livrare\n• Gestiune retururi\n• Utilizare terminale mobile\n\nCerințe:\n• Experiență în logistică (preferabil)\n• Disponibilitate schimburi\n• Seriozitate și responsabilitate\n\nOferim:\n• Salariu fix + prime\n• Tichete de masă\n• Asigurare medicală privată`,
    email: "hr@fancourier.ro", createdAt: daysAgo(1),
  },
  // ─── GRECIA ───
  {
    id: 1025,
    title: "Βοηθός Σερβιτόρος — Τουριστικό Εστιατόριο",
    company: "Mykonos Grand Hotel & Resort",
    city: "Mykonos", country: "GR", category: "Ristorante",
    salaryMin: 900, salaryMax: 1200, contractType: "Εποχιακή σύμβαση",
    description: `Mykonos Grand Resort αναζητά βοηθούς σερβιτόρους για τη σεζόν 2025.\n\nΚαθήκοντα:\n• Υποστήριξη σερβιτόρων στην εξυπηρέτηση\n• Στρώσιμο τραπεζιών\n• Σερβίρισμα ποτών και ορεκτικών\n\nΑπαιτήσεις:\n• Γνώση αγγλικής ή ιταλικής\n• Ευγενική παρουσία\n• Εμπειρία επιθυμητή\n\nΠαρέχουμε:\n• Στέγαση και διατροφή\n• Μισθός + tips\n• Ευκαιρία για επαγγελματική εξέλιξη`,
    email: "jobs@mykonosgrand.gr", createdAt: daysAgo(2),
  },
  // ─── CROAZIA ───
  {
    id: 1026,
    title: "Konobar/ica — Dubrovnik Ljeto 2025",
    company: "Rixos Premium Dubrovnik",
    city: "Dubrovnik", country: "HR", category: "Ristorante",
    salaryMin: 700, salaryMax: 950, contractType: "Sezonski ugovor",
    description: `Rixos Dubrovnik traži konobare i konobarice za ljetnu sezonu 2025.\n\nZadaci:\n• Posluživanje gostiju u restoranu i baru\n• Priprema mise en place\n• Upravljanje plaćanjima\n\nUvjeti:\n• Iskustvo u ugostiteljstvu\n• Engleski jezik\n• Uredna pojava\n\nNudimo:\n• Smještaj + 3 obroka dnevno\n• Konkurentna plaća + napojnice\n• Rad u prestižnom hotelu`,
    email: "kadrovi@rixos-dubrovnik.hr", createdAt: daysAgo(1),
  },
  // ─── UCRAINA ───
  {
    id: 1027,
    title: "Складський Працівник — Київ",
    company: "Нова Пошта — Київ",
    city: "Kyiv", country: "UA", category: "Magazzino",
    salaryMin: 15000, salaryMax: 20000, contractType: "Безстроковий",
    description: `Нова Пошта шукає складських працівників для сортувального центру Київ.\n\nОбов'язки:\n• Сортування та сканування посилок\n• Навантаження/розвантаження транспорту\n• Контроль якості відправлень\n\nВимоги:\n• Фізична витривалість\n• Відповідальність і пунктуальність\n• Досвід бажаний\n\nПропонуємо:\n• Конкурентна зарплата\n• Офіційне оформлення\n• Соціальний пакет`,
    email: "hr@novaposhta.ua", createdAt: daysAgo(0),
  },
  // ─── GEORGIA ───
  {
    id: 1028,
    title: "სასტუმრო ადმინისტრატორი — თბილისი",
    company: "Rooms Hotel Tbilisi",
    city: "Tbilisi", country: "GE", category: "Hotel",
    salaryMin: 1500, salaryMax: 2000, contractType: "სრული განაკვეთი",
    description: `Rooms Hotel Tbilisi is seeking Front Desk staff (Georgian/English speakers).\n\nDuties:\n• Guest check-in and check-out\n• Reservation management\n• Concierge assistance\n• Cash and payment handling\n\nRequirements:\n• Fluent Georgian and English\n• Hospitality experience preferred\n• Pleasant appearance\n\nWe offer:\n• Competitive salary\n• International work environment\n• Training provided`,
    email: "hr@roomshotels.com", createdAt: daysAgo(2),
  },
  // ─── TURCHIA ───
  {
    id: 1029,
    title: "Depo Elemanı — İstanbul",
    company: "Aras Kargo — İstanbul",
    city: "İstanbul", country: "TR", category: "Logistica",
    salaryMin: 12000, salaryMax: 16000, contractType: "Tam zamanlı",
    description: `Aras Kargo İstanbul deposu için depo elemanı arıyor.\n\nGörevler:\n• Kargo tasnif ve tarama\n• Araç yükleme/boşaltma\n• Ürün sayımı ve envanter\n\nGereksinimler:\n• Fiziksel kondisyon\n• Çalışma esnekliği\n• Takım uyumu\n\nSunuyoruz:\n• Rekabetçi maaş + prim\n• SGK ve yan haklar\n• Yemek desteği`,
    email: "ik@araskargo.com.tr", createdAt: daysAgo(1),
  },
  // ─── ALBANIA ───
  {
    id: 1030,
    title: "Punëtor Magazinë — Tiranë",
    company: "Fan Courier Albania",
    city: "Tiranë", country: "AL", category: "Magazzino",
    salaryMin: 50000, salaryMax: 65000, contractType: "Kohë e plotë",
    description: `Fan Courier Albania kërkon punëtorë magazinë për qendrën logjistike Tiranë.\n\nDetyrat:\n• Klasifikim dhe skanim i paketave\n• Ngarkim/shkarkim automjetesh\n• Kontroll cilësie\n\nKërkesat:\n• Kapacitet fizik\n• Seriozitet\n• Eksperiencë e preferueshme\n\nOfrojmë:\n• Pagë + bonus\n• Sigurim shëndetësor\n• Kontratë e rregullt`,
    email: "hr@fancourier.al", createdAt: daysAgo(3),
  },
  // ─── SVEZIA ───
  {
    id: 1031,
    title: "Lagerarbetare — Postnord Sverige",
    company: "PostNord Sverige AB",
    city: "Stockholm", country: "SE", category: "Logistica",
    salaryMin: 26000, salaryMax: 32000, contractType: "Tillsvidare",
    description: `PostNord söker lagerarbetare till sorteringsterminal i Stockholm.\n\nArbetsuppgifter:\n• Sortering och scanning av paket\n• Lastning och lossning\n• Kvalitetskontroll\n\nKrav:\n• Skiftarbete (dag/kväll/natt)\n• God fysik\n• B-körkort meriterande\n\nVi erbjuder:\n• Kollektivavtalsenlig lön\n• 25 semesterdagar\n• Friskvårdsbidrag`,
    email: "jobb@postnord.se", createdAt: daysAgo(0),
  },
  // ─── NORVEGIA ───
  {
    id: 1032,
    title: "Lagermedarbeider — Oslo",
    company: "Bring Logistics — Oslo",
    city: "Oslo", country: "NO", category: "Magazzino",
    salaryMin: 38000, salaryMax: 46000, contractType: "Fast stilling",
    description: `Bring Logistics søker lagermedarbeidere til terminalen i Oslo.\n\nOppgaver:\n• Sortering og skanning av pakker\n• Lasting og lossing av kjøretøy\n• Kvalitetskontroll\n\nKrav:\n• Fleksibel til skiftarbeid\n• God fysisk form\n• Norsk eller engelsk\n\nVi tilbyr:\n• Tarifflønn + tillegg\n• Pensjonsordning\n• 25 dager ferie`,
    email: "jobb@bring.no", createdAt: daysAgo(2),
  },
  // ─── DANIMARCA ───
  {
    id: 1033,
    title: "Lagermedarbejder — PostNord Danmark",
    company: "PostNord Danmark — København",
    city: "København", country: "DK", category: "Logistica",
    salaryMin: 28000, salaryMax: 35000, contractType: "Fastansættelse",
    description: `PostNord Danmark søger lagermedarbejdere til sorteringscentret i København.\n\nOpgaver:\n• Sortering og scanning af pakker\n• Ind- og udlæsning af biler\n• Kvalitetssikring\n\nKrav:\n• Skiftarbejde\n• Fysisk stærk\n• Dansk eller engelsk\n\nVi tilbyder:\n• Overenskomstmæssig løn\n• 6 ugers ferie\n• Sundhedsforsikring`,
    email: "job@postnord.dk", createdAt: daysAgo(1),
  },
  // ─── UNGHERIA ───
  {
    id: 1034,
    title: "Raktári Munkatárs — Budapest",
    company: "GLS Hungary — Budapest",
    city: "Budapest", country: "HU", category: "Magazzino",
    salaryMin: 280000, salaryMax: 350000, contractType: "Határozatlan idejű",
    description: `GLS Hungary keres raktári munkatársakat Budapest melletti depójába.\n\nFeladatok:\n• Csomagok szortírozása és beolvasása\n• Járművek ki- és berakodása\n• Minőségellenőrzés\n\nKövetelmények:\n• Műszakos munkavégzés\n• Jó fizikai állapot\n• Magyar vagy angol nyelv\n\nAjánlatunk:\n• Versenyképes bér\n• Cafetéria juttatás\n• Éves prémium`,
    email: "allasok@gls-hungary.com", createdAt: daysAgo(0),
  },
  // ─── SERBIA ───
  {
    id: 1035,
    title: "Radnik u Magacinu — Beograd",
    company: "DExpress — Beograd",
    city: "Beograd", country: "RS", category: "Magazzino",
    salaryMin: 65000, salaryMax: 85000, contractType: "Stalni radni odnos",
    description: `DExpress traži radnike u magacinu za sortirni centar u Beogradu.\n\nZadaci:\n• Sortiranje i skeniranje paketa\n• Utovar i istovar vozila\n• Kontrola kvaliteta\n\nUslovi:\n• Smenski rad\n• Fizička sposobnost\n• Srpski jezik\n\nNudimo:\n• Redovnu platu + stimulacije\n• Privatno zdravstveno osiguranje\n• 20 dana godišnjeg odmora`,
    email: "hr@dexpress.rs", createdAt: daysAgo(3),
  },
  // ─── STATI UNITI ───
  {
    id: 1036,
    title: "Warehouse Associate — FedEx Ground",
    company: "FedEx Ground — Newark NJ",
    city: "Newark", country: "US", category: "Logistica",
    salaryMin: 2400, salaryMax: 3000, contractType: "Full-time",
    description: `FedEx Ground is hiring warehouse associates in Newark, NJ.\n\nResponsibilities:\n• Package handling and sorting\n• Loading/unloading trailers\n• Package scanning and tracking\n• Maintaining safety standards\n\nRequirements:\n• 18 years or older\n• Ability to lift 75 lbs\n• Weekend availability\n\nBenefits:\n• Starting pay $17/hr + overtime\n• Medical/dental after 30 days\n• Tuition reimbursement`,
    email: "ground.jobs@fedex.com", createdAt: daysAgo(1),
  },
  // ─── BULGARIA ───
  {
    id: 1037,
    title: "Складов Работник — София",
    company: "Speedy Bulgaria — София",
    city: "София", country: "BG", category: "Magazzino",
    salaryMin: 1200, salaryMax: 1600, contractType: "Безсрочен договор",
    description: `Speedy Bulgaria търси складови работници за сортировъчен център в София.\n\nЗадължения:\n• Сортиране и сканиране на пратки\n• Товарене и разтоварване\n• Контрол на качеството\n\nИзисквания:\n• Физическа издръжливост\n• Работа на смени\n• Отговорност\n\nПредлагаме:\n• Конкурентно заплащане\n• Допълнителни придобивки\n• Стабилна заетост`,
    email: "hr@speedy.bg", createdAt: daysAgo(2),
  },
  // ─── ITALIA EXTRA - più offerte ───
  {
    id: 1038,
    title: "Infermiere/a Domiciliare — Roma Nord",
    company: "Korian Italia",
    city: "Roma", country: "IT", category: "Badante",
    salaryMin: 1700, salaryMax: 2200, contractType: "Tempo indeterminato",
    description: `Korian Italia cerca infermieri per assistenza domiciliare a Roma.\n\nMansioni:\n• Medicazioni e terapie infermieristiche\n• Somministrazione farmaci\n• Monitoraggio parametri vitali\n• Relazione con familiari e medici\n\nRequisiti:\n• Laurea in Scienze Infermieristiche\n• Iscrizione all'Ordine IPASVI\n• Patente B\n\nOffriamo:\n• CCNL RSA e strutture residenziali\n• Rimborso chilometrico\n• Formazione ECM continua`,
    email: "infermieri@korian.it", createdAt: daysAgo(0),
  },
  {
    id: 1039,
    title: "Barman / Bartender — Cocktail Bar",
    company: "Nottingham Forest (bar storico)",
    city: "Milano", country: "IT", category: "Ristorante",
    salaryMin: 1300, salaryMax: 1700, contractType: "Tempo indeterminato",
    description: `Storico cocktail bar milanese cerca bartender creativo.\n\nMansioni:\n• Preparazione cocktail classici e signature\n• Gestione bar e cantina vini\n• Relazione con clientela\n• Formazione staff junior\n\nRequisiti:\n• Corso barman o AIBES\n• Minimo 3 anni dietro il bancone\n• Passione per la miscelazione\n\nOffriamo:\n• Fisso + mance consistenti\n• Accesso a fiere e competizioni\n• Ambiente creativo`,
    email: "bar@nottinghamforest.it", createdAt: daysAgo(1),
  },
  {
    id: 1040,
    title: "Elettricista Industriale — Cantieri Nord Italia",
    company: "Tecno Electric Srl",
    city: "Milano", country: "IT", category: "Edilizia",
    salaryMin: 1800, salaryMax: 2400, contractType: "Tempo indeterminato",
    description: `Tecno Electric ricerca elettricisti industriali per cantieri in Lombardia e Piemonte.\n\nMansioni:\n• Impianti elettrici industriali MT/BT\n• Quadri elettrici e cablaggi\n• Manutenzione predittiva\n• Lettura schemi elettrici\n\nRequisiti:\n• Qualifica elettricista (CEI 11-27)\n• Abilitazione PES/PAV\n• Patente B + auto\n\nOffriamo:\n• CCNL Metalmeccanico\n• Auto aziendale o rimborso\n• Formazione CEI continua`,
    email: "lavoro@tecnoelectric.it", createdAt: daysAgo(2),
  },
];

// ─── Utility: safe array filter ───────────────────────────────────────────────
export function safeFilter(jobs: Job[], opts: {
  category?: string;
  country?: string;
  city?: string;
  search?: string;
}): Job[] {
  if (!Array.isArray(jobs)) return INITIAL_REAL_JOBS;
  return jobs.filter(j => {
    if (!j) return false;
    if (opts.category && opts.category !== "Tutte" && j.category !== opts.category) return false;
    if (opts.country && opts.country !== "ALL" && j.country !== opts.country) return false;
    if (opts.city) {
      const jc = (j.city || "").toLowerCase();
      if (!jc.includes(opts.city.toLowerCase())) return false;
    }
    if (opts.search) {
      const s = opts.search.toLowerCase();
      const title = (j.title || "").toLowerCase();
      const desc = (j.description || "").toLowerCase();
      if (!title.includes(s) && !desc.includes(s)) return false;
    }
    return true;
  });
}
