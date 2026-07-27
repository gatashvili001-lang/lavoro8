export function getEnrichedDescription(
  title: string,
  company?: string | null,
  city?: string | null,
  category?: string | null,
  rawDesc?: string | null,
  salaryMin?: number | null,
  salaryMax?: number | null,
  contractType?: string | null,
  lang: string = "it"
): string {
  let cleanRaw = (rawDesc || "").trim();
  const companyName = company || "Azienda Leader nel Settore";
  const jobCity = city || "Italia / Europa";
  const jobCat = category || "Logistica e Servizi";
  const contract = contractType || "Tempo determinato / indeterminato";
  const salaryText = salaryMin && salaryMax
    ? `€${salaryMin} - €${salaryMax}`
    : salaryMin
    ? `da €${salaryMin}`
    : "secondo CCNL";

  // If cleanRaw already contains pre-enriched HTML templates, extract original text or clean it up
  if (cleanRaw.includes("<h4") || cleanRaw.includes("Informazioni sull'Azienda")) {
    const match = cleanRaw.match(/<p[^>]*>(.*?)<\/p>/i);
    if (match && match[1]) {
      cleanRaw = match[1].replace(/<[^>]+>/g, "").trim();
    } else {
      cleanRaw = "";
    }
  }

  // Extract key technical terms for tailored requirements
  const isMagazzino = title.toLowerCase().includes("magazzin") || jobCat === "Magazzino";
  const isDriver = title.toLowerCase().includes("driver") || title.toLowerCase().includes("autist") || title.toLowerCase().includes("rider") || jobCat === "Logistica";
  const isRistorazione = jobCat === "Ristorante" || jobCat === "Hotel";
  const isBadante = jobCat === "Badante" || jobCat === "Colf";

  if (lang === "ka") {
    // 🇬🇪 Georgian Translation
    const customReqsKa = isMagazzino
      ? "<li>სატვირთველის (მალეტო) მართვის მოქმედი მოწმობა (სასურველია).</li><li>შტრიხკოდების სკანერებთან და WMS სისტემებთან მუშაობის გამოცდილება.</li><li>ტვირთის უსაფრთხო გადაადგილება და უსაფრთხოების ნორმების დაცვა.</li>"
      : isDriver
      ? "<li>შესაბამისი კატეგორიის მართვის მოწმობა (B / C / CQC) და მართვის გამოცდილება.</li><li>ადგილობრივი გზების კარგი ცოდნა და უსაფრთხო მართვის უნარი.</li><li>პუნქტუალურობა და სატრანსპორტო საბუთების (DDT / Bolle) სიზუსტე.</li>"
      : isRistorazione
      ? "<li>მოქმედი HACCP სერტიფიკატი და სურსათის ჰიგიენის ნორმების ცოდნა.</li><li>სტუმრების მომსახურების ან სამზარეულოში მუშაობის გამოცდილება.</li><li>კომუნიკაბელურობა, მოწესრიგებული გარეგნობა და ცვლილებში მუშაობის მზაობა.</li>"
      : isBadante
      ? "<li>ხანდაზმულთა ან მოვლის საჭიროების მქონე პირთა მოვლის გამოცდილება.</li><li>მოთმინება, ემპათია, პასუხისმგებლობა და ყურადღებიანობა.</li><li>საოჯახო საქმეების გაძღოლა, კერძების მომზადება და მეთვალყურეობა.</li>"
      : "<li>საშუალო ან პროფესიული განათლება.</li><li>პუნქტუალურობა, საიმედოობა და გუნდური მუშაობის უნარი.</li><li>მოქნილი გრაფიკი და სამუშაოს დაუყოვნებლივ დაწყების მზაობა.</li>";

    const openingOverviewKa = cleanRaw.length > 10
      ? `<p class="text-foreground font-medium text-[15px] mb-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">${cleanRaw}</p>`
      : `<p class="text-foreground font-medium text-[15px] mb-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">კომპანია <strong>${companyName}</strong> აცხადებს ვაკანსიას პოზიციაზე: <strong>${title}</strong>, ქალაქში: <strong>${jobCity}</strong>.</p>`;

    return `
<div class="space-y-6">
  ${openingOverviewKa}

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🏢 ინფორმაცია კომპანიასა და პოზიციაზე
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      კომპანია გთავაზობთ სტაბილურ და ორგანიზებულ სამუშაო გარემოს <strong>${jobCity}</strong>-ში. პოზიცია <strong>${title}</strong> ითვალისწინებს საწყის სწავლებას გამოცდილ პერსონალთან ერთად და კარიერული ზრდის შესაძლებლობას.
    </p>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      📋 ძირითადი მოვალეობები და პასუხისმგებლობები
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li>ყოველდღიური დავალებების დამოუკიდებლად და ხარისხიანად შესრულება პოზიციაზე <strong>${title}</strong>.</li>
      <li>სამუშაო პროცესის სტანდარტებისა და უსაფრთხოების ნორმების დაცვა.</li>
      <li>გუნდთან მჭიდრო თანამშრომლობა და ხელმძღვანელთან კოორდინაცია.</li>
      <li>სამუშაო სივრცის წესრიგისა და სისუფთავის შენარჩუნება.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🎓 საკვალიფიკაციო მოთხოვნები
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      ${customReqsKa}
      <li>ორგანიზებულობა, პასუხისმგებლობის მაღალი გრძნობა და სტრესულ გარემოში მუშაობის უნარი.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      💰 სამუშაო პირობები და ანაზღაურება
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li><strong>კონტრაქტი:</strong> ${contract}.</li>
      <li><strong>ანაზღაურება:</strong> ${salaryText} თვეში.</li>
      <li><strong>სამუშაო ადგილი:</strong> ${jobCity}.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      ✉️ განაცხადის შევსების წესი
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      დაინტერესებულ პირებს შეგიძლიათ გააგზავნოთ განაცხადი <strong>lavoro8.com</strong>-ზე ღილაკით <em>"Candidati Ora"</em>. ასევე შეგიძლიათ გამოიყენოთ ჩვენი უფასო ევროპული CV-ს აწყობის ინსტრუმენტი (Europass CV Builder).
    </p>
  </div>
</div>
`.trim();
  }

  if (lang === "uk") {
    // 🇺🇦 Ukrainian Translation
    const customReqsUk = isMagazzino
      ? "<li>Дійсне посвідчення водія навантажувача (Muletto).</li><li>Навички работы зі сканерами штрих-кодів та системами WMS.</li><li>Дотримання правил техніки безпеки та охорони праці.</li>"
      : isDriver
      ? "<li>Посвідчення водія відповідної категорії (B / C / CQC).</li><li>Знання місцевих доріг та навички безпечного водіння.</li><li>Пунктуальність та точність при роботі з транспортними документами (DDT).</li>"
      : isRistorazione
      ? "<li>Дійсний сертифікат HACCP та знання норм гігієни харчування.</li><li>Досвід обслуговування гостей або роботи на кухні.</li><li>Ввічливість, охайний зовнішній вигляд та гнучкість.</li>"
      : isBadante
      ? "<li>Досвід догляду за людьми похилого віку або людьми, що потребують допомоги.</li><li>Терпіння, емпатія та відповідальність.</li><li>Ведення домашнього господарства, приготування їжі.</li>"
      : "<li>Cередня або професійна освіта.</li><li>Пунктуальність, надійність та вміння працювати в команді.</li><li>Гнучкий графік та готовність приступити до роботи.</li>";

    const openingOverviewUk = cleanRaw.length > 10
      ? `<p class="text-foreground font-medium text-[15px] mb-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">${cleanRaw}</p>`
      : `<p class="text-foreground font-medium text-[15px] mb-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">Компанія <strong>${companyName}</strong> відкриває вакансію на позицію: <strong>${title}</strong> у місті: <strong>${jobCity}</strong>.</p>`;

    return `
<div class="space-y-6">
  ${openingOverviewUk}

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🏢 Інформація про компанію та вакансію
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Робота в стабільній компанії в місті <strong>${jobCity}</strong>. Позиція <strong>${title}</strong> передбачає початковий інструктаж та можливість професійного зростання.
    </p>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      📋 Основні обов'язки
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li>Якісне та своєчасне виконання щоденних завдань на позиції <strong>${title}</strong>.</li>
      <li>Дотримання стандартів компанії та норм безпеки.</li>
      <li>Командна робота та взаємодія з керівництвом.</li>
      <li>Підтримання порядку на робочому місці.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🎓 Вимоги до кандидата
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      ${customReqsUk}
      <li>Організованість, відповідальність та стійкість до стресів.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      💰 Умови роботи та оплата
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li><strong>Контракт:</strong> ${contract}.</li>
      <li><strong>Заробітна плата:</strong> ${salaryText} на місяць.</li>
      <li><strong>Локація:</strong> ${jobCity}.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      ✉️ Як подати заявку
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Надішліть вашу заявку безпосередньо на <strong>lavoro8.com</strong> натиснувши <em>"Candidati Ora"</em>. Ви також можете безкоштовно створити європейське резюме (Europass CV).
    </p>
  </div>
</div>
`.trim();
  }

  if (lang === "en") {
    // 🇬🇧 English Translation
    const customReqsEn = isMagazzino
      ? "<li>Valid Forklift certification (Muletto preferred).</li><li>Experience with barcode scanners, handheld devices, and WMS software.</li><li>Ability to perform manual material handling following safety guidelines.</li>"
      : isDriver
      ? "<li>Valid driver's license (Category B / C / CQC) with clean driving record.</li><li>Local route knowledge and safe driving mindset.</li><li>Punctuality and accurate management of shipping bills (DDT).</li>"
      : isRistorazione
      ? "<li>Valid HACCP certificate and knowledge of food safety standards.</li><li>Experience in table service or professional kitchen environment.</li><li>Great customer-facing skills and schedule flexibility.</li>"
      : isBadante
      ? "<li>Proven experience in elderly or home care assistance.</li><li>Patience, empathy, and strong communication skills.</li><li>Housekeeping, meal preparation, and live-in availability if needed.</li>"
      : "<li>Secondary school diploma or equivalent qualification.</li><li>Precision, reliability, and team working skills.</li><li>Immediate availability and flexible working hours.</li>";

    const openingOverviewEn = cleanRaw.length > 10
      ? `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">${cleanRaw}</p>`
      : `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">Company <strong>${companyName}</strong> is recruiting a qualified professional for the position of <strong>${title}</strong> in <strong>${jobCity}</strong>.</p>`;

    return `
<div class="space-y-6">
  ${openingOverviewEn}

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🏢 Company Overview & Role
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Join a well-established team in <strong>${jobCity}</strong> as a <strong>${title}</strong>. The role includes initial training alongside senior staff and long-term career growth opportunities.
    </p>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      📋 Key Responsibilities
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li>Autonomous execution of daily tasks related to the role of <strong>${title}</strong>.</li>
      <li>Ensuring compliance with company quality standards and safety regulations.</li>
      <li>Collaborating effectively with team members and report supervisors.</li>
      <li>Maintaining a clean, safe, and organized working environment.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🎓 Requirements & Qualifications
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      ${customReqsEn}
      <li>Organizational skills, initiative, and ability to handle peak workloads.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      💰 Benefits & Working Conditions
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li><strong>Contract Type:</strong> ${contract}.</li>
      <li><strong>Salary:</strong> ${salaryText} per month.</li>
      <li><strong>Location:</strong> ${jobCity}.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      ✉️ How to Apply
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Submit your application on <strong>lavoro8.com</strong> by clicking <em>"Candidati Ora"</em>. You can also build your free Italian Europass CV directly on our platform.
    </p>
  </div>
</div>
`.trim();
  }

  if (lang === "es") {
    // 🇪🇸 Spanish Translation
    const customReqsEs = isMagazzino
      ? "<li>Carné de carretillero elevador (Muletto) en vigor (preferible).</li><li>Manejo de pistolas de radiofrecuencia, escáneres y sistemas WMS.</li><li>Aptitud para la manipulación manual de cargas y cumplimiento de normas de seguridad.</li>"
      : isDriver
      ? "<li>Carné de conducir adecuado (Permiso B / C / CAP) y puntos de carné intactos.</li><li>Conocimiento de rutas locales y conducción segura y eficiente.</li><li>Puntualidad y precisión en la gestión de albaranes y albaranes de entrega.</li>"
      : isRistorazione
      ? "<li>Certificado HACCP / Manipulador de alimentos en vigor.</li><li>Experiencia en servicio de sala o cocina profesional.</li><li>Buena atención al cliente, presencia cuidada y flexibilidad de horarios.</li>"
      : isBadante
      ? "<li>Experiencia demostrable en asistencia domiciliaria a personas mayores o dependientes.</li><li>Paciencia, empatía, seriedad y excelentes habilidades de comunicación.</li><li>Disponibilidad para tareas del hogar, preparación de comidas y régimen interno si fuera necesario.</li>"
      : "<li>Título de educación secundaria o formación profesional equivalente.</li><li>Precisión, fiabilidad y capacidad de trabajo en equipo.</li><li>Disponibilidad inmediata y flexibilidad horaria.</li>";

    const openingOverviewEs = cleanRaw.length > 10
      ? `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">${cleanRaw}</p>`
      : `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">La empresa <strong>${companyName}</strong> selecciona un profesional cualificado para el puesto de <strong>${title}</strong> en <strong>${jobCity}</strong>.</p>`;

    return `
<div class="space-y-6">
  ${openingOverviewEs}

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🏢 Información de la Empresa y Puesto
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Integración en un entorno laboral sólido en <strong>${jobCity}</strong> para la vacante de <strong>${title}</strong>, con formación inicial y posibilidades de desarrollo profesional.
    </p>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      📋 Responsabilidades Principales
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li>Ejecución de las tareas diarias vinculadas al puesto de <strong>${title}</strong>.</li>
      <li>Cumplimiento de estándares de calidad y normas de seguridad laboral.</li>
      <li>Trabajo en equipo y coordinación con los responsables del departamento.</li>
      <li>Mantenimiento del orden y la limpieza en el centro de trabajo.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🎓 Requisitos
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      ${customReqsEs}
      <li>Organización, iniciativa y capacidad para trabajar bajo presión.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      💰 Condiciones y Salario
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li><strong>Tipo de Contrato:</strong> ${contract}.</li>
      <li><strong>Salario:</strong> ${salaryText} al mes.</li>
      <li><strong>Ubicación:</strong> ${jobCity}.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      ✉️ Cómo Solicitar el Puesto
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Envíe su solicitud directamente en <strong>lavoro8.com</strong> haciendo clic en <em>"Candidati Ora"</em>. También puede crear gratis su CV Europass en nuestra plataforma.
    </p>
  </div>
</div>
`.trim();
  }

  if (lang === "de") {
    // 🇩🇪 German Translation
    const customReqsDe = isMagazzino
      ? "<li>Gültiger Gabelstaplerschein (Staplerschein) erforderlich.</li><li>Erfahrung mit Barcode-Scannern, Handhelds und WMS-Lagerverwaltungssystemen.</li><li>Körperliche Belastbarkeit und Einhaltung der Arbeitssicherheitsvorschriften.</li>"
      : isDriver
      ? "<li>Gültiger Führerschein (Klasse B / C / CQC) mit sauberem Punktekonto.</li><li>Gute Ortskenntnisse und sichere Fahrweise.</li><li>Pünktlichkeit und Genauigkeit beim Umgang mit Lieferscheinen (DDT).</li>"
      : isRistorazione
      ? "<li>Gültiges HACCP-Zertifikat / Hygienebelehrung.</li><li>Erfahrung im Servieren oder in der professionellen Küche.</li><li>Kundenorientiertes Auftreten, gepflegtes Erscheinungsbild und Schichtbereitschaft.</li>"
      : isBadante
      ? "<li>Nachweisbare Erfahrung in der Seniorenbetreuung oder Häuslichen Pflege.</li><li>Geduld, Empathie und gute Kommunikationsfähigkeiten.</li><li>Bereitschaft zur Haushaltsführung und Essenszubereitung.</li>"
      : "<li>Abgeschlossene Schulausbildung oder vergleichbare Qualifikation.</li><li>Zuverlässigkeit, Pünktlichkeit und Teamfähigkeit.</li><li>Flexibilität und kurzfristige Verfügbarkeit.</li>";

    const openingOverviewDe = cleanRaw.length > 10
      ? `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">${cleanRaw}</p>`
      : `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">Das Unternehmen <strong>${companyName}</strong> sucht eine qualifizierte Fachkraft für die Position <strong>${title}</strong> am Standort <strong>${jobCity}</strong>.</p>`;

    return `
<div class="space-y-6">
  ${openingOverviewDe}

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🏢 Unternehmensprofil & Position
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Sicherer Arbeitsplatz in einem strukturierten Arbeitsumfeld in <strong>${jobCity}</strong> als <strong>${title}</strong> mit Einarbeitung und Entwicklungsmöglichkeiten.
    </p>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      📋 Hauptaufgaben
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li>Eigenverantwortliche Durchführung der täglichen Aufgaben als <strong>${title}</strong>.</li>
      <li>Einhaltung von Qualitäts- und Sicherheitsstandards.</li>
      <li>Aktive Zusammenarbeit im Team und Abstimmung mit Vorgesetzten.</li>
      <li>Sauberkeit und Ordnung am Arbeitsplatz.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🎓 Anforderungsprofil
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      ${customReqsDe}
      <li>Organisationsgeschick, Eigeninitiative und Belastbarkeit.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      💰 Vergütung & Benefits
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li><strong>Vertragsart:</strong> ${contract}.</li>
      <li><strong>Gehalt:</strong> ${salaryText} pro Monat.</li>
      <li><strong>Standort:</strong> ${jobCity}.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      ✉️ Bewerbungsprozess
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Bewerben Sie sich direkt auf <strong>lavoro8.com</strong> per Klick auf <em>"Candidati Ora"</em>. Nutzen Sie auch unseren kostenlosen Europass-Lebenslauf-Generator.
    </p>
  </div>
</div>
`.trim();
  }

  // Default 🇮🇹 Italian
  const customReqsIt = isMagazzino
    ? "<li>Patentino per la conduzione di carrelli elevatori (Muletto) in corso di validità (preferenziale).</li><li>Capacità di utilizzo di pistole bar-code, palmari scanner e sistemi gestionali WMS.</li><li>Idoneità alla movimentazione manuale dei carichi e rispetto delle norme di sicurezza DPI.</li>"
    : isDriver
    ? "<li>Possesso di patente di guida di categoria adeguata (Patente B / C / CQC Merci) e punti patente intatti.</li><li>Conoscenza della viabilità locale e attitudine alla guida sicura ed efficiente.</li><li>Puntualità e precisione nella gestione dei documenti di trasporto (DDT / Bolle).</li>"
    : isRistorazione
    ? "<li>Certificazione HACCP in corso di validità e conoscenza delle norme di igiene alimentare.</li><li>Esperienza nella gestione del servizio in sala o preparazione alimenti in cucina professionale.</li><li>Ottima predisposizione al contatto con il pubblico, presenza curata e flessibilità sui turni.</li>"
    : isBadante
    ? "<li>Esperienza comprovata nell'assistenza domiciliare o residenziale a persone anziane o non autosufficienti.</li><li>Pazienza, empatia, serietà e ottime capacità d'ascolto e comunicazione.</li><li>Disponibilità alla gestione della casa, preparazione pasti ed eventuale regime convivente.</li>"
    : "<li>Diploma di scuola secondaria o qualifiche professionali equivalenti.</li><li>Precisione, affidabilità e capacità di lavorare in team per il raggiungimento degli obiettivi aziendali.</li><li>Flessibilità oraria e disponibilità immediata ad iniziare la prestazione lavorativa.</li>";

  const openingOverviewIt = cleanRaw.length > 10
    ? `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">${cleanRaw}</p>`
    : `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">L'azienda <strong>${companyName}</strong> seleziona una figura professionale motivata e qualificata per coprire il ruolo di <strong>${title}</strong> presso l'unità operativa di <strong>${jobCity}</strong>.</p>`;

  return `
<div class="space-y-6">
  ${openingOverviewIt}

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🏢 Informazioni sull'Azienda e Posizione Lavorativa
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      La risorsa inserita opererà all'interno di un contesto aziendale solido e strutturato. Per la sede di <strong>${jobCity}</strong>, l'opportunità come <strong>${title}</strong> prevede l'affiancamento iniziale con personale esperto, la formazione continua sui processi aziendali e la possibilità di consolidare la propria carriera professionale.
    </p>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      📋 Responsabilità e Attività Principali
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li>Pianificazione ed esecuzione autonoma delle mansioni quotidiane collegate al ruolo di <strong>${title}</strong>.</li>
      <li>Verifica della conformità delle attività svolte e rispetto dei tempi di consegna e standard qualitativi.</li>
      <li>Collaborazione attiva con il team di lavoro e coordinamento con i responsabili di reparto.</li>
      <li>Mantenimento dell'ordine, della pulizia e della sicurezza negli spazi di lavoro secondo le normative vigenti.</li>
      <li>Segnalazione tempestiva di eventuali anomalie operative al fine di ottimizzare il flusso lavorativo.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      🎓 Requisiti e Competenze Richieste
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      ${customReqsIt}
      <li>Buone doti organizzative, spirito d'iniziativa e capacità di gestione dello stress nei momenti di picco.</li>
      <li>Massima puntualità, serietà e forte motivazione personale.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      💰 Cosa Offriamo, Retribuzione e Benefit
    </h4>
    <ul class="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
      <li><strong>Tipologia Contrattuale:</strong> ${contract}.</li>
      <li><strong>Inquadramento Economico:</strong> ${salaryText}.</li>
      <li><strong>Orario di Lavoro:</strong> Full-time / Turni distribuiti dal lunedì al venerdì con eventuali straordinari retribuiti.</li>
      <li><strong>Ambiente di Lavoro:</strong> Contesto dinamico, sicuro e stimolante con dispositivi di protezione forniti dall'azienda.</li>
    </ul>
  </div>

  <div>
    <h4 class="font-bold text-foreground text-base mb-2.5 flex items-center gap-2 border-b pb-2">
      ✉️ Come Candidarsi & Iter di Selezione
    </h4>
    <p class="text-muted-foreground leading-relaxed">
      Gli interessati di entrambi i sessi (L.903/77) possono inviare la propria candidatura diretta su <strong>lavoro8.com</strong> cliccando sul pulsante <em>"Candidati Ora"</em>. Le candidature ricevute verranno esaminate dal team di selezione aziendale per un primo colloquio conoscitivo.
    </p>
  </div>
</div>
`.trim();
}
