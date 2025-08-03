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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${hostProfiles.length} host profiles`);

  // Create PG Data with nearbyFacilities as JSON array
  console.log("🏘️ Creating PG listings...");
  const pgListings = await Promise.all([
    // Existing 5 PGs (unchanged)
    // ... (your original 5 PGs here)

    // 20 more PGs with variations
    prisma.pgData.create({
      data: {
        title: "Men's PG Near Manyata Tech Park",
        hostId: hostProfiles[0].id,
        description: "Spacious rooms, close to Manyata Tech Park. Ideal for IT professionals.",
        propertyType: PropertyType.MEN,
        foodIncluded: false,
        furnishing: FurnishingType.SEMI_FURNISHED,
        address: "Nagawara, Bangalore, Karnataka 560045",
        latitude: 13.0456,
        longitude: 77.6200,
        pgRules: "No loud music, No parties, Maintain hygiene",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800",
        ],
        nearbyFacilities: [
          { icon: "🏢", title: "Manyata Tech Park", distance: "500 m" },
          { icon: "🚌", title: "Bus Stop", distance: "100 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Women's PG in Jayanagar",
        hostId: hostProfiles[1].id,
        description: "Safe and secure PG for women. Walking distance to metro station.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "Jayanagar 4th Block, Bangalore, Karnataka 560011",
        latitude: 12.9250,
        longitude: 77.5938,
        pgRules: "No male visitors, No smoking",
        moveInStatus: MoveInStatus.WITHIN_ONE_WEEK,
        images: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800",
        ],
        nearbyFacilities: [
          { icon: "🚇", title: "Metro Station", distance: "200 m" },
          { icon: "🏥", title: "Hospital", distance: "300 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Co-living PG in Marathahalli",
        hostId: hostProfiles[2].id,
        description: "Modern co-living space with gym and common area.",
        propertyType: PropertyType.COLIVE,
        foodIncluded: false,
        furnishing: FurnishingType.FURNISHED,
        address: "Marathahalli, Bangalore, Karnataka 560037",
        latitude: 12.9568,
        longitude: 77.7019,
        pgRules: "Respect common areas, No pets",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
        ],
        nearbyFacilities: [
          { icon: "🏢", title: "Tech Park", distance: "1 km" },
          { icon: "🛒", title: "Supermarket", distance: "300 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Budget Men's PG in Yeshwanthpur",
        hostId: hostProfiles[0].id,
        description: "Affordable PG for students and bachelors.",
        propertyType: PropertyType.MEN,
        foodIncluded: true,
        furnishing: FurnishingType.UNFURNISHED,
        address: "Yeshwanthpur, Bangalore, Karnataka 560022",
        latitude: 13.0285,
        longitude: 77.5552,
        pgRules: "No smoking, No drinking",
        moveInStatus: MoveInStatus.WITHIN_TWO_WEEKS,
        images: [
          "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800",
        ],
        nearbyFacilities: [
          { icon: "🚌", title: "Bus Stop", distance: "50 m" },
          { icon: "🏧", title: "ATM", distance: "100 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Luxury Women's PG in MG Road",
        hostId: hostProfiles[1].id,
        description: "Premium PG with AC rooms and daily housekeeping.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "MG Road, Bangalore, Karnataka 560001",
        latitude: 12.9756,
        longitude: 77.6050,
        pgRules: "No male visitors, Maintain silence after 9 PM",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
        ],
        nearbyFacilities: [
          { icon: "🚇", title: "Metro Station", distance: "100 m" },
          { icon: "🛍️", title: "Shopping Mall", distance: "300 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Men's PG Near Bannerghatta Road",
        hostId: hostProfiles[0].id,
        description: "PG with attached bathrooms and 24/7 security.",
        propertyType: PropertyType.MEN,
        foodIncluded: false,
        furnishing: FurnishingType.SEMI_FURNISHED,
        address: "Bannerghatta Road, Bangalore, Karnataka 560076",
        latitude: 12.8925,
        longitude: 77.5992,
        pgRules: "No parties, No pets",
        moveInStatus: MoveInStatus.WITHIN_ONE_MONTH,
        images: [
          "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5?w=800",
        ],
        nearbyFacilities: [
          { icon: "🏥", title: "Hospital", distance: "400 m" },
          { icon: "🍔", title: "Restaurant", distance: "150 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Women's PG Near Malleshwaram",
        hostId: hostProfiles[1].id,
        description: "PG with home-cooked food and laundry service.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "Malleshwaram, Bangalore, Karnataka 560003",
        latitude: 13.0050,
        longitude: 77.5695,
        pgRules: "No male visitors, No smoking",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800",
        ],
        nearbyFacilities: [
          { icon: "🛒", title: "Supermarket", distance: "200 m" },
          { icon: "🏥", title: "Clinic", distance: "100 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Co-living PG in Indiranagar",
        hostId: hostProfiles[2].id,
        description: "Shared living with high-speed WiFi and gaming zone.",
        propertyType: PropertyType.COLIVE,
        foodIncluded: false,
        furnishing: FurnishingType.FURNISHED,
        address: "Indiranagar, Bangalore, Karnataka 560038",
        latitude: 12.9716,
        longitude: 77.6412,
        pgRules: "No loud music, No smoking",
        moveInStatus: MoveInStatus.WITHIN_ONE_WEEK,
        images: [
          "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5?w=800",
        ],
        nearbyFacilities: [
          { icon: "🏋️‍♂️", title: "Gym", distance: "300 m" },
          { icon: "☕", title: "Cafe", distance: "150 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Budget Men's PG in Hebbal",
        hostId: hostProfiles[0].id,
        description: "Affordable PG with basic amenities.",
        propertyType: PropertyType.MEN,
        foodIncluded: true,
        furnishing: FurnishingType.UNFURNISHED,
        address: "Hebbal, Bangalore, Karnataka 560024",
        latitude: 13.0400,
        longitude: 77.5890,
        pgRules: "No smoking, No drinking",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800",
        ],
        nearbyFacilities: [
          { icon: "🚌", title: "Bus Stop", distance: "80 m" },
          { icon: "🏧", title: "ATM", distance: "120 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Luxury Women's PG Near Brigade Road",
        hostId: hostProfiles[1].id,
        description: "Premium PG with spa and beauty salon.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "Brigade Road, Bangalore, Karnataka 560025",
        latitude: 12.9732,
        longitude: 77.6095,
        pgRules: "No male visitors, No pets",
        moveInStatus: MoveInStatus.WITHIN_ONE_MONTH,
        images: [
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
        ],
        nearbyFacilities: [
          { icon: "🛍️", title: "Shopping Mall", distance: "200 m" },
          { icon: "💅", title: "Salon", distance: "100 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Men's PG Near KR Puram",
        hostId: hostProfiles[0].id,
        description: "PG with gym and sports facilities.",
        propertyType: PropertyType.MEN,
        foodIncluded: false,
        furnishing: FurnishingType.SEMI_FURNISHED,
        address: "KR Puram, Bangalore, Karnataka 560036",
        latitude: 13.0095,
        longitude: 77.6951,
        pgRules: "No parties, No pets",
        moveInStatus: MoveInStatus.WITHIN_TWO_WEEKS,
        images: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800",
        ],
        nearbyFacilities: [
          { icon: "🏋️‍♂️", title: "Gym", distance: "250 m" },
          { icon: "🚌", title: "Bus Stop", distance: "100 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Women's PG Near JP Nagar",
        hostId: hostProfiles[1].id,
        description: "PG with garden and yoga classes.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "JP Nagar, Bangalore, Karnataka 560078",
        latitude: 12.9056,
        longitude: 77.5850,
        pgRules: "No male visitors, No smoking",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
        ],
        nearbyFacilities: [
          { icon: "🌳", title: "Park", distance: "150 m" },
          { icon: "🧘‍♀️", title: "Yoga Studio", distance: "200 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Co-living PG Near Koramangala",
        hostId: hostProfiles[2].id,
        description: "PG with coworking space and library.",
        propertyType: PropertyType.COLIVE,
        foodIncluded: false,
        furnishing: FurnishingType.FURNISHED,
        address: "Koramangala, Bangalore, Karnataka 560034",
        latitude: 12.9352,
        longitude: 77.6245,
        pgRules: "Respect common areas, No loud music",
        moveInStatus: MoveInStatus.WITHIN_ONE_WEEK,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        ],
        nearbyFacilities: [
          { icon: "📚", title: "Library", distance: "100 m" },
          { icon: "💻", title: "Coworking", distance: "50 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Budget Men's PG Near Majestic",
        hostId: hostProfiles[0].id,
        description: "PG with easy access to railway station.",
        propertyType: PropertyType.MEN,
        foodIncluded: true,
        furnishing: FurnishingType.UNFURNISHED,
        address: "Majestic, Bangalore, Karnataka 560023",
        latitude: 12.9766,
        longitude: 77.5726,
        pgRules: "No smoking, No drinking",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800",
        ],
        nearbyFacilities: [
          { icon: "🚉", title: "Railway Station", distance: "300 m" },
          { icon: "🚌", title: "Bus Stand", distance: "100 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Luxury Women's PG Near UB City",
        hostId: hostProfiles[1].id,
        description: "PG with rooftop pool and gym.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "UB City, Bangalore, Karnataka 560001",
        latitude: 12.9718,
        longitude: 77.5963,
        pgRules: "No male visitors, No pets",
        moveInStatus: MoveInStatus.WITHIN_ONE_MONTH,
        images: [
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
        ],
        nearbyFacilities: [
          { icon: "🏊‍♀️", title: "Swimming Pool", distance: "50 m" },
          { icon: "🏋️‍♀️", title: "Gym", distance: "100 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Men's PG Near Peenya",
        hostId: hostProfiles[0].id,
        description: "PG with large parking and power backup.",
        propertyType: PropertyType.MEN,
        foodIncluded: false,
        furnishing: FurnishingType.SEMI_FURNISHED,
        address: "Peenya, Bangalore, Karnataka 560058",
        latitude: 13.0285,
        longitude: 77.5152,
        pgRules: "No parties, No pets",
        moveInStatus: MoveInStatus.WITHIN_ONE_WEEK,
        images: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800",
        ],
        nearbyFacilities: [
          { icon: "🅿️", title: "Parking", distance: "20 m" },
          { icon: "🔌", title: "Power Backup", distance: "0 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Women's PG Near Rajajinagar",
        hostId: hostProfiles[1].id,
        description: "PG with CCTV and security guard.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "Rajajinagar, Bangalore, Karnataka 560010",
        latitude: 12.9915,
        longitude: 77.5552,
        pgRules: "No male visitors, No smoking",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800",
        ],
        nearbyFacilities: [
          { icon: "🛒", title: "Supermarket", distance: "150 m" },
          { icon: "🛡️", title: "Security", distance: "0 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Co-living PG Near Bellandur",
        hostId: hostProfiles[2].id,
        description: "PG with rooftop garden and BBQ area.",
        propertyType: PropertyType.COLIVE,
        foodIncluded: false,
        furnishing: FurnishingType.FURNISHED,
        address: "Bellandur, Bangalore, Karnataka 560103",
        latitude: 12.9256,
        longitude: 77.6789,
        pgRules: "Respect common areas, No loud music",
        moveInStatus: MoveInStatus.WITHIN_ONE_MONTH,
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
        ],
        nearbyFacilities: [
          { icon: "🌳", title: "Garden", distance: "0 m" },
          { icon: "🍖", title: "BBQ Area", distance: "0 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Budget Men's PG Near BTM Layout",
        hostId: hostProfiles[0].id,
        description: "PG with shared kitchen and laundry.",
        propertyType: PropertyType.MEN,
        foodIncluded: true,
        furnishing: FurnishingType.UNFURNISHED,
        address: "BTM Layout, Bangalore, Karnataka 560076",
        latitude: 12.9166,
        longitude: 77.6101,
        pgRules: "No smoking, No drinking",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1465101178521-c1a4c8a0f8f5?w=800",
        ],
        nearbyFacilities: [
          { icon: "🍳", title: "Kitchen", distance: "0 m" },
          { icon: "🧺", title: "Laundry", distance: "0 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Luxury Women's PG Near Richmond Town",
        hostId: hostProfiles[1].id,
        description: "PG with spa and beauty salon.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "Richmond Town, Bangalore, Karnataka 560025",
        latitude: 12.9632,
        longitude: 77.6095,
        pgRules: "No male visitors, No pets",
        moveInStatus: MoveInStatus.WITHIN_ONE_MONTH,
        images: [
          "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
        ],
        nearbyFacilities: [
          { icon: "💅", title: "Salon", distance: "100 m" },
          { icon: "🧖‍♀️", title: "Spa", distance: "50 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Men's PG Near HSR Layout",
        hostId: hostProfiles[0].id,
        description: "PG with study room and WiFi.",
        propertyType: PropertyType.MEN,
        foodIncluded: false,
        furnishing: FurnishingType.SEMI_FURNISHED,
        address: "HSR Layout, Bangalore, Karnataka 560102",
        latitude: 12.9082,
        longitude: 77.6476,
        pgRules: "No parties, No pets",
        moveInStatus: MoveInStatus.WITHIN_ONE_WEEK,
        images: [
          "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=800",
        ],
        nearbyFacilities: [
          { icon: "📚", title: "Study Room", distance: "0 m" },
          { icon: "📶", title: "WiFi", distance: "0 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Women's PG Near Frazer Town",
        hostId: hostProfiles[1].id,
        description: "PG with home-cooked food and CCTV.",
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: "Frazer Town, Bangalore, Karnataka 560005",
        latitude: 12.9985,
        longitude: 77.6226,
        pgRules: "No male visitors, No smoking",
        moveInStatus: MoveInStatus.IMMEDIATE,
        images: [
          "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=800",
        ],
        nearbyFacilities: [
          { icon: "🍲", title: "Home Food", distance: "0 m" },
          { icon: "📹", title: "CCTV", distance: "0 m" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    }),
    prisma.pgData.create({
      data: {
        title: "Co-living PG Near Sarjapur Road",
        hostId: hostProfiles[2].id,
        description: "PG with coworking space and rooftop cafe.",
        propertyType: PropertyType.COLIVE,
        foodIncluded: false,
        furnishing: FurnishingType.FURNISHED,
        address: "Sarjapur Road, Bangalore, Karnataka 560035",
        latitude: 12.9100,
        longitude: 77.6800,
        pgRules: "Respect common areas, No loud music",
        moveInStatus: MoveInStatus.WITHIN_ONE_MONTH,
        images: [
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
        ],
        nearbyFacilities: [
          { icon: "☕", title: "Cafe", distance: "0 m" },
          { icon: "💻", title: "Coworking", distance: "0 m" },
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[5].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[6].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[7].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[8].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[9].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[10].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[11].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[12].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[13].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[14].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[15].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[16].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[17].id,
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

    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[18].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[19].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[20].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[21].id,
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

    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[22].id,
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
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: "Luxury single room with premium amenities",
        price: 25000,
        availability: 1,
        pgDataId: pgListings[22].id,
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