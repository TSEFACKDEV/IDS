import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IDS Cameroun — Institut für die Deutsche Sprache",
  description:
    "Cours d'allemand certifiants à Douala et Yaoundé. Préparation Goethe, TestDaF, DSH. Accompagnement visa étudiant et travailleur qualifié.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
