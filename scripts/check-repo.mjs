import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const requiredFiles = [
  "SKILL.md",
  ".claude-plugin/plugin.json",
  "research-and-factcheck.md",
  "template.html",
  "PROMPT.md",
  "README.md",
];

const failures = [];
const warnings = [];

function filePath(file) {
  return path.join(root, file);
}

function read(file) {
  return readFileSync(filePath(file), "utf8");
}

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function countMatches(text, pattern) {
  return [...text.matchAll(pattern)].length;
}

function checkRequiredFiles() {
  for (const file of requiredFiles) {
    if (!existsSync(filePath(file))) {
      fail(`Missing required file: ${file}`);
    }
  }
}

function checkPackage() {
  const pkg = JSON.parse(read("package.json"));
  const scripts = pkg.scripts || {};
  for (const name of ["check", "build:print"]) {
    if (!scripts[name]) fail(`package.json missing npm script: ${name}`);
  }
}

function checkPlugin() {
  let manifest;
  try {
    manifest = JSON.parse(read(".claude-plugin/plugin.json"));
  } catch (error) {
    fail(`.claude-plugin/plugin.json is not valid JSON: ${error.message}`);
    return;
  }
  if (!manifest.name) fail(".claude-plugin/plugin.json missing name.");
  if (!manifest.version) fail(".claude-plugin/plugin.json missing version.");
  if (manifest.name && manifest.name !== "travel-itinerary-book") {
    fail(".claude-plugin/plugin.json name must be travel-itinerary-book.");
  }
}

function checkSkill() {
  const skill = read("SKILL.md");
  const lines = skill.split(/\r?\n/);

  if (lines[0] !== "---") {
    fail("SKILL.md must start with YAML frontmatter.");
    return;
  }

  const end = lines.indexOf("---", 1);
  if (end === -1) {
    fail("SKILL.md frontmatter is not closed.");
    return;
  }

  const frontmatter = lines.slice(1, end);
  const keys = frontmatter
    .map((line) => line.match(/^([a-zA-Z0-9_-]+):/))
    .filter(Boolean)
    .map((match) => match[1]);

  for (const key of ["name", "description"]) {
    if (!keys.includes(key)) fail(`SKILL.md frontmatter missing ${key}.`);
  }

  for (const key of keys) {
    if (!["name", "description"].includes(key)) {
      fail(`SKILL.md frontmatter has unsupported key: ${key}`);
    }
  }

  if (!frontmatter.some((line) => line === "name: travel-itinerary-book")) {
    fail("SKILL.md name must be travel-itinerary-book.");
  }

  if (lines.length > 220) {
    warn(`SKILL.md is ${lines.length} lines; consider moving detail into references.`);
  }

  const requiredWorkflowTerms = [
    "Diverge",
    "Summarize",
    "Confirm",
    "Research & correct",
    "Review",
  ];

  for (const term of requiredWorkflowTerms) {
    if (!skill.includes(term)) {
      fail(`SKILL.md is missing workflow step: ${term}`);
    }
  }

  if (!skill.includes("Never invent")) {
    fail("SKILL.md should explicitly forbid invented bookings.");
  }

  if (!/^##\s+guardrails/im.test(skill)) {
    fail("SKILL.md should contain a ## Guardrails section.");
  }
}

function checkResearch() {
  const research = read("research-and-factcheck.md");
  const lower = research.toLowerCase();
  if (!lower.includes("untrusted")) {
    fail("research-and-factcheck.md should mark fetched content as untrusted.");
  }
  if (
    !lower.includes("data, not instructions") &&
    !lower.includes("data not instructions")
  ) {
    fail("research-and-factcheck.md should state fetched content is data, not instructions.");
  }
}

function checkHtmlFile(file) {
  const html = read(file);
  const markup = html.replace(/<!--[\s\S]*?-->/g, "");
  const pairs = [
    ["section", /<section\b/gi, /<\/section>/gi],
    ["details", /<details\b/gi, /<\/details>/gi],
    ["table", /<table\b/gi, /<\/table>/gi],
  ];

  for (const [name, openPattern, closePattern] of pairs) {
    const opens = countMatches(markup, openPattern);
    const closes = countMatches(markup, closePattern);
    if (opens !== closes) {
      fail(`${file}: mismatched <${name}> tags (${opens} open, ${closes} close).`);
    }
  }

  for (const required of [
    "<html lang=\"zh-Hant\">",
    "class=\"timeline\"",
    "id=\"logistics\"",
    "id=\"buying\"",
    "class=\"backtop\"",
  ]) {
    if (!markup.includes(required)) {
      fail(`${file}: missing required template marker: ${required}`);
    }
  }

}

function checkLocalLinks(file) {
  const text = read(file);
  const linkPattern = /\b(?:href|src)="([^"]+)"/g;

  for (const match of text.matchAll(linkPattern)) {
    const href = match[1];
    if (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    ) {
      continue;
    }

    const [withoutHash] = href.split("#");
    if (!withoutHash) continue;

    const target = path.join(path.dirname(filePath(file)), withoutHash);
    if (!existsSync(target)) {
      fail(`${file}: broken local link or asset path: ${href}`);
    }
  }
}

function checkReadme() {
  const readme = read("README.md");
  for (const term of ["發散", "總結", "確認", "查證糾錯", "npm run check"]) {
    if (!readme.includes(term)) fail(`README.md missing expected project guidance: ${term}`);
  }
}

checkRequiredFiles();

if (failures.length === 0) {
  checkPackage();
  checkPlugin();
  checkSkill();
  checkResearch();
  checkReadme();
  checkHtmlFile("template.html");
  for (const file of ["README.md", "template.html"]) {
    checkLocalLinks(file);
  }
}

for (const message of warnings) {
  console.warn(`warning: ${message}`);
}

if (failures.length > 0) {
  console.error("Repository checks failed:");
  for (const message of failures) console.error(`- ${message}`);
  process.exit(1);
}

console.log("Repository checks passed.");
