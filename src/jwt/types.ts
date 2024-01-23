import type { NextSessionManager, AuthenticatedSession } from "../types.js";

declare module "../types.js" {
  interface AuthenticatedSession {
    tokenResponse: {
      accessToken: string;
      refreshToken: string;
    };
  }
}

export type UpdateSessionCallback = (
  session: AuthenticatedSession,
) => Promise<AuthenticatedSession | Error>;

export type MiddlewareOptions = {
  sessionManager: NextSessionManager;
  updateSession: UpdateSessionCallback;
};
