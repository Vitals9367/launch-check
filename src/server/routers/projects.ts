import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { projects } from "@/server/db/schema/projects";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

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

// Mock data generator for project stats
function generateMockProjectStats(projectId: string): ProjectStats {
  // Use projectId to generate deterministic but varying data
  const seed = parseInt(projectId.replace(/\D/g, ""), 10) || 1;
  const rand = (max: number) => Math.floor((seed * Math.random()) % max);

  const vulnerabilities = {
    critical: rand(3),
    high: rand(5),
    medium: rand(8),
    low: rand(10),
  };

  // Calculate security score based on vulnerabilities
  const maxScore = 100;
  const deductions = {
    critical: 15,
    high: 10,
    medium: 5,
    low: 2,
  };

  const securityScore = Math.max(
    0,
    maxScore -
      (vulnerabilities.critical * deductions.critical +
        vulnerabilities.high * deductions.high +
        vulnerabilities.medium * deductions.medium +
        vulnerabilities.low * deductions.low),
  );

  // Generate 5 days of history
  const history = Array.from({ length: 5 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (4 - i));
    return {
      date: date.toISOString(),
      critical: Math.max(0, vulnerabilities.critical + rand(2) - 1),
      high: Math.max(0, vulnerabilities.high + rand(2) - 1),
      medium: Math.max(0, vulnerabilities.medium + rand(3) - 1),
      low: Math.max(0, vulnerabilities.low + rand(3) - 1),
    };
  });

  // Determine rating based on security score
  let rating: ProjectStats["rating"] = "F";
  if (securityScore >= 90) rating = "A";
  else if (securityScore >= 80) rating = "B";
  else if (securityScore >= 70) rating = "C";
  else if (securityScore >= 60) rating = "D";

  return {
    securityScore,
    rating,
    vulnerabilities,
    history,
  };
}

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
    .query(async ({ ctx, input }) => {
      // TODO: Replace with actual database query
      return generateMockProjectStats(input.projectId);
    }),
});
