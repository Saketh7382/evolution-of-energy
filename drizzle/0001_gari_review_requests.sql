DO $$ BEGIN
  CREATE TYPE "gari_request_status" AS ENUM ('REQUESTED','UNDER_REVIEW','APPROVED','NOT_ISSUED','ISSUED','RESPONSE_RECEIVED','CLOSED');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "gari_review_requests" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "public_reference" varchar(32) NOT NULL UNIQUE,
  "full_name" varchar(160) NOT NULL,
  "academic_role" varchar(180) NOT NULL,
  "institution" varchar(220) NOT NULL,
  "department" varchar(220) NOT NULL,
  "country" varchar(120) NOT NULL,
  "institutional_email" varchar(320) NOT NULL,
  "alternative_email" varchar(320),
  "expertise" text NOT NULL,
  "request_reason" text NOT NULL,
  "review_scope" text NOT NULL,
  "themes" text,
  "scholarly_use_confirmed" boolean DEFAULT false NOT NULL,
  "terms_accepted" boolean DEFAULT false NOT NULL,
  "request_fingerprint_hash" varchar(64),
  "status" "gari_request_status" DEFAULT 'REQUESTED' NOT NULL,
  "created_at" timestamptz DEFAULT now() NOT NULL,
  "updated_at" timestamptz DEFAULT now() NOT NULL
);
CREATE INDEX IF NOT EXISTS "gari_review_requests_created_at_idx" ON "gari_review_requests" ("created_at");
CREATE INDEX IF NOT EXISTS "gari_review_requests_email_idx" ON "gari_review_requests" ("institutional_email");
CREATE INDEX IF NOT EXISTS "gari_review_requests_fingerprint_idx" ON "gari_review_requests" ("request_fingerprint_hash");
