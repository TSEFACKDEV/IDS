import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { sendConfirmationEmail } from '@/lib/email';
import { signPdfToken } from '@/lib/tokens';

export const maxDuration = 30;

const inscriptionSchema = z.object({
  nom: z.string().min(2),
  prenom: z.string().min(2),
  email: z.string().email(),
  telephone: z.string().min(8),
  dateNaissance: z.string().optional(),
  sexe: z.enum(['HOMME', 'FEMME']).optional(),
  nationalite: z.string().optional(),
  adresse: z.string().optional(),
  ville: z.string().optional(),
  codePostal: z.string().optional(),
  niveau: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
  typeCours: z.enum(['GROUPE', 'INDIVIDUEL', 'INTENSIF', 'SEMI_INTENSIF', 'EN_LIGNE']),
  objectif: z.enum(['ETUDES_ALLEMAGNE', 'TRAVAIL', 'PREPARATION_EXAMEN', 'VOYAGE', 'AUTRE']),
  objectifAutre: z.string().optional(),
  niveauEtudes: z.enum(['LYCEE', 'UNIVERSITE', 'PROFESSIONNEL', 'AUTRE']).optional(),
  profession: z.string().optional(),
  creneaux: z.array(z.string()).min(1),
  jours: z.array(z.string()).min(1),
  accepteReglement: z.literal(true),
  locale: z.string().default('fr'),
});

/** Générer un numéro d'inscription séquentiel au format IDS-YYYY-XXXXXX */
async function generateNumeroAuto(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `IDS-${year}-`;

  // Récupérer le dernier numéro de l'année en cours
  const last = await prisma.inscription.findFirst({
    where: { numeroAuto: { startsWith: prefix } },
    orderBy: { numeroAuto: 'desc' },
    select: { numeroAuto: true },
  });

  let seq = 1;
  if (last?.numeroAuto) {
    const parts = last.numeroAuto.split('-');
    const lastSeq = parseInt(parts[2] ?? '0', 10);
    if (!isNaN(lastSeq)) seq = lastSeq + 1;
  }

  return `${prefix}${String(seq).padStart(6, '0')}`;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }

  const parsed = inscriptionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Données invalides', details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const data = parsed.data;

  try {
    const numeroAuto = await generateNumeroAuto();

    const inscription = await prisma.inscription.create({
      data: {
        numeroAuto,
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone,
        dateNaissance: data.dateNaissance,
        sexe: data.sexe,
        nationalite: data.nationalite,
        adresse: data.adresse,
        ville: data.ville,
        codePostal: data.codePostal,
        niveau: data.niveau,
        typeCours: data.typeCours,
        objectif: data.objectif,
        objectifAutre: data.objectifAutre,
        niveauEtudes: data.niveauEtudes,
        profession: data.profession,
        creneaux: data.creneaux,
        jours: data.jours,
        accepteReglement: true,
        languePref: data.locale,
        statut: 'EN_ATTENTE',
      },
    });

    // Envoyer l'email de confirmation (non bloquant)
    sendConfirmationEmail({
      destinataire: inscription.email,
      prenom: inscription.prenom,
      nom: inscription.nom,
      numeroAuto: inscription.numeroAuto,
      niveau: inscription.niveau,
      typeCours: inscription.typeCours,
      locale: data.locale,
    }).then((resendId) => {
      if (resendId) {
        prisma.emailLog.create({
          data: {
            inscriptionId: inscription.id,
            destinataire: inscription.email,
            sujet: 'Confirmation inscription',
            statut: 'ENVOYE',
            resendId,
            envoye_le: new Date(),
          },
        }).catch(console.error);
      }
    }).catch(console.error);

    const pdfToken = await signPdfToken(inscription.id);

    return NextResponse.json(
      {
        success: true,
        id: inscription.id,
        numeroAuto: inscription.numeroAuto,
        pdfUrl: `/api/pdf/${inscription.id}?token=${pdfToken}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[inscription] Erreur création:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
