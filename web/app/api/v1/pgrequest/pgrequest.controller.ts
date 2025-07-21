import { NextResponse } from "next/server";
import { PgRequestServices } from "./pgrequest.service";

export class PgRequestController {
    private pgService: PgRequestServices;

    constructor() {
        this.pgService = new PgRequestServices();
    }

    async createPgRequest(req: Request) { }

    async updatePgRequest(req: Request, id: string) { }

    async deletePgRequest(req: Request, id: string) { }

    async getPgRequestByHostId(req: Request, hostId: string) { }

    async acceptPgRequest(req: Request, pgId: string, hostId: string) { }

    async rejectPgRequest(req: Request, pgId: string, hostId: string) { }

}
