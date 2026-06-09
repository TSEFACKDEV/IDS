import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { GraduationCap, Search, FileCheck, Compass, Plane, Check } from 'lucide-react';

export default async function EtudesAllemagnePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === 'fr';

  const assistances = [
    {
      icon: Search,
      title: isFr ? 'Recherche d\'universités' : 'Universitätssuche',
      items: isFr
        ? ['Identification des universités adaptées à votre profil', 'Analyse des conditions d\'admission', 'Classements et spécialisations']
        : ['Identifizierung geeigneter Universitäten für Ihr Profil', 'Analyse der Zulassungsbedingungen', 'Rankings und Spezialisierungen'],
    },
    {
      icon: FileCheck,
      title: isFr ? 'Constitution des dossiers' : 'Zusammenstellung der Unterlagen',
      items: isFr
        ? ['Pré-inscriptions universitaires (uni-assist)', 'Traduction et légalisation des documents', 'Lettre de motivation en allemand']
        : ['Voranmeldungen an Universitäten (uni-assist)', 'Übersetzung und Beglaubigung von Dokumenten', 'Motivationsschreiben auf Deutsch'],
    },
    {
      icon: Compass,
      title: isFr ? 'Orientation académique' : 'Akademische Orientierung',
      items: isFr
        ? ['Choix des filières adaptées', 'Conseils études en Allemagne', 'Reconversion professionnelle']
        : ['Auswahl geeigneter Studiengänge', 'Studienberatung in Deutschland', 'Berufliche Umorientierung'],
    },
    {
      icon: Plane,
      title: isFr ? 'Préparation au départ' : 'Abreisevorbereitung',
      items: isFr
        ? ['Logement étudiant en Allemagne', 'Assurance et formalités administratives', 'Budget et gestion financière']
        : ['Studentenwohnheim in Deutschland', 'Versicherung und Verwaltungsformalitäten', 'Budget und Finanzverwaltung'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-ids-gold-400/20 text-ids-gold-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <GraduationCap className="w-4 h-4" />
            {isFr ? 'Nos Services' : 'Unsere Leistungen'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <GraduationCap className="w-9 h-9 text-ids-gold-400 shrink-0" />
            {isFr ? 'Accompagnement études en Allemagne' : 'Studienbegleitung in Deutschland'}
          </h1>
          <div className="w-16 h-0.5 bg-ids-gold-400 mx-auto mb-6" />
          <p className="text-ids-gray-400 text-lg leading-relaxed">
            {isFr
              ? 'De la recherche d\'universités jusqu\'à votre installation en Allemagne — IDS vous accompagne à chaque étape de votre parcours académique.'
              : 'Von der Universitätssuche bis zu Ihrer Ankunft in Deutschland — IDS begleitet Sie bei jedem Schritt Ihrer akademischen Laufbahn.'}
          </p>
        </div>
      </div>

      <div className="container-ids py-16">
        {/* Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Nos services d\'assistance universitaire' : 'Unsere universitären Assistenzleistungen'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {assistances.map(({ icon: Icon, title, items }) => (
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

        {/* Étapes */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Comment ça fonctionne ?' : 'Wie funktioniert es?'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { etape: '01', titre: isFr ? 'Inscription & bilan' : 'Anmeldung & Analyse', desc: isFr ? 'Évaluation de votre niveau et de votre projet académique' : 'Bewertung Ihres Niveaus und akademischen Projekts' },
              { etape: '02', titre: isFr ? 'Accompagnement personnalisé' : 'Personalisierte Begleitung', desc: isFr ? 'Constitution de dossier et suivi par un conseiller dédié' : 'Zusammenstellung der Unterlagen und Betreuung durch einen dedizierten Berater' },
              { etape: '03', titre: isFr ? 'Départ en Allemagne' : 'Abreise nach Deutschland', desc: isFr ? 'Préparation complète avant et après votre arrivée' : 'Vollständige Vorbereitung vor und nach Ihrer Ankunft' },
            ].map(({ etape, titre, desc }) => (
              <div key={etape} className="text-center p-6">
                <div className="w-14 h-14 bg-ids-red-500 text-white rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4">
                  {etape}
                </div>
                <h3 className="font-bold text-ids-black mb-2">{titre}</h3>
                <p className="text-sm text-ids-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ids-dark rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-black mb-3">
            {isFr ? 'Votre rêve d\'étudier en Allemagne commence ici' : 'Ihr Traum, in Deutschland zu studieren, beginnt hier'}
          </h2>
          <p className="text-ids-gray-400 mb-6">
            {isFr ? 'Rejoignez les centaines d\'étudiants que nous avons accompagnés vers les universités allemandes.' : 'Schließen Sie sich den Hunderten von Studenten an, die wir zu deutschen Universitäten begleitet haben.'}
          </p>
          <Link
            href="/inscription"
            className="inline-block px-8 py-3 bg-ids-gold-400 text-ids-dark font-bold rounded-lg hover:bg-ids-gold-500 transition-colors"
          >
            {isFr ? 'Démarrer mon accompagnement' : 'Meine Begleitung starten'}
          </Link>
        </section>
      </div>
    </div>
  );
}
