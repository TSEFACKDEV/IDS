'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import temoignagesData from '@/content/temoignages.json';

interface TemoignageContent {
  texte: string;
}

interface Temoignage {
  id: string;
  nom: string;
  role: string;
  note: number;
  photo: string;
  fr: TemoignageContent;
  de: TemoignageContent;
}

function Avatar({ nom, photo }: { nom: string; photo: string }) {
  return (
    <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 shadow-md ring-2 ring-white">
      <Image
        src={photo}
        alt={nom}
        fill
        className="object-cover object-top"
        sizes="56px"
      />
    </div>
  );
}

export default function Temoignages() {
  const t = useTranslations('Testimonials');
  const locale = useLocale() as 'fr' | 'de';
  const items = temoignagesData.temoignages as Temoignage[];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  function prev() {
    setDirection(-1);
    setCurrent((c) => (c - 1 + items.length) % items.length);
  }
  function next() {
    setDirection(1);
    setCurrent((c) => (c + 1) % items.length);
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  const item = items[current];

  return (
    <section className="py-20 bg-ids-gray-50">
      <div className="container-ids">
        {/* Titre */}
        <div className="text-center mb-14">
          <span className="inline-block text-ids-red-500 text-sm font-semibold uppercase tracking-widest mb-3">Témoignages</span>
          <h2 className="text-3xl lg:text-4xl font-black text-ids-black">{t('title')}</h2>
          <div className="mt-3 mx-auto w-12 h-1 bg-ids-red-500 rounded-full" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: 'easeInOut' }}
                className="relative bg-white border border-ids-gray-200 rounded-3xl p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                {/* Icône citation décorative */}
                <Quote className="absolute top-6 right-7 w-10 h-10 text-ids-red-500/10 fill-ids-red-500/10" />

                {/* Étoiles */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.note
                          ? 'fill-ids-gold-400 text-ids-gold-400'
                          : 'text-ids-gray-200 fill-ids-gray-200'
                      }`}
                    />
                  ))}
                </div>

                {/* Texte */}
                <p className="text-ids-gray-800 text-base md:text-lg leading-relaxed mb-7 italic">
                  &ldquo;{item[locale].texte}&rdquo;
                </p>

                {/* Auteur */}
                <div className="flex items-center gap-4">
                  <Avatar nom={item.nom} photo={item.photo} />
                  <div>
                    <span className="block font-bold text-ids-black">{item.nom}</span>
                    <span className="block text-ids-gray-400 text-sm mt-0.5">{item.role}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Contrôles */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-ids-gray-200 bg-white flex items-center justify-center hover:bg-ids-red-500 hover:border-ids-red-500 hover:text-white text-ids-gray-600 transition-all duration-200 shadow-sm"
              aria-label="Précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'bg-ids-red-500 w-6 h-2.5' : 'bg-ids-gray-300 w-2.5 h-2.5 hover:bg-ids-gray-400'
                  }`}
                  aria-label={`Témoignage ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-ids-gray-200 bg-white flex items-center justify-center hover:bg-ids-red-500 hover:border-ids-red-500 hover:text-white text-ids-gray-600 transition-all duration-200 shadow-sm"
              aria-label="Suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
