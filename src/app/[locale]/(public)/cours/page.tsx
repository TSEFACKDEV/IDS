import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import coursData from '@/content/cours.json';
import Badge from '@/components/ui/Badge';
import { ArrowRight, Clock, Users } from 'lucide-react';

interface Cours {
  id: string;
  slug: string;
  image: string;
  niveau: string;
  typesCours: string[];
  dureeHeures: number;
  prixFCFA: number;
  prochainDemarrage: string;
  fr: { titre: string; description: string; objectifs: string[]; programme: string[] };
  de: { titre: string; description: string; objectifs: string[]; programme: string[] };
}

export default async function CoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Courses' });
  const tCommon = await getTranslations({ locale, namespace: 'Common' });
  const cours = coursData.courses as Cours[];
  const l = locale as 'fr' | 'de';

  return (
    <div className="min-h-screen bg-ids-gray-50">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-black mb-4">{t('pageTitle')}</h1>
          <div className="w-12 h-0.5 bg-ids-red-500 mx-auto mb-6" />
          <p className="text-ids-gray-400">{t('pageSubtitle')}</p>
        </div>
      </div>

      <div className="container-ids py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {cours.map((c) => {
            const content = c[l];
            return (
              <div
                key={c.id}
                className="bg-white border border-ids-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Image */}
                <div className="relative h-44 bg-ids-gray-100">
                  <Image
                    src={c.image}
                    alt={content.titre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge label={c.niveau} variant={c.niveau as 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'} />
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-black text-ids-black text-base mb-2">{content.titre}</h3>
                  <p className="text-ids-gray-600 text-sm leading-relaxed mb-4 flex-1">{content.description}</p>

                  {/* Méta */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-ids-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {c.dureeHeures}h
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {c.typesCours.join(', ')}
                    </span>
                  </div>

                  {/* Objectifs */}
                  <ul className="space-y-1.5 mb-5">
                    {content.objectifs.slice(0, 3).map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-ids-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-ids-red-500 mt-1.5 shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="border-t border-ids-gray-200 pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-black text-ids-black">
                        {c.prixFCFA.toLocaleString()} FCFA
                      </div>
                      <div className="text-xs text-ids-gray-400">
                        {t('nextStart')}: {c.prochainDemarrage}
                      </div>
                    </div>
                    <Link
                      href="/inscription"
                      className="inline-flex items-center gap-1 bg-ids-red-500 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-ids-red-600 transition-colors"
                    >
                      {tCommon('enroll')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
