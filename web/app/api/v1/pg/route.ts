import { NextRequest, NextResponse } from "next/server";
import { PgController } from "./pgController";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import {
  PgData,
  PropertyType,
  FurnishingType,
  MoveInStatus,
  FurnitureType,
} from "@/interfaces/pg";

export const pgController = new PgController();

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();

    const imageUrls: string[] = [];
    const images = formData.getAll("images") as File[];

    if (images && images.length > 0) {
      for (const file of images) {
        if (file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const url = await uploadImageToCloudinary(buffer, file.name);
          imageUrls.push(url);
        }
      }
    }

    const getFormField = (name: string): string => {
      const value = formData.get(name);
      return value ? value.toString() : "";
    };

    function parseJsonField<T = unknown>(fieldName: string): T[] {
      const field = getFormField(fieldName);
      if (!field) return [];
      try {
        return JSON.parse(field) as T[];
      } catch {
        return [];
      }
    }

    function parseNumber(fieldName: string, defaultValue: number = 0): number {
      const field = getFormField(fieldName);
      if (!field) return defaultValue;
      const parsed = parseFloat(field);
      return isNaN(parsed) ? defaultValue : parsed;
    }

    const pgData: Partial<PgData> = {
      title: getFormField("title"),
      hostId: getFormField("hostId"),
      description: getFormField("description"),
      propertyType: getFormField("propertyType") as PropertyType,
      foodIncluded: getFormField("foodIncluded") === "true",
      furnishing: getFormField("furnishing") as FurnishingType,
      address: getFormField("address"),
      latitude: parseNumber("latitude"),
      longitude: parseNumber("longitude"),
      furnitures: parseJsonField<FurnitureType>("furnitures"),
      amenities: parseJsonField("amenities"),
      sharingTypes: parseJsonField("sharingTypes"),
      pgRules: getFormField("pgRules"),
      moveInStatus: getFormField("moveInStatus") as MoveInStatus,
      virtualTourUrl: getFormField("virtualTourUrl"),
      images: imageUrls,
      rating: parseNumber("rating"),
      reviews: parseJsonField("reviews"),
    };

    const result = await pgController.createPg(pgData);
    return result;
  } catch (error) {
    console.error("Error in POST route:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error creating PG",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
