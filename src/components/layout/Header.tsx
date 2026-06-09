'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, ChevronDown, GraduationCap, BookOpen, Award, Plane, Briefcase, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

const NAV_ITEMS = [
  { href: '/', labelKey: 'home' },
  { href: '/cours', labelKey: 'courses' },
  { href: '/a-propos', labelKey: 'about' },
  { href: '/faq', labelKey: 'faq' },
  { href: '/contact', labelKey: 'contact' },
] as const;

type ServiceItem = { href: string; labelFr: string; labelDe: string; Icon: LucideIcon };

const SERVICES: ServiceItem[] = [
  { href: '/services/formations-allemandes', labelFr: 'Formations allemandes', labelDe: 'Deutsche Sprachkurse', Icon: BookOpen },
  { href: '/services/preparation-examens', labelFr: 'Préparation examens', labelDe: 'Prüfungsvorbereitung', Icon: Award },
  { href: '/services/etudes-allemagne', labelFr: 'Études en Allemagne', labelDe: 'Studium in Deutschland', Icon: GraduationCap },
  { href: '/services/ausbildung-carriere', labelFr: 'Ausbildung & Carrière', labelDe: 'Ausbildung & Karriere', Icon: Briefcase },
  { href: '/services/assistance-visa', labelFr: 'Assistance visa', labelDe: 'Visum-Assistenz', Icon: Plane },
  { href: '/services/integration-allemagne', labelFr: 'Intégration en Allemagne', labelDe: 'Integration in Deutschland', Icon: Users },
];

export default function Header() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();

  const servicesLabel = locale === 'fr' ? 'Nos Services' : 'Unsere Leistungen';

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isServicesActive = pathname.startsWith('/services');

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-ids-dark backdrop-blur-md border-b border-white/10 sticky top-0 z-40 shadow-sm">
      <div className="container-ids flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logos/logo.png"
            alt="IDS Cameroun"
            width={48}
            height={48}
            className="rounded-lg object-contain"
            priority
          />
          <div className="hidden sm:block">
            <span className="font-bold text-white text-base leading-tight block">
              IDS Cameroun
            </span>
            <span className="text-ids-gold-400 text-[10px] leading-tight block">
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
                  ? 'text-ids-gold-400 bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {t(labelKey)}
            </Link>
          ))}

          {/* Dropdown Services */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                isServicesActive
                  ? 'text-ids-gold-400 bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {servicesLabel}
              <ChevronDown className={cn('w-4 h-4 transition-transform', servicesOpen && 'rotate-180')} />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-ids-gray-200 rounded-xl shadow-lg py-2 z-50">
                {SERVICES.map(({ href, labelFr, labelDe, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setServicesOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 text-sm transition-colors',
                      isActive(href)
                        ? 'text-ids-red-500 bg-ids-red-50 font-semibold'
                        : 'text-ids-gray-700 hover:bg-ids-gray-100 hover:text-ids-black'
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {locale === 'fr' ? labelFr : labelDe}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Actions desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {session && (
            <Link
              href="/espace-etudiant"
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive('/espace-etudiant')
                  ? 'text-ids-gold-400 bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              <GraduationCap className="w-4 h-4" />
              {locale === 'fr' ? 'Espace Étudiant' : 'Studentenbereich'}
            </Link>
          )}
          <Link
            href="/inscription"
            className="px-5 py-2.5 bg-ids-gold-400 text-ids-dark text-sm font-semibold rounded-lg hover:bg-ids-gold-500 transition-colors"
          >
            {t('register')}
          </Link>
        </div>

        {/* Hamburger mobile */}
        <button
          className="lg:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-ids-dark">
          <nav className="container-ids py-3 flex flex-col gap-1">
            {NAV_ITEMS.map(({ href, labelKey }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                  isActive(href)
                    ? 'text-ids-gold-400 bg-white/10'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                )}
              >
                {t(labelKey)}
              </Link>
            ))}

            {/* Mobile Services accordion */}
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors text-left',
                isServicesActive
                  ? 'text-ids-gold-400 bg-white/10'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              )}
            >
              {servicesLabel}
              <ChevronDown className={cn('w-4 h-4 transition-transform', mobileServicesOpen && 'rotate-180')} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-4 flex flex-col gap-0.5">
                {SERVICES.map(({ href, labelFr, labelDe, Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {locale === 'fr' ? labelFr : labelDe}
                  </Link>
                ))}
              </div>
            )}

            <hr className="my-1 border-white/10" />
            {session && (
              <Link
                href="/espace-etudiant"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-ids-gold-400 hover:bg-white/10 transition-colors"
              >
                <GraduationCap className="w-4 h-4" />
                {locale === 'fr' ? 'Espace Étudiant' : 'Studentenbereich'}
              </Link>
            )}
            <Link
              href="/inscription"
              onClick={() => setMobileOpen(false)}
              className="mx-0 mt-1 px-4 py-3 bg-ids-gold-400 text-ids-dark text-sm font-semibold rounded-lg text-center hover:bg-ids-gold-500 transition-colors"
            >
              {t('register')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
