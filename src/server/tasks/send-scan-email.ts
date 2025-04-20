import { Job } from "bullmq";
import { env } from "@/env";
import { ScanCompleteEmail } from "@/components/emails/scan-complete-email";
import {
  getProjectWithOwner,
  getScanFindings,
  getScanForProject,
} from "@/server/utils/scan-queries";
import { calculateVulnerabilityStats } from "@/server/utils/vulnerability-stats";
import { resend } from "../email";

export interface SendScanEmailData {
  scanId: string;
  projectId: string;
}

export async function sendScanEmail(job: Job<SendScanEmailData>) {
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
}
