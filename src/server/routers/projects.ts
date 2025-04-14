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

export const projectsRouter = createTRPCRouter({
  fetch: fetchProjects,
  create: createProject,
  delete: deleteProject,
  getById: getProjectById,
});
