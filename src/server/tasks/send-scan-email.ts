import { Worker, Job } from "bullmq";
import { Resend } from "resend";
import { env } from "@/env";
import { ScanCompleteEmail } from "@/components/emails/scan-complete-email";
import {
  getProjectWithOwner,
  getScanFindings,
  getScanForProject,
} from "@/server/utils/scan-queries";
import { calculateVulnerabilityStats } from "@/server/utils/vulnerability-stats";

// Initialize Resend
const resend = new Resend(env.RESEND_API_KEY);

// Email job data type
interface SendScanEmailData {
  scanId: string;
  projectId: string;
}

// Create Redis connection for BullMQ
const connection = {
  url: env.REDIS_URL,
};

// Initialize worker
export const emailWorker = new Worker<SendScanEmailData>(
  env.REDIS_SCAN_NOTIFICATION_QUEUE_NAME,
  async (job: Job<SendScanEmailData>) => {
    const { scanId, projectId } = job.data;

    try {
      // Fetch project with owner
      const projectResult = await getProjectWithOwner(projectId);
      if (!projectResult?.project || !projectResult.owner?.email) {
        throw new Error(`Project ${projectId} not found or no owner email`);
      }

      // Fetch scan and verify it belongs to the project
      const scanResult = await getScanForProject(scanId, projectId);
      if (!scanResult?.scan) {
        throw new Error(
          `Scan ${scanId} not found or does not belong to project ${projectId}`,
        );
      }

      // Get all findings and calculate statistics
      const findings = await getScanFindings(scanId);
      const vulnerabilityStats = calculateVulnerabilityStats(findings);

      // Send email using Resend with React component
      await resend.emails.send({
        from: `${env.EMAIL_SENDER_NAME} <${env.EMAIL_SENDER_EMAIL}>`,
        to: projectResult.owner.email,
        subject: `Scan Complete: ${projectResult.project.name} - ${vulnerabilityStats.total} findings`,
        react: ScanCompleteEmail({
          projectName: projectResult.project.name,
          scanUrl: `${env.NEXT_PUBLIC_SITE_URL}/dashboard/projects/${projectId}/scans/${scanId}`,
          vulnerabilityStats,
          targetUrl: projectResult.project.targetUrl,
          completedAt: scanResult.scan.completedAt ?? new Date(),
        }),
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to send scan notification email:", error);
      throw error;
    }
  },
  {
    connection,
    concurrency: 5,
    limiter: {
      max: 50,
      duration: 60000,
    },
  },
);

// Handle worker events
emailWorker.on("completed", (job) => {
  console.log(`Email sent successfully for scan ${job.data.scanId}`);
});

emailWorker.on("failed", (job, err) => {
  console.error(
    `Failed to send email for scan ${job?.data.scanId}:`,
    err.message,
  );
});
