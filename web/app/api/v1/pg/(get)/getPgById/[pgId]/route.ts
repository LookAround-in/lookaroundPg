import { NextResponse } from "next/server";
import { pgController } from "../../../route";

export async function GET(request: Request, { params }: { params: Promise<{ pgId: string }> }) {
    try {
        const { pgId } = await params;

        const result = await pgController.getPgById(request, pgId);
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