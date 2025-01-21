import { expect, test } from "vitest";
import { deleteSessionCookie } from "./index.js";
import { testOptions } from "./test-utils/common.js";

test("res - delete session cookie", async () => {
  const res = new Response();

  deleteSessionCookie(testOptions, res);

  expect(res.headers.has("set-cookie"));

  const headerValue = res.headers.get("set-cookie");
  expect(headerValue?.startsWith(testOptions.cookieName + "=;"));
});

test("func - delete session cookie", async () => {
  expect.assertions(1);

  await deleteSessionCookie({
    ...testOptions,
    // @ts-ignore
    nextCookiesFunc: async () => ({
      delete: (name) => {
        expect(name).equals(testOptions.cookieName);
      },
    }),
  });
});
