Modal for a single focused decision — new deck, delete, settings.

```jsx
<Dialog title="Delete this deck?" description="42 cards and their review history go with it."
        footer={<><Button variant="ghost" onClick={close}>Keep it</Button><Button variant="danger">Delete</Button></>}
        onClose={close} />
```

Positions itself against the nearest positioned ancestor, so mount it inside the app frame, not the page body.
