import { NextResponse } from "next/server";
import { PgController } from "./pgController";

const pgController = new PgController();

export async function GET(request: Request) {
    try {
        const result = await pgController.getFeaturedPgs(request);
        return result;
    } catch (error) {
        console.error("Error in getting featured Pg route:", error);
        return NextResponse.json({
            success: false,
            message: "Error getting featured PG",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}