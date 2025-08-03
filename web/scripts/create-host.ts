import { authClient } from "@/lib/auth-client"
import prisma from "@/lib/Prisma";
import { UserRole } from "@/generated/prisma";

interface HostData {
    name: string;
    email: string;
    password: string;
    phone: string;
    image: string;
    hostProfile: {
        contactNumber: string;
        alternateContact: string;
        whatsappNumber: string;
        address: string;
        languagesSpokenByHost: string[];
    };
}

const hostData: HostData[] = [
    {
        name: 'Aditya Venkatesh',
        email: 'aditya.venkatesh.pg@gmail.com',
        password: 'tempPassword1@',
        phone: '9876543210',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        hostProfile: {
            contactNumber: '9876543210',
            alternateContact: '9876543211',
            whatsappNumber: '9876543210',
            address: 'Electronic City Phase 1, Bangalore, Karnataka 560100',
            languagesSpokenByHost: ['Hindi', 'English', 'Kannada', 'Tamil'],
        }
    },
    {
        name: 'Sneha Balasubramanian',
        email: 'sneha.bala.homes@gmail.com',
        password: 'tempPassword2@',
        phone: '9876543220',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        hostProfile: {
            contactNumber: '9876543220',
            alternateContact: '9876543221',
            whatsappNumber: '9876543220',
            address: '5th Block, Koramangala, Bangalore, Karnataka 560095',
            languagesSpokenByHost: ['Tamil', 'English', 'Hindi', 'Kannada'],
        }
    },
    {
        name: 'Kiran Maheshwari',
        email: 'kiran.mahesh.stays@gmail.com',
        password: 'tempPassword3@',
        phone: '9876543230',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        hostProfile: {
            contactNumber: '9876543230',
            alternateContact: '9876543231',
            whatsappNumber: '9876543230',
            address: 'Sector 2, HSR Layout, Bangalore, Karnataka 560102',
            languagesSpokenByHost: ['Hindi', 'English', 'Marathi', 'Kannada'],
        }
    },
    {
        name: 'Meera Chandrasekhar',
        email: 'meera.chandra.residences@gmail.com',
        password: 'tempPassword4@',
        phone: '9876543240',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150',
        hostProfile: {
            contactNumber: '9876543240',
            alternateContact: '9876543241',
            whatsappNumber: '9876543240',
            address: 'ITPL Road, Whitefield, Bangalore, Karnataka 560066',
            languagesSpokenByHost: ['Telugu', 'English', 'Hindi', 'Kannada'],
        }
    },
    {
        name: 'Rohan Srinivasan',
        email: 'rohan.srini.hostels@gmail.com',
        password: 'tempPassword5@',
        phone: '9876543250',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        hostProfile: {
            contactNumber: '9876543250',
            alternateContact: '9876543251',
            whatsappNumber: '9876543250',
            address: '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038',
            languagesSpokenByHost: ['Tamil', 'English', 'Hindi', 'Malayalam'],
        }
    },
];

/**
 * Sequential processing: Create user, get ID, create host profile immediately
 */
const createHostWithProfile = async (host: HostData): Promise<boolean> => {
    try {
        console.log(`🔄 Creating host: ${host.name} (${host.email})`);

        // Step 1: Create user account via Better Auth
        const { data, error } = await authClient.signUp.email(
            {
                email: host.email,
                password: host.password,
                name: host.name,
                phone: host.phone,
            },
            {
                onRequest: (ctx) => {
                    console.log("Creating Account for Host:", host.name);
                },
                onSuccess: (ctx) => {
                    console.log("Account Created for Host:", host.name);
                },
                onError: (ctx) => {
                    console.error("Account Creation Failed for Host:", host.name, ctx.error.message);
                },
            }
        );

        if (error) {
            console.error(`❌ Auth creation failed for ${host.name}:`, error.message);
            return false;
        }

        if (!data?.user?.id) {
            console.error(`❌ No user ID returned for ${host.name}`);
            return false;
        }

        console.log(`✅ User account created for ${host.name}`);

        // Step 2: Update the role manually
        await prisma.user.update({
            where: { id: data.user.id },
            data: { role: UserRole.host }
        });

        console.log(`✅ Role updated to host for ${host.name}`);

        // Step 3: Create host profile with the actual user ID
        const hostProfile = await prisma.hostProfile.create({
            data: {
                userId: data.user.id,
                contactNumber: host.hostProfile.contactNumber,
                alternateContact: host.hostProfile.alternateContact,
                whatsApp: host.hostProfile.whatsappNumber,
                Address: host.hostProfile.address,
                languagesSpokenByHost: host.hostProfile.languagesSpokenByHost,
            }
        });

        console.log(`✅ Host profile created for ${host.name}: ${hostProfile.id}\n`);
        return true;

    } catch (error) {
        console.error(`💥 Unexpected error creating host ${host.name}:`, error);
        return false;
    }
};

/**
 * Create all hosts sequentially (recommended approach)
 */
