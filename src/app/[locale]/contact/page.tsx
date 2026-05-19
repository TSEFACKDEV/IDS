'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Placeholder — contact form API not yet wired
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setLoading(false);
  }

  const CONTACT_INFO = [
    {
      icon: MapPin,
      label: t('agenceDouala'),
      value: t('adresseDouala'),
    },
    {
      icon: MapPin,
      label: t('agenceYaounde'),
      value: t('adresseYaounde'),
    },
    {
      icon: Phone,
      label: t('telephoneLabel'),
      value: '+237 675 123 456',
    },
    {
      icon: Mail,
      label: t('emailLabel'),
      value: 'info@ids-cameroun.com',
    },
    {
      icon: Clock,
      label: t('horaireLabel'),
      value: t('horaireValeur'),
    },
  ];

  return (
    <div className="min-h-screen bg-ids-gray-50">
      {/* Hero */}
      <div className="bg-ids-dark text-white py-20">
        <div className="container-ids text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-black mb-4">{t('pageTitle')}</h1>
          <div className="w-12 h-0.5 bg-ids-red-500 mx-auto mb-6" />
          <p className="text-ids-gray-400">{t('pageSubtitle')}</p>
        </div>
      </div>

      <div className="container-ids py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Formulaire */}
          <div className="bg-white border border-ids-gray-200 rounded-xl p-8">
            {sent ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-emerald-600" />
                </div>
                <h2 className="text-lg font-bold text-ids-black mb-2">{t('sentTitle')}</h2>
                <p className="text-ids-gray-600 text-sm">{t('sentText')}</p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-black text-ids-black mb-6">{t('formTitle')}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-ids-gray-600 mb-1">{t('fieldNom')}</label>
                      <input
                        required
                        value={form.nom}
                        onChange={(e) => update('nom', e.target.value)}
                        className="w-full border border-ids-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ids-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-ids-gray-600 mb-1">{t('fieldEmail')}</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className="w-full border border-ids-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ids-red-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ids-gray-600 mb-1">{t('fieldSujet')}</label>
                    <input
                      required
                      value={form.sujet}
                      onChange={(e) => update('sujet', e.target.value)}
                      className="w-full border border-ids-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ids-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-ids-gray-600 mb-1">{t('fieldMessage')}</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="w-full border border-ids-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ids-red-500 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-ids-red-500 text-white font-semibold py-3 rounded-lg hover:bg-ids-red-600 disabled:opacity-60 transition-colors"
                  >
                    {loading ? t('sendingBtn') : t('sendBtn')}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Infos */}
          <div className="space-y-5">
            {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-white border border-ids-gray-200 rounded-xl p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-ids-red-50 rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-ids-red-500" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-ids-gray-400 mb-1">{label}</div>
                  <div className="text-sm font-medium text-ids-black">{value}</div>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/237675123456"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-emerald-500 text-white font-semibold px-5 py-4 rounded-xl hover:bg-emerald-600 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {t('whatsappCta')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
