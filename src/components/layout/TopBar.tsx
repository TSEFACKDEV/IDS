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
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => switchLocale('fr')}
            aria-label="Français"
            title="Français"
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all duration-200 ${
              locale === 'fr'
                ? 'ring-1 ring-ids-red-500 opacity-100'
                : 'opacity-50 hover:opacity-80'
            }`}
          >
            {/* Drapeau France */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-5 h-3.25 rounded-sm shrink-0">
              <rect width="1" height="2" fill="#002395" />
              <rect x="1" width="1" height="2" fill="#ffffff" />
              <rect x="2" width="1" height="2" fill="#ED2939" />
            </svg>
            <span className={`text-[10px] font-bold leading-none ${locale === 'fr' ? 'text-white' : 'text-ids-gray-400'}`}>FR</span>
          </button>
          <span className="text-ids-gray-600 select-none">|</span>
          <button
            onClick={() => switchLocale('de')}
            aria-label="Deutsch"
            title="Deutsch"
            className={`flex items-center gap-1.5 px-2 py-0.5 rounded transition-all duration-200 ${
              locale === 'de'
                ? 'ring-1 ring-ids-red-500 opacity-100'
                : 'opacity-50 hover:opacity-80'
            }`}
          >
            {/* Drapeau Allemagne */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" className="w-5 h-3.25 rounded-sm shrink-0">
              <rect width="5" height="1" y="0" fill="#000000" />
              <rect width="5" height="1" y="1" fill="#DD0000" />
              <rect width="5" height="1" y="2" fill="#FFCE00" />
            </svg>
            <span className={`text-[10px] font-bold leading-none ${locale === 'de' ? 'text-white' : 'text-ids-gray-400'}`}>DE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
