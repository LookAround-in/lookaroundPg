import { NextResponse } from "next/server";
import { pgRequestController } from "../route";

export async function POST(request: Request) {
    try {
        const result = await pgRequestController.acceptPgRequest(request);
        return result;
    } catch (error) {
        console.error("Error in getting explore pg's route:", error);
        return NextResponse.json({
            success: false,
            message: "Error getting explore PG's",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}