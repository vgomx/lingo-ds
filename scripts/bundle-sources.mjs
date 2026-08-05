// Fingerprints the sources the browser bundle is built from.
//
// _ds_bundle.js has to stay committed: GitHub Pages serves this repo's files
// directly, with no build step, so the showcase loads whatever is in git. That
// reintroduces the drift this whole change set out to remove — someone edits a
// component, commits, and the published specimens quietly show the old one.
//
// Hashing the inputs into the generated header closes it: check-bundle-fresh.mjs
// recomputes the hash and fails if the committed bundle predates its sources.

import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

export const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : p;
});

/** Everything the bundle's contents depend on, in a stable order. */
export function sourceHash() {
  const files = [
    join(root, 'index.ts'),
    ...walk(join(root, 'components')).filter((f) => f.endsWith('.tsx') || f.endsWith('.ts')),
    join(root, 'scripts', 'react-global.cjs'),
    join(root, 'scripts', 'react-jsx-runtime-global.cjs'),
  ].sort();

  const h = createHash('sha256');
  for (const f of files) {
    h.update(relative(root, f));
    h.update(readFileSync(f));
  }
  return h.digest('hex').slice(0, 16);
}

export const HASH_MARKER = 'source-hash:';
