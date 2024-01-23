import { ResponseCookie } from "@edge-runtime/cookies";
import { SealOptions } from "iron-webcrypto";
import { cookies } from "next/headers.js";

export interface NextSessionCookieOptions {
  cookieName: string;
  password: string;
  sealOptions?: SealOptions;
  cookieOptions?: Omit<ResponseCookie, "name" | "value">;
  nextCookiesFunc?: typeof cookies;
}

export interface Req {
  headers: Headers;
}

export interface Res {
  headers: Headers;
}
