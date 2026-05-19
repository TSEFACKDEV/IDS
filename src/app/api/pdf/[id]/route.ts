import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { verifyPdfToken } from '@/lib/tokens';
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  type DocumentProps,
} from '@react-pdf/renderer';

export const runtime = 'nodejs';

// ─── Styles PDF ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#1A1A1A',
    paddingBottom: 30,
  },
  // En-tête noir
  header: {
    backgroundColor: '#0A0A0A',
    padding: 20,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { flexDirection: 'column' },
  headerTitle: { color: '#FFFFFF', fontSize: 18, fontFamily: 'Helvetica-Bold' },
  headerSubtitle: { color: '#999999', fontSize: 9, marginTop: 2 },
  headerNumero: {
    color: '#CC0000',
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'right',
  },
  headerNumeroLabel: { color: '#666666', fontSize: 8, textAlign: 'right', marginBottom: 2 },

  // Corps
  body: { paddingHorizontal: 30, paddingTop: 20 },

  // Section
  section: { marginBottom: 16 },
  sectionHeader: {
    backgroundColor: '#CC0000',
    color: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginBottom: 8,
  },
  sectionHeaderGold: {
    backgroundColor: '#F5A623',
    color: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Grille champs
  row: { flexDirection: 'row', gap: 16, marginBottom: 6 },
  field: { flex: 1 },
  fieldLabel: { color: '#666666', fontSize: 8, marginBottom: 2 },
  fieldValue: { fontSize: 10, fontFamily: 'Helvetica-Bold', borderBottomWidth: 1, borderBottomColor: '#E5E5E5', paddingBottom: 3 },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 15,
    left: 30,
    right: 30,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { color: '#999999', fontSize: 8 },
});

// ─── Composant PDF ─────────────────────────────────────────────────────────────
interface InscriptionPDFProps {
  inscription: {
    numeroAuto: string;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    dateNaissance: string | null;
    sexe: string | null;
    nationalite: string | null;
    adresse: string | null;
    ville: string | null;
    codePostal: string | null;
    niveau: string;
    typeCours: string;
    objectif: string;
    objectifAutre: string | null;
    niveauEtudes: string | null;
    profession: string | null;
    creneaux: string[];
    jours: string[];
    dateInscription: Date;
    statut: string;
    languePref: string;
  };
}

