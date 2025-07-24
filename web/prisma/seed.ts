import { PrismaClient } from '../generated/prisma/index.js'
import { 
  UserRole, 
  PropertyType, 
  FurnishingType, 
  MoveInStatus, 
  SharingTypeEnum, 
  FurnitureType, 
  AmenityType 
} from '../generated/prisma/index.js'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (in reverse order due to foreign key constraints)
  console.log('🧹 Cleaning existing data...')
  await prisma.amenity.deleteMany()
  await prisma.furniture.deleteMany()
  await prisma.sharingType.deleteMany()
  await prisma.pgData.deleteMany()
  await prisma.hostProfile.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  console.log('👥 Creating users...')
  const users = await Promise.all([
    // Super Admin
    prisma.user.create({
      data: {
        id: 'superadmin-001',
        role: UserRole.SUPER_ADMIN,
        name: 'Super Administrator',
        email: 'superadmin@lookaroundpg.com',
        emailVerified: true,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    // Admin
    prisma.user.create({
      data: {
        id: 'admin-001',
        role: UserRole.ADMIN,
        name: 'Admin User',
        email: 'admin@lookaroundpg.com',
        emailVerified: true,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    // Host Users
    prisma.user.create({
      data: {
        id: 'host-001',
        role: UserRole.HOST,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@gmail.com',
        emailVerified: true,
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    prisma.user.create({
      data: {
        id: 'host-002',
        role: UserRole.HOST,
        name: 'Priya Sharma',
        email: 'priya.sharma@gmail.com',
        emailVerified: true,
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    prisma.user.create({
      data: {
        id: 'host-003',
        role: UserRole.HOST,
        name: 'Arjun Patel',
        email: 'arjun.patel@gmail.com',
        emailVerified: true,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    // Regular Users
    prisma.user.create({
      data: {
        id: 'user-001',
        role: UserRole.USER,
        name: 'Amit Singh',
        email: 'amit.singh@gmail.com',
        emailVerified: true,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    prisma.user.create({
      data: {
        id: 'user-002',
        role: UserRole.USER,
        name: 'Sneha Gupta',
        email: 'sneha.gupta@gmail.com',
        emailVerified: true,
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
  ])

  console.log(`✅ Created ${users.length} users`)

  // Create Host Profiles
  console.log('🏠 Creating host profiles...')
  const hostProfiles = await Promise.all([
    prisma.hostProfile.create({
      data: {
        id: 'hostprofile-001',
        userId: 'host-001',
        contactNumber: '+91-9876543210',
        alternateContact: '+91-9876543211',
        whatsApp: '+91-9876543210',
        Address: '123, MG Road, Bangalore, Karnataka 560001',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    prisma.hostProfile.create({
      data: {
        id: 'hostprofile-002',
        userId: 'host-002',
        contactNumber: '+91-9876543220',
        alternateContact: '+91-9876543221',
        whatsApp: '+91-9876543220',
        Address: '456, Koramangala, Bangalore, Karnataka 560034',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    prisma.hostProfile.create({
      data: {
        id: 'hostprofile-003',
        userId: 'host-003',
        contactNumber: '+91-9876543230',
        alternateContact: '+91-9876543231',
        whatsApp: '+91-9876543230',
        Address: '789, HSR Layout, Bangalore, Karnataka 560102',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
  ])

  console.log(`✅ Created ${hostProfiles.length} host profiles`)

  // Create PG Data
  console.log('🏘️ Creating PG listings...')
  const pgListings = await Promise.all([
    // Men's PG by Rajesh Kumar
    prisma.pgData.create({
      data: {
        id: 'pg-001',
        title: 'Premium Men\'s PG Near Electronic City',
        hostId: 'hostprofile-001',
        description: 'Fully furnished PG with all modern amenities. Located in a safe and secure area with easy access to IT companies in Electronic City.',
        propertyType: PropertyType.MEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: 'Electronic City Phase 1, Bangalore, Karnataka 560100',
        latitude: 12.8456,
        longitude: 77.6632,
        pgRules: 'No smoking, No drinking, No visitors after 10 PM, Maintain cleanliness',
        moveInStatus: MoveInStatus.IMMEDIATE,
        virtualTourUrl: 'https://www.lookaround.in/library/tour?url=https%3A%2F%2Frealsee.ai%2FZyKKW8Kp',
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
        ],
        rating: 4.5,
        reviews: [
          'Excellent facilities and very clean',
          'Great location for IT professionals',
          'Host is very cooperative'
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    // Women's PG by Priya Sharma
    prisma.pgData.create({
      data: {
        id: 'pg-002',
        title: 'Safe Women\'s PG in Koramangala',
        hostId: 'hostprofile-002',
        description: 'Secure and comfortable PG exclusively for women. 24/7 security, CCTV surveillance, and a homely environment.',
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: '5th Block, Koramangala, Bangalore, Karnataka 560095',
        latitude: 12.9352,
        longitude: 77.6245,
        pgRules: 'No male visitors, In-time by 9 PM, No smoking, Maintain cleanliness',
        moveInStatus: MoveInStatus.WITHIN_ONE_WEEK,
        virtualTourUrl: 'https://www.lookaround.in/library/tour?url=https%3A%2F%2Frealsee.ai%2FZyKKW8Kp',
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'
        ],
        rating: 4.8,
        reviews: [
          'Very safe and secure place for women',
          'Excellent food quality',
          'Great community of working women'
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    // Co-living Space by Arjun Patel
    prisma.pgData.create({
      data: {
        id: 'pg-003',
        title: 'Modern Co-living Space in HSR Layout',
        hostId: 'hostprofile-003',
        description: 'Contemporary co-living space with shared amenities, perfect for young professionals and students.',
        propertyType: PropertyType.COLIVE,
        foodIncluded: false,
        furnishing: FurnishingType.FURNISHED,
        address: 'Sector 2, HSR Layout, Bangalore, Karnataka 560102',
        latitude: 12.9082,
        longitude: 77.6476,
        pgRules: 'Respect common areas, Clean after yourself, No loud music after 10 PM',
        moveInStatus: MoveInStatus.IMMEDIATE,
        virtualTourUrl: 'https://www.lookaround.in/library/tour?url=https%3A%2F%2Frealsee.ai%2FZyKKW8Kp',
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
        ],
        rating: 4.3,
        reviews: [
          'Great co-living experience',
          'Modern amenities and facilities',
          'Good community atmosphere'
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    // Additional Men's PG
    prisma.pgData.create({
      data: {
        id: 'pg-004',
        title: 'Budget Men\'s PG Near Whitefield',
        hostId: 'hostprofile-001',
        description: 'Affordable accommodation for students and working professionals near Whitefield IT hub.',
        propertyType: PropertyType.MEN,
        foodIncluded: true,
        furnishing: FurnishingType.SEMI_FURNISHED,
        address: 'ITPL Road, Whitefield, Bangalore, Karnataka 560066',
        latitude: 12.9698,
        longitude: 77.7500,
        pgRules: 'No smoking inside rooms, No visitors after 9 PM, Keep common areas clean',
        moveInStatus: MoveInStatus.WITHIN_TWO_WEEKS,
        images: [
          'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
        ],
        rating: 4.0,
        reviews: [
          'Good value for money',
          'Close to office locations',
          'Decent facilities'
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }),

    // Additional Women's PG
    prisma.pgData.create({
      data: {
        id: 'pg-005',
        title: 'Luxury Women\'s PG in Indiranagar',
        hostId: 'hostprofile-002',
        description: 'Premium accommodation for women with luxury amenities and personalized services.',
        propertyType: PropertyType.WOMEN,
        foodIncluded: true,
        furnishing: FurnishingType.FURNISHED,
        address: '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038',
        latitude: 12.9716,
        longitude: 77.6412,
        pgRules: 'No male visitors, In-time by 10 PM, Maintain silence after 10 PM',
        moveInStatus: MoveInStatus.WITHIN_ONE_MONTH,
        virtualTourUrl: 'https://www.lookaround.in/library/tour?url=https%3A%2F%2Frealsee.ai%2FZyKKW8Kp',
        images: [
          'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800'
        ],
        rating: 4.9,
        reviews: [
          'Exceptional service and facilities',
          'Very clean and well-maintained',
          'Perfect for working professionals'
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
  ])

  console.log(`✅ Created ${pgListings.length} PG listings`)

  // Create Sharing Types
  console.log('🛏️ Creating sharing types...')
  const sharingTypes = await Promise.all([
    // PG-001 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: 'Single occupancy with attached bathroom',
        price: 15000,
        availability: 2,
        pgDataId: 'pg-001',
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
      }
    }),

    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.DOUBLE,
        description: 'Double sharing with common bathroom',
        price: 10000,
        availability: 4,
        pgDataId: 'pg-001',
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
      }
    }),

    // PG-002 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: 'Single room with balcony access',
        price: 18000,
        availability: 1,
        pgDataId: 'pg-002',
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
      }
    }),

    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.DOUBLE,
        description: 'Double sharing with study area',
        price: 12000,
        availability: 3,
        pgDataId: 'pg-002',
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
      }
    }),

    // PG-003 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: 'Studio apartment style',
        price: 22000,
        availability: 2,
        pgDataId: 'pg-003',
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
      }
    }),

    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.DOUBLE,
        description: 'Shared apartment with kitchen access',
        price: 16000,
        availability: 4,
        pgDataId: 'pg-003',
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
      }
    }),

    // PG-004 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.TRIPLE,
        description: 'Triple sharing budget option',
        price: 8000,
        availability: 6,
        pgDataId: 'pg-004',
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
      }
    }),

    // PG-005 Sharing Types
    prisma.sharingType.create({
      data: {
        type: SharingTypeEnum.SINGLE,
        description: 'Luxury single room with premium amenities',
        price: 25000,
        availability: 1,
        pgDataId: 'pg-005',
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
      }
    })
  ])

  console.log(`✅ Created ${sharingTypes.length} sharing types`)

  // Create Furniture entries
  console.log('🪑 Creating furniture entries...')
  const furnitureEntries = []
  
  const furnitureByPg = {
    'pg-001': [FurnitureType.BED, FurnitureType.WARDROBE, FurnitureType.TABLE, FurnitureType.CHAIR, FurnitureType.AIR_CONDITIONER],
    'pg-002': [FurnitureType.BED, FurnitureType.WARDROBE, FurnitureType.TABLE, FurnitureType.CHAIR, FurnitureType.AIR_CONDITIONER, FurnitureType.FRIDGE],
    'pg-003': [FurnitureType.BED, FurnitureType.WARDROBE, FurnitureType.SOFA, FurnitureType.TABLE, FurnitureType.CHAIR, FurnitureType.TELEVISION, FurnitureType.MICROWAVE],
    'pg-004': [FurnitureType.BED, FurnitureType.WARDROBE, FurnitureType.TABLE, FurnitureType.CHAIR],
    'pg-005': [FurnitureType.BED, FurnitureType.WARDROBE, FurnitureType.SOFA, FurnitureType.TABLE, FurnitureType.CHAIR, FurnitureType.AIR_CONDITIONER, FurnitureType.FRIDGE, FurnitureType.TELEVISION, FurnitureType.MICROWAVE]
  }

  for (const [pgId, furnitureList] of Object.entries(furnitureByPg)) {
    for (const furnitureType of furnitureList) {
      furnitureEntries.push(
        prisma.furniture.create({
          data: {
            type: furnitureType,
            pgDataId: pgId,
          }
        })
      )
    }
  }

  await Promise.all(furnitureEntries)
  console.log(`✅ Created ${furnitureEntries.length} furniture entries`)

  // Create Amenity entries
  console.log('🏊 Creating amenity entries...')
  const amenityEntries = []
  
  const amenitiesByPg = {
    'pg-001': [AmenityType.WIFI, AmenityType.PARKING, AmenityType.SECURITY, AmenityType.LAUNDRY, AmenityType.POWER_BACKUP],
    'pg-002': [AmenityType.WIFI, AmenityType.PARKING, AmenityType.SECURITY, AmenityType.LAUNDRY, AmenityType.POWER_BACKUP, AmenityType.CCTV, AmenityType.HOUSEKEEPING],
    'pg-003': [AmenityType.WIFI, AmenityType.PARKING, AmenityType.SECURITY, AmenityType.LAUNDRY, AmenityType.GYM, AmenityType.COMMON_AREA, AmenityType.LIFT],
    'pg-004': [AmenityType.WIFI, AmenityType.PARKING, AmenityType.SECURITY, AmenityType.LAUNDRY],
    'pg-005': [AmenityType.WIFI, AmenityType.PARKING, AmenityType.SECURITY, AmenityType.LAUNDRY, AmenityType.GYM, AmenityType.SWIMMING_POOL, AmenityType.HOUSEKEEPING, AmenityType.CCTV, AmenityType.LIFT, AmenityType.CLUBHOUSE]
  }

  for (const [pgId, amenityList] of Object.entries(amenitiesByPg)) {
    for (const amenityType of amenityList) {
      amenityEntries.push(
        prisma.amenity.create({
          data: {
            type: amenityType,
            pgDataId: pgId,
          }
        })
      )
    }
  }

  await Promise.all(amenityEntries)
  console.log(`✅ Created ${amenityEntries.length} amenity entries`)

  console.log('🎉 Database seeding completed successfully!')
  
  // Print summary
  console.log('\n📊 Seeding Summary:')
  console.log(`👥 Users: ${users.length}`)
  console.log(`🏠 Host Profiles: ${hostProfiles.length}`)
  console.log(`🏘️ PG Listings: ${pgListings.length}`)
  console.log(`🛏️ Sharing Types: ${sharingTypes.length}`)
  console.log(`🪑 Furniture Entries: ${furnitureEntries.length}`)
  console.log(`🏊 Amenity Entries: ${amenityEntries.length}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })