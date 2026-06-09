import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.mail.yahoo.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export interface EmailConfirmationData {
  destinataire: string;
  prenom: string;
  nom: string;
  numeroAuto: string;
  niveau: string;
  typeCours: string;
  prixFCFA: number;
  locale?: string;
}

/** Envoyer un email de confirmation d'inscription avec facture */
export async function sendConfirmationEmail(data: EmailConfirmationData): Promise<void> {
  const isFr = data.locale !== 'de';
  const subject = isFr
    ? `IDS Cameroun — Confirmation d'inscription ${data.numeroAuto}`
    : `IDS Kamerun — Anmeldebestätigung ${data.numeroAuto}`;

  const htmlContent = isFr ? buildHtmlFr(data) : buildHtmlDe(data);

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM ?? 'IDS Cameroun <boyomm@yahoo.com>',
      to: data.destinataire,
      subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error('[email] Échec envoi confirmation:', error);
  }
}

function buildHtmlFr(data: EmailConfirmationData): string {
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+4915732878223').replace(/[^0-9]/g, '');
  return `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"/><title>Confirmation d'inscription</title></head>
<body style="font-family:system-ui,sans-serif;background:#f9f9f9;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
    <div style="background:#CC0000;padding:24px 32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:22px;">IDS Cameroun</h1>
      <p style="color:rgba(255,255,255,0.85);margin:4px 0 0;font-size:13px;">Institut für die Deutsche Sprache</p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#0A0A0A;">Bonjour <strong>${data.prenom} ${data.nom}</strong>,</p>
      <p style="color:#333;line-height:1.7;">Votre inscription à l'IDS Cameroun a bien été reçue et est en cours de traitement. Vous trouverez ci-dessous les informations relatives au paiement.</p>
      <div style="background:#f5f5f5;border-left:4px solid #CC0000;padding:16px;border-radius:4px;margin:24px 0;">
        <p style="margin:0;font-size:13px;color:#666">Numéro d'inscription</p>
        <p style="margin:6px 0 0;font-size:24px;font-weight:700;color:#CC0000;letter-spacing:1px;">${data.numeroAuto}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:24px;">
        <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 0;color:#666;width:40%">Niveau</td><td style="font-weight:600;color:#0A0A0A">${data.niveau}</td></tr>
        <tr style="border-bottom:1px solid #eee;"><td style="padding:10px 0;color:#666">Formule</td><td style="font-weight:600;color:#0A0A0A">${data.typeCours}</td></tr>
        <tr><td style="padding:10px 0;color:#CC0000;font-weight:700">Montant à régler</td><td style="font-weight:800;color:#CC0000;font-size:18px">${data.prixFCFA.toLocaleString('fr-FR')} FCFA</td></tr>
      </table>
      <h3 style="color:#0A0A0A;font-size:15px;">Comment régler ?</h3>
      <ol style="color:#333;line-height:1.8;padding-left:20px;font-size:14px;">
        <li>Envoyez <strong>${data.prixFCFA.toLocaleString('fr-FR')} FCFA</strong> via Mobile Money au numéro WhatsApp <strong>+${whatsapp}</strong></li>
        <li>Faites une <strong>capture d'écran</strong> de la confirmation de paiement.</li>
        <li>Envoyez le screenshot via WhatsApp en mentionnant votre numéro <strong>${data.numeroAuto}</strong></li>
        <li>Votre accès à l'<strong>Espace Étudiant</strong> sera activé dès confirmation du paiement.</li>
      </ol>
      <div style="text-align:center;margin:24px 0;">
        <a href="https://wa.me/${whatsapp}" style="display:inline-block;background:#25D366;color:#fff;font-weight:700;padding:12px 28px;border-radius:8px;text-decoration:none;font-size:14px;">Contacter sur WhatsApp</a>
      </div>
      <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
      <p style="color:#999;font-size:12px;line-height:1.6;">
        Biyem-Assi, Carrefour Scalom, Immeuble Africa Finance — Yaoundé, Cameroun<br/>
        WhatsApp : +${whatsapp} &nbsp;|&nbsp; info@ids-cameroun.com
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
        IDS Kamerun — Biyem-Assi, Carrefour Scalom, Immeuble Africa Finance, Yaoundé<br/>
        Tel: +237 675 123 456 | info@ids-cameroun.com
      </p>
    </div>
  </div>
</body>
</html>`;
}
