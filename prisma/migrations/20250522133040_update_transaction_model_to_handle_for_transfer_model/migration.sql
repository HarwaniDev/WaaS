/*
  Warnings:

  - You are about to drop the `Transfer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transfer" DROP CONSTRAINT "Transfer_transactionId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "decimals" INTEGER,
ADD COLUMN     "mint" TEXT,
ADD COLUMN     "type" "TransferType" NOT NULL DEFAULT 'NATIVE';

-- DropTable
DROP TABLE "Transfer";
