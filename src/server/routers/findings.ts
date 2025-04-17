import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { scanFindings } from "@/server/db/schema/scan-finding";
import { eq } from "drizzle-orm";

export const findingsRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        findingId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [finding] = await ctx.db
        .select()
        .from(scanFindings)
        .where(eq(scanFindings.id, input.findingId))
        .limit(1);

      return finding;
    }),

  getByScanId: protectedProcedure
    .input(z.object({ scanId: z.string() }))
    .query(async ({ ctx, input }) => {
      const findings = await ctx.db
        .select()
        .from(scanFindings)
        .where(eq(scanFindings.scanId, input.scanId));

      return findings;
    }),
});
