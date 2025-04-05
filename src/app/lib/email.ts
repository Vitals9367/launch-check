import axios from "axios";
import { env } from "@/env";

interface SendEmailParams {
  to: string;
  subject: string;
  htmlContent: string;
  toName?: string;
}

export async function sendEmail({
  to,
  subject,
  htmlContent,
  toName,
}: SendEmailParams) {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: env.BREVO_SENDER_NAME,
          email: env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: to,
            name: toName || to,
          },
        ],
        subject,
        htmlContent,
      },
      {
        headers: {
          "api-key": env.BREVO_API_KEY,
          "content-type": "application/json",
          accept: "application/json",
        },
      },
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

export function generateWelcomeEmailHtml(name: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .content {
            margin-bottom: 30px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to LaunchCheck!</h1>
          </div>
          <div class="content">
            <p>Hi ${name.charAt(0).toUpperCase() + name.slice(1)},</p>
            <p>Thank you for joining the LaunchCheck waitlist! We're excited to have you on board.</p>
            <p>As a fellow indie hacker, I built LaunchCheck to help make security scanning simple and accessible for micro-SaaS businesses. You'll be among the first to know when we launch.</p>
            <p>In the meantime, if you have any questions or suggestions, feel free to reach out to me by replying to this email.</p>
            <p>Best regards,<br>Vitalijus<br>Founder, LaunchCheck</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} LaunchCheck. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
