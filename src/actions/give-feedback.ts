"use server";

import { db } from "@/server/db/db";
import { feedback as feedbackTable } from "@/server/db/schema/feedback";

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
    await db.insert(feedbackTable).values({
      name,
      email,
      feedback,
    });

    return {
      success: true,
      message: "Successfully submitted feedback",
    };
  } catch (error) {
    console.error("Feedback submission error:", error);
    return {
      success: false,
      message: "Failed to submit feedback. Please try again.",
    };
  }
}
