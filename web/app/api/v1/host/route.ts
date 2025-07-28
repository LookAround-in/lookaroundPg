import prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const hosts = await prisma.hostProfile.findMany({
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

    return NextResponse.json({
      success: true,
      data: hosts
    }, { status: 200 });

  } catch (error) {
    console.error("Error fetching hosts:", error);
    return NextResponse.json({ error: "Failed to fetch hosts" }, { status: 500 });
  }
}