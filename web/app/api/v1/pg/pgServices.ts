import prisma from "@/lib/Prisma"

export class PgServices {
    private prismaClient;

    constructor() {
        this.prismaClient = prisma;
    }

    async createPg(pgData: any) {
        try {

            // Create the PG data with related models
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
                    hostName: pgData.hostName,
                    hostContact: pgData.hostContact,
                    rating: pgData.rating ?? 0,
                    reviews: pgData.reviews ?? [],

                    // Create related furniture records
                    furnitures: {
                        create: pgData.furnitures?.map((furnitureType: string) => ({
                            type: furnitureType
                        })) ?? []
                    },

                    // Create related amenity records
                    amenities: {
                        create: pgData.amenities?.map((amenityType: string) => ({
                            type: amenityType
                        })) ?? []
                    },

                    // Create related sharing type records
                    sharingTypes: {
                        create: pgData.sharingTypes?.map((sharingType: any) => ({
                            type: sharingType.type || sharingType,
                            description: sharingType.description,
                            price: sharingType.price || 0,
                            availability: sharingType.availability || 0,
                            pricePerMonth: sharingType.pricePerMonth || sharingType.price || 0,
                            pricePerDay: sharingType.pricePerDay,
                            deposit: sharingType.deposit || 0,
                            refundableDeposit: sharingType.refundableDeposit ?? true,
                            refundableAmount: sharingType.refundableAmount || 0,
                            maintainanceCharges: sharingType.maintainanceCharges,
                            electricityCharges: sharingType.electricityCharges,
                            waterCharges: sharingType.waterCharges,
                            maintenanceIncluded: sharingType.maintenanceIncluded ?? false
                        })) ?? []
                    }
                },
                include: {
                    Host: true,
                    furnitures: true,
                    amenities: true,
                    sharingTypes: true
                }
            });

            return newPg;
        } catch (error) {
            console.error("Detailed error creating Pg:", error);
            throw error;
        }
    }

    async getFeaturedPgs() {
        try {
            const featuredPgs = await this.prismaClient.pgData.findMany({
                take: 10,
                orderBy: {
                    rating: 'desc'
                },
                include: {
                    Host: true,
                    furnitures: true,
                    amenities: true,
                    sharingTypes: true
                }
            });
            return featuredPgs;
        } catch (error) {
            console.error("Error fetching featured Pgs:", error);
            throw new Error("Failed to fetch featured Pgs");
        }
    }
}