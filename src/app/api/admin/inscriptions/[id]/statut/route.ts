import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

const schema = z.object({
  statut: z.enum(['EN_ATTENTE', 'CONFIRMEE', 'ANNULEE']),
});

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps invalide' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Statut invalide' }, { status: 422 });
  }

  const existing = await prisma.inscription.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: 'Inscription introuvable' }, { status: 404 });
  }

  const updated = await prisma.inscription.update({
    where: { id },
    data: { statut: parsed.data.statut },
    select: { id: true, statut: true, numeroAuto: true },
  });

  return NextResponse.json(updated);
}
