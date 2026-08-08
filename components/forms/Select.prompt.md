Listbox for short closed lists (language, deck, interval). Not a native select — the popup is ours, so it is themed, and `onChange` hands you the value rather than an event.

```jsx
<Select label="Language" options={['Spanish', 'Japanese', 'Turkish']} onChange={(v) => setLang(v)} />
```

Keyboard: arrows and Home/End move, Enter or Space picks, Escape closes, and typing jumps to the first label that starts with what you typed.

Use `Tabs` instead when there are 2–4 options and the choice drives the view.
