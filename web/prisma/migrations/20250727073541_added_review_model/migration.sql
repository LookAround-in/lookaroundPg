/*
  Warnings:

  - You are about to drop the column `rating` on the `PgData` table. All the data in the column will be lost.
  - You are about to drop the column `reviews` on the `PgData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PgData" DROP COLUMN "rating",
DROP COLUMN "reviews",
ADD COLUMN     "nearbyFacilities" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "pgDataId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
