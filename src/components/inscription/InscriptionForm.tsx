'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Download, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import StepPersonnel from './StepPersonnel';
import StepFormation from './StepFormation';
import StepDisponibilite from './StepDisponibilite';
import StepRecap from './StepRecap';

// ─── Schéma Zod ───────────────────────────────────────────────────────────────
const inscriptionSchema = z.object({
  // Étape 1 — Personnel
  nom: z.string().min(2, 'errNom'),
  prenom: z.string().min(2, 'errPrenom'),
  dateNaissance: z.string().optional(),
  sexe: z.enum(['HOMME', 'FEMME']).optional(),
  nationalite: z.string().optional(),
  adresse: z.string().optional(),
  ville: z.string().optional(),
  codePostal: z.string().optional(),
  telephone: z.string().min(8, 'errTelephone'),
  email: z.string().email('errEmail'),

  // Étape 2 — Formation
  niveau: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']).refine((v) => !!v, {
    message: 'errNiveau',
  }),
  typeCours: z.enum(['GROUPE', 'INDIVIDUEL', 'INTENSIF', 'SEMI_INTENSIF', 'EN_LIGNE']).refine(
    (v) => !!v,
    { message: 'errTypeCours' }
  ),
  objectif: z.enum(['ETUDES_ALLEMAGNE', 'TRAVAIL', 'PREPARATION_EXAMEN', 'VOYAGE', 'AUTRE']).refine(
    (v) => !!v,
    { message: 'errObjectif' }
  ),
  objectifAutre: z.string().optional(),
  niveauEtudes: z.enum(['LYCEE', 'UNIVERSITE', 'PROFESSIONNEL', 'AUTRE']).optional(),
  profession: z.string().optional(),

  // Étape 2 — Disponibilités
  creneaux: z.array(z.string()).min(1, 'errCreneaux'),
  jours: z.array(z.string()).min(1, 'errJours'),

  // Étape 3 — Récapitulatif
  accepteReglement: z.boolean().refine((v) => v === true, { message: 'errReglement' }),
});

export type InscriptionFormData = z.infer<typeof inscriptionSchema>;

// Champs validés à chaque étape
const STEP_FIELDS: Array<(keyof InscriptionFormData)[]> = [
  ['nom', 'prenom', 'telephone', 'email'],
  ['niveau', 'typeCours', 'objectif', 'creneaux', 'jours'],
  ['accepteReglement'],
];

const STEPS = ['step1Label', 'step2Label', 'step3Label'] as const;

interface SuccessState {
  numeroAuto: string;
  pdfUrl: string;
}

export default function InscriptionForm() {
  const t = useTranslations('Inscription');
  const locale = useLocale();
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<InscriptionFormData>({
    resolver: zodResolver(inscriptionSchema),
    mode: 'onBlur',
    defaultValues: {
      creneaux: [],
      jours: [],
    },
  });

  async function handleNext() {
    const fields = STEP_FIELDS[step];
    const valid = await methods.trigger(fields);
    if (valid) setStep((s) => Math.min(s + 1, 2));
  }

  async function handleSubmit(data: InscriptionFormData) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/inscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? 'Erreur serveur');
      }
      const json = await res.json();
      setSuccess({ numeroAuto: json.numeroAuto, pdfUrl: json.pdfUrl });
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setIsSubmitting(false);
    }
  }

  // ─── Succès ──────────────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-black text-ids-black mb-2">{t('successTitle')}</h2>
        <p className="text-ids-gray-600 mb-6">
          {t('successText', { numero: success.numeroAuto })}
        </p>
        <a
          href={success.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-ids-red-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-ids-red-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          {t('downloadPdf')}
        </a>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((key, i) => (
              <div key={key} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  i < step
                    ? 'bg-emerald-500 text-white'
                    : i === step
                    ? 'bg-ids-red-500 text-white'
                    : 'bg-ids-gray-200 text-ids-gray-400'
                }`}>
                  {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${
                  i === step ? 'text-ids-black' : 'text-ids-gray-400'
                }`}>
                  {t(key)}
                </span>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 rounded-full transition-all ${i < step ? 'bg-emerald-500' : 'bg-ids-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          {/* Barre rouge animée */}
          <div className="h-1.5 bg-ids-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-ids-red-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((step + 1) / 3) * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
        </div>

        {/* Formulaire */}
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <div className="bg-white border border-ids-gray-200 rounded-xl p-6 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {step === 0 && <StepPersonnel />}
                {step === 1 && (
                  <div className="space-y-6">
                    <StepFormation />
                    <StepDisponibilite />
                  </div>
                )}
                {step === 2 && <StepRecap />}
              </motion.div>
            </AnimatePresence>

            {/* Erreur de soumission */}
            {submitError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {submitError}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-ids-gray-200 rounded-lg text-sm font-medium text-ids-gray-600 hover:bg-ids-gray-100 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('back' as Parameters<typeof t>[0])}
                </button>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-ids-red-500 text-white font-semibold px-7 py-2.5 rounded-lg hover:bg-ids-red-600 transition-colors ml-auto"
                >
                  {t('next' as Parameters<typeof t>[0])}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 bg-ids-red-500 text-white font-semibold px-7 py-2.5 rounded-lg hover:bg-ids-red-600 disabled:opacity-60 transition-colors ml-auto"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {t('submitBtn')}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
