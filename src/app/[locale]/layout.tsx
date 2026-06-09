import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Common' });
  return {
    title: {
      default: t('siteTitleFull'),
      template: `%s | ${t('siteTitle')}`,
    },
    description:
      locale === 'fr'
        ? 'Cours d\'allemand certifiants à Douala et Yaoundé. Goethe, TestDaF, DSH.'
        : 'Zertifizierte Deutschkurse in Douala und Yaoundé. Goethe, TestDaF, DSH.',
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'fr' | 'de')) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
}