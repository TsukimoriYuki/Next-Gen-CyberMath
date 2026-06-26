import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const COURSE_DIR = path.join(ROOT, "src", "data", "courses");
const TEX_COMMAND_PATTERN =
  /\\\\(frac|dfrac|sin|cos|tan|theta|sqrt|sum|int|lim|angle|leq|geq|bar|vec|overrightarrow|cdot|circ)\b/;
const SINGLE_BACKSLASH_COMMAND_PATTERN =
  /(^|[^\\])\\(frac|dfrac|sin|cos|tan|theta|sqrt|sum|int|lim|angle|leq|geq|bar|vec|overrightarrow|cdot|circ)\b/;
const FORMULA_PATTERN =
  /formula:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`[\s\S]*?`)/g;

function walk(dir) {
  const files = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && fullPath.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

function lineOf(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

function unwrapSourceLiteral(literal) {
  return literal.slice(1, -1).trim();
}

function isDollarWrapped(value) {
  return (
    (value.startsWith("$") && value.endsWith("$")) ||
    (value.startsWith("$$") && value.endsWith("$$"))
  );
}

const risks = [];

for (const file of walk(COURSE_DIR)) {
  const source = fs.readFileSync(file, "utf8");
  let match;

  while ((match = FORMULA_PATTERN.exec(source))) {
    const literal = match[1];
    const value = unwrapSourceLiteral(literal);
    const relativeFile = path.relative(ROOT, file).replaceAll("\\", "/");
    const line = lineOf(source, match.index);
    const hasTexCommand = TEX_COMMAND_PATTERN.test(value);
    const hasSingleBackslashCommand = SINGLE_BACKSLASH_COMMAND_PATTERN.test(value);

    if (!isDollarWrapped(value) || hasTexCommand || hasSingleBackslashCommand) {
      risks.push({
        file: relativeFile,
        line,
        unwrapped: !isDollarWrapped(value),
        texCommand: hasTexCommand,
        singleBackslashCommand: hasSingleBackslashCommand,
        value,
      });
    }
  }
}

console.log(`Course formula audit: ${risks.length} risk item(s) found.`);

for (const risk of risks) {
  const flags = [
    risk.unwrapped ? "unwrapped" : null,
    risk.texCommand ? "tex-command" : null,
    risk.singleBackslashCommand ? "single-backslash" : null,
  ]
    .filter(Boolean)
    .join(", ");

  console.log(`${risk.file}:${risk.line} [${flags}] ${risk.value}`);
}
