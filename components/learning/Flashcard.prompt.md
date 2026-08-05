The product's hero object — a two-faced review card that flips on click.

```jsx
<Flashcard language="Spanish" front="sobremesa" phonetic="/so.bɾeˈme.sa/"
           back="the long talk after a meal" tags={<Tag color="var(--cyan-500)">noun</Tag>} />
```

Front is neutral card surface; the back is deep violet so the reveal reads as a state change. Pair with `ReviewRating` underneath.

An optional `illustration` takes an OpenMoji glyph at 44–56px:

```jsx
<Flashcard front="hond" back="dog"
           illustration={<img src="/openmoji/dog-face-1F436.svg" alt="" width="56" height="56"/>} />
```

It sits on the **back** by default. A picture of the answer placed on the prompt turns a recall test into a reading test — you read "dog" off the picture and never try to remember it. Set `illustrationSide="front"` for picture-prompt decks, where naming the picture is the exercise, or `"both"` when the card is a mnemonic pair rather than a test.
