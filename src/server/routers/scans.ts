import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

// Mock data for last scan dates (in a real app, this would come from a database)
const mockLastScanDates = new Map<string, string>();

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
});
