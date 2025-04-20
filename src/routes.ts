/**
 * The default route to redirect to after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/**
 * The default route to redirect to after logout
 * @type {string}
 */
export const DEFAULT_LOGOUT_REDIRECT = "/login";

/**
 * An array of all routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/blog"];

/**
 * An array of authentication pages.
 * Allow requests to these routes without authentication.
 * If user is authenticated, they will be redirected to the default login redirect.
 * @type {string[]}
 */
export const authRoutes = ["/login"];

/**
 * The prefix for the Next Auth API routes. Has to be public all the time.
 * @type {string}
 */
export const nextAuthApiPrefix = "/api/auth";

/**
 * The prefix for the trpc API routes. Has to be public all the time.
 * Auth is handled in the TRPC middleware.
 * @type {string}
 */
export const trpcApiPrefix = "/api/trpc";

/**
 * The query parameter name for the callback URL.
 * @type {string}
 */
export const callbackUrlQueryParam = "callbackUrl";

export const projectRoute = "/dashboard/projects";
