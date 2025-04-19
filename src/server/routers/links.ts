import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { links } from "@/server/db/schema/links";
import { eq } from "drizzle-orm";
import { z } from "zod";

const createLink = protectedProcedure
  .input(
    createInsertSchema(links)
      .omit({ id: true })
      .extend({
        url: z.string().url().min(1, { message: "URL is required" }),
      }),
  )
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.insert(links).values(input);
  });

const fetchByProject = protectedProcedure
  .input(z.object({ projectId: z.string() }))
  .query(async ({ ctx, input }) => {
    return await ctx.db
      .select()
      .from(links)
      .where(eq(links.projectId, input.projectId));
  });

const deleteLink = protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(links).where(eq(links.id, input.id));
  });

const updateLink = protectedProcedure
  .input(
    createUpdateSchema(links)
      .pick({ url: true })
      .merge(z.object({ id: z.string() })),
  )
  .mutation(async ({ ctx, input }) => {
    const { id, ...data } = input;
    return await ctx.db.update(links).set(data).where(eq(links.id, id));
  });

export const linksRouter = createTRPCRouter({
  create: createLink,
  fetchByProject: fetchByProject,
  delete: deleteLink,
  update: updateLink,
});
