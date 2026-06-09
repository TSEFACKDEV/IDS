import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import CoursRessourcesAdmin from './CoursRessourcesAdmin';
import type { CoursRessource } from '@/generated/prisma';

export default async function AdminCoursRessourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') notFound();

  const ressources = await prisma.coursRessource.findMany({
    orderBy: [{ niveau: 'asc' }, { ordre: 'asc' }],
  });

  const stats = {
    total: ressources.length,
    publies: ressources.filter((r: CoursRessource) => r.publie).length,
    audio: ressources.filter((r: CoursRessource) => r.type === 'AUDIO').length,
    video: ressources.filter((r: CoursRessource) => r.type === 'VIDEO').length,
    texte: ressources.filter((r: CoursRessource) => r.type === 'TEXTE').length,
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-ids-black">Cours & Ressources</h1>
        <p className="text-ids-gray-400 text-sm mt-1">
          Gérez les ressources pédagogiques (audio, vidéo, texte) par niveau
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Total', value: stats.total, color: 'text-ids-black' },
          { label: 'Publiés', value: stats.publies, color: 'text-emerald-600' },
          { label: 'Audio', value: stats.audio, color: 'text-blue-600' },
          { label: 'Vidéo', value: stats.video, color: 'text-purple-600' },
          { label: 'Texte/PDF', value: stats.texte, color: 'text-ids-red-500' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-xl border border-ids-gray-200 p-4 shadow-sm text-center">
            <p className={`text-2xl font-black ${color}`}>{value}</p>
            <p className="text-xs text-ids-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <CoursRessourcesAdmin initialRessources={ressources as CoursRessource[]} />
    </div>
  );
}
