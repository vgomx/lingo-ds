Renders an approved lockup from `assets/logo/`. Never redraw the mark.

```jsx
<Logo variant="wordmark-white" height={36} base="../.." />
<Logo variant="mark-violet" height={40} base="../.." />
```

- Wordmark on wide surfaces; `mark-*` (the "lin/go" tile) at 40px and below.
- `base` is the path from the page to the design-system root. Clear space = the height of the "l" on all sides.

`horizontal-*` is the logotype beside TOOLBOX on one line — for a wide, short space where the stack would have to shrink to fit the height. Roughly 5.4:1, so size it by width: comfortable from about 120px, and below 96px the lettering closes up.

`*-brand` takes `currentColor`, which only works where the SVG is inlined. Through an `<img>` — which is how this component renders — there is no inherited colour and it falls back to black, so pick a baked variant.
