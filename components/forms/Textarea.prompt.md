Multi-line text — a note's body, a description, anything with paragraphs in it.

```jsx
<Textarea
  label="Explanation"
  hint="A few sentences. Leave a blank line between paragraphs."
  rows={5}
  value={body}
  onChange={(e) => setBody(e.target.value)}
/>
```

Same label / hint / error shape as `Input`. It grows with the content up to `maxRows` and then scrolls; the resize handle stays for anyone who wants more.

Reach for it whenever the hint would tell someone to type a line break — a single-line `Input` cannot take that advice.
