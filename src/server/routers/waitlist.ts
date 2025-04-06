import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const fetchWaitlist = publicProcedure.query(async ({ ctx }) => {
  const waitlistEntries = await ctx.db.waitlistEntry.findMany();
  return waitlistEntries;
});

export const waitlistRouter = createTRPCRouter({
  fetch: fetchWaitlist,
});
