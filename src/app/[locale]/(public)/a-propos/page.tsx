import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import equipeData from '@/content/equipe.json';

interface TeamMember {
  id: string;
  photo: string;
  fr: { nom: string; role: string; bio: string; specialite: string };
  de: { nom: string; role: string; bio: string; specialite: string };
}

export default async function AProposPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });
  const team = equipeData.equipe as TeamMember[];
  const l = locale as 'fr' | 'de';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero A propos */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-black mb-4">{t('pageTitle')}</h1>
          <div className="w-12 h-0.5 bg-ids-red-500 mx-auto mb-6" />
        </div>
      </div>

      <div className="container-ids py-14">
        {/* Histoire */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-black text-ids-black mb-4">{t('historyTitle')}</h2>
          <p className="text-ids-gray-600 leading-relaxed mb-4">{t('historyText1')}</p>
          <p className="text-ids-gray-600 leading-relaxed">{t('historyText2')}</p>
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
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-ids-black mb-2">{t('teamTitle')}</h2>
            <p className="text-ids-gray-600">{t('teamSubtitle')}</p>
            <div className="mt-4 mx-auto w-12 h-0.5 bg-ids-red-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => {
              const content = member[l];
              return (
                <div
                  key={member.id}
                  className="bg-white border border-ids-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-52 bg-ids-gray-100">
                    <Image
                      src={member.photo}
                      alt={content.nom}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ids-black text-sm">{content.nom}</h3>
                    <p className="text-ids-red-500 text-xs font-medium mt-0.5 mb-3">{content.role}</p>
                    <p className="text-ids-gray-600 text-xs leading-relaxed mb-3">{content.bio}</p>
                    <div className="bg-ids-gray-50 rounded-lg px-3 py-2">
                      <span className="text-xs text-ids-gray-400 font-medium">Spécialité</span>
                      <p className="text-xs text-ids-black mt-0.5">{content.specialite}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
