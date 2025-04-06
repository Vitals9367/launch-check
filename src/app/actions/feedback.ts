"use server";

import { db } from "@/server/db";
import { Prisma } from "@prisma/client";

export async function giveFeedback({
  name,
  email,
  feedback,
}: {
  name: string;
  email: string;
  feedback: string;
}) {
  try {
    // Save to database
    await db.feedback.create({
      data: {
        name,
        email,
        feedback,
      },
    });

    return {
      success: true,
      message: "Successfully submitted feedback",
    };
  } catch (error) {
    // Check for Prisma unique constraint error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          message: "This email is already on the waitlist",
        };
      }
    }

    console.error("Feedback submission error:", error);
    return {
      success: false,
      message: "Failed to submit feedback. Please try again.",
    };
  }
}
