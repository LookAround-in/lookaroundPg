
import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";
import type { auth } from "./auth";
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
});


const signIn = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
  });
};

export type User = typeof authClient.$Infer.Session.user;
