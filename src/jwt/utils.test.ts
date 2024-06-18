import { expect, test } from "vitest";
import { createJwt } from "./test-utils/jwt.js";
import { isTokenExpired } from "./utils.js";

test("token expired without threshold", async () => {
  const now = Math.floor(Date.now() / 1000);

  // Jwt is valid for 1 hour.
  let jwt = await createJwt(now + 60 * 60);

  expect(isTokenExpired(jwt)).toBeFalsy();

  // Jwt is expired 2 hours ago.
  jwt = await createJwt(now - 2 * 60 * 60);
  expect(isTokenExpired(jwt)).toBeTruthy();
});

test("token expired with threshold", async () => {
  const now = Math.floor(Date.now() / 1000);

  // Jwt expires right now
  let jwt = await createJwt(now);
  expect(isTokenExpired(jwt)).toBeTruthy();

  // Jwt expires in 5 seconds.
  jwt = await createJwt(now + 5);
  expect(isTokenExpired(jwt)).toBeTruthy();

  // Jwt expires in 6 seconds.
  jwt = await createJwt(now + 6);
  expect(isTokenExpired(jwt)).toBeFalsy();
});
