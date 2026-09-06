import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { SITE_URL } from "@/lib/site";

export function isAllowedOrigin(origin: string | null) {
  if (!origin) return process.env.NODE_ENV !== "production";
  try {
    return new URL(origin).origin === new URL(SITE_URL).origin;
  } catch {
    return false;
  }
}

export function createRequestFingerprint(ip: string, userAgent: string) {
  const pepper = process.env.RATE_LIMIT_PEPPER;
  if (!pepper) return null;
  return createHash("sha256").update(`${pepper}|${ip}|${userAgent}`).digest("hex");
}

export function createPublicReference() {
  const date = new Date();
  const y = date.getUTCFullYear();
  const token = randomBytes(4).toString("hex").toUpperCase();
  return `GARI-${y}-${token}`;
}

export async function verifyTurnstile(token: string, remoteIp?: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    cache: "no-store",
  });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}
