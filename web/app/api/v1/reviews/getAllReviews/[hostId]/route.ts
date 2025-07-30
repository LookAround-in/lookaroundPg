import { NextResponse } from "next/server";
import prisma from "@/lib/Prisma";

export async function GET(request: Request, { params }: { params: Promise<{ hostId: string}>}){
    try {
        const { hostId } = await params;
        if (!hostId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Host ID is required",
                },
                { status: 400 }
            );
        }

        // Single query to get all reviews for properties owned by the host
        const reviews = await prisma.review.findMany({
            where: {
                pgData: {
                    hostId: hostId
                }
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    }
                },
                pgData: {
                    select: {
                        id: true,
                        title: true,
                        hostId: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Reviews fetched successfully",
                data: reviews,
                totalReviews: reviews.length,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in getting reviews by hostId", error);
        return NextResponse.json({
            success: false,
            message: "Error in getting reviews by hostId",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}