'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { InscriptionFormData } from './InscriptionForm';
import { cn } from '@/lib/utils';

const CRENEAUX = ['MATIN', 'MIDI', 'SOIR', 'WEEKEND'] as const;
const JOURS = ['LUNDI', 'MARDI', 'MERCREDI', 'JEUDI', 'VENDREDI', 'SAMEDI'] as const;

interface CheckboxGroupProps {
  name: 'creneaux' | 'jours';
  values: readonly string[];
  labelFn: (v: string) => string;
  currentValues: string[];
  error?: string;
  bgColor?: string;
}

function CheckboxGroup({
  name,
  values,
  labelFn,
  currentValues,
  error,
  bgColor = 'bg-ids-gold-400/10 border-ids-gold-400',
}: CheckboxGroupProps) {
  const { register } = useFormContext<InscriptionFormData>();

  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        {values.map((val) => {
          const isChecked = currentValues.includes(val);
          return (
            <label key={val} className="cursor-pointer">
              <input
                type="checkbox"
                value={val}
                className="sr-only peer"
                {...register(name)}
              />
              <div className={cn(
                'border-2 border-ids-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium transition-all flex items-center gap-2',
                'peer-checked:ring-1',
                isChecked ? bgColor : 'hover:border-ids-gray-400'
              )}>
                <span className={cn(
                  'w-4 h-4 rounded border-2 shrink-0 flex items-center justify-center transition-colors',
                  isChecked ? 'border-ids-gold-500 bg-ids-gold-400' : 'border-ids-gray-300'
                )}>
                  {isChecked && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="currentColor">
                      <path d="M1 5l3 3 5-5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                    </svg>
                  )}
                </span>
                {labelFn(val)}
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
}

export default function StepDisponibilite() {
  const t = useTranslations('Inscription');
  const {
    watch,
    formState: { errors },
  } = useFormContext<InscriptionFormData>();

  const creneauxValues = watch('creneaux') ?? [];
  const joursValues = watch('jours') ?? [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Créneaux */}
      <div>
        <h3 className="text-sm font-bold text-white bg-ids-gold-500 rounded-lg px-4 py-2.5 mb-4">
          {t('creneaux')} <span className="font-normal opacity-80">*</span>
        </h3>
        <CheckboxGroup
          name="creneaux"
          values={CRENEAUX}
          labelFn={(v) => t(`CRENEAU_${v}` as Parameters<typeof t>[0])}
          currentValues={creneauxValues}
          error={errors.creneaux?.message as string | undefined}
          bgColor="bg-amber-50 border-ids-gold-400"
        />
      </div>

      {/* Jours */}
      <div>
        <h3 className="text-sm font-bold text-white bg-ids-gold-500 rounded-lg px-4 py-2.5 mb-4">
          {t('jours')} <span className="font-normal opacity-80">*</span>
        </h3>
        <CheckboxGroup
          name="jours"
          values={JOURS}
          labelFn={(v) => t(`JOUR_${v}` as Parameters<typeof t>[0])}
          currentValues={joursValues}
          error={errors.jours?.message as string | undefined}
          bgColor="bg-amber-50 border-ids-gold-400"
        />
      </div>
    </div>
  );
}
