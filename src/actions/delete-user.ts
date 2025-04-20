"use server";

import { db } from "@/server/db/db";
import { users } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";

export async function deleteUser(userId: string) {
  try {
    await db.delete(users).where(eq(users.id, userId));
  } catch (error) {
    console.error("Scan error:", error);
    return { error: "Failed to process scan request" };
  }
}
