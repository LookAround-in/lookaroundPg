import { NextResponse } from "next/server";
import { pgController } from "../../route";

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const pageParam = url.searchParams.get("page");
        const limitParam = url.searchParams.get("limit");
        const searchParam = url.searchParams.get("search");
        const page = pageParam ? parseInt(pageParam, 10) : 1;
        const limit = limitParam ? parseInt(limitParam, 10) : 12;
        const search = searchParam ? searchParam : undefined;

        if (!Number.isInteger(page) || page < 1) {
            return NextResponse.json(
                { message: 'Invalid page number. Must be a positive integer.' },
                { status: 400 }
            );
        }
        if (!Number.isInteger(limit) || limit < 1) {
            return NextResponse.json(
                { message: 'Invalid limit. Must be a positive integer.' },
                { status: 400 }
            );
        }
        const result = await pgController.getExplorePgs(request, page, limit, search);
        return result;
    } catch (error) {
        console.error("Error in getting explore pg's route:", error);
        return NextResponse.json({
            success: false,
            message: "Error getting explore PG's",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}