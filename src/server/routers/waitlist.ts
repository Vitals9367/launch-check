import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { waitlistEntry } from "@/server/db/schema/waitlist";
const fetchWaitlist = publicProcedure.query(async ({ ctx }) => {
  return await ctx.db.select().from(waitlistEntry);
});

export const waitlistRouter = createTRPCRouter({
  fetch: fetchWaitlist,
});
