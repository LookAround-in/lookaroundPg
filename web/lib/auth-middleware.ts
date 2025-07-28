import { NextRequest, NextResponse } from "next/server";
import { authClient } from "./auth-client";
import { Session, UserRole } from "@/interfaces/session";

export async function withAuth(
  handler: (req: Request) => Promise<NextResponse>,
  requiredRole?: UserRole
) {
  return async (req: NextRequest) => {
    try {
      const session = (await authClient.getSession(req)) as unknown as Session;
      const userRole = session?.user?.role;
      if (requiredRole && userRole !== requiredRole) {
        return NextResponse.json(
          { success: false, message: "Forbidden: Insufficient permissions" },
          { status: 403 }
        );
      }

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
  withAuth(handler, UserRole.ADMIN);

export const isHost = (handler: (req: Request) => Promise<NextResponse>) =>
  withAuth(handler, UserRole.HOST);

export const isUser = (handler: (req: Request) => Promise<NextResponse>) =>
  withAuth(handler, UserRole.USER);
