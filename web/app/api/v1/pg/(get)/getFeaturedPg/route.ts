import { NextResponse } from "next/server";
import { pgController } from "../../route";

export async function GET(request: Request, response: Response, next) {
    return pgController.getFeaturedPgs(request, response, next);
}