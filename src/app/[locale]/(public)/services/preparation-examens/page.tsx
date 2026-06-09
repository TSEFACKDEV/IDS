import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { FileText, CheckCircle, BookOpen, Mic, Award, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export default async function PreparationExamensPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isFr = locale === 'fr';

  type ExamenEntry = { nom: string; icon: LucideIcon; niveaux: string[]; desc: string; prix: { niveau: string; prix: string }[] };
  const examens: ExamenEntry[] = [
    {
      nom: 'Goethe-Institut',
      icon: Award,
      niveaux: ['A1', 'A2', 'B1', 'B2', 'C1'],
      desc: isFr
        ? 'L\'examen le plus reconnu mondialement. Indispensable pour les visas et les universités allemandes.'
        : 'Die weltweit anerkannteste Prüfung. Unverzichtbar für Visa und deutsche Universitäten.',
      prix: [
        { niveau: 'A1', prix: '45 000' },
        { niveau: 'A2', prix: '50 000' },
        { niveau: 'B1', prix: '60 000' },
        { niveau: 'B2', prix: '75 000' },
        { niveau: 'C1', prix: '90 000' },
      ],
    },
    {
      nom: 'ÖSD',
      icon: BookOpen,
      niveaux: ['A1', 'A2', 'B1', 'B2', 'C1'],
      desc: isFr
        ? 'Certificat autrichien reconnu dans tout l\'espace germanophone et les institutions européennes.'
        : 'Österreichisches Zertifikat, anerkannt im gesamten deutschsprachigen Raum und europäischen Institutionen.',
      prix: [
        { niveau: 'A1', prix: '40 000' },
        { niveau: 'A2', prix: '45 000' },
        { niveau: 'B1', prix: '55 000' },
        { niveau: 'B2', prix: '70 000' },
        { niveau: 'C1', prix: '85 000' },
      ],
    },
    {
      nom: 'telc',
      icon: FileText,
      niveaux: ['A1', 'A2', 'B1', 'B2', 'C1'],
      desc: isFr
        ? 'Certifications très demandées pour l\'immigration et le marché du travail en Allemagne.'
        : 'Sehr gefragte Zertifikate für Einwanderung und Arbeitsmarkt in Deutschland.',
      prix: [
        { niveau: 'A1', prix: '42 000' },
        { niveau: 'A2', prix: '48 000' },
        { niveau: 'B1', prix: '58 000' },
        { niveau: 'B2', prix: '72 000' },
        { niveau: 'C1', prix: '88 000' },
      ],
    },
    {
      nom: 'ECL',
      icon: GraduationCap,
      niveaux: ['B1', 'B2', 'C1'],
      desc: isFr
        ? 'European Consortium for the Certificate of Attainment in Modern Languages — reconnu en Europe.'
        : 'European Consortium for the Certificate of Attainment in Modern Languages — in Europa anerkannt.',
      prix: [
        { niveau: 'B1', prix: '55 000' },
        { niveau: 'B2', prix: '68 000' },
        { niveau: 'C1', prix: '82 000' },
      ],
    },
  ];

  const services = [
    { icon: FileText, label: isFr ? 'Examens blancs' : 'Probeprüfungen', desc: isFr ? 'Simulation complète des examens officiels dans les mêmes conditions' : 'Vollständige Simulation offizieller Prüfungen unter gleichen Bedingungen' },
    { icon: Mic, label: isFr ? 'Simulations orales' : 'Mündliche Simulationen', desc: isFr ? 'Entraînements intensifs à l\'expression et compréhension orales' : 'Intensives Training für mündlichen Ausdruck und Hörverständnis' },
    { icon: CheckCircle, label: isFr ? 'Techniques de réussite' : 'Erfolgstechniken', desc: isFr ? 'Méthodes éprouvées pour aborder chaque épreuve avec confiance' : 'Bewährte Methoden für jede Prüfung mit Selbstvertrauen' },
    { icon: BookOpen, label: isFr ? 'Correction personnalisée' : 'Personalisierte Korrekturen', desc: isFr ? 'Feedback détaillé sur chaque production écrite et orale' : 'Detailliertes Feedback zu jeder schriftlichen und mündlichen Leistung' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-ids-gold-400/20 text-ids-gold-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            <FileText className="w-4 h-4" />
            {isFr ? 'Nos Services' : 'Unsere Leistungen'}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center justify-center gap-3">
            <FileText className="w-9 h-9 text-ids-gold-400 shrink-0" />
            {isFr ? 'Préparation aux examens internationaux' : 'Internationale Prüfungsvorbereitung'}
          </h1>
          <div className="w-16 h-0.5 bg-ids-gold-400 mx-auto mb-6" />
          <p className="text-ids-gray-400 text-lg leading-relaxed">
            {isFr
              ? 'Nous vous préparons aux examens officiels reconnus en Allemagne et dans le monde entier — Goethe, ÖSD, telc, ECL.'
              : 'Wir bereiten Sie auf die offiziellen Prüfungen vor, die in Deutschland und weltweit anerkannt sind — Goethe, ÖSD, telc, ECL.'}
          </p>
        </div>
      </div>

      <div className="container-ids py-16">
        {/* Examens avec prix */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Examens préparés & tarifs' : 'Vorbereitete Prüfungen & Preise'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {examens.map((examen) => {
              const ExIcon = examen.icon;
              return (
              <div key={examen.nom} className="border border-ids-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-ids-dark text-white px-6 py-5">
                  <div className="w-10 h-10 bg-ids-gold-400/20 rounded-lg flex items-center justify-center mb-2">
                    <ExIcon className="w-5 h-5 text-ids-gold-400" />
                  </div>
                  <h3 className="text-xl font-black">{examen.nom}</h3>
                  <p className="text-ids-gray-400 text-sm mt-2">{examen.desc}</p>
                </div>
                <div className="p-6">
                  <h4 className="text-sm font-bold text-ids-gray-600 uppercase tracking-wider mb-4">
                    {isFr ? 'Tarifs de préparation' : 'Vorbereitungspreise'}
                  </h4>
                  <div className="space-y-2">
                    {examen.prix.map(({ niveau, prix }) => (
                      <div key={niveau} className="flex items-center justify-between py-2 border-b border-ids-gray-100 last:border-0">
                        <span className="text-sm font-semibold text-ids-black">
                          {examen.nom} {niveau}
                        </span>
                        <span className="text-ids-red-500 font-bold text-sm">{prix} FCFA</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href="/inscription"
                    className="mt-5 w-full inline-block text-center px-4 py-2.5 bg-ids-red-500 text-white text-sm font-semibold rounded-lg hover:bg-ids-red-600 transition-colors"
                  >
                    {isFr ? 'S\'inscrire à cette préparation' : 'Für diese Vorbereitung anmelden'}
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        </section>

        {/* Services inclus */}
        <section className="mb-16">
          <h2 className="text-2xl font-black text-ids-black mb-2">
            {isFr ? 'Services inclus' : 'Enthaltene Leistungen'}
          </h2>
          <div className="w-12 h-0.5 bg-ids-red-500 mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {services.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="border border-ids-gray-200 rounded-xl p-6 hover:border-ids-red-500 transition-all">
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
            {isFr ? 'Visez 95% de réussite à votre examen' : 'Streben Sie 95% Erfolg bei Ihrer Prüfung an'}
          </h2>
          <p className="text-ids-gray-400 mb-6">
            {isFr ? 'Nos formateurs connaissent parfaitement les exigences de chaque examen.' : 'Unsere Trainer kennen die Anforderungen jeder Prüfung genau.'}
          </p>
          <Link
            href="/inscription"
            className="inline-block px-8 py-3 bg-ids-gold-400 text-ids-dark font-bold rounded-lg hover:bg-ids-gold-500 transition-colors"
          >
            {isFr ? 'Démarrer ma préparation' : 'Meine Vorbereitung starten'}
          </Link>
        </section>
      </div>
    </div>
  );
}
