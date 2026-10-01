import { promises as fs } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const ignored = new Set([".git", ".next", "node_modules", "out"]);
const textExtensions = new Set([".css", ".html", ".js", ".json", ".md", ".mjs", ".ts", ".tsx", ".txt", ".xml", ".yml", ".yaml"]);
const forbiddenNames = new Set([".env", ".env.local", "vocabulary.json"]);
const forbiddenPatterns = [
  new RegExp(["data", "vocab"].join("[\\\\/]"), "i"),
  new RegExp(["data", "years"].join("[\\\\/]"), "i"),
  new RegExp(["recognition", "workbench"].join("-"), "i"),
  new RegExp(["NEXT", "PUBLIC", "SUPABASE"].join("_"), "i"),
  new RegExp(["SUPABASE", "SERVICE", "ROLE"].join("_"), "i"),
  new RegExp(["题干", "："].join("")),
  new RegExp(["答案", "："].join("")),
  new RegExp(["BEGIN", "PRIVATE KEY"].join(".*")),
];

const failures = [];

async function visit(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    const relativePath = path.relative(projectRoot, fullPath);

    if (entry.isDirectory()) {
      await visit(fullPath);
      continue;
    }

    if (relativePath === path.join("scripts", "check-public-boundary.mjs")) continue;

    if (forbiddenNames.has(entry.name)) failures.push(`${relativePath}: forbidden file name`);
    if (!textExtensions.has(path.extname(entry.name).toLowerCase())) continue;

    const contents = await fs.readFile(fullPath, "utf8");
    for (const pattern of forbiddenPatterns) {
      if (pattern.test(contents)) failures.push(`${relativePath}: matched ${pattern}`);
    }
  }
}

await visit(projectRoot);

if (failures.length) {
  console.error("Public boundary check failed:\n" + failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Public boundary check passed.");
