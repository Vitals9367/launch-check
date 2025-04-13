import { NextResponse } from "next/server";
import type { SecurityHeadersConfig } from "./headers";

/**
 * Applies CORS headers to the response
 */
export const applyCorsHeaders = (
  response: NextResponse,
  corsConfig: SecurityHeadersConfig["corsConfig"],
): void => {
  response.headers.set("Access-Control-Allow-Origin", corsConfig.origin);
  response.headers.set(
    "Access-Control-Allow-Methods",
    corsConfig.methods.join(", "),
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    corsConfig.headers.join(", "),
  );
  response.headers.set("Access-Control-Max-Age", corsConfig.maxAge.toString());
};
