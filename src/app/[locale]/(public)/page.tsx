import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import CoursSection from '@/components/home/CoursSection';
import Stats from '@/components/home/Stats';
import FaqSection from '@/components/home/FaqSection';
import Temoignages from '@/components/home/Temoignages';

function AProposSnippet() {
  const t = useTranslations('About');
  return (
    <section className="py-20 bg-white">
      <div className="container-ids">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="inline-block text-ids-red-500 text-sm font-semibold uppercase tracking-widest mb-4">À propos</span>
            <h2 className="text-3xl lg:text-4xl font-black text-ids-black mb-4 leading-tight">{t('homeTitle')}</h2>
            <div className="w-12 h-1 bg-ids-red-500 mb-6 rounded-full" />
            <p className="text-ids-gray-600 text-lg leading-relaxed mb-4">{t('homeSubtitle')}</p>
            <p className="text-ids-gray-600 leading-relaxed mb-8">{t('homeText')}</p>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 text-ids-red-500 font-semibold hover:gap-3 transition-all duration-200 group"
            >
              {t('ctaAbout')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
          <div className="relative">
            {/* Carte visuelle IDS */}
            <div className="aspect-4/3 rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0505 100%)' }}>
              {/* Pattern grille */}
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
              {/* Cercles décoratifs */}
              <div className="absolute top-6 right-6 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #CC0000, transparent)' }} />
              <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #F5A623, transparent)' }} />
              {/* Contenu centré */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4 p-8">
                <div className="w-20 h-20 bg-ids-red-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(204,0,0,0.5)]">
                  <span className="text-white font-black text-2xl">IDS</span>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold text-xl">IDS Cameroun</div>
                  <div className="text-white/50 text-sm mt-1">Institut für die Deutsche Sprache</div>
                </div>
                <div className="flex gap-3 mt-2">
                  {['A1', 'B2', 'C1'].map(n => (
                    <span key={n} className="px-3 py-1 rounded-lg bg-white/10 text-white/70 text-xs font-bold border border-white/10">{n}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Carte accent */}
            <div className="absolute -bottom-5 -left-5 bg-ids-red-500 text-white rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(204,0,0,0.4)]">
              <div className="text-3xl font-black leading-none">2010</div>
              <div className="text-red-200 text-xs mt-1 font-medium">Fondé à Douala</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <CoursSection />
      <Stats />
      <AProposSnippet />
      <FaqSection />
      <Temoignages />
    </>
  );
}
