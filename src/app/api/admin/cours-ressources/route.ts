import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const schema = z.object({
  titre: z.string().min(2),
  description: z.string().optional(),
  niveau: z.enum(['A1', 'A2', 'B1', 'B2', 'C1']),
  type: z.enum(['AUDIO', 'VIDEO', 'TEXTE']),
  url: z.string().url().optional().or(z.literal('')),
  contenu: z.string().optional(),
  publie: z.boolean().default(false),
  ordre: z.number().int().default(0),
});

/** GET /api/admin/cours-ressources — liste toutes les ressources (admin) */
export async function GET() {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  const ressources = await prisma.coursRessource.findMany({
    orderBy: [{ niveau: 'asc' }, { ordre: 'asc' }],
  });

  return NextResponse.json({ ressources });
}

/** POST /api/admin/cours-ressources — créer une ressource */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 403 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: 'Corps invalide' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Données invalides', details: parsed.error.flatten() }, { status: 422 });
  }

  const ressource = await prisma.coursRessource.create({
    data: {
      ...parsed.data,
      url: parsed.data.url || null,
      description: parsed.data.description || null,
      contenu: parsed.data.contenu || null,
    },
  });

  return NextResponse.json({ ressource }, { status: 201 });
}
