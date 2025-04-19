import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createInsertSchema } from "drizzle-zod";
import { projects } from "@/server/db/schema/projects";
import { scans } from "@/server/db/schema/scan";
import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";
import {
  calculateSecurityStats,
  getScanStatus,
} from "@/utils/scan-calculations";

const getProjectById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    const [project] = await ctx.db
      .select()
      .from(projects)
      .where(
        and(
          eq(projects.id, input.id),
          eq(projects.userId, ctx.session.user.id),
        ),
      )
      .limit(1);

    return project;
  });

const getProjectWithStatsById = protectedProcedure
  .input(z.object({ id: z.string() }))
  .query(async ({ ctx, input }) => {
    // Get the project with its latest scan
    const [projectWithScan] = await ctx.db
      .select({
        project: projects,
        latestScan: scans,
      })
      .from(projects)
      .where(
        and(
          eq(projects.id, input.id),
          eq(projects.userId, ctx.session.user.id),
        ),
      )
      .leftJoin(
        scans,
        and(
          eq(projects.id, scans.projectId),
          sql`${scans.startedAt} = (
            SELECT MAX(started_at)
            FROM ${scans} s2
            WHERE s2.project_id = ${projects.id}
          )`,
        ),
      )
      .limit(1);

    if (!projectWithScan) return null;

    const { project, latestScan } = projectWithScan;
    const stats = calculateSecurityStats(latestScan);

    return {
      ...project,
      scanData: {
        status: getScanStatus(latestScan),
        vulnerabilities: latestScan?.totalFindings ?? 0,
        lastScan: latestScan?.startedAt.toISOString() ?? null,
        ...stats,
      },
    };
  });

const fetchProjects = protectedProcedure.query(async ({ ctx }) => {
  return await ctx.db
    .select()
    .from(projects)
    .where(eq(projects.userId, ctx.session.user.id));
});

const fetchProjectsWithStats = protectedProcedure.query(async ({ ctx }) => {
  // Get all projects with their latest scan
  const projectsWithScans = await ctx.db
    .select({
      project: projects,
      latestScan: scans,
    })
    .from(projects)
    .where(eq(projects.userId, ctx.session.user.id))
    .leftJoin(
      scans,
      and(
        eq(projects.id, scans.projectId),
        sql`${scans.startedAt} = (
          SELECT MAX(started_at)
          FROM ${scans} s2
          WHERE s2.project_id = ${projects.id}
        )`,
      ),
    );

  // Map the results to include scan data
  return projectsWithScans.map(({ project, latestScan }) => {
    const stats = calculateSecurityStats(latestScan);

    return {
      ...project,
      scanData: {
        status: getScanStatus(latestScan),
        vulnerabilities: latestScan?.totalFindings ?? 0,
        lastScan: latestScan?.startedAt.toISOString() ?? null,
        ...stats,
      },
    };
  });
});

const createProject = protectedProcedure
  .input(createInsertSchema(projects).omit({ userId: true, id: true }))
  .mutation(async ({ ctx, input }) => {
    const [project] = await ctx.db
      .insert(projects)
      .values({
        ...input,
        userId: ctx.session.user.id,
      })
      .returning();

    if (!project) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create project",
      });
    }

    return project;
  });

const deleteProject = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(projects).where(eq(projects.id, input.id));
  });

export const projectsRouter = createTRPCRouter({
  // Base project operations
  getById: getProjectById,
  getByIdWithStats: getProjectWithStatsById,
  fetch: fetchProjects,
  fetchWithStats: fetchProjectsWithStats,

  // Mutations
  create: createProject,
  delete: deleteProject,
});
