import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";
import { env } from "@/env";
import { scans } from "@/server/db/schema/scan";
import { desc, eq, and } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { projects } from "@/server/db/schema/projects";
import { ScanJob, scanQueue } from "@/server/redis";

export const scansRouter = createTRPCRouter({
  getLastScan: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      // First verify project ownership
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.projectId),
            eq(projects.userId, ctx.session?.user.id),
          ),
        )
        .limit(1);

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found or you don't have access to it",
        });
      }

      const [lastScan] = await ctx.db
        .select({
          startedAt: scans.startedAt,
        })
        .from(scans)
        .where(eq(scans.projectId, input.projectId))
        .orderBy(desc(scans.startedAt))
        .limit(1);

      if (!lastScan) {
        return { lastScanDate: null };
      }

      return {
        lastScanDate: lastScan.startedAt.toISOString(),
      };
    }),

  getById: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        scanId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Join with projects to verify ownership
      const [scan] = await ctx.db
        .select({
          scan: scans,
        })
        .from(scans)
        .innerJoin(projects, eq(scans.projectId, projects.id))
        .where(
          and(
            eq(scans.id, input.scanId),
            eq(scans.projectId, input.projectId),
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

      return scan.scan;
    }),

  getScans: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Join with projects to verify ownership and get scans
      const items = await ctx.db
        .select({
          scan: scans,
        })
        .from(scans)
        .innerJoin(projects, eq(scans.projectId, projects.id))
        .where(
          and(
            eq(scans.projectId, input.projectId),
            eq(projects.userId, ctx.session?.user.id),
          ),
        )
        .orderBy(desc(scans.startedAt));

      return items.map((item) => item.scan);
    }),

  createScan: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Verify project exists and user has access
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(
          and(
            eq(projects.id, input.projectId),
            eq(projects.userId, ctx.session?.user.id),
          ),
        )
        .limit(1);

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found or you don't have access to it",
        });
      }

      // Create scan record
      const [scan] = await ctx.db
        .insert(scans)
        .values({
          projectId: project.id,
          targetUrls: [project.targetUrl],
          status: "pending",
          startedAt: new Date(),
        })
        .returning();

      if (!scan) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create scan",
        });
      }

      // Queue the scan job
      const scanJob: ScanJob = {
        scanId: scan.id,
        request: {
          targetUrls: [project.targetUrl],
        },
      };

      await scanQueue.add(env.REDIS_SCAN_QUEUE_NAME, scanJob);

      return scan;
    }),
});
