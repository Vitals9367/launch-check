import NextAuth from "next-auth";
import { config as authConfig } from "@/server/auth/auth.config";
import { NextAuthRequest } from "node_modules/next-auth/lib";
import {
  authRoutes,
  callbackUrlQueryParam,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_LOGOUT_REDIRECT,
  nextAuthApiPrefix,
  publicRoutes,
  trpcApiPrefix,
} from "./routes";
import { NextURL } from "next/dist/server/web/next-url";

const { auth } = NextAuth(authConfig);

const getCallbackUrl = (nextUrl: NextURL) => {
  let callbackUrl = nextUrl.pathname;
  if (nextUrl.search) {
    callbackUrl += nextUrl.search;
  }
  return encodeURIComponent(callbackUrl);
};

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isNextAuthApiRoute = nextUrl.pathname.startsWith(nextAuthApiPrefix);
  const isTrpcApiRoute = nextUrl.pathname.startsWith(trpcApiPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow requests to NextAuth API routes, TRPC API routes
  if (isNextAuthApiRoute || isTrpcApiRoute) {
    return;
  }

  // If the user is logged in, redirect to the default login redirect
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // If the user is not logged in, let them through to auth pages
    return;
  }

  // If the user is not logged in, redirect to the default logout redirect
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      new URL(
        `${DEFAULT_LOGOUT_REDIRECT}?${callbackUrlQueryParam}=${getCallbackUrl(nextUrl)}`,
        nextUrl,
      ),
    );
  }

  return;
});

// This is the middleware that will be used to protect the routes
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
