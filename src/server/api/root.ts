import { escapeRoomsRouter } from "@/server/api/routers/escapeRooms";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { contactRouter } from "@/server/api/routers/contact";
import { leaderboardRouter } from "@/server/api/routers/leadboard";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  escapeRooms: escapeRoomsRouter,
  contact: contactRouter,
  leaderboard: leaderboardRouter,
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
