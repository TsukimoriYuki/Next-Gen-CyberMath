// Fix LaTeX escape issues in course data files.
// TypeScript string literals need \\frac, \\sin, etc. (double backslash)
// because \f = form feed, \t = tab, \b = backspace in JS strings.
//
// This script reads the RAW file content and replaces single-backslash
// LaTeX commands with double-backslash versions.

import fs from 'fs';
import path from 'path';

const COMMANDS = [
  // fractions / structures
  'frac', 'sqrt', 'sum', 'prod', 'int', 'oint', 'iint',
  // limits
  'lim', 'limsup', 'liminf',
  // trig functions
  'sin', 'cos', 'tan', 'csc', 'sec', 'cot',
  'arcsin', 'arccos', 'arctan', 'sinh', 'cosh', 'tanh',
  // log/exp
  'log', 'ln', 'exp',
  // Greek lowercase
  'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'varepsilon',
  'zeta', 'eta', 'theta', 'vartheta', 'iota', 'kappa',
  'lambda', 'mu', 'nu', 'xi', 'pi', 'varpi',
  'rho', 'varrho', 'sigma', 'varsigma', 'tau', 'upsilon',
  'phi', 'varphi', 'chi', 'psi', 'omega',
  // Greek uppercase
  'Gamma', 'Delta', 'Theta', 'Lambda', 'Xi', 'Pi',
  'Sigma', 'Upsilon', 'Phi', 'Psi', 'Omega',
  // relations
  'leq', 'geq', 'neq', 'approx', 'equiv', 'sim', 'simeq', 'cong',
  'll', 'gg', 'in', 'notin', 'subset', 'supset', 'subseteq', 'supseteq', 'ni',
  'perp', 'parallel',
  // arrows
  'rightarrow', 'leftarrow', 'Rightarrow', 'Leftarrow',
  'leftrightarrow', 'Leftrightarrow',
  'nearrow', 'searrow', 'nwarrow', 'swarrow',
  'to', 'gets', 'mapsto',
  // operators
  'cdot', 'cdots', 'ldots', 'vdots', 'ddots',
  'times', 'div', 'pm', 'mp', 'oplus', 'otimes',
  'cap', 'cup', 'bigcap', 'bigcup', 'setminus',
  'land', 'lor', 'lnot', 'neg',
  'forall', 'exists', 'nexists',
  'partial', 'nabla', 'infty',
  // accents / decorators
  'vec', 'hat', 'bar', 'tilde', 'dot', 'ddot', 'acute', 'grave', 'breve', 'check',
  'overline', 'underline', 'widehat', 'widetilde',
  'overleftarrow', 'overrightarrow',
  'overbrace', 'underbrace',
  // spacing
  'quad', 'qquad',
  // delimiters
  'left', 'right', 'lfloor', 'rfloor', 'lceil', 'rceil',
  'langle', 'rangle',
  // text in math
  'text', 'mathrm', 'mathbf', 'mathit', 'mathcal', 'mathbb', 'mathsf', 'mathtt',
  // environments
  'begin', 'end', 'array', 'matrix', 'pmatrix', 'bmatrix', 'vmatrix',
  // named functions
  'max', 'min', 'sup', 'inf', 'det', 'dim', 'ker', 'deg', 'gcd',
  'Pr', 'Re', 'Im', 'arg',
  // combinatorics
  'binom', 'pmod', 'mod',
  // geometry
  'triangle', 'angle', 'square', 'circ', 'bullet', 'star', 'diamond',
  // misc
  'because', 'therefore',
];

// Sort longest first to avoid prefix issues (e.g., 'lim' before 'limsup')
const sortedCmds = [...new Set(COMMANDS)].sort((a, b) => b.length - a.length);

// Pattern: single \ NOT preceded by \ + command + NOT followed by letter
// Using lookbehind (?<!\\) and lookahead (?![a-zA-Z])
const PATTERN = new RegExp(
  '(?<!\\\\)\\\\(' + sortedCmds.join('|') + ')(?![a-zA-Z])',
  'g',
);

function fixFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  // Replace \command → \\command (double backslash in file = single at runtime)
  const fixed = raw.replace(PATTERN, (match, cmd) => '\\\\' + cmd);
  if (raw !== fixed) {
    fs.writeFileSync(filePath, fixed, 'utf8');
    const count = [...raw.matchAll(PATTERN)].length;
    console.log(`FIXED (${count} replacements): ${filePath}`);
    return count;
  }
  return 0;
}

function walkDir(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      total += walkDir(full);
    } else if (entry.name.endsWith('.ts')) {
      total += fixFile(full);
    }
  }
  return total;
}

const total = walkDir('src/data/courses');
console.log(`\nTotal replacements: ${total}`);
