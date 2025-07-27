import { NextResponse } from "next/server";
import { pgController } from "../../../route";
import { isUser } from "@/lib/auth-middleware";

export const GET = isUser(async (request: Request) => {
    try {
        // Extract hostId from the URL
        const url = new URL(request.url);
        const hostId = url.pathname.split("/").pop(); // Assumes hostId is the last segment

        const result = await pgController.getPgsByHostId(request, hostId as string);
        return result;
    } catch (error) {
        console.error("Error in getting pg by hostId", error);
        return NextResponse.json({
            success: false,
            message: "Error in getting pg by hostId",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
})