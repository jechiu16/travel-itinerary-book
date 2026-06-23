import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const [inputFile, outputFile] = process.argv.slice(2);

if (!inputFile || !outputFile) {
  console.error("Usage: node scripts/make-print-copy.mjs <input.html> <output.html>");
  process.exit(1);
}

const inputPath = path.resolve(inputFile);
const outputPath = path.resolve(outputFile);
let html = readFileSync(inputPath, "utf8");

const printCss = `

/* Generated print-copy rules: expand folds and make PDF output readable. */
@media print {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  html {
    scroll-behavior: auto;
  }
  body {
    background: #fff;
  }
  .nav,
  .backtop {
    display: none !important;
  }
  .wrap {
    max-width: none;
    padding: 0;
  }
  /* Each day section starts on a fresh page */
  .day {
    break-before: page;
    page-break-before: always;
  }
  /* Keep small blocks from splitting across a page boundary */
  .intro-card,
  .event,
  .callout,
  .alt-item,
  .food-item,
  .buy-item,
  tr,
  .rule,
  .cat {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  /* Tall tables / folds may flow across pages; their rows stay intact */
  table {
    break-inside: auto;
  }
  /* Don't strand a heading at the bottom of a page */
  .day-head,
  .block-label,
  summary,
  h2,
  h3 {
    break-after: avoid;
    page-break-after: avoid;
  }
  p {
    orphans: 3;
    widows: 3;
  }
  details {
    background: #fff;
  }
  summary {
    cursor: default;
  }
  summary .chev {
    display: none;
  }
}
`;

html = html.replace(/<details\b(?![^>]*\bopen\b)([^>]*)>/gi, "<details open$1>");

if (!html.includes("Generated print-copy rules")) {
  if (!html.includes("</style>")) {
    console.error("Input HTML does not contain a </style> tag for print CSS injection.");
    process.exit(1);
  }
  html = html.replace("</style>", `${printCss}</style>`);
}

if (!html.includes("<!-- print-copy generated -->")) {
  html = html.replace("<html", "<!-- print-copy generated -->\n<html");
}

mkdirSync(path.dirname(outputPath), { recursive: true });
writeFileSync(outputPath, html, "utf8");

console.log(`Wrote print copy: ${path.relative(process.cwd(), outputPath)}`);
