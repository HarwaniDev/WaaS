/*
  Warnings:

  - You are about to drop the `KeyShare` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SolWallet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KeyShare" DROP CONSTRAINT "KeyShare_solWalletId_fkey";

-- DropForeignKey
ALTER TABLE "SolWallet" DROP CONSTRAINT "SolWallet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_solWalletId_fkey";

-- DropTable
DROP TABLE "KeyShare";

-- DropTable
DROP TABLE "SolWallet";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "TransferType";

-- CreateTable
CREATE TABLE "KeyShare2" (
    "id" TEXT NOT NULL,
    "solWalletId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "share" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeyShare2_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KeyShare2_solWalletId_index_key" ON "KeyShare2"("solWalletId", "index");
