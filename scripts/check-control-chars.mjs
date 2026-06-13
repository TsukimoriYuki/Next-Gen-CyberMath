import fs from 'fs';
import path from 'path';

let tabIssues = 0, ffIssues = 0, bsIssues = 0;

function walkDir(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
    } else if (entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      // Tab chars that are NOT in indentation (i.e., mid-line tabs)
      const midLineTabs = (content.match(/[^\n]\t/g) || []).length;
      const ffs = (content.match(/\x0c/g) || []).length;  // form feed
      const bss = (content.match(/\x08/g) || []).length;  // backspace
      if (midLineTabs || ffs || bss) {
        console.log(entry.name + ': mid-line-tabs=' + midLineTabs + ' formfeeds=' + ffs + ' backspaces=' + bss);
        tabIssues += midLineTabs;
        ffIssues += ffs;
        bsIssues += bss;
      }
    }
  }
}

walkDir('src/data/courses');
console.log('Summary: mid-line tabs=' + tabIssues + ' form feeds=' + ffIssues + ' backspaces=' + bsIssues);
