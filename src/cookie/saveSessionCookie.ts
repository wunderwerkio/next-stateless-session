import { ResponseCookies } from "@edge-runtime/cookies";
import { seal, defaults as sealDefaults } from "iron-webcrypto";
import { cookies } from "next/headers.js";
import crypto from "uncrypto";

import { NextSessionCookieOptions, Res } from "./types.js";

/**
 * Save payload in session cookie.
 *
 * @param payload - Session cookie payload.
 * @param options - Cookie options.
 * @param res - Optional response object.
 */
export async function saveSessionCookie<TPayload>(
  payload: TPayload,
  options: NextSessionCookieOptions,
  res?: Res,
) {
  const sealedValue = await createSessionCookieValue(payload, options);

  if (res) {
    return saveOnResponse(sealedValue, res, options);
  }

  return await saveViaFunction(sealedValue, options);
}

/**
 * Create the encrypted cookie value.
 *
 * @param payload - Session cookie payload.
 * @param options - Cookie options.
 */
export async function createSessionCookieValue<TPayload>(
  payload: TPayload,
  options: NextSessionCookieOptions,
) {
  return await seal(
    crypto,
    payload,
    options.password,
    options.sealOptions ?? sealDefaults,
  );
}

/**
 * Set cookie as header on response.
 *
 * @param value - Cookie value.
 * @param res - Response object.
 * @param options - Cookie options.
 */
function saveOnResponse(
  value: string,
  res: Res,
  options: NextSessionCookieOptions,
) {
  const resCookies = new ResponseCookies(res.headers);
  resCookies.set(options.cookieName, value, options.cookieOptions);
}

/**
 * Save cookie via cookies() function.
 *
 * NOTE: This only works in server actions and route handlers!
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
 * @param value - Cookie value.
 * @param options - Cookie options.
 */
async function saveViaFunction(
  value: string,
  options: NextSessionCookieOptions,
) {
  const cookiesFunc = options.nextCookiesFunc ?? cookies;

  (await cookiesFunc()).set(options.cookieName, value, options.cookieOptions);
}
