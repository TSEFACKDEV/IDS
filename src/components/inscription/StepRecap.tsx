'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import type { InscriptionFormData } from './InscriptionForm';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecapRowProps {
  label: string;
  value: string | undefined;
}

function RecapRow({ label, value }: RecapRowProps) {
  if (!value) return null;
  return (
    <div className="flex gap-3 py-2 border-b border-ids-gray-200 last:border-0 text-sm">
      <span className="text-ids-gray-400 w-48 shrink-0">{label}</span>
      <span className="font-medium text-ids-black">{value}</span>
    </div>
  );
}

export default function StepRecap() {
  const t = useTranslations('Inscription');
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext<InscriptionFormData>();

  const values = watch();

  const typeLabel: Record<string, string> = {
    GROUPE: t('TYPE_GROUPE'),
    INDIVIDUEL: t('TYPE_INDIVIDUEL'),
    INTENSIF: t('TYPE_INTENSIF'),
    SEMI_INTENSIF: t('TYPE_SEMI_INTENSIF'),
    EN_LIGNE: t('TYPE_EN_LIGNE'),
  };

  const objectifLabel: Record<string, string> = {
    ETUDES_ALLEMAGNE: t('OBJ_ETUDES_ALLEMAGNE'),
    TRAVAIL: t('OBJ_TRAVAIL'),
    PREPARATION_EXAMEN: t('OBJ_PREPARATION_EXAMEN'),
    VOYAGE: t('OBJ_VOYAGE'),
    AUTRE: values.objectifAutre ?? t('OBJ_AUTRE'),
  };

  const creneauLabel: Record<string, string> = {
    MATIN: t('CRENEAU_MATIN'),
    MIDI: t('CRENEAU_MIDI'),
    SOIR: t('CRENEAU_SOIR'),
    WEEKEND: t('CRENEAU_WEEKEND'),
  };

  const jourLabel: Record<string, string> = {
    LUNDI: t('JOUR_LUNDI'),
    MARDI: t('JOUR_MARDI'),
    MERCREDI: t('JOUR_MERCREDI'),
    JEUDI: t('JOUR_JEUDI'),
    VENDREDI: t('JOUR_VENDREDI'),
    SAMEDI: t('JOUR_SAMEDI'),
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-white bg-ids-black px-6 py-4 rounded-t-xl -mx-6 -mt-6 mb-6">
        {t('step3Title')}
      </h2>

      {/* Section 1 — Infos personnelles */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-ids-gray-400 mb-3">
          {t('step1Label')}
        </h3>
        <div className="bg-ids-gray-50 rounded-xl p-4">
          <RecapRow label={t('nom')} value={values.nom} />
          <RecapRow label={t('prenom')} value={values.prenom} />
          <RecapRow label={t('email')} value={values.email} />
          <RecapRow label={t('telephone')} value={values.telephone} />
          <RecapRow label={t('dateNaissance')} value={values.dateNaissance} />
          <RecapRow label={t('sexe')} value={values.sexe === 'HOMME' ? t('sexeHomme') : values.sexe === 'FEMME' ? t('sexeFemme') : undefined} />
          <RecapRow label={t('nationalite')} value={values.nationalite} />
          <RecapRow label={t('ville')} value={values.ville} />
        </div>
      </div>

      {/* Section 2 — Formation */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-ids-gray-400 mb-3">
          {t('step2Label')}
        </h3>
        <div className="bg-ids-gray-50 rounded-xl p-4">
          <RecapRow label={t('niveau')} value={values.niveau} />
          <RecapRow label={t('typeCours')} value={values.typeCours ? typeLabel[values.typeCours] : undefined} />
          <RecapRow label={t('objectif')} value={values.objectif ? objectifLabel[values.objectif] : undefined} />
          <RecapRow
            label={t('creneaux')}
            value={(values.creneaux ?? []).map((c) => creneauLabel[c] ?? c).join(', ')}
          />
          <RecapRow
            label={t('jours')}
            value={(values.jours ?? []).map((j) => jourLabel[j] ?? j).join(', ')}
          />
          <RecapRow label={t('profession')} value={values.profession} />
        </div>
      </div>

      {/* Checkbox règlement */}
      <div className={cn(
        'border-2 rounded-xl p-4 transition-colors',
        errors.accepteReglement ? 'border-red-400 bg-red-50' : 'border-ids-gray-200'
      )}>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-ids-red-500 shrink-0"
            {...register('accepteReglement')}
          />
          <span className="text-sm text-ids-black leading-relaxed">
            {t('accepteReglement')}
          </span>
        </label>
        {errors.accepteReglement && (
          <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            {errors.accepteReglement.message as string}
          </p>
        )}
      </div>
    </div>
  );
}
