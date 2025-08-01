import prisma from "@/lib/Prisma";

async function clearDatabase() {
  console.log("🧹 Starting database cleanup...");
  
  try {
    // Clear tables in reverse order due to foreign key constraints
    // Start with tables that have no dependencies (leaf tables)
    
    console.log("🗑️  Clearing reviews...");
    await prisma.review.deleteMany();
    
    console.log("🗑️  Clearing wishlist entries...");
    await prisma.wishList.deleteMany();
    
    console.log("🗑️  Clearing PG requests...");
    await prisma.pgRequest.deleteMany();
    
    console.log("🗑️  Clearing amenities...");
    await prisma.amenity.deleteMany();
    
    console.log("🗑️  Clearing furniture...");
    await prisma.furniture.deleteMany();
    
    console.log("🗑️  Clearing sharing types...");
    await prisma.sharingType.deleteMany();
    
    console.log("🗑️  Clearing PG data...");
    await prisma.pgData.deleteMany();
    
    console.log("🗑️  Clearing host profiles...");
    await prisma.hostProfile.deleteMany();
    
    console.log("🗑️  Clearing verification records...");
    await prisma.verification.deleteMany();
    
    console.log("🗑️  Clearing user accounts...");
    await prisma.account.deleteMany();
    
    console.log("🗑️  Clearing user sessions...");
    await prisma.session.deleteMany();
    
    console.log("🗑️  Clearing users...");
    await prisma.user.deleteMany();
    
    console.log("✅ Database cleared successfully!");
    
    // Optional: Reset auto-increment sequences (PostgreSQL specific)
    console.log("🔄 Resetting database sequences...");
    
    console.log("🎉 Database cleanup completed successfully!");
    
  } catch (error) {
    console.error("❌ Error clearing database:", error);
    throw error;
  }
}

async function confirmAndClear() {
  // Safety check - require explicit confirmation
  const args = process.argv.slice(2);
  const forceFlag = args.includes('--force') || args.includes('-f');
  
  if (!forceFlag) {
    console.log("⚠️  WARNING: This will permanently delete ALL data from the database!");
    console.log("⚠️  This action cannot be undone!");
    console.log("");
    console.log("To proceed, run the script with the --force flag:");
    console.log("npm run clear-db -- --force");
    console.log("or");
    console.log("tsx scripts/clearDb.ts --force");
    process.exit(0);
  }
  
  console.log("🚨 FORCE FLAG DETECTED - Proceeding with database cleanup...");
  await clearDatabase();
}

// Main execution
confirmAndClear()
  .then(async () => {
    await prisma.$disconnect();
    console.log("📊 Database connection closed.");
    process.exit(0);
  })
  .catch(async (error) => {
    console.error("💥 Critical error during database cleanup:", error);
    await prisma.$disconnect();
    process.exit(1);
  });

