import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { BookOpen, Users, Monitor, Zap, User, Clock } from 'lucide-react';

export default async function FormationsAllemandesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Common' });
  const isFr = locale === 'fr';

  const niveaux = [
    { niveau: 'A1', couleur: 'bg-green-100 border-green-400 text-green-800', desc: isFr ? 'Débutant complet — bases de la langue' : 'Kompletter Anfänger — Grundlagen der Sprache', prix: '75 000' },
    { niveau: 'A2', couleur: 'bg-green-100 border-green-400 text-green-800', desc: isFr ? 'Élémentaire — expressions courantes' : 'Grundstufe — geläufige Ausdrücke', prix: '90 000' },
    { niveau: 'B1', couleur: 'bg-blue-100 border-blue-400 text-blue-800', desc: isFr ? 'Intermédiaire — autonomie en Allemagne' : 'Mittelstufe — Selbstständigkeit in Deutschland', prix: '110 000' },
    { niveau: 'B2', couleur: 'bg-blue-100 border-blue-400 text-blue-800', desc: isFr ? 'Avancé — niveau universitaire requis' : 'Fortgeschritten — erforderliches Universitätsniveau', prix: '130 000' },
    { niveau: 'C1', couleur: 'bg-ids-red-100 border-ids-red-500 text-ids-red-700', desc: isFr ? 'Expert — maîtrise professionnelle et académique' : 'Experte — berufliche und akademische Beherrschung', prix: '160 000' },
  ];

  const formats = [
    { icon: Zap, label: isFr ? 'Cours intensifs' : 'Intensivkurse', desc: isFr ? '5 jours/semaine — progression rapide' : '5 Tage/Woche — schneller Fortschritt' },
    { icon: Clock, label: isFr ? 'Cours semi-intensifs' : 'Semi-Intensivkurse', desc: isFr ? '2–3 jours/semaine — rythme équilibré' : '2–3 Tage/Woche — ausgewogenes Tempo' },
    { icon: User, label: isFr ? 'Cours particuliers' : 'Einzelunterricht', desc: isFr ? 'Coaching individuel sur mesure' : 'Maßgeschneiderte Einzelbetreuung' },
    { icon: Users, label: isFr ? 'Cours en groupe' : 'Gruppenunterricht', desc: isFr ? 'Maximum 12 étudiants par classe' : 'Maximal 12 Studenten pro Klasse' },
    { icon: Monitor, label: isFr ? 'Cours en ligne' : 'Online-Kurse', desc: isFr ? 'Sessions live via plateforme dédiée' : 'Live-Sessions über dedizierte Plattform' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-ids-gold-400/20 text-ids-gold-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <BookOpen className="w-4 h-4" />
            {isFr ? 'Nos Services' : 'Unsere Leistungen'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <BookOpen className="w-9 h-9 text-ids-gold-400 shrink-0" />
            {isFr ? 'Formations en langue allemande' : 'Deutsche Sprachkurse'}
          </h1>
          <div className="w-16 h-0.5 bg-ids-gold-400 mx-auto mb-6" />
          <p className="text-ids-gray-400 text-lg leading-relaxed">
            {isFr
              ? 'Des cours d\'allemand pour tous les niveaux — du débutant A1 au niveau expert C1, adaptés à vos objectifs personnels et professionnels.'
              : 'Deutschkurse für alle Niveaus — vom Anfänger A1 bis zum Expertenniveau C1, angepasst an Ihre persönlichen und beruflichen Ziele.'}
          </p>
        </div>
      </div>

      <div className="container-ids py-16">
        {/* Niveaux */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Niveaux disponibles' : 'Verfügbare Niveaus'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {niveaux.map(({ niveau, couleur, desc, prix }) => (
              <div
                key={niveau}
                className={`border-2 rounded-xl p-6 ${couleur} hover:shadow-md transition-shadow`}
              >
                <div className="text-3xl font-black mb-2">{niveau}</div>
                <p className="text-sm font-medium mb-4">{desc}</p>
                <div className="text-lg font-bold">{prix} FCFA</div>
                <Link
                  href="/inscription"
                  className="mt-4 inline-block px-4 py-2 bg-ids-red-500 text-white text-sm font-semibold rounded-lg hover:bg-ids-red-600 transition-colors"
                >
                  {isFr ? 'S\'inscrire' : 'Anmelden'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Formats */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Formats disponibles' : 'Verfügbare Formate'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {formats.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="border border-ids-gray-200 rounded-xl p-6 hover:border-ids-red-500 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-ids-red-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-ids-red-500" />
                </div>
                <h3 className="font-bold text-ids-black mb-1">{label}</h3>
                <p className="text-sm text-ids-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ids-dark rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-black mb-3">
            {isFr ? 'Prêt à commencer votre apprentissage ?' : 'Bereit, Ihr Lernen zu beginnen?'}
          </h2>
          <p className="text-ids-gray-400 mb-6">
            {isFr ? 'Inscrivez-vous dès aujourd\'hui et rejoignez nos 2 000+ étudiants.' : 'Melden Sie sich noch heute an und schließen Sie sich unseren 2.000+ Studenten an.'}
          </p>
          <Link
            href="/inscription"
            className="inline-block px-8 py-3 bg-ids-gold-400 text-ids-dark font-bold rounded-lg hover:bg-ids-gold-500 transition-colors"
          >
            {isFr ? 'S\'inscrire maintenant' : 'Jetzt anmelden'}
          </Link>
        </section>
      </div>
    </div>
  );
}
