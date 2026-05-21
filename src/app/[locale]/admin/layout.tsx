import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { signOut } from '@/auth';
import { Link } from '@/i18n/navigation';
import { LayoutDashboard, ClipboardList, LogOut, Shield } from 'lucide-react';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') notFound();

  const { locale } = await params;

  const NAV = [
    { href: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
    { href: '/admin/inscriptions', label: 'Inscriptions', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen flex bg-ids-gray-50">
      {/* ── Sidebar fixed ── */}
      <aside className="fixed left-0 top-0 w-64 h-screen flex flex-col bg-ids-dark border-r border-white/10 overflow-y-auto z-30">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 bg-ids-red-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">IDS</span>
          </div>
          <div>
            <span className="text-white font-bold text-sm leading-tight block">IDS Cameroun</span>
            <span className="text-white/40 text-[10px] leading-tight flex items-center gap-1">
              <Shield className="w-2.5 h-2.5" />
              Administration
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors group"
            >
              <Icon className="w-4 h-4 shrink-0 group-hover:text-ids-red-500 transition-colors" />
              {label}
            </Link>
          ))}
        </nav>

        {/* User + Logout */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="px-3 py-2 mb-2">
            <p className="text-white/90 text-xs font-semibold truncate">{session.user.name}</p>
            <p className="text-white/40 text-[10px] truncate">{session.user.email}</p>
          </div>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: `/${locale}/connexion` });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-red-900/40 transition-colors"
            >
              <LogOut className="w-4 h-4 shrink-0" />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 ml-64">{children}</main>
    </div>
  );
}
