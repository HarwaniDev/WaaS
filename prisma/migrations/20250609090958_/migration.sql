/*
  Warnings:

  - You are about to drop the `KeyShare3` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TransferType" AS ENUM ('NATIVE', 'TOKEN');

-- DropTable
DROP TABLE "KeyShare3";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "profilePicture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolWallet" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SolWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyShare" (
    "id" TEXT NOT NULL,
    "solWalletId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "share" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeyShare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "timestamp" BIGINT NOT NULL,
    "sender" TEXT NOT NULL,
    "reciever" TEXT NOT NULL,
    "mint" TEXT,
    "amount" BIGINT,
    "tokenAmount" BIGINT,
    "fees" BIGINT NOT NULL,
    "type" "TransferType" NOT NULL,
    "solWalletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SolWallet_publicKey_key" ON "SolWallet"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "SolWallet_userId_key" ON "SolWallet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "KeyShare_solWalletId_key" ON "KeyShare"("solWalletId");

-- CreateIndex
CREATE UNIQUE INDEX "KeyShare_solWalletId_index_key" ON "KeyShare"("solWalletId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_signature_key" ON "Transaction"("signature");

-- AddForeignKey
ALTER TABLE "SolWallet" ADD CONSTRAINT "SolWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeyShare" ADD CONSTRAINT "KeyShare_solWalletId_fkey" FOREIGN KEY ("solWalletId") REFERENCES "SolWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_solWalletId_fkey" FOREIGN KEY ("solWalletId") REFERENCES "SolWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
