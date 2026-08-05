// Geometry helper for composing logo lockups out of the existing outlined artwork.
//
// The brand rule is that letterforms are outlined paths and must never be re-set
// in a font, so a new lockup has to be assembled from the shapes already in
// assets/logo/ rather than redrawn. That means knowing where each piece actually
// sits once its nested matrix() transforms are applied — which is what this does.
//
// Only handles what the logo files actually contain: absolute M/L/C/Z and
// matrix() transforms. Curve bounds use control points, so a bbox may be a
// hair generous on the outside of a curve; that is fine for placement.

import { readFileSync } from 'node:fs';

const mul = (m, n) => [
  m[0] * n[0] + m[2] * n[1], m[1] * n[0] + m[3] * n[1],
  m[0] * n[2] + m[2] * n[3], m[1] * n[2] + m[3] * n[3],
  m[0] * n[4] + m[2] * n[5] + m[4], m[1] * n[4] + m[3] * n[5] + m[5],
];
const apply = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]];

function parseTransform(str) {
  let out = [1, 0, 0, 1, 0, 0];
  for (const m of str.matchAll(/(matrix|translate|scale)\(([^)]+)\)/g)) {
    const v = m[2].split(/[\s,]+/).map(Number);
    if (m[1] === 'matrix') out = mul(out, v);
    else if (m[1] === 'translate') out = mul(out, [1, 0, 0, 1, v[0], v[1] || 0]);
    else out = mul(out, [v[0], 0, 0, v[1] ?? v[0], 0, 0]);
  }
  return out;
}

/** Every <path> in the file, with the composite matrix of its ancestor <g>s. */
export function readPaths(file) {
  const src = readFileSync(file, 'utf8');
  const stack = [[1, 0, 0, 1, 0, 0]];
  const paths = [];

  for (const tok of src.matchAll(/<(\/?)(g|path|svg)\b([^>]*)>/g)) {
    const [, closing, tag, attrs] = tok;
    const selfClosing = attrs.trimEnd().endsWith('/');
    const cur = stack[stack.length - 1];

    if (closing) { if (tag === 'g') stack.pop(); continue; }

    const t = attrs.match(/\stransform="([^"]+)"/);
    const next = t ? mul(cur, parseTransform(t[1])) : cur;

    if (tag === 'g') { if (!selfClosing) stack.push(next); continue; }
    if (tag === 'path') {
      const d = attrs.match(/\sd="([^"]+)"/);
      if (d) paths.push({ d: d[1], matrix: next, attrs });
    }
  }
  return paths;
}

/** Bounding box of one path's `d`, in the coordinate space its matrix maps into. */
export function bbox(d, matrix) {
  const nums = d.match(/-?\d*\.?\d+(?:e-?\d+)?/g)?.map(Number) ?? [];
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i + 1 < nums.length; i += 2) {
    const [x, y] = apply(matrix, nums[i], nums[i + 1]);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

export function viewBox(file) {
  return readFileSync(file, 'utf8').match(/viewBox="([^"]+)"/)[1].split(/[\s,]+/).map(Number);
}

export const round = (n) => Math.round(n * 100) / 100;
