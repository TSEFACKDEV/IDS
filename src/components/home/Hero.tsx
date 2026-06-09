'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const SLIDES = [
  { src: '/images/hero/hero-students.jpg', alt: 'Étudiants IDS Cameroun' },
  { src: '/images/hero/ids-building.jpg', alt: 'Institut IDS Cameroun' },
  { src: '/images/cours/cours-examens.jpg', alt: 'Préparation examens' },
  { src: '/images/cours/cours-intensif.jpg', alt: 'Cours intensifs' },
  { src: '/images/cours/cours-b2.jpg', alt: 'Cours niveau B2' },
];

const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '+4915732878223').replace(/[^0-9]/g, '');

export default function Hero() {
  const t = useTranslations('Hero');
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <section className="relative min-h-[94vh] flex items-center overflow-hidden bg-ids-dark">
        {/* Image slider */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0"
            >
              <Image
                src={SLIDES[current].src}
                alt={SLIDES[current].alt}
                fill
                priority={current === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.88) 42%, rgba(10,10,10,0.55) 68%, rgba(10,10,10,0.35) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(140,0,0,0.18) 0%, transparent 40%)' }} />
        </div>

        {/* Slider controls */}
        <button onClick={prev} aria-label="Précédent" className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={next} aria-label="Suivant" className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/70 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-ids-gold-400' : 'w-1.5 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

        {/* Main content */}
        <div className="container-ids relative z-10 py-28">
          <div className="max-w-165">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="mb-8">
              <span className="inline-flex items-center gap-2 bg-white/7 border border-white/13 backdrop-blur-sm text-white/75 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-3.5 h-3.5 text-ids-gold-400 fill-ids-gold-400" />
                {t('badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.1 }}
              className="text-[clamp(2.4rem,5.5vw,4.25rem)] font-black text-white leading-[1.06] tracking-tight mb-5"
            >
              {t('title')}
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.55, delay: 0.28 }}
              style={{ transformOrigin: 'left' }}
              className="w-14 h-0.75 bg-ids-red-500 rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.26 }}
              className="text-white/60 text-[1.05rem] leading-[1.75] mb-10 max-w-130"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/inscription"
                className="group inline-flex items-center gap-2.5 bg-ids-red-500 hover:bg-ids-red-600 text-white font-semibold px-7 py-[1.05rem] rounded-xl transition-all duration-200 shadow-[0_4px_22px_rgba(204,0,0,0.45)] hover:-translate-y-0.5 text-[0.95rem]"
              >
                {t('ctaRegister')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/cours"
                className="inline-flex items-center gap-2 bg-white/6 border border-white/16 backdrop-blur-sm text-white font-semibold px-7 py-[1.05rem] rounded-xl hover:bg-white/11 transition-all duration-200 text-[0.95rem]"
              >
                {t('ctaCourses')}
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />
      </section>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter via WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
}

