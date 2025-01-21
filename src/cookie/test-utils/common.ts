import { RequestCookies } from "@edge-runtime/cookies";
import { NextRequest } from "next/server.js";
import { NextSessionCookieOptions } from "../types.js";

export const testOptions: NextSessionCookieOptions = {
  cookieName: "test__session-cookie",
  password: "WKYWgkjHWtgW7173a4Vt1Jfgk83kAmhn",
};

/**
 * Create a request with a cookie set.
 *
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 */
export const createRequestWithCookie = (name: string, value: string) => {
  const request = new Request("http://localhost");

  const cookies = new RequestCookies(request.headers);
  cookies.set(name, value);

  return request as NextRequest;
};
