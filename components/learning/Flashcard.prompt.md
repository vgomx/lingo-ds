The product's hero object — a two-faced review card that flips on click.

```jsx
<Flashcard language="Spanish" front="sobremesa" phonetic="/so.bɾeˈme.sa/"
           back="the long talk after a meal" tags={<Tag color="var(--cyan-500)">noun</Tag>} />
```

Front is neutral card surface; the back is deep violet so the reveal reads as a state change. Pair with `ReviewRating` underneath.
