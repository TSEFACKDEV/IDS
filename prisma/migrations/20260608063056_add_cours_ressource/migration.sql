-- CreateEnum
CREATE TYPE "TypeRessource" AS ENUM ('AUDIO', 'VIDEO', 'TEXTE');

-- CreateTable
CREATE TABLE "cours_ressources" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT,
    "niveau" "NiveauAllemand" NOT NULL,
    "type" "TypeRessource" NOT NULL,
    "url" TEXT,
    "contenu" TEXT,
    "publie" BOOLEAN NOT NULL DEFAULT false,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cours_ressources_pkey" PRIMARY KEY ("id")
);
