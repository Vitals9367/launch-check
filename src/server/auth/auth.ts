import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";

import { db } from "@/server/db";
import { config } from "./auth.config";

// Prisma does not work on edge runtime,
// so we are setting up it here instead of auth.config.ts
export const authConfig = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...config,
} satisfies NextAuthConfig;
