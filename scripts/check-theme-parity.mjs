// Fails if the two theme scopes have drifted apart.
//
// The contract in readme.md is that either scope can nest inside the other — a
// dark product island on a light marketing page, and the reverse. That only
// holds if [data-theme="dark"] restores every token [data-theme="light"]
// overrides. Miss one and the nested scope silently keeps the outer scope's
// value for it, which is how the marketing hero ended up pairing the light
// --success fill with the dark --on-success label at 2.5:1 — passing no
// contrast bar, and visible to nobody reading the CSS.
//
//   node scripts/check-theme-parity.mjs

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const file = join(dirname(fileURLToPath(import.meta.url)), '..', 'tokens', 'colors.css');

const scopes = {};
let current = null;
for (const line of readFileSync(file, 'utf8').split('\n')) {
  const open = line.match(/^(:root|\[data-theme="(?:dark|light)"\])\s*\{/);
  if (open) { current = open[1]; scopes[current] ??= new Map(); continue; }
  if (line.startsWith('}')) { current = null; continue; }
  if (!current) continue;
  for (const d of line.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) scopes[current].set(d[1], d[2].trim());
}

const dark = scopes['[data-theme="dark"]'] ?? new Map();
const light = scopes['[data-theme="light"]'] ?? new Map();

const missingFromDark = [...light.keys()].filter((t) => !dark.has(t));
const missingFromLight = [...dark.keys()].filter((t) => !light.has(t));

if (missingFromDark.length || missingFromLight.length) {
  console.error('Theme scopes are not at parity.\n');
  if (missingFromDark.length) {
    console.error('  [data-theme="light"] overrides these, but [data-theme="dark"] does not restore them.');
    console.error('  A dark island inside a light page will keep the light value:');
    for (const t of missingFromDark) console.error(`    ${t}`);
    console.error('');
  }
  if (missingFromLight.length) {
    console.error('  [data-theme="dark"] overrides these, but [data-theme="light"] does not:');
    for (const t of missingFromLight) console.error(`    ${t}`);
    console.error('');
  }
  process.exit(1);
}

console.log(`Theme parity OK — both scopes declare the same ${light.size} tokens.`);
