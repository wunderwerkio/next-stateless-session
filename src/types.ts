export interface NextSessionManager {
  getSession: (req?: Req) => Promise<NextSession>;
  saveSession: (session: NextSession, res?: Res) => Promise<void>;
  deleteSession: (res?: Res) => void;
  setSessionOnNextRequest: (session: NextSession, req: Req) => Promise<void>;
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
