import { expect, test } from "vitest";
import { withNextSessionJwtTokenRefresh } from "./middleware.js";
import {
  AuthenticatedSession,
  NextSession,
  NextSessionManager,
} from "../types.js";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server.js";

test("test", async () => {
  const req = { _fakeReq: true } as unknown as NextRequest;
  const res = {} as unknown as NextResponse;
  const event = {} as unknown as NextFetchEvent;

  const session: NextSession = {
    authenticated: false,
  };

  const sessionManager: NextSessionManager = {
    getSession: async (_req) => {
      expect(req).deep.equals(_req);

      return session;
    },
    deleteSessionOnNextRequest: () => {},
    setSessionOnNextRequest: async () => {},
    saveSession: async () => {},
    deleteSession: async () => {},
  };

  const updateSession = async (session: AuthenticatedSession) => {
    return session;
  };

  const next = (_req: NextRequest, _event: NextFetchEvent) => {
    expect(req).deep.equals(_req);
    expect(event).deep.equals(_event);

    return res;
  };

  withNextSessionJwtTokenRefresh({
    sessionManager,
    updateSession,
  })(next)(req, event);
});
