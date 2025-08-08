import { NextResponse } from "next/server";
import { PgController } from "./pgController";

const pgController = new PgController();

export async function GET(request: Request) {
    try {
        const result = await pgController.getTrendingPgs(request);
        return result;
    } catch (error) {
        console.error("Error in getting Trending PG's", error);
        return NextResponse.json({
            success: false,
            message: "Error in getting Trending PG's",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}