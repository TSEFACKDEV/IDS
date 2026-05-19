import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import {
  ArrowLeft, User, BookOpen, Clock, Mail, Phone,
  MapPin, Calendar, FileText, CheckCircle, Send,
} from 'lucide-react';
import StatutActions from './StatutActions';

const NIVEAU_COLORS: Record<string, string> = {
  A1: '#10b981', A2: '#14b8a6', B1: '#3b82f6',
  B2: '#6366f1', C1: '#f59e0b', C2: '#CC0000',
};

const TYPE_LABELS: Record<string, string> = {
  GROUPE: 'Cours en groupe', INDIVIDUEL: 'Cours individuel',
  INTENSIF: 'Stage intensif', SEMI_INTENSIF: 'Semi-intensif', EN_LIGNE: 'Cours en ligne',
};

const OBJECTIF_LABELS: Record<string, string> = {
  ETUDES_ALLEMAGNE: 'Études en Allemagne',
  TRAVAIL: 'Travail / Emploi',
  PREPARATION_EXAMEN: 'Préparation examen',
  VOYAGE: 'Voyage / Tourisme',
  AUTRE: 'Autre objectif',
};

const CRENEAU_LABELS: Record<string, string> = {
  MATIN: 'Matin (7h–12h)', MIDI: 'Midi (12h–15h)',
  SOIR: 'Soir (17h–21h)', WEEKEND: 'Week-end',
};

const JOUR_LABELS: Record<string, string> = {
  LUNDI: 'Lundi', MARDI: 'Mardi', MERCREDI: 'Mercredi',
  JEUDI: 'Jeudi', VENDREDI: 'Vendredi', SAMEDI: 'Samedi',
};

function Field({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold text-ids-gray-400 uppercase tracking-wide mb-0.5">{label}</dt>
      <dd className="text-sm font-medium text-ids-black">{value || <span className="text-ids-gray-400 font-normal italic">—</span>}</dd>
    </div>
  );
}

