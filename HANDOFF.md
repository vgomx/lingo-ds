# Handoff: Lingo Toolbox — design system → its own repo

> **How to use this bundle.** Download the whole design-system project (Export → Project). This file is the implementation brief; `readme.md` beside it is the design guide; everything referenced below is a real path in that download.

## Overview

Lingo Toolbox is an open-source (MIT) language-learning app built as a **set of tools, not a course**: Flashcards (spaced repetition), Etymology Explorer, Conjugation Drill, Phrasebook and Grammar Notes. It ships as a **front-end-only app on GitHub Pages** — no server, no accounts service, no paid tier.

This bundle is the complete design system for that app: tokens, 26 React primitives, the icon set, the brand assets, the illustration source, and two full-screen recreations (dark product shell, light marketing site). The task is to lift it into its own repository as the project's real UI layer.

## About the design files

The files here are **design references authored in plain HTML/JSX** — they show intended look and behaviour, they are not a packaged library. In particular:

- The `.jsx` components are **real, runnable React** with no build-time dependencies beyond React itself (inline styles, CSS custom properties, no CSS-in-JS runtime, no npm UI deps). They are the closest thing to production code in this bundle and can be adopted nearly verbatim — but expect to add the repo's own tooling (TypeScript build, lint, tests, story/docs harness).
- `_ds_bundle.js` is a **generated** browser bundle used only so the reference HTML opens without tooling. Do not commit it as a source of truth; regenerate or discard.
- `guidelines/`, `ui_kits/` and `templates/` are for reading and comparing against, not for shipping.

Recreate the designs in whatever environment the new repo settles on. If there is no repo yet, the recommendation below matches the constraints (static hosting, free tier only).

## Fidelity

**High fidelity.** Colours, type ramp, spacing, radii, shadows, motion timings and interaction states are all final and tokenised. Match them exactly — every value already exists as a CSS custom property, so there should be no eyeballing and no new literals.

The two flagged substitutions are the only open questions: the fonts are stand-ins chosen from the logo's letterforms, and the icon set is Lucide. Both are listed under **Open questions**.

## Recommended target stack

Constraints: GitHub Pages (static), free tooling, front-end only, all data local to the browser.

| Concern | Recommendation | Why |
| --- | --- | --- |
| Framework | **React 18 + Vite + TypeScript** | Components are already React with `.d.ts` files; Vite's static build drops straight into Pages. |
| Routing | `react-router` in hash or `basename` mode | Pages serves from a subpath and has no SPA rewrite. |
| Styling | **Ship `styles.css` as-is** — plain CSS custom properties, imported once at the app root | The whole system is tokens + inline styles. Do not port it to Tailwind or a CSS-in-JS runtime; that would fork the token contract for no gain. |
| Persistence | IndexedDB (via `idb`) for cards/decks/review log, `localStorage` for prefs | Spaced repetition needs durable local writes; no backend exists. |
| Scheduling | FSRS or SM-2 implemented locally | `ReviewRating` already emits the four grades and their due-interval labels. |
| Audio | Web Speech API `speechSynthesis` for pronunciation | Free, offline-ish, no media hosting. There is deliberately **no Listening Lab** — native-audio hosting is out of scope for a static app. |
| Offline | Vite PWA plugin (service worker + manifest) | A daily-return app should open without a network. |
| Deploy | GitHub Actions → Pages | Standard, free. |

None of this is prescribed by the design; swap freely, but keep the CSS-custom-property token layer intact.

## Suggested repo layout

```
lingo-toolbox/
├─ src/
│  ├─ styles/            ← tokens/*.css + styles.css, imported once in main.tsx
│  ├─ components/        ← the 26 primitives, one folder per concern (as here)
│  ├─ tools/             ← Flashcards, Etymology, Conjugation, Phrasebook, Grammar
│  ├─ shell/             ← AppRail, DeckSidebar, TopBar, LanguageMenu
│  ├─ data/              ← IndexedDB access, scheduler, import/export
│  └─ assets/            ← logo/, icons/, illustrations/
├─ public/
└─ docs/DESIGN-SYSTEM.md ← the design guide from this bundle
```

