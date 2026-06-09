import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Briefcase, Search, FileText, TrendingUp, Star, Check, Globe } from 'lucide-react';

export default async function AusbildungCarrierePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === 'fr';

  const services = [
    {
      icon: Search,
      title: isFr ? 'Recherche de contrats Ausbildung' : 'Suche nach Ausbildungsverträgen',
      items: isFr
        ? ['Identification des entreprises partenaires', 'Sélection selon votre profil et vos compétences', 'Secteurs porteurs : santé, hôtellerie, informatique']
        : ['Identifizierung von Partnerunternehmen', 'Auswahl nach Ihrem Profil und Ihren Kompetenzen', 'Wachstumssektoren: Gesundheit, Hotel, IT'],
    },
    {
      icon: FileText,
      title: isFr ? 'Aide aux candidatures' : 'Bewerbungsunterstützung',
      items: isFr
        ? ['CV allemand professionnel (Lebenslauf)', 'Lettre de motivation (Anschreiben) en allemand', 'Préparation du dossier de candidature complet']
        : ['Professioneller deutscher Lebenslauf', 'Motivationsschreiben (Anschreiben) auf Deutsch', 'Vorbereitung der vollständigen Bewerbungsmappe'],
    },
    {
      icon: Star,
      title: isFr ? 'Préparation aux entretiens' : 'Interviewvorbereitung',
      items: isFr
        ? ['Simulation d\'entretiens en allemand', 'Vocabulaire professionnel spécialisé', 'Codes culturels du monde du travail allemand']
        : ['Simulation von Vorstellungsgesprächen auf Deutsch', 'Spezialisierter Berufswortschatz', 'Kulturelle Codes der deutschen Arbeitswelt'],
    },
    {
      icon: TrendingUp,
      title: isFr ? 'Insertion professionnelle' : 'Berufliche Eingliederung',
      items: isFr
        ? ['Orientation et conseils de carrière en Allemagne', 'Accompagnement post-Ausbildung', 'Réseau professionnel et partenariats']
        : ['Orientierung und Karriereberatung in Deutschland', 'Begleitung nach der Ausbildung', 'Berufsnetzwerk und Partnerschaften'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-ids-gold-400/20 text-ids-gold-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Briefcase className="w-4 h-4" />
            {isFr ? 'Nos Services' : 'Unsere Leistungen'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <Briefcase className="w-9 h-9 text-ids-gold-400 shrink-0" />
            {isFr ? 'Programme Ausbildung & Carrière' : 'Ausbildung & Karriereprogramm'}
          </h1>
          <div className="w-16 h-0.5 bg-ids-gold-400 mx-auto mb-6" />
          <p className="text-ids-gray-400 text-lg leading-relaxed">
            {isFr
              ? 'L\'Ausbildung est une voie royale vers une carrière en Allemagne. IDS vous accompagne de la recherche de contrat jusqu\'à votre intégration professionnelle.'
              : 'Die Ausbildung ist der Königsweg zu einer Karriere in Deutschland. IDS begleitet Sie von der Vertragssuche bis zu Ihrer beruflichen Eingliederung.'}
          </p>
        </div>
      </div>

      <div className="container-ids py-16">
        {/* Qu'est-ce que l'Ausbildung ? */}
        <section className="mb-16">
          <div className="bg-ids-gold-400/10 border border-ids-gold-400 rounded-2xl p-8 max-w-3xl">
            <h2 className="text-xl font-black text-ids-black mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-ids-gold-400 shrink-0" />
              {isFr ? "Qu'est-ce que l'Ausbildung ?" : 'Was ist die Ausbildung?'}
            </h2>
            <p className="text-ids-gray-700 leading-relaxed">
              {isFr
                ? 'L\'Ausbildung est une formation professionnelle en alternance (duale Ausbildung) très développée en Allemagne. Elle permet d\'acquérir une qualification reconnue tout en étant rémunéré par l\'entreprise. Durée : 2 à 3 ans. Plus de 320 métiers sont disponibles.'
                : 'Die Ausbildung ist eine duale Berufsausbildung, die in Deutschland sehr verbreitet ist. Sie ermöglicht den Erwerb einer anerkannten Qualifikation bei gleichzeitiger Entlohnung durch das Unternehmen. Dauer: 2 bis 3 Jahre. Über 320 Berufe stehen zur Verfügung.'}
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Notre accompagnement' : 'Unsere Begleitung'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {services.map(({ icon: Icon, title, items }) => (
              <div key={title} className="border border-ids-gray-200 rounded-2xl p-7 hover:shadow-md transition-shadow hover:border-ids-red-500">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-ids-red-50 rounded-lg flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-ids-red-500" />
                  </div>
                  <h3 className="font-black text-ids-black text-lg">{title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-ids-gray-600">
                      <Check className="w-3.5 h-3.5 text-ids-gold-400 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ids-dark rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-black mb-3">
            {isFr ? 'Lancez votre carrière en Allemagne' : 'Starten Sie Ihre Karriere in Deutschland'}
          </h2>
          <p className="text-ids-gray-400 mb-6">
            {isFr ? 'Un conseiller dédié vous guide dans toutes les démarches, de A à Z.' : 'Ein dedizierter Berater begleitet Sie durch alle Schritte, von A bis Z.'}
          </p>
          <Link
            href="/inscription"
            className="inline-block px-8 py-3 bg-ids-gold-400 text-ids-dark font-bold rounded-lg hover:bg-ids-gold-500 transition-colors"
          >
            {isFr ? 'Rejoindre le programme' : 'Am Programm teilnehmen'}
          </Link>
        </section>
      </div>
    </div>
  );
}
