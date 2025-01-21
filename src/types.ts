import { NextSessionCookieOptions } from "./cookie/types.js";

export interface NextSessionManager {
  getSession: (req?: Req) => Promise<NextSession>;
  saveSession: (
    session: NextSession,
    res?: Res,
    cookieOptionsOverride?: Partial<NextSessionCookieOptions["cookieOptions"]>,
  ) => Promise<void>;
  deleteSession: (res?: Res) => Promise<void>;
  setSessionOnNextRequest: (
    session: NextSession,
    req: Req,
    cookieOptionsOverride?: Partial<NextSessionCookieOptions["cookieOptions"]>,
  ) => Promise<void>;
  deleteSessionOnNextRequest: (req: Req) => void;
}

export interface UnauthenticatedSession {
  authenticated: false;
  _unsealError?: true;
}

export interface AuthenticatedSession {
  authenticated: true;
}

export type NextSession = AuthenticatedSession | UnauthenticatedSession;

export interface Req {
  headers: Headers;
  cookies: {
    set: (...args: [key: string, value: string]) => void;
    delete: (string: string | string[]) => boolean | boolean[];
  };
}

export interface Res {
  headers: Headers;
}
