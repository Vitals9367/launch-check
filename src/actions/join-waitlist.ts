"use server";

import { env } from "@/env";
import { db } from "@/server/db/db";
import { resend } from "@/server/email";
import { waitlistEntry } from "@/server/db/schema/waitlist";
import { eq } from "drizzle-orm";

import WaitlistWelcomeEmail from "@/emails/waitlist-welcome";

export async function joinWaitlist({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  try {
    const entry = await db
      .select()
      .from(waitlistEntry)
      .where(eq(waitlistEntry.email, email));

    if (entry.length > 0) {
      return {
        success: false,
        message: "This email is already on the waitlist",
      };
    }

    await db.insert(waitlistEntry).values({
      name,
      email,
    });

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
    console.error("Waitlist submission error:", error);
    return {
      success: false,
      message: "Failed to join waitlist. Please try again.",
    };
  }
}
