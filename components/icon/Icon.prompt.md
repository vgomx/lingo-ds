The only icon primitive — a 24x24 Lucide line glyph inheriting `currentColor`.

```jsx
<Icon name="flame" size={16} style={{ color: 'var(--streak)' }} />
<Icon name="git-branch" size={20} />
```

- 76 glyphs are bundled (`ICON_NAMES`); an unknown name renders a faint square placeholder, never a crash.
- Sizes: 16 dense UI · 20 default · 24–32 feature/empty-state marks.
- Never draw a bespoke SVG or use emoji in place of an icon; add the Lucide glyph to `assets/icons/` instead.
