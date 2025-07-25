import prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const { userId } = await params;

        // Validate userId
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "userId is required"
            }, { status: 400 });
        }

        // Fetch the wishlist for the user
        const wishListItems = await prisma.wishList.findMany({
            where: { userId: userId },
            include: {
                pgData: true // Include related pgData information
            }
        });

        return NextResponse.json({
            success: true,
            data: wishListItems
        }, { status: 200 });
    } catch (error) {
        console.error("Error in GET route:", error);
        return NextResponse.json({
            success: false,
            message: "Error fetching wishlist",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}