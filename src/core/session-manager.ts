import {
  createSessionCookieValue,
  deleteSessionCookie,
  getSessionCookie,
  NextSessionCookieOptions,
  saveSessionCookie,
} from "../cookie/index.js";

import { NextSession, NextSessionManager, Req, Res } from "../types.js";

/**
 * Create a new session manager object.
 *
 * This session manager contains all necessary methods to work with next sessions.
 *
 * @param sessionCookieOptions - Cookie options.
 */
export const createSessionManager = (
  sessionCookieOptions: NextSessionCookieOptions,
): NextSessionManager => {
  /**
   * Get the session from a user's session cookie.
   *
   * Retrieves the session cookie via the req object if set,
   * otherwise via the Next.js `cookies()` function.
   *
   * @param req - Optional Next.js request object.
   */
  async function getSession(req?: Req): Promise<NextSession> {
    try {
      const sessionCookie = await getSessionCookie<NextSession>(
        sessionCookieOptions,
        req,
      );
      if (sessionCookie) {
        return sessionCookie;
      }
    } catch (e) {
      console.warn("Could not unseal next-session cookie:", e);

      // eslint-disable-next-line
      return {
        authenticated: false,
        _unsealError: true,
      } as NextSession;
    }

    return {
      authenticated: false,
    };
  }

  /**
   * Saves the given session in the user's session cookie.
   *
   * Saves the session cookie via the res object if set,
   * otherwise via the Next.js `cookies()` function.
   *
   * @param session - The session object to save.
   * @param res - Optional Next.js response object.
   */
  async function saveSession(session: NextSession, res?: Res) {
    await saveSessionCookie(session, sessionCookieOptions, res);
  }

  /**
   * Sets the given session on the given req object.
   *
   * This is useful if you need to update the session for
   * the current request (use in middleware).
   *
   * @param session - The session object to set.
   * @param req - Next.js request object.
   */
  async function setSessionOnNextRequest(session: NextSession, req: Req) {
    const cookieValue = await createSessionCookieValue(
      session,
      sessionCookieOptions,
    );

    req.cookies.set(sessionCookieOptions.cookieName, cookieValue);
  }

  /**
   * Delete the user's session.
   *
   * Effectively unsets the session cookie.
   *
   * Deletes the session cookie via the res object if set,
   * otherwise via the Next.js `cookies()` function.
   *
   * @param res - Optional Next.js response object.
   */
  function deleteSession(res?: Res) {
    deleteSessionCookie(sessionCookieOptions, res);
  }

  /**
   * Deletes the session on the given req object.
   *
   * This is useful if you need to update the session for
   * the current request (use in middleware).
   *
   * @param req - Next.js request object.
   */
  function deleteSessionOnNextRequest(req: Req) {
    req.cookies.delete(sessionCookieOptions.cookieName);
  }

  return {
    getSession,
    saveSession,
    deleteSession,
    setSessionOnNextRequest,
    deleteSessionOnNextRequest,
  };
};
