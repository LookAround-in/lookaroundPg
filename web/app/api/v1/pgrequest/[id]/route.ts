import { NextRequest, NextResponse } from "next/server";
import pgRequestController from "../pgrequest.controller"; 

import { requireHost } from "@/lib/auth-middleware";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        // checking if the user is (Host or Admin) or not
        const authResult = await requireHost(request);
        if (authResult.error) {
            return authResult.error;
        }
        // const user = authResult.user;

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
