'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Star, Users, Award, BookOpen } from 'lucide-react';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: EASE } },
  };
}

const STATS = [
  { value: '2 000+', label: 'Étudiants formés', icon: Users },
  { value: '95 %',   label: 'Taux de réussite', icon: Award },
  { value: '15 ans', label: "d'expérience",     icon: BookOpen },
];

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden bg-ids-dark">

      {/* Photo de fond — étudiants en bibliothèque */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-students.jpg"
          alt="Étudiants IDS Cameroun en apprentissage"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Double overlay : côté gauche très sombre, côté droit léger */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.88) 42%, rgba(10,10,10,0.55) 68%, rgba(10,10,10,0.35) 100%)' }} />
        {/* Teinte rouge subtile en bas */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(140,0,0,0.18) 0%, transparent 40%)' }} />
      </div>

      {/* Grille décorative légère */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      {/* Lueur rouge en haut à droite */}
      <div className="absolute top-[-60px] right-[-60px] w-[480px] h-[480px] rounded-full opacity-[0.15] pointer-events-none" style={{ background: 'radial-gradient(circle, #CC0000 0%, transparent 70%)' }} />

      {/* Cartes flottantes côté droit — visible uniquement xl+ */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.8, ease: EASE } }}
        className="absolute right-[5%] top-[22%] hidden xl:flex flex-col gap-4"
      >
        <div className="bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-2xl px-6 py-5 w-56 shadow-xl">
          <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-widest">Cours actifs</p>
          <p className="text-4xl font-black text-white leading-none">6</p>
          <p className="text-white/35 text-xs mt-1">niveaux A1 → C2</p>
          <div className="mt-3 flex gap-1">
            {['A1','A2','B1','B2','C1','C2'].map(n => (
              <span key={n} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-ids-red-500/30 text-ids-red-100">{n}</span>
            ))}
          </div>
        </div>
        <div className="bg-white/[0.07] backdrop-blur-md border border-white/[0.12] rounded-2xl px-6 py-5 w-56 shadow-xl">
          <p className="text-white/50 text-xs font-medium mb-2 uppercase tracking-widest">Certifiés Goethe</p>
          <p className="text-4xl font-black text-ids-gold-400 leading-none">1 500+</p>
          <p className="text-white/35 text-xs mt-1">diplômés depuis 2010</p>
        </div>
      </motion.div>

      {/* Contenu principal */}
      <div className="container-ids relative z-10 py-28">
        <div className="max-w-[660px]">

          {/* Badge pill */}
          <motion.div {...fadeUp(0)} className="mb-8">
            <span className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/[0.13] backdrop-blur-sm text-white/75 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-3.5 h-3.5 fill-ids-gold-400 text-ids-gold-400" />
              {t('badge')}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.1)}
            className="text-[clamp(2.4rem,5.5vw,4.25rem)] font-black text-white leading-[1.06] tracking-tight mb-5"
          >
            {t('title')}
          </motion.h1>

          {/* Ligne rouge */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1, transition: { duration: 0.55, delay: 0.28, ease: EASE } }}
            style={{ transformOrigin: 'left' }}
            className="w-14 h-[3px] bg-ids-red-500 rounded-full mb-6"
          />

          {/* Sous-titre */}
          <motion.p {...fadeUp(0.26)} className="text-white/58 text-[1.05rem] leading-[1.75] mb-10 max-w-[520px]">
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-16">
            <Link
              href="/inscription"
              className="group inline-flex items-center gap-2.5 bg-ids-red-500 hover:bg-ids-red-600 text-white font-semibold px-7 py-[1.05rem] rounded-xl transition-all duration-200 shadow-[0_4px_22px_rgba(204,0,0,0.45)] hover:shadow-[0_6px_30px_rgba(204,0,0,0.6)] hover:-translate-y-0.5 text-[0.95rem]"
            >
              {t('ctaRegister')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/cours"
              className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/[0.16] backdrop-blur-sm text-white font-semibold px-7 py-[1.05rem] rounded-xl hover:bg-white/[0.11] hover:border-white/30 transition-all duration-200 text-[0.95rem]"
            >
              {t('ctaCourses')}
            </Link>
          </motion.div>

          {/* Stats rapides */}
          <motion.div {...fadeUp(0.54)} className="flex flex-wrap gap-8 pt-7 border-t border-white/[0.07]">
            {STATS.map(({ value, label }) => (
              <div key={label} className="flex flex-col gap-1">
                <span className="text-[1.6rem] font-black text-ids-gold-400 leading-none">{value}</span>
                <span className="text-[0.72rem] text-white/38 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Fondu vers blanc */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }} />
    </section>
  );
}
