"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { TurnstileWidget } from "./TurnstileWidget";
import styles from "./ReviewRequestForm.module.css";

type FieldErrors = Record<string, string[] | undefined>;
type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string; fieldErrors?: FieldErrors }
  | { kind: "success"; reference: string };

function errorId(name: string) { return `${name}-error`; }

export function ReviewRequestForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [turnstileToken, setTurnstileToken] = useState("");
  const feedbackRef = useRef<HTMLDivElement>(null);
  const requestsEnabled = process.env.NEXT_PUBLIC_GARI_REQUESTS_ENABLED === "true";
  const turnstileConfigured = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
  const fieldErrors = state.kind === "error" ? state.fieldErrors ?? {} : {};
  const firstErrors = Object.entries(fieldErrors).filter(([, messages]) => messages?.length);

  useEffect(() => {
    if (state.kind === "error" || state.kind === "success") feedbackRef.current?.focus();
  }, [state.kind]);

  if (!requestsEnabled || !turnstileConfigured) {
    return (
      <div className={styles.availability} role="status">
        <h2>Online review-copy requests are not open yet.</h2>
        <p>The request system will be activated only after its production database, security verification and academic-review email routing have passed launch validation.</p>
      </div>
    );
  }

  if (state.kind === "success") {
    return (
      <div ref={feedbackRef} className={styles.confirm} role="status" tabIndex={-1}>
        <h2>Request received.</h2>
        <p>Your academic review copy request has been recorded for individual assessment.</p>
        <p><strong>Reference:</strong> {state.reference}</p>
        <p>Submission does not guarantee that a review copy will be issued, and correspondence does not imply institutional endorsement, validation or approval.</p>
      </div>
    );
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({ kind: "submitting" });
    const data = new FormData(event.currentTarget);
    const payload = {
      fullName: data.get("fullName"), role: data.get("role"), institution: data.get("institution"),
      department: data.get("department"), country: data.get("country"), email: data.get("email"),
      alternativeEmail: data.get("alternativeEmail") ?? "", expertise: data.get("expertise"),
      reason: data.get("reason"), scope: data.get("scope"), themes: data.get("themes") ?? "",
      scholarlyUse: data.get("scholarlyUse") === "on", termsAccepted: data.get("termsAccepted") === "on",
      website: data.get("website") ?? "", turnstileToken,
    };

    try {
      const response = await fetch("/api/gari/review-request", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { ok?: boolean; message?: string; reference?: string; fieldErrors?: FieldErrors };
      if (!response.ok || !result.ok || !result.reference) {
        setState({ kind: "error", message: result.message ?? "The request could not be submitted.", fieldErrors: result.fieldErrors });
        return;
      }
      setState({ kind: "success", reference: result.reference });
    } catch {
      setState({ kind: "error", message: "The request could not be submitted. Please check your connection and try again." });
    }
  };

  const describedBy = (name: string) => fieldErrors[name]?.length ? errorId(name) : undefined;
  const fieldError = (name: string) => fieldErrors[name]?.[0] ? <span id={errorId(name)} className={styles.fieldError}>{fieldErrors[name]?.[0]}</span> : null;

  return (
    <form className={styles.form} onSubmit={submit} noValidate aria-describedby={state.kind === "error" ? "gari-form-error" : undefined}>
      {state.kind === "error" ? (
        <div ref={feedbackRef} id="gari-form-error" className={styles.errorSummary} role="alert" tabIndex={-1}>
          <strong>{state.message}</strong>
          {firstErrors.length ? <ul>{firstErrors.map(([name, messages]) => <li key={name}>{messages?.[0]}</li>)}</ul> : null}
        </div>
      ) : null}

      <div className={styles.row}>
        <label>Full name <span aria-hidden="true">*</span><input name="fullName" autoComplete="name" maxLength={160} required aria-invalid={!!fieldErrors.fullName} aria-describedby={describedBy("fullName")}/>{fieldError("fullName")}</label>
        <label>Academic role <span aria-hidden="true">*</span><input name="role" maxLength={180} required aria-invalid={!!fieldErrors.role} aria-describedby={describedBy("role")}/>{fieldError("role")}</label>
      </div>
      <div className={styles.row}>
        <label>Institution / organization <span aria-hidden="true">*</span><input name="institution" maxLength={220} required aria-invalid={!!fieldErrors.institution} aria-describedby={describedBy("institution")}/>{fieldError("institution")}</label>
        <label>Department / field <span aria-hidden="true">*</span><input name="department" maxLength={220} required aria-invalid={!!fieldErrors.department} aria-describedby={describedBy("department")}/>{fieldError("department")}</label>
      </div>
      <div className={styles.row}>
        <label>Country <span aria-hidden="true">*</span><input name="country" autoComplete="country-name" maxLength={120} required aria-invalid={!!fieldErrors.country} aria-describedby={describedBy("country")}/>{fieldError("country")}</label>
        <label>Institutional email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" maxLength={320} required aria-invalid={!!fieldErrors.email} aria-describedby={describedBy("email")}/>{fieldError("email")}</label>
      </div>
      <label>Alternative professional email <small>Optional</small><input name="alternativeEmail" type="email" autoComplete="email" maxLength={320} aria-invalid={!!fieldErrors.alternativeEmail} aria-describedby={describedBy("alternativeEmail")}/>{fieldError("alternativeEmail")}</label>
      <label>Area of expertise <span aria-hidden="true">*</span><textarea name="expertise" rows={3} maxLength={2000} required aria-invalid={!!fieldErrors.expertise} aria-describedby={describedBy("expertise")}/>{fieldError("expertise")}</label>
      <label>Reason for requesting a review copy <span aria-hidden="true">*</span><textarea name="reason" rows={5} maxLength={4000} required aria-invalid={!!fieldErrors.reason} aria-describedby={describedBy("reason")}/>{fieldError("reason")}</label>
      <label>Intended scope of review <span aria-hidden="true">*</span><textarea name="scope" rows={4} maxLength={3000} required aria-invalid={!!fieldErrors.scope} aria-describedby={describedBy("scope")}/>{fieldError("scope")}</label>
      <label>Themes of particular interest <small>Optional</small><input name="themes" maxLength={1200} /></label>
      <div className={styles.honeypot} aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className={styles.check}><input name="scholarlyUse" type="checkbox" required aria-invalid={!!fieldErrors.scholarlyUse} aria-describedby={describedBy("scholarlyUse")}/><span>I am requesting this copy for genuine scholarly, educational or non-commercial evaluation.{fieldError("scholarlyUse")}</span></label>
      <label className={styles.check}><input name="termsAccepted" type="checkbox" required aria-invalid={!!fieldErrors.termsAccepted} aria-describedby={describedBy("termsAccepted")}/><span>I have read and accept the <a href="/academic-review/review-copy-terms">Academic Review Copy Terms</a>.{fieldError("termsAccepted")}</span></label>
      <TurnstileWidget onToken={setTurnstileToken} />
      <button type="submit" disabled={state.kind === "submitting"}>{state.kind === "submitting" ? "Submitting…" : "Submit Review Request"}</button>
      <p className={styles.note}>Requests are individually reviewed. Submission does not guarantee that a review copy will be issued.</p>
    </form>
  );
}
