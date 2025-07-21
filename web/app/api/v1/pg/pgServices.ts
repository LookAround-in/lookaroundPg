import { PgCreateInput } from "@/interfaces/pg";
import {
  AmenityType,
  FurnitureType,
  SharingTypeDetails,
} from "@/interfaces/pg";
import prisma from "@/lib/Prisma";

export class PgServices {
  private prismaClient;

  constructor() {
    this.prismaClient = prisma;
  }

  async createPg(pgData: PgCreateInput) {
    try {
      const newPg = await this.prismaClient.pgData.create({
        data: {
          title: pgData.title,
          hostId: pgData.hostId,
          description: pgData.description,
          propertyType: pgData.propertyType,
          foodIncluded: pgData.foodIncluded ?? false,
          furnishing: pgData.furnishing,
          address: pgData.address,
          latitude: pgData.latitude,
          longitude: pgData.longitude,
          pgRules: pgData.pgRules,
          moveInStatus: pgData.moveInStatus,
          virtualTourUrl: pgData.virtualTourUrl,
          images: pgData.images ?? [],
          rating: pgData.rating ?? 0,
          reviews: pgData.reviews ?? [],

          furnitures: {
            create:
              pgData.furnitures?.map((furnitureType: FurnitureType) => ({
                type: furnitureType,
              })) ?? [],
          },

          amenities: {
            create:
              pgData.amenities?.map((amenityType: AmenityType) => ({
                type: amenityType,
              })) ?? [],
          },

          sharingTypes: {
            create:
              pgData.sharingTypes?.map((sharingType: SharingTypeDetails) => ({
                type: sharingType.type || sharingType,
                description: sharingType.description,
                price: sharingType.price || 0,
                availability: sharingType.availability || 0,
                pricePerMonth:
                  sharingType.pricePerMonth || sharingType.price || 0,
                pricePerDay: sharingType.pricePerDay,
                deposit: sharingType.deposit || 0,
                refundableDeposit: sharingType.refundableDeposit ?? true,
                refundableAmount: sharingType.refundableAmount || 0,
                maintainanceCharges: sharingType.maintainanceCharges,
                electricityCharges: sharingType.electricityCharges,
                waterCharges: sharingType.waterCharges,
                maintenanceIncluded: sharingType.maintenanceIncluded ?? false,
              })) ?? [],
          },
        },
        include: {
          Host: true,
          furnitures: true,
          amenities: true,
          sharingTypes: true,
        },
      });

      return newPg;
    } catch (error) {
      console.error("Detailed error creating Pg:", error);
      throw error;
    }
  }

  async updatePg(pgId: string, pgData: PgCreateInput) {
    try {
      const updatedPg = await this.prismaClient.pgData.update({
        where: { id: pgId },
        data: {
          title: pgData.title,
          description: pgData.description,
          propertyType: pgData.propertyType,
          foodIncluded: pgData.foodIncluded ?? false,
          furnishing: pgData.furnishing,
          address: pgData.address,
          latitude: pgData.latitude,
          longitude: pgData.longitude,
          pgRules: pgData.pgRules,
          moveInStatus: pgData.moveInStatus,
          virtualTourUrl: pgData.virtualTourUrl,
          images: pgData.images ?? [],
          rating: pgData.rating ?? 0,
          reviews: pgData.reviews ?? [],
          furnitures: {
            deleteMany: {},
            create:
              pgData.furnitures?.map((furnitureType: FurnitureType) => ({
                type: furnitureType,
              })) ?? [],
          },
          amenities: {
            deleteMany: {},
            create:
              pgData.amenities?.map((amenityType: AmenityType) => ({
                type: amenityType,
              })) ?? [],
          },
          sharingTypes: {
            deleteMany: {},
            create:
              pgData.sharingTypes?.map((sharingType: SharingTypeDetails) => ({
                type: sharingType.type || sharingType,
                description: sharingType.description,
                price: sharingType.price || 0,
                availability: sharingType.availability || 0,
                pricePerMonth:
                  sharingType.pricePerMonth || sharingType.price || 0,
                pricePerDay: sharingType.pricePerDay,
                deposit: sharingType.deposit || 0,
                refundableDeposit: sharingType.refundableDeposit ?? true,
                refundableAmount: sharingType.refundableAmount || 0,
                maintainanceCharges: sharingType.maintainanceCharges,
                electricityCharges: sharingType.electricityCharges,
                waterCharges: sharingType.waterCharges,
                maintenanceIncluded: sharingType.maintenanceIncluded ?? false,
              })) ?? [],
          },
        },
        include: {
          Host: true,
          furnitures: true,
          amenities: true,
          sharingTypes: true,
        },
      });
      return updatedPg;
    } catch (error) {
      console.error("Detailed error updating Pg:", error);
      throw error;
    }
  }

  async deletePg(pgId: string) {
    try {
      const deletedPg = await this.prismaClient.pgData.delete({
        where: { id: pgId },
      });
      return deletedPg;
    } catch (error) {
      console.error("Detailed error deleting Pg:", error);
      throw error;
    }
  }

  async getFeaturedPgs() {
    try {
      const featuredPgs = await this.prismaClient.pgData.findMany({
        take: 3,
        orderBy: {
          rating: "desc",
        },
        include: {
          Host: true,
          furnitures: true,
          amenities: true,
          sharingTypes: true,
        },
      });
      return featuredPgs;
    } catch (error) {
      console.error("Error fetching featured Pgs:", error);
      throw new Error("Failed to fetch featured Pgs");
    }
  }

  async getTrendingPgs() {
    try {
      const trendingPgs = await this.prismaClient.pgData.findMany({
        take: 3,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Host: true,
          furnitures: true,
          amenities: true,
          sharingTypes: true,
        },
      });
      return trendingPgs;
    } catch (error) {
      console.error("Error fetching trending Pgs:", error);
      throw new Error("Failed to fetch trending Pgs");
    }
  }

  async getExplorePgs() {
    try {
      const explorePgs = await this.prismaClient.pgData.findMany({
        take: 10,
        orderBy: {
          rating: "desc",
        },
        include: {
          Host: true,
          furnitures: true,
          amenities: true,
          sharingTypes: true,
        },
      });
      return explorePgs;
    } catch (error) {
      console.error("Error fetching explore Pgs:", error);
      throw new Error("Failed to fetch explore Pgs");
    }
  }

  async getPgById(pgId: string) {
    try {
      const pg = await this.prismaClient.pgData.findUnique({
        where: { id: pgId },
        include: {
          Host: true,
          furnitures: true,
          amenities: true,
          sharingTypes: true,
        },
      });

      if (!pg) {
        throw new Error("PG not found");
      }

      return pg;
    } catch (error) {
      console.error("Error fetching PG by ID:", error);
      throw new Error("Failed to fetch PG by ID");
    }
  }

  async getPgsByHostId(hostId: string) {
    try {
      const pgs = await this.prismaClient.pgData.findMany({
        where: { hostId },
        include: {
          Host: true,
          furnitures: true,
          amenities: true,
          sharingTypes: true,
        },
      });

      return pgs;
    } catch (error) {
      console.error("Error fetching PGs by Host ID:", error);
      throw new Error("Failed to fetch PGs by Host ID");
    }
  }
}
