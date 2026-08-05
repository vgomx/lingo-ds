/**
 * `--text-faint` is not a text colour.
 *
 * The text ramp is strong / body / muted. Faint sits below the 4.5:1 floor on
 * every surface in both themes — 1.93 on --surface-raised in dark at its worst —
 * so it is reserved for non-text: icon glyphs, dividers, decorative rules, which
 * answer to 3:1 instead. It clears that everywhere (3.06 light, 3.61 dark).
 *
 * This was a rule enforced by nothing until it was found broken in 28 places at
 * once.
 *
 * Every `color:` that resolves to faint is flagged, rather than only lines that
 * also mention a fontSize — that narrower heuristic missed StreakPill, where the
 * colour and the font size sat in the same style object but on different lines.
 * A genuine non-text use marks itself with a `faint-ok:` comment giving the
 * reason, which keeps the exception visible instead of silent.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SCAN = ['components'];

const walk = (dir) => readdirSync(dir).flatMap((entry) => {
  const full = join(dir, entry);
  if (statSync(full).isDirectory()) return walk(full);
  return /\.(tsx|ts)$/.test(entry) ? [full] : [];
});

const offences = [];
for (const base of SCAN) {
  for (const file of walk(join(root, base))) {
    readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
      if (!line.includes('--text-faint')) return;
      if (line.includes('faint-ok:')) return;
      // Only `color:` matters — faint is legitimate for borders, rings and fills.
      if (!/\bcolor\s*:/.test(line)) return;
      offences.push({ file: relative(root, file), line: i + 1, text: line.trim().slice(0, 110) });
    });
  }
}

if (offences.length) {
  console.error(`--text-faint is used as a text colour in ${offences.length} place(s):`);
  for (const o of offences) console.error(`  ${o.file}:${o.line}\n    ${o.text}`);
  console.error('\nUse --text-muted for text. Faint is for icons and rules only.');
  process.exit(1);
}

console.log('No --text-faint used as text.');
