The brand's main action control — a chunky, rounded button with a 3px solid bottom edge that compresses 1px on press.

```jsx
<Button variant="primary" size="lg" iconLeft={<Icon name="play" size={18} />}>Start review</Button>
<Button variant="secondary">Skip</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

- `variant`: `primary` (violet, one per screen) · `secondary` (raised neutral) · `ghost` · `outline` · `success` (mint, "I knew it") · `danger` · `link`
- `size`: `sm` 28 · `md` 36 · `lg` 44 · `xl` 52 (hero CTAs)
- `pill` for hero CTAs and filter chips; `block` to fill a column; `loading` swaps the left icon for a spinner.
- Ghost/outline/link press with a scale-down instead of the 1px drop.
