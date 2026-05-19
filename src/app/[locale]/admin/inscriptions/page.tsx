import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { FileText, Search, Filter } from 'lucide-react';
import type { Inscription } from '@/generated/prisma';
import { Prisma } from '@/generated/prisma';

type StatutInscription = 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE';

const STATUT_STYLES: Record<StatutInscription, { bg: string; text: string; label: string }> = {
  EN_ATTENTE: { bg: 'bg-amber-100', text: 'text-amber-800', label: 'En attente' },
  CONFIRMEE: { bg: 'bg-emerald-100', text: 'text-emerald-800', label: 'Confirmée' },
  ANNULEE: { bg: 'bg-red-100', text: 'text-red-700', label: 'Annulée' },
};

const NIVEAU_COLORS: Record<string, string> = {
  A1: '#10b981', A2: '#14b8a6', B1: '#3b82f6',
  B2: '#6366f1', C1: '#f59e0b', C2: '#CC0000',
};

const TYPE_LABELS: Record<string, string> = {
  GROUPE: 'Groupe', INDIVIDUEL: 'Individuel',
  INTENSIF: 'Intensif', SEMI_INTENSIF: 'Semi-intensif', EN_LIGNE: 'En ligne',
};

const PAGE_SIZE = 25;

export default async function AdminInscriptionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ statut?: string; niveau?: string; page?: string; q?: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') notFound();

  const { locale } = await params;
  const { statut: statutFilter, niveau: niveauFilter, page: pageStr, q } = await searchParams;
  const page = Math.max(1, parseInt(pageStr ?? '1', 10));

  const where: Prisma.InscriptionWhereInput = {};
  if (statutFilter && statutFilter !== 'all') where.statut = statutFilter as StatutInscription;
  if (niveauFilter && niveauFilter !== 'all') where.niveau = niveauFilter as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  if (q) {
    where.OR = [
      { nom: { contains: q, mode: 'insensitive' } },
      { prenom: { contains: q, mode: 'insensitive' } },
      { email: { contains: q, mode: 'insensitive' } },
      { numeroAuto: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [inscriptions, total] = await Promise.all([
    prisma.inscription.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.inscription.count({ where }),
  ]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const buildUrl = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    const merged = { statut: statutFilter, niveau: niveauFilter, q, page: String(page), ...overrides };
    for (const [k, v] of Object.entries(merged)) {
      if (v && v !== 'all' && v !== '') params.set(k, v);
    }
    return `?${params.toString()}`;
  };

  return (
    <div className="p-6 lg:p-8">
      {/* En-tête */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-ids-black">Inscriptions</h1>
        <p className="text-ids-gray-400 text-sm mt-1">{total} résultat{total > 1 ? 's' : ''}</p>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-xl border border-ids-gray-200 p-4 mb-6 shadow-sm flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-ids-gray-400">
          <Filter className="w-4 h-4" />
          <span className="text-xs font-medium">Filtres</span>
        </div>

        {/* Statut */}
        <div className="flex gap-1.5">
          {[
            { value: 'all', label: 'Tous' },
            { value: 'EN_ATTENTE', label: 'En attente' },
            { value: 'CONFIRMEE', label: 'Confirmées' },
            { value: 'ANNULEE', label: 'Annulées' },
          ].map(({ value, label }) => (
            <Link
              key={value}
              href={buildUrl({ statut: value, page: '1' })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                (statutFilter ?? 'all') === value
                  ? 'bg-ids-red-500 text-white'
                  : 'bg-ids-gray-100 text-ids-gray-600 hover:bg-ids-gray-200'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="w-px h-5 bg-ids-gray-200" />

        {/* Niveau */}
        <div className="flex gap-1.5">
          {['all', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map((n) => (
            <Link
              key={n}
              href={buildUrl({ niveau: n, page: '1' })}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                (niveauFilter ?? 'all') === n
                  ? 'bg-ids-dark text-white'
                  : 'bg-ids-gray-100 text-ids-gray-600 hover:bg-ids-gray-200'
              }`}
            >
              {n === 'all' ? 'Tous niveaux' : n}
            </Link>
          ))}
        </div>

        {/* Recherche */}
        <div className="ml-auto flex items-center gap-2 bg-ids-gray-50 border border-ids-gray-200 rounded-lg px-3 py-1.5 min-w-48">
          <Search className="w-3.5 h-3.5 text-ids-gray-400 shrink-0" />
          <form method="GET" className="flex-1">
            {statutFilter && statutFilter !== 'all' && <input type="hidden" name="statut" value={statutFilter} />}
            {niveauFilter && niveauFilter !== 'all' && <input type="hidden" name="niveau" value={niveauFilter} />}
            <input
              type="text"
              name="q"
              defaultValue={q ?? ''}
              placeholder="Rechercher…"
              className="w-full bg-transparent text-xs text-ids-black placeholder:text-ids-gray-400 outline-none"
            />
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-ids-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {inscriptions.length === 0 ? (
            <div className="text-center py-16 text-ids-gray-400 text-sm">Aucune inscription trouvée</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-ids-gray-50 border-b border-ids-gray-200">
                <tr>
                  {['Numéro', 'Étudiant', 'Email', 'Niveau', 'Type', 'Date inscription', 'Statut', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-ids-gray-400 uppercase tracking-wide whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ids-gray-200">
                {inscriptions.map((ins: Inscription) => {
                  const statut = STATUT_STYLES[ins.statut as StatutInscription];
                  return (
                    <tr key={ins.id} className="hover:bg-ids-gray-50 transition-colors group">
                      <td className="px-4 py-3 font-mono text-xs text-ids-red-500 font-semibold whitespace-nowrap">
                        {ins.numeroAuto}
                      </td>
                      <td className="px-4 py-3 font-semibold text-ids-black text-sm whitespace-nowrap">
                        {ins.nom} {ins.prenom}
                      </td>
                      <td className="px-4 py-3 text-xs text-ids-gray-400">{ins.email}</td>
                      <td className="px-4 py-3">
                        <span
                          className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ backgroundColor: NIVEAU_COLORS[ins.niveau] + '22', color: NIVEAU_COLORS[ins.niveau] }}
                        >
                          {ins.niveau}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-ids-gray-600 whitespace-nowrap">
                        {TYPE_LABELS[ins.typeCours] ?? ins.typeCours}
                      </td>
                      <td className="px-4 py-3 text-xs text-ids-gray-400 whitespace-nowrap">
                        {formatDate(ins.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        {statut && (
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statut.bg} ${statut.text}`}>
                            {statut.label}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/${locale}/admin/inscriptions/${ins.id}`}
                          className="inline-flex items-center gap-1 text-xs text-ids-red-500 hover:text-ids-red-700 font-medium transition-colors opacity-0 group-hover:opacity-100"
                        >
                          <FileText className="w-3.5 h-3.5" /> Voir
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-ids-gray-200 flex items-center justify-between">
            <span className="text-xs text-ids-gray-400">
              Page {page} sur {totalPages} — {total} inscription{total > 1 ? 's' : ''}
            </span>
            <div className="flex gap-1.5">
              {page > 1 && (
                <Link href={buildUrl({ page: String(page - 1) })}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-ids-gray-100 text-ids-gray-600 hover:bg-ids-gray-200">
                  ← Préc.
                </Link>
              )}
              {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                const p = i + 1;
                return (
                  <Link key={p} href={buildUrl({ page: String(p) })}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                      page === p ? 'bg-ids-red-500 text-white' : 'bg-ids-gray-100 text-ids-gray-600 hover:bg-ids-gray-200'
                    }`}>
                    {p}
                  </Link>
                );
              })}
              {page < totalPages && (
                <Link href={buildUrl({ page: String(page + 1) })}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-ids-gray-100 text-ids-gray-600 hover:bg-ids-gray-200">
                  Suiv. →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
