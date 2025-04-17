import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { scanFindings } from "@/server/db/schema/scan-finding";
import { scans } from "@/server/db/schema/scan";
import { projects } from "@/server/db/schema/projects";
import { eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const findingsRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(
      z.object({
        findingId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Join with scans and projects to verify ownership
      const [finding] = await ctx.db
        .select({
          finding: scanFindings,
          projectId: scans.projectId,
          userId: projects.userId,
        })
        .from(scanFindings)
        .innerJoin(scans, eq(scanFindings.scanId, scans.id))
        .innerJoin(projects, eq(scans.projectId, projects.id))
        .where(
          and(
            eq(scanFindings.id, input.findingId),
            eq(projects.userId, ctx.session?.user.id),
          ),
        )
        .limit(1);

      if (!finding) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Finding not found or you don't have access to it",
        });
      }

      return finding.finding;
    }),

  getByScanId: protectedProcedure
    .input(z.object({ scanId: z.string() }))
    .query(async ({ ctx, input }) => {
      // First verify the user has access to this scan
      const [scan] = await ctx.db
        .select()
        .from(scans)
        .innerJoin(projects, eq(scans.projectId, projects.id))
        .where(
          and(
            eq(scans.id, input.scanId),
            eq(projects.userId, ctx.session?.user.id),
          ),
        )
        .limit(1);

      if (!scan) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Scan not found or you don't have access to it",
        });
      }

      // Now get the findings
      const findings = await ctx.db
        .select({
          finding: scanFindings,
        })
        .from(scanFindings)
        .where(eq(scanFindings.scanId, input.scanId));

      return findings.map((f) => f.finding);
    }),
});
