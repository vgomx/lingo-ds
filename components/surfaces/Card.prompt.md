Standard raised container — flat fill, 12px radius, 1px inset hairline. No drop shadow at rest.

```jsx
<Card title="Kitchen Spanish" subtitle="42 cards · 12 due" accent="var(--tool-flashcards)"
      actions={<IconButton label="More"><Icon name="ellipsis" size={16} /></IconButton>} interactive>
  <ProgressBar value={30} max={42} valueLabel="30 / 42" />
</Card>
```

Use `accent` to colour-code by tool. `interactive` adds the 2px hover lift used in deck grids.
