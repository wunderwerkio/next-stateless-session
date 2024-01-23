import test from "ava";
import { createJwt } from "./test-utils/jwt.js";
import { isTokenExpired } from "./utils.js";

test("token expired without threshold", async (t) => {
  const now = Math.floor(Date.now() / 1000);

  // Jwt is valid for 1 hour.
  let jwt = await createJwt(now + 60 * 60);

  t.false(isTokenExpired(jwt));

  // Jwt is expired 2 hours ago.
  jwt = await createJwt(now - 2 * 60 * 60);
  t.true(isTokenExpired(jwt));
});

test("token expired with threshold", async (t) => {
  const now = Math.floor(Date.now() / 1000);

  // Jwt expires right now
  let jwt = await createJwt(now);
  t.true(isTokenExpired(jwt));

  // Jwt expires in 5 seconds.
  jwt = await createJwt(now + 5);
  t.true(isTokenExpired(jwt));

  // Jwt expires in 6 seconds.
  jwt = await createJwt(now + 6);
  t.false(isTokenExpired(jwt));
});
