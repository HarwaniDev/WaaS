/*
  Warnings:

  - You are about to drop the column `privateKey` on the `SolWallet` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "SolWallet_privateKey_key";

-- AlterTable
ALTER TABLE "SolWallet" DROP COLUMN "privateKey";
