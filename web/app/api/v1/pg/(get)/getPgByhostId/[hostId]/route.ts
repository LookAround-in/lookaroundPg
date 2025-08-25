import { NextResponse } from "next/server";
import pgController  from "../../../pgController";

export async function GET(request: Request, { params }: { params: Promise<{ hostId: string }> }) {
    try {
        const { hostId } = await params;

        const result = await pgController.getPgsByHostId(request, hostId);
        return result;
    } catch (error) {
        console.error("Error in getting pg by hostId", error);
        return NextResponse.json({
            success: false,
            message: "Error in getting pg by hostId",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}