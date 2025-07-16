import { NextResponse } from "next/server";
import { PgServices } from "./pgServices";

export class PgController {
    private pgService: PgServices;

    constructor() {
        this.pgService = new PgServices();
    }

    createPg = async (req: Request) => {
        try {
            const body = await req.json();
            const pgData = body.pgData;
            
            if (!pgData) {
                return NextResponse.json({
                    success: false,
                    message: "Pg data is required"
                }, { status: 400 });
            }

            // Validate required fields
            if (!pgData.title || !pgData.hostId || !pgData.address) {
                return NextResponse.json({
                    success: false,
                    message: "Title, hostId, and address are required fields"
                }, { status: 400 });
            }

            if (!pgData.propertyType || !pgData.furnishing || !pgData.moveInStatus) {
                return NextResponse.json({
                    success: false,
                    message: "PropertyType, furnishing, and moveInStatus are required"
                }, { status: 400 });
            }

            if (typeof pgData.latitude !== 'number' || typeof pgData.longitude !== 'number') {
                return NextResponse.json({
                    success: false,
                    message: "Latitude and longitude must be valid numbers"
                }, { status: 400 });
            }

            const newPg = await this.pgService.createPg(pgData);
            
            return NextResponse.json({
                success: true,
                message: "Pg created successfully",
                data: newPg
            }, { status: 201 });
            
        } catch (error) {
            console.error("Error in createPg controller:", error);
            
            return NextResponse.json({
                success: false,
                message: "Failed to create Pg",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }

    getFeaturedPgs = async (req: Request) => {
        try {
            const featuredPgs = await this.pgService.getFeaturedPgs();
            
            return NextResponse.json({
                success: true,
                message: "Featured PGs fetched successfully",
                data: featuredPgs
            }, { status: 200 });
            
        } catch (error) {
            console.error("Error in getFeaturedPgs controller:", error);
            
            return NextResponse.json({
                success: false,
                message: "Failed to fetch featured PGs",
                error: error instanceof Error ? error.message : "Unknown error"
            }, { status: 500 });
        }
    }
}