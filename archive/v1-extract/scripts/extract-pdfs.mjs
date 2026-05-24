import fs from "node:fs/promises";
import path from "node:path";
import { PDFParse } from "pdf-parse";

const files = [
  "C:/Users/minob/Downloads/1.pdf",
  "C:/Users/minob/Downloads/2.pdf",
  "C:/Users/minob/Downloads/3.pdf",
  "C:/Users/minob/Downloads/4.pdf",
  "C:/Users/minob/Downloads/5.pdf",
  "C:/Users/minob/Downloads/6.pdf",
  "C:/Users/minob/Downloads/thema 2.pdf",
  "C:/Users/minob/Downloads/DGP_Kapitel_1_Vollstaendiger_Lernzettel.pdf",
  "C:/Users/minob/Downloads/Digitale_Geschaeftsprozesse_Lernzettel.pdf",
  "C:/Users/minob/Downloads/1-Geschäftsprozesse und deren Management.pdf",
];

const outDir = path.resolve("analysis", "pdf-text");
await fs.mkdir(outDir, { recursive: true });

const report = [];

for (const file of files) {
  const data = await fs.readFile(file);
  const parser = new PDFParse({ data });
  try {
    const result = await parser.getText();
    const name = path.basename(file).replace(/[^\p{L}\p{N}.-]+/gu, "_");
    const outPath = path.join(outDir, `${name}.txt`);
    await fs.writeFile(outPath, result.text, "utf8");
    report.push({
      file: path.basename(file),
      pages: result.total,
      chars: result.text.length,
      outPath,
      preview: result.text.slice(0, 300).replace(/\s+/g, " "),
    });
  } finally {
    await parser.destroy();
  }
}

console.log(JSON.stringify(report, null, 2));
