"use server";

import { env } from "@/env";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import { Resend } from "resend";
import WaitlistWelcomeEmail from "@/emails/waitlist-welcome";

const resend = new Resend(env.RESEND_API_KEY);

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

    // Send welcome email using Resend
    try {
      await resend.emails.send({
        from: `${env.EMAIL_SENDER_NAME} <${env.EMAIL_SENDER_EMAIL}>`,
        to: [email],
        subject: "Welcome to LaunchCheck Waitlist! 🚀",
        react: WaitlistWelcomeEmail({ name }),
      });
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError);
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
