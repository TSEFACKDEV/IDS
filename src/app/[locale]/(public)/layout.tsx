import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SessionProvider } from 'next-auth/react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
    </SessionProvider>
  );
}
