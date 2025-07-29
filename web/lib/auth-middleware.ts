import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/lib/auth";

export async function withAuth(
  handler: (req: Request) => Promise<NextResponse>,
  requiredRole?: string
) {
  return async (req: NextRequest) => {
    try {
      // TODO :
      // Get the user role from the request
      // compare it with the required role
      // if(req.role !== requiredRole) return error
      // if (req.role === requiredRole) return handler(req);


      return handler(req);
    } catch (error) {
      console.error("Auth middleware error:", error);
      return NextResponse.json(
        { success: false, message: "Authentication error" },
        { status: 401 }
      );
    }
  };
}

export const isAdmin = (handler: (req: Request) => Promise<NextResponse>) =>

  withAuth(handler, "admin");

export const isHost = (handler: (req: Request) => Promise<NextResponse>) =>
  withAuth(handler, "host");

export const isUser = (handler: (req: Request) => Promise<NextResponse>) =>
  withAuth(handler, "user");

