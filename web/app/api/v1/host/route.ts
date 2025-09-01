import { requireAdmin } from "@/lib/auth-middleware";
import prisma from "@/lib/Prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
  try {
    // checking if the user is Admin or not
    const authResult = await requireAdmin(request);
    if (authResult.error) {
      return authResult.error;
    }

    // const user = authResult.user;

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