export default async function AdminInscriptionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') notFound();

  const { locale, id } = await params;

  const ins = await prisma.inscription.findUnique({
    where: { id },
    include: { emailLogs: { orderBy: { createdAt: 'desc' } } },
  });

  if (!ins) notFound();

  const statutColor = ins.statut === 'CONFIRMEE'
    ? { bg: 'bg-emerald-100', text: 'text-emerald-800' }
    : ins.statut === 'ANNULEE'
    ? { bg: 'bg-red-100', text: 'text-red-700' }
    : { bg: 'bg-amber-100', text: 'text-amber-800' };

  const statutLabel = ins.statut === 'CONFIRMEE' ? 'Confirmée'
    : ins.statut === 'ANNULEE' ? 'Annulée' : 'En attente';

  return (
    <div className="p-6 lg:p-8">
      {/* Navigation */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`/${locale}/admin/inscriptions`}
          className="flex items-center gap-1.5 text-sm text-ids-gray-400 hover:text-ids-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Inscriptions
        </Link>
        <span className="text-ids-gray-200">/</span>
        <span className="text-sm font-mono font-semibold text-ids-red-500">{ins.numeroAuto}</span>
      </div>

      {/* Header carte */}
      <div className="bg-white rounded-xl border border-ids-gray-200 shadow-sm p-6 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-ids-gray-100 rounded-full flex items-center justify-center shrink-0">
              <span className="text-xl font-black text-ids-black">
                {ins.prenom[0]}{ins.nom[0]}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-black text-ids-black">{ins.prenom} {ins.nom}</h1>
              <div className="flex items-center gap-3 mt-1 flex-wrap">
                <span className="text-sm text-ids-gray-400 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {ins.email}
                </span>
                <span className="text-sm text-ids-gray-400 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {ins.telephone}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="font-mono text-xs text-ids-red-500 font-bold bg-ids-red-50 px-2 py-0.5 rounded">
                  {ins.numeroAuto}
                </span>
                <span
                  className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: NIVEAU_COLORS[ins.niveau] + '22', color: NIVEAU_COLORS[ins.niveau] }}
                >
                  Niveau {ins.niveau}
                </span>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statutColor.bg} ${statutColor.text}`}>
                  {statutLabel}
                </span>
              </div>
            </div>
          </div>

          {/* PDF */}
          <a
            href={`/api/pdf/${ins.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-ids-dark text-white text-sm font-semibold rounded-lg hover:bg-ids-black transition-colors shrink-0"
          >
            <FileText className="w-4 h-4" /> Télécharger PDF
          </a>
        </div>

        <hr className="my-5 border-ids-gray-200" />

        {/* Actions statut */}
        <div>
          <p className="text-xs font-semibold text-ids-gray-400 uppercase tracking-wide mb-3">Changer le statut</p>
          <StatutActions inscriptionId={ins.id} currentStatut={ins.statut as 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE'} />
        </div>
      </div>

      {/* Grille détails */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Informations personnelles */}
        <div className="bg-white rounded-xl border border-ids-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-ids-red-50 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-ids-red-500" />
            </div>
            <h2 className="font-bold text-ids-black text-sm">Informations personnelles</h2>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            <Field label="Nom" value={ins.nom.toUpperCase()} />
            <Field label="Prénom" value={ins.prenom} />
            <Field label="Email" value={ins.email} />
            <Field label="Téléphone" value={ins.telephone} />
            <Field label="Date de naissance" value={ins.dateNaissance ?? undefined} />
            <Field label="Sexe" value={ins.sexe ?? undefined} />
            <Field label="Nationalité" value={ins.nationalite ?? undefined} />
            <Field label="Profession" value={ins.profession ?? undefined} />
          </dl>
          {(ins.adresse || ins.ville) && (
            <div className="mt-4 pt-4 border-t border-ids-gray-200">
              <div className="flex items-center gap-1.5 text-xs text-ids-gray-400 mb-2">
                <MapPin className="w-3.5 h-3.5" /> Adresse
              </div>
              <p className="text-sm text-ids-black">
                {[ins.adresse, ins.ville, ins.codePostal].filter(Boolean).join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Formation & Disponibilités */}
        <div className="space-y-6">
          {/* Formation */}
          <div className="bg-white rounded-xl border border-ids-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="font-bold text-ids-black text-sm">Formation choisie</h2>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-[11px] font-semibold text-ids-gray-400 uppercase tracking-wide mb-1">Niveau</dt>
                <dd>
                  <span className="inline-flex px-2.5 py-1 rounded-lg text-sm font-black"
                    style={{ backgroundColor: NIVEAU_COLORS[ins.niveau] + '22', color: NIVEAU_COLORS[ins.niveau] }}>
                    {ins.niveau}
                  </span>
                </dd>
              </div>
              <Field label="Type de cours" value={TYPE_LABELS[ins.typeCours]} />
              <Field label="Objectif" value={OBJECTIF_LABELS[ins.objectif]} />
              {ins.objectif === 'AUTRE' && <Field label="Précision" value={ins.objectifAutre ?? undefined} />}
              <Field label="Niveau d'études" value={ins.niveauEtudes ?? undefined} />
            </dl>
          </div>

          {/* Disponibilités */}
          <div className="bg-white rounded-xl border border-ids-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="font-bold text-ids-black text-sm">Disponibilités</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-[11px] font-semibold text-ids-gray-400 uppercase tracking-wide mb-2">Créneaux</p>
                <div className="flex flex-wrap gap-2">
                  {ins.creneaux.map((c) => (
                    <span key={c} className="px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-lg">
                      {CRENEAU_LABELS[c] ?? c}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold text-ids-gray-400 uppercase tracking-wide mb-2">Jours préférés</p>
                <div className="flex flex-wrap gap-2">
                  {ins.jours.map((j) => (
                    <span key={j} className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg">
                      {JOUR_LABELS[j] ?? j}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métadonnées + Logs email */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Métadonnées */}
        <div className="bg-white rounded-xl border border-ids-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-ids-gray-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-ids-gray-400" />
            </div>
            <h2 className="font-bold text-ids-black text-sm">Suivi</h2>
          </div>
          <dl className="space-y-3">
            <Field label="Date d'inscription" value={formatDate(ins.createdAt)} />
            <Field label="Langue de préférence" value={ins.languePref === 'fr' ? 'Français' : 'Deutsch'} />
            <div>
              <dt className="text-[11px] font-semibold text-ids-gray-400 uppercase tracking-wide mb-1">Règlement accepté</dt>
              <dd className="flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                <CheckCircle className="w-4 h-4" /> Oui
              </dd>
            </div>
          </dl>
        </div>

        {/* Logs email */}
        <div className="bg-white rounded-xl border border-ids-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
              <Send className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="font-bold text-ids-black text-sm">Emails envoyés</h2>
          </div>
          {ins.emailLogs.length === 0 ? (
            <p className="text-sm text-ids-gray-400 italic">Aucun email envoyé</p>
          ) : (
            <div className="space-y-3">
              {ins.emailLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-ids-gray-50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${log.statut === 'ENVOYE' ? 'bg-emerald-500' : 'bg-red-400'}`} />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-ids-black truncate">{log.sujet}</p>
                    <p className="text-[10px] text-ids-gray-400 mt-0.5">
                      {log.envoye_le ? formatDate(log.envoye_le) : formatDate(log.createdAt)} — {log.statut}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
