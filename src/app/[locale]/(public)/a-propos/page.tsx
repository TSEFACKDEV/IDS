import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'About' });
  const isFr = locale === 'fr';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero A propos */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-black mb-4">{t('pageTitle')}</h1>
          <div className="w-12 h-0.5 bg-ids-gold-400 mx-auto mb-6" />
        </div>
      </div>

      <div className="container-ids py-14">
        {/* Histoire */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-black text-ids-black mb-4">{t('historyTitle')}</h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-6" />
          <p className="text-ids-gray-600 leading-relaxed mb-5">{t('historyText1')}</p>
          <p className="text-ids-gray-600 leading-relaxed mb-5">{t('historyText2')}</p>
          <p className="text-ids-gray-600 leading-relaxed mb-5">{t('historyText3')}</p>
          <p className="text-ids-gray-600 leading-relaxed mb-5">{t('historyText4')}</p>
          <p className="text-ids-gray-600 leading-relaxed">{t('historyText5')}</p>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <div className="bg-ids-red-50 border-l-4 border-ids-red-500 rounded-r-xl p-8 max-w-3xl">
            <h2 className="text-2xl font-black text-ids-black mb-4">{t('missionTitle')}</h2>
            <p className="text-ids-gray-700 leading-relaxed">{t('missionText')}</p>
          </div>
        </section>

        {/* Équipe */}
        <section>
          <div className="mb-8">
            <h2 className="text-2xl font-black text-ids-black mb-2">{t('teamTitle')}</h2>
            <div className="w-12 h-0.5 bg-ids-red-500 mb-6" />
          </div>
          <div className="bg-ids-dark text-white rounded-2xl p-10 max-w-3xl">
            <p className="text-ids-gray-300 leading-relaxed text-lg">
              {isFr
                ? 'IDS réunit une équipe multidisciplinaire composée d\'enseignants qualifiés et motivés, de conseillers académiques et de spécialistes de l\'accompagnement vers l\'Allemagne.'
                : 'Das IDS vereint ein multidisziplinäres Team aus qualifizierten und motivierten Lehrern, akademischen Beratern und Spezialisten für die Begleitung nach Deutschland.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
