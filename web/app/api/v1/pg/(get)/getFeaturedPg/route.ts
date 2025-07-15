import { NextResponse } from "next/server";
import { PgController } from "../../pgController";
const pgController = new PgController();

export async function GET(request: Request, response: Response, next) {
    return pgController.getFeaturedPgs(request, response, next);
}