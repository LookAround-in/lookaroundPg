import { NextRequest, NextResponse } from "next/server";
import { PgRequestController } from "./pgrequest.controller";

export const pgRequestController = new PgRequestController();

export const POST = async (request: Request) => {
    try {
        const result = await pgRequestController.createPgRequest(request);
        return result;
    } catch (error) {
        console.error("Error in POST route:", error);
        return NextResponse.json({
            success: false,
            message: "Error creating PG request",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });

    }
};

