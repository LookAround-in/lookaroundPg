import { NextResponse } from "next/server";
import { pgController } from "../../../route";

export async function GET(request: Request, { params }: { params: Promise<{ pgId: string }> }) {
    try {
        const { pgId } = await params;

        const result = await pgController.getPgById(request, pgId);
        return result;
    } catch (error) {
        console.error("Error in getting pg by Id:", error);
        return NextResponse.json({
            success: false,
            message: "Error in getting pg by hostId",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}