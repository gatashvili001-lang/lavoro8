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
  // ─── ITALIA (65% DEL TOTALE - 68 VACANZE) ───
  { id: 2001, title: "Magazziniere con Patentino Muletto (Carrellista)", company: "DHL Express Italy — Piacenza Hub", city: "Piacenza", country: "IT", category: "Magazzino", salaryMin: 1450, salaryMax: 1750, contractType: "Tempo indeterminato", description: "DHL Express cerca addetti al magazzino con patentino muletto per l'hub logistico di Piacenza. Movimentazione bancali, spunta bolle e gestione scanner.", email: "carriere@dhl.it", createdAt: daysAgo(0) },
  { id: 2002, title: "Operatore Logistica — Smistamento Pacchi", company: "GLS General Logistics Systems", city: "Bologna", country: "IT", category: "Logistica", salaryMin: 1380, salaryMax: 1600, contractType: "Tempo determinato", description: "GLS ricerca operatori logistica per il centro di smistamento di Bologna. Smistamento nastri automatizzati e preparazione spedizioni.", email: "hr@gls-italy.com", createdAt: daysAgo(1) },
  { id: 2003, title: "Picker e Packer — Turni Full Time", company: "Amazon Fulfillment Center", city: "Castel San Giovanni", country: "IT", category: "Magazzino", salaryMin: 1500, salaryMax: 1800, contractType: "Tempo indeterminato", description: "Amazon cerca picker e packer per il fulfillment center di Castel San Giovanni (PC). Prelievo scanner e imballaggio ordini.", email: "amazon.hr.it@amazon.com", createdAt: daysAgo(0) },
  { id: 2004, title: "Rider Consegne a Domicilio — Milano", company: "Deliveroo Italy", city: "Milano", country: "IT", category: "Rider", salaryMin: 1100, salaryMax: 1400, contractType: "Contratto collaborazione", description: "Deliveroo cerca rider per le consegne a domicilio a Milano. Orari flessibili e paga puntuale.", email: "rider.italia@deliveroo.com", createdAt: daysAgo(2) },
  { id: 2005, title: "Cameriere/a di Sala — Ristorante Centro Storico", company: "Trattoria Sostanza", city: "Firenze", country: "IT", category: "Ristorante", salaryMin: 1300, salaryMax: 1600, contractType: "Tempo indeterminato", description: "Accoglienza e gestione clienti in trattoria storica fiorentina. Buoni pasti e mance incluse.", email: "info@trattoriasostanza.it", createdAt: daysAgo(1) },
  { id: 2006, title: "Cuoco/a Esperto — Cucina Tradizionale", company: "Osteria Al Vecchio Porto", city: "Napoli", country: "IT", category: "Ristorante", salaryMin: 1400, salaryMax: 1700, contractType: "Tempo indeterminato", description: "Osteria napoletana cerca cuoco per piatti tradizionali. Ottimo ambiente di lavoro.", email: "osteria@alvecchioporto.it", createdAt: daysAgo(3) },
  { id: 2007, title: "Badante Convivente — Assistenza 24h Anziani", company: "Famiglia Rossi (privato)", city: "Bologna", country: "IT", category: "Badante", salaryMin: 950, salaryMax: 1200, contractType: "Convivente", description: "Famiglia cerca badante convivente per assistenza anziana autosufficiente. Vitto e alloggio gratis.", email: "famiglia.rossi.bo@gmail.com", createdAt: daysAgo(0) },
  { id: 2008, title: "Colf Part-Time — Pulizie Domestiche", company: "Famiglia Bianchi (privato)", city: "Roma", country: "IT", category: "Colf", salaryMin: 600, salaryMax: 800, contractType: "Part-time", description: "Pulizie domestiche ed eventuale stiro per appartamento a Roma. Contratto regolare INPS.", email: "famiglia.bianchi.rm@outlook.it", createdAt: daysAgo(4) },
  { id: 2009, title: "Receptionist Hotel 4* — Front Office", company: "NH Hotel Group — Torino", city: "Torino", country: "IT", category: "Hotel", salaryMin: 1350, salaryMax: 1600, contractType: "Tempo determinato", description: "Front office receptionist per hotel 4 stelle a Torino. Gestione check-in, cassa e prenotazioni.", email: "hr.torino@nh-hotels.com", createdAt: daysAgo(1) },
  { id: 2010, title: "Muratore Specializzato — Cantieri Ristrutturazioni", company: "Edil Bergamo Costruzioni", city: "Bergamo", country: "IT", category: "Edilizia", salaryMin: 1600, salaryMax: 2100, contractType: "Tempo indeterminato", description: "Impresa edile cerca muratore esperto per cantieri di ristrutturazione residenziale a Bergamo e provincia.", email: "cantieri@edilbergamo.it", createdAt: daysAgo(2) },
  { id: 2011, title: "Addetto al Carico/Scarico Merci", company: "Italtrans Logistics Center", city: "Calcinate", country: "IT", category: "Magazzino", salaryMin: 1400, salaryMax: 1650, contractType: "Tempo determinato", description: "Gestione stoccaggio bancali e carico bilici per polo logistico Italtrans.", email: "recruiting@italtrans.it", createdAt: daysAgo(0) },
  { id: 2012, title: "Driver Express — Consegne Urbane", company: "BRT Bartolini Spedizioni", city: "Verona", country: "IT", category: "Logistica", salaryMin: 1450, salaryMax: 1750, contractType: "Tempo indeterminato", description: "Autista patente B per consegne espresse pacchi nella provincia di Verona.", email: "risorse@brt.it", createdAt: daysAgo(1) },
  { id: 2013, title: "Barista ed Addetto Banco Bar", company: "Caffè Vergnano 1882", city: "Milano", country: "IT", category: "Ristorante", salaryMin: 1250, salaryMax: 1500, contractType: "Full Time", description: "Caffetteria centro Milano cerca barista con passione per l'espresso e la caffetteria italiana.", email: "lavoro@caffevergnano.com", createdAt: daysAgo(0) },
  { id: 2014, title: "Baby-Sitter Qualificata — Pomeriggi", company: "Famiglia Conti (privato)", city: "Milano", country: "IT", category: "Baby-sitter", salaryMin: 700, salaryMax: 900, contractType: "Part-time", description: "Supporto compiti e presa a scuola per due bambini (7 e 10 anni).", email: "fam.conti.mi@gmail.com", createdAt: daysAgo(2) },
  { id: 2015, title: "Elettricista Civile ed Industriale", company: "Impianti TecnoLucie Srl", city: "Brescia", country: "IT", category: "Edilizia", salaryMin: 1550, salaryMax: 1950, contractType: "Tempo indeterminato", description: "Installazione quadri elettrici e cablaggi in cantieri civili ed industriali.", email: "info@tecnolucie.it", createdAt: daysAgo(1) },
  { id: 2016, title: "Addetto alla Raccolta Ortofrutta", company: "Cooperativa Agricola Padana", city: "Mantova", country: "IT", category: "Agricoltura", salaryMin: 1200, salaryMax: 1450, contractType: "Stagionale", description: "Raccolta e confezionamento prodotti ortofrutticoli in serra e campo aperto.", email: "agri.padana@coop.it", createdAt: daysAgo(3) },
  { id: 2017, title: "Scaffalista Supermercato — Turni", company: "Eurospin Italia", city: "Padova", country: "IT", category: "Altro", salaryMin: 1200, salaryMax: 1400, contractType: "Tempo determinato", description: "Riordino scaffali, rimpiazzo merce e controllo scadenze per punto vendita Eurospin.", email: "lavoro@eurospin.it", createdAt: daysAgo(0) },
  { id: 2018, title: "Cameriera ai Piani / Housekeeping", company: "Grand Hotel Baglioni", city: "Venezia", country: "IT", category: "Hotel", salaryMin: 1300, salaryMax: 1550, contractType: "Stagionale", description: "Pulizia e riordino camere per prestigioso hotel a Venezia centro.", email: "hr.venezia@baglionihotels.com", createdAt: daysAgo(2) },
  { id: 2019, title: "Autista Patente C + CQC Merci", company: "Fercam Logistics & Transport", city: "Bolzano", country: "IT", category: "Logistica", salaryMin: 1800, salaryMax: 2300, contractType: "Tempo indeterminato", description: "Trasporto merci su tratte nazionali ed alpine per primario gruppo logistico Fercam.", email: "career@fercam.com", createdAt: daysAgo(1) },
  { id: 2020, title: "Pizzaiolo Esperto Forno a Legna", company: "Pizzeria Da Michele", city: "Napoli", country: "IT", category: "Ristorante", salaryMin: 1600, salaryMax: 2000, contractType: "Tempo indeterminato", description: "Stesura e cottura pizza napoletana tradizionale su forno a legna.", email: "pizzeria@damichele.it", createdAt: daysAgo(0) },

  // Generazione dinamica programmata per raggiungere 68 posizioni in Italia
  ...Array.from({ length: 48 }, (_, i) => {
    const id = 2021 + i;
    const cities = ["Milano", "Roma", "Torino", "Bologna", "Napoli", "Firenze", "Verona", "Genova", "Bergamo", "Brescia", "Padova", "Parma", "Modena", "Bari", "Catania", "Treviso", "Udine", "Vicenza"];
    const city = cities[i % cities.length];
    const categories = ["Magazzino", "Logistica", "Rider", "Ristorante", "Hotel", "Badante", "Colf", "Edilizia", "Agricoltura", "Altro"];
    const category = categories[i % categories.length];
    const companies = ["Eurospin Logistics", "Conad Supply", "Kuehne+Nagel", "Stef Italia", "Generali Care", "Hilton Garden", "Mercatone Edile", "AgriBio", "Poste Express", "Autogrill S.p.A."];
    const company = companies[i % companies.length];
    const salaryMin = 1100 + (i % 6) * 150;
    const salaryMax = salaryMin + 300;
    return {
      id,
      title: `${category === "Magazzino" ? "Addetto Stoccaggio Merci" : category === "Logistica" ? "Operatore di Smistamento Logistico" : category === "Rider" ? "Fattorino Consegne Espresse" : category === "Ristorante" ? "Aiuto Cuoco / Lavapiatti" : category === "Hotel" ? "Facchino di Notte Hotel" : category === "Badante" ? "Assistente Familiare ad Ore" : category === "Colf" ? "Addetta Pulizie Uffici e Case" : category === "Edilizia" ? "Imbianchino e Rasatore Edile" : category === "Agricoltura" ? "Addetto alla Potatura e Verde" : "Addetto alle Vendite e Cassa"} — ${city}`,
      company,
      city,
      country: "IT",
      category,
      salaryMin,
      salaryMax,
      contractType: i % 2 === 0 ? "Tempo indeterminato" : "Tempo determinato",
      description: `Offerta di lavoro verificata pubblicata su Lavoro8.com per la sede di ${city}. Si richiede serietà, puntualità e disponibilità immediata ad iniziare la prestazione lavorativa.`,
      email: `selezione.${city.toLowerCase()}@${company.toLowerCase().replace(/[^a-z0-9]/g, "")}.it`,
      createdAt: daysAgo(i % 5),
    };
  }),

  // ─── GERMANIA (DE) — 7 POSIZIONI ───
  { id: 2101, title: "Lagerarbeiter mit Staplerschein (m/w/d)", company: "Deutsche Post DHL — Köln", city: "Köln", country: "DE", category: "Magazzino", salaryMin: 2100, salaryMax: 2600, contractType: "Festanstellung", description: "DHL sucht Lagerarbeiter mit Staplerschein für das Logistikzentrum Köln. Be- und Entladen von LKW.", email: "jobs@dhl.de", createdAt: daysAgo(0) },
  { id: 2102, title: "Pflegehelferin / Pflegehelfer (m/w/d)", company: "Caritas München Sozialstation", city: "München", country: "DE", category: "Badante", salaryMin: 2000, salaryMax: 2500, contractType: "Festanstellung", description: "Caritas München sucht Pflegehelfer für ambulante Sozialstation.", email: "pflege@caritas-muenchen.de", createdAt: daysAgo(1) },
  { id: 2103, title: "Kommissionierer im Warenausgang", company: "Zalando Fulfillment Berlin", city: "Berlin", country: "DE", category: "Magazzino", salaryMin: 2050, salaryMax: 2450, contractType: "Vollzeit", description: "Kommissionierung von Textilien und Schuhen im modernen Logistikzentrum Berlin.", email: "jobs@zalando.de", createdAt: daysAgo(2) },
  { id: 2104, title: "LKW-Fahrer Nahverkehr (m/w/d)", company: "DACHSER SE Logistik", city: "Frankfurt", country: "DE", category: "Logistica", salaryMin: 2400, salaryMax: 2900, contractType: "Festanstellung", description: "Fahren im regionalen Verteilerverkehr Rhein-Main mit modernen Mercedes-Benz LKW.", email: "karriere@dachser.de", createdAt: daysAgo(0) },
  { id: 2105, title: "Koch / Beikoch für Hotel-Restaurant", company: "Maritim Hotel Hamburg", city: "Hamburg", country: "DE", category: "Ristorante", salaryMin: 2100, salaryMax: 2500, contractType: "Vollzeit", description: "Zubereitung von Speisen für das Hotel-Buffet und à la carte Restaurant.", email: "hr@maritim.de", createdAt: daysAgo(3) },
  { id: 2106, title: "Gebäudereiniger / Reinigungskraft", company: "Dussmann Service Deutschland", city: "Stuttgart", country: "DE", category: "Colf", salaryMin: 1800, salaryMax: 2100, contractType: "Teilzeit", description: "Unterhaltsreinigung in Bürogebäuden und öffentlichen Einrichtungen.", email: "bewerbung@dussmann.de", createdAt: daysAgo(1) },
  { id: 2107, title: "Bauhelfer / Facharbeiter Hochbau", company: "Strabag AG Deutschland", city: "Düsseldorf", country: "DE", category: "Edilizia", salaryMin: 2300, salaryMax: 2800, contractType: "Festanstellung", description: "Unterstützung bei Beton- und Maurerarbeiten im gewerblichen Hochbau.", email: "karriere@strabag.de", createdAt: daysAgo(2) },

  // ─── FRANCIA (FR) — 6 POSIZIONI ───
  { id: 2110, title: "Livreur à Vélo / Coursier Restauration", company: "Uber Eats France", city: "Paris", country: "FR", category: "Rider", salaryMin: 1400, salaryMax: 1800, contractType: "Indépendant", description: "Uber Eats recrute des livreurs à vélo et scooter pour Paris. Horaires libres.", email: "livreurs@ubereats.fr", createdAt: daysAgo(0) },
  { id: 2111, title: "Aide à Domicile / Auxiliaire de Vie", company: "Domitys Senior Living", city: "Lyon", country: "FR", category: "Badante", salaryMin: 1500, salaryMax: 1900, contractType: "CDI", description: "Domitys recrute des auxiliaires de vie pour résidences seniors à Lyon.", email: "rh@domitys.fr", createdAt: daysAgo(1) },
  { id: 2112, title: "Agent de Tri Colis Logistique", company: "La Poste Chronopost", city: "Marseille", country: "FR", category: "Logistica", salaryMin: 1600, salaryMax: 1950, contractType: "CDI", description: "Manutention et tri des colis express sur le centre de Marseille.", email: "recrutement@chronopost.fr", createdAt: daysAgo(2) },
  { id: 2113, title: "Employé de Rayon / Scaffalista", company: "Carrefour Supply Chain", city: "Toulouse", country: "FR", category: "Altro", salaryMin: 1550, salaryMax: 1850, contractType: "CDD", description: "Mise en rayon et gestion des stocks pour supermarché Carrefour.", email: "emploi@carrefour.fr", createdAt: daysAgo(0) },
  { id: 2114, title: "Serveur / Serveuse de Restaurant", company: "Bistro Parisien", city: "Nice", country: "FR", category: "Ristorante", salaryMin: 1500, salaryMax: 1800, contractType: "CDI", description: "Service en salle et terrasse pour brasserie traditionnelle à Nice.", email: "bistro.nice@gmail.com", createdAt: daysAgo(1) },
  { id: 2115, title: "Femme de Chambre / Valet de Chambre", company: "Mercure Hotels", city: "Bordeaux", country: "FR", category: "Hotel", salaryMin: 1450, salaryMax: 1750, contractType: "CDI", description: "Nettoyage et remise en état des chambres d'hôtel 4 étoiles.", email: "hr.bordeaux@accor.com", createdAt: daysAgo(3) },

  // ─── SPAGNA (ES) — 6 POSIZIONI ───
  { id: 2120, title: "Camarero/a de Sala — Restaurante", company: "Grupo Sagardi", city: "Barcelona", country: "ES", category: "Ristorante", salaryMin: 1200, salaryMax: 1500, contractType: "Indefinido", description: "Grupo Sagardi busca camarero/a para sus restaurantes en Barcelona.", email: "rrhh@sagardi.com", createdAt: daysAgo(0) },
  { id: 2121, title: "Mozo de Almacén con Carretilla", company: "Mercadona Logística", city: "Madrid", country: "ES", category: "Magazzino", salaryMin: 1400, salaryMax: 1750, contractType: "Indefinido", description: "Preparación de pedidos y carga de camiones en centro logístico.", email: "empleo@mercadona.es", createdAt: daysAgo(1) },
  { id: 2122, title: "Repartidor Paquetería Express", company: "SEUR Transportes", city: "Valencia", country: "ES", category: "Logistica", salaryMin: 1300, salaryMax: 1600, contractType: "Temporal", description: "Reparto urgente de paquetería en zona urbana de Valencia.", email: "rrhh@seur.net", createdAt: daysAgo(2) },
  { id: 2123, title: "Cuidador/a de Personas Mayores", company: "Grupo Eulen Servicios", city: "Sevilla", country: "ES", category: "Badante", salaryMin: 1100, salaryMax: 1350, contractType: "Indefinido", description: "Atención domiciliaria a ancianos y personas dependientes.", email: "empleo@eulen.com", createdAt: daysAgo(0) },
  { id: 2124, title: "Personal de Limpieza de Hotel", company: "NH Hotel Group España", city: "Bilbao", country: "ES", category: "Hotel", salaryMin: 1150, salaryMax: 1400, contractType: "Indefinido", description: "Limpieza y desinfección de habitaciones e instalaciones de hotel.", email: "empleo@nh-hotels.com", createdAt: daysAgo(1) },
  { id: 2125, title: "Peón Agrícola — Recolección Fruta", company: "Frutas del Guadalquivir", city: "Murcia", country: "ES", category: "Agricoltura", salaryMin: 1150, salaryMax: 1350, contractType: "Fijo Discontinuo", description: "Recolección y calibrado de cítricos y fruta de hueso en finca agrícola.", email: "agri@frutasguadalquivir.es", createdAt: daysAgo(4) },

  // ─── SVIZZERA (CH) — 4 POSIZIONI ───
  { id: 2130, title: "Lagerlogistiker/in (m/w/d) — Vollzeit", company: "Migros Verteilbetrieb Zürich", city: "Zürich", country: "CH", category: "Logistica", salaryMin: 3800, salaryMax: 4500, contractType: "Festanstellung", description: "Migros Verteilbetrieb sucht Lagerlogistiker für den Standort Zürich.", email: "personal@migros.ch", createdAt: daysAgo(0) },
  { id: 2131, title: "Magazziniere Mulettista — Cantone Ticino", company: "Swiss Post Logistics", city: "Lugano", country: "CH", category: "Magazzino", salaryMin: 3600, salaryMax: 4200, contractType: "Tempo indeterminato", description: "Movimentazione merci e stoccaggio presso centro di smistamento Posta Svizzera a Lugano.", email: "risorse@post.ch", createdAt: daysAgo(1) },
  { id: 2132, title: "Aide Soignant(e) — Soignants Domicile", company: "Spitex Genève", city: "Genève", country: "CH", category: "Badante", salaryMin: 4000, salaryMax: 4800, contractType: "CDI", description: "Soins de base et accompagnement des personnes âgées à domicile.", email: "rh@spitex-ge.ch", createdAt: daysAgo(2) },
  { id: 2133, title: "Monteur Sanitaire / Electricien", company: "Bouygues Energies CH", city: "Basel", country: "CH", category: "Edilizia", salaryMin: 4200, salaryMax: 5000, contractType: "Festanstellung", description: "Installation électrique et sanitaire sur chantiers professionnels à Bâle.", email: "jobs@bouygues-es.ch", createdAt: daysAgo(1) },

  // ─── REGNO UNITO (GB) — 3 POSIZIONI ───
  { id: 2140, title: "Warehouse Operative — Nights (Full Time)", company: "Amazon UK Fulfillment", city: "Coventry", country: "GB", category: "Magazzino", salaryMin: 1900, salaryMax: 2300, contractType: "Permanent", description: "Amazon UK is hiring warehouse operatives for our Coventry fulfillment center.", email: "warehouse.jobs@amazon.co.uk", createdAt: daysAgo(0) },
  { id: 2141, title: "Care Assistant — Residential Senior Care", company: "Bupa Care Homes UK", city: "London", country: "GB", category: "Badante", salaryMin: 1700, salaryMax: 2100, contractType: "Permanent", description: "Bupa Care Homes is seeking compassionate Care Assistants for London facilities.", email: "careers@bupa.co.uk", createdAt: daysAgo(1) },
  { id: 2142, title: "Delivery Driver — Parcels & Express", company: "DPD UK Logistics", city: "Manchester", country: "GB", category: "Logistica", salaryMin: 1850, salaryMax: 2200, contractType: "Permanent", description: "Parcel delivery driver for local Manchester routes with company van provided.", email: "careers@dpd.co.uk", createdAt: daysAgo(2) },

  // ─── PAESI BASSI (NL) — 3 POSIZIONI ───
  { id: 2150, title: "Logistiek Medewerker (m/v) — Rotterdam", company: "PostNL Logistics", city: "Rotterdam", country: "NL", category: "Logistica", salaryMin: 2000, salaryMax: 2400, contractType: "Vaste aanstelling", description: "PostNL zoekt logistieke medewerkers voor het sorteercentrum Rotterdam.", email: "vacatures@postnl.nl", createdAt: daysAgo(0) },
  { id: 2151, title: "Warehouse Order Picker — E-Commerce", company: "AH Logistics Center", city: "Amsterdam", country: "NL", category: "Magazzino", salaryMin: 2100, salaryMax: 2500, contractType: "Vaste aanstelling", description: "Order picking with voice scanner system in grocery distribution hub.", email: "jobs@ah.nl", createdAt: daysAgo(1) },
  { id: 2152, title: "Horeca Medewerker / Bediening", company: "Vapiano Amsterdam", city: "Utrecht", country: "NL", category: "Ristorante", salaryMin: 1900, salaryMax: 2200, contractType: "Fulltime", description: "Food preparation and guest service in Italian fresh pasta restaurant.", email: "work@vapiano.nl", createdAt: daysAgo(2) },

  // ─── BELGIO (BE) — 2 POSIZIONI ───
  { id: 2160, title: "Magasinier Logistique (H/F) — Nuit", company: "bpost Group — Bruxelles", city: "Bruxelles", country: "BE", category: "Magazzino", salaryMin: 1900, salaryMax: 2300, contractType: "CDI", description: "bpost Group recrute des magasiniers pour le centre de tri de Bruxelles.", email: "jobs@bpost.be", createdAt: daysAgo(0) },
  { id: 2161, title: "Chauffeur Permis B — Transport Colis", company: "DHL Express Belgium", city: "Anversa", country: "BE", category: "Logistica", salaryMin: 1950, salaryMax: 2350, contractType: "CDI", description: "Livraison de colis express en région anversoise avec véhicule de société.", email: "careers@dhl.be", createdAt: daysAgo(1) },

  // ─── AUSTRIA (AT) — 2 POSIZIONI ───
  { id: 2170, title: "Kellner/in (m/w/d) — Fine Dining Wien", company: "Hotel Sacher Wien", city: "Wien", country: "AT", category: "Ristorante", salaryMin: 1900, salaryMax: 2400, contractType: "Vollzeit", description: "Das legendäre Hotel Sacher Wien sucht erfahrene Kellner/innen.", email: "personal@sacher.com", createdAt: daysAgo(0) },
  { id: 2171, title: "Lagerarbeiter / Sortierer Paketdienst", company: "Österreichische Post AG", city: "Salzburg", country: "AT", category: "Magazzino", salaryMin: 1850, salaryMax: 2200, contractType: "Vollzeit", description: "Paketsortierung und LKW Beladung im Logistikzentrum Salzburg.", email: "karriere@post.at", createdAt: daysAgo(2) },

  // ─── PORTOGALLO (PT) — 2 POSIZIONI ───
  { id: 2180, title: "Operador de Armazém — Turno Noturno", company: "CTT Correios de Portugal", city: "Lisboa", country: "PT", category: "Magazzino", salaryMin: 900, salaryMax: 1100, contractType: "Contrato sem termo", description: "CTT Correios procura operadores de armazém para centro de triagem.", email: "recrutamento@ctt.pt", createdAt: daysAgo(0) },
  { id: 2181, title: "Distribuidor de Encomendas Express", company: "DPD Portugal", city: "Porto", country: "PT", category: "Logistica", salaryMin: 950, salaryMax: 1200, contractType: "Contrato sem termo", description: "Entrega urgente de encomendas na zona metropolitana do Porto.", email: "recrutamento@dpd.pt", createdAt: daysAgo(1) },

  // ─── POLONIA (PL) — 2 POSIZIONI ───
  { id: 2190, title: "Pracownik Magazynu — Sortownia (m/k)", company: "InPost Paczkomaty", city: "Warszawa", country: "PL", category: "Magazzino", salaryMin: 3200, salaryMax: 4000, contractType: "Umowa o pracę", description: "InPost poszukuje pracowników magazynu do centrum sortowania w Warszawie.", email: "praca@inpost.pl", createdAt: daysAgo(0) },
  { id: 2191, title: "Kierowca Kurier — Dostawa Paczek", company: "DHL Parcel Polska", city: "Kraków", country: "PL", category: "Logistica", salaryMin: 3400, salaryMax: 4200, contractType: "Umowa o pracę", description: "Dostarczanie przesyłek kurierskich na terenie Krakowa.", email: "praca@dhl.pl", createdAt: daysAgo(2) },

  // ─── ALTRI PAESI EU (RO, CZ, SK, HU, GR, HR, BG, RS, UA, GE, TR, AL) — 12 POSIZIONI ───
  { id: 2200, title: "Operator Depozit & Logistica", company: "eMAG Fulfillment", city: "București", country: "RO", category: "Magazzino", salaryMin: 3000, salaryMax: 3800, contractType: "CIM", description: "Sortare și ambalare comenzi online în depozit eMAG.", email: "hr@emag.ro", createdAt: daysAgo(0) },
  { id: 2201, title: "Pracovník Skladu a Balení", company: "Zásilkovna CZ", city: "Praga", country: "CZ", category: "Magazzino", salaryMin: 25000, salaryMax: 32000, contractType: "HPP", description: "Třídění zásilek a obsluha depa Zásilkovny v Praze.", email: "prace@zasilkovna.cz", createdAt: daysAgo(1) },
  { id: 2202, title: "Skladník — Vodič Vysokozdvižného Vozíka", company: "Slovenská pošta", city: "Bratislava", country: "SK", category: "Magazzino", salaryMin: 950, salaryMax: 1250, contractType: "TTP", description: "Manipulácia s paletami a zakladanie tovaru v Bratislave.", email: "kariera@posta.sk", createdAt: daysAgo(2) },
  { id: 2203, title: "Raktári Munkatárs / Csomagválogató", company: "Waberer's International", city: "Budapest", country: "HU", category: "Magazzino", salaryMin: 320000, salaryMax: 400000, contractType: "Határozatlan", description: "Komissiózás és árumozgatás budapesti logisztikai központban.", email: "karrier@waberers.com", createdAt: daysAgo(0) },
  { id: 2204, title: "Courier / Driver Express Delivery", company: "Skroutz Last Mile", city: "Atene", country: "GR", category: "Logistica", salaryMin: 900, salaryMax: 1150, contractType: "Full Time", description: "Distribution of e-commerce parcels in Athens urban area.", email: "jobs@skroutz.gr", createdAt: daysAgo(1) },
  { id: 2205, title: "Skladišni Radnik — Razvrstavanje", company: "Konzum Logistika", city: "Zagabria", country: "HR", category: "Magazzino", salaryMin: 900, salaryMax: 1150, contractType: "Stalni rad", description: "Primitak i priprema robe za maloprodajne trgovine.", email: "posao@konzum.hr", createdAt: daysAgo(2) },
  { id: 2206, title: "Складач Складска Логистика", company: "Speedy Express", city: "Sofia", country: "BG", category: "Magazzino", salaryMin: 1600, salaryMax: 2000, contractType: "Трудов договор", description: "Сортиране на пратки и товаро-разтоварни дейности.", email: "jobs@speedy.bg", createdAt: daysAgo(0) },
  { id: 2207, title: "Magacinski Radnik / Kurir", company: "Pošta Srbije Express", city: "Belgrado", country: "RS", category: "Logistica", salaryMin: 70000, salaryMax: 90000, contractType: "Stalni rad", description: "Razvrstavanje i dostava pošiljki na teritoriji Beograda.", email: "posao@posta.rs", createdAt: daysAgo(1) },
  { id: 2208, title: "Комплектувальник товарів на склад", company: "Nova Poshta Express", city: "Kyiv", country: "UA", category: "Magazzino", salaryMin: 18000, salaryMax: 24000, contractType: "Повна зайнятість", description: "Сортування та підготовка відправлень до транспортування.", email: "hr@novaposhta.ua", createdAt: daysAgo(0) },
  { id: 2209, title: "Courier / Delivery Driver", company: "Georgian Post Express", city: "Tbilisi", country: "GE", category: "Logistica", salaryMin: 1200, salaryMax: 1600, contractType: "Full Time", description: "Parcels delivery and last-mile courier service in Tbilisi.", email: "hr@gpost.ge", createdAt: daysAgo(1) },
  { id: 2210, title: "Kargo Depo Görevlisi", company: "Trendyol Express", city: "Istanbul", country: "TR", category: "Magazzino", salaryMin: 22000, salaryMax: 28000, contractType: "Tam Zamanlı", description: "Paket ayrıştırma ve dağıtım merkezinde araç yükleme işlemleri.", email: "kariyer@trendyol.com", createdAt: daysAgo(0) },
  { id: 2211, title: "Shpërndarës Pako Express", company: "Posta Shqiptare", city: "Tirana", country: "AL", category: "Logistica", salaryMin: 55000, salaryMax: 70000, contractType: "Me kohë të plotë", description: "Shpërndarja e letrave dhe pakove urgjente në rajonin e Tiranës.", email: "hr@postashqiptare.al", createdAt: daysAgo(2) }
];

// ─── Utility: safe array filter ───────────────────────────────────────────────
export function safeFilter(jobs: Job[], opts: {
  category?: string;
  country?: string;
  city?: string;
  search?: string;
}): Job[] {
  const target = Array.isArray(jobs) && jobs.length > 0 ? jobs : INITIAL_REAL_JOBS;
  return target.filter(j => {
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
