'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

export default function TopBar() {
  const t = useTranslations('TopBar');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="bg-ids-dark text-white text-xs">
      <div className="container-ids flex items-center justify-between gap-4 py-2">
        {/* Infos de contact */}
        <div className="hidden md:flex items-center gap-5 flex-wrap">
          <span className="flex items-center gap-1.5 text-ids-gray-400">
            <MapPin className="w-3.5 h-3.5 text-ids-red-500 shrink-0" />
            {t('address')}
          </span>
          <span className="flex items-center gap-1.5 text-ids-gray-400">
            <Clock className="w-3.5 h-3.5 text-ids-red-500 shrink-0" />
            {t('hours')}
          </span>
          <a
            href={`tel:${t('phone')}`}
            className="flex items-center gap-1.5 text-ids-gray-400 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-ids-red-500 shrink-0" />
            {t('phone')}
          </a>
          <a
            href={`mailto:${t('email')}`}
            className="flex items-center gap-1.5 text-ids-gray-400 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-ids-red-500 shrink-0" />
            {t('email')}
          </a>
        </div>

        {/* Mobile : seul le téléphone */}
        <div className="flex md:hidden items-center gap-1.5 text-ids-gray-400">
          <Phone className="w-3.5 h-3.5 text-ids-red-500" />
          <a href={`tel:${t('phone')}`} className="hover:text-white transition-colors">
            {t('phone')}
          </a>
        </div>

        {/* Switcher langue */}
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={() => switchLocale('fr')}
            className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
              locale === 'fr'
                ? 'bg-ids-red-500 text-white'
                : 'text-ids-gray-400 hover:text-white'
            }`}
            aria-label="Français"
          >
            FR
          </button>
          <span className="text-ids-gray-600 select-none">|</span>
          <button
            onClick={() => switchLocale('de')}
            className={`px-2 py-0.5 rounded text-xs font-semibold transition-colors ${
              locale === 'de'
                ? 'bg-ids-red-500 text-white'
                : 'text-ids-gray-400 hover:text-white'
            }`}
            aria-label="Deutsch"
          >
            DE
          </button>
        </div>
      </div>
    </div>
  );
}
