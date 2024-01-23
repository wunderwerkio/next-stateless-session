import { ResponseCookies } from "@edge-runtime/cookies";
import type {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
} from "next/server.js";

import { isTokenExpired } from "./utils.js";
import type { MiddlewareOptions } from "./types.js";
import { AuthenticatedSession } from "../types.js";

/**
 * NextJS Middleware higher-order function that adds session handling to all routes.
 *
 * @param options - Configuration options.
 */
export const withNextSessionJwtTokenRefresh =
  (options: MiddlewareOptions) => (next: NextMiddleware) => {
    return async (req: NextRequest, event: NextFetchEvent) => {
      const { sessionManager, updateSession } = options;

      // Retrieve session.
      const session = await sessionManager.getSession(req);

      let refreshError: Error | null = null;
      let updatedSession: AuthenticatedSession | null = null;

      // Check if access token needs to be refreshed.
      if (
        session.authenticated &&
        isTokenExpired(session.tokenResponse.accessToken)
      ) {
        const result = await updateSession(session);

        if (result instanceof Error) {
          console.log("Refresh failed, deleting cookie");
          refreshError = result;
          sessionManager.deleteSessionOnNextRequest(req);
        } else {
          updatedSession = result;
          console.log("set refreshed session for current request");
          await sessionManager.setSessionOnNextRequest(result, req);
        }
      }

      // Run actual next request.
      const nextRes = await next(req, event);
      if (!nextRes) {
        return nextRes;
      }

      // Send updated session back to client.
      if (updatedSession && !nextRes.headers.has("set-cookie")) {
        console.log("update refreshed session on response");
        await sessionManager.saveSession(updatedSession, nextRes);
      } else if (refreshError || "") {
        sessionManager.deleteSession(nextRes);

        console.log("Set logged-out cookie");

        const cookies = new ResponseCookies(nextRes.headers);
        cookies.set("next-session__logged-out", "reason:unknown");
      } else if ("_unsealError" in session) {
        sessionManager.deleteSession(nextRes);
      }

      return nextRes;
    };
  };
