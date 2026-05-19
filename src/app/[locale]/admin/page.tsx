import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import { FileText, Users, Clock, CheckCircle, XCircle, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import type { Inscription } from '@/generated/prisma';

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

export default async function AdminDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') notFound();

  const { locale } = await params;
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

  const [total, enAttente, confirmees, annulees, cemois, moisPrecedent] = await Promise.all([
    prisma.inscription.count(),
    prisma.inscription.count({ where: { statut: 'EN_ATTENTE' } }),
    prisma.inscription.count({ where: { statut: 'CONFIRMEE' } }),
    prisma.inscription.count({ where: { statut: 'ANNULEE' } }),
    prisma.inscription.count({ where: { createdAt: { gte: startOfMonth } } }),
    prisma.inscription.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
  ]);

  const croissance = moisPrecedent > 0
    ? Math.round(((cemois - moisPrecedent) / moisPrecedent) * 100)
    : cemois > 0 ? 100 : 0;

  const niveaux = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
  const statsByNiveau = await Promise.all(
    niveaux.map((n) => prisma.inscription.count({ where: { niveau: n } }))
  );

  const typesCours = ['GROUPE', 'INDIVIDUEL', 'INTENSIF', 'SEMI_INTENSIF', 'EN_LIGNE'] as const;
  const statsByType = await Promise.all(
    typesCours.map((t) => prisma.inscription.count({ where: { typeCours: t } }))
  );

  const dernieres = await prisma.inscription.findMany({
    orderBy: { createdAt: 'desc' },
    take: 8,
  });

  const months: { label: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59);
    const count = await prisma.inscription.count({ where: { createdAt: { gte: d, lte: end } } });
    months.push({ label: d.toLocaleDateString('fr-FR', { month: 'short' }), count });
  }
  const maxMonth = Math.max(...months.map((m) => m.count), 1);
  const taux = total > 0 ? Math.round((confirmees / total) * 100) : 0;

  return (
    <div className="p-6 lg:p-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-ids-black">Tableau de bord</h1>
        <p className="text-ids-gray-400 text-sm mt-1">
          {now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total inscriptions', value: total, icon: Users, color: 'text-ids-black', bg: 'bg-ids-gray-100', border: 'border-ids-gray-200' },
          { label: 'En attente', value: enAttente, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
          { label: 'Confirmées', value: confirmees, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
          { label: 'Annulées', value: annulees, icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' },
        ].map(({ label, value, icon: Icon, color, bg, border }) => (
          <div key={label} className={`bg-white rounded-xl border ${border} p-5 shadow-sm`}>
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-3xl font-black text-ids-black">{value}</div>
            <div className="text-xs text-ids-gray-400 mt-1 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Activité 6 mois */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-ids-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-bold text-ids-black text-sm">Activité mensuelle</h2>
              <p className="text-xs text-ids-gray-400 mt-0.5">6 derniers mois</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3 h-3" />
              {croissance > 0 ? '+' : ''}{croissance}% vs mois dernier
            </div>
          </div>
          <div className="flex items-end gap-2 h-32">
            {months.map(({ label, count }) => {
              const pct = (count / maxMonth) * 100;
              return (
                <div key={label} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-ids-black">{count}</span>
                  <div className="w-full flex items-end" style={{ height: '80px' }}>
                    <div className="w-full rounded-t-md bg-ids-red-500 transition-all" style={{ height: `${Math.max(pct, 5)}%` }} />
                  </div>
                  <span className="text-[10px] text-ids-gray-400 capitalize">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Résumé ce mois */}
        <div className="bg-white rounded-xl border border-ids-gray-200 p-6 shadow-sm flex flex-col gap-4">
          <div>
            <h2 className="font-bold text-ids-black text-sm">Ce mois-ci</h2>
            <p className="text-3xl font-black text-ids-black mt-1">{cemois} <span className="text-base font-normal text-ids-gray-400">inscriptions</span></p>
          </div>
          <hr className="border-ids-gray-200" />
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ids-gray-400">Taux de confirmation</span>
              <span className="text-xs font-bold text-ids-black">{taux}%</span>
            </div>
            <div className="w-full h-2 bg-ids-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${taux}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-4 h-4 text-ids-gray-400" />
            <span className="text-ids-gray-400">Mois précédent :</span>
            <span className="font-semibold text-ids-black">{moisPrecedent}</span>
          </div>
        </div>
      </div>

      {/* Répartitions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* Par niveau */}
        <div className="bg-white rounded-xl border border-ids-gray-200 p-6 shadow-sm">
          <h2 className="font-bold text-ids-black text-sm mb-5">Répartition par niveau</h2>
          <div className="space-y-3">
            {niveaux.map((n, i) => {
              const count = statsByNiveau[i];
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={n} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-ids-black w-6">{n}</span>
                  <div className="flex-1 h-2 bg-ids-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: NIVEAU_COLORS[n] }} />
                  </div>
                  <span className="text-xs text-ids-gray-400 w-16 text-right">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Par type */}
        <div className="bg-white rounded-xl border border-ids-gray-200 p-6 shadow-sm">
          <h2 className="font-bold text-ids-black text-sm mb-5">Répartition par type de cours</h2>
          <div className="space-y-3">
            {typesCours.map((type, i) => {
              const count = statsByType[i];
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div key={type} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-ids-black w-24 truncate">{TYPE_LABELS[type]}</span>
                  <div className="flex-1 h-2 bg-ids-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-ids-red-500 rounded-full opacity-80" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-ids-gray-400 w-16 text-right">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dernières inscriptions */}
      <div className="bg-white rounded-xl border border-ids-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-ids-gray-200 flex items-center justify-between">
          <h2 className="font-bold text-ids-black text-sm">Dernières inscriptions</h2>
          <Link
            href={`/${locale}/admin/inscriptions`}
            className="flex items-center gap-1.5 text-xs text-ids-red-500 hover:text-ids-red-700 font-medium transition-colors"
          >
            Voir tout <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ids-gray-50 border-b border-ids-gray-200">
              <tr>
                {['Numéro', 'Nom / Prénom', 'Niveau', 'Type', 'Date', 'Statut', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-ids-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ids-gray-200">
              {dernieres.map((ins: Inscription) => {
                const statut = STATUT_STYLES[ins.statut as StatutInscription];
                return (
                  <tr key={ins.id} className="hover:bg-ids-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-ids-red-500 font-semibold whitespace-nowrap">{ins.numeroAuto}</td>
                    <td className="px-4 py-3 font-medium text-ids-black text-sm">{ins.nom} {ins.prenom}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-bold"
                        style={{ backgroundColor: NIVEAU_COLORS[ins.niveau] + '22', color: NIVEAU_COLORS[ins.niveau] }}>
                        {ins.niveau}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-ids-gray-600 whitespace-nowrap">{TYPE_LABELS[ins.typeCours] ?? ins.typeCours}</td>
                    <td className="px-4 py-3 text-xs text-ids-gray-400 whitespace-nowrap">{formatDate(ins.createdAt)}</td>
                    <td className="px-4 py-3">
                      {statut && <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statut.bg} ${statut.text}`}>{statut.label}</span>}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/${locale}/admin/inscriptions/${ins.id}`}
                        className="inline-flex items-center gap-1 text-xs text-ids-red-500 hover:text-ids-red-700 font-medium transition-colors">
                        <FileText className="w-3.5 h-3.5" /> Détail
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {dernieres.length === 0 && (
            <div className="text-center py-12 text-ids-gray-400 text-sm">Aucune inscription pour le moment</div>
          )}
        </div>
      </div>
    </div>
  );
}
