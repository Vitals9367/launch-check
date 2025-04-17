import { Queue } from "bullmq";
import { env } from "@/env";

export interface ScanJob {
  scanId: string;
  request: {
    targetUrls: string[];
  };
}

const redisConnection = {
  connection: {
    url: env.REDIS_URL,
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
