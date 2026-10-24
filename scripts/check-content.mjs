// Lists every [placeholder] still present in the content config and any missing env vars.
// Usage: npm run check:content   (exits with code 1 when anything is left to fill in)
import { site, faqs } from "../src/content/site.ts";

const found = [];
const walk = (value, path) => {
  if (typeof value === "string") {
    for (const m of value.matchAll(/\[[^\]]+\]/g)) found.push(`${path}: ${m[0]}`);
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => walk(v, `${path}[${i}]`));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) walk(v, path ? `${path}.${k}` : k);
  }
};
walk(site, "site");
walk(faqs, "faqs");

const issues = [...found];
if (site.whatsapp.number.includes("X")) issues.push("NEXT_PUBLIC_WHATSAPP_NUMBER is not set");
if (site.url.includes("example.com")) issues.push("NEXT_PUBLIC_SITE_URL is not set");
if (site.syllabus.status !== "approved") issues.push('site.syllabus.status is not "approved"');
if (site.demoMode) issues.push("site.demoMode is still true");

if (issues.length === 0) {
  console.log("Content check passed — no placeholders left.");
} else {
  console.log(`${issues.length} item(s) to complete before launch:\n`);
  for (const line of issues) console.log(`  • ${line}`);
  console.log("\nAlso replace public/syllabus/trading-mentorship-syllabus.pdf with the official syllabus.");
  process.exitCode = 1;
}
