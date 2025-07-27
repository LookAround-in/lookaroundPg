import { createAuthClient } from "better-auth/react"
import { NextRequest } from "next/server";
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
})

const signIn = async () => {
    const data = await authClient.signIn.social({
        provider: "google"
    })
}

export const getSession = async (req: NextRequest) => {
    const session = await authClient.getSession(req);
    return session;
};