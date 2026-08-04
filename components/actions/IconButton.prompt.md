Icon-only control for toolbars, card corners, message actions and the app rail.

```jsx
<IconButton label="Search" onClick={open}><Icon name="search" size={18} /></IconButton>
<IconButton label="Shuffle deck" variant="solid" active><Icon name="shuffle" size={16} /></IconButton>
```

- `variant`: `ghost` (default, toolbars) · `solid` · `brand` · `danger`
- `shape="circle"` for avatar-adjacent actions; `active` for toggled toolbar state.
- `label` is mandatory — it supplies both aria-label and the native tooltip.
