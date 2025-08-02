import { authClient } from "@/lib/auth-client"
import prisma from "@/lib/Prisma";
import { UserRole } from "@/generated/prisma";

const host = [
    {
        name: 'Aditya Venkatesh',
        email: 'aditya.venkatesh.pg@gmail.com',
        password: 'tempPassword1@',
        phone: '9876543210',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
    {
        name: 'Sneha Balasubramanian',
        email: 'sneha.bala.homes@gmail.com',
        password: 'tempPassword2@',
        phone: '9876543220',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
    {
        name: 'Kiran Maheshwari',
        email: 'kiran.mahesh.stays@gmail.com',
        password: 'tempPassword3@',
        phone: '9876543230',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    {
        name: 'Meera Chandrasekhar',
        email: 'meera.chandra.residences@gmail.com',
        password: 'tempPassword4@',
        phone: '9876543240',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150',
    },
    {
        name: 'Rohan Srinivasan',
        email: 'rohan.srini.hostels@gmail.com',
        password: 'tempPassword5@',
        phone: '9876543250',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
]

// Create User account using better auth using above data.

const createUsersForHostProfiles = async () => {
  for (const user of host) { // Use for...of instead of forEach for proper async handling
        const { data, error } = await authClient.signUp.email(
            {
                email: user.email,
                password: user.password,
                name: user.name,
                phone: user.phone,
            },
            {
                onRequest: (ctx) => {
                    console.log("Creating Account for Host:", user.name);
                },
                onSuccess: (ctx) => {
                    console.log("Account Created for Host:", user.name);
                },
                onError: (ctx) => {
                    console.error("Account Creation Failed for Host:", user.name, ctx.error.message);
                },
            }
        );

        if (error) {
            console.error("Error creating user:", error);
        } else if (data?.user?.id) {
            // Update the role manually
            await prisma.user.update({
                where: { id: data.user.id },
                data: { role: 'host' }
            });
            console.log("User created and role updated successfully:", data);
        }
    }
}

const hostProfileInfo = [
    {
        userId: "hKBT2SLnVmgYahzoqAcb6P0FlEdzpmEL", // get this user Id from the database after creating the user - Rajesh Kumar
        contactNumber: '9876543210',
        alternateContact: '9876543211',
        whatsappNumber: '9876543210',
        address: 'Electronic City Phase 1, Bangalore, Karnataka 560100',
        languagesSpokenByHost: ['Hindi', 'English', 'Kannada'],
    },
    {
        userId: "7Q5JviBp2gmihawmvLqoD45wtmgdic0w", // get this user Id from the database after creating the user - Priya Sharma
        contactNumber: '9876543220',
        alternateContact: '9876543221',
        whatsappNumber: '9876543220',
        address: '5th Block, Koramangala, Bangalore, Karnataka 560095',
        languagesSpokenByHost: ['Hindi', 'English', 'Tamil', 'Kannada'],
    },
    {
        userId: "Ej5oDHxf4UGbJ0uos1eDB6fMNJI1G5E5", // get this user Id from the database after creating the user - Arjun Patel
        contactNumber: '9876543230',
        alternateContact: '9876543231',
        whatsappNumber: '9876543230',
        address: 'Sector 2, HSR Layout, Bangalore, Karnataka 560102',
        languagesSpokenByHost: ['Hindi', 'English', 'Gujarati'],
    },
    {
        userId: "8jNqhNcWZbFHYgISomn1gbZaouBxT1kY", // get this user Id from the database after creating the user - Kavitha Reddy
        contactNumber: '9876543240',
        alternateContact: '9876543241',
        whatsappNumber: '9876543240',
        address: 'ITPL Road, Whitefield, Bangalore, Karnataka 560066',
        languagesSpokenByHost: ['Telugu', 'English', 'Hindi', 'Kannada'],
    },
    {
        userId: "1toDgDHVUnMmQZ5HlYpnboG6nN5N1D69", // get this user Id from the database after creating the user - Vikram Singh
        contactNumber: '9876543250',
        alternateContact: '9876543251',
        whatsappNumber: '9876543250',
        address: '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038',
        languagesSpokenByHost: ['Hindi', 'English', 'Punjabi'],
    },
]

// Create Host profile by directly seeding the database .

const createHostProfiles = async () => {
    hostProfileInfo.forEach(async (profile) => {
        prisma.hostProfile.create({
            data: {
                userId: profile.userId,
                contactNumber: profile.contactNumber,
                alternateContact: profile.alternateContact,
                whatsApp: profile.whatsappNumber,
                Address: profile.address,
                languagesSpokenByHost: profile.languagesSpokenByHost || [],
            },
        }).then((result) => {
            console.log("Host Profile created successfully:", result);
        }).catch((error) => {
            console.error("Error creating Host Profile:", error);
        })
    })
}

const main = async () => {
    console.log("Starting the creation of user accounts...");
    await createUsersForHostProfiles();
    // console.log("Starting the creation of hostProfile...");
    // await createHostProfiles();
}

main();