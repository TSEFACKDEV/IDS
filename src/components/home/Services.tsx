'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { GraduationCap, Award, Plane, Clock, User } from 'lucide-react';

const ICONS = [
  { Icon: GraduationCap, color: 'text-ids-red-500', bg: 'bg-ids-red-50' },
  { Icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
  { Icon: Plane, color: 'text-blue-600', bg: 'bg-blue-50' },
  { Icon: Clock, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { Icon: User, color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function Services() {
  const t = useTranslations('Services');

  const services = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`item${n}Title` as Parameters<typeof t>[0]),
    desc: t(`item${n}Desc` as Parameters<typeof t>[0]),
    ...ICONS[n - 1],
  }));

  return (
    <section className="py-20 bg-ids-gray-50">
      <div className="container-ids">
        {/* Titre de section */}
        <div className="text-center mb-12">
          <span className="inline-block text-ids-red-500 text-sm font-semibold uppercase tracking-widest mb-3">Ce que nous offrons</span>
          <h2 className="text-3xl lg:text-4xl font-black text-ids-black mb-3">{t('title')}</h2>
          <p className="text-ids-gray-600 max-w-xl mx-auto text-sm leading-relaxed">{t('subtitle')}</p>
          <div className="mt-4 mx-auto w-12 h-1 bg-ids-red-500 rounded-full" />
        </div>

        {/* Grille de services */}
        <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory md:grid md:grid-cols-5 md:overflow-visible md:pb-0">
          {services.map(({ title, desc, Icon, color, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="shrink-0 w-56 md:w-auto snap-start bg-white border border-ids-gray-200 rounded-2xl p-6 text-center hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-7 h-7 ${color}`} />
              </div>
              <h3 className="font-bold text-ids-black text-sm mb-2 leading-snug">{title}</h3>
              <p className="text-ids-gray-600 text-xs leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
