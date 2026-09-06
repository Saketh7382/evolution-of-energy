import { z } from "zod";

const clean = (max: number) => z.string().trim().min(2).max(max);

export const reviewRequestSchema = z.object({
  fullName: clean(160),
  role: clean(180),
  institution: clean(220),
  department: clean(220),
  country: clean(120),
  email: z.string().trim().email().max(320),
  alternativeEmail: z.union([z.literal(""), z.string().trim().email().max(320)]).optional().default(""),
  expertise: clean(2000),
  reason: clean(4000),
  scope: clean(3000),
  themes: z.string().trim().max(1200).optional().default(""),
  scholarlyUse: z.boolean().refine((value) => value, { message: "Please confirm genuine scholarly, educational or non-commercial use." }),
  termsAccepted: z.boolean().refine((value) => value, { message: "Please accept the Academic Review Copy Terms." }),
  website: z.string().max(0).optional().default(""),
  turnstileToken: z.string().max(4096).optional().default(""),
});

export type ReviewRequestInput = z.infer<typeof reviewRequestSchema>;
