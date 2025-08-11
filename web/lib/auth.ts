import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { expo } from "@better-auth/expo";

import { admin } from "better-auth/plugins/admin";
import z from "zod";


import prisma from "./Prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    // Basic scheme
    "myapp://",

    // Production & staging schemes
    "myapp-prod://",
    "myapp-staging://",

    // Wildcard support for all paths following the scheme
    "myapp://*"
  ],
  plugins: [admin(), nextCookies(), expo()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: true,
        validator: {
          input: z.enum(["user", "admin", "host", "super_admin"]).optional(),
          output: z.enum(["user", "admin", "host", "super_admin"]).optional(),
        },
      },
      phone: {
        type: "string",
        required: false,
        input: true,
        validator: {
          input: z.string()
            .length(10, "Phone number must be exactly 10 digits")
            .regex(/^\d{10}$/, "Phone number must contain only digits"),
          output: z.string(),
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },

  },
});

