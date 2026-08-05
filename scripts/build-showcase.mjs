// Generates index.html — the GitHub Pages showcase — from _ds_manifest.json.
// Every specimen card in the bundle is embedded in an iframe, grouped and ordered
// by GROUP_ORDER. Re-run after adding or renaming a card:  node scripts/build-showcase.mjs

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, '_ds_manifest.json'), 'utf8'));

/**
 * Cards are discovered on disk rather than read from the manifest's list.
 *
 * The list used to be maintained by hand, so adding a card meant remembering to
 * add it in two places; forgetting the second one dropped the card from the
 * showcase with no error, which is exactly what happened when the illustration
 * picker was added. The `@dsCard` comment at the top of each file already
 * carries every field the manifest stored, so the file is the only source of
 * truth and the manifest is refreshed from it below.
 */
// `templates/` is deliberately out: those are copy-to-start artifacts for
// consuming projects, not specimens of this system.
const IGNORE = new Set(['node_modules', '.git', 'dist', 'templates']);

const walk = (dir) => readdirSync(dir).flatMap((entry) => {
  if (IGNORE.has(entry) || entry.startsWith('.')) return [];
  const full = join(dir, entry);
  if (statSync(full).isDirectory()) return walk(full);
  return entry.endsWith('.html') ? [full] : [];
});

const ATTR = (meta, key) => meta.match(new RegExp(`${key}="([^"]*)"`))?.[1];

// The marker is what makes a page a card, not its filename — the two full
// recreations under ui_kits/ are `index.html` and belong in the showcase too.
const discovered = walk(root).map((file) => {
  const head = readFileSync(file, 'utf8').slice(0, 600);
  const meta = head.match(/<!--\s*@dsCard\s+([^>]*?)-->/)?.[1];
  if (!meta) return null;
  const path = relative(root, file).split(/[\\/]/).join('/');
  return {
    path,
    group: ATTR(meta, 'group') ?? 'Components',
    viewport: ATTR(meta, 'viewport') ?? '700x200',
    subtitle: ATTR(meta, 'subtitle') ?? '',
    name: ATTR(meta, 'name') ?? path,
  };
}).filter(Boolean);

// Stable order within a group: whatever the manifest already listed keeps its
// place, so adding a card appends rather than reshuffling the whole page.
const previous = new Map(manifest.cards.map((c, i) => [c.path, i]));
discovered.sort((a, b) => (previous.get(a.path) ?? Infinity) - (previous.get(b.path) ?? Infinity)
  || a.path.localeCompare(b.path));

const added = discovered.filter((c) => !previous.has(c.path));
const removed = manifest.cards.filter((c) => !discovered.some((d) => d.path === c.path));
if (added.length) console.log(`  + ${added.map((c) => c.path).join('\n  + ')}`);
if (removed.length) console.log(`  - ${removed.map((c) => c.path).join('\n  - ')}`);

manifest.cards = discovered;
if (added.length || removed.length) {
  // Written back in the single-line form the file already uses, so the diff is
  // the cards that changed rather than a reformat of all 2,600 lines.
  writeFileSync(join(root, '_ds_manifest.json'), JSON.stringify(manifest));
}

/** Reading order: foundations first, then components, then the two full recreations. */
const GROUP_ORDER = [
  'Brand', 'Colors', 'Type', 'Spacing', 'Elevation', 'Motion',
  'Illustration', 'Components', 'App', 'Marketing site',
];

/** Content column in px. Anything wider than this is scaled down to fit. */
const COLUMN = 860;

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const groups = new Map(GROUP_ORDER.map((g) => [g, []]));
for (const card of manifest.cards) {
  if (!groups.has(card.group)) groups.set(card.group, []);
  groups.get(card.group).push(card);
}

const renderCard = (card) => {
  const [w, h] = (card.viewport || '700x200').split('x').map(Number);
  const scale = w > COLUMN ? COLUMN / w : 1;
  const wrapH = Math.round(h * scale);
  const frameStyle = scale < 1
    ? ` style="width:${w}px;height:${h}px;transform:scale(${scale.toFixed(4)})"`
    : ` style="width:${w}px;height:${h}px"`;
  return `      <article class="card-item" id="${slug(card.name)}">
        <div class="card-meta-row">
          <span class="card-name">${esc(card.name)}</span>
          <span class="card-subtitle">${esc(card.subtitle)}</span>
        </div>
        <div class="frame-wrap" style="height:${wrapH}px">
          <iframe src="${esc(card.path)}" loading="lazy" title="${esc(card.name)}"${frameStyle}></iframe>
        </div>
      </article>`;
};

const nav = [...groups]
  .filter(([, cards]) => cards.length)
  .map(([group, cards]) => `      <li class="nav-group">${esc(group)}</li>\n`
    + cards.map((c) => `      <li><a href="#${slug(c.name)}">${esc(c.name)}</a></li>`).join('\n'))
  .join('\n');

const sections = [...groups]
  .filter(([, cards]) => cards.length)
  .map(([group, cards]) => `  <section class="group-section" id="group-${slug(group)}">
    <h2 class="group-label">${esc(group)}</h2>
    <div class="cards">
${cards.map(renderCard).join('\n\n')}
    </div>
  </section>`)
  .join('\n\n');

const total = manifest.cards.length;
const componentCount = manifest.components.filter((c) => c.sourcePath.endsWith('.tsx')).length;

