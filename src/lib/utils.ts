import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Formater un nombre avec séparateur de milliers */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat('fr-FR').format(n);
}

/** Formater une date en DD/MM/YYYY */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/** Prix par niveau (FCFA) */
export const NIVEAU_PRIX: Record<string, number> = {
  A1: 75000,
  A2: 90000,
  B1: 110000,
  B2: 130000,
  C1: 160000,
};
