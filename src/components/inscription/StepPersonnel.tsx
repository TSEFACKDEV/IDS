'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { InscriptionFormData } from './InscriptionForm';
import { cn } from '@/lib/utils';

interface FieldProps {
  name: keyof InscriptionFormData;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  half?: boolean;
}

function FormField({ name, label, type = 'text', required, placeholder, half }: FieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<InscriptionFormData>();
  const error = errors[name];

  return (
    <div className={half ? 'sm:col-span-1' : 'sm:col-span-2'}>
      <label className="block text-sm font-medium text-ids-black mb-1.5">
        {label}
        {required && <span className="text-ids-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg border text-sm transition-colors bg-white',
          'focus:outline-none focus:ring-2 focus:ring-ids-red-500/30 focus:border-ids-red-500',
          error
            ? 'border-red-400 bg-red-50'
            : 'border-ids-gray-200 hover:border-ids-gray-400'
        )}
        {...register(name)}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-600">{error.message as string}</p>
      )}
    </div>
  );
}

export default function StepPersonnel() {
  const t = useTranslations('Inscription');
  const {
    register,
    formState: { errors },
  } = useFormContext<InscriptionFormData>();

  return (
    <div>
      <h2 className="text-xl font-bold text-white bg-ids-black px-6 py-4 rounded-t-xl -mx-6 -mt-6 mb-6">
        {t('step1Title')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField name="nom" label={t('nom')} required half />
        <FormField name="prenom" label={t('prenom')} required half />
        <FormField name="dateNaissance" label={t('dateNaissance')} type="date" half />

        {/* Sexe — radio buttons */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-ids-black mb-1.5">{t('sexe')}</label>
          <div className="flex gap-4">
            {(['HOMME', 'FEMME'] as const).map((val) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  value={val}
                  className="accent-ids-red-500"
                  {...register('sexe')}
                />
                {t(val === 'HOMME' ? 'sexeHomme' : 'sexeFemme')}
              </label>
            ))}
          </div>
        </div>

        <FormField name="nationalite" label={t('nationalite')} placeholder="Ex : Camerounaise" half />
        <FormField name="telephone" label={t('telephone')} type="tel" required placeholder="+237 6XX XXX XXX" half />
        <FormField name="email" label={t('email')} type="email" required placeholder="votre@email.com" />
        <FormField name="adresse" label={t('adresse')} placeholder="Rue, quartier" />
        <FormField name="ville" label={t('ville')} placeholder="Ex : Douala" half />
        <FormField name="codePostal" label={t('codePostal')} placeholder="BP 12345" half />
      </div>
    </div>
  );
}
