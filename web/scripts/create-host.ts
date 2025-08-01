import { authClient } from "@/lib/auth-client"
import prisma from "@/lib/Prisma";

const host = [
    {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@gmail.com',
        password: 'tempPassword1@',
        phone: '9876543210',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    },
    {
        name: 'Priya Sharma',
        email: 'priya.sharma@gmail.com',
        password: 'tempPassword2@',
        phone: '9876543220',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
    {
        name: 'Arjun Patel',
        email: 'arjun.patel@gmail.com',
        password: 'tempPassword3@',
        phone: '9876543230',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    },
    {
        name: 'Kavitha Reddy',
        email: 'kavitha.reddy@gmail.com',
        password: 'tempPassword4@',
        phone: '9876543240',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b550?w=150',
    },
    {
        name: 'Vikram Singh',
        email: 'vikram.singh@gmail.com',
        password: 'tempPassword5@',
        phone: '9876543250',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
]

// Create User account using better auth using above data.

const createUsersForHostProfiles = async () => {
    host.forEach(async (user) => {
        const { data, error } = await authClient.signUp.email(
            {
                email: user.email,
                password: user.password,
                name: user.name,
                phone: user.phone,
                role: "host",
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
        } else {
            console.log("User created successfully:", data);
        }
    });
}


const hostProfileInfo = [
    {
        userId: "MslZMZsc727s551NlB1l5e2J6HM3uMnK", // get this user Id from the database after creating the user - Rajesh Kumar
        contactNumber: '9876543210',
        alternateContact: '9876543211',
        whatsappNumber: '9876543210',
        address: 'Electronic City Phase 1, Bangalore, Karnataka 560100',
        languagesSpokenByHost: ['Hindi', 'English', 'Kannada'],
    },
    {
        userId: "MslZMZsc727s551NlB1l5e2J6HM3uMnK", // get this user Id from the database after creating the user - Priya Sharma
        contactNumber: '9876543220',
        alternateContact: '9876543221',
        whatsappNumber: '9876543220',
        address: '5th Block, Koramangala, Bangalore, Karnataka 560095',
        languagesSpokenByHost: ['Hindi', 'English', 'Tamil', 'Kannada'],
    },
    {
        userId: "kUlnUpuxPHMpryUyqnL7dsmKJHzLnCDm", // get this user Id from the database after creating the user - Arjun Patel
        contactNumber: '9876543230',
        alternateContact: '9876543231',
        whatsappNumber: '9876543230',
        address: 'Sector 2, HSR Layout, Bangalore, Karnataka 560102',
        languagesSpokenByHost: ['Hindi', 'English', 'Gujarati'],
    },
    {
        userId: "str6WkwSJQ1YJc1B0XfUtkz0ZWVbB5rm", // get this user Id from the database after creating the user - Kavitha Reddy
        contactNumber: '9876543240',
        alternateContact: '9876543241',
        whatsappNumber: '9876543240',
        address: 'ITPL Road, Whitefield, Bangalore, Karnataka 560066',
        languagesSpokenByHost: ['Telugu', 'English', 'Hindi', 'Kannada'],
    },
    {
        userId: "5dZAX8kdHe5AiQVz8UWbjTmxqGxPtdgk", // get this user Id from the database after creating the user - Vikram Singh
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
    // console.log("Starting the creation of user accounts...");
    // await createUsersForHostProfiles();
    console.log("Starting the creation of hostProfile...");
    await createHostProfiles();
}

main();