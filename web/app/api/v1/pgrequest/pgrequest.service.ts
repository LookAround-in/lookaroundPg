
import prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";

export class PgRequestServices {
    private prismaClient;

    constructor() {
        this.prismaClient = prisma;
    }

    async createPgRequest(requestData) {
        try {
            if (!requestData) {
                return NextResponse.json({
                    success: false,
                    message: "Request data is required",
                }, { status: 400 });
            }
            console.log(this.prismaClient.pgRequest);

            const newPgRequest = await this.prismaClient.pgRequest.create({
                data: requestData,
            });

            return NextResponse.json({
                success: true,
                message: "PG request created successfully",
                data: newPgRequest,
            }, { status: 201 });
        } catch (error) {
            console.error("Error creating PG request:", error);
            return NextResponse.json({
                success: false,
                message: "Error creating PG request",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    async updatePgRequest() { }  // Not required according to our current frontend design

    async deletePgRequest() { }  // Not required according to our current frontend design

    async getPgRequestByHostId(hostId: string) {
        try {
            const pgRequests = await this.prismaClient.pgRequest.findMany({
                where: {
                    hostId: hostId,
                },
            });

            return NextResponse.json({
                success: true,
                data: pgRequests,
            }, { status: 200 });
        } catch (error) {
            console.error("Error fetching PG requests by host ID:", error);
            return NextResponse.json({
                success: false,
                message: "Error fetching PG requests",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    async acceptPgRequest(pgId: string, hostId: string) { 
        try {
            const updatedPgRequest = await this.prismaClient.pgRequest.update({
                where: { id: pgId },
                data: { status: "ACCEPTED", hostId: hostId },
            });

            return NextResponse.json({
                success: true,
                message: "PG request accepted successfully",
                data: updatedPgRequest,
            }, { status: 200 });
        } catch (error) {
            console.error("Error accepting PG request:", error);
            return NextResponse.json({
                success: false,
                message: "Error accepting PG request",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    async rejectPgRequest(pgId: string, hostId: string) {
        try {
            const updatedPgRequest = await this.prismaClient.pgRequest.update({
                where: { id: pgId },
                data: { status: "REJECTED", hostId: hostId },
            });

            return NextResponse.json({
                success: true,
                message: "PG request rejected successfully",
                data: updatedPgRequest,
            }, { status: 200 });
        } catch (error) {
            console.error("Error rejecting PG request:", error);
            return NextResponse.json({
                success: false,
                message: "Error rejecting PG request",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
     }
}