const createAllHostsSequentially = async (): Promise<void> => {
    console.log(`🚀 Starting sequential creation of ${hostData.length} hosts...\n`);

    let successCount = 0;
    let failureCount = 0;
    const failures: string[] = [];

    for (let i = 0; i < hostData.length; i++) {
        const host = hostData[i];
        const progress = `[${i + 1}/${hostData.length}]`;
        
        console.log(`${progress} Processing ${host.name}...`);

        const success = await createHostWithProfile(host);
        
        if (success) {
            successCount++;
            console.log(`${progress} ✅ SUCCESS: ${host.name}`);
        } else {
            failureCount++;
            failures.push(host.name);
            console.log(`${progress} ❌ FAILED: ${host.name}`);
        }

        // Small delay to avoid overwhelming the auth service
        if (i < hostData.length - 1) {
            console.log("⏳ Waiting 2 seconds before next host...\n");
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    // Final summary
    console.log(`\n🎉 SEQUENTIAL CREATION COMPLETED`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Failed: ${failureCount}`);
    
    if (failures.length > 0) {
        console.log(`\n📋 Failed hosts:`);
        failures.forEach(name => console.log(`   - ${name}`));
    }
};

/**
 * Alternative: Batch creation (create users first, then profiles)
 */
const createAllHostsBatch = async (): Promise<void> => {
    console.log(`🚀 Starting BATCH MODE creation...\n`);

    // Step 1: Create all users first
    console.log(`📝 Creating ${hostData.length} user accounts...`);
    const userResults: { host: HostData; userId?: string; success: boolean }[] = [];
    
    for (const host of hostData) {
        console.log(`🔄 Creating user: ${host.name}`);
        
        const { data, error } = await authClient.signUp.email(
            {
                email: host.email,
                password: host.password,
                name: host.name,
                phone: host.phone,
            },
            {
                onRequest: (ctx) => {
                    console.log("Creating Account for Host:", host.name);
                },
                onSuccess: (ctx) => {
                    console.log("Account Created for Host:", host.name);
                },
                onError: (ctx) => {
                    console.error("Account Creation Failed for Host:", host.name, ctx.error.message);
                },
            }
        );

        if (error) {
            console.error(`❌ Failed to create user ${host.name}:`, error.message);
            userResults.push({ host, success: false });
        } else if (data?.user?.id) {
            // Update role to host
            await prisma.user.update({
                where: { id: data.user.id },
                data: { role: UserRole.host }
            });
            
            console.log(`✅ Created user: ${host.name} with ID: ${data.user.id}`);
            userResults.push({ host, userId: data.user.id, success: true });
        } else {
            console.error(`❌ No user ID returned for ${host.name}`);
            userResults.push({ host, success: false });
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Step 2: Create host profiles for successful users
    console.log(`\n🏠 Creating host profiles...`);
    const successfulUsers = userResults.filter(result => result.success && result.userId);
    
    for (const result of successfulUsers) {
        try {
            const hostProfile = await prisma.hostProfile.create({
                data: {
                    userId: result.userId!,
                    contactNumber: result.host.hostProfile.contactNumber,
                    alternateContact: result.host.hostProfile.alternateContact,
                    whatsApp: result.host.hostProfile.whatsappNumber,
                    Address: result.host.hostProfile.address,
                    languagesSpokenByHost: result.host.hostProfile.languagesSpokenByHost,
                }
            });

            console.log(`✅ Created host profile for ${result.host.name}: ${hostProfile.id}`);
        } catch (error) {
            console.error(`❌ Error creating host profile for ${result.host.name}:`, error);
        }
    }

    console.log(`\n✅ Batch creation completed! Created ${successfulUsers.length} host profiles.`);
};

/**
 * Utility function to check existing hosts
 */
const checkExistingHosts = async (): Promise<void> => {
    const emails = hostData.map(h => h.email);
    const existingUsers = await prisma.user.findMany({
        where: { email: { in: emails } },
        select: { email: true, name: true, role: true }
    });

    if (existingUsers.length > 0) {
        console.log(`⚠️  WARNING: Found ${existingUsers.length} existing users:`);
        existingUsers.forEach(u => console.log(`   - ${u.name} (${u.email}) - Role: ${u.role}`));
        console.log(`\nYou may want to clear these first or skip them.\n`);
    } else {
        console.log(`✅ No existing users found. Ready to proceed.\n`);
    }
};

/**
 * Main execution function
 */
const main = async (): Promise<void> => {
    const args = process.argv.slice(2);
    const mode = args[0] || 'sequential';

    try {
        console.log("🎯 LookaroundPG Host Creation Script\n");
        
        // Check for existing hosts first
        await checkExistingHosts();

        switch (mode) {
            case 'sequential':
                await createAllHostsSequentially();
                break;
            case 'batch':
                await createAllHostsBatch();
                break;
            case 'check':
                console.log('✅ Check completed.');
                break;
            default:
                console.log(`
Usage: tsx scripts/create-host.ts [mode]

Modes:
  sequential  - Create hosts one by one (default, safer)
  batch      - Create all users first, then all profiles (faster)
  check      - Only check for existing hosts

Examples:
  tsx scripts/create-host.ts sequential
  tsx scripts/create-host.ts batch
  tsx scripts/create-host.ts check
                `);
        }
    } catch (error) {
        console.error('💥 Critical error:', error);
    } finally {
        await prisma.$disconnect();
        console.log('\n👋 Database connection closed.');
    }
};

// Execute the script
main();