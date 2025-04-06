"use server";

import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import { sendEmail, generateWelcomeEmailHtml } from "@/lib/email";

// Server action for waitlist submission
export async function joinWaitlist({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  try {
    // Save to database
    await db.waitlistEntry.create({
      data: {
        name,
        email,
      },
    });

    // Send welcome email
    const emailResult = await sendEmail({
      to: email,
      toName: name,
      subject: "Welcome to LaunchCheck Waitlist!",
      htmlContent: generateWelcomeEmailHtml(name),
    });

    if (!emailResult.success) {
      console.error("Failed to send welcome email:", emailResult.error);
      // We don't want to fail the whole operation if just the email fails
      // The user is still successfully added to the waitlist
    }

    return {
      success: true,
      message: "Successfully joined the waitlist! We'll be in touch soon.",
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

    console.error("Waitlist submission error:", error);
    return {
      success: false,
      message: "Failed to join waitlist. Please try again.",
    };
  }
}
