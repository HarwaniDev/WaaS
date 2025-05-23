-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "tokenAmount" BIGINT,
ALTER COLUMN "amount" DROP NOT NULL;
