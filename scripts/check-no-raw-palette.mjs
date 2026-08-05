// Fails if a component reaches for a raw palette step instead of a semantic token.
//
// readme.md states the rule: "Components never reach for a raw palette step that
// only reads on one background." It is the same failure every time — the surface
// is pinned to one theme while the text on it follows the other, and the result
// is invisible rather than merely ugly. The Dialog shipped with --ink-700 behind
// --text-strong, which in light mode is dark on dark.
//
//   node scripts/check-no-raw-palette.mjs

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'components');

/**
 * Ramps that exist in one theme only. Accent ramps (violet, mint, red…) are not
 * listed: they are the same hue in both scopes, and components legitimately use
 * a specific step for things like a button's pressed edge or a deterministic
 * avatar hue.
 */
const THEME_ONLY = /var\(--(ink|paper)-\d+\)/g;

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.tsx') ? [p] : [];
});

const hits = [];
for (const file of walk(root)) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    for (const m of line.matchAll(THEME_ONLY)) {
      hits.push({ file: file.slice(root.length - 10), line: i + 1, token: m[0] });
    }
  });
}

if (hits.length) {
  console.error('Components are using raw palette steps that only read on one theme:\n');
  for (const h of hits) console.error(`  ${h.file}:${h.line}  ${h.token}`);
  console.error('\nUse a semantic token instead — --surface-*, --border-*, --text-*.');
  console.error('If the element is meant to stay dark on a light page, mark it');
  console.error('data-theme="dark" so its own foregrounds resolve with it, as Tooltip does.\n');
  process.exit(1);
}

console.log('No raw palette steps in components.');
