export function getEnrichedDescription(
  title: string,
  company?: string | null,
  city?: string | null,
  category?: string | null,
  rawDesc?: string | null
): string {
  const cleanRaw = (rawDesc || "").trim();
  const companyName = company || "Azienda Verificata";
  const jobCity = city || "Europa";
  const jobCat = category || "Logistica / Servizi";

  // If raw description has rich content (> 100 chars), return clean raw HTML/text
  if (cleanRaw.length >= 100) {
    return cleanRaw;
  }

  // Structured Multi-Paragraph Template Generator for short / empty descriptions
  return `
<div class="space-y-4">
  <p>L'azienda <strong>${companyName}</strong> è alla ricerca di una figura professionale qualificata per ricoprire la posizione di <strong>${title}</strong> presso la sede di <strong>${jobCity}</strong>.</p>

  <h4 class="font-bold text-foreground text-base mt-4 mb-2">Responsabilità e Mansioni Principali:</h4>
  <ul class="list-disc pl-5 space-y-1.5 text-muted-foreground">
    <li>Esecuzione autonoma e precisa delle attività giornaliere legate al ruolo di ${title}.</li>
    <li>Collaborazione con il team operativo e rispetto degli standard aziendali di qualità e sicurezza.</li>
    <li>Gestione efficace delle mansioni assegnate e rendicontazione periodica dei risultati.</li>
    <li>Mantenimento di un ambiente di lavoro organizzato, sicuro ed efficiente.</li>
  </ul>

  <h4 class="font-bold text-foreground text-base mt-4 mb-2">Requisiti Richiesti:</h4>
  <ul class="list-disc pl-5 space-y-1.5 text-muted-foreground">
    <li>Esperienza previa nel settore <strong>${jobCat}</strong> o in mansioni analoghe.</li>
    <li>Disponibilità immediata e flessibilità oraria.</li>
    <li>Attitudine al lavoro di squadra, puntualità e massima affidabilità.</li>
    <li>Idoneità alle mansioni operative e buona capacità di risoluzione dei problemi.</li>
  </ul>

  <h4 class="font-bold text-foreground text-base mt-4 mb-2">Condizioni di Lavoro e Benefici:</h4>
  <ul class="list-disc pl-5 space-y-1.5 text-muted-foreground">
    <li><strong>Contratto:</strong> Contratto di lavoro regolare con inquadramento commisurato all'esperienza.</li>
    <li><strong>Orario:</strong> Turni flessibili / Full-time secondo le esigenze aziendali.</li>
    <li><strong>Sede di Lavoro:</strong> ${jobCity}.</li>
  </ul>

  <h4 class="font-bold text-foreground text-base mt-4 mb-2">Come Candidarsi:</h4>
  <p class="text-muted-foreground">Puoi inviare la tua candidatura direttamente tramite la piattaforma <strong>lavoro8.com</strong> compilando il modulo online o allegando il tuo CV aggiornato. In alternativa, puoi utilizzare il nostro strumento gratuito per creare un CV Europeo in formato Europass.</p>
</div>
`.trim();
}
