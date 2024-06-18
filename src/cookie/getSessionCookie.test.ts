import { expect, test } from "vitest";
import { NextRequest } from "next/server.js";
import { getSessionCookie } from "./index.js";
import { createRequestWithCookie, testOptions } from "./test-utils/common.js";

test("req - get empty session cookie", async () => {
  const req = new Request("http://localhost") as NextRequest;

  const value = await getSessionCookie(testOptions, req);

  expect(value).toBeNull();
});

test("req - handle malformed session cookie", async () => {
  const req = createRequestWithCookie(
    testOptions.cookieName,
    "malformed-string",
  );

  await expect(getSessionCookie(testOptions, req)).rejects.toThrow();
});

test("req - get value from session cookie", async () => {
  const req = createRequestWithCookie(
    testOptions.cookieName,
    "Fe26.2**dfad6d980c99050f3b4639d1e8a360c880c090a51fc006fa2d5f8487465eaa23*4pI2ij7vRtUqKFehTHmL4w*kF-Jvo_GLKciyw7ABcj0QFkgkfI6Db20j0lnJvUBQWQ**7920cd3523da012ff34acc2deec3b69c5b15ecb85785e0efb3313a40a5a2ff3f*Cruxyu2xvoYC1TgKLeVMfTVsOQ_OLnyeFktTnRp75X4",
  );

  const value = await getSessionCookie(testOptions, req);

  expect(value).deep.equals({
    hello: "world",
  });
});

test("func - get empty session cookie", async () => {
  const value = await getSessionCookie({
    ...testOptions,
    // @ts-ignore
    nextCookiesFunc: () => ({
      get: () => undefined,
    }),
  });

  expect(value).toBeNull();
});

test("func - handle malformed session cookie", async () => {
  await expect(
    getSessionCookie({
      ...testOptions,
      // @ts-ignore
      nextCookiesFunc: () => ({
        get: (name) => ({ name, value: "malformed-string" }),
      }),
    }),
  ).rejects.toThrow();
});

test("func - get value from session cookie", async () => {
  const cookieValue =
    "Fe26.2**dfad6d980c99050f3b4639d1e8a360c880c090a51fc006fa2d5f8487465eaa23*4pI2ij7vRtUqKFehTHmL4w*kF-Jvo_GLKciyw7ABcj0QFkgkfI6Db20j0lnJvUBQWQ**7920cd3523da012ff34acc2deec3b69c5b15ecb85785e0efb3313a40a5a2ff3f*Cruxyu2xvoYC1TgKLeVMfTVsOQ_OLnyeFktTnRp75X4";

  const value = await getSessionCookie({
    ...testOptions,
    // @ts-ignore
    nextCookiesFunc: () => ({
      get: (name) => ({ name, value: cookieValue }),
    }),
  });

  expect(value).deep.equals({
    hello: "world",
  });
});
