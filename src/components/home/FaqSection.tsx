'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQ_KEYS = ['1', '2', '3', '4', '5', '6'] as const;

export default function FaqSection() {
  const t = useTranslations('FAQ');
  const [openKey, setOpenKey] = useState<string>('1');

  return (
    <section className="py-16 bg-ids-gray-50">
      <div className="container-ids max-w-3xl">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-ids-black mb-3">{t('title')}</h2>
          <p className="text-ids-gray-600">{t('subtitle')}</p>
          <div className="mt-4 mx-auto w-12 h-0.5 bg-ids-red-500 rounded-full" />
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_KEYS.map((key) => {
            const isOpen = openKey === key;
            return (
              <div
                key={key}
                className={cn(
                  'bg-white rounded-xl border transition-all duration-200',
                  isOpen ? 'border-ids-red-500/30 shadow-sm' : 'border-ids-gray-200'
                )}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenKey(isOpen ? '' : key)}
                  aria-expanded={isOpen}
                >
                  <span className={cn('font-semibold text-sm pr-4', isOpen ? 'text-ids-red-500' : 'text-ids-black')}>
                    {t(`q${key}` as Parameters<typeof t>[0])}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 shrink-0 transition-transform duration-200 text-ids-gray-400',
                      isOpen && 'rotate-180 text-ids-red-500'
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-ids-gray-600 leading-relaxed">
                        {t(`a${key}` as Parameters<typeof t>[0])}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA vers page FAQ complète */}
        <div className="mt-8 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-ids-red-500 font-semibold text-sm hover:gap-3 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            {t('ctaQuestion')}
          </Link>
        </div>
      </div>
    </section>
  );
}
