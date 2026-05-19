'use client';

import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { InscriptionFormData } from './InscriptionForm';
import { cn } from '@/lib/utils';

const NIVEAUX = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
const TYPES_COURS = ['GROUPE', 'INDIVIDUEL', 'INTENSIF', 'SEMI_INTENSIF', 'EN_LIGNE'] as const;
const OBJECTIFS = ['ETUDES_ALLEMAGNE', 'TRAVAIL', 'PREPARATION_EXAMEN', 'VOYAGE', 'AUTRE'] as const;
const NIVEAUX_ETUDES = ['LYCEE', 'UNIVERSITE', 'PROFESSIONNEL', 'AUTRE'] as const;

const NIVEAU_COLORS: Record<string, string> = {
  A1: 'border-emerald-400 bg-emerald-50 text-emerald-800',
  A2: 'border-teal-400 bg-teal-50 text-teal-800',
  B1: 'border-blue-400 bg-blue-50 text-blue-800',
  B2: 'border-indigo-400 bg-indigo-50 text-indigo-800',
  C1: 'border-ids-red-500 bg-ids-red-50 text-ids-red-700',
  C2: 'border-ids-red-700 bg-ids-red-100 text-ids-red-700',
};

export default function StepFormation() {
  const t = useTranslations('Inscription');
  const {
    register,
    formState: { errors },
  } = useFormContext<InscriptionFormData>();
  const objectif = useWatch({ name: 'objectif' });

  return (
    <div>
      <h2 className="text-xl font-bold text-white bg-ids-red-500 px-6 py-4 rounded-t-xl -mx-6 -mt-6 mb-6">
        {t('step2Title')}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Niveau */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ids-black mb-3">
            {t('niveau')} <span className="text-ids-red-500">*</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {NIVEAUX.map((niv) => (
              <label key={niv} className="cursor-pointer">
                <input type="radio" value={niv} className="sr-only peer" {...register('niveau')} />
                <div className={cn(
                  'border-2 rounded-lg p-3 text-center font-bold text-sm transition-all',
                  'peer-checked:ring-2 peer-checked:ring-offset-1',
                  NIVEAU_COLORS[niv],
                  'hover:scale-105'
                )}>
                  {niv}
                </div>
              </label>
            ))}
          </div>
          {errors.niveau && (
            <p className="mt-1.5 text-xs text-red-600">{errors.niveau.message}</p>
          )}
        </div>

        {/* Type de cours */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ids-black mb-3">
            {t('typeCours')} <span className="text-ids-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {TYPES_COURS.map((type) => (
              <label key={type} className="cursor-pointer">
                <input type="radio" value={type} className="sr-only peer" {...register('typeCours')} />
                <div className={cn(
                  'border-2 border-ids-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium text-center transition-all',
                  'peer-checked:border-ids-red-500 peer-checked:bg-ids-red-50 peer-checked:text-ids-red-700',
                  'hover:border-ids-gray-400'
                )}>
                  {t(`TYPE_${type}` as Parameters<typeof t>[0])}
                </div>
              </label>
            ))}
          </div>
          {errors.typeCours && (
            <p className="mt-1.5 text-xs text-red-600">{errors.typeCours.message}</p>
          )}
        </div>

        {/* Objectif */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-ids-black mb-3">
            {t('objectif')} <span className="text-ids-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {OBJECTIFS.map((obj) => (
              <label key={obj} className="cursor-pointer">
                <input type="radio" value={obj} className="sr-only peer" {...register('objectif')} />
                <div className={cn(
                  'border-2 border-ids-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
                  'peer-checked:border-ids-red-500 peer-checked:bg-ids-red-50 peer-checked:text-ids-red-700',
                  'hover:border-ids-gray-400'
                )}>
                  {t(`OBJ_${obj}` as Parameters<typeof t>[0])}
                </div>
              </label>
            ))}
          </div>
          {objectif === 'AUTRE' && (
            <input
              type="text"
              placeholder={t('objectifAutre')}
              className="mt-2 w-full px-4 py-2.5 rounded-lg border border-ids-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ids-red-500/30 focus:border-ids-red-500"
              {...register('objectifAutre')}
            />
          )}
          {errors.objectif && (
            <p className="mt-1.5 text-xs text-red-600">{errors.objectif.message}</p>
          )}
        </div>

        {/* Niveau d'études */}
        <div>
          <label className="block text-sm font-medium text-ids-black mb-1.5">
            {t('niveauEtudes')}
          </label>
          <select
            className="w-full px-4 py-2.5 rounded-lg border border-ids-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ids-red-500/30 focus:border-ids-red-500"
            {...register('niveauEtudes')}
          >
            <option value="">— {t('niveauEtudes')} —</option>
            {NIVEAUX_ETUDES.map((etu) => (
              <option key={etu} value={etu}>
                {t(`ETU_${etu}` as Parameters<typeof t>[0])}
              </option>
            ))}
          </select>
        </div>

        {/* Profession */}
        <div>
          <label className="block text-sm font-medium text-ids-black mb-1.5">
            {t('profession')}
          </label>
          <input
            type="text"
            placeholder="Ex : Infirmier(e), Ingénieur(e)..."
            className="w-full px-4 py-2.5 rounded-lg border border-ids-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ids-red-500/30 focus:border-ids-red-500"
            {...register('profession')}
          />
        </div>
      </div>
    </div>
  );
}
