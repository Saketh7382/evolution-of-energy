import { and, count, eq, gt, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { gariReviewRequests } from "@/lib/db/schema";
import { sendGariRequestEmails } from "@/lib/gari/email";
import { createPublicReference, createRequestFingerprint, isAllowedOrigin, verifyTurnstile } from "@/lib/gari/security";
import { reviewRequestSchema } from "@/lib/gari/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

function json(body: Record<string, unknown>, init?: { status?: number }) {
  return NextResponse.json(body, { ...init, headers: noStoreHeaders });
}

function getClientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_GARI_REQUESTS_ENABLED !== "true") {
    return json({ ok: false, message: "Academic review requests are not currently open." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 64 * 1024) {
    return json({ ok: false, message: "The request was too large." }, { status: 413 });
  }

  if (!isAllowedOrigin(request.headers.get("origin"))) {
    return json({ ok: false, message: "This request could not be verified." }, { status: 403 });
  }

  const db = getDb();
  if (!db) {
    return json({ ok: false, message: "Academic review requests are temporarily unavailable." }, { status: 503 });
  }

  let body: unknown;
  try { body = await request.json(); } catch {
    return json({ ok: false, message: "The request format was invalid." }, { status: 400 });
  }

  const parsed = reviewRequestSchema.safeParse(body);
  if (!parsed.success) {
    return json({
      ok: false,
      message: "Please review the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    }, { status: 400 });
  }

  const input = parsed.data;
  if (input.website) return json({ ok: true, reference: "RECEIVED" });

  const ip = getClientIp(request);
  const verified = await verifyTurnstile(input.turnstileToken, ip === "unknown" ? undefined : ip);
  if (!verified) {
    return json({ ok: false, message: "Security verification failed. Please try again." }, { status: 400 });
  }

  const fingerprint = createRequestFingerprint(ip, request.headers.get("user-agent") ?? "unknown");
  const since = new Date(Date.now() - 60 * 60 * 1000);
  const emailRecent = and(
    eq(gariReviewRequests.institutionalEmail, input.email.toLowerCase()),
    gt(gariReviewRequests.createdAt, since),
  );
  const fingerprintRecent = fingerprint ? and(
    eq(gariReviewRequests.requestFingerprintHash, fingerprint),
    gt(gariReviewRequests.createdAt, since),
  ) : undefined;

  let recentCount = 0;
  try {
    const [row] = await db
      .select({ value: count() })
      .from(gariReviewRequests)
      .where(fingerprintRecent ? or(emailRecent, fingerprintRecent) : emailRecent);
    recentCount = Number(row?.value ?? 0);
  } catch (error) {
    console.error("GARI rate-limit lookup failed", error);
    return json({ ok: false, message: "Academic review requests are temporarily unavailable." }, { status: 503 });
  }

  if (recentCount >= 3) {
    return json({ ok: false, message: "Too many recent requests. Please try again later." }, { status: 429 });
  }

  const reference = createPublicReference();
  try {
    await db.insert(gariReviewRequests).values({
      publicReference: reference,
      fullName: input.fullName,
      academicRole: input.role,
      institution: input.institution,
      department: input.department,
      country: input.country,
      institutionalEmail: input.email.toLowerCase(),
      alternativeEmail: input.alternativeEmail ? input.alternativeEmail.toLowerCase() : null,
      expertise: input.expertise,
      requestReason: input.reason,
      reviewScope: input.scope,
      themes: input.themes || null,
      scholarlyUseConfirmed: true,
      termsAccepted: true,
      requestFingerprintHash: fingerprint,
    });
  } catch (error) {
    console.error("GARI request persistence failed", error);
    return json({ ok: false, message: "Academic review requests are temporarily unavailable." }, { status: 503 });
  }

  try {
    await sendGariRequestEmails(input, reference);
  } catch (error) {
    console.error("GARI email notification failed", error);
  }

  return json({ ok: true, reference }, { status: 201 });
}
