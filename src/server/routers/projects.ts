import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { projects } from "@/server/db/schema/projects";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { generateMockProjectStats } from "@/server/mocks/project-stats";

const createProject = protectedProcedure
  .input(createInsertSchema(projects).omit({ userId: true, id: true }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.insert(projects).values({
      ...input,
      userId: ctx.session.user.id,
    });
  });

const fetchProjects = protectedProcedure.query(async ({ ctx }) => {
  return await ctx.db
    .select()
    .from(projects)
    .where(eq(projects.userId, ctx.session.user.id));
});

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

const deleteProject = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(projects).where(eq(projects.id, input.id));
  });

const ProjectStatsSchema = z.object({
  securityScore: z.number(),
  rating: z.enum(["A", "B", "C", "D", "F"]),
  vulnerabilities: z.object({
    critical: z.number(),
    high: z.number(),
    medium: z.number(),
    low: z.number(),
  }),
  history: z.array(
    z.object({
      date: z.string(),
      critical: z.number(),
      high: z.number(),
      medium: z.number(),
      low: z.number(),
    }),
  ),
});

export type ProjectStats = z.infer<typeof ProjectStatsSchema>;

export const projectsRouter = createTRPCRouter({
  fetch: fetchProjects,
  create: createProject,
  delete: deleteProject,
  getById: getProjectById,
  getStats: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      // TODO: Replace with actual database query
      return generateMockProjectStats(input.projectId);
    }),
});
