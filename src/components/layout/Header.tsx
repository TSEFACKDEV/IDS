'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/cours', labelKey: 'courses' },
  { href: '/a-propos', labelKey: 'about' },
  { href: '/faq', labelKey: 'faq' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export default function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-ids-gray-200/80 sticky top-0 z-40 shadow-sm">
      <div className="container-ids flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 bg-ids-red-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm leading-none">IDS</span>
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-ids-black text-base leading-tight block">
              IDS Cameroun
            </span>
            <span className="text-ids-gray-400 text-[10px] leading-tight block">
              {locale === 'fr' ? 'Institut für die Deutsche Sprache' : 'Sprachinstitut Kamerun'}
            </span>
          </div>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive(href)
                  ? 'text-ids-red-500 bg-ids-red-50'
                  : 'text-ids-gray-600 hover:text-ids-black hover:bg-ids-gray-100'
              )}
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        {/* Actions desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/inscription"
            className="px-5 py-2.5 bg-ids-red-500 text-white text-sm font-semibold rounded-lg hover:bg-ids-red-600 transition-colors"
          >
            {t('register')}
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          className="lg:hidden p-2 rounded-lg text-ids-gray-600 hover:bg-ids-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-ids-gray-200 bg-white">
          <nav className="container-ids py-3 flex flex-col gap-1">
            {NAV_ITEMS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive(href)
                    ? 'text-ids-red-500 bg-ids-red-50'
                    : 'text-ids-gray-600 hover:text-ids-black hover:bg-ids-gray-100'
                )}
              >
                {t(labelKey)}
              </Link>
            ))}
            <hr className="my-1 border-ids-gray-200" />
            <Link
              href="/inscription"
              onClick={() => setMobileOpen(false)}
              className="mx-0 mt-1 px-4 py-3 bg-ids-red-500 text-white text-sm font-semibold rounded-lg text-center hover:bg-ids-red-600 transition-colors"
            >
              {t('register')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
