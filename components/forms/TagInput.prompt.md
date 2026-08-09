Tags as chips, with the words already in use offered underneath.

```jsx
<TagInput
  label="Tags"
  value={tags}
  onChange={setTags}
  suggestions={tagsAlreadyUsed}
  hint="What decides which cards offer this note."
/>
```

`value` is a `string[]`, not a comma-separated string. Enter and comma both commit; Backspace on an empty field removes the last chip; blur commits whatever is half-typed rather than discarding it.

`suggestions` is the point of the component. Tags are only useful when the same word gets picked twice, and a bare text field is how `verb` and `verbs` both end up real — offering what already exists is what protects the vocabulary.
