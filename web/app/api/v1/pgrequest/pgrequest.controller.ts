import { NextResponse } from "next/server";
import { PgRequestServices } from "./pgrequest.service";
import { PgRequestData } from "@/interfaces/pg";

export class PgRequestController {
    private pgService: PgRequestServices;

    constructor() {
        this.pgService = new PgRequestServices();
    }

    async createPgRequest(req: Request) {
        try {
            const requestData: PgRequestData = await req.json();

            if (!requestData) {
                return NextResponse.json({
                    success: false,
                    message: "Request data is required",
                }, { status: 400 });
            }

            const newPgRequest = await this.pgService.createPgRequest(requestData);

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

    async updatePgRequest(req: Request, id: string) { }

    async deletePgRequest(req: Request, id: string) { }

    async getPgRequestByHostId(req: Request, hostId: string) {
        try {
            const pgRequests = await this.pgService.getPgRequestByHostId(hostId);

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

    async acceptPgRequest(req: Request, pgrequestId: string) {
        try {
            const result = await this.pgService.acceptPgRequest(pgrequestId);
            return NextResponse.json({
                success: true,
                message: "PG request accepted successfully",
                data: result,
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

    async rejectPgRequest(req: Request, pgrequestId: string) {
        try {
            const result = await this.pgService.rejectPgRequest(pgrequestId);
            return NextResponse.json({
                success: true,
                message: "PG request rejected successfully",
                data: result,
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
