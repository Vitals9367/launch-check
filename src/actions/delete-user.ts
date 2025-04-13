"use server";

import { db } from "@/server/db";

export async function deleteUser(userId: string) {
  try {
    await db.user.delete({
      where: {
        id: userId,
      },
    });
  } catch (error) {
    console.error("Scan error:", error);
    return { error: "Failed to process scan request" };
  }
}
