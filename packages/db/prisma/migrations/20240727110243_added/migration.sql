-- CreateTable
CREATE TABLE "OffRampTransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "to" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "OffRampTransaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OffRampTransaction" ADD CONSTRAINT "OffRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