`components/` maps 1:1 to what's in this bundle. Keep the grouping — the guide references those paths.

## Design tokens

`styles.css` is an `@import` list only; every value lives in `tokens/`. **Read `tokens/colors.css` as the source of truth** — the tables below are orientation, not a substitute.

### Structure

| File | Contents |
| --- | --- |
| `tokens/fonts.css` | Google Fonts `@import` for the three stand-in families |
| `tokens/colors.css` | Palette ramps → semantic tokens → `[data-theme="dark"]` / `[data-theme="light"]` scopes |
| `tokens/typography.css` | Font stacks, size ramp, weights, line heights, tracking, composite `--type-*` roles |
| `tokens/spacing.css` | 4px scale, fixed chrome widths, control heights, pads |
| `tokens/radii.css` | 4/6/8/12/16/24 + pill, plus per-role aliases |
| `tokens/elevation.css` | Shadows, the chunky bottom edge, glows, rings, blur, scrim — **retuned per theme scope** |
| `tokens/motion.css` | Durations, easings, `prefers-reduced-motion` reset |
| `tokens/base.css` | Reset, `body` defaults, focus-visible, scrollbars, link colours |

### Core colour values

Brand violet `#6A4CF0` (`--brand`), hover `#5A3BE0`, active `#4A2FC2`.

Ink ramp, used strictly by depth: rail `#0E0E15` → sidebar `#1B1B26` → app `#23232F` → card `#2C2C3B` → raised `#363648` → borders `#45455B`. Text: strong `#F4F4F8`, body `#B7B9CB`, muted `#8A8DA3`, faint `#5E6079`.

Paper ramp (light scope): `#FFFFFF` / `#F7F7FB` / `#F0F0F6` / `#E5E5EF` / `#D3D3E0`.

Accents own one hue per tool — Flashcards violet, Etymology amber `#FFB020`, Conjugation cyan `#33C4F0`, Phrasebook coral `#FF6B5B`, Grammar pink `#F062C0`. Status: mint `#2ED3A0`, amber, red `#F04E5E`, cyan.

### Theming contract — the part most likely to be broken

Dark is the default; `[data-theme="light"]` is a **complete** second scope, and either can nest inside the other. Two rules make that work, and they are easy to violate:

1. **Never reference a raw palette step in a component.** Use `--success` / `--warning` / `--danger` / `--info` for a fill, `--success-text` (…`-text`) for a label on a `*-subtle` tint, `--on-success` / `--on-danger` for a label on a solid fill. The `-500` accents and `--tool-*` hues drop to dedicated `-800` steps on paper; the `-500`s and `-700`s measure under 4.5:1 on white, the `-800`s land at 6.4–8.3:1.
2. **Never write a shadow literal.** `--shadow-*` and `--scrim-bottom` are declared per scope because near-black shadows read as dirt on paper.

Add a lint rule for both if the repo has oxlint/eslint — violating either silently breaks light mode.

`guidelines/theme-parity.card.html` renders the same panel in both scopes; keep an equivalent story in the repo so regressions surface.

## Components

