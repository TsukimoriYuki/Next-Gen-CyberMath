import fs from 'fs';
import path from 'path';

const checks = [
  // sinA, cosA, tanA not in proper LaTeX (not preceded by \\)
  { name: 'sinA_raw', pattern: /(?<!\\\\)(?:sin|cos|tan)[A-Z]/g },
  // 'imes' without \\t prefix (remnant of \times)
  { name: 'imes_artifact', pattern: /(?<!t)imes\b/g },
  // form-feed prefix to 'rac' artifact
  { name: 'rac_artifact', pattern: /\x0crac/g },
  // phase pending quality tags
  { name: 'phase_pending', pattern: /Phase\d+補完予定/g },
  // empty qualityTags arrays
  { name: 'empty_qualityTags', pattern: /qualityTags:\s*\[\]/g },
  // display math prohibitions
  { name: 'display_math', pattern: /\$\$[^$]+\$\$/g },
];

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.name.endsWith('.ts') && !entry.name.includes('index')) {
      const content = fs.readFileSync(full, 'utf8');
      for (const check of checks) {
        check.pattern.lastIndex = 0;
        const matches = [...content.matchAll(check.pattern)];
        if (matches.length > 0) {
          const samples = matches.slice(0, 2).map(m => JSON.stringify(m[0])).join(', ');
          console.log(`${entry.name} [${check.name}]: ${matches.length} occurrences — e.g. ${samples}`);
        }
      }
    }
  }
}

walkDir('src/data/courses');
console.log('\nScan complete.');
