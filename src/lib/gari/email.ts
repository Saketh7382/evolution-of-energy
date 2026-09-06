import "server-only";
import type { ReviewRequestInput } from "./validation";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

async function sendEmail(payload: { from: string; to: string[]; subject: string; text: string; reply_to?: string }) {
  const apiKey = process.env.EMAIL_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === "production") throw new Error("Transactional email is not configured.");
    return;
  }
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Email provider returned ${response.status}.`);
}

export async function sendGariRequestEmails(input: ReviewRequestInput, reference: string) {
  const from = process.env.TRANSACTIONAL_FROM_EMAIL;
  const reviewInbox = process.env.ACADEMIC_REVIEW_EMAIL;
  if (!from || !reviewInbox) {
    if (process.env.NODE_ENV === "production") throw new Error("GARI email routing is incomplete.");
    return;
  }

  await Promise.all([
    sendEmail({
      from,
      to: [input.email],
      subject: `Academic Review Copy Request Received — ${reference}`,
      text: `Dear ${input.fullName},\n\nThank you for your request to review Evolution of Energy — First Canonical Edition.\n\nReference: ${reference}\n\nYour request will be reviewed for suitability. Submission does not guarantee that a review copy will be issued. Correspondence, receipt of a review copy or provision of comments does not imply institutional endorsement, validation or approval.\n\nEvolution of Energy\nGlobal Academic Review Initiative`,
      reply_to: reviewInbox,
    }),
    sendEmail({
      from,
      to: [reviewInbox],
      subject: `New GARI request — ${reference} — ${input.institution}`,
      text: `Reference: ${reference}\nName: ${input.fullName}\nRole: ${input.role}\nInstitution: ${input.institution}\nDepartment: ${input.department}\nCountry: ${input.country}\nInstitutional email: ${input.email}\nAlternative email: ${input.alternativeEmail || "—"}\n\nExpertise:\n${input.expertise}\n\nReason:\n${input.reason}\n\nScope:\n${input.scope}\n\nThemes:\n${input.themes || "—"}`,
      reply_to: input.email,
    }),
  ]);
}
