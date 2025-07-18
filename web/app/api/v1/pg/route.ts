import { NextRequest, NextResponse } from "next/server";
import { PgController } from "./pgController";
import { isAdmin } from "@/lib/auth-middleware";


export const pgController = new PgController();

// Protect POST route with admin middleware
export const POST = isAdmin(async (request: Request) => {
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
});