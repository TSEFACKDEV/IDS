import { useTranslations } from 'next-intl';
import InscriptionForm from '@/components/inscription/InscriptionForm';

export default function InscriptionPage() {
  const t = useTranslations('Inscription');
  return (
    <div className="min-h-screen bg-ids-gray-50 py-12">
      <div className="container-ids">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-ids-black mb-3">{t('pageTitle')}</h1>
          <p className="text-ids-gray-600 max-w-lg mx-auto">{t('pageSubtitle')}</p>
          <div className="mt-4 mx-auto w-12 h-0.5 bg-ids-red-500 rounded-full" />
        </div>
        <InscriptionForm />
      </div>
    </div>
  );
}
