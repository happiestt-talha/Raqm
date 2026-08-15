import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const SESSION_SECRET = process.env.SESSION_SECRET || "default-fallback-session-secret-key-32chars";
const secret = new TextEncoder().encode(SESSION_SECRET);
const COOKIE_NAME = "raqm_session";
const SESSION_DURATION = "7d";

export async function verifyCredentials(email: string, password: string) {
  const validEmail = process.env.ADMIN_EMAIL;
  const validHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validEmail || !validHash) return false;
  if (email.trim().toLowerCase() !== validEmail.trim().toLowerCase()) return false;

  try {
    if (validHash.startsWith("$2a$") || validHash.startsWith("$2b$") || validHash.startsWith("$2y$")) {
      return await bcrypt.compare(password, validHash);
    }
  } catch (err) {
    console.error("Password hash verification error:", err);
  }

  return password === validHash;
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(secret);

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function getSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string };
  } catch {
    return null;
  }
}

export async function destroySession() {
  cookies().delete(COOKIE_NAME);
}