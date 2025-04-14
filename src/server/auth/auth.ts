import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { type NextAuthConfig } from "next-auth";

import { db } from "@/server/db/db";
import { config } from "./auth.config";
import posthog from "posthog-js";
import { users } from "@/server/db/schema/users";
import { sessions } from "@/server/db/schema/sessions";
import { verificationTokens } from "@/server/db/schema/verificationTokens";
import { accounts } from "@/server/db/schema/accounts";

// Prisma does not work on edge runtime,
// so we are setting up it here instead of auth.config.ts
export const authConfig = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" },
  callbacks: {
    session: ({ token, session }) => {
      posthog.identify(token.sub, {
        email: token.email,
        name: token.name,
      });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: ({ token }) => {
      return token;
    },
  },
  ...config,
} satisfies NextAuthConfig;
