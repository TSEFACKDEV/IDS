-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ETUDIANT', 'ADMIN');

-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('HOMME', 'FEMME');

-- CreateEnum
CREATE TYPE "NiveauAllemand" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "TypeCours" AS ENUM ('GROUPE', 'INDIVIDUEL', 'INTENSIF', 'SEMI_INTENSIF', 'EN_LIGNE');

-- CreateEnum
CREATE TYPE "Objectif" AS ENUM ('ETUDES_ALLEMAGNE', 'TRAVAIL', 'PREPARATION_EXAMEN', 'VOYAGE', 'AUTRE');

-- CreateEnum
CREATE TYPE "NiveauEtudes" AS ENUM ('LYCEE', 'UNIVERSITE', 'PROFESSIONNEL', 'AUTRE');

-- CreateEnum
CREATE TYPE "StatutInscription" AS ENUM ('EN_ATTENTE', 'CONFIRMEE', 'ANNULEE');

-- CreateEnum
CREATE TYPE "StatutEmail" AS ENUM ('EN_ATTENTE', 'ENVOYE', 'ECHEC');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "motDePasse" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ETUDIANT',
    "locale" TEXT NOT NULL DEFAULT 'fr',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscriptions" (
    "id" TEXT NOT NULL,
    "numeroAuto" TEXT NOT NULL,
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "dateNaissance" TEXT,
    "sexe" "Sexe",
    "nationalite" TEXT,
    "adresse" TEXT,
    "ville" TEXT,
    "codePostal" TEXT,
    "niveau" "NiveauAllemand" NOT NULL,
    "typeCours" "TypeCours" NOT NULL,
    "objectif" "Objectif" NOT NULL,
    "objectifAutre" TEXT,
    "creneaux" TEXT[],
    "jours" TEXT[],
    "niveauEtudes" "NiveauEtudes",
    "profession" TEXT,
    "accepteReglement" BOOLEAN NOT NULL DEFAULT false,
    "statut" "StatutInscription" NOT NULL DEFAULT 'EN_ATTENTE',
    "languePref" TEXT NOT NULL DEFAULT 'fr',
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_logs" (
    "id" TEXT NOT NULL,
    "inscriptionId" TEXT NOT NULL,
    "destinataire" TEXT NOT NULL,
    "sujet" TEXT NOT NULL,
    "statut" "StatutEmail" NOT NULL DEFAULT 'EN_ATTENTE',
    "resendId" TEXT,
    "envoye_le" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "inscriptions_numeroAuto_key" ON "inscriptions"("numeroAuto");

-- AddForeignKey
ALTER TABLE "inscriptions" ADD CONSTRAINT "inscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "email_logs" ADD CONSTRAINT "email_logs_inscriptionId_fkey" FOREIGN KEY ("inscriptionId") REFERENCES "inscriptions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
