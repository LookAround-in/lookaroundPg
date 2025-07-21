-- CreateEnum
CREATE TYPE "PgRequestStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'USER', 'HOST');

-- CreateEnum
CREATE TYPE "MoveInStatus" AS ENUM ('IMMEDIATE', 'WITHIN_ONE_WEEK', 'WITHIN_TWO_WEEKS', 'WITHIN_ONE_MONTH');

-- CreateEnum
CREATE TYPE "SharingTypeEnum" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE', 'QUAD');

-- CreateEnum
CREATE TYPE "FurnitureType" AS ENUM ('BED', 'SOFA', 'TABLE', 'CHAIR', 'WARDROBE', 'FRIDGE', 'WASHING_MACHINE', 'AIR_CONDITIONER', 'MICROWAVE', 'TELEVISION', 'WATER_PURIFIER', 'GAS_STOVE', 'KITCHEN_APPLIANCES', 'FURNITURE_OTHER', 'NONE');

-- CreateEnum
CREATE TYPE "AmenityType" AS ENUM ('PARKING', 'WIFI', 'GYM', 'SWIMMING_POOL', 'SECURITY', 'POWER_BACKUP', 'LIFT', 'PET_FRIENDLY', 'GARDEN', 'PLAY_AREA', 'CLUBHOUSE', 'HOUSEKEEPING', 'MAINTENANCE', 'CCTV', 'COMMON_AREA', 'LAUNDRY', 'GARBAGE_DISPOSAL', 'COMMUNITY_EVENTS', 'AMENITIES_OTHER');

-- CreateEnum
CREATE TYPE "FurnishingType" AS ENUM ('FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('MEN', 'WOMEN', 'COLIVE');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "PgData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "description" TEXT,
    "propertyType" "PropertyType" NOT NULL,
    "foodIncluded" BOOLEAN NOT NULL DEFAULT false,
    "furnishing" "FurnishingType" NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "pgRules" TEXT,
    "moveInStatus" "MoveInStatus" NOT NULL,
    "virtualTourUrl" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviews" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "PgData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sharing_type" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "SharingTypeEnum" NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "availability" INTEGER NOT NULL DEFAULT 0,
    "pgDataId" TEXT NOT NULL,
    "pricePerMonth" DOUBLE PRECISION NOT NULL,
    "pricePerDay" DOUBLE PRECISION,
    "deposit" DOUBLE PRECISION NOT NULL,
    "refundableDeposit" BOOLEAN NOT NULL DEFAULT true,
    "refundableAmount" DOUBLE PRECISION NOT NULL,
    "maintainanceCharges" DOUBLE PRECISION,
    "electricityCharges" DOUBLE PRECISION,
    "waterCharges" DOUBLE PRECISION,
    "maintenanceIncluded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "sharing_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "furniture" (
    "id" TEXT NOT NULL,
    "type" "FurnitureType" NOT NULL,
    "pgDataId" TEXT NOT NULL,

    CONSTRAINT "furniture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenity" (
    "id" TEXT NOT NULL,
    "type" "AmenityType" NOT NULL,
    "pgDataId" TEXT NOT NULL,

    CONSTRAINT "amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pg_request" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pgId" TEXT NOT NULL,
    "status" "PgRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pg_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "host_profile_userId_key" ON "host_profile"("userId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "host_profile" ADD CONSTRAINT "host_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PgData" ADD CONSTRAINT "PgData_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "host_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sharing_type" ADD CONSTRAINT "sharing_type_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "furniture" ADD CONSTRAINT "furniture_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amenity" ADD CONSTRAINT "amenity_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pg_request" ADD CONSTRAINT "pg_request_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "host_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pg_request" ADD CONSTRAINT "pg_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pg_request" ADD CONSTRAINT "pg_request_pgId_fkey" FOREIGN KEY ("pgId") REFERENCES "PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
