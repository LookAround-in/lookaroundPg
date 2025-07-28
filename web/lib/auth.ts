import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {customSession} from "better-auth/plugins"

import prisma from './Prisma'

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    plugins: [
        customSession(async ({user, session}) => {
            const dbUser = await prisma.user.findUnique({
                where: {id: session.userId},
                select: {role: true}
            })
            return {
                user: {...user, role: dbUser?.role || "USER"},
                session
            }
        })
    ]
});