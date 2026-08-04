Tile in the 72px far-left rail. In the product it holds the **tools**; the language track lives in a flag dropdown at the top right of the content pane.

```jsx
<RailTile label="Cards" icon={<Icon name="layers" size={18} />} size={38} quiet showLabel
  color="var(--surface-raised)" active />
```

- `icon` is the app-rail default. `flag` (country-flag emoji, or a 2-letter code where emoji don't render) and `src` (image) remain for workspace-style tiles.
- `size` defaults to 46; the product rail uses **38** so no tile outweighs the logo above it.
- `quiet` keeps the tile transparent at rest and fades the chip in on hover — right for a rail of many tools.
- Active fill is the neutral `--surface-raised`; the white left pip and the brighter icon carry the selection. Keep a saturated fill (`--brand`, an accent) for language-workspace tiles only, where colour codes the language.
- `showLabel` puts a short name in 10px bold under the tile — always on in the product rail; keep it to one word.
- Radius tightens and a white pip grows on the left edge when active — that motion is the brand's most recognisable transition.
