import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function requireAuth(req: NextRequest, requiredRoles?: string[]) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers
    });

    if (!session) {
      return {
        error: NextResponse.json(
          { success: false, message: "Authentication required" },
          { status: 401 }
        )
      };
    }

    if (requiredRoles && !requiredRoles.includes(session.user.role)) {
      return {
        error: NextResponse.json(
          { 
            success: false, 
            message: `Access denied. Required roles: ${requiredRoles.join(', ')}. Your role: ${session.user.role}` 
          },
          { status: 403 }
        )
      };
    }

    return { user: session.user };
  } catch (error) {
    console.error("Auth error:", error);
    return {
      error: NextResponse.json(
        { success: false, message: "Authentication error" },
        { status: 401 }
      )
    };
  }
}

export async function requireAdmin(req: NextRequest) {
  return requireAuth(req, ["admin"]);
}

export async function requireHost(req: NextRequest) {
  return requireAuth(req, ["host", "admin"]);
}

export async function requireUser(req: NextRequest) {
  return requireAuth(req, ["user", "host", "admin"]);
}