interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(opts: SendEmailOptions): Promise<void> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || "Lavoro8 <noreply@lavoro8.com>",
          to: opts.to,
          subject: opts.subject,
          html: opts.html,
          reply_to: opts.replyTo,
        }),
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error("[email] Resend API error:", res.status, errorText);
      }
    } else {
      console.log("[email simulated] To:", opts.to, "Subject:", opts.subject);
    }
  } catch (err) {
    console.error("[email] Failed to send email:", err);
  }
}

export function applicationEmailHtml(opts: {
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateMessage?: string;
  cvUrl?: string;
  jobTitle: string;
  jobCompany: string;
  jobCity: string;
  applicationId: number;
}): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:#1a56db;padding:28px 32px;">
            <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">lavoro8<span style="color:#60a5fa;">.com</span></p>
            <p style="margin:4px 0 0;color:#bfdbfe;font-size:13px;">Piattaforma di ricerca del lavoro</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 8px;color:#374151;font-size:16px;font-weight:600;">Nuova candidatura ricevuta 🎉</p>
            <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">
              Un candidato si è candidato per la posizione <strong>${opts.jobTitle}</strong> presso <strong>${opts.jobCompany}</strong> (${opts.jobCity}) tramite lavoro8.com.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;padding:20px;margin-bottom:24px;">
              <tr>
                <td style="padding:6px 0;">
                  <p style="margin:0;color:#9ca3af;font-size:11px;text-transform:uppercase;font-weight:600;">Nome candidato</p>
                  <p style="margin:2px 0 0;color:#111827;font-size:15px;font-weight:600;">${opts.candidateName}</p>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;">
                  <p style="margin:0;color:#9ca3af;font-size:11px;text-transform:uppercase;font-weight:600;">Email</p>
                  <p style="margin:2px 0 0;"><a href="mailto:${opts.candidateEmail}" style="color:#1a56db;font-size:15px;">${opts.candidateEmail}</a></p>
                </td>
              </tr>
              <tr>
                <td style="padding:6px 0;">
                  <p style="margin:0;color:#9ca3af;font-size:11px;text-transform:uppercase;font-weight:600;">Telefono</p>
                  <p style="margin:2px 0 0;"><a href="tel:${opts.candidatePhone}" style="color:#1a56db;font-size:15px;">${opts.candidatePhone}</a></p>
                </td>
              </tr>
              ${opts.candidateMessage ? `
              <tr>
                <td style="padding:6px 0;">
                  <p style="margin:0;color:#9ca3af;font-size:11px;text-transform:uppercase;font-weight:600;">Presentazione</p>
                  <p style="margin:2px 0 0;color:#374151;font-size:14px;">${opts.candidateMessage.replace(/\n/g, "<br>")}</p>
                </td>
              </tr>` : ""}
            </table>

            ${opts.cvUrl ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td>
                  <a href="${opts.cvUrl}" style="display:inline-block;background:#1a56db;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600;">
                    📄 Scarica CV
                  </a>
                </td>
              </tr>
            </table>` : ""}

            <p style="margin:0 0 8px;color:#374151;font-size:14px;">
              Per rispondere al candidato, scriva direttamente a <a href="mailto:${opts.candidateEmail}" style="color:#1a56db;">${opts.candidateEmail}</a> 
              oppure acceda alla sua <strong>dashboard</strong> su lavoro8.com per gestire le candidature ricevute.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
              <tr>
                <td>
                  <a href="${process.env.APP_URL || 'https://lavoro8.com'}/recruiter" style="display:inline-block;background:#f0fdf4;border:1px solid #86efac;color:#15803d;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:600;">
                    🏢 Accedi alla tua dashboard aziendale →
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Questa email è stata inviata automaticamente da <a href="https://lavoro8.com" style="color:#1a56db;">lavoro8.com</a> 
              perché la vostra azienda ha un'offerta di lavoro sulla nostra piattaforma.
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
