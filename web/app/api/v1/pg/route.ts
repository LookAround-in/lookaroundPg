import { NextResponse } from "next/server";
import { PgController } from "./pgController";

export const pgController = new PgController();

export async function GET(request: Request) {
    try {
        const result = await pgController.getFeaturedPgs(request);
        return result;
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Error fetching PGs",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const result = await pgController.createPg(request);
        return result;
    } catch (error) {
        console.error("Error in POST route:", error);
        return NextResponse.json({
            success: false,
            message: "Error creating PG",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}