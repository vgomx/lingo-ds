One row in a dropdown — the language picker, an overflow sheet, a help menu.

```jsx
<MenuItem selected={code === current} onClick={() => choose(code)}>
  <Flag code={code} /> <span>{name}</span>
</MenuItem>
```

`selected` marks the current choice, not the one under the cursor — a selected row still answers hover. `opensMenu` is for a row that *opens* a menu rather than being one: it keeps the look and drops `role="menuitem"`, which would otherwise promise a menu it belongs to when what it has is one it opens.

Rows grow to 48px on touch. Use `SidebarItem` instead for a persistent list you navigate rather than a transient one you pick from.
