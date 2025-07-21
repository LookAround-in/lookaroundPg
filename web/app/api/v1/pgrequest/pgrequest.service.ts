
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

            const newPgRequest = await this.prismaClient.pgRequest.create({
                data: requestData,
            });

            return newPgRequest;
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

            return pgRequests;

        } catch (error) {
            console.error("Error fetching PG requests by host ID:", error);
            return NextResponse.json({
                success: false,
                message: "Error fetching PG requests",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    async acceptPgRequest(pgrequestId: string) {
        try {
            const updatedPgRequest = await this.prismaClient.pgRequest.update({
                where: { id: pgrequestId },
                data: { status: "ACCEPTED" },
            });
            console.log(updatedPgRequest);

            return updatedPgRequest;
        } catch (error) {
            console.error("Error accepting PG request:", error);
            return NextResponse.json({
                success: false,
                message: "Error accepting PG request",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    async rejectPgRequest(pgrequestId: string) {
        try {
            console.log(pgrequestId + " is the id of the pg request to be rejected");

            const updatedPgRequest = await this.prismaClient.pgRequest.update({
                where: { id: pgrequestId },
                data: { status: "REJECTED" },
            });

            console.log("Updated PG Request:", updatedPgRequest);

            return updatedPgRequest;
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
