import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { authClient } from "./auth-client";


export async function withAuth(
    handler: (req: NextRequest) => Promise<NextResponse>, // Ensure the type matches Next.js
    requiredRole?: string
) {
    return async (req: NextRequest) => {
        console.log("Middleware triggered");
        try {
            console.log(req.headers);
            const session = await authClient.getSession(req);
            console.log("Session in middleware:", session);

            if (!session) {
                return NextResponse.json(
                    { success: false, message: "Unauthorized" },
                    { status: 401 }
                );
            }

            // Role-based access control
            if (requiredRole && session.user.role !== requiredRole) {
                return NextResponse.json(
                    { success: false, message: "Forbidden: Insufficient permissions" },
                    { status: 403 }
                );
            }

            // Call the handler correctly
            return await handler(req); // Ensure `await` is used here
        } catch (error) {
            console.error("Auth middleware error:", error);
            return NextResponse.json(
                { success: false, message: "Authentication error" },
                { status: 401 }
            );
        }
    };
}

export const isAdmin = (handler: (req: Request) => Promise<NextResponse>) =>
    withAuth(handler, "admin");

export const isHost = (handler: (req: Request) => Promise<NextResponse>) =>
    withAuth(handler, "host");

// export const isUser = (handler: (req: Request) => Promise<NextResponse>) =>
//     withAuth(handler, "USER");

export const isUser = (handler: (req: Request) => Promise<NextResponse>) => {
    console.log("isUser middleware applied"); // Add this log
    return withAuth(handler, "USER");
};