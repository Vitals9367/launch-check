import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { waitlistRouter } from "@/server/routers/waitlist";
import { projectsRouter } from "@/server/routers/projects";
import { scansRouter } from "@/server/routers/scans";
import { findingsRouter } from "@/server/routers/findings";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  waitlist: waitlistRouter,
  projects: projectsRouter,
  scans: scansRouter,
  findings: findingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
