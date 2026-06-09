import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Plane, FileCheck, Shield, MapPin, Clock, Check } from 'lucide-react';

export default async function AssistanceVisaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === 'fr';

  const visaServices = [
    {
      icon: FileCheck,
      title: isFr ? 'Constitution du dossier visa' : 'Zusammenstellung des Visadossiers',
      items: isFr
        ? ['Checklist personnalisée selon votre type de visa', 'Vérification et contrôle de tous les documents', 'Traduction certifiée des pièces requises']
        : ['Personalisierte Checkliste je nach Visatyp', 'Überprüfung und Kontrolle aller Dokumente', 'Zertifizierte Übersetzung der erforderlichen Unterlagen'],
    },
    {
      icon: Shield,
      title: isFr ? 'Préparation entretien ambassade' : 'Vorbereitung des Botschaftsinterviews',
      items: isFr
        ? ['Simulations d\'entretiens consulaires', 'Réponses aux questions fréquentes des consuls', 'Conseils de présentation et de comportement']
        : ['Simulationen von Konsularinterviews', 'Antworten auf häufige Fragen der Konsuln', 'Präsentations- und Verhaltenstipps'],
    },
    {
      icon: Clock,
      title: isFr ? 'Suivi administratif' : 'Verwaltungsbegleitung',
      items: isFr
        ? ['Suivi du dossier de demande', 'Relances et communications avec l\'ambassade', 'Assistance en cas de refus ou compléments requis']
        : ['Verfolgung des Antragsverfahrens', 'Nachfragen und Kommunikation mit der Botschaft', 'Unterstützung bei Ablehnung oder erforderlichen Ergänzungen'],
    },
    {
      icon: MapPin,
      title: isFr ? 'Préparation au départ' : 'Abreisevorbereitung',
      items: isFr
        ? ['Conseils logement en Allemagne', 'Informations sur les assurances obligatoires', 'Démarches d\'immatriculation (Anmeldung)']
        : ['Wohntipps in Deutschland', 'Informationen zu Pflichtversicherungen', 'Anmeldungsverfahren (Anmeldung)'],
    },
  ];

  const visaTypes = [
    { label: isFr ? 'Visa étudiant' : 'Studentenvisum', code: 'Studienvisum' },
    { label: isFr ? 'Visa langue' : 'Sprachkursvisum', code: 'Sprachkurs' },
    { label: isFr ? 'Visa travailleur qualifié' : 'Fachkräftevisum', code: 'Fachkräfte' },
    { label: isFr ? 'Visa Ausbildung' : 'Ausbildungsvisum', code: 'Ausbildung' },
    { label: isFr ? 'Visa recherche d\'emploi' : 'Jobsuchvisum', code: 'Jobsuche' },
    { label: isFr ? 'Regroupement familial' : 'Familienzusammenführung', code: 'Familie' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-ids-gold-400/20 text-ids-gold-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <Plane className="w-4 h-4" />
            {isFr ? 'Nos Services' : 'Unsere Leistungen'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <Plane className="w-9 h-9 text-ids-gold-400 shrink-0" />
            {isFr ? 'Assistance visa & mobilité' : 'Visum & Mobilitätsassistenz'}
          </h1>
          <div className="w-16 h-0.5 bg-ids-gold-400 mx-auto mb-6" />
          <p className="text-ids-gray-400 text-lg leading-relaxed">
            {isFr
              ? 'Nous vous accompagnons dans toutes vos démarches administratives pour obtenir votre visa allemand et réaliser votre projet de mobilité.'
              : 'Wir begleiten Sie bei allen Verwaltungsverfahren, um Ihr deutsches Visum zu erhalten und Ihr Mobilitätsprojekt zu realisieren.'}
          </p>
        </div>
      </div>

      <div className="container-ids py-16">
        {/* Types de visa */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Types de visa que nous traitons' : 'Von uns bearbeitete Visatypen'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {visaTypes.map(({ label, code }) => (
              <div key={code} className="border-2 border-ids-gray-200 rounded-xl p-4 text-center hover:border-ids-gold-400 transition-colors">
                <div className="text-ids-red-500 font-black text-lg mb-1">{code}</div>
                <div className="text-sm text-ids-gray-600">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Notre assistance complète' : 'Unsere vollständige Unterstützung'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {visaServices.map(({ icon: Icon, title, items }) => (
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
            {isFr ? 'Votre visa, notre priorité' : 'Ihr Visum, unsere Priorität'}
          </h2>
          <p className="text-ids-gray-400 mb-6">
            {isFr ? 'Nos experts en visas vous guident à chaque étape du processus.' : 'Unsere Visa-Experten führen Sie durch jeden Schritt des Prozesses.'}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-ids-gold-400 text-ids-dark font-bold rounded-lg hover:bg-ids-gold-500 transition-colors"
          >
            {isFr ? 'Prendre rendez-vous' : 'Termin vereinbaren'}
          </Link>
        </section>
      </div>
    </div>
  );
}
