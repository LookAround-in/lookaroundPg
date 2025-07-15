import { PrismaClient } from "generated/prisma";
import { NextResponse } from "next/server";
import prisma from "lib/Prisma";

export class PgController {
    // initialize pgservice

    constructor() {
        const PrismaClient = prisma;
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