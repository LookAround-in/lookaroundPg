-- CreateTable
CREATE TABLE "wish_list" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pgDataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wish_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "wish_list_userId_pgDataId_key" ON "wish_list"("userId", "pgDataId");

-- AddForeignKey
ALTER TABLE "wish_list" ADD CONSTRAINT "wish_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wish_list" ADD CONSTRAINT "wish_list_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
