import prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
        // Get propertyId and userId from request body
        const body = await request.json();
        const { pgDataId, userId } = body;

        // Validation
        if (!pgDataId || !userId) {
            return NextResponse.json({
                success: false,
                message: "pgDataId and userId are required"
            }, { status: 400 });
        }

        // Check if the wishList entry already exists
        const existingWishListItem = await prisma.wishList.findUnique({
            where: {
                userId_pgDataId: {
                    userId: userId,
                    pgDataId: pgDataId
                }
            }
        });

        if (existingWishListItem) {
            // If exists, remove the wishList entry
            await prisma.wishList.delete({
                where: {
                    id: existingWishListItem.id
                }
            });

            return NextResponse.json({
                success: true,
                message: "Property removed from wishlist",
                action: "removed"
            }, { status: 200 });
        } else {
            // If doesn't exist, create a new wishList entry

            // First verify that the user and pgData exist
            const [userExists, pgDataExists] = await Promise.all([
                prisma.user.findUnique({ where: { id: userId } }),
                prisma.pgData.findUnique({ where: { id: pgDataId } })
            ]);

            if (!userExists) {
                return NextResponse.json({
                    success: false,
                    message: "User not found"
                }, { status: 404 });
            }

            if (!pgDataExists) {
                return NextResponse.json({
                    success: false,
                    message: "Property not found"
                }, { status: 404 });
            }

            const newWishListItem = await prisma.wishList.create({
                data: {
                    userId: userId,
                    pgDataId: pgDataId
                }
            });

            return NextResponse.json({
                success: true,
                message: "Property added to wishlist",
                action: "added",
                data: newWishListItem
            }, { status: 201 });
        }

    } catch (error) {
        console.error("Error in wishList POST route:", error);

        // Handle specific Prisma errors
        if (error instanceof Error) {
            if (error.message.includes('Foreign key constraint')) {
                return NextResponse.json({
                    success: false,
                    message: "Invalid user or property ID"
                }, { status: 400 });
            }
        }

        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
};