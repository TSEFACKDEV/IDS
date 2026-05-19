import { redirect } from 'next/navigation';

export default async function EspaceEtudiantPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}`);
}


  const t = await getTranslations({ locale, namespace: 'StudentSpace' });

  const inscriptions = await prisma.inscription.findMany({
    where: { email: session!.user!.email! },
    orderBy: { createdAt: 'desc' },
  });

  const STATUT_STYLES: Record<string, string> = {
    EN_ATTENTE: 'bg-amber-100 text-amber-800',
    CONFIRMEE: 'bg-emerald-100 text-emerald-800',
    ANNULEE: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-ids-gray-50 py-12">
      <div className="container-ids max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-ids-black">{t('pageTitle')}</h1>
          <p className="text-ids-gray-600 mt-1">
            {t('welcome', { name: session!.user!.name ?? session!.user!.email ?? '' })}
          </p>
        </div>

        {inscriptions.length === 0 ? (
          <div className="bg-white border border-ids-gray-200 rounded-xl p-12 text-center">
            <BookOpen className="w-10 h-10 text-ids-gray-300 mx-auto mb-4" />
            <h2 className="font-bold text-ids-black mb-2">{t('noInscriptions')}</h2>
            <p className="text-ids-gray-400 text-sm mb-6">{t('noInscriptionsSubtext')}</p>
            <a
              href={`/${locale}/inscription`}
              className="inline-flex items-center gap-2 bg-ids-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-ids-red-600 transition-colors text-sm"
            >
              {t('enrollCta')}
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {inscriptions.map((ins: Inscription) => (
              <div
                key={ins.id}
                className="bg-white border border-ids-gray-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-ids-red-50 rounded-xl flex items-center justify-center">
                    <span className="font-black text-ids-red-500">{ins.niveau}</span>
                  </div>
                  <div>
                    <div className="font-bold text-ids-black">
                      {ins.typeCours.replace('_', ' ')} — {ins.niveau}
                    </div>
                    <div className="text-xs text-ids-gray-400 mt-0.5 font-mono">
                      {ins.numeroAuto}
                    </div>
                    <div className="text-xs text-ids-gray-400 mt-0.5">
                      {t('inscritLe')} {formatDate(ins.createdAt)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUT_STYLES[ins.statut] ?? ''}`}>
                    {ins.statut.replace('_', ' ')}
                  </span>
                  <a
                    href={`/api/pdf/${ins.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-ids-red-500 hover:text-ids-red-700 border border-ids-red-200 rounded-lg px-3 py-1.5 hover:bg-ids-red-50 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    {t('downloadPdf')}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
