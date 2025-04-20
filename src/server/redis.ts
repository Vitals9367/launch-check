import { Queue, Worker, Job } from "bullmq";
import { env } from "@/env";
import { sendScanEmail, SendScanEmailData } from "./tasks/send-scan-email";

export interface ScanJob {
  scanId: string;
  request: {
    targetUrls: string[];
  };
}

const redisConnection = {
  connection: {
    url: env.REDIS_URL,
    tls: {},
  },
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
};

export const scanQueue = new Queue(env.REDIS_SCAN_QUEUE_NAME, redisConnection);

export const emailWorker = new Worker<SendScanEmailData>(
  env.REDIS_SCAN_NOTIFICATION_QUEUE_NAME,
  sendScanEmail,
  redisConnection,
);

emailWorker.on("completed", (job: Job<SendScanEmailData>) => {
  console.log(`Email sent successfully for scan ${job.data.scanId}`);
});

emailWorker.on(
  "failed",
  (job: Job<SendScanEmailData> | undefined, err: Error) => {
    console.error(
      `Failed to send email for scan ${job?.data.scanId}:`,
      err.message,
    );
  },
);
