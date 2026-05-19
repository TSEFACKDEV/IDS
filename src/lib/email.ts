import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailConfirmationData {
  destinataire: string;
  prenom: string;
  nom: string;
  numeroAuto: string;
  niveau: string;
  typeCours: string;
  locale: string;
}

const SUBJECT_FR = 'Confirmation de votre inscription — IDS Cameroun';
const SUBJECT_DE = 'Bestätigung Ihrer Anmeldung — IDS Kamerun';

/** Envoyer un email de confirmation d'inscription */
export async function sendConfirmationEmail(data: EmailConfirmationData): Promise<string | null> {
  const isFr = data.locale === 'fr';
  const subject = isFr ? SUBJECT_FR : SUBJECT_DE;

  const htmlContent = isFr
    ? buildHtmlFr(data)
    : buildHtmlDe(data);

  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 8000));

  try {
    const result = await Promise.race([
      resend.emails.send({
        from: 'IDS Cameroun <noreply@ids-cameroun.com>',
        to: data.destinataire,
        subject,
        html: htmlContent,
      }),
      timeout,
    ]);
    if (!result) {
      console.warn('[email] Timeout envoi confirmation');
      return null;
    }
    return (result as Awaited<ReturnType<typeof resend.emails.send>>).data?.id ?? null;
  } catch (error) {
    console.error('[email] Échec envoi confirmation:', error);
    return null;
  }
}

function buildHtmlFr(data: EmailConfirmationData): string {
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"/><title>Confirmation d'inscription</title></head>
<body style="font-family:system-ui,sans-serif;background:#f9f9f9;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    <div style="background:#CC0000;padding:24px 32px;">
      <h1 style="color:#fff;margin:0;font-size:22px;">IDS Cameroun</h1>
      <p style="color:#ffcccc;margin:4px 0 0;font-size:14px;">Institut für die Deutsche Sprache</p>
    </div>
    <div style="padding:32px;">
      <h2 style="color:#0A0A0A;margin-top:0">Votre inscription est bien reçue !</h2>
      <p>Bonjour <strong>${data.prenom} ${data.nom}</strong>,</p>
      <p>Nous avons bien enregistré votre inscription à l'IDS Cameroun.</p>
      <div style="background:#f5f5f5;border-left:4px solid #CC0000;padding:16px;border-radius:4px;margin:20px 0;">
        <p style="margin:0;font-size:13px;color:#666">Numéro d'inscription</p>
        <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#CC0000">${data.numeroAuto}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#666;width:40%">Niveau choisi</td><td style="font-weight:600">${data.niveau}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Type de cours</td><td style="font-weight:600">${data.typeCours}</td></tr>
      </table>
      <p>Notre équipe vous contactera prochainement pour confirmer votre inscription et vous communiquer les détails pratiques.</p>
      <p style="margin-top:32px;color:#888;font-size:13px;">
        IDS Cameroun — Douala, Akwa &amp; Yaoundé, Bastos<br/>
        Tél : +237 675 123 456 | info@ids-cameroun.com
      </p>
    </div>
  </div>
</body>
</html>`;
}

function buildHtmlDe(data: EmailConfirmationData): string {
  return `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"/><title>Anmeldebestätigung</title></head>
<body style="font-family:system-ui,sans-serif;background:#f9f9f9;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    <div style="background:#CC0000;padding:24px 32px;">
      <h1 style="color:#fff;margin:0;font-size:22px;">IDS Kamerun</h1>
      <p style="color:#ffcccc;margin:4px 0 0;font-size:14px;">Institut für die Deutsche Sprache</p>
    </div>
    <div style="padding:32px;">
      <h2 style="color:#0A0A0A;margin-top:0">Ihre Anmeldung wurde erhalten!</h2>
      <p>Hallo <strong>${data.prenom} ${data.nom}</strong>,</p>
      <p>Wir haben Ihre Anmeldung bei IDS Kamerun erfolgreich registriert.</p>
      <div style="background:#f5f5f5;border-left:4px solid #CC0000;padding:16px;border-radius:4px;margin:20px 0;">
        <p style="margin:0;font-size:13px;color:#666">Anmeldenummer</p>
        <p style="margin:6px 0 0;font-size:22px;font-weight:700;color:#CC0000">${data.numeroAuto}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;color:#666;width:40%">Gewähltes Niveau</td><td style="font-weight:600">${data.niveau}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Kursart</td><td style="font-weight:600">${data.typeCours}</td></tr>
      </table>
      <p>Unser Team wird sich in Kürze mit Ihnen in Verbindung setzen, um Ihre Anmeldung zu bestätigen.</p>
      <p style="margin-top:32px;color:#888;font-size:13px;">
        IDS Kamerun — Douala, Akwa &amp; Yaoundé, Bastos<br/>
        Tel: +237 675 123 456 | info@ids-cameroun.com
      </p>
    </div>
  </div>
</body>
</html>`;
}
