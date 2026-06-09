import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Heart, Home, Users, BookOpen, Headphones, Check } from 'lucide-react';

export default async function IntegrationAllemagnePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === 'fr';

  const integrationServices = [
    {
      icon: Home,
      title: isFr ? 'Accueil & installation' : 'Empfang & Installation',
      items: isFr
        ? ['Accueil à l\'aéroport sur demande', 'Aide à la recherche de logement', 'Ouverture de compte bancaire', 'Inscription à la sécurité sociale']
        : ['Flughafenempfang auf Anfrage', 'Hilfe bei der Wohnungssuche', 'Bankkontoeröffnung', 'Sozialversicherungsanmeldung'],
    },
    {
      icon: Users,
      title: isFr ? 'Orientation locale' : 'Lokale Orientierung',
      items: isFr
        ? ['Découverte de la ville et des transports', 'Annuaire des services utiles', 'Réseau d\'anciens étudiants IDS en Allemagne', 'Groupes de soutien et communauté']
        : ['Stadtentdeckung und öffentliche Verkehrsmittel', 'Verzeichnis nützlicher Dienste', 'Netzwerk ehemaliger IDS-Studenten in Deutschland', 'Unterstützungsgruppen und Gemeinschaft'],
    },
    {
      icon: BookOpen,
      title: isFr ? 'Intégration culturelle' : 'Kulturelle Integration',
      items: isFr
        ? ['Codes culturels et pratiques sociales allemandes', 'Langue familière et argot quotidien', 'Ateliers d\'intégration interculturelle', 'Activités sociales et rencontres']
        : ['Kulturelle Codes und soziale Praktiken in Deutschland', 'Umgangssprache und alltäglicher Slang', 'Interkulturelle Integrations-Workshops', 'Soziale Aktivitäten und Treffen'],
    },
    {
      icon: Headphones,
      title: isFr ? 'Support continu' : 'Kontinuierliche Unterstützung',
      items: isFr
        ? ['Hotline d\'assistance disponible', 'Suivi régulier de votre adaptation', 'Soutien linguistique post-arrivée', 'Résolution des difficultés administratives']
        : ['Verfügbare Assistenz-Hotline', 'Regelmäßige Überwachung Ihrer Anpassung', 'Sprachliche Unterstützung nach der Ankunft', 'Lösung administrativer Schwierigkeiten'],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-ids-gold-400/20 text-ids-gold-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4" />
            {isFr ? 'Nos Services' : 'Unsere Leistungen'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <Users className="w-9 h-9 text-ids-gold-400 shrink-0" />
            {isFr ? 'Accueil & intégration en Allemagne' : 'Empfang & Integration in Deutschland'}
          </h1>
          <div className="w-16 h-0.5 bg-ids-gold-400 mx-auto mb-6" />
          <p className="text-ids-gray-400 text-lg leading-relaxed">
            {isFr
              ? 'Arriver en Allemagne est une grande étape. IDS vous assure un accueil chaleureux et un accompagnement complet pour vous installer et vous intégrer sereinement.'
              : 'In Deutschland anzukommen ist ein großer Schritt. IDS sorgt für einen herzlichen Empfang und eine vollständige Begleitung, damit Sie sich ruhig niederlassen und integrieren können.'}
          </p>
        </div>
      </div>

      <div className="container-ids py-16">
        {/* Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Nos services d\'intégration' : 'Unsere Integrationsleistungen'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {integrationServices.map(({ icon: Icon, title, items }) => (
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

        {/* Témoignage */}
        <section className="mb-16">
          <div className="bg-ids-red-50 border-l-4 border-ids-red-500 rounded-r-2xl p-8 max-w-2xl">
            <blockquote className="text-ids-gray-700 italic text-lg leading-relaxed mb-4">
              {isFr
                ? '« L\'équipe IDS m\'a accompagné depuis Yaoundé jusqu\'à mon installation à Munich. Grâce à eux, je n\'étais pas seul à mon arrivée. »'
                : '« Das IDS-Team hat mich von Yaoundé bis zu meiner Ankunft in München begleitet. Dank ihnen war ich bei meiner Ankunft nicht allein. »'}
            </blockquote>
            <p className="text-sm font-bold text-ids-red-500">
              {isFr ? '— Étudiant IDS, promotion 2024' : '— IDS-Student, Jahrgang 2024'}
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-ids-dark rounded-2xl p-10 text-center text-white">
          <h2 className="text-2xl font-black mb-3">
            {isFr ? 'Vous ne serez jamais seul en Allemagne' : 'Sie werden in Deutschland nie allein sein'}
          </h2>
          <p className="text-ids-gray-400 mb-6">
            {isFr ? 'Notre réseau d\'alumni en Allemagne vous accueille à bras ouverts.' : 'Unser Alumni-Netzwerk in Deutschland begrüßt Sie mit offenen Armen.'}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-ids-gold-400 text-ids-dark font-bold rounded-lg hover:bg-ids-gold-500 transition-colors"
          >
            {isFr ? 'En savoir plus' : 'Mehr erfahren'}
          </Link>
        </section>
      </div>
    </div>
  );
}
