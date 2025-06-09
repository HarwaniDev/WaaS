/*
  Warnings:

  - You are about to drop the `KeyShare2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "KeyShare2";

-- CreateTable
CREATE TABLE "KeyShare3" (
    "id" TEXT NOT NULL,
    "solWalletId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "share" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeyShare3_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KeyShare3_solWalletId_index_key" ON "KeyShare3"("solWalletId", "index");
