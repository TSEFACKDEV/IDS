'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Clock, Banknote, Users } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import coursData from '@/content/cours.json';

type NiveauAllemand = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

interface CourseContent {
  titre: string;
  description: string;
}

interface Course {
  id: string;
  slug: string;
  image: string;
  niveau: string;
  typesCours: string[];
  dureeHeures: number;
  prixFCFA: number;
  fr: CourseContent;
  de: CourseContent;
}

export default function CoursSection() {
  const t = useTranslations('Courses');
  const locale = useLocale() as 'fr' | 'de';
  const courses = coursData.courses as Course[];

  return (
    <section className="py-20 bg-white">
      <div className="container-ids">
        {/* En-tête de section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-block text-ids-red-500 text-sm font-semibold uppercase tracking-widest mb-3">Nos formations</span>
            <h2 className="text-3xl lg:text-4xl font-black text-ids-black leading-tight">{t('title')}</h2>
            <div className="mt-3 w-12 h-1 bg-ids-red-500 rounded-full" />
          </div>
          <p className="text-ids-gray-600 text-sm max-w-xs leading-relaxed hidden sm:block">{t('subtitle')}</p>
        </div>

        {/* Grille */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => {
            const content = course[locale];
            return (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-white rounded-2xl overflow-hidden border border-ids-gray-200 hover:border-transparent hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col"
              >
                {/* Tête de carte — vraie photo avec overlay */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={content.titre}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
                  {/* Badge niveau */}
                  <div className="absolute top-3 left-3">
                    <Badge label={course.niveau} variant={course.niveau as NiveauAllemand} />
                  </div>
                  {/* Niveau grand en bas */}
                  <span className="absolute bottom-3 right-4 text-5xl font-black text-white/20 leading-none select-none">{course.niveau}</span>
                </div>

                {/* Corps */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-ids-black text-base mb-2 leading-snug">{content.titre}</h3>
                  <p className="text-ids-gray-600 text-sm leading-relaxed flex-1 line-clamp-3 mb-5">
                    {content.description}
                  </p>

                  {/* Méta-infos */}
                  <div className="grid grid-cols-3 gap-2 mb-5 p-3 bg-ids-gray-50 rounded-xl text-center">
                    <div className="flex flex-col gap-0.5">
                      <Clock className="w-3.5 h-3.5 text-ids-gray-400 mx-auto" />
                      <span className="text-xs font-semibold text-ids-black">{course.dureeHeures}h</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-x border-ids-gray-200">
                      <Users className="w-3.5 h-3.5 text-ids-gray-400 mx-auto" />
                      <span className="text-xs font-semibold text-ids-black">{course.typesCours.length > 1 ? 'Groupe / En ligne' : course.typesCours[0]}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <Banknote className="w-3.5 h-3.5 text-ids-gray-400 mx-auto" />
                      <span className="text-xs font-semibold text-ids-black">{(course.prixFCFA / 1000).toFixed(0)}k</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/cours#${course.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-ids-red-500 text-ids-red-500 text-sm font-semibold group-hover:bg-ids-red-500 group-hover:text-white transition-all duration-200"
                  >
                    {t('detailCta')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Voir tous les cours */}
        <div className="text-center mt-10">
          <Link
            href="/cours"
            className="inline-flex items-center gap-2 text-ids-gray-600 hover:text-ids-black text-sm font-medium border border-ids-gray-200 hover:border-ids-gray-400 px-6 py-3 rounded-xl transition-all duration-200"
          >
            Voir tous nos cours
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
