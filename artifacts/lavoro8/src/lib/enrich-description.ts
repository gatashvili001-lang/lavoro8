export function getEnrichedDescription(
  title: string,
  company?: string | null,
  city?: string | null,
  category?: string | null,
  rawDesc?: string | null,
  salaryMin?: number | null,
  salaryMax?: number | null,
  contractType?: string | null
): string {
  const cleanRaw = (rawDesc || "").trim();
  const companyName = company || "Azienda Leader nel Settore";
  const jobCity = city || "Italia / Europa";
  const jobCat = category || "Logistica e Servizi";
  const contract = contractType || "Tempo determinato / indeterminato";
  const salaryText = salaryMin && salaryMax
    ? `Retribuzione mensile lorda tra €${salaryMin} e €${salaryMax}`
    : salaryMin
    ? `Retribuzione a partire da €${salaryMin} al mese`
    : "Retribuzione competitiva secondo CCNL di categoria";

  // If raw description is already an extensive HTML document (> 300 chars AND has headers), return clean raw HTML/text
  if (cleanRaw.length >= 300 && (cleanRaw.includes("<h4>") || cleanRaw.includes("<h3") || cleanRaw.includes("<ul>"))) {
    return cleanRaw;
  }

  // Extract key technical terms for tailored requirements
  const isMagazzino = title.toLowerCase().includes("magazzin") || jobCat === "Magazzino";
  const isDriver = title.toLowerCase().includes("driver") || title.toLowerCase().includes("autist") || title.toLowerCase().includes("rider") || jobCat === "Logistica";
  const isRistorazione = jobCat === "Ristorante" || jobCat === "Hotel";
  const isBadante = jobCat === "Badante" || jobCat === "Colf";

  const customReqs = isMagazzino
    ? "<li>Patentino per la conduzione di carrelli elevatori (Muletto) in corso di validità (preferenziale).</li><li>Capacità di utilizzo di pistole bar-code, palmari scanner e sistemi gestionali WMS.</li><li>Idoneità alla movimentazione manuale dei carichi e rispetto delle norme di sicurezza DPI.</li>"
    : isDriver
    ? "<li>Possesso di patente di guida di categoria adeguata (Patente B / C / CQC Merci) e punti patente intatti.</li><li>Conoscenza della viabilità locale e attitudine alla guida sicura ed efficiente.</li><li>Puntualità e precisione nella gestione dei documenti di trasporto (DDT / Bolle).</li>"
    : isRistorazione
    ? "<li>Certificazione HACCP in corso di validità e conoscenza delle norme di igiene alimentare.</li><li>Esperienza nella gestione del servizio in sala o preparazione alimenti in cucina professionale.</li><li>Ottima predisposizione al contatto con il pubblico, presenza curata e flessibilità sui turni.</li>"
    : isBadante
    ? "<li>Esperienza comprovata nell'assistenza domiciliare o residenziale a persone anziane o non autosufficienti.</li><li>Pazienza, empatia, serietà e ottime capacità d'ascolto e comunicazione.</li><li>Disponibilità alla gestione della casa, preparazione pasti ed eventuale regime convivente.</li>"
    : "<li>Diploma di scuola secondary o qualifiche professionali equivalenti.</li><li>Precisione, affidabilità e capacità di lavorare in team per il raggiungimento degli obiettivi aziendali.</li><li>Flessibilità oraria e disponibilità immediata ad iniziare la prestazione lavorativa.</li>";

  const openingOverview = cleanRaw.length > 20
    ? `<p class="text-foreground font-medium text-[15px] mb-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">${cleanRaw}</p>`
    : `<p class="text-foreground font-medium text-[15px] mb-4">L'azienda <strong>${companyName}</strong> seleziona una figura professionale motivata e qualificata per coprire il ruolo di <strong>${title}</strong> presso l'unità operativa di <strong>${jobCity}</strong>.</p>`;

  return `
<div class="space-y-6">
  ${openingOverview}

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
      ${customReqs}
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
