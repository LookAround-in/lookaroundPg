import { NextResponse } from "next/server";
import { pgController } from "../../route";

export async function GET(request: Request) {
    try {
        const result = await pgController.getExplorePgs(request);
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