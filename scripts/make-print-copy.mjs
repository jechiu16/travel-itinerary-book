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
  .intro-card,
  .day,
  .event,
  details,
  .rule,
  .cat,
  table {
    break-inside: avoid;
    page-break-inside: avoid;
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
