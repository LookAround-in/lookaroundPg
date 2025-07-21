import { NextRequest, NextResponse } from "next/server";
import { PgRequestController } from "./pgrequest.controller";

export const pgRequestController = new PgRequestController();

export const POST = async (request: Request) => {

};

