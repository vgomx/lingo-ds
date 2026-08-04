Single-line text field — a sunken well with an uppercase micro-label.

```jsx
<Input label="Word or phrase" placeholder="e.g. sobremesa" iconLeft={<Icon name="search" size={16} />} />
<Input label="Email" type="email" error="We don't recognise that address." />
```

- Always pair with `label` in forms; use `placeholder`-only inside search bars and composers.
- `error` replaces `hint` and turns the ring red. Never colour the label itself red.
