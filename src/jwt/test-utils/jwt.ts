import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
  "cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2",
);
const alg = "HS256";

/**
 * Create a JWT with the given expiration time.
 *
 * @param expires - The expiration time of the JWT.
 */
export async function createJwt(expires: number) {
  return await new SignJWT({ test: true })
    .setProtectedHeader({ alg })
    .setIssuer("testIssuer")
    .setExpirationTime(expires)
    .sign(secret);
}
