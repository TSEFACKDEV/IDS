'use client';

import { useState, useTransition } from 'react';
import { CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';

type Statut = 'EN_ATTENTE' | 'CONFIRMEE' | 'ANNULEE';

interface StatutActionsProps {
  inscriptionId: string;
  currentStatut: Statut;
}

const ACTIONS: { statut: Statut; label: string; icon: typeof CheckCircle; className: string }[] = [
  { statut: 'EN_ATTENTE', label: 'En attente', icon: Clock, className: 'border-amber-300 text-amber-700 hover:bg-amber-50' },
  { statut: 'CONFIRMEE', label: 'Confirmer', icon: CheckCircle, className: 'border-emerald-300 text-emerald-700 hover:bg-emerald-50' },
  { statut: 'ANNULEE', label: 'Annuler', icon: XCircle, className: 'border-red-300 text-red-600 hover:bg-red-50' },
];

export default function StatutActions({ inscriptionId, currentStatut }: StatutActionsProps) {
  const [statut, setStatut] = useState<Statut>(currentStatut);
  const [isPending, startTransition] = useTransition();

  async function changeStatut(newStatut: Statut) {
    if (newStatut === statut || isPending) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/inscriptions/${inscriptionId}/statut`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ statut: newStatut }),
      });
      if (res.ok) setStatut(newStatut);
    });
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {ACTIONS.map(({ statut: s, label, icon: Icon, className }) => (
        <button
          key={s}
          onClick={() => changeStatut(s)}
          disabled={isPending || s === statut}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-50 ${
            s === statut
              ? s === 'EN_ATTENTE'
                ? 'bg-amber-100 border-amber-300 text-amber-800 cursor-default'
                : s === 'CONFIRMEE'
                ? 'bg-emerald-100 border-emerald-300 text-emerald-800 cursor-default'
                : 'bg-red-100 border-red-300 text-red-700 cursor-default'
              : `bg-white ${className} cursor-pointer`
          }`}
        >
          {isPending && s !== statut ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Icon className="w-4 h-4" />
          )}
          {label}
          {s === statut && <span className="text-xs font-normal">(actuel)</span>}
        </button>
      ))}
    </div>
  );
}
