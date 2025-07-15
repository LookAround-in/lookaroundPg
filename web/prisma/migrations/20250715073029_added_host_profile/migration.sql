-- DropForeignKey
ALTER TABLE "PgData" DROP CONSTRAINT "PgData_hostId_fkey";

-- CreateTable
CREATE TABLE "host_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "alternateContact" TEXT,
    "whatsApp" TEXT,
    "Address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "host_profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "host_profile_userId_key" ON "host_profile"("userId");

-- AddForeignKey
ALTER TABLE "host_profile" ADD CONSTRAINT "host_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PgData" ADD CONSTRAINT "PgData_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "host_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
