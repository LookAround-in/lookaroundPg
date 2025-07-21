import { NextResponse } from "next/server";
import { pgRequestController } from "../route";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const result = await pgRequestController.getPgRequestByHostId(request, id);
        return result;
    } catch (error) {
        console.error("Error in PUT route:", error);
        return NextResponse.json({
            success: false,
            message: "Error updating PG",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}
