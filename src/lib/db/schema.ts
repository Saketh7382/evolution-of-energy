import { boolean, index, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const gariRequestStatus = pgEnum("gari_request_status", [
  "REQUESTED",
  "UNDER_REVIEW",
  "APPROVED",
  "NOT_ISSUED",
  "ISSUED",
  "RESPONSE_RECEIVED",
  "CLOSED",
]);

export const gariReviewRequests = pgTable(
  "gari_review_requests",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    publicReference: varchar("public_reference", { length: 32 }).notNull().unique(),
    fullName: varchar("full_name", { length: 160 }).notNull(),
    academicRole: varchar("academic_role", { length: 180 }).notNull(),
    institution: varchar("institution", { length: 220 }).notNull(),
    department: varchar("department", { length: 220 }).notNull(),
    country: varchar("country", { length: 120 }).notNull(),
    institutionalEmail: varchar("institutional_email", { length: 320 }).notNull(),
    alternativeEmail: varchar("alternative_email", { length: 320 }),
    expertise: text("expertise").notNull(),
    requestReason: text("request_reason").notNull(),
    reviewScope: text("review_scope").notNull(),
    themes: text("themes"),
    scholarlyUseConfirmed: boolean("scholarly_use_confirmed").notNull().default(false),
    termsAccepted: boolean("terms_accepted").notNull().default(false),
    requestFingerprintHash: varchar("request_fingerprint_hash", { length: 64 }),
    status: gariRequestStatus("status").notNull().default("REQUESTED"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("gari_review_requests_created_at_idx").on(table.createdAt),
    index("gari_review_requests_email_idx").on(table.institutionalEmail),
    index("gari_review_requests_fingerprint_idx").on(table.requestFingerprintHash),
  ],
);
