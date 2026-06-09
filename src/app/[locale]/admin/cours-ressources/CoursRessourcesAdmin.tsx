'use client';

import { useState, useTransition } from 'react';
import { Pencil, Trash2, Plus, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { FaHeadphones, FaVideo, FaFilePdf } from 'react-icons/fa';

interface Ressource {
  id: string;
  titre: string;
  description: string | null;
  niveau: string;
  type: string;
  url: string | null;
  contenu: string | null;
  publie: boolean;
  ordre: number;
}

const NIVEAUX = ['A1', 'A2', 'B1', 'B2', 'C1'];
const TYPES = ['AUDIO', 'VIDEO', 'TEXTE'];
const TYPE_ICONS: Record<string, React.ElementType> = { AUDIO: FaHeadphones, VIDEO: FaVideo, TEXTE: FaFilePdf };
const TYPE_LABELS: Record<string, string> = { AUDIO: 'Audio', VIDEO: 'Vidéo', TEXTE: 'Texte / PDF' };

const NIVEAU_COLORS: Record<string, string> = {
  A1: 'bg-emerald-100 text-emerald-800',
  A2: 'bg-teal-100 text-teal-800',
  B1: 'bg-blue-100 text-blue-800',
  B2: 'bg-indigo-100 text-indigo-800',
  C1: 'bg-amber-100 text-amber-800',
};

const EMPTY_FORM = { titre: '', description: '', niveau: 'A1', type: 'TEXTE', url: '', contenu: '', publie: false, ordre: 0 };

export default function CoursRessourcesAdmin({ initialRessources }: { initialRessources: Ressource[] }) {
  const [ressources, setRessources] = useState<Ressource[]>(initialRessources);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterNiveau, setFilterNiveau] = useState('');
  const [filterType, setFilterType] = useState('');
  const [isPending, startTransition] = useTransition();

  const filtered = ressources.filter(r =>
    (!filterNiveau || r.niveau === filterNiveau) &&
    (!filterType || r.type === filterType)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const url = editId ? `/api/admin/cours-ressources/${editId}` : '/api/admin/cours-ressources';
      const method = editId ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) {
        const data = await res.json();
        if (editId) {
          setRessources(prev => prev.map(r => r.id === editId ? data.ressource : r));
        } else {
          setRessources(prev => [...prev, data.ressource]);
        }
        setShowForm(false);
        setEditId(null);
        setForm(EMPTY_FORM);
      }
    });
  };

  const handleEdit = (r: Ressource) => {
    setEditId(r.id);
    setForm({ titre: r.titre, description: r.description ?? '', niveau: r.niveau, type: r.type, url: r.url ?? '', contenu: r.contenu ?? '', publie: r.publie, ordre: r.ordre });
    setShowForm(true);
  };

  const handleTogglePublie = async (r: Ressource) => {
    startTransition(async () => {
      const res = await fetch(`/api/admin/cours-ressources/${r.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publie: !r.publie }),
      });
      if (res.ok) {
        const data = await res.json();
        setRessources(prev => prev.map(x => x.id === r.id ? data.ressource : x));
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette ressource ?')) return;
    startTransition(async () => {
      const res = await fetch(`/api/admin/cours-ressources/${id}`, { method: 'DELETE' });
      if (res.ok) setRessources(prev => prev.filter(r => r.id !== id));
    });
  };

  return (
    <div>
      {/* Filtres + bouton ajout */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          className="text-sm border border-ids-gray-200 rounded-lg px-3 py-2 bg-white text-ids-gray-700"
          value={filterNiveau}
          onChange={e => setFilterNiveau(e.target.value)}
        >
          <option value="">Tous les niveaux</option>
          {NIVEAUX.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select
          className="text-sm border border-ids-gray-200 rounded-lg px-3 py-2 bg-white text-ids-gray-700"
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
        >
          <option value="">Tous les types</option>
          {TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
        </select>
        <div className="ml-auto">
          <button
            onClick={() => { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-ids-red-500 text-white font-semibold text-sm rounded-lg hover:bg-ids-red-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter une ressource
          </button>
        </div>
      </div>

      {/* Formulaire ajout/édition */}
      {showForm && (
        <div className="bg-white border border-ids-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
          <h3 className="font-black text-ids-black text-lg mb-5">{editId ? 'Modifier la ressource' : 'Nouvelle ressource'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-ids-gray-600 block mb-1">Titre *</label>
              <input
                required
                className="w-full border border-ids-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ids-red-500"
                value={form.titre}
                onChange={e => setForm(f => ({ ...f, titre: e.target.value }))}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-ids-gray-600 block mb-1">Niveau *</label>
              <select
                className="w-full border border-ids-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                value={form.niveau}
                onChange={e => setForm(f => ({ ...f, niveau: e.target.value }))}
              >
                {NIVEAUX.map(n => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-ids-gray-600 block mb-1">Type *</label>
              <select
                className="w-full border border-ids-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
                value={form.type}
                onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
              >
                {TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-ids-gray-600 block mb-1">Description</label>
              <input
                className="w-full border border-ids-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ids-red-500"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-ids-gray-600 block mb-1">URL (fichier audio, vidéo, PDF ou lien externe)</label>
              <input
                type="url"
                className="w-full border border-ids-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ids-red-500"
                value={form.url}
                onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                placeholder="https://..."
              />
            </div>
            {form.type === 'TEXTE' && (
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-ids-gray-600 block mb-1">Contenu texte (optionnel)</label>
                <textarea
                  rows={5}
                  className="w-full border border-ids-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-ids-red-500 resize-y"
                  value={form.contenu}
                  onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))}
                />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-ids-gray-600 block mb-1">Ordre d&apos;affichage</label>
              <input
                type="number"
                className="w-full border border-ids-gray-200 rounded-lg px-3 py-2 text-sm"
                value={form.ordre}
                onChange={e => setForm(f => ({ ...f, ordre: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="flex items-center gap-3 mt-4">
              <input
                type="checkbox"
                id="publie"
                checked={form.publie}
                onChange={e => setForm(f => ({ ...f, publie: e.target.checked }))}
                className="w-4 h-4 accent-ids-red-500"
              />
              <label htmlFor="publie" className="text-sm font-medium text-ids-gray-700">Publier immédiatement</label>
            </div>
            <div className="md:col-span-2 flex gap-3 mt-2">
              <button
                type="submit"
                disabled={isPending}
                className="px-6 py-2.5 bg-ids-red-500 text-white font-semibold text-sm rounded-lg hover:bg-ids-red-600 disabled:opacity-50 transition-colors"
              >
                {isPending ? 'Enregistrement...' : (editId ? 'Modifier' : 'Ajouter')}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditId(null); setForm(EMPTY_FORM); }}
                className="px-6 py-2.5 border border-ids-gray-200 text-ids-gray-600 font-semibold text-sm rounded-lg hover:bg-ids-gray-100 transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tableau des ressources */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-ids-gray-200">
          <p className="text-ids-gray-400 text-sm">Aucune ressource trouvée.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-ids-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-ids-gray-50 border-b border-ids-gray-200">
                <th className="text-left px-5 py-3 text-xs font-bold text-ids-gray-500 uppercase">Titre</th>
                <th className="text-left px-3 py-3 text-xs font-bold text-ids-gray-500 uppercase hidden sm:table-cell">Niveau</th>
                <th className="text-left px-3 py-3 text-xs font-bold text-ids-gray-500 uppercase hidden md:table-cell">Type</th>
                <th className="text-center px-3 py-3 text-xs font-bold text-ids-gray-500 uppercase">Statut</th>
                <th className="text-right px-5 py-3 text-xs font-bold text-ids-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => {
                const TypeIcon = TYPE_ICONS[r.type] ?? FaFilePdf;
                return (
                  <tr key={r.id} className="border-b border-ids-gray-100 last:border-0 hover:bg-ids-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-ids-gray-100 flex items-center justify-center shrink-0">
                          <TypeIcon className="w-4 h-4 text-ids-gray-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-ids-black">{r.titre}</p>
                          {r.description && <p className="text-xs text-ids-gray-400 line-clamp-1">{r.description}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 hidden sm:table-cell">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${NIVEAU_COLORS[r.niveau] ?? 'bg-gray-100 text-gray-700'}`}>
                        {r.niveau}
                      </span>
                    </td>
                    <td className="px-3 py-4 hidden md:table-cell">
                      <span className="text-xs text-ids-gray-600">{TYPE_LABELS[r.type]}</span>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button
                        onClick={() => handleTogglePublie(r)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${r.publie ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-ids-gray-100 text-ids-gray-500 hover:bg-ids-gray-200'}`}
                      >
                        {r.publie ? <><CheckCircle className="w-3 h-3" />Publié</> : <><EyeOff className="w-3 h-3" />Brouillon</>}
                      </button>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(r)}
                          className="p-2 rounded-lg text-ids-gray-500 hover:bg-ids-gray-100 hover:text-ids-black transition-colors"
                          aria-label="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(r.id)}
                          className="p-2 rounded-lg text-ids-gray-400 hover:bg-red-50 hover:text-ids-red-500 transition-colors"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
