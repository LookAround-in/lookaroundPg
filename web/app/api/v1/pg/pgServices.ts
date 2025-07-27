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
          // nearbyFacilities: pgData.nearbyFacilities ?? [],

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
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
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
          // nearbyFacilities: pgData.nearbyFacilities ?? [],
          
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
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
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
      // Featured PGs should be high-rated properties with good reviews
      // Logic: avgRating >= 4.0, has at least some reviews, and available rooms
      const featuredPgs = await this.prismaClient.pgData.findMany({
        where: {
          avgRating: {
            gte: 4.0, // Minimum 4.0 average rating
          },
          reviewCount: {
            gt: 0, // Must have at least one review
          },
          sharingTypes: {
            some: {
              availability: {
                gt: 0, // Has available rooms
              },
            },
          },
          // Properties with images are more likely to be featured
          images: {
            isEmpty: false,
          },
        },
        take: 6, // Show featured properties
        orderBy: [
          {
            avgRating: "desc", // Primary: Highest rated first
          },
          {
            reviewCount: "desc", // Secondary: Most reviewed
          },
          {
            createdAt: "desc", // Tertiary: Most recent
          },
        ],
        include: {
          Host: {
            select: {
              id: true,
              contactNumber: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  image: true
                },
              },
            },
          },
          furnitures: true,
          amenities: true,
          sharingTypes: {
            where: {
              availability: {
                gt: 0, // Only show available sharing types
              },
            },
            orderBy: {
              pricePerMonth: "asc", // Show cheapest option first
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 5, // Include recent reviews
          },
          _count: {
            select: {
              PgRequest: true, // Count of requests for popularity
              wishList: true, // Count of wishlists for popularity
            },
          },
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
      // Trending PGs should be recently active with good engagement
      // Logic: Recent properties, high wishlist count, recent requests
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      const trendingPgs = await this.prismaClient.pgData.findMany({
        where: {
          OR: [
            {
              // Recently created properties
              createdAt: {
                gte: oneWeekAgo,
              },
            },
            {
              // Properties with recent activity (requests)
              PgRequest: {
                some: {
                  createdAt: {
                    gte: oneWeekAgo,
                  },
                },
              },
            },
            {
              // Properties recently added to wishlists
              wishList: {
                some: {
                  createdAt: {
                    gte: oneWeekAgo,
                  },
                },
              },
            },
          ],
          // Must have available rooms
          sharingTypes: {
            some: {
              availability: {
                gt: 0,
              },
            },
          },
        },
        take: 6,
        orderBy: [
          {
            wishList: {
              _count: "desc", // Most wishlisted
            },
          },
          {
            PgRequest: {
              _count: "desc", // Most requested
            },
          },
          {
            createdAt: "desc", // Most recent
          },
          {
            avgRating: "desc", // Good rating as tiebreaker (can be null)
          },
        ],
        include: {
          Host: {
            select: {
              id: true,
              contactNumber: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  image: true
                },
              },
            },
          },
          furnitures: true,
          amenities: true,
          sharingTypes: {
            where: {
              availability: {
                gt: 0,
              },
            },
            orderBy: {
              pricePerMonth: "asc",
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 3, // Include some recent reviews
          },
          _count: {
            select: {
              PgRequest: true,
              wishList: true,
            },
          },
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
        where: {
          // Must have available rooms
          sharingTypes: {
            some: {
              availability: {
                gt: 0,
              },
            },
          },
          // Must have basic information
          description: {
            not: null,
          },
          address: {
            not: "",
          },
        },
        take: 12, // Show more options for exploration
        orderBy: [
          {
            avgRating: "desc", // Quality first (nulls last in PostgreSQL)
          },
          {
            sharingTypes: {
              _count: "desc", // Variety of options
            },
          },
          {
            amenities: {
              _count: "desc", // More amenities
            },
          },
          {
            createdAt: "desc", // Freshness
          },
        ],
        include: {
          Host: {
            select: {
              id: true,
              contactNumber: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  image: true
                },
              },
            },
          },
          furnitures: true,
          amenities: true,
          sharingTypes: {
            where: {
              availability: {
                gt: 0,
              },
            },
            orderBy: {
              pricePerMonth: "asc",
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
            take: 3, // Include some recent reviews
          },
          _count: {
            select: {
              PgRequest: true,
              wishList: true,
              sharingTypes: true,
              amenities: true,
            },
          },
        },
      });

      // Add some randomization to explore results for variety
      const shuffledResults = explorePgs.sort(() => Math.random() - 0.5);
      return shuffledResults;
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
          Host: {
            select: {
              id: true,
              contactNumber: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          furnitures: true,
          amenities: true,
          sharingTypes: {
            where: {
              availability: {
                gt: 0,
              },
            },
            orderBy: {
              pricePerMonth: "asc",
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          _count: {
            select: {
              PgRequest: true,
              wishList: true,
              sharingTypes: true,
              amenities: true,
            },
          },
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
          Host: {
            select: {
              id: true,
              contactNumber: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          furnitures: true,
          amenities: true,
          sharingTypes: {
            where: {
              availability: {
                gt: 0,
              },
            },
            orderBy: {
              pricePerMonth: "asc",
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: {
              createdAt: "desc",
            },
          },
          _count: {
            select: {
              PgRequest: true,
              wishList: true,
            },
          },
        },
      });

      return pgs;
    } catch (error) {
      console.error("Error fetching PGs by Host ID:", error);
      throw new Error("Failed to fetch PGs by Host ID");
    }
  }
}