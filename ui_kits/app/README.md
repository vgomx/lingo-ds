# UI kit — Lingo Toolbox app (dark)

A click-through recreation of the product shell. **No source design or codebase was supplied**, so this kit is an authored proposal built strictly from the design system's own tokens and components — not a recreation of an existing screen.

## Files

| File | Surface |
| --- | --- |
| `index.html` | Router, new-deck dialog, toasts. Open this. |
| `AppShell.jsx` | Rail (language workspaces) + tool sidebar + top bar + `LINGO_DATA` fixtures |
| `HomeScreen.jsx` | Greeting, streak, three stat cards, tool grid, resume list, word of the day |
| `ReviewScreen.jsx` | Flashcard session: progress bar, flip card, grading row, context panel |
| `EtymologyScreen.jsx` | Search, word header, descent chain / cognates / usage tabs, add-to-deck panel |
| `LibraryScreen.jsx` | Deck grid with filters and a recently-added card table |
| `SettingsScreen.jsx` | Profile, review, scheduling and reminder settings |

## What you can click

Rail tiles switch workspace · sidebar switches tool · **Start review** opens a session · a card flips and the four grades advance it · **New deck** opens the dialog and fires a toast · Settings → Save fires a toast · deck cards select.

## Deliberately blank

Conjugation Drill, Phrasebook and Grammar Notes render an "Intentionally unbuilt" state. They are named in the brief but no design exists for them, so the kit does not invent one.

## Layout constants

72px rail · 248px sidebar · 48px top bar · 320px right panel · 1120px content max.
