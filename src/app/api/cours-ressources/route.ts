import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

/** GET /api/cours-ressources?niveau=B1 — liste des ressources publiées pour un niveau */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const niveau = req.nextUrl.searchParams.get('niveau');
  const type = req.nextUrl.searchParams.get('type');

  // L'étudiant peut accéder aux ressources de son niveau inscrit
  const inscription = await prisma.inscription.findFirst({
    where: { email: session.user.email ?? '', statut: 'CONFIRMEE' },
    select: { niveau: true },
  });

  if (!inscription && session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Inscription non confirmée' }, { status: 403 });
  }

  const niveauFinal = niveau ?? inscription?.niveau;

  const ressources = await prisma.coursRessource.findMany({
    where: {
      publie: true,
      ...(niveauFinal ? { niveau: niveauFinal as never } : {}),
      ...(type ? { type: type as never } : {}),
    },
    orderBy: [{ niveau: 'asc' }, { ordre: 'asc' }],
    select: { id: true, titre: true, description: true, niveau: true, type: true, url: true, contenu: true, ordre: true },
  });

  return NextResponse.json({ ressources });
}
