'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'] as const;

export default function FaqPage() {
  const t = useTranslations('FAQ');
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-ids-gray-50">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-black mb-4">{t('pageTitle')}</h1>
          <div className="w-12 h-0.5 bg-ids-red-500 mx-auto mb-6" />
          <p className="text-ids-gray-400">{t('pageSubtitle')}</p>
        </div>
      </div>

      <div className="container-ids py-14 max-w-3xl">
        <div className="space-y-3">
          {FAQ_KEYS.map((key) => {
            const isOpen = open === key;
            return (
              <div
                key={key}
                className="bg-white border border-ids-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpen(isOpen ? null : key)}
                >
                  <span className="font-semibold text-ids-black pr-4">
                    {t(`${key}Question` as Parameters<typeof t>[0])}
                  </span>
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-ids-red-500 text-white' : 'bg-ids-gray-100 text-ids-gray-400'}`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-ids-gray-600 leading-relaxed border-t border-ids-gray-100 pt-4">
                        {t(`${key}Answer` as Parameters<typeof t>[0])}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
