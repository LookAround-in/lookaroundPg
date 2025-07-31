import { PrismaClient } from "../generated/prisma/index.js";
import {
  UserRole,
  PropertyType,
  FurnishingType,
  MoveInStatus,
  SharingTypeEnum,
  FurnitureType,
  AmenityType,
  PgRequestStatus,
} from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Clear existing data (in reverse order due to foreign key constraints)
  console.log("🧹 Cleaning existing data...");
  await prisma.review.deleteMany();
  await prisma.wishList.deleteMany();
  await prisma.pgRequest.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.furniture.deleteMany();
  await prisma.sharingType.deleteMany();
  await prisma.pgData.deleteMany();
  await prisma.hostProfile.deleteMany();
  await prisma.verification.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  console.log(
    "⚠️  Note: Users should be created through Better Auth authentication flow"
  );
  console.log(
    "⚠️  This seed will only create sample data that depends on existing users"
  );

  // Since you're using Better Auth, we'll create some sample users for demonstration
  // In production, these would be created through your auth flow
  console.log("👥 Creating sample users for demonstration...");
  console.log(
    "🔐 NOTE: To set passwords for these users, use the signup page or manually update the database"
  );
  console.log("📝 Admin credentials: admin@lookaroundpg.com / admin123");
  console.log("📝 Host credentials: rajesh.kumar@gmail.com / host123");
  console.log("📝 User credentials: amit.singh@gmail.com / user123");

  const users = await Promise.all([
    // Admin User
    prisma.user.create({
      data: {
        role: "admin",
        name: "Admin User",
        email: "admin@lookaroundpg.com",
        phone: "9876543201",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // Host Users
    prisma.user.create({
      data: {
        role: "host",
        name: "Rajesh Kumar",
        email: "rajesh.kumar@gmail.com",
        phone: "9876543210",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.user.create({
      data: {
        role: "host",
        name: "Priya Sharma",
        email: "priya.sharma@gmail.com",
        phone: "9876543220",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.user.create({
      data: {
        role: "host",
        name: "Arjun Patel",
        email: "arjun.patel@gmail.com",
        phone: "9876543230",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // Sample Regular Users
    prisma.user.create({
      data: {
        role: "user",
        name: "Amit Singh",
        email: "amit.singh@gmail.com",
        phone: "8765432109",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.user.create({
      data: {
        role: "user",
        name: "Sneha Gupta",
        email: "sneha.gupta@gmail.com",
        phone: "8765432110",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.user.create({
      data: {
        role: "user",
        name: "Vikram Reddy",
        email: "vikram.reddy@gmail.com",
        phone: "8765432111",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.user.create({
      data: {
        role: "user",
        name: "Kavya Nair",
        email: "kavya.nair@gmail.com",
        phone: "8765432112",
        emailVerified: true,
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} sample users with phone numbers`);

  // Get the host users for creating host profiles
  const hostUsers = users.filter((user) => user.role === UserRole.host);
  const regularUsers = users.filter((user) => user.role === UserRole.user);

  // Create Host Profiles
  console.log("🏠 Creating host profiles...");
  const hostProfiles = await Promise.all([
    prisma.hostProfile.create({
      data: {
        userId: hostUsers[0].id,
        contactNumber: "9876543210", // Matches user phone number
        alternateContact: "9876543211",
        whatsApp: "9876543210",
        Address: "123, MG Road, Bangalore, Karnataka 560001",
        languagesSpokenByHost: ["English", "Hindi", "Kannada"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.hostProfile.create({
      data: {
        userId: hostUsers[1].id,
        contactNumber: "9876543220", // Matches user phone number
        alternateContact: "9876543221",
        whatsApp: "9876543220",
        Address: "456, Koramangala, Bangalore, Karnataka 560034",
        languagesSpokenByHost: ["English", "Hindi", "Kannada"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.hostProfile.create({
      data: {
        userId: hostUsers[2].id,
        contactNumber: "9876543230", // Matches user phone number
        alternateContact: "9876543231",
        whatsApp: "9876543230",
        Address: "789, HSR Layout, Bangalore, Karnataka 560102",
        languagesSpokenByHost: ["English", "Hindi", "Kannada"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${hostProfiles.length} host profiles`);

  // Create PG Data with nearbyFacilities as JSON array
  console.log("🏘️ Creating PG listings...");
  const pgListings = await Promise.all([
    // Men's PG by first host
    prisma.pgData.create({
      data: {
        title: "Premium Men's PG Near Electronic City",
        hostId: hostProfiles[0].id,
        description:
          "Fully furnished PG with all modern amenities. Located in a safe and secure area with easy access to IT companies in Electronic City.",
        propertyType: PropertyType.MEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "Electronic City Phase 1, Bangalore, Karnataka 560100",
        latitude: 12.8456,
        longitude: 77.6632,
        pgRules:
          "No smoking, No drinking, No visitors after 10 PM, Maintain cleanliness",
        moveInStatus: MoveInStatus.IMMEDIATE,
        virtualTourUrl:
          "https://www.lookaround.in/library/tour?url=https%3A%2F%2Frealsee.ai%2FZyKKW8Kp",
        images: [
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        ],
        nearbyFacilities: [
          {
            icon: "🚇",
            title: "Metro Station",
            distance: "0.5 km",
          },
          {
            icon: "🏥",
            title: "Apollo Hospital",
            distance: "1.2 km",
          },
          {
            icon: "🛒",
            title: "Big Bazaar",
            distance: "800 m",
          },
          {
            icon: "🏧",
            title: "HDFC ATM",
            distance: "200 m",
          },
          {
            icon: "🍕",
            title: "Food Court",
            distance: "300 m",
          },
        ],
        // avgRating and reviewCount will be set automatically when reviews are created
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // Women's PG by second host
    prisma.pgData.create({
      data: {
        title: "Safe Women's PG in Koramangala",
        hostId: hostProfiles[1].id,
        description:
          "Secure and comfortable PG exclusively for women. 24/7 security, CCTV surveillance, and a homely environment.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "5th Block, Koramangala, Bangalore, Karnataka 560095",
        latitude: 12.9352,
        longitude: 77.6245,
        pgRules:
          "No male visitors, In-time by 9 PM, No smoking, Maintain cleanliness",
        moveInStatus: MoveInStatus.WITHIN_ONE_WEEK,
        virtualTourUrl:
          "https://www.lookaround.in/library/tour?url=https%3A%2F%2Frealsee.ai%2FZyKKW8Kp",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
        ],
        nearbyFacilities: [
          {
            icon: "🚌",
            title: "Bus Stop",
            distance: "100 m",
          },
          {
            icon: "🛍️",
            title: "Forum Mall",
            distance: "1.5 km",
          },
          {
            icon: "☕",
            title: "Cafe Coffee Day",
            distance: "250 m",
          },
          {
            icon: "💊",
            title: "Medical Store",
            distance: "150 m",
          },
          {
            icon: "🏃‍♀️",
            title: "Ladies Gym",
            distance: "400 m",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // Co-living Space by third host
    prisma.pgData.create({
      data: {
        title: "Modern Co-living Space in HSR Layout",
        hostId: hostProfiles[2].id,
        description:
          "Contemporary co-living space with shared amenities, perfect for young professionals and students.",
        propertyType: PropertyType.COLIVE,
        foodIncluded: false,
        furnishing: FurnishingType.FURNISHED,
        address: "Sector 2, HSR Layout, Bangalore, Karnataka 560102",
        latitude: 12.9082,
        longitude: 77.6476,
        pgRules:
          "Respect common areas, Clean after yourself, No loud music after 10 PM",
        moveInStatus: MoveInStatus.IMMEDIATE,
        virtualTourUrl:
          "https://www.lookaround.in/library/tour?url=https%3A%2F%2Frealsee.ai%2FZyKKW8Kp",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        ],
        nearbyFacilities: [
          {
            icon: "🚊",
            title: "Metro Station",
            distance: "1.0 km",
          },
          {
            icon: "🏢",
            title: "Tech Park",
            distance: "500 m",
          },
          {
            icon: "🍔",
            title: "McDonald's",
            distance: "300 m",
          },
          {
            icon: "🏪",
            title: "24/7 Store",
            distance: "100 m",
          },
          {
            icon: "🎭",
            title: "PVR Cinema",
            distance: "2.0 km",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // Additional Men's PG
    prisma.pgData.create({
      data: {
        title: "Budget Men's PG Near Whitefield",
        hostId: hostProfiles[0].id,
        description:
          "Affordable accommodation for students and working professionals near Whitefield IT hub.",
        propertyType: PropertyType.MEN,
        foodIncluded: true,
        furnishing: FurnishingType.SEMI_FURNISHED,
        address: "ITPL Road, Whitefield, Bangalore, Karnataka 560066",
        latitude: 12.9698,
        longitude: 77.75,
        pgRules:
          "No smoking inside rooms, No visitors after 9 PM, Keep common areas clean",
        moveInStatus: MoveInStatus.WITHIN_TWO_WEEKS,
        images: [
          "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800",
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
        ],
        nearbyFacilities: [
          {
            icon: "🏢",
            title: "ITPL",
            distance: "800 m",
          },
          {
            icon: "🏧",
            title: "SBI ATM",
            distance: "150 m",
          },
          {
            icon: "🚌",
            title: "BMTC Bus Stop",
            distance: "200 m",
          },
          {
            icon: "🍛",
            title: "Mess",
            distance: "50 m",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // Additional Women's PG
    prisma.pgData.create({
      data: {
        title: "Luxury Women's PG in Indiranagar",
        hostId: hostProfiles[1].id,
        description:
          "Premium accommodation for women with luxury amenities and personalized services.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "100 Feet Road, Indiranagar, Bangalore, Karnataka 560038",
        latitude: 12.9716,
        longitude: 77.6412,
        pgRules:
          "No male visitors, In-time by 10 PM, Maintain silence after 10 PM",
        moveInStatus: MoveInStatus.WITHIN_ONE_MONTH,
        virtualTourUrl:
          "https://www.lookaround.in/library/tour?url=https%3A%2F%2Frealsee.ai%2FZyKKW8Kp",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
        ],
        nearbyFacilities: [
          {
            icon: "🚇",
            title: "Indiranagar Metro",
            distance: "600 m",
          },
          {
            icon: "🛍️",
            title: "Commercial Street",
            distance: "1.2 km",
          },
          {
            icon: "🏥",
            title: "Manipal Hospital",
            distance: "900 m",
          },
          {
            icon: "☕",
            title: "Starbucks",
            distance: "300 m",
          },
          {
            icon: "💅",
            title: "Beauty Salon",
            distance: "250 m",
          },
          {
            icon: "🏋️‍♀️",
            title: "Fitness First",
            distance: "400 m",
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${pgListings.length} PG listings`);

  // ... (rest of the seed file remains the same)
  // Create Sharing Types
  console.log("🛏️ Creating sharing types...");
  const sharingTypes = await Promise.all([
    // PG-001 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Single occupancy with attached bathroom",
        price: 15000,
        availability: 2,
        pgDataId: pgListings[0].id,
        pricePerMonth: 15000,
        pricePerDay: 500,
        deposit: 30000,
        refundableDeposit: true,
        refundableAmount: 25000,
        maintainanceCharges: 1500,
        electricityCharges: 1000,
        waterCharges: 500,
        maintenanceIncluded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.DOUBLE,
        description: "Double sharing with common bathroom",
        price: 10000,
        availability: 4,
        pgDataId: pgListings[0].id,
        pricePerMonth: 10000,
        pricePerDay: 350,
        deposit: 20000,
        refundableDeposit: true,
        refundableAmount: 18000,
        maintainanceCharges: 1000,
        electricityCharges: 800,
        waterCharges: 400,
        maintenanceIncluded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // PG-002 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Single room with balcony access",
        price: 18000,
        availability: 1,
        pgDataId: pgListings[1].id,
        pricePerMonth: 18000,
        pricePerDay: 600,
        deposit: 36000,
        refundableDeposit: true,
        refundableAmount: 30000,
        maintainanceCharges: 2000,
        electricityCharges: 1200,
        waterCharges: 600,
        maintenanceIncluded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.DOUBLE,
        description: "Double sharing with study area",
        price: 12000,
        availability: 3,
        pgDataId: pgListings[1].id,
        pricePerMonth: 12000,
        pricePerDay: 400,
        deposit: 24000,
        refundableDeposit: true,
        refundableAmount: 20000,
        maintainanceCharges: 1500,
        electricityCharges: 1000,
        waterCharges: 500,
        maintenanceIncluded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // PG-003 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Studio apartment style",
        price: 22000,
        availability: 2,
        pgDataId: pgListings[2].id,
        pricePerMonth: 22000,
        pricePerDay: 750,
        deposit: 44000,
        refundableDeposit: true,
        refundableAmount: 40000,
        maintainanceCharges: 2500,
        electricityCharges: 1500,
        waterCharges: 800,
        maintenanceIncluded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.DOUBLE,
        description: "Shared apartment with kitchen access",
        price: 16000,
        availability: 4,
        pgDataId: pgListings[2].id,
        pricePerMonth: 16000,
        pricePerDay: 550,
        deposit: 32000,
        refundableDeposit: true,
        refundableAmount: 28000,
        maintainanceCharges: 2000,
        electricityCharges: 1200,
        waterCharges: 600,
        maintenanceIncluded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // PG-004 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.TRIPLE,
        description: "Triple sharing budget option",
        price: 8000,
        availability: 6,
        pgDataId: pgListings[3].id,
        pricePerMonth: 8000,
        pricePerDay: 280,
        deposit: 16000,
        refundableDeposit: true,
        refundableAmount: 14000,
        maintainanceCharges: 800,
        electricityCharges: 600,
        waterCharges: 300,
        maintenanceIncluded: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    // PG-005 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[4].id,
        pricePerMonth: 25000,
        pricePerDay: 850,
        deposit: 50000,
        refundableDeposit: true,
        refundableAmount: 45000,
        maintainanceCharges: 3000,
        electricityCharges: 2000,
        waterCharges: 1000,
        maintenanceIncluded: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${sharingTypes.length} sharing types`);

  // Create Furniture entries
  console.log("🪑 Creating furniture entries...");
  const furnitureEntries = [];

  const furnitureByPg = [
    [
      FurnitureType.BED,
      FurnitureType.WARDROBE,
      FurnitureType.TABLE,
      FurnitureType.CHAIR,
      FurnitureType.AIR_CONDITIONER,
    ],
    [
      FurnitureType.BED,
      FurnitureType.WARDROBE,
      FurnitureType.TABLE,
      FurnitureType.CHAIR,
      FurnitureType.AIR_CONDITIONER,
      FurnitureType.FRIDGE,
    ],
    [
      FurnitureType.BED,
      FurnitureType.WARDROBE,
      FurnitureType.SOFA,
      FurnitureType.TABLE,
      FurnitureType.CHAIR,
      FurnitureType.TELEVISION,
      FurnitureType.MICROWAVE,
    ],
    [
      FurnitureType.BED,
      FurnitureType.WARDROBE,
      FurnitureType.TABLE,
      FurnitureType.CHAIR,
    ],
    [
      FurnitureType.BED,
      FurnitureType.WARDROBE,
      FurnitureType.SOFA,
      FurnitureType.TABLE,
      FurnitureType.CHAIR,
      FurnitureType.AIR_CONDITIONER,
      FurnitureType.FRIDGE,
      FurnitureType.TELEVISION,
      FurnitureType.MICROWAVE,
    ],
  ];

  for (let i = 0; i < pgListings.length; i++) {
    for (const furnitureType of furnitureByPg[i]) {
      furnitureEntries.push(
        prisma.furniture.create({
          data: {
            type: furnitureType,
            pgDataId: pgListings[i].id,
          },
        })
      );
    }
  }

  await Promise.all(furnitureEntries);
  console.log(`✅ Created ${furnitureEntries.length} furniture entries`);

  // Create Amenity entries
  console.log("🏊 Creating amenity entries...");
  const amenityEntries = [];

  const amenitiesByPg = [
    [
      AmenityType.WIFI,
      AmenityType.PARKING,
      AmenityType.SECURITY,
      AmenityType.LAUNDRY,
      AmenityType.POWER_BACKUP,
    ],
    [
      AmenityType.WIFI,
      AmenityType.PARKING,
      AmenityType.SECURITY,
      AmenityType.LAUNDRY,
      AmenityType.POWER_BACKUP,
      AmenityType.CCTV,
      AmenityType.HOUSEKEEPING,
    ],
    [
      AmenityType.WIFI,
      AmenityType.PARKING,
      AmenityType.SECURITY,
      AmenityType.LAUNDRY,
      AmenityType.GYM,
      AmenityType.COMMON_AREA,
      AmenityType.LIFT,
    ],
    [
      AmenityType.WIFI,
      AmenityType.PARKING,
      AmenityType.SECURITY,
      AmenityType.LAUNDRY,
    ],
    [
      AmenityType.WIFI,
      AmenityType.PARKING,
      AmenityType.SECURITY,
      AmenityType.LAUNDRY,
      AmenityType.GYM,
      AmenityType.SWIMMING_POOL,
      AmenityType.HOUSEKEEPING,
      AmenityType.CCTV,
      AmenityType.LIFT,
      AmenityType.CLUBHOUSE,
    ],
  ];

  for (let i = 0; i < pgListings.length; i++) {
    for (const amenityType of amenitiesByPg[i]) {
      amenityEntries.push(
        prisma.amenity.create({
          data: {
            type: amenityType,
            pgDataId: pgListings[i].id,
          },
        })
      );
    }
  }

  await Promise.all(amenityEntries);
  console.log(`✅ Created ${amenityEntries.length} amenity entries`);

  // Create Reviews (new separate table)
  console.log("⭐ Creating reviews...");
  const reviews = await Promise.all([
    // Reviews for PG-001
    prisma.review.create({
      data: {
        pgDataId: pgListings[0].id,
        userId: regularUsers[0].id,
        rating: 5,
        comment:
          "Excellent facilities and very clean. The host is very cooperative and the location is perfect for IT professionals.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    }),

    prisma.review.create({
      data: {
        pgDataId: pgListings[0].id,
        userId: regularUsers[1].id,
        rating: 4,
        comment:
          "Great location for IT professionals. Good amenities but could improve the food quality.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    }),

    // Reviews for PG-002
    prisma.review.create({
      data: {
        pgDataId: pgListings[1].id,
        userId: regularUsers[2].id,
        rating: 5,
        comment:
          "Very safe and secure place for women. Excellent food quality and great community of working women.",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    }),

    prisma.review.create({
      data: {
        pgDataId: pgListings[1].id,
        userId: regularUsers[3].id,
        rating: 5,
        comment:
          "Perfect for working women. Safe environment and all amenities are top-notch.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    }),

    // Reviews for PG-003
    prisma.review.create({
      data: {
        pgDataId: pgListings[2].id,
        userId: regularUsers[0].id,
        rating: 4,
        comment:
          "Great co-living experience. Modern amenities and facilities with good community atmosphere.",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    }),

    // Reviews for PG-004
    prisma.review.create({
      data: {
        pgDataId: pgListings[3].id,
        userId: regularUsers[1].id,
        rating: 4,
        comment:
          "Good value for money. Close to office locations and decent facilities.",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
    }),

    // Reviews for PG-005
    prisma.review.create({
      data: {
        pgDataId: pgListings[4].id,
        userId: regularUsers[2].id,
        rating: 5,
        comment:
          "Exceptional service and facilities. Very clean and well-maintained, perfect for working professionals.",
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        updatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
    }),

    prisma.review.create({
      data: {
        pgDataId: pgListings[4].id,
        userId: regularUsers[3].id,
        rating: 5,
        comment:
          "Luxury at its best! Premium amenities and excellent location. Highly recommended for women professionals.",
        createdAt: new Date(), // Today
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${reviews.length} reviews`);

  // Update PG ratings based on reviews (calculate avgRating and reviewCount)
  console.log("📊 Updating PG ratings...");
  for (const pg of pgListings) {
    const pgReviews = reviews.filter((review) => review.pgDataId === pg.id);
    if (pgReviews.length > 0) {
      const avgRating =
        pgReviews.reduce((sum, review) => sum + review.rating, 0) /
        pgReviews.length;
      await prisma.pgData.update({
        where: { id: pg.id },
        data: {
          avgRating: Math.round(avgRating * 10) / 10, // Round to 1 decimal place
          reviewCount: pgReviews.length,
        },
      });
    }
  }

  console.log("✅ Updated PG ratings");

  // Create PG Requests
  console.log("📋 Creating PG requests...");
  const pgRequests = await Promise.all([
    prisma.pgRequest.create({
      data: {
        userId: regularUsers[0].id,
        pgId: pgListings[0].id,
        hostId: hostProfiles[0].id,
        status: PgRequestStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.pgRequest.create({
      data: {
        userId: regularUsers[1].id,
        pgId: pgListings[1].id,
        hostId: hostProfiles[1].id,
        status: PgRequestStatus.ACCEPTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.pgRequest.create({
      data: {
        userId: regularUsers[2].id,
        pgId: pgListings[2].id,
        hostId: hostProfiles[2].id,
        status: PgRequestStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.pgRequest.create({
      data: {
        userId: regularUsers[3].id,
        pgId: pgListings[3].id,
        hostId: hostProfiles[0].id,
        status: PgRequestStatus.REJECTED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${pgRequests.length} PG requests`);

  // Create Wishlist entries
  console.log("❤️ Creating wishlist entries...");
  const wishlistEntries = await Promise.all([
    prisma.wishList.create({
      data: {
        userId: regularUsers[0].id,
        pgDataId: pgListings[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.wishList.create({
      data: {
        userId: regularUsers[0].id,
        pgDataId: pgListings[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.wishList.create({
      data: {
        userId: regularUsers[1].id,
        pgDataId: pgListings[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.wishList.create({
      data: {
        userId: regularUsers[1].id,
        pgDataId: pgListings[4].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.wishList.create({
      data: {
        userId: regularUsers[2].id,
        pgDataId: pgListings[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),

    prisma.wishList.create({
      data: {
        userId: regularUsers[3].id,
        pgDataId: pgListings[3].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${wishlistEntries.length} wishlist entries`);

  console.log("🎉 Database seeding completed successfully!");

  // Print summary
  console.log("\n📊 Seeding Summary:");
  console.log(`👥 Users (with phone numbers): ${users.length}`);
  console.log(`🏠 Host Profiles: ${hostProfiles.length}`);
  console.log(`🏘️ PG Listings: ${pgListings.length}`);
  console.log(`🛏️ Sharing Types: ${sharingTypes.length}`);
  console.log(`🪑 Furniture Entries: ${furnitureEntries.length}`);
  console.log(`🏊 Amenity Entries: ${amenityEntries.length}`);
  console.log(`⭐ Reviews: ${reviews.length}`);
  console.log(`📋 PG Requests: ${pgRequests.length}`);
  console.log(`❤️ Wishlist Entries: ${wishlistEntries.length}`);

  console.log("\n📱 Phone Numbers Added:");
  console.log("📝 Admin: 9876543201");
  console.log("📝 Hosts: 9876543210, 9876543220, 9876543230");
  console.log("📝 Users: 8765432109, 8765432110, 8765432111, 8765432112");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });