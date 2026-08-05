// Builds the stacked lockup: the reduced mark with TOOLBOX beneath it.
//
// Nothing here is redrawn. The TOOLBOX letterforms are lifted straight out of
// logo-wordmark-white.svg, where they already exist as outlined paths — so they
// are the same Dangrek letterforms that were set and flattened for the wordmark,
// not a re-setting of them. The brand rule is explicit that the wordmark must
// never be re-set in a font, and this is how you honour it: compose from the
// approved outlines.
//
// Re-run after changing the source lockups:  node scripts/build-stack-lockup.mjs

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { readPaths, bbox, viewBox, round } from './svg-geom.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const logo = (name) => join(root, 'assets', 'logo', name);

/** Space between the mark and the plate, as a fraction of the lockup width. */
const GAP_RATIO = 0.08;

/** Colourways, mirroring the existing mark-*.svg set. */
const VARIANTS = {
  violet: { fill: '#6A4CF0' },
  dark: { fill: '#14141C' },
  light: { fill: '#FFFFFF' },
  brand: { fill: 'currentColor' },
};

// ── The TOOLBOX plate, taken from the wordmark ──────────────────────
const WORDMARK = logo('logo-wordmark-white.svg');
const wmPaths = readPaths(WORDMARK);
const wmBoxes = wmPaths.map((p) => bbox(p.d, p.matrix));

// The plate is the lower of the two compound paths; "lingo" is the upper one.
// Picking it by geometry rather than index means a re-exported wordmark that
// happens to reorder its paths still resolves correctly.
const plateIndex = wmBoxes.reduce((lo, b, i) => (b.y > wmBoxes[lo].y ? i : lo), 0);
const plate = wmPaths[plateIndex];
const plateBox = wmBoxes[plateIndex];

if (plateIndex === 0 && wmPaths.length > 1 && wmBoxes[1].y > plateBox.y) {
  throw new Error('plate detection picked the wrong path');
}

const m = plate.matrix.map((n) => round(n)).join(',');
const plateEl = `<path d="${plate.d}" transform="matrix(${m})"/>`;

// ── Compose ─────────────────────────────────────────────────────────
function build(variantName) {
  const markFile = logo(`mark-${variantName === 'dark' ? 'dark' : variantName}.svg`);
  const markSrc = readFileSync(markFile, 'utf8');
  const markInner = markSrc.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  const [mx, my, mw, mh] = viewBox(markFile);

  const W = mw;
  const gap = round(W * GAP_RATIO);
  const plateH = round(W * (plateBox.h / plateBox.w));
  const H = round(mh + gap + plateH);

  const { fill } = VARIANTS[variantName];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(W)} ${H}" width="${Math.round(W)}" height="${Math.round(H)}" fill="${fill}" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2">
  <title>Lingo Toolbox</title>
  <svg x="0" y="0" width="${round(W)}" height="${round(mh)}" viewBox="${mx} ${my} ${mw} ${mh}">
${markInner}
  </svg>
  <svg x="0" y="${round(mh + gap)}" width="${round(W)}" height="${plateH}" viewBox="${round(plateBox.x)} ${round(plateBox.y)} ${round(plateBox.w)} ${round(plateBox.h)}">
    ${plateEl}
  </svg>
</svg>
`;
}

for (const name of Object.keys(VARIANTS)) {
  const out = logo(`stack-${name}.svg`);
  writeFileSync(out, build(name));
  console.log(`wrote assets/logo/stack-${name}.svg`);
}
