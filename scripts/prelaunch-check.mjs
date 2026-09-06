const required = [
  "NEXT_PUBLIC_SITE_URL",
  "AMAZON_BOOK_URL",
  "AUTHOR_EMAIL",
  "ACADEMIC_REVIEW_EMAIL",
  "CONTACT_EMAIL",
];
const gariRequired = [
  "DATABASE_URL",
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SECRET_KEY",
  "RATE_LIMIT_PEPPER",
  "EMAIL_API_KEY",
  "TRANSACTIONAL_FROM_EMAIL",
];
const missing = required.filter((k)=>!process.env[k]);
if (process.env.NEXT_PUBLIC_GARI_REQUESTS_ENABLED === "true") {
  missing.push(...gariRequired.filter((k)=>!process.env[k]));
}
if (process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== "https://evolutionofenergy.org") {
  console.warn(`WARN: NEXT_PUBLIC_SITE_URL is ${process.env.NEXT_PUBLIC_SITE_URL}`);
}
if (missing.length) {
  console.error("PRELAUNCH BLOCKED. Missing configuration:");
  for (const key of [...new Set(missing)]) console.error(`- ${key}`);
  process.exit(1);
}
console.log("PASS: Required launch environment variables are present.");
