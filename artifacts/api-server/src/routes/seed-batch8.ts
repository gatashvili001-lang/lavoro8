import { Router } from "express";
import { db, jobsTable } from "@workspace/db";

const router = Router();

const SEED_SECRET = "batch8seed2026";

function makeDesc(title: string, company: string, city: string, email: string, contract: string): string {
  return `${company} è alla ricerca di ${title} per la nostra sede di ${city}.\n\n` +
    `Contratto: ${contract}.\n\n` +
    `Requisiti: esperienza nel settore preferibile, motivazione e disponibilità immediata. ` +
    `Offriamo ambiente di lavoro professionale, formazione iniziale e possibilità di crescita.\n\n` +
    `📩 Invia il tuo CV direttamente a: ${email}`;
}

function makeDescEn(title: string, company: string, city: string, email: string, contract: string): string {
  return `${company} is looking for a ${title} at our ${city} location.\n\n` +
    `Contract: ${contract}.\n\n` +
    `Requirements: relevant experience preferred, motivation and immediate availability. ` +
    `We offer a professional work environment, initial training, and career growth opportunities.\n\n` +
    `📩 Send your CV directly to: ${email}`;
}

const allJobs: Array<{ j: any; country: string; lang: "it" | "en" }> = [
  // Italy
  ...([
    { title: "Addetto Magazzino Notturno", city: "Milano", company: "Ceva Logistics Italia S.r.l.", cat: "Magazzino", min: 1400, max: 1750, email: "jobs.it@cevalogistics.com", contract: "Tempo determinato" },
    { title: "Operatore di Picking", city: "Piacenza", company: "XPO Logistics Italia S.r.l.", cat: "Magazzino", min: 1350, max: 1650, email: "recruiting.it@xpo.com", contract: "Tempo determinato" },
    { title: "Carrellista Muletto Frontale", city: "Torino", company: "Arvato Supply Chain Solutions S.r.l.", cat: "Magazzino", min: 1450, max: 1800, email: "lavoro@arvato.it", contract: "Tempo indeterminato" },
    { title: "Addetto Magazzino Farmaceutico", city: "Sesto San Giovanni", company: "Farmactual S.r.l.", cat: "Magazzino", min: 1500, max: 1900, email: "hr@farmactual.it", contract: "Tempo indeterminato" },
    { title: "Magazziniere Catena Freddo", city: "Bologna", company: "Lidl Italia S.r.l.", cat: "Magazzino", min: 1400, max: 1700, email: "magazzino.bo@lidl.it", contract: "Tempo determinato" },
    { title: "Operatore di Magazzino Serale", city: "Ancona", company: "BRT Corriere Espresso S.p.A.", cat: "Magazzino", min: 1300, max: 1600, email: "lavoro.ancona@brt.it", contract: "Tempo determinato" },
    { title: "Addetto Scaffalista Supermercato", city: "Palermo", company: "Conad Sicilia S.c.a.r.l.", cat: "Magazzino", min: 1100, max: 1400, email: "lavoro@conad-sicilia.it", contract: "Part-time" },
    { title: "Addetto Controllo Qualità Magazzino", city: "Verona", company: "Panalpina S.p.A.", cat: "Magazzino", min: 1450, max: 1800, email: "jobs@panalpina.it", contract: "Tempo indeterminato" },
    { title: "Autista Furgone Patente B", city: "Roma", company: "Amazon Logistics S.r.l.", cat: "Logistica", min: 1500, max: 1950, email: "drivers.rome@amazon.com", contract: "Tempo determinato" },
    { title: "Autista Camion con CE", city: "Bari", company: "Italscania Trasporti S.r.l.", cat: "Logistica", min: 1800, max: 2300, email: "autisti@italscania.it", contract: "Tempo indeterminato" },
    { title: "Pianificatore Logistico", city: "Milano", company: "Maersk Italia S.r.l.", cat: "Logistica", min: 1900, max: 2400, email: "jobs.italy@maersk.com", contract: "Tempo indeterminato" },
    { title: "Addetto Sdoganamento", city: "Genova", company: "Spedmar S.r.l.", cat: "Logistica", min: 1550, max: 2000, email: "hr@spedmar.it", contract: "Tempo indeterminato" },
    { title: "Rider Moto per Consegne Veloci", city: "Roma", company: "Gorillas Technologies S.r.l.", cat: "Rider", min: 1100, max: 1500, email: "riders.rome@getgorillas.com", contract: "Autonomo" },
    { title: "Fattorino Scooter Turno Serale", city: "Napoli", company: "Deliveroo Italy S.r.l.", cat: "Rider", min: 1050, max: 1400, email: "riders.naples@deliveroo.it", contract: "Autonomo" },
    { title: "Corriere E-commerce", city: "Torino", company: "BRT Corriere Espresso S.p.A.", cat: "Rider", min: 1200, max: 1550, email: "riders.to@brt.it", contract: "Tempo determinato" },
    { title: "Cuoco Esperto Cucina Italiana", city: "Firenze", company: "Buca Mario S.r.l.", cat: "Ristorante", min: 1400, max: 1900, email: "chef@bucamario.it", contract: "Tempo indeterminato" },
    { title: "Pizzaiolo Qualificato", city: "Napoli", company: "Sorbillo Lievito Madre S.r.l.", cat: "Ristorante", min: 1500, max: 2100, email: "lavoro@sorbillo.it", contract: "Tempo indeterminato" },
    { title: "Cameriere/a Turno Pranzo", city: "Roma", company: "Eataly Roma S.r.l.", cat: "Ristorante", min: 1200, max: 1600, email: "jobs.roma@eataly.it", contract: "Part-time" },
    { title: "Addetto Bar e Caffetteria", city: "Milano", company: "Caffè Vergnano S.p.A.", cat: "Ristorante", min: 1250, max: 1600, email: "lavoro@caffevergnano.com", contract: "Tempo determinato" },
    { title: "Chef de Cuisine", city: "Milano", company: "Rosewood Hotel Milano S.r.l.", cat: "Ristorante", min: 2500, max: 3500, email: "hr.milan@rosewoodhotels.com", contract: "Tempo indeterminato" },
    { title: "Lavapiatti Turno Notte", city: "Bologna", company: "Roadhouse Restaurant S.r.l.", cat: "Ristorante", min: 1150, max: 1400, email: "lavoro.bo@roadhouse.it", contract: "Part-time" },
    { title: "Responsabile di Sala", city: "Venezia", company: "Cipriani Hotel Group S.r.l.", cat: "Ristorante", min: 1700, max: 2200, email: "jobs@hotelcipriani.com", contract: "Tempo indeterminato" },
    { title: "Receptionist Turno Notte", city: "Milano", company: "Radisson Blu Hotel Milano", cat: "Hotel", min: 1400, max: 1800, email: "jobs.milan@radissonhotels.com", contract: "Tempo indeterminato" },
    { title: "Housekeeping Supervisor", city: "Roma", company: "JW Marriott Rome S.r.l.", cat: "Hotel", min: 1500, max: 2000, email: "hr.rome@marriott.com", contract: "Tempo indeterminato" },
    { title: "Concierge Hotel Lusso", city: "Venezia", company: "The Gritti Palace S.r.l.", cat: "Hotel", min: 1600, max: 2100, email: "jobs@thegrittipalace.com", contract: "Stagionale" },
    { title: "Barman / Bartender Hotel", city: "Firenze", company: "Hotel Continentale S.r.l.", cat: "Hotel", min: 1400, max: 1850, email: "hr@lungarnohotels.com", contract: "Stagionale" },
    { title: "Addetto Piani (Camera)", city: "Rimini", company: "Club Hotel Riccione S.r.l.", cat: "Hotel", min: 1200, max: 1550, email: "lavoro@clubhotelriccione.it", contract: "Stagionale" },
    { title: "Guest Relations Manager", city: "Roma", company: "St. Regis Rome S.r.l.", cat: "Hotel", min: 1900, max: 2500, email: "jobs.rome@stregis.com", contract: "Tempo indeterminato" },
    { title: "Cameriere ai Piani", city: "Napoli", company: "Grand Hotel Vesuvio S.r.l.", cat: "Hotel", min: 1250, max: 1650, email: "lavoro@vesuvio.it", contract: "Stagionale" },
    { title: "Assistente Familiare Anziani", city: "Torino", company: "Confcooperative Piemonte", cat: "Badante", min: 1000, max: 1400, email: "assistenti@confcooppiemonte.it", contract: "Tempo indeterminato" },
    { title: "Badante Parziale Diurna", city: "Milano", company: "Cooperativa Sociale San Francesco", cat: "Badante", min: 950, max: 1300, email: "lavoro@coopsanfrancesco.it", contract: "Part-time" },
    { title: "OSS - Operatore Socio Sanitario", city: "Roma", company: "Fondazione Don Gnocchi Onlus", cat: "Badante", min: 1350, max: 1750, email: "lavoro@dongnocchi.it", contract: "Tempo indeterminato" },
    { title: "Assistente Disabili a Domicilio", city: "Bologna", company: "Cooperativa CAAD S.c.a.r.l.", cat: "Badante", min: 1100, max: 1450, email: "selezione@caad.it", contract: "Tempo determinato" },
    { title: "Colf Tempo Pieno", city: "Milano", company: "Privato (Zona Brera)", cat: "Colf", min: 1000, max: 1300, email: "colf.brera@privatofamiglia.it", contract: "Tempo indeterminato" },
    { title: "Collaboratrice Domestica Part-time", city: "Roma", company: "Privato (Parioli)", cat: "Colf", min: 800, max: 1100, email: "colf.parioli@familiaservizi.it", contract: "Part-time" },
    { title: "Baby-sitter Pomeridiana", city: "Milano", company: "Babysitter.it S.r.l.", cat: "Baby-sitter", min: 900, max: 1250, email: "lavoro@babysitter.it", contract: "Part-time" },
    { title: "Nanny Qualificata per Neonato", city: "Torino", company: "Angeli Custodi S.r.l.", cat: "Baby-sitter", min: 1100, max: 1500, email: "nanny@angelicustodi.it", contract: "Tempo indeterminato" },
    { title: "Baby-sitter Estate 2025", city: "Brescia", company: "Happy Kids S.r.l.", cat: "Baby-sitter", min: 900, max: 1200, email: "estate@happykids-bs.it", contract: "Stagionale" },
    { title: "Elettricista Qualificato", city: "Milano", company: "Elettra Impianti S.r.l.", cat: "Edilizia", min: 1600, max: 2200, email: "lavoro@elettraimpianti.it", contract: "Tempo indeterminato" },
    { title: "Idraulico / Termoidraulico", city: "Roma", company: "Romani Impianti S.r.l.", cat: "Edilizia", min: 1550, max: 2100, email: "hr@romaniimpianti.it", contract: "Tempo indeterminato" },
    { title: "Operaio Specializzato Ponteggi", city: "Venezia", company: "Stabili Lavori S.r.l.", cat: "Edilizia", min: 1500, max: 2000, email: "sicurezza@stabililavori.it", contract: "Tempo determinato" },
    { title: "Operatore Gruista", city: "Torino", company: "Grandi Lavori Fincosit S.p.A.", cat: "Edilizia", min: 1700, max: 2200, email: "assunzioni@fincosit.it", contract: "Tempo indeterminato" },
    { title: "Pittore Edile / Imbianchino", city: "Napoli", company: "Colori Sud S.r.l.", cat: "Edilizia", min: 1350, max: 1750, email: "lavoro@colorisud.it", contract: "Tempo determinato" },
    { title: "Raccoglitore Uva Stagionale", city: "Asti", company: "Cantine Marchesi di Barolo S.p.A.", cat: "Agricoltura", min: 1150, max: 1500, email: "stagionali@marchesibarolo.com", contract: "Stagionale" },
    { title: "Operaio Olivicolo", city: "Bari", company: "Oleificio Cooperativo Pugliese", cat: "Agricoltura", min: 1100, max: 1450, email: "lavoro@olivopugliese.it", contract: "Stagionale" },
    { title: "Giardiniere / Manutentore Verde", city: "Firenze", company: "Verde Toscana S.r.l.", cat: "Agricoltura", min: 1200, max: 1600, email: "lavoro@verdetoscana.it", contract: "Tempo indeterminato" },
    { title: "Addetto Pulizie Ospedaliere", city: "Milano", company: "Rekeep S.p.A.", cat: "Altro", min: 1200, max: 1500, email: "selezione@rekeep.com", contract: "Part-time" },
    { title: "Operatore Lavanderia Industriale", city: "Napoli", company: "Initial Textile Service S.r.l.", cat: "Altro", min: 1150, max: 1450, email: "lavoro@initial.it", contract: "Tempo determinato" },
    { title: "Animatore Turistico Estate", city: "Catania", company: "Club Med Italia S.r.l.", cat: "Altro", min: 1200, max: 1600, email: "animatori@clubmed.it", contract: "Stagionale" },
  ] as any[]).map(j => ({ j, country: "IT", lang: "it" as const })),
  // Germany
  ...([
    { title: "Schichtleiter Lager (m/w/d)", city: "München", company: "Zalando SE", cat: "Magazzino", min: 2800, max: 3500, email: "jobs@zalando.de", contract: "Vollzeit" },
    { title: "Fahrer (B-Führerschein)", city: "Hamburg", company: "GLS Germany GmbH", cat: "Logistica", min: 2200, max: 2800, email: "bewerbung@gls-group.eu", contract: "Vollzeit" },
    { title: "Koch / Köchin", city: "Frankfurt am Main", company: "Compass Group Deutschland GmbH", cat: "Ristorante", min: 2000, max: 2600, email: "bewerbung@compass-group.de", contract: "Vollzeit" },
    { title: "Hotelfachkraft (m/w/d)", city: "München", company: "Bayerischer Hof GmbH", cat: "Hotel", min: 2400, max: 3100, email: "jobs@bayerischerhof.de", contract: "Vollzeit" },
    { title: "Haushaltshilfe", city: "Berlin", company: "Helpling GmbH", cat: "Colf", min: 1800, max: 2300, email: "jobs@helpling.de", contract: "Minijob" },
    { title: "Kinderbetreuer/in", city: "Köln", company: "Kinderland GmbH", cat: "Baby-sitter", min: 1900, max: 2500, email: "jobs@kinderland-koeln.de", contract: "Teilzeit" },
    { title: "Elektriker / Elektroniker", city: "Stuttgart", company: "Bosch Service Solutions GmbH", cat: "Edilizia", min: 2800, max: 3600, email: "karriere@bosch.de", contract: "Vollzeit" },
    { title: "Saisonkraft Landwirtschaft", city: "Rostock", company: "Agraset GmbH", cat: "Agricoltura", min: 1700, max: 2200, email: "saison@agraset.de", contract: "Saison" },
    { title: "Reinigungsfachkraft Schiene", city: "Berlin", company: "Gegenbauer Services GmbH", cat: "Altro", min: 1800, max: 2400, email: "jobs@gegenbauer.de", contract: "Vollzeit" },
  ] as any[]).map(j => ({ j, country: "DE", lang: "en" as const })),
  // France
  ...([
    { title: "Préparateur logistique nuit", city: "Lyon", company: "FM Logistic France S.A.S.", cat: "Magazzino", min: 1900, max: 2500, email: "emploi@fmlogistic.com", contract: "CDI" },
    { title: "Chauffeur PL (C)", city: "Marseille", company: "Gefco S.A.", cat: "Logistica", min: 2300, max: 2900, email: "emploi@gefco.net", contract: "CDI" },
    { title: "Cuisinier(e) collectivité", city: "Bordeaux", company: "API Restauration SAS", cat: "Ristorante", min: 1800, max: 2300, email: "jobs@api-restauration.fr", contract: "CDI" },
    { title: "Réceptionniste nuit", city: "Toulouse", company: "Louvre Hotels Group S.A.S.", cat: "Hotel", min: 1800, max: 2300, email: "emploi@louvrehotels.com", contract: "CDI" },
    { title: "Auxiliaire de vie à domicile", city: "Nantes", company: "Azaé Groupe A2micile S.A.S.", cat: "Badante", min: 1700, max: 2200, email: "recrutement@azae.fr", contract: "CDI" },
    { title: "Maçon coffreur-boiseur", city: "Paris", company: "Bouygues Construction S.A.", cat: "Edilizia", min: 2200, max: 2900, email: "emploi@bouygues-construction.com", contract: "CDI" },
    { title: "Ramasseur fruits (saisonnier)", city: "Perpignan", company: "Fruidor S.A.", cat: "Agricoltura", min: 1500, max: 1950, email: "saison@fruidor.fr", contract: "Saisonnier" },
  ] as any[]).map(j => ({ j, country: "FR", lang: "en" as const })),
  // Spain
  ...([
    { title: "Mozo de almacén turno noche", city: "Madrid", company: "Amazon España S.L.", cat: "Magazzino", min: 1150, max: 1500, email: "jobs.es@amazon.com", contract: "Temporal" },
    { title: "Conductor furgoneta reparto", city: "Barcelona", company: "Correos Express S.L.", cat: "Logistica", min: 1200, max: 1600, email: "empleo@correosexpress.com", contract: "Indefinido" },
    { title: "Cocinero/a hotel 4*", city: "Tenerife", company: "Iberostar Hotels & Resorts S.L.", cat: "Ristorante", min: 1200, max: 1650, email: "empleo@iberostar.com", contract: "Fijo Discontinuo" },
    { title: "Animador/a turístico", city: "Palma de Mallorca", company: "Club Palma Beach S.L.", cat: "Hotel", min: 1100, max: 1500, email: "rrhh@clubpalmabeach.com", contract: "Temporal" },
    { title: "Peón agrícola invernadero", city: "Murcia", company: "Grupo Agroponiente S.A.", cat: "Agricoltura", min: 950, max: 1300, email: "seleccion@agroponiente.com", contract: "Temporal" },
    { title: "Albañil / Oficial de primera", city: "Valencia", company: "Construcciones Alquería S.L.", cat: "Edilizia", min: 1400, max: 1900, email: "obra@alqueria-construcciones.es", contract: "Obra y servicio" },
  ] as any[]).map(j => ({ j, country: "ES", lang: "en" as const })),
  // UK
  ...([
    { title: "Night Shift Warehouse Picker", city: "London", company: "Wincanton plc", cat: "Magazzino", min: 1900, max: 2500, email: "jobs@wincanton.co.uk", contract: "Full-time" },
    { title: "HGV Class 2 Driver", city: "Birmingham", company: "Eddie Stobart Ltd", cat: "Logistica", min: 2500, max: 3200, email: "drivers@eddiestobart.co.uk", contract: "Full-time" },
    { title: "Sous Chef", city: "London", company: "Hawksmoor Ltd", cat: "Ristorante", min: 2500, max: 3200, email: "jobs@thehawksmoor.com", contract: "Full-time" },
    { title: "Front Desk Agent", city: "London", company: "Mandarin Oriental Hyde Park", cat: "Hotel", min: 2200, max: 2800, email: "jobs@mohg.com", contract: "Full-time" },
    { title: "Support Worker (Elderly)", city: "Manchester", company: "HC-One Ltd", cat: "Badante", min: 1900, max: 2500, email: "jobs@hc-one.co.uk", contract: "Full-time" },
    { title: "Electrician (18th Edition)", city: "London", company: "Skanska UK plc", cat: "Edilizia", min: 3000, max: 4000, email: "jobs@skanska.co.uk", contract: "Contract" },
    { title: "Farmhand / General Operative", city: "Cambridge", company: "G's Fresh Ltd", cat: "Agricoltura", min: 1700, max: 2200, email: "jobs@gsfresh.com", contract: "Seasonal" },
  ] as any[]).map(j => ({ j, country: "GB", lang: "en" as const })),
  // Switzerland
  ...([
    { title: "Lagerleiter/in", city: "Zürich", company: "Migros Genossenschaft AG", cat: "Magazzino", min: 5500, max: 6800, email: "jobs@migros.ch", contract: "Vollzeit" },
    { title: "Sous-chef de cuisine", city: "Genève", company: "Hôtel de la Paix Genève S.A.", cat: "Ristorante", min: 5000, max: 6500, email: "rh@hoteldelapaix.ch", contract: "Temps plein" },
    { title: "Réceptionniste Hôtel Palace", city: "Lausanne", company: "Lausanne Palace & Spa S.A.", cat: "Hotel", min: 4800, max: 6000, email: "jobs@lausanne-palace.ch", contract: "Temps plein" },
    { title: "Pflegefachmann/-frau HF", city: "Basel", company: "Kantonsspital Basel AG", cat: "Badante", min: 5500, max: 6800, email: "jobs@ksb.ch", contract: "Vollzeit" },
    { title: "Zimmermann / Schreiner", city: "Bern", company: "Losinger Marazzi AG", cat: "Edilizia", min: 5800, max: 7200, email: "jobs@losinger-marazzi.ch", contract: "Vollzeit" },
  ] as any[]).map(j => ({ j, country: "CH", lang: "en" as const })),
  // Netherlands
  ...([
    { title: "Orderpicker nachtdienst", city: "Rotterdam", company: "PostNL B.V.", cat: "Magazzino", min: 2100, max: 2700, email: "vacatures@postnl.nl", contract: "Fulltime" },
    { title: "Verpleegkundige thuiszorg", city: "Utrecht", company: "Buurtzorg Nederland B.V.", cat: "Badante", min: 2400, max: 3100, email: "vacatures@buurtzorg.nl", contract: "Parttime" },
    { title: "Bezorger (e-bike)", city: "Amsterdam", company: "Picnic B.V.", cat: "Rider", min: 1900, max: 2500, email: "jobs@picnic.app", contract: "Parttime" },
    { title: "Metselaar / Timmerman", city: "Eindhoven", company: "VolkerWessels N.V.", cat: "Edilizia", min: 2600, max: 3400, email: "werk@volkerwessels.com", contract: "Fulltime" },
  ] as any[]).map(j => ({ j, country: "NL", lang: "en" as const })),
  // Belgium
  ...([
    { title: "Heftruck chauffeur", city: "Gent", company: "bpost N.V.", cat: "Magazzino", min: 2200, max: 2900, email: "jobs@bpost.be", contract: "Voltijds" },
    { title: "Infirmier(e) à domicile", city: "Liège", company: "Groupe Sodexo Belgique S.A.", cat: "Badante", min: 2100, max: 2800, email: "emploi.be@sodexo.com", contract: "Temps partiel" },
    { title: "Cuisinier(e) industriel(le)", city: "Bruxelles", company: "Eurest Belgium S.A.", cat: "Ristorante", min: 2000, max: 2600, email: "emploi@eurest.be", contract: "CDI" },
  ] as any[]).map(j => ({ j, country: "BE", lang: "en" as const })),
  // Austria
  ...([
    { title: "Lagerarbeiter/in Nacht", city: "Wien", company: "Rewe International AG", cat: "Magazzino", min: 1900, max: 2500, email: "jobs@rewe.at", contract: "Vollzeit" },
    { title: "Pflegeassistenz (m/w/d)", city: "Innsbruck", company: "LKH Innsbruck AG", cat: "Badante", min: 2100, max: 2700, email: "jobs@lkh-innsbruck.at", contract: "Vollzeit" },
    { title: "Küchenchef / Souschef", city: "Wien", company: "Palais Hansen Kempinski GmbH", cat: "Ristorante", min: 2400, max: 3200, email: "jobs.vienna@kempinski.com", contract: "Vollzeit" },
    { title: "Baupolier Hochbau", city: "Graz", company: "Porr AG Österreich", cat: "Edilizia", min: 2400, max: 3100, email: "karriere@porr.at", contract: "Vollzeit" },
  ] as any[]).map(j => ({ j, country: "AT", lang: "en" as const })),
  // Ireland
  ...([
    { title: "Warehouse Team Lead", city: "Dublin", company: "Lidl Ireland GmbH", cat: "Magazzino", min: 2300, max: 3000, email: "jobs.ie@lidl.com", contract: "Full-time" },
    { title: "Delivery Driver (Van)", city: "Cork", company: "DPD Ireland Ltd", cat: "Logistica", min: 2100, max: 2700, email: "drivers@dpd.ie", contract: "Full-time" },
    { title: "Senior Carer", city: "Galway", company: "Mowlam Healthcare Ltd", cat: "Badante", min: 2100, max: 2700, email: "careers@mowlamhealthcare.ie", contract: "Full-time" },
    { title: "Sous Chef", city: "Dublin", company: "Brasserie Sixty6 Ltd", cat: "Ristorante", min: 2400, max: 3200, email: "jobs@brasseriesixty6.ie", contract: "Full-time" },
  ] as any[]).map(j => ({ j, country: "IE", lang: "en" as const })),
  // Portugal
  ...([
    { title: "Operador de Armazém Noturno", city: "Lisboa", company: "DHL Express Portugal Lda.", cat: "Magazzino", min: 1000, max: 1350, email: "jobs.pt@dhl.com", contract: "Contrato" },
    { title: "Cozinheiro/a de Turno", city: "Porto", company: "Bom Sucesso Restaurants Lda.", cat: "Ristorante", min: 950, max: 1300, email: "emprego@bomsucesso.pt", contract: "Sem termo" },
    { title: "Auxiliar de Geriatria", city: "Lisboa", company: "Santa Casa da Misericórdia", cat: "Badante", min: 1050, max: 1400, email: "rh@scml.pt", contract: "Sem termo" },
    { title: "Motorista de Distribuição", city: "Braga", company: "Rangel Logistics Solutions S.A.", cat: "Logistica", min: 1100, max: 1500, email: "rh@rangel.pt", contract: "Sem termo" },
  ] as any[]).map(j => ({ j, country: "PT", lang: "en" as const })),
  // Poland
  ...([
    { title: "Magazynier nocna zmiana", city: "Warszawa", company: "Amazon Fulfillment Sp. z o.o.", cat: "Magazzino", min: 6000, max: 7500, email: "jobs.pl@amazon.com", contract: "Umowa o pracę" },
    { title: "Kierowca kat. C+E", city: "Łódź", company: "DHL Parcel Polska Sp. z o.o.", cat: "Logistica", min: 8000, max: 10000, email: "praca@dhlparcel.pl", contract: "Umowa o pracę" },
    { title: "Kucharz restauracji hotelowej", city: "Gdańsk", company: "Hilton Hotels Polska Sp. z o.o.", cat: "Ristorante", min: 5500, max: 7000, email: "jobs.pl@hilton.com", contract: "Umowa o pracę" },
    { title: "Pracownik budowlany", city: "Kraków", company: "Budimex S.A.", cat: "Edilizia", min: 6000, max: 8000, email: "praca@budimex.pl", contract: "Umowa o pracę" },
  ] as any[]).map(j => ({ j, country: "PL", lang: "en" as const })),
];

router.post("/admin/seed-batch8", async (req, res) => {
  const secret = req.headers["x-seed-secret"] || req.query.secret;
  if (secret !== SEED_SECRET) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    let count = 0;
    for (const { j, country, lang } of allJobs) {
      const desc = lang === "it"
        ? makeDesc(j.title, j.company, j.city, j.email, j.contract)
        : makeDescEn(j.title, j.company, j.city, j.email, j.contract);

      await db.insert(jobsTable).values({
        title: j.title,
        city: j.city,
        country,
        category: j.cat,
        salaryMin: j.min,
        salaryMax: j.max,
        description: desc,
        company: j.company,
        contractType: j.contract,
        featured: false,
      });
      count++;
    }
    res.json({ success: true, inserted: count });
  } catch (err: any) {
    console.error("seed-batch8 error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
