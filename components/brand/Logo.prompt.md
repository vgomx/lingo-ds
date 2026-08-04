Renders an approved lockup from `assets/logo/`. Never redraw the mark.

```jsx
<Logo variant="wordmark-white" height={36} base="../.." />
<Logo variant="mark-violet" height={40} base="../.." />
```

- Wordmark on wide surfaces; `mark-*` (the "lin/go" tile) at 40px and below.
- `base` is the path from the page to the design-system root. Clear space = the height of the "l" on all sides.
