import prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";


// Helper function to calculate and update PG rating whenever a review is created, updated, or deleted
async function updatePgRating(pgDataId: string, tx?:  Omit<typeof prisma, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) {
    const prismaClient = tx || prisma;

    const result = await prismaClient.review.aggregate({
        where: { pgDataId },
        _avg: { rating: true },
        _count: { rating: true },
    });

    const avgRating = result._avg.rating;
    const reviewCount = result._count.rating;

    console.log(`Updating PG ${pgDataId}: avgRating=${avgRating}, reviewCount=${reviewCount}`);

    await prismaClient.pgData.update({
        where: { id: pgDataId },
        data: {
            avgRating: avgRating, // This will be null if no reviews exist
            reviewCount: reviewCount,
        },
    });

    return { avgRating, reviewCount };
}

export const POST = async (request: Request) => {
    try {
        // get userId, pgDataId, rating, comment from request body
        const body = await request.json();
        const { userId, pgDataId, rating, comment } = body;

        // check if userId and pgDataId are valid
        if (!userId || !pgDataId) {
            return NextResponse.json({
                success: false,
                message: "userId and pgDataId are required"
            }, { status: 400 });
        }

        // check if rating is between 1 and 5
        if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
            return NextResponse.json({
                success: false,
                message: "Rating must be an integer between 1 and 5"
            }, { status: 400 });
        }

        // check if comment is not empty
        if (!comment || comment.trim().length === 0) {
            return NextResponse.json({
                success: false,
                message: "Comment cannot be empty"
            }, { status: 400 });
        }

        // Verify that user and pgData exist
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
                message: "PG property not found"
            }, { status: 404 });
        }

        // Check if user has already reviewed this property
        const existingReview = await prisma.review.findFirst({
            where: {
                userId: userId,
                pgDataId: pgDataId
            }
        });

        if (existingReview) {
            return NextResponse.json({
                success: false,
                message: "You have already reviewed this property"
            }, { status: 409 });
        }

        // Use transaction to ensure data consistency
        const result = await prisma.$transaction(async (tx) => {
            // Create the review
            const newReview = await tx.review.create({
                data: {
                    userId: userId,
                    pgDataId: pgDataId,
                    rating: rating,
                    comment: comment.trim()
                }
            });

            // Update PG rating and count
            const { avgRating, reviewCount } = await updatePgRating(pgDataId, tx);

            return { newReview, avgRating, reviewCount };
        });

        return NextResponse.json({
            success: true,
            message: "Review created successfully",
            data: result
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}

export const PUT = async (request: Request) => {
    try {
        // get reviewId, rating, comment from request body
        const body = await request.json();
        const { reviewId, rating, comment, userId } = body;

        // check if reviewId is valid
        if (!reviewId) {
            return NextResponse.json({
                success: false,
                message: "reviewId is required"
            }, { status: 400 });
        }

        // check if rating is between 1 and 5
        if (!rating || rating < 1 || rating > 5 || !Number.isInteger(rating)) {
            return NextResponse.json({
                success: false,
                message: "Rating must be an integer between 1 and 5"
            }, { status: 400 });
        }

        // check if comment is not empty
        if (!comment || comment.trim().length === 0) {
            return NextResponse.json({
                success: false,
                message: "Comment cannot be empty"
            }, { status: 400 });
        }

        // Verify that review exists
        const existingReview = await prisma.review.findUnique({
            where: { id: reviewId }
        });

        if (!existingReview) {
            return NextResponse.json({
                success: false,
                message: "Review not found"
            }, { status: 404 });
        }

        // Check if the user owns this review (optional security check)
        if (userId && existingReview.userId !== userId) {
            return NextResponse.json({
                success: false,
                message: "You can only update your own reviews"
            }, { status: 403 });
        }

        // Use transaction to ensure data consistency
        const result = await prisma.$transaction(async (tx) => {
            // Update the review
            const updatedReview = await tx.review.update({
                where: { id: reviewId },
                data: {
                    rating: rating,
                    comment: comment.trim(),
                    updatedAt: new Date()
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            image: true
                        }
                    }
                }
            });

            // Update PG rating and count
            await updatePgRating(existingReview.pgDataId, tx);

            return updatedReview;
        });

        return NextResponse.json({
            success: true,
            message: "Review updated successfully",
            data: result
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating review:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}

export const DELETE = async (request: Request) => {
    try {
        // get reviewId, userId from request body
        const body = await request.json();
        const { reviewId, userId } = body;

        // check if reviewId is valid
        if (!reviewId) {
            return NextResponse.json({
                success: false,
                message: "reviewId is required"
            }, { status: 400 });
        }

        // check if userId is valid
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "userId is required"
            }, { status: 400 });
        }

        // Verify that review exists
        const existingReview = await prisma.review.findUnique({
            where: { id: reviewId }
        });

        if (!existingReview) {
            return NextResponse.json({
                success: false,
                message: "Review not found"
            }, { status: 404 });
        }

        // check if userId is valid and review.userId matches the review's userId
        if (existingReview.userId !== userId) {
            return NextResponse.json({
                success: false,
                message: "You can only delete your own reviews"
            }, { status: 403 });
        }

        // Use transaction to ensure data consistency
        await prisma.$transaction(async (tx) => {
            // Delete the review
            await tx.review.delete({
                where: { id: reviewId }
            });

            // Update PG rating and count
            await updatePgRating(existingReview.pgDataId, tx);
        });

        return NextResponse.json({
            success: true,
            message: "Review deleted successfully"
        }, { status: 200 });

    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}