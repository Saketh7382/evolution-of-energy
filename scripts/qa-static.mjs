import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";

const root = process.cwd();
const failures = [];
const warnings = [];

const required = [
  "src/app/layout.tsx",
  "src/app/page.tsx",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "public/canonical/eoe-canonical-cover.png",
  "public/author/sreedhar-g-cropped.jpg",
  "src/app/api/gari/review-request/route.ts",
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
];
for (const file of required) if (!existsSync(join(root, file))) failures.push(`Missing required file: ${file}`);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p)); else out.push(p);
  }
  return out;
}

const appDir = join(root, "src/app");
const sourceFiles = walk(join(root, "src")).filter((p) => /\.(tsx?|css)$/.test(p));
const pageFiles = walk(appDir).filter((p) => p.endsWith(`${sep}page.tsx`));
const routes = new Set(pageFiles.map((p) => {
  const dir = relative(appDir, dirname(p)).replaceAll(sep, "/");
  return dir ? `/${dir}` : "/";
}));

for (const file of sourceFiles) {
  const text = readFileSync(file, "utf8");
  const rel = relative(root, file);
  if (/href=["']#["']/.test(text)) failures.push(`Placeholder href found: ${rel}`);
  if (/TODO|FIXME/.test(text)) warnings.push(`TODO/FIXME remains: ${rel}`);
  if (/Version 4|EOE4/.test(text) && !rel.includes("docs")) warnings.push(`Internal edition wording appears in public source: ${rel}`);

  for (const match of text.matchAll(/href=(?:\{|)["'`]([^"'`]+)["'`](?:\}|)/g)) {
    const raw = match[1];
    if (!raw.startsWith("/") || raw.startsWith("//")) continue;
    const target = raw.split("#")[0].split("?")[0] || "/";
    if (target.startsWith("/api/")) continue;
    if (!routes.has(target)) failures.push(`Internal link points to missing route ${target}: ${rel}`);
  }
}

const header = readFileSync(join(root, "src/components/layout/SiteHeader.tsx"), "utf8");
if (/className=\{styles\.mark\}/.test(header)) failures.push("Unapproved/reimagined brand mark is still rendered in the header.");

const terms = readFileSync(join(root, "src/app/terms/page.tsx"), "utf8");
if (/will be finalized before public launch/i.test(terms)) warnings.push("Terms of Use are still a launch blocker.");
const privacy = readFileSync(join(root, "src/app/privacy/page.tsx"), "utf8");
if (/remain launch-gate items/i.test(privacy)) warnings.push("Privacy retention/contact details are still launch blockers.");
if (!existsSync(join(root, "package-lock.json"))) warnings.push("package-lock.json is absent; deterministic build validation is still pending.");

const expectedHashes = new Map([
  ["public/canonical/eoe-canonical-cover.png", "6c2d2564f7f6e12e817c48be32efcbec7851811b461ed68a5a6b2eecff2d44db"],
  ["public/author/sreedhar-g-cropped.jpg", "cd55072c506f07bb9a5c4f88410f816c56a0e2a5299bfe16135ebada44dbb4c4"],
]);
for (const [file, expected] of expectedHashes) {
  if (!existsSync(join(root, file))) continue;
  const actual = createHash("sha256").update(readFileSync(join(root, file))).digest("hex");
  if (actual !== expected) failures.push(`Canonical asset fingerprint mismatch: ${file}`);
}

console.log(`Static QA: ${sourceFiles.length} source/style files scanned; ${routes.size} public page routes checked.`);
for (const w of warnings) console.warn(`WARN: ${w}`);
for (const f of failures) console.error(`FAIL: ${f}`);
if (failures.length) process.exit(1);
console.log(`PASS: ${warnings.length} launch warning(s), 0 static QA failure(s).`);
