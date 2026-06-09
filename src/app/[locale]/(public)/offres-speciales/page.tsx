import { Link } from '@/i18n/navigation';
import { CheckCircle, AlertTriangle, Gift } from 'lucide-react';

const PACK_STANDARD = [
  'Formation A1 à B2',
  'Frais d\'inscription inclus',
  'Préparation aux examens officiels (Goethe, ÖSD, telc, ECL, TestDaF)',
  'Pré-inscription dans une université ou programme en Allemagne',
  'CV allemand professionnel',
  'Lettre de motivation allemande',
  'Préparation aux entretiens',
  'Assistance aux candidatures',
  'Dossier visa complet',
  'Traduction des diplômes et documents officiels',
  'Suivi jusqu\'à la décision du visa',
  'Accueil et orientation en Allemagne',
];

const CONDITIONS_SERENITE = [
  'Le dossier a été complet et conforme aux recommandations du centre',
  'Le candidat a suivi toutes les étapes d\'accompagnement',
  'Le candidat a été ponctuel et présent à toutes les étapes, y compris le jour de l\'entretien',
  'Le refus de visa n\'est pas lié à une fraude, un document falsifié ou un manque de coopération du candidat',
];

export default function OffresSpecialesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-ids-gold-400/20 text-ids-gold-400 text-sm font-semibold px-4 py-2 rounded-full mb-6">
            🇩🇪 Offres Spéciales
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Offres Spéciales Allemagne pour Étudiant
          </h1>
          <div className="w-16 h-0.5 bg-ids-gold-400 mx-auto mb-6" />
          <p className="text-ids-gray-400 text-lg leading-relaxed">
            Packs complets pour accompagner les étudiants de la formation en langue allemande
            jusqu&apos;à leur projet d&apos;études ou d&apos;installation en Allemagne.
          </p>
        </div>
      </div>

      <div className="container-ids py-16 max-w-4xl">

        {/* Pack Standard */}
        <section className="mb-12">
          <div className="border border-ids-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="bg-ids-dark text-white px-8 py-6">
              <h2 className="text-2xl font-black mb-1">Pack Étudiant Standard</h2>
              <div className="flex flex-wrap gap-6 mt-4">
                <div>
                  <p className="text-ids-gray-400 text-xs uppercase tracking-wider mb-1">Cours en semaine</p>
                  <p className="text-3xl font-black text-ids-gold-400">900 000 FCFA</p>
                </div>
                <div className="border-l border-white/20 pl-6">
                  <p className="text-ids-gray-400 text-xs uppercase tracking-wider mb-1">Cours du week-end</p>
                  <p className="text-3xl font-black text-ids-gold-400">1 000 000 FCFA</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <h3 className="font-bold text-ids-black mb-4 text-sm uppercase tracking-wider">Ce qui est inclus</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PACK_STANDARD.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-ids-red-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-ids-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/inscription"
                className="mt-8 inline-block px-8 py-3 bg-ids-red-500 text-white font-bold rounded-lg hover:bg-ids-red-600 transition-colors"
              >
                S&apos;inscrire — Pack Standard
              </Link>
            </div>
          </div>
        </section>

        {/* Pack Sérénité */}
        <section className="mb-12">
          <div className="border-2 border-ids-gold-400 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-ids-dark text-white px-8 py-6 relative">
              <div className="absolute top-4 right-4 bg-ids-gold-400 text-ids-dark text-xs font-black px-3 py-1.5 rounded-full">
                RECOMMANDÉ
              </div>
              <h2 className="text-2xl font-black mb-1">Pack Étudiant Sérénité</h2>
              <div className="flex flex-wrap gap-6 mt-4">
                <div>
                  <p className="text-ids-gray-400 text-xs uppercase tracking-wider mb-1">Cours en semaine</p>
                  <p className="text-3xl font-black text-ids-gold-400">1 000 000 FCFA</p>
                </div>
                <div className="border-l border-white/20 pl-6">
                  <p className="text-ids-gray-400 text-xs uppercase tracking-wider mb-1">Cours du week-end</p>
                  <p className="text-3xl font-black text-ids-gold-400">1 100 000 FCFA</p>
                </div>
              </div>
            </div>
            <div className="p-8">
              <div className="bg-ids-red-50 border border-ids-red-200 rounded-xl p-4 mb-6">
                <p className="font-bold text-ids-red-600 mb-1 flex items-center gap-2">
                  <Gift className="w-4 h-4 shrink-0" /> Avantage exclusif
                </p>
                <p className="text-sm text-ids-gray-700">
                  Tout le contenu du Pack Étudiant Standard +{' '}
                  <strong>Remboursement partiel de 50% en cas de refus de visa</strong>, selon les conditions du contrat.
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <h4 className="font-bold text-ids-black text-sm">Conditions importantes pour le remboursement</h4>
                </div>
                <div className="space-y-2">
                  {CONDITIONS_SERENITE.map((cond) => (
                    <div key={cond} className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-lg">
                      <span className="text-amber-500 shrink-0 mt-0.5">•</span>
                      <span className="text-sm text-ids-gray-700">{cond}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-ids-dark text-white rounded-xl p-5 mb-6">
                <h4 className="font-bold mb-2">Objectif du Pack Sérénité</h4>
                <p className="text-ids-gray-400 text-sm leading-relaxed">
                  Offrir aux candidats une tranquillité d&apos;esprit maximale en combinant
                  accompagnement complet + réduction du risque financier.
                </p>
              </div>

              <Link
                href="/inscription"
                className="inline-block px-8 py-3 bg-ids-gold-400 text-ids-dark font-bold rounded-lg hover:bg-ids-gold-500 transition-colors"
              >
                S&apos;inscrire — Pack Sérénité
              </Link>
            </div>
          </div>
        </section>

        {/* Candidats externes */}
        <section className="mb-12">
          <div className="bg-ids-gray-50 border border-ids-gray-200 rounded-2xl p-8">
            <h2 className="text-xl font-black text-ids-black mb-2">Candidats Externes</h2>
            <p className="text-ids-gray-600 text-sm mb-4">(Niveau B2 déjà obtenu ailleurs)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-xl p-5 border border-ids-gray-200">
                <p className="text-xs text-ids-gray-500 uppercase tracking-wider mb-2">Pack Standard Externe</p>
                <p className="text-2xl font-black text-ids-red-500">500 000 FCFA</p>
              </div>
              <div className="bg-white rounded-xl p-5 border border-ids-gray-200">
                <p className="text-xs text-ids-gray-500 uppercase tracking-wider mb-2">Pack Sérénité Externe</p>
                <p className="text-2xl font-black text-ids-red-500">600 000 FCFA</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 border-2 border-ids-red-500 text-ids-red-500 font-bold rounded-lg hover:bg-ids-red-500 hover:text-white transition-colors"
            >
              Nous contacter pour les candidats externes
            </Link>
          </div>
        </section>

        {/* Note visa */}
        <div className="bg-ids-dark text-white rounded-2xl p-8 text-center">
          <p className="text-ids-gray-400 text-sm leading-relaxed mb-4">
            <strong className="text-white">Important :</strong> la décision finale du visa appartient uniquement aux autorités consulaires allemandes.
            Notre objectif est de vous guider et de vous préparer efficacement afin de maximiser vos chances de réussite.
          </p>
          <Link
            href="/inscription"
            className="inline-block px-8 py-3 bg-ids-red-500 text-white font-bold rounded-lg hover:bg-ids-red-600 transition-colors"
          >
            Démarrer mon projet Allemagne
          </Link>
        </div>

      </div>
    </div>
  );
}