26 primitives, all React function components. Every one takes `style` and spreads `...rest`, is uncontrolled-or-controlled where relevant, and has a sibling `.d.ts` (exact prop types) and `.prompt.md` (usage + do/don't). **Read those two files per component** — the table below is only an index.

| Group | Components | Signature notes |
| --- | --- | --- |
| `actions/` | `Button`, `IconButton` | `Button({variant: primary\|secondary\|ghost\|success\|danger\|link, size: sm\|md\|lg\|xl, pill, block, loading, iconLeft, iconRight})`; `IconButton({label, size, variant, shape, active})` — `label` is required, it becomes the `aria-label` |
| `icon/` | `Icon` | `Icon({name, size = 20, strokeWidth = 2})`, paths inlined from `iconPaths.js`; 76 names exported as `ICON_NAMES` |
| `forms/` | `Input`, `Select`, `Checkbox`, `Radio`, `Switch` | All support `label`, `hint`, `disabled`, controlled `value`/`checked` or `defaultValue`/`defaultChecked`; `Input` adds `error`, `iconLeft/Right` |
| `surfaces/` | `Card`, `Dialog` | `Card({title, subtitle, accent, actions, padding, interactive, selected})` — `accent` draws the 3px top stripe; `Dialog({open, title, description, footer, width = 440, onClose})` |
| `data-display/` | `Badge`, `Tag`, `ProgressBar`, `StreakPill`, `Avatar` | `Badge({tone})`; `Tag({color, variant: soft\|solid, icon, onRemove})`; `ProgressBar({value, max, color, height, label, valueLabel, segments})`; `StreakPill({days, active, size})`; `Avatar({name, src, size, status, flag})` |
| `navigation/` | `Tabs`, `SidebarItem`, `RailTile` | `Tabs({items, value, onChange, variant: underline\|pill})`; `SidebarItem({icon, label, meta, active, muted, badge})`; `RailTile({label, icon, flag, src, color, size = 46, quiet, active, unread, showLabel})` — `icon` props take **nodes**, not icon names |
| `feedback/` | `Toast`, `Tooltip` | `Toast({title, description, tone, icon, action, onClose})`; `Tooltip({label, side, shortcut})` wraps its trigger |
| `learning/` | `Flashcard`, `ReviewRating`, `EtymologyNode` | `Flashcard({front, back, phonetic, language, tags, flipped, defaultFlipped, height = 300, hint, onFlip})`; `ReviewRating({grades, onGrade, showDue, showShortcuts})`; `EtymologyNode({word, language, gloss, era, color, current, connector})` |
| `brand/` | `Logo` | `Logo({variant, height = 40, base})` — `variant` is one of the 12 approved lockups; `base` is the path from the page to the asset root. Rewrite `base` to your bundler's asset import once ported. |

Behaviour that must survive the port:

- **The press affordance is the brand.** Filled buttons carry a 3px solid bottom edge (`--shadow-chunk`) that compresses to 1px and translates the button down 1px on `:active`. Do not replace it with a shadow or a scale.
- **Flashcard flip** is 420ms on `--ease-spring`, and is keyboard-operable (Space/Enter). It is the one bouncy motion in the product.
- **`RailTile`** relaxes its radius from 16px to 12px when active, over the same spring.
- **Focus** is always a visible 3px `--brand-ring` outside the control; `tokens/base.css` sets the `:focus-visible` baseline.
- **Icon-only controls** always need a `Tooltip` and an `aria-label`.
- **`prefers-reduced-motion`** zeroes every duration in `tokens/motion.css` — keep that block.

## Screens to build

Two full recreations are in `ui_kits/`; open them in a browser and read their JSX alongside.

### Product shell — `ui_kits/app/index.html` (dark)

Fixed chrome: **72px tool rail** (far left, `--ink-1000`, one `RailTile` per tool with the label below) → **248px deck sidebar** (`--ink-800`, `SidebarItem` rows at 34px) → **content pane** (`--ink-700`, maxes at 1120px and centres) → optional **320px side panel**. **48px top bar**, sticky, `--blur-overlay` over scrolling content, with the **language picker as a dropdown at its top right** (flag + language name; flags never appear alone).

The tool rail is tools only. Languages are workspace-level and live in that top-right picker.

### Marketing site — `ui_kits/marketing/index.html` (light)

`[data-theme="light"]` on `<html>`. Sticky blurred nav → hero with a live `Flashcard` demo inside a dark island (`data-theme="dark"`) → five-tool grid with two alternating feature bands → **open-source section** (hosted / self-host / contribute) → footer. There is deliberately **no pricing surface anywhere** — the site sells the project, not a subscription.

### Foundation specimens — `guidelines/` (21 cards)

One card per foundation (colour, type, spacing, radii, elevation, motion, focus, press, logo, theme parity). Useful as the acceptance criteria for the token port, and as the basis for the repo's own docs page.

## Assets

| Path | What | Licence |
| --- | --- | --- |
| `assets/logo/` | 12 approved lockups + the original master sheet. Letterforms are **outlined paths**, not live text — never re-set the wordmark in a font. | Client-owned |
| `assets/icons/` | 76 Lucide SVGs, 24×24, 2px stroke, round caps. Also inlined in `components/icon/iconPaths.js`. | ISC (Lucide) |
| `assets/illustrations/openmoji/` | 18-glyph language-related **sample** of OpenMoji colour SVG. The full set belongs in the app repo — vendor it there and pull from it rather than adding one-offs. | **CC BY-SA 4.0 — attribution required** (`LICENSE.txt` ships alongside) |
| Fonts | Baloo 2, Nunito Sans, JetBrains Mono, pulled from Google Fonts by `@import` in `tokens/fonts.css` | OFL. Self-host the `.woff2` files for offline/PWA — an `@import` breaks the offline story. |

No photography or bespoke illustration exists, and none should be invented. A screen with nothing to show gets a large icon or one OpenMoji glyph and a sentence.

## Content rules (these are part of the design)

- Sentence case everywhere. The only uppercase is the 11px eyebrow, tracked 0.08em.
- Buttons 1–3 words; card titles ≤4 words; descriptions one sentence under ~12 words.
- Speak to the learner as **you**; the product is **we** only when acting on their behalf.
- No exclamation marks in chrome — reserved for genuine milestones. Middle dots separate metadata (`42 cards · 12 due · Spanish`).
- Numbers are concrete and set in the display face. Intervals short-form: `<1m`, `6m`, `1d`, `4d`.
- Errors say what happened and what happens next, never blame.
- Emoji are not UI, with one exception: country flags in the language picker, always beside the language name.

Avoid: "Oops!", "Awesome!", "Let's get started 🚀", streak guilt.

## Open questions for the team

1. **Fonts are stand-ins.** If the wordmark was set in a licensed face, drop the `.woff2` files in and replace the Google `@import` in `tokens/fonts.css` with `@font-face`.
2. **Confirm the violet.** `#6A4CF0` was chosen against a monochrome logo sheet; there is no supplied brand colour to check it against.
3. **Icon set.** Lucide is a substitution. If a bespoke set is commissioned, only `iconPaths.js` and `assets/icons/` change — no component touches an SVG directly.
4. **Scheduler.** The design shows four grades with due labels; the algorithm (FSRS vs SM-2) is an engineering choice.

## Files in this bundle

| Path | Role |
| --- | --- |
| `readme.md` | The full design guide — read this second, after this README |
| `styles.css`, `tokens/` | The token layer. Ship as-is. |
| `components/` | 26 primitives: `.jsx` + `.d.ts` + `.prompt.md` + a specimen card each |
| `assets/logo/`, `assets/icons/`, `assets/illustrations/` | Brand, icons, illustration sample |
| `ui_kits/app/` | Dark product shell recreation |
| `templates/` | Two copy-to-start artifacts (review session, landing page) |
| `ui_kits/marketing/` | Light marketing site recreation |
| `guidelines/` | 21 foundation specimen cards |
| `SKILL.md`, `_ds_manifest.json`, `_adherence.oxlintrc.json` | Tooling for the design-system host — not needed in the app repo |
| `_ds_bundle.js` | Generated; lets the reference HTML open without tooling. Not a source file. |

Open any `.card.html` or `ui_kits/*/index.html` directly in a browser — they need no server.

`docs/DESIGN-SYSTEM.md ← the design guide from this bundle` in the layout above means `readme.md`.
