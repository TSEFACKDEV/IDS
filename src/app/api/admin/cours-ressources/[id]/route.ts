import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const patchSchema = z.object({
  titre: z.string().min(2).optional(),
  description: z.string().optional(),
  niveau: z.enum(['A1', 'A2', 'B1', 'B2', 'C1']).optional(),
  type: z.enum(['AUDIO', 'VIDEO', 'TEXTE']).optional(),
  url: z.string().optional(),
  contenu: z.string().optional(),
  publie: z.boolean().optional(),
  ordre: z.number().int().optional(),
});

/** PATCH /api/admin/cours-ressources/[id] — modifier une ressource */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { id } = await params;
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Corps invalide' }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides' }, { status: 422 });
  }

  const ressource = await prisma.coursRessource.update({
    where: { id },
    data: parsed.data,
  });

  return NextResponse.json({ ressource });
}

/** DELETE /api/admin/cours-ressources/[id] — supprimer une ressource */
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const { id } = await params;
  await prisma.coursRessource.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
