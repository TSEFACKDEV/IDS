'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';

export default function ConnexionPage() {
  const t = useTranslations('Auth');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? `/${locale}`;

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update(field: 'email' | 'password', value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl,
    });

    if (result?.error) {
      setError(t('errInvalidCredentials'));
      setLoading(false);
      return;
    }

    if (result?.url) {
      window.location.href = result.url;
    }
  }

  return (
    <div className="min-h-screen bg-ids-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="w-12 h-12 bg-ids-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-black text-lg">IDS</span>
            </div>
          </Link>
          <h1 className="text-2xl font-black text-ids-black">{t('loginTitle')}</h1>
          <p className="text-ids-gray-600 text-sm mt-2">{t('loginSubtitle')}</p>
        </div>

        <div className="bg-white border border-ids-gray-200 rounded-xl shadow-sm p-8">
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-ids-black mb-1.5">
                {t('fieldEmail')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ids-gray-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-ids-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ids-red-500 focus:border-transparent"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-medium text-ids-black mb-1.5">
                {t('fieldPassword')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ids-gray-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 border border-ids-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ids-red-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ids-gray-400 hover:text-ids-gray-600"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-ids-red-500 text-white font-semibold py-3 rounded-lg hover:bg-ids-red-600 disabled:opacity-60 transition-colors"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {t('loginBtn')}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-ids-gray-400 mt-6">
          <Link href="/" className="text-ids-red-500 hover:underline">
            ← {t('backToHome')}
          </Link>
        </p>
      </div>
    </div>
  );
}
