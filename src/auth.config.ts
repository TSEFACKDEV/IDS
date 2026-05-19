/**
 * Configuration next-auth compatible Edge Runtime.
 * Aucun import Node.js ici — utilisé par proxy.ts (Edge) ET auth.ts (Node.js).
 */
import type { NextAuthConfig } from 'next-auth';

// Augmentation des types next-auth (déclarée une seule fois ici)
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      email: string;
      name: string;
    };
  }
  interface User {
    role: string;
  }
}

export const authConfig = {
  pages: {
    signIn: '/fr/connexion',
  },
  session: { strategy: 'jwt' as const },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        (token as Record<string, unknown>).id = String(user.id ?? '');
        (token as Record<string, unknown>).role = String(
          (user as { role?: string }).role ?? 'ETUDIANT'
        );
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = String((token as Record<string, unknown>).id ?? '');
        session.user.role = String(
          (token as Record<string, unknown>).role ?? 'ETUDIANT'
        );
      }
      return session;
    },
  },
  providers: [], // Credentials provider ajouté dans auth.ts
} satisfies NextAuthConfig;
