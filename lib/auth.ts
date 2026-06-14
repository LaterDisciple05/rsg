import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE_NAME = "rsg_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getAdminEmail() {
  return process.env.ADMIN_EMAIL ?? "admin@risingsunglobal.local";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "ChangeMe@123";
}

function getSessionSecret() {
  return (
    process.env.ADMIN_SESSION_SECRET ??
    "local-rsg-admin-session-secret-change-before-production"
  );
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function getAdminCredentials() {
  return {
    email: getAdminEmail(),
    password: getAdminPassword(),
  };
}

export async function createAdminSession() {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${getAdminEmail()}.${expiresAt}`;
  const value = `${payload}.${sign(payload)}`;
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (!session) {
    return null;
  }

  const parts = session.split(".");

  if (parts.length !== 3) {
    return null;
  }

  const [email, expiresAt, signature] = parts;
  const payload = `${email}.${expiresAt}`;

  if (!safeEqual(signature, sign(payload))) {
    return null;
  }

  if (Number(expiresAt) < Date.now()) {
    return null;
  }

  if (email !== getAdminEmail()) {
    return null;
  }

  return {
    email,
  };
}

export async function requireAdmin() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin-login");
  }

  return session;
}

export function isValidAdminLogin(email: string, password: string) {
  return email === getAdminEmail() && password === getAdminPassword();
}
