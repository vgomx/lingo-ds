# Lingo Toolbox — Design System

Lingo Toolbox is an **open source** (MIT) language-learning platform built as a **set of tools rather than a single course**. There is no paid tier, so no pricing, plan or billing surface exists anywhere in this system — the marketing kit sells the project, not a subscription. Learners pick a language workspace and move between interactive tools that practise and consolidate what they've already met elsewhere: **Flashcards** (spaced repetition), the **Etymology Explorer** (word-origin chains), **Conjugation Drill**, **Phrasebook** and **Grammar Notes**. The product is a workspace people return to daily, not a lesson they finish.

The visual language is a **chat-app-style product shell**: dark, chrome-forward app shell (far-left tool rail → deck sidebar → content pane), heavy rounded display type that echoes the logo, flat saturated fills, chunky "toy" buttons with a solid bottom edge, and line iconography at a uniform 2px stroke. It is playful without being childish — no gradients, no emoji-as-icons, no soft grey drop shadows.

---

## Using this package

`lingo-ds` ships as an installable React + TypeScript library. It is not published to a registry yet — [lingotoolbox](https://github.com/vgomx/lingotoolbox) consumes it as a `file:` dependency, so **check it out as a sibling directory and build it first**:

```bash
npm install && npm run build   # in lingo-ds, produces dist/
```

Then, in the consuming app:

```jsonc
// package.json
"dependencies": { "lingo-ds": "file:../lingo-ds" }
```

```tsx
import 'lingo-ds/styles.css';                  // once, at the app root
import { Button, Flashcard, RailTile } from 'lingo-ds';
```

`styles.css` is an `@import` list that pulls in `tokens/`; both ship with the package. Assets are reachable at `lingo-ds/assets/*` — the `Logo` component's `base` prop points at whatever path your bundler serves them from.

| Script | Does |
| --- | --- |
| `npm run build` | Bundles `index.ts` to ESM + CJS + `.d.ts` via tsup |
| `npm run dev` | Same, in watch mode |
| `npm run typecheck` | `tsc --noEmit` over `index.ts` and `components/` |

### What changed from the design bundle

The `.jsx` components were converted to typed `.tsx` (their sibling `.d.ts` files became the exported prop interfaces, so the documented contract is unchanged) and a barrel `index.ts` was added. `Flashcard` additionally gained the keyboard operability the guide requires — `role="button"`, `tabIndex`, and Space/Enter to flip — which the reference `.jsx` did not implement.

Everything else is untouched: `tokens/`, `styles.css`, `assets/`, `guidelines/`, `ui_kits/`, `templates/`, `SKILL.md` and `_ds_manifest.json` are the bundle as authored, so the design-agent skill still works against this repo.

---

## Sources given

| Source | What it contained | Notes |
| --- | --- | --- |
| `uploads/Lingo Toolbox - Final.svg` | Master logo sheet, 6 lockups: wordmark (positive/negative), app icon (positive/negative), reduced "lin/go" mark (positive/negative) | The **only** brand asset supplied. Monochrome — no brand colour, type spec, screens or code were provided. Preserved at `assets/logo/logo-sheet.svg`; individual lockups extracted programmatically into `assets/logo/`. |
| Brief | Company description + direction on iconography, fonts and overall visual/UI style | No Figma file, codebase or deck was attached. |

**What this means for the reader:** everything beyond the logo — the palette, the type ramp, the spacing/radius/shadow systems, the component inventory and both UI kits — was authored here from the brief and the logo's own letterforms. It is a coherent, opinionated system, but it is *proposed*, not *documented from an existing product*. Where a real product decision exists, it should overwrite this.

### Substitutions flagged

- **Fonts.** No binaries were supplied. `Baloo 2` (heavy rounded, Google Fonts) stands in for the wordmark's display face; `Nunito Sans` is the UI face; `JetBrains Mono` carries phonetics and data. See "Ask" at the bottom.
- **Icons.** No icon set was supplied. **Lucide** (2px stroke, round caps — the closest widely available match to the rounded-line style the brief calls for) is vendored into `assets/icons/` as real SVG files, plus an inline path map for the `Icon` component. 76 glyphs.
- **Imagery.** No photography or illustration was supplied. Nothing was invented; screens use type, colour blocks and icons only, and any place a photo belongs is left as a labelled empty surface.

---

## Content fundamentals

**Voice: a knowledgeable friend who has done the reading.** Warm, brief, specific. It celebrates progress without gushing and never scolds a lapse.

- **Person.** Speak to the learner as **you**. The product refers to itself as **we** only when it's doing something on their behalf ("We'll retry in the background"). Never "I".
- **Casing.** **Sentence case everywhere** — buttons, headings, menu items, dialog titles. The only uppercase is the 11px eyebrow / micro-label (`--type-eyebrow-*`), tracked out 0.08em.
- **Length.** Buttons 1–3 words. Card titles ≤ 4 words. Descriptions one sentence, ideally under 12 words. Empty states get two lines: what's missing, then the one action.
- **Punctuation.** No exclamation marks in UI chrome; they're reserved for genuine milestones ("26-day streak!"). Middle dots separate metadata (`42 cards · 12 due · Spanish`). Em dashes are fine in prose, never in labels.
- **Numbers.** Always concrete and always in the display face. "12 due", never "some cards". Intervals are short-form: `<1m`, `6m`, `1d`, `4d`.
- **Emoji.** **Not used as UI, with one exception:** country-flag emoji identify language workspaces on the rail, always paired with the language name in small type below (a flag is never the only identifier). Everything else is a Lucide glyph. Emoji may appear inside user-authored card content, never in product copy.
- **Language names** are written out in full ("Spanish", "Japanese") everywhere, including under the rail's flag tiles; two-letter caps codes (ES, JA, TR) are the fallback where flag emoji don't render.
- **Errors** state what happened and what happens next, no blame: "We don't recognise that address." / "Couldn't sync — we'll retry in the background."

Examples, verbatim in-house style:

> **Start review** · **I knew it** · **Keep it** · **Delete deck**
> "Twelve cards are due today. Most are ones you rated Hard last week."
> "the long talk after a meal" — glosses are lowercase, article-free
> "Deck saved · 12 new cards queued for tomorrow."

Avoid: "Oops!", "Awesome!", "Let's get started 🚀", "Congrats!!", gamified nagging, streak guilt.

---

## Visual foundations

### Colour
One brand fill — **violet `#6A4CF0`** (`--brand`) — used for the primary button, the active sidebar tint, the flashcard's reverse face, and nothing else. Surfaces are a six-step **ink** ramp used strictly by depth: rail `--ink-1000` → sidebar `--ink-800` → app `--ink-700` → card `--ink-600` → raised/hover `--ink-500` → borders `--ink-400`. Light surfaces (marketing, print) come from the **paper** ramp under `[data-theme="light"]`. Status is mint / amber / red / cyan, always as a saturated line-or-text colour over a 14% subtle fill — never as a full-bleed panel. Each tool owns one accent hue (`--tool-*`) which appears as a 3px card stripe, a rail tile fill or a tag, never as a background.

At most **two background colours per screen**. Violet never sits next to another saturated hue at similar area.

### Dark and light
Dark is the product default; `[data-theme="light"]` is a complete second scope, not a rough afterthought. Both scopes redeclare **every** environment-dependent token — text, surfaces, borders, shadows, `--scrim-bottom`, focus ring, status tints — so either can be nested inside the other (a dark product island on a light marketing page, and vice versa).

Two rules keep it that way:

- **Components never reach for a raw palette step** that only reads on one background. Use `--success` / `--warning` / `--danger` / `--info` for the fill and `--success-text` (…`-text`) for a label sitting on a `*-subtle` tint; use `--on-success` / `--on-danger` for a label on a solid one. The `-500` accents and `--tool-*` hues step down to dedicated `-800` values on paper (the `-500`s and even the `-700`s fall under 4.5:1 on white; the `-800`s measure 6.4–8.3:1, and white on them the same).
- **Shadows are tokens, not literals.** Near-black shadows read as dirt on paper, so `--shadow-*` is retuned per scope. Never write `0 4px 12px rgba(0,0,0,…)` inline.

### Type
Two families. **Baloo 2** (`--font-display`) at weight 800 carries anything that should feel like the logo: hero copy, the word on a flashcard, section headings, numbers. **Nunito Sans** (`--font-ui`) does all reading and all chrome, 400 for prose and 600/700 for labels. **JetBrains Mono** for IPA, roots, intervals and `<kbd>`. Tracking is normal everywhere except the eyebrow (0.08em) and hero display (-0.02em). Line height 1.5 for prose, 1.15–1.2 for display.

### Spacing & layout
4px base scale. Product chrome is fixed: 72px rail, 248px sidebar, 48px top bar, 320px side panel; content maxes at 1120px and centres. Sidebar rows are 34px tall with 8px inset. Cards pad 20px, dialogs 24px, stack gap 12px, inline gap 8px, section gap 32px. Controls are 28/36/44/52px; 44px is the floor for anything touchable.

### Backgrounds
**Flat colour, always.** No gradients, no photographic hero, no repeating pattern, no noise or grain. Depth comes from the ink steps and hairlines, not from light. The single exception is `--scrim-bottom`, a bottom-up protection gradient used only when text must sit over a user-supplied image.

### Borders, radii and cards
Radii: 4/6/8/12/16/24 and pill. Controls 8px, cards 12px, panels and dialogs 16px, flashcards 24px, rail tiles 16px relaxing to 12px when active. Borders are 1px inset white at 6–10% opacity (`--ring-inset`), not solid strokes; 1.5px violet inset marks selection. **A card is: flat `--surface-card` fill, 12px radius, 1px inset hairline, no drop shadow at rest.** Colour-coding goes in a 3px top stripe — never a coloured left border.

### Shadows & glow
Near-black and tight (`0 4px 12px rgba(0,0,0,.32)` at md), reserved for things that actually float: dialogs, toasts, popovers. Resting surfaces get no shadow. The brand's signature is not a shadow but a **3px solid bottom edge** on buttons (`--shadow-chunk`) that compresses to 1px on press. Glow is used exactly once: the amber streak flame.

### Motion
Fast and mechanical, with one bouncy exception. 120ms for control states, 180ms for surfaces, 280ms for entrances, **420ms `--ease-spring` for the flashcard flip and rail-tile radius change**, 640ms for celebration. Fades are for scrims and tooltips; everything else translates 8–12px or scales. Nothing loops, nothing parallaxes, nothing animates on scroll. `prefers-reduced-motion` zeroes all durations.

### Interaction states
- **Hover** — lighten by one ink step, or 4% white overlay on transparent controls. Brand buttons go to `--brand-hover`. Cards marked `interactive` lift 2px.
- **Press** — filled buttons drop 1px and their bottom edge shrinks to 1px; flat controls scale to 0.97. No colour change beyond hover.
- **Selected** — violet tint fill (`--surface-selected`) plus brighter text; for cards, a 1.5px violet inset ring.
- **Focus** — 3px `--brand-ring` outside the control, always visible on keyboard.
- **Disabled** — 45% opacity, shadow removed, cursor `not-allowed`. Never grey the text separately.

### Transparency & blur
Blur appears in exactly two places: the dialog scrim (`--blur-scrim`, 4px, over 78% ink) and a sticky top bar over scrolling content (`--blur-overlay`, 12px). Everything else is opaque. Translucency is otherwise limited to white-alpha hover/border overlays, which keeps the ink ramp readable.

### Imagery
Cool-toned and high-contrast when it exists; ink backgrounds mean images should be dark-friendly and never washed out. No grain, no duotone. Illustration is **not** part of this system — the brand's personality lives in the letterforms and colour, so a screen with nothing to show gets a large icon and a sentence, not a drawing.

---

## Iconography

- **Set:** Lucide, vendored as SVG into `assets/icons/` (76 glyphs) and inlined via `components/icon/iconPaths.js`. This is a flagged substitution — no brand set was supplied.
- **Style:** 24×24 box, 2px stroke, round caps and joins, no fills, no two-tone. Every icon inherits `currentColor`; a coloured icon means a coloured *context*, not a coloured icon asset.
- **Sizes:** 16 dense UI · 18 sidebar/toolbars · 20 default · 26–32 feature marks and empty states.
- **Rules:** never draw a bespoke SVG glyph, never use an emoji or a unicode dingbat where an icon belongs, never mix stroke weights in one row. Icon-only controls always get a `Tooltip` and an `aria-label`.
- **No icon font** is used, and none should be added — the inline path map keeps icons colourable and dependency-free.
- **Tool mapping:** Flashcards `layers` · Etymology Explorer `git-branch` · Conjugation Drill `spell-check` · Phrasebook `message-square-quote` · Grammar Notes `scroll-text` · Streak `flame` · Mastery `trophy`.
- **Flags are not icons.** Country-flag emoji appear only in the language picker at the top right of the content pane (and in its menu rows), always beside the language name. Never use a flag to stand for a language in body copy or a tag.
- **Logo is not an icon.** Use `assets/logo/mark-*.svg` for the app tile; never substitute a Lucide glyph for the brand mark, and never redraw the wordmark in a live font.
- **Picking a lockup by the space you have.** `mark-*` is the reduced symbol — it is what works at app-icon and favicon sizes, and the only thing that survives below about 24px. `logo-wordmark-*` is the horizontal lockup, minimum 96px wide. `stack-*` sits between them: the reduced mark with TOOLBOX beneath, for square-ish space where the horizontal wordmark would have to be set too small to read — a splash, a share card, an about screen. Minimum 96px tall; below that the TOOLBOX letterforms close up.
- **`stack-*` was composed, not redrawn.** Its TOOLBOX is the wordmark's own outlines, lifted from `logo-wordmark-white.svg` by `scripts/build-stack-lockup.mjs`, so it is the same flattened Dangrek lettering rather than a re-setting of it. Re-run that script rather than editing the four `stack-*.svg` files by hand.

### Illustration

Illustration is **OpenMoji** colour SVG (CC BY-SA 4.0) — never bespoke drawings, never AI-generated art.

- `assets/illustrations/openmoji/` holds a **language-related sample** (18 glyphs) as an example of the treatment; the full set is vendored in the product repository, so pull from there rather than adding one-off files here.
- Filenames are `<name>-<codepoint>.svg` so a glyph can be traced back to its Unicode source.
- **Sizes:** 44–56px on a card, 56–72px in an empty state. Never inline in a sentence, never in place of a UI icon, never on top of a saturated fill.
- One illustration per surface. If two would appear side by side, they belong in a grid of equals (deck, tool or empty-state cards), not scattered.
- **Attribution is required** where the app credits third-party work; `LICENSE.txt` ships beside the assets.

---

## Index

| Path | What's there |
| --- | --- |
| `readme.md` | This guide |
| `SKILL.md` | Agent-skill entry point |
| `styles.css` | Global entry — `@import` list only |
| `tokens/` | `colors.css` · `typography.css` · `spacing.css` · `radii.css` · `elevation.css` · `motion.css` · `fonts.css` · `base.css` |
| `assets/logo/` | 16 lockups + the original master sheet |
| `assets/icons/` | 76 Lucide SVGs |
| `guidelines/` | 20 foundation specimen cards (Colors, Type, Spacing, Elevation, Motion, Brand) |
| `components/` | React primitives, grouped by concern |
| `ui_kits/app/` | Lingo Toolbox product recreation (dark) |
| `ui_kits/marketing/` | Marketing site recreation (light) |
| `templates/` | `review-session/` (flashcard review screen) · `landing-page/` (marketing home) — copy-to-start artifacts for consuming projects |
| `assets/illustrations/openmoji/` | OpenMoji sample set (CC BY-SA 4.0) — illustration source |
| `thumbnail.html` | Homepage tile |

### Components

Grouped by concern; each directory holds `<Name>.jsx`, `<Name>.d.ts`, `<Name>.prompt.md` and one card HTML.

- **`components/actions/`** — `Button`, `IconButton`
- **`components/icon/`** — `Icon`
- **`components/forms/`** — `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **`components/surfaces/`** — `Card`, `Dialog`
- **`components/data-display/`** — `Badge`, `Tag`, `ProgressBar`, `StreakPill`, `Avatar`
- **`components/navigation/`** — `Tabs`, `SidebarItem`, `RailTile`
- **`components/feedback/`** — `Toast`, `Tooltip`
- **`components/learning/`** — `Flashcard`, `ReviewRating`, `EtymologyNode`
- **`components/brand/`** — `Logo`

#### Intentional additions

No component library was supplied, so the standard primitive set was authored from scratch. These go beyond that standard set and exist because the product cannot be drawn without them:

- `Icon` — wrapper for the vendored Lucide set, so no screen ever hand-rolls an SVG.
- `Logo` — serves the approved lockups, so no screen ever redraws the mark.
- `RailTile`, `SidebarItem` — the two rows the app shell is built from: `RailTile` for the tool rail (icon, 38px, neutral raised active fill + white pip), `SidebarItem` for the deck list.
- `ProgressBar`, `StreakPill`, `Avatar` — the daily-return surface of a learning product.
- `Flashcard`, `ReviewRating`, `EtymologyNode` — the two headline tools named in the brief.

---

## Ask

**Send real font binaries.** Baloo 2 / Nunito Sans / JetBrains Mono are stand-ins chosen from the logo's letterforms — if the wordmark was set in a licensed face, drop the `.woff2` files in `assets/fonts/` and the `@font-face` block replaces `tokens/fonts.css`'s Google import.

**Note on fonts:** `tokens/fonts.css` pulls the three stand-in families from Google Fonts via `@import`, so the system registers zero self-hosted `@font-face` rules. Supplying binaries fixes both the substitution and the offline story.

**Confirm the violet.** `#6A4CF0` was chosen as a saturated violet that reads as distinctly Lingo's. The logo sheet is monochrome, so there is no supplied brand colour to check it against.
