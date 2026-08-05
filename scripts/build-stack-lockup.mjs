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

/** Space between the mark and the lettering, as a fraction of the lockup width. */
const GAP_RATIO = 0.11;

/**
 * How wide the lettering sits relative to the lockup.
 *
 * Taken from the wordmark, where TOOLBOX fills this share of its plate's width.
 * Keeping the ratio means the lettering reads at the same optical size here as
 * it does there, rather than being stretched to the mark's full width.
 */
const LETTER_WIDTH_RATIO = 0.915;

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

/**
 * Only the lettering, not the rounded plate behind it.
 *
 * In the wordmark those are one compound path: the plate is the outer shape and
 * the letters are holes knocked through it. The plate also carries a notch where
 * the "g" descender of "lingo" cuts into its top edge — which reads as a bite
 * out of nowhere once it is lifted away from the wordmark that explains it.
 *
 * Dropping the plate leaves the letters as solid shapes, and takes the notch
 * with it. The plate is found by area rather than position: it is an order of
 * magnitude larger than any glyph, so this holds even if the export reorders.
 */
const subpaths = plate.d.split(/(?=M)/).filter((s) => s.trim());
const withArea = subpaths.map((d) => {
  const b = bbox(d, plate.matrix);
  return { d, b, area: b.w * b.h };
});
const plateSub = withArea.reduce((a, b) => (b.area > a.area ? b : a));
const letters = withArea.filter((s) => s !== plateSub);

if (letters.length !== subpaths.length - 1) throw new Error('failed to isolate the plate');
if (plateSub.area < Math.max(...letters.map((l) => l.area)) * 4) {
  throw new Error('largest subpath is not clearly the plate — check the source wordmark');
}

const letterBox = {
  x: Math.min(...letters.map((l) => l.b.x)),
  y: Math.min(...letters.map((l) => l.b.y)),
};
letterBox.w = Math.max(...letters.map((l) => l.b.x + l.b.w)) - letterBox.x;
letterBox.h = Math.max(...letters.map((l) => l.b.y + l.b.h)) - letterBox.y;

const m = plate.matrix.map((n) => round(n)).join(',');
const lettersEl = `<path d="${letters.map((l) => l.d.trim()).join('')}" transform="matrix(${m})"/>`;

// ── Compose ─────────────────────────────────────────────────────────
function build(variantName) {
  const markFile = logo(`mark-${variantName === 'dark' ? 'dark' : variantName}.svg`);
  const markSrc = readFileSync(markFile, 'utf8');
  const markInner = markSrc.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim();
  const [mx, my, mw, mh] = viewBox(markFile);

  const W = mw;
  const gap = round(W * GAP_RATIO);
  const letterW = round(W * LETTER_WIDTH_RATIO);
  const letterH = round(letterW * (letterBox.h / letterBox.w));
  const letterX = round((W - letterW) / 2);
  const H = round(mh + gap + letterH);

  const { fill } = VARIANTS[variantName];

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${round(W)} ${H}" width="${Math.round(W)}" height="${Math.round(H)}" fill="${fill}" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2">
  <title>Lingo Toolbox</title>
  <svg x="0" y="0" width="${round(W)}" height="${round(mh)}" viewBox="${mx} ${my} ${mw} ${mh}">
${markInner}
  </svg>
  <svg x="${letterX}" y="${round(mh + gap)}" width="${letterW}" height="${letterH}" viewBox="${round(letterBox.x)} ${round(letterBox.y)} ${round(letterBox.w)} ${round(letterBox.h)}">
    ${lettersEl}
  </svg>
</svg>
`;
}

for (const name of Object.keys(VARIANTS)) {
  const out = logo(`stack-${name}.svg`);
  writeFileSync(out, build(name));
  console.log(`wrote assets/logo/stack-${name}.svg`);
}
