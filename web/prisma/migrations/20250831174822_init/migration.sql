-- CreateEnum
CREATE TYPE "public"."PgRequestStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('super_admin', 'admin', 'user', 'host');

-- CreateEnum
CREATE TYPE "public"."MoveInStatus" AS ENUM ('IMMEDIATE', 'WITHIN_ONE_WEEK', 'WITHIN_TWO_WEEKS', 'WITHIN_ONE_MONTH');

-- CreateEnum
CREATE TYPE "public"."SharingTypeEnum" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE', 'QUAD');

-- CreateEnum
CREATE TYPE "public"."FurnitureType" AS ENUM ('BED', 'SOFA', 'TABLE', 'CHAIR', 'WARDROBE', 'FRIDGE', 'WASHING_MACHINE', 'AIR_CONDITIONER', 'MICROWAVE', 'TELEVISION', 'WATER_PURIFIER', 'GAS_STOVE', 'KITCHEN_APPLIANCES', 'FURNITURE_OTHER', 'NONE');

-- CreateEnum
CREATE TYPE "public"."AmenityType" AS ENUM ('PARKING', 'WIFI', 'GYM', 'SWIMMING_POOL', 'SECURITY', 'POWER_BACKUP', 'LIFT', 'PET_FRIENDLY', 'GARDEN', 'PLAY_AREA', 'CLUBHOUSE', 'HOUSEKEEPING', 'MAINTENANCE', 'CCTV', 'COMMON_AREA', 'LAUNDRY', 'GARBAGE_DISPOSAL', 'COMMUNITY_EVENTS', 'AMENITIES_OTHER');

-- CreateEnum
CREATE TYPE "public"."FurnishingType" AS ENUM ('FURNISHED', 'SEMI_FURNISHED', 'UNFURNISHED');

-- CreateEnum
CREATE TYPE "public"."PropertyType" AS ENUM ('MEN', 'WOMEN', 'COLIVE');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
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
CREATE TABLE "public"."account" (
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
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."host_profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "alternateContact" TEXT,
    "whatsApp" TEXT,
    "Address" TEXT,
    "languagesSpokenByHost" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "host_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PgData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "description" TEXT,
    "propertyType" "public"."PropertyType" NOT NULL,
    "foodIncluded" BOOLEAN NOT NULL DEFAULT false,
    "furnishing" "public"."FurnishingType" NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Unknown',
    "pgRules" TEXT,
    "moveInStatus" "public"."MoveInStatus" NOT NULL,
    "avgRating" DOUBLE PRECISION,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "nearbyFacilities" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "virtualTourUrl" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "PgData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."review" (
    "id" TEXT NOT NULL,
    "pgDataId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."wish_list" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pgDataId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wish_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sharing_type" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" "public"."SharingTypeEnum" NOT NULL,
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
CREATE TABLE "public"."furniture" (
    "id" TEXT NOT NULL,
    "type" "public"."FurnitureType" NOT NULL,
    "pgDataId" TEXT NOT NULL,

    CONSTRAINT "furniture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."amenity" (
    "id" TEXT NOT NULL,
    "type" "public"."AmenityType" NOT NULL,
    "pgDataId" TEXT NOT NULL,

    CONSTRAINT "amenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pg_request" (
    "id" TEXT NOT NULL,
    "hostId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pgId" TEXT NOT NULL,
    "status" "public"."PgRequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pg_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "host_profile_userId_key" ON "public"."host_profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "wish_list_userId_pgDataId_key" ON "public"."wish_list"("userId", "pgDataId");

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."host_profile" ADD CONSTRAINT "host_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PgData" ADD CONSTRAINT "PgData_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "public"."host_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review" ADD CONSTRAINT "review_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "public"."PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wish_list" ADD CONSTRAINT "wish_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."wish_list" ADD CONSTRAINT "wish_list_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "public"."PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sharing_type" ADD CONSTRAINT "sharing_type_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "public"."PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."furniture" ADD CONSTRAINT "furniture_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "public"."PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."amenity" ADD CONSTRAINT "amenity_pgDataId_fkey" FOREIGN KEY ("pgDataId") REFERENCES "public"."PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pg_request" ADD CONSTRAINT "pg_request_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "public"."host_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pg_request" ADD CONSTRAINT "pg_request_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pg_request" ADD CONSTRAINT "pg_request_pgId_fkey" FOREIGN KEY ("pgId") REFERENCES "public"."PgData"("id") ON DELETE CASCADE ON UPDATE CASCADE;
