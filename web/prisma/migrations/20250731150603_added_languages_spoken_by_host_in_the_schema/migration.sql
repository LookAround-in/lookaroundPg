-- AlterTable
ALTER TABLE "host_profile" ADD COLUMN     "languagesSpokenByHost" TEXT[] DEFAULT ARRAY[]::TEXT[];
