import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import {
  mockScan,
  mockScanList,
  mockVulnerabilities,
} from "@/server/mocks/scans";

export const scansRouter = createTRPCRouter({
  getLastScan: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(({ input }) => {
      // Generate a deterministic last scan date based on project ID
      const projectIdSum = input.projectId
        .split("-")
        .map((part) => parseInt(part, 16))
        .reduce((a, b) => a + b, 0);

      // Use the project ID to generate a date within the last 30 days
      const daysAgo = projectIdSum % 30;
      const lastScanDate = new Date();
      lastScanDate.setDate(lastScanDate.getDate() - daysAgo);

      return {
        lastScanDate: lastScanDate.toISOString(),
      };
    }),

  getById: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        scanId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // TODO: Replace with actual database query
      return mockScan;
    }),

  getVulnerabilities: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        scanId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // TODO: Replace with actual database query
      // In a real implementation, we would filter vulnerabilities by scan ID
      return mockVulnerabilities;
    }),

  getScans: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // TODO: Replace with actual database query
      return mockScanList;
    }),
});
