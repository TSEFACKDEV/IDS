import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { BookOpen, FileText } from 'lucide-react';
import { FaFilePdf, FaHeadphones, FaVideo } from 'react-icons/fa';
import Link from 'next/link';
import type { CoursRessource } from '@/generated/prisma';

const TYPE_LABELS: Record<string, string> = {
  AUDIO: 'Audio',
  VIDEO: 'Vidéo',
  TEXTE: 'Texte / PDF',
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  AUDIO: FaHeadphones,
  VIDEO: FaVideo,
  TEXTE: FaFilePdf,
};

const TYPE_COLORS: Record<string, string> = {
  AUDIO: 'bg-blue-50 text-blue-600 border-blue-200',
  VIDEO: 'bg-purple-50 text-purple-600 border-purple-200',
  TEXTE: 'bg-red-50 text-ids-red-500 border-red-200',
};

const NIVEAU_COLORS: Record<string, string> = {
  A1: 'bg-emerald-100 text-emerald-800',
  A2: 'bg-teal-100 text-teal-800',
  B1: 'bg-blue-100 text-blue-800',
  B2: 'bg-indigo-100 text-indigo-800',
  C1: 'bg-amber-100 text-amber-800',
};

export default async function EspaceEtudiantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(`/${locale}/connexion`);
  }

  const inscription = await prisma.inscription.findFirst({
    where: { email: session.user.email ?? '' },
    orderBy: { createdAt: 'desc' },
    select: { niveau: true, statut: true, numeroAuto: true, typeCours: true, nom: true, prenom: true },
  });

  if (!inscription || inscription.statut !== 'CONFIRMEE') {
    return (
      <div className="min-h-screen bg-ids-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 max-w-md w-full text-center border border-ids-gray-200 shadow-sm">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-xl font-black text-ids-black mb-3">Accès en attente</h1>
          {inscription ? (
            <p className="text-ids-gray-600 text-sm leading-relaxed">
              Votre inscription <strong>{inscription.numeroAuto}</strong> est en cours de validation.
              Une fois votre paiement confirmé par l&apos;administrateur, vous aurez accès à vos cours.
            </p>
          ) : (
            <p className="text-ids-gray-600 text-sm leading-relaxed">
              Vous n&apos;avez pas encore d&apos;inscription enregistrée.
            </p>
          )}
          <Link
            href={`/${locale}/inscription`}
            className="mt-6 inline-block px-6 py-2.5 bg-ids-red-500 text-white font-semibold rounded-lg hover:bg-ids-red-600 transition-colors text-sm"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>
    );
  }

  const ressources = await prisma.coursRessource.findMany({
    where: { publie: true, niveau: inscription.niveau },
    orderBy: [{ type: 'asc' }, { ordre: 'asc' }],
  });

  const byType = {
    AUDIO: ressources.filter((r: CoursRessource) => r.type === 'AUDIO'),
    VIDEO: ressources.filter((r: CoursRessource) => r.type === 'VIDEO'),
    TEXTE: ressources.filter((r: CoursRessource) => r.type === 'TEXTE'),
  };

  return (
    <div className="min-h-screen bg-ids-gray-50">
      {/* En-tête */}
      <div className="bg-ids-dark text-white py-12">
        <div className="container-ids">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-ids-gray-400 text-sm mb-1">Bienvenue,</p>
              <h1 className="text-2xl font-black">{inscription.prenom} {inscription.nom}</h1>
              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${NIVEAU_COLORS[inscription.niveau] ?? 'bg-gray-100 text-gray-700'}`}>
                  Niveau {inscription.niveau}
                </span>
                <span className="text-ids-gray-500 text-xs">{inscription.numeroAuto}</span>
              </div>
            </div>
            <div className="bg-white/[0.06] border border-white/10 rounded-xl px-6 py-4 text-center">
              <p className="text-ids-gray-400 text-xs mb-1">Ressources disponibles</p>
              <p className="text-3xl font-black text-white">{ressources.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-ids py-10">
        {ressources.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-ids-gray-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <BookOpen className="w-8 h-8 text-ids-gray-400" />
            </div>
            <h2 className="text-lg font-bold text-ids-black mb-2">Aucun cours disponible pour l&apos;instant</h2>
            <p className="text-ids-gray-500 text-sm">
              Les ressources pour le niveau {inscription.niveau} seront bientôt publiées par votre formateur.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {(Object.entries(byType) as [string, CoursRessource[]][]).map(([type, items]) => {
              if (items.length === 0) return null;
              const Icon = TYPE_ICONS[type] ?? FileText;
              const colorClass = TYPE_COLORS[type] ?? 'bg-gray-50 text-gray-600 border-gray-200';
              return (
                <section key={type}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorClass}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-ids-black">{TYPE_LABELS[type]}</h2>
                      <p className="text-xs text-ids-gray-500">{items.length} ressource{items.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {items.map((ressource: CoursRessource) => (
                      <div
                        key={ressource.id}
                        className="bg-white rounded-xl border border-ids-gray-200 p-5 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <h3 className="font-bold text-ids-black text-sm leading-snug">{ressource.titre}</h3>
                          <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border ${colorClass}`}>
                            {TYPE_LABELS[ressource.type]}
                          </span>
                        </div>

                        {ressource.description && (
                          <p className="text-xs text-ids-gray-500 mb-4 leading-relaxed">{ressource.description}</p>
                        )}

                        {ressource.type === 'AUDIO' && ressource.url && (
                          <audio controls className="w-full mt-3" src={ressource.url}>
                            Votre navigateur ne supporte pas l&apos;audio.
                          </audio>
                        )}

                        {ressource.type === 'VIDEO' && ressource.url && (
                          <div className="mt-3">
                            {ressource.url.includes('youtube') || ressource.url.includes('youtu.be') ? (
                              <a
                                href={ressource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-purple-600 font-semibold hover:underline"
                              >
                                <FaVideo className="w-4 h-4" />
                                Regarder la vidéo
                              </a>
                            ) : (
                              <video controls className="w-full rounded-lg" src={ressource.url}>
                                Votre navigateur ne supporte pas la vidéo.
                              </video>
                            )}
                          </div>
                        )}

                        {ressource.type === 'TEXTE' && (
                          <div className="mt-3">
                            {ressource.url && (
                              <a
                                href={ressource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-ids-red-500 font-semibold hover:underline"
                              >
                                <FaFilePdf className="w-4 h-4" />
                                Télécharger / Lire le document
                              </a>
                            )}
                            {ressource.contenu && (
                              <div className="mt-3 bg-ids-gray-50 rounded-lg p-4 text-xs text-ids-gray-700 leading-relaxed max-h-48 overflow-y-auto">
                                <pre className="whitespace-pre-wrap font-sans">{ressource.contenu}</pre>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