function InscriptionPDF({ inscription: ins }: InscriptionPDFProps) {
  const dateStr = ins.dateInscription.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return React.createElement(
    Document,
    { title: `Fiche inscription ${ins.numeroAuto}` },
    React.createElement(
      Page,
      { size: 'A4', style: styles.page },
      // En-tête
      React.createElement(
        View,
        { style: styles.header },
        React.createElement(
          View,
          { style: styles.headerLeft },
          React.createElement(Text, { style: styles.headerTitle }, 'IDS Cameroun'),
          React.createElement(
            Text,
            { style: styles.headerSubtitle },
            'Institut für die Deutsche Sprache — Antenne Cameroun'
          ),
          React.createElement(
            Text,
            { style: [styles.headerSubtitle, { marginTop: 6 }] },
            `FICHE D'INSCRIPTION — ${dateStr}`
          )
        ),
        React.createElement(
          View,
          null,
          React.createElement(Text, { style: styles.headerNumeroLabel }, 'N° INSCRIPTION'),
          React.createElement(Text, { style: styles.headerNumero }, ins.numeroAuto)
        )
      ),

      // Corps
      React.createElement(
        View,
        { style: styles.body },

        // Section 1 — Informations personnelles
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(
            View,
            { style: styles.sectionHeader },
            React.createElement(Text, { style: styles.sectionTitle }, '1. Informations personnelles')
          ),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Nom de famille'),
              React.createElement(Text, { style: styles.fieldValue }, ins.nom.toUpperCase())
            ),
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Prénom(s)'),
              React.createElement(Text, { style: styles.fieldValue }, ins.prenom)
            )
          ),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Email'),
              React.createElement(Text, { style: styles.fieldValue }, ins.email)
            ),
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Téléphone / WhatsApp'),
              React.createElement(Text, { style: styles.fieldValue }, ins.telephone)
            )
          ),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Date de naissance'),
              React.createElement(Text, { style: styles.fieldValue }, ins.dateNaissance ?? '—')
            ),
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Sexe'),
              React.createElement(Text, { style: styles.fieldValue }, ins.sexe === 'HOMME' ? 'Masculin' : ins.sexe === 'FEMME' ? 'Féminin' : '—')
            ),
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Nationalité'),
              React.createElement(Text, { style: styles.fieldValue }, ins.nationalite ?? '—')
            )
          ),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: [styles.field, { flex: 2 }] },
              React.createElement(Text, { style: styles.fieldLabel }, 'Adresse'),
              React.createElement(Text, { style: styles.fieldValue }, [ins.adresse, ins.ville, ins.codePostal].filter(Boolean).join(', ') || '—')
            )
          )
        ),

        // Section 2 — Formation
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(
            View,
            { style: styles.sectionHeader },
            React.createElement(Text, { style: styles.sectionTitle }, '2. Formation choisie')
          ),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, "Niveau d'allemand"),
              React.createElement(Text, { style: styles.fieldValue }, ins.niveau)
            ),
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Type de cours'),
              React.createElement(Text, { style: styles.fieldValue }, ins.typeCours.replace('_', ' '))
            ),
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Objectif'),
              React.createElement(Text, { style: styles.fieldValue }, (ins.objectifAutre ?? ins.objectif).replace(/_/g, ' '))
            )
          )
        ),

        // Section 3 — Disponibilités
        React.createElement(
          View,
          { style: styles.section },
          React.createElement(
            View,
            { style: [styles.sectionHeader, styles.sectionHeaderGold] },
            React.createElement(Text, { style: styles.sectionTitle }, '3. Disponibilités')
          ),
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Créneaux préférés'),
              React.createElement(Text, { style: styles.fieldValue }, ins.creneaux.join(', ') || '—')
            ),
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Jours préférés'),
              React.createElement(Text, { style: styles.fieldValue }, ins.jours.join(', ') || '—')
            )
          )
        ),

        // Statut
        React.createElement(
          View,
          { style: [styles.section, { marginTop: 8 }] },
          React.createElement(
            View,
            { style: styles.row },
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, 'Statut'),
              React.createElement(Text, { style: styles.fieldValue }, ins.statut)
            ),
            React.createElement(
              View,
              { style: styles.field },
              React.createElement(Text, { style: styles.fieldLabel }, "Date d'inscription"),
              React.createElement(Text, { style: styles.fieldValue }, dateStr)
            )
          )
        )
      ),

      // Footer
      React.createElement(
        View,
        { style: styles.footer },
        React.createElement(Text, { style: styles.footerText }, 'IDS Cameroun — Douala, Akwa & Yaoundé, Bastos'),
        React.createElement(Text, { style: styles.footerText }, '+237 675 123 456 | info@ids-cameroun.com')
      )
    )
  );
}

// ─── Route handler ─────────────────────────────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse | Response> {
  const { id } = await params;
  const session = await auth();

  // Récupérer l'inscription
  const inscription = await prisma.inscription.findUnique({
    where: { id },
  });

  if (!inscription) {
    return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 });
  }

  // Autorisation : propriétaire connecté, ADMIN, ou token signé valide
  const token = req.nextUrl.searchParams.get('token');
  const isOwner = session?.user?.email === inscription.email;
  const isAdmin = session?.user?.role === 'ADMIN';
  const hasValidToken = token ? await verifyPdfToken(id, token) : false;

  if (!isOwner && !isAdmin && !hasValidToken) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  try {
    const pdfBuffer = await renderToBuffer(
      React.createElement(InscriptionPDF, { inscription }) as React.ReactElement<DocumentProps>
    );

    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="inscription-${inscription.numeroAuto}.pdf"`,
        'Cache-Control': 'private, no-cache',
      },
    });
  } catch (error) {
    console.error('[pdf] Erreur génération PDF:', error);
    return NextResponse.json({ error: 'Erreur génération PDF' }, { status: 500 });
  }
}
