import { NextResponse } from "next/server";
import { pgController } from "../route";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const result = await pgController.updatePg(request, id);
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

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const result = await pgController.deletePg(request, id);
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