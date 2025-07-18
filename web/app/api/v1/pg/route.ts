import { NextResponse } from "next/server";
import { PgController } from "./pgController";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import formidable from "formidable";
import { Readable } from "stream";
import { PgData } from "@/interfaces/pg";

export const pgController = new PgController();

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: Request) {
  try {
    const form = formidable({ multiples: true });
    const req = (request as any).req || request;
    const formData = await new Promise<{ fields: any; files: any }>(
      (resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    const imageUrls: string[] = [];
    const images = formData.files.images;
    if (images) {
      const imageFiles = Array.isArray(images) ? images : [images];
      for (const file of imageFiles) {
        const buffer = await fileToBuffer(file);
        const url = await uploadImageToCloudinary(
          buffer,
          file.originalFilename || file.newFilename
        );
        imageUrls.push(url);
      }
    }

    const pgData: Partial<PgData> = {
      ...formData.fields,
      images: imageUrls,
      furnitures: parseJsonField(formData.fields.furnitures),
      amenities: parseJsonField(formData.fields.amenities),
      sharingTypes: parseJsonField(formData.fields.sharingTypes),
      latitude: parseFloat(formData.fields.latitude),
      longitude: parseFloat(formData.fields.longitude),
      foodIncluded: formData.fields.foodIncluded === "true",
      rating: formData.fields.rating ? parseFloat(formData.fields.rating) : 0,
      reviews: parseJsonField(formData.fields.reviews) || [],
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
}

function parseJsonField(field: any) {
  if (!field) return [];
  try {
    return typeof field === "string" ? JSON.parse(field) : field;
  } catch {
    return [];
  }
}

async function fileToBuffer(file: any): Promise<Buffer> {
  if (file.buffer) return file.buffer;
  const stream = file.filepath
    ? (await import('fs')).createReadStream(file.filepath)
    : file;
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
