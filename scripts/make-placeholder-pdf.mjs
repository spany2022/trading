// Writes a clearly-labelled PLACEHOLDER syllabus PDF so the download buttons work in review builds.
// Replace the output file with the mentor's official syllabus before launch.
import { writeFileSync } from "node:fs";
import { site } from "../src/content/site.ts";

const esc = (s) => s.replace(/[^\x20-\x7e]/g, "-").replace(/[\\()]/g, (c) => "\\" + c);
const lines = [];
const text = (x, y, size, str, font = "F1", rgb = "0.09 0.13 0.2") =>
  lines.push(`BT /${font} ${size} Tf ${rgb} rg 1 0 0 1 ${x} ${y} Tm (${esc(str)}) Tj ET`);

lines.push("0.84 0.70 0.42 rg 56 742 483 40 re f");
text(72, 756, 13, "PLACEHOLDER DOCUMENT - NOT THE OFFICIAL SYLLABUS", "F2", "0.03 0.08 0.06");
text(56, 690, 26, "Trading Mentorship Program", "F2");
text(56, 664, 14, "Syllabus PDF placeholder", "F1", "0.29 0.33 0.41");
[
  "This file exists so the download buttons on the landing page can be tested.",
  "Replace it with the mentor's official syllabus before the page receives traffic:",
  "public/syllabus/trading-mentorship-syllabus.pdf",
].forEach((l, i) => text(56, 620 - i * 18, 11, l, i === 2 ? "F3" : "F1", "0.29 0.33 0.41"));
text(56, 548, 13, "Draft module outline (for review - not confirmed course content)", "F2");
site.syllabus.modules.forEach((m, i) => {
  text(56, 520 - i * 24, 12, String(i + 1).padStart(2, "0"), "F3", "0.04 0.48 0.35");
  text(84, 520 - i * 24, 12, m.title);
});
const risk = site.risk.full.match(/.{1,95}(\s|$)/g).map((s) => s.trim());
risk.forEach((l, i) => text(56, 120 - i * 14, 9, l, "F1", "0.29 0.33 0.41"));

const stream = lines.join("\n");
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> >>",
  `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Courier >>",
  "<< /Title (Trading Mentorship Syllabus - PLACEHOLDER) /Producer (make-placeholder-pdf) >>",
];

let pdf = "%PDF-1.4\n";
const offsets = objects.map((body, i) => {
  const at = Buffer.byteLength(pdf);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  return at;
});
const xref = Buffer.byteLength(pdf);
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

const out = new URL("../public/syllabus/trading-mentorship-syllabus.pdf", import.meta.url);
writeFileSync(out, pdf, "latin1");
console.log(`Wrote placeholder PDF (${Buffer.byteLength(pdf)} bytes)`);
