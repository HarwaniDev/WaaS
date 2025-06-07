/*
  Warnings:

  - A unique constraint covering the columns `[solWalletId]` on the table `KeyShare` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "KeyShare_solWalletId_key" ON "KeyShare"("solWalletId");
