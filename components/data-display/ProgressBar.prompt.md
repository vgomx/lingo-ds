Session, deck and mastery progress.

```jsx
<ProgressBar label="Today's session" valueLabel="18 / 40" value={18} max={40} />
<ProgressBar segments={[{weight:5,color:'var(--success)'},{weight:2,color:'var(--warning)'},{weight:3,color:'var(--surface-raised)'}]} />
```

Segments carry mastery breakdowns (known / learning / new). Height 8 default, 6 in dense lists.