const html = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lingo Toolbox — Design System</title>
  <link rel="icon" href="assets/logo/mark-violet.svg">
  <link rel="stylesheet" href="styles.css">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      display: flex;
      min-height: 100vh;
      background: var(--ink-700);
      color: var(--text-body);
      font-family: var(--font-ui);
    }

    /* ── Sidebar ──────────────────────────────────────── */
    .sidebar {
      position: fixed;
      inset: 0 auto 0 0;
      width: 248px;
      background: var(--ink-800);
      display: flex;
      flex-direction: column;
      padding: 24px 16px;
      overflow-y: auto;
      scrollbar-width: thin;
    }
    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 28px;
      padding: 0 8px;
      flex-shrink: 0;
    }
    .sidebar-brand img { height: 26px; width: auto; flex-shrink: 0; }
    .sidebar-brand-sub {
      font-size: var(--fs-10);
      font-weight: var(--fw-black);
      letter-spacing: var(--ls-caps);
      text-transform: uppercase;
      color: var(--text-faint);
    }

    nav { flex: 1; }
    nav ul { list-style: none; }

    .nav-group {
      font-size: var(--fs-10);
      font-weight: var(--fw-black);
      letter-spacing: var(--ls-caps);
      text-transform: uppercase;
      color: var(--text-faint);
      padding: 18px 8px 6px;
    }
    .nav-group:first-child { padding-top: 0; }

    nav a {
      display: block;
      font-size: var(--fs-13);
      font-weight: var(--fw-bold);
      color: var(--text-muted);
      text-decoration: none;
      padding: 6px 8px;
      border-radius: var(--radius-sm);
      transition: var(--transition-control);
      line-height: 1.35;
    }
    nav a:hover { color: var(--text-strong); background: var(--surface-hover); }
    nav a:target, nav a.active { color: var(--text-strong); background: var(--surface-selected); }

    .sidebar-footer {
      margin-top: 28px;
      padding: 16px 8px 0;
      border-top: 1px solid var(--divider);
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .sidebar-footer span, .sidebar-footer a {
      font-size: var(--fs-11);
      font-weight: var(--fw-bold);
      color: var(--text-faint);
      text-decoration: none;
    }
    .sidebar-footer a:hover { color: var(--brand-300, var(--text-strong)); }

    /* ── Main ─────────────────────────────────────────── */
    .main {
      margin-left: 248px;
      flex: 1;
      min-width: 0;
      padding: 56px 48px 96px;
    }
    .inner { max-width: ${COLUMN}px; }

    .page-header {
      margin-bottom: 56px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--divider);
    }
    .page-title {
      font-family: var(--font-display);
      font-size: var(--fs-40);
      font-weight: var(--fw-black);
      letter-spacing: var(--ls-tight);
      color: var(--text-strong);
      line-height: 1.15;
      margin-bottom: 8px;
    }
    .page-meta {
      font-size: var(--fs-11);
      font-weight: var(--fw-black);
      letter-spacing: var(--ls-caps);
      text-transform: uppercase;
      color: var(--text-faint);
    }
    .page-lede {
      margin-top: 16px;
      font-size: var(--fs-15);
      color: var(--text-muted);
      line-height: var(--lh-relaxed);
      max-width: 62ch;
    }
    .page-lede a { color: var(--text-link); }

    /* ── Group sections ───────────────────────────────── */
    .group-section { margin-bottom: 64px; }
    .group-section:last-child { margin-bottom: 0; }

    .group-label {
      font-size: var(--fs-11);
      font-weight: var(--fw-black);
      letter-spacing: var(--ls-caps);
      text-transform: uppercase;
      color: var(--text-faint);
      margin-bottom: 24px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--divider);
    }

    .cards { display: flex; flex-direction: column; gap: 40px; }

    .card-item { display: flex; flex-direction: column; gap: 10px; scroll-margin-top: 24px; }
    .card-meta-row { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
    .card-name {
      font-family: var(--font-display);
      font-size: var(--fs-16);
      font-weight: var(--fw-black);
      color: var(--text-strong);
    }
    .card-subtitle { font-size: var(--fs-12); color: var(--text-faint); }

    /* ── iframe wrapper ───────────────────────────────── */
    .frame-wrap {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: var(--radius-panel);
      box-shadow: var(--ring-inset);
      background: var(--ink-700);
    }
    .frame-wrap iframe {
      display: block;
      border: none;
      transform-origin: top left;
    }

    @media (max-width: 900px) {
      .sidebar { display: none; }
      .main { margin-left: 0; padding: 32px 20px 64px; }
    }
  </style>
</head>
<body>

<aside class="sidebar">
  <div class="sidebar-brand">
    <img src="assets/logo/logo-wordmark-white.svg" alt="Lingo Toolbox">
    <span class="sidebar-brand-sub">Design<br>system</span>
  </div>

  <nav aria-label="Design system sections">
    <ul>
${nav}
    </ul>
  </nav>

  <footer class="sidebar-footer">
    <span>v0.1 · ${total} cards</span>
    <a href="https://github.com/vgomx/lingo-ds">Design system repo ↗</a>
    <a href="https://github.com/vgomx/lingotoolbox">App repo ↗</a>
  </footer>
</aside>

<main class="main">
  <div class="inner">
    <header class="page-header">
      <h1 class="page-title">Lingo Toolbox — Design System</h1>
      <p class="page-meta">${componentCount} components · ${total} cards · v0.1</p>
      <p class="page-lede">
        The token layer, component library and screen recreations behind
        <a href="https://vgomx.github.io/lingotoolbox/">Lingo Toolbox</a> — an open-source
        language-learning app built as a set of tools rather than a course.
        Dark is the product default; every specimen below is the live HTML, not a screenshot.
      </p>
    </header>

${sections}
  </div>
</main>

</body>
</html>
`;

writeFileSync(join(root, 'index.html'), html);
console.log(`index.html written — ${total} cards across ${[...groups].filter(([, c]) => c.length).length} groups`);
