import { NextResponse } from "next/server";
import { pgController } from "../route";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { PropertyType, FurnishingType, MoveInStatus, FurnitureType, AmenityType, SharingTypeDetails, PgCreateInput, NearbyFacility } from "@/interfaces/pg";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Handle FormData for image uploads
        const formData = await request.formData();
        const imageUrls: string[] = [];
        const images = formData.getAll("images") as File[];

        // Process new image uploads
        if (images && images.length > 0) {
            for (const file of images) {
                if (file.size > 0) {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const url = await uploadImageToCloudinary(buffer, file.name);
                    imageUrls.push(url);
                }
            }
        }

        // Helper functions for form data parsing
        const getFormField = (name: string): string | null => {
            const value = formData.get(name);
            return value ? value.toString() : null;
        };

        function parseJsonField<T = unknown>(fieldName: string): T[] | null {
            const value = getFormField(fieldName);
            if (!value) return null;
            try {
                return JSON.parse(value);
            } catch (error) {
                console.error(`Error parsing ${fieldName}:`, error);
                return null;
            }
        }

        function parseNumber(fieldName: string): number | null {
            const value = getFormField(fieldName);
            if (!value) return null;
            const parsed = parseFloat(value);
            return isNaN(parsed) ? null : parsed;
        }

        function parseBoolean(fieldName: string): boolean | null {
            const value = getFormField(fieldName);
            if (!value) return null;
            return value === "true";
        }

        // Build update data object - only include fields that are provided
        const pgUpdateData: Partial<PgCreateInput> = {};

        // Only add fields if they exist in formData

        const existingImagesJson = getFormField("existingImages");
        const existingImages = existingImagesJson ? JSON.parse(existingImagesJson) : [];

        const title = getFormField("title");
        if (title !== null) pgUpdateData.title = title;

        const hostId = getFormField("hostId");
        if (hostId !== null) pgUpdateData.hostId = hostId;

        const description = getFormField("description");
        if (description !== null) pgUpdateData.description = description;

        const propertyType = getFormField("propertyType");
        if (propertyType !== null) pgUpdateData.propertyType = propertyType as PropertyType;

        const foodIncluded = parseBoolean("foodIncluded");
        if (foodIncluded !== null) pgUpdateData.foodIncluded = foodIncluded;

        const furnishing = getFormField("furnishing");
        if (furnishing !== null) pgUpdateData.furnishing = furnishing as FurnishingType;

        const address = getFormField("address");
        if (address !== null) pgUpdateData.address = address;

        const latitude = parseNumber("latitude");
        if (latitude !== null) pgUpdateData.latitude = latitude;

        const longitude = parseNumber("longitude");
        if (longitude !== null) pgUpdateData.longitude = longitude;

        const city = getFormField("city");
        if (city !== null) pgUpdateData.city = city;

        const furnitures = parseJsonField<FurnitureType>("furnitures");
        if (furnitures !== null) pgUpdateData.furnitures = furnitures;

        const amenities = parseJsonField<AmenityType>("amenities");
        if (amenities !== null) pgUpdateData.amenities = amenities;

        const sharingTypes = parseJsonField<SharingTypeDetails>("sharingTypes");
        if (sharingTypes !== null) pgUpdateData.sharingTypes = sharingTypes;

        const nearbyFacilities = parseJsonField<NearbyFacility>("nearbyFacilities");
        if (nearbyFacilities !== null) pgUpdateData.nearbyFacilities = nearbyFacilities;

        const pgRules = getFormField("pgRules");
        if (pgRules !== null) pgUpdateData.pgRules = pgRules;

        const moveInStatus = getFormField("moveInStatus");
        if (moveInStatus !== null) pgUpdateData.moveInStatus = moveInStatus as MoveInStatus;

        const virtualTourUrl = getFormField("virtualTourUrl");
        if (virtualTourUrl !== null) pgUpdateData.virtualTourUrl = virtualTourUrl;

        // Handle images - only update if images are provided
        if (existingImages.length > 0 || imageUrls.length > 0) {
            const allImages = [...existingImages, ...imageUrls];
            pgUpdateData.images = allImages;
        }

        const result = await pgController.updatePg(pgUpdateData, id);
        return result;
    } catch (error) {
        console.error("Error in PUT route:", error);
        return NextResponse.json({
            success: false,
            message: "Error updating PG",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        const result = await pgController.deletePg(request, id);
        return result;
    } catch (error) {
        console.error("Error in DELETE route:", error);
        return NextResponse.json({
            success: false,
            message: "Error deleting PG",
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}