import { NextRequest, NextResponse } from "next/server";
import { PgRequestController } from "./pgrequest.controller";
import { requireUser } from "@/lib/auth-middleware";

export const pgRequestController = new PgRequestController();

export const POST = async (request: NextRequest) => {
    try {

        // checking if the user is Logged in or not
        const authResult = await requireUser(request);
        if (authResult.error) {
            return authResult.error;
        }
        // const user = authResult.user;

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

