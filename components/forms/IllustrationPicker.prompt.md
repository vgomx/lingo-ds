Grid picker for a set of illustrations, with search and sticky section headings.

```jsx
<IllustrationPicker
  label="Illustration"
  items={ILLUSTRATIONS.map(i => ({ id: i.hex, src: `/openmoji/${i.file}`, name: i.name, group: i.group, keywords: i.keywords }))}
  groups={[{ id: 'expressions', label: 'Expressions' }, { id: 'food', label: 'Food & drink' }]}
  value={hex}
  onChange={setHex}
/>
```

Takes resolved `src` URLs and knows nothing about where the glyphs live. The design system ships only the 18-glyph sample in `assets/illustrations/openmoji/`; the full set is vendored in the product repo, and a picker that reached for it would drag those assets back in here.

`onChange` fires with `null` when the selection is cleared — by the ✕ in the search field, or by clicking the selected glyph again. Selecting is not a required step, so give it a way out.

The grid is the sanctioned exception to **one illustration per surface**: these are a grid of equals being chosen between, not decoration. Glyphs render at `glyphSize` (34 by default) — below the 44px floor for illustration *on* a surface, which is correct here because the picker cell is a control.

Images are `loading="lazy"`. A set in the hundreds otherwise fetches every glyph in every section the moment the picker opens.
