import { ResponseCookies } from "@edge-runtime/cookies";
import { cookies } from "next/headers.js";

import { NextSessionCookieOptions, Res } from "./types.js";

/**
 * Save payload in session cookie.
 *
 * @param options - Cookie options.
 * @param res - Optional response object.
 */
export function deleteSessionCookie(
  options: NextSessionCookieOptions,
  res?: Res,
) {
  if (res) {
    return deleteOnResponse(res, options);
  }

  return deleteViaFunction(options);
}

/**
 * Delete cookie as header on response.
 *
 * @param res - Optional response object.
 * @param options - Cookie options.
 */
function deleteOnResponse(res: Res, options: NextSessionCookieOptions) {
  const resCookies = new ResponseCookies(res.headers);
  resCookies.delete(options.cookieName);
}

/**
 * Delete cookie via cookies() function.
 *
 * NOTE: This only works in server actions and route handlers!
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/cookies#deleting-cookies
 * @param options - Cookie options.
 */
function deleteViaFunction(options: NextSessionCookieOptions) {
  const cookiesFunc = options.nextCookiesFunc ?? cookies;

  cookiesFunc().delete(options.cookieName);
}
