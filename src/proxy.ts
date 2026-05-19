/**
 * proxy.ts — Next.js 16 (remplace middleware.ts)
 * Tourne en Edge Runtime : seul authConfig (sans Prisma/crypto) est importé.
 * Le JWT est vérifié via Web Crypto API (Edge-compatible).
 */
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);
const { auth } = NextAuth(authConfig);

export default auth(function proxy(req) {
  const { pathname } = req.nextUrl;

  // Routes protégées par authentification
  const isAdminPath = /^\/(fr|de)\/admin(\/|$)/.test(pathname);

  if (isAdminPath) {
    if (!req.auth) {
      const locale = (pathname.split('/')[1] as 'fr' | 'de') ?? 'fr';
      const loginUrl = new URL(`/${locale}/connexion`, req.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return Response.redirect(loginUrl);
    }
    if (req.auth.user?.role !== 'ADMIN') {
      const locale = (pathname.split('/')[1] as 'fr' | 'de') ?? 'fr';
      return Response.redirect(new URL(`/${locale}`, req.url));
    }
  }

  return intlMiddleware(req as NextRequest);
});

export const config = {
  matcher: [
    // Inclure toutes les routes sauf les assets statiques et API internes
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
