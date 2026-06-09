import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import CoursSection from '@/components/home/CoursSection';
import Stats from '@/components/home/Stats';

async function AProposSnippet() {
  const t = await getTranslations('About');
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
            <div className="aspect-4/3 rounded-3xl overflow-hidden relative">
              <Image
                src="/images/hero/ids-building.jpg"
                alt="IDS Cameroun"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                loading="eager"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Services />
      <CoursSection />
      <Stats />
      <AProposSnippet />
    </>
  );
}
