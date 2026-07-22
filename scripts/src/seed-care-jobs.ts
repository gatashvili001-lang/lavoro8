import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { jobsTable } from "../../lib/db/src/schema/jobs.js";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const CARE_JOBS = [
  // ─── BADANTE — ITALIA ───
  {
    title: "Badante Convivente per Anziana Autosufficiente",
    company: "Famiglia privata — Milano",
    city: "Milano",
    country: "IT",
    category: "Badante",
    salaryMin: 1100,
    salaryMax: 1350,
    contractType: "Tempo indeterminato",
    description: `Famiglia a Milano cerca badante convivente per assistere signora anziana autosufficiente (86 anni).

Mansioni:
• Compagnia e supervisione durante la giornata
• Preparazione pasti semplici
• Piccole pulizie domestiche
• Accompagnamento a visite mediche e passeggiate

Requisiti:
• Esperienza pregressa con anziani (preferibile)
• Referenze verificabili
• Documenti di lavoro regolari
• Buona conoscenza dell'italiano parlato

Offriamo:
• Vitto e alloggio in camera singola
• Contratto regolare con contributi INPS
• 1 giorno e mezzo di riposo settimanale
• Tredicesima mensilità`,
  },
  {
    title: "Badante Ore Diurne per Signore con Alzheimer",
    company: "Famiglia privata — Roma",
    city: "Roma",
    country: "IT",
    category: "Badante",
    salaryMin: 900,
    salaryMax: 1150,
    contractType: "Part-time",
    description: `Cerchiamo badante ad ore (8:00-18:00, dal lunedì al venerdì) per assistenza a signore affetto da Alzheimer in fase iniziale, zona Roma EUR.

Mansioni:
• Assistenza nelle attività quotidiane
• Stimolazione cognitiva e compagnia
• Somministrazione farmaci secondo prescrizione
• Gestione piccole emergenze

Requisiti:
• Esperienza documentata con patologie neurodegenerative
• Corso base di assistenza (titolo preferenziale)
• Pazienza e affidabilità
• Permesso di soggiorno regolare

Offriamo:
• Retribuzione netta mensile
• Contratto CCNL colf e badanti
• Formazione continua a carico della famiglia`,
  },
  {
    title: "Badante Notturna Ospedale/Domicilio",
    company: "Cooperativa Sociale Assistenza Serena",
    city: "Torino",
    country: "IT",
    category: "Badante",
    salaryMin: 1000,
    salaryMax: 1300,
    contractType: "Tempo determinato",
    description: `Cooperativa sociale cerca assistenti per turni notturni (21:00-07:00) presso domicili e strutture convenzionate a Torino e provincia.

Mansioni:
• Assistenza notturna a persone non autosufficienti
• Mobilizzazione e cambio posizione
• Igiene personale
• Monitoraggio parametri vitali di base

Requisiti:
• Esperienza in ambito assistenziale
• Disponibilità a turni notturni
• Automunito/a preferibile
• Documenti in regola

Offriamo:
• Contratto tramite cooperativa con tutte le tutele
• Turni fissi o a rotazione secondo disponibilità
• Formazione gratuita all'ingresso`,
  },
  {
    title: "Badante Fine Settimana",
    company: "Famiglia privata — Napoli",
    city: "Napoli",
    country: "IT",
    category: "Badante",
    salaryMin: 400,
    salaryMax: 550,
    contractType: "Part-time",
    description: `Famiglia a Napoli cerca badante per il weekend (sabato e domenica, 8 ore/giorno) per assistenza a signora anziana parzialmente non autosufficiente.

Mansioni:
• Aiuto nella deambulazione
• Preparazione pasti
• Compagnia e attività ricreative leggere
• Piccole commissioni

Requisiti:
• Esperienza con persone anziane
• Disponibilità fissa nei weekend
• Referenze

Offriamo:
• Pagamento settimanale
• Possibilità di aumento ore in futuro`,
  },

  // ─── COLF — ITALIA ───
  {
    title: "Colf per Pulizie e Gestione Casa",
    company: "Famiglia privata — Firenze",
    city: "Firenze",
    country: "IT",
    category: "Colf",
    salaryMin: 800,
    salaryMax: 1000,
    contractType: "Part-time",
    description: `Famiglia a Firenze cerca collaboratrice domestica (colf) per 20 ore settimanali, orari flessibili da concordare.

Mansioni:
• Pulizia generale dell'abitazione
• Stiro e cura del bucato
• Gestione della spesa e piccole commissioni
• Preparazione pasti semplici occasionalmente

Requisiti:
• Esperienza pregressa come colf
• Precisione e affidabilità
• Documenti di lavoro regolari

Offriamo:
• Retribuzione oraria concorrenziale
• Contratto regolare CCNL colf
• Possibilità di aumentare le ore`,
  },
  {
    title: "Collaboratrice Domestica Convivente",
    company: "Famiglia privata — Bologna",
    city: "Bologna",
    country: "IT",
    category: "Colf",
    salaryMin: 1000,
    salaryMax: 1200,
    contractType: "Tempo indeterminato",
    description: `Famiglia numerosa a Bologna cerca colf convivente per la gestione completa della casa.

Mansioni:
• Pulizia e ordine della casa
• Bucato e stiro
• Preparazione pranzo e cena per la famiglia
• Gestione dispensa e spesa settimanale

Requisiti:
• Esperienza comprovata in ruoli simili
• Capacità organizzative
• Referenze verificabili

Offriamo:
• Vitto e alloggio incluso
• Stipendio netto mensile
• Contratto regolare con ferie e tredicesima`,
  },
  {
    title: "Colf Ore Serali",
    company: "Famiglia privata — Verona",
    city: "Verona",
    country: "IT",
    category: "Colf",
    salaryMin: 500,
    salaryMax: 700,
    contractType: "Part-time",
    description: `Cerchiamo colf per servizio serale (17:00-20:00, dal lunedì al venerdì) a Verona centro.

Mansioni:
• Pulizia cucina e zone comuni
• Preparazione cena semplice
• Gestione lavastoviglie e riordino

Requisiti:
• Puntualità e serietà
• Esperienza minima in ambito domestico

Offriamo:
• Pagamento mensile puntuale
• Ambiente familiare e tranquillo`,
  },

  // ─── BABY-SITTER — ITALIA ───
  {
    title: "Baby-sitter per Bambini 3 e 6 Anni",
    company: "Famiglia privata — Milano",
    city: "Milano",
    country: "IT",
    category: "Baby-sitter",
    salaryMin: 700,
    salaryMax: 950,
    contractType: "Part-time",
    description: `Famiglia a Milano cerca baby-sitter per due bambini (3 e 6 anni), dal lunedì al venerdì 16:00-19:30.

Mansioni:
• Ritiro da scuola/asilo
• Supervisione durante i compiti
• Attività ludiche e ricreative
• Preparazione merenda

Requisiti:
• Esperienza con bambini piccoli
• Referenze verificabili
• Pazienza e responsabilità

Offriamo:
• Pagamento mensile regolare
• Orario fisso e stabile
• Ambiente familiare accogliente`,
  },
  {
    title: "Tata a Tempo Pieno per Neonato",
    company: "Famiglia privata — Roma",
    city: "Roma",
    country: "IT",
    category: "Baby-sitter",
    salaryMin: 1100,
    salaryMax: 1400,
    contractType: "Tempo indeterminato",
    description: `Famiglia a Roma cerca tata esperta per l'accudimento di un neonato (6 mesi), full-time dal lunedì al venerdì.

Mansioni:
• Cura quotidiana del bambino (pappe, bagnetto, nanna)
• Stimolazione sensoriale e gioco
• Piccole faccende legate al bambino
• Comunicazione quotidiana con i genitori

Requisiti:
• Esperienza documentata con neonati
• Corso di primo soccorso pediatrico (preferibile)
• Referenze solide

Offriamo:
• Contratto regolare CCNL colf/babysitter
• Stipendio competitivo
• Buoni pasto`,
  },
  {
    title: "Baby-sitter Occasionale per Serate",
    company: "Famiglia privata — Torino",
    city: "Torino",
    country: "IT",
    category: "Baby-sitter",
    salaryMin: 8,
    salaryMax: 12,
    contractType: "Occasionale",
    description: `Cerchiamo baby-sitter disponibile per serate occasionali (weekend inclusi) per bambini di 4 e 8 anni a Torino.

Mansioni:
• Supervisione serale dei bambini
• Preparazione per la nanna
• Attività tranquille prima di dormire

Requisiti:
• Disponibilità flessibile
• Esperienza con bambini
• Affidabilità e puntualità

Offriamo:
• Pagamento a ora, in contanti o bonifico
• Preavviso concordato per ogni chiamata`,
  },

  // ─── BADANTE — EUROPA ───
  {
    title: "Altenpflegerin / Betreuungskraft (Live-in)",
    company: "Privatfamilie — München",
    city: "München",
    country: "DE",
    category: "Badante",
    salaryMin: 1400,
    salaryMax: 1800,
    contractType: "Unbefristet",
    description: `Eine Familie in München sucht eine Betreuungskraft für die Rundum-Betreuung einer älteren Person (Live-in, 24-Stunden-Präsenz mit Ruhezeiten).

Aufgaben:
• Unterstützung im Alltag und bei der Körperpflege
• Zubereitung von Mahlzeiten
• Begleitung zu Arztterminen
• Gesellschaft leisten

Anforderungen:
• Erfahrung in der Altenpflege
• Grundkenntnisse Deutsch
• Gültige Arbeitserlaubnis

Wir bieten:
• Kost und Logis
• Geregelten Vertrag mit Sozialversicherung
• Freie Tage nach Vereinbarung`,
  },
  {
    title: "Aide à Domicile pour Personne Âgée",
    company: "Famille privée — Lyon",
    city: "Lyon",
    country: "FR",
    category: "Badante",
    salaryMin: 1300,
    salaryMax: 1600,
    contractType: "CDI",
    description: `Famille à Lyon recherche une aide à domicile pour accompagner une personne âgée en perte d'autonomie.

Missions:
• Aide aux gestes de la vie quotidienne
• Préparation des repas
• Accompagnement aux rendez-vous médicaux
• Présence et compagnie

Profil recherché:
• Expérience auprès de personnes âgées
• Diplôme d'aide-soignante apprécié
• Titre de séjour en règle

Nous offrons:
• Contrat CDI avec avantages sociaux
• Rémunération selon expérience
• Formation continue`,
  },
  {
    title: "Cuidadora Interna para Persona Mayor",
    company: "Familia privada — Madrid",
    city: "Madrid",
    country: "ES",
    category: "Badante",
    salaryMin: 1200,
    salaryMax: 1500,
    contractType: "Indefinido",
    description: `Familia en Madrid busca cuidadora interna para atender a una persona mayor con movilidad reducida.

Funciones:
• Apoyo en el aseo e higiene personal
• Preparación de comidas
• Acompañamiento a citas médicas
• Compañía y estimulación cognitiva

Requisitos:
• Experiencia demostrable en cuidado de mayores
• Permiso de trabajo en regla
• Referencias verificables

Ofrecemos:
• Alojamiento y manutención incluidos
• Contrato legal con seguridad social
• Días libres semanales`,
  },
  {
    title: "Home Carer for Elderly Client",
    company: "Private family — London",
    city: "London",
    country: "GB",
    category: "Badante",
    salaryMin: 1600,
    salaryMax: 2000,
    contractType: "Full-time",
    description: `A family in London is looking for a live-in carer for an elderly relative with limited mobility.

Responsibilities:
• Assistance with daily personal care
• Meal preparation
• Light housekeeping related to care duties
• Accompanying to medical appointments

Requirements:
• Previous experience in elderly care
• Valid right to work in the UK
• Good communication in English

We offer:
• Accommodation included
• Regular contract with pension contributions
• Paid time off`,
  },
  {
    title: "Betreuerin für Seniorin gesucht",
    company: "Privatfamilie — Wien",
    city: "Wien",
    country: "AT",
    category: "Badante",
    salaryMin: 1350,
    salaryMax: 1700,
    contractType: "Unbefristet",
    description: `Familie in Wien sucht eine erfahrene Betreuerin für eine Seniorin (24-Stunden-Betreuung im Wechselmodell).

Aufgaben:
• Unterstützung bei der täglichen Pflege
• Haushaltsführung im Zusammenhang mit der Betreuung
• Begleitung zu Terminen
• Freizeitgestaltung

Anforderungen:
• Erfahrung in der Seniorenbetreuung
• Deutschkenntnisse (Grundniveau)
• Gültige Papiere

Wir bieten:
• Unterkunft und Verpflegung
• Faire Bezahlung
• Geregelte Wechselzeiten`,
  },
  {
    title: "Badante per Anziano — Svizzera Italiana",
    company: "Famiglia privata — Lugano",
    city: "Lugano",
    country: "CH",
    category: "Badante",
    salaryMin: 2200,
    salaryMax: 2800,
    contractType: "Tempo indeterminato",
    description: `Famiglia a Lugano cerca badante convivente per assistenza a signore anziano con lieve demenza senile.

Mansioni:
• Assistenza quotidiana e sorveglianza
• Preparazione pasti
• Accompagnamento a visite mediche
• Gestione della routine giornaliera

Requisiti:
• Esperienza pregressa con anziani e demenza
• Permesso di lavoro per la Svizzera
• Referenze verificabili

Offriamo:
• Stipendio netto elevato secondo standard svizzeri
• Vitto e alloggio
• Contratto regolare con assicurazioni sociali`,
  },
  {
    title: "Cuidadora Interna — Lisboa",
    company: "Família privada — Lisboa",
    city: "Lisboa",
    country: "PT",
    category: "Badante",
    salaryMin: 900,
    salaryMax: 1150,
    contractType: "Efetivo",
    description: `Família em Lisboa procura cuidadora interna para acompanhar uma senhora idosa com autonomia reduzida.

Funções:
• Apoio na higiene pessoal
• Preparação de refeições
• Acompanhamento a consultas médicas
• Companhia e estímulo cognitivo

Requisitos:
• Experiência comprovada em cuidados a idosos
• Documentação de trabalho regularizada
• Referências

Oferecemos:
• Alojamento e alimentação incluídos
• Contrato regular com segurança social
• Dias de descanso semanais`,
  },

  // ─── COLF — EUROPA ───
  {
    title: "Haushaltshilfe Gesucht",
    company: "Privatfamilie — Frankfurt",
    city: "Frankfurt",
    country: "DE",
    category: "Colf",
    salaryMin: 1000,
    salaryMax: 1300,
    contractType: "Teilzeit",
    description: `Familie in Frankfurt sucht eine zuverlässige Haushaltshilfe für 15-20 Stunden pro Woche.

Aufgaben:
• Reinigung der Wohnung
• Wäsche und Bügeln
• Einkäufe und Besorgungen

Anforderungen:
• Erfahrung im Haushalt
• Zuverlässigkeit und Diskretion
• Gültige Arbeitserlaubnis

Wir bieten:
• Faire Stundenbezahlung
• Flexible Zeiteinteilung nach Absprache`,
  },
  {
    title: "Employée de Maison à Temps Partiel",
    company: "Famille privée — Paris",
    city: "Paris",
    country: "FR",
    category: "Colf",
    salaryMin: 900,
    salaryMax: 1200,
    contractType: "CDD",
    description: `Famille parisienne recherche une employée de maison pour l'entretien du logement, 4 jours par semaine.

Missions:
• Ménage et entretien général
• Repassage
• Petites courses

Profil:
• Expérience en tant qu'employée de maison
• Sérieux et ponctualité
• Titre de séjour en règle

Nous offrons:
• Rémunération nette mensuelle
• Contrat déclaré avec avantages sociaux`,
  },
  {
    title: "Empleada de Hogar por Horas",
    company: "Familia privada — Barcelona",
    city: "Barcelona",
    country: "ES",
    category: "Colf",
    salaryMin: 700,
    salaryMax: 950,
    contractType: "Parcial",
    description: `Familia en Barcelona busca empleada de hogar por horas para limpieza y mantenimiento del domicilio.

Funciones:
• Limpieza general de la vivienda
• Plancha y organización de armarios
• Compra semanal

Requisitos:
• Experiencia demostrable
• Permiso de trabajo en regla
• Referencias

Ofrecemos:
• Pago por horas competitivo
• Horario flexible a convenir`,
  },
  {
    title: "Housekeeper Needed",
    company: "Private family — Dublin",
    city: "Dublin",
    country: "IE",
    category: "Colf",
    salaryMin: 1100,
    salaryMax: 1400,
    contractType: "Part-time",
    description: `A family in Dublin is looking for a reliable housekeeper for 3 days a week.

Responsibilities:
• General house cleaning
• Laundry and ironing
• Grocery shopping and errands

Requirements:
• Previous housekeeping experience
• Trustworthy and punctual
• Legal right to work in Ireland

We offer:
• Competitive weekly pay
• Flexible schedule`,
  },

  // ─── BABY-SITTER — EUROPA ───
  {
    title: "Kinderbetreuerin Gesucht",
    company: "Privatfamilie — Berlin",
    city: "Berlin",
    country: "DE",
    category: "Baby-sitter",
    salaryMin: 900,
    salaryMax: 1200,
    contractType: "Teilzeit",
    description: `Familie in Berlin sucht eine Kinderbetreuerin für zwei Kinder (2 und 5 Jahre), nachmittags von Montag bis Freitag.

Aufgaben:
• Abholung von Kita/Schule
• Betreuung und Spielaktivitäten
• Vorbereitung von Snacks

Anforderungen:
• Erfahrung mit kleinen Kindern
• Geduld und Verantwortungsbewusstsein
• Referenzen

Wir bieten:
• Geregeltes monatliches Gehalt
• Feste, verlässliche Arbeitszeiten`,
  },
  {
    title: "Garde d'Enfants à Domicile",
    company: "Famille privée — Nice",
    city: "Nice",
    country: "FR",
    category: "Baby-sitter",
    salaryMin: 850,
    salaryMax: 1100,
    contractType: "CDI",
    description: `Famille à Nice recherche une garde d'enfants pour deux enfants (4 et 7 ans), du lundi au vendredi après l'école.

Missions:
• Sortie d'école et trajet retour
• Aide aux devoirs
• Activités ludiques

Profil recherché:
• Expérience avec des enfants en bas âge
• Sérieux, ponctualité et douceur
• Références vérifiables

Nous offrons:
• Salaire mensuel régulier
• Contrat déclaré (CESU)`,
  },
  {
    title: "Niñera para Gemelos",
    company: "Familia privada — Valencia",
    city: "Valencia",
    country: "ES",
    category: "Baby-sitter",
    salaryMin: 800,
    salaryMax: 1050,
    contractType: "Parcial",
    description: `Familia en Valencia busca niñera con experiencia para el cuidado de gemelos de 3 años, por las tardes.

Funciones:
• Cuidado y supervisión de los niños
• Actividades educativas y de juego
• Preparación de meriendas

Requisitos:
• Experiencia con niños pequeños, preferiblemente gemelos
• Paciencia y responsabilidad
• Referencias

Ofrecemos:
• Pago mensual estable
• Ambiente familiar cálido`,
  },
  {
    title: "Nanny for Toddler",
    company: "Private family — Amsterdam",
    city: "Amsterdam",
    country: "NL",
    category: "Baby-sitter",
    salaryMin: 1200,
    salaryMax: 1500,
    contractType: "Full-time",
    description: `A family in Amsterdam is looking for a full-time nanny for their 2-year-old toddler.

Responsibilities:
• Daily care and supervision
• Meal preparation for the child
• Educational play activities

Requirements:
• Proven childcare experience
• First aid certification (preferred)
• Legal right to work in the Netherlands

We offer:
• Competitive monthly salary
• Registered contract with holiday pay`,
  },
];

async function seedCareJobs() {
  try {
    console.log(`📥 Inserimento ${CARE_JOBS.length} nuovi annunci Badante/Colf/Baby-sitter...`);
    for (const job of CARE_JOBS) {
      await db.insert(jobsTable).values(job as any);
      console.log(`  ✓ ${job.title} — ${job.company} (${job.city}, ${job.country})`);
    }
    console.log(`\n✅ Inseriti ${CARE_JOBS.length} nuovi annunci senza toccare quelli esistenti.`);
    process.exit(0);
  } catch (err: any) {
    console.error("❌ Errore:", err.message);
    process.exit(1);
  }
}

seedCareJobs();
