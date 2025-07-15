import { PrismaClient } from "generated/prisma";
import { NextResponse } from "next/server";
const prismaClient = new PrismaClient(); // TODO : initialize prisma once and reuse everywhere

export class PgController {
    // initialize pgservice

    constructor() {
        const prisma = prismaClient;
        // this.pgService = new PgService(prisma);
    }

    getFeaturedPgs = async (req, res, next) => {
        // some logic to get featured pgs
        return NextResponse.json({
            success: true,
            message: "This is a protected route",
        }, { status: 200 });
    }

}