import test from "ava";
import { withNextSessionJwtTokenRefresh } from "./middleware.js";
import {
  AuthenticatedSession,
  NextSession,
  NextSessionManager,
} from "../types.js";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server.js";

test("test", async (t) => {
  const req = { _fakeReq: true } as unknown as NextRequest;
  const res = {} as unknown as NextResponse;
  const event = {} as unknown as NextFetchEvent;

  const session: NextSession = {
    authenticated: false,
  };

  const sessionManager: NextSessionManager = {
    getSession: async (_req) => {
      t.deepEqual(req, _req);

      return session;
    },
    deleteSessionOnNextRequest: () => {},
    setSessionOnNextRequest: async () => {},
    saveSession: async () => {},
    deleteSession: () => {},
  };

  const updateSession = async (session: AuthenticatedSession) => {
    return session;
  };

  const next = (_req: NextRequest, _event: NextFetchEvent) => {
    t.deepEqual(req, _req);
    t.deepEqual(event, _event);

    return res;
  };

  withNextSessionJwtTokenRefresh({
    sessionManager,
    updateSession,
  })(next)(req, event);
});
