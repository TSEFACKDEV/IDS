import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ids-dark text-white">
      {/* Corps du footer — 4 colonnes */}
      <div className="container-ids py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Colonne 1 : Logo + tagline */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-ids-red-500 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white font-black text-sm">IDS</span>
            </div>
            <span className="font-bold text-white text-base">IDS Cameroun</span>
          </div>
          <p className="text-ids-gray-400 text-sm leading-relaxed">{t('tagline')}</p>
          <div className="mt-5 flex gap-3">
            {/* Icône WhatsApp */}
            <a
              href="https://wa.me/237675123456"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Colonne 2 : Liens rapides */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            {t('linksTitle')}
          </h3>
          <ul className="space-y-2.5 text-sm text-ids-gray-400">
            {[
              { href: '/', label: 'Accueil' },
              { href: '/cours', label: 'Nos Cours' },
              { href: '/a-propos', label: 'À Propos' },
              { href: '/faq', label: 'FAQ' },
              { href: '/contact', label: 'Contact' },
              { href: '/inscription', label: 'S\'inscrire' },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 : Nos cours */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            {t('coursesTitle')}
          </h3>
          <ul className="space-y-2.5 text-sm text-ids-gray-400">
            {[
              { href: '/cours', label: t('courseA1') },
              { href: '/cours', label: t('courseA2') },
              { href: '/cours', label: t('courseB1') },
              { href: '/cours', label: t('courseB2') },
              { href: '/cours', label: t('courseC1') },
            ].map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 : Contact */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
            {t('contactTitle')}
          </h3>
          <ul className="space-y-3 text-sm text-ids-gray-400">
            <li className="flex gap-2.5">
              <MapPin className="w-4 h-4 text-ids-red-500 shrink-0 mt-0.5" />
              <span>
                {t('address1')}<br />{t('address2')}
              </span>
            </li>
            <li>
              <a
                href={`tel:${t('phone')}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-ids-red-500 shrink-0" />
                {t('phone')}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${t('email')}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-ids-red-500 shrink-0" />
                {t('email')}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-ids-red-500 shrink-0" />
              {t('hours')}
            </li>
          </ul>
        </div>
      </div>

      {/* Bande copyright */}
      <div className="border-t border-white/10">
        <div className="container-ids py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ids-gray-400">
          <span>{t('copyright', { year })}</span>
          <span className="text-ids-gray-600">
            Institut für die Deutsche Sprache — Antenne Cameroun
          </span>
        </div>
      </div>
    </footer>
  );
}
