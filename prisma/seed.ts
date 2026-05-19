/**
 * Seed de l'administrateur principal IDS Cameroun.
 * Usage : npx tsx prisma/seed.ts
 */
import crypto from 'crypto';
import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  const email = 'teguiamerlinkenmogne@gmail.com';
  const password = 'IDS2026TMK';

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // Mettre à jour le rôle et le mot de passe si l'utilisateur existe déjà
    await prisma.user.update({
      where: { email },
      data: {
        role: 'ADMIN',
        motDePasse: hashPassword(password),
        nom: 'NKENMOGNE',
        prenom: 'Teguia Merlin',
      },
    });
    console.log(`✓ Admin mis à jour : ${email}`);
  } else {
    await prisma.user.create({
      data: {
        email,
        nom: 'NKENMOGNE',
        prenom: 'Teguia Merlin',
        motDePasse: hashPassword(password),
        role: 'ADMIN',
        locale: 'fr',
      },
    });
    console.log(`✓ Admin créé : ${email}`);
  }
}

main()
  .catch((e) => {
    console.error('Erreur seed :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
