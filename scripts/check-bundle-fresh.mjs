// Fails if the committed _ds_bundle.js is older than the sources it was built from.
//
// GitHub Pages serves this repo directly, so the showcase renders the committed
// bundle rather than anything built at deploy time. Without this check, editing a
// component and committing without rebuilding would silently republish the old
// specimens — the exact drift that made six fixes have to be applied twice.
//
//   node scripts/check-bundle-fresh.mjs

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { root, sourceHash, HASH_MARKER } from './bundle-sources.mjs';

const bundle = join(root, '_ds_bundle.js');

if (!existsSync(bundle)) {
  console.error('_ds_bundle.js is missing. Run `npm run build`.');
  process.exit(1);
}

const head = readFileSync(bundle, 'utf8').slice(0, 2000);
const found = head.match(new RegExp(`${HASH_MARKER}\\s*([a-f0-9]+)`))?.[1];
const expected = sourceHash();

if (!found) {
  console.error('_ds_bundle.js has no source hash — it predates the generated build.');
  console.error('Run `npm run build` to regenerate it.');
  process.exit(1);
}

if (found !== expected) {
  console.error('_ds_bundle.js is stale.\n');
  console.error(`  committed bundle built from: ${found}`);
  console.error(`  current sources:             ${expected}\n`);
  console.error('The showcase is served straight from git, so this would publish');
  console.error('specimens of components that are no longer what ships.');
  console.error('Run `npm run build` and commit the result.\n');
  process.exit(1);
}

console.log(`_ds_bundle.js is current (${found}).`);
