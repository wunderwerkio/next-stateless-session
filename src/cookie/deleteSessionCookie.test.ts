import test from "ava";
import { deleteSessionCookie } from "./index.js";
import { testOptions } from "./test-utils/common.js";

test("res - delete session cookie", async (t) => {
  const res = new Response();

  deleteSessionCookie(testOptions, res);

  t.assert(res.headers.has("set-cookie"));

  const headerValue = res.headers.get("set-cookie");
  t.assert(headerValue?.startsWith(testOptions.cookieName + "=;"));
});

test("func - delete session cookie", async (t) => {
  t.plan(1);

  deleteSessionCookie({
    ...testOptions,
    // @ts-ignore
    nextCookiesFunc: () => ({
      delete: (name) => {
        t.is(name, testOptions.cookieName);
      },
    }),
  });
});
