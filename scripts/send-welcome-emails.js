import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// List of emails to send to
const waitlistEntries = [];

// Email sending function
async function sendEmail({ to, subject, htmlContent, toName }) {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.BREVO_SENDER_NAME,
          email: process.env.BREVO_SENDER_EMAIL,
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
          "api-key": process.env.BREVO_API_KEY,
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

// Generate welcome email HTML
function generateWelcomeEmailHtml(name) {
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
            <p>Hi ${name},</p>
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

async function sendWelcomeEmails() {
  try {
    console.log(`Sending emails to ${waitlistEntries.length} recipients`);

    // Send emails one by one
    for (const entry of waitlistEntries) {
      console.log(`Sending welcome email to ${entry.email}...`);

      const emailResult = await sendEmail({
        to: entry.email,
        toName: entry.name,
        subject: "Welcome to LaunchCheck Waitlist!",
        htmlContent: generateWelcomeEmailHtml(entry.name),
      });

      if (emailResult.success) {
        console.log(`✓ Successfully sent email to ${entry.email}`);
      } else {
        console.error(
          `✗ Failed to send email to ${entry.email}:`,
          emailResult.error,
        );
      }

      // Add a small delay between emails to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log("Finished sending welcome emails!");
  } catch (error) {
    console.error("Error sending welcome emails:", error);
    process.exit(1);
  }

  process.exit(0);
}

// Run the script
sendWelcomeEmails();
