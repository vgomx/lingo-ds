Transient confirmation, bottom-centre, 4s auto-dismiss.

```jsx
<Toast tone="success" icon={<Icon name="circle-check" size={18} />} title="Deck saved" description="12 new cards queued for tomorrow." onClose={hide} />
```

One at a time. Anything the user must act on belongs in a `Dialog`.

The tone reads from a single **tinted icon chip** — no left accent bar, no coloured edge.
