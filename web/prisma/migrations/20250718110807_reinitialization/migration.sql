/*
  Warnings:

  - You are about to drop the column `hostContact` on the `PgData` table. All the data in the column will be lost.
  - You are about to drop the column `hostName` on the `PgData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PgData" DROP COLUMN "hostContact",
DROP COLUMN "hostName";
