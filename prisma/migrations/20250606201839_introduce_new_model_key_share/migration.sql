-- CreateTable
CREATE TABLE "KeyShare" (
    "id" TEXT NOT NULL,
    "solWalletId" TEXT NOT NULL,
    "index" INTEGER NOT NULL,
    "share" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "KeyShare_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "KeyShare_solWalletId_index_key" ON "KeyShare"("solWalletId", "index");

-- AddForeignKey
ALTER TABLE "KeyShare" ADD CONSTRAINT "KeyShare_solWalletId_fkey" FOREIGN KEY ("solWalletId") REFERENCES "SolWallet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
