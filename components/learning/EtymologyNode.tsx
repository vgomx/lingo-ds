import * as React from 'react';

export type EtymologyNodeSize = 'sm' | 'md';

export interface EtymologyNodeOwnProps {
  word?: React.ReactNode;
  /** Source language, rendered as an uppercase stamp in the accent colour. */
  language?: string;
  /** Makes the language stamp a link out to a description of that language. */
  languageHref?: string | null;
  /**
   * Handles a plain click on the language stamp — for showing the description
   * in place rather than sending the reader away.
   *
   * The stamp stays a real anchor with a real href even when this is set, so
   * cmd-click, middle-click and "open in new tab" keep working and the status
   * bar still shows where it goes. Only an unmodified left click is taken.
   */
  onLanguageActivate?: () => void;
  /** How the word got here — "inherited from", "borrowed from". Sits before the language. */
  relation?: React.ReactNode;
  gloss?: React.ReactNode;
  /** Date range, e.g. "c. 1300". */
  era?: string;
  /**
   * `md` is the showpiece: a 24px headword, for a short chain given room.
   * `sm` is for chains long or nested enough that every step cannot be one.
   */
  size?: EtymologyNodeSize;
  color?: string;
  /** Highlights this node as the word being looked up. */
  current?: boolean;
  /** Draws the descent line down to the next node. Set false on the last one. */
  connector?: boolean;
  style?: React.CSSProperties;
}

export interface EtymologyNodeProps
  extends EtymologyNodeOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof EtymologyNodeOwnProps> {}

/**
 * Geometry per size. The dot has to sit on the first line of the word, so its
 * top offset is tied to that line's height rather than picked to look right
 * against one example.
 *
 * `stamp` and `relation` are separate sizes even though they share a row. The
 * stamp is a label — uppercase, tracked, at its heaviest weight, and legible
 * small the way a caption on a diagram is. The relation is prose someone
 * actually reads, and at the stamp's size in `sm` it was 10px of running text.
 */
const SIZES = {
  md: { rail: 14, dot: 12, dotTop: 6, gap: 'var(--space-5)', pad: 'var(--space-7)', word: 'var(--fs-24)', stamp: 'var(--fs-11)', relation: 'var(--fs-13)', gloss: 'var(--fs-14)', line: 2 },
  sm: { rail: 10, dot: 8, dotTop: 5, gap: 'var(--space-4)', pad: 'var(--space-5)', word: 'var(--fs-15)', stamp: 'var(--fs-10)', relation: 'var(--fs-12)', gloss: 'var(--fs-13)', line: 1.5 },
} as const;

/**
 * One node in an etymology chain: a language-stamped word with its gloss.
 * Chain them vertically with `connector` to draw the descent line.
 *
 * The word leads and the language stamps it, because that is the shape of the
 * information — a node is a form in a language, and the relation is the edge
 * that reached it. Set as a list of relations with the forms underneath, a
 * chain gives you no column of words to scan down.
 */
export function EtymologyNode({
  word, language, languageHref, onLanguageActivate, relation, gloss, era, size = 'md',
  color = 'var(--tool-etymology)', current = false, connector = true, style, ...rest
}: EtymologyNodeProps) {
  const s = SIZES[size];

  return (
    <div style={{ display: 'flex', gap: s.gap, ...style }} {...rest}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', width: s.rail }}>
        <span
          style={{
            width: s.dot, height: s.dot, borderRadius: '50%', marginTop: s.dotTop, flex: 'none',
            background: current ? color : 'var(--surface-raised)',
            // A ring rather than a filled dot for the steps, so the word being
            // looked up is the only solid mark on the line and you can find it
            // without reading anything.
            boxShadow: current
              ? `0 0 0 4px color-mix(in oklab, ${color} 22%, transparent)`
              : 'inset 0 0 0 1.5px var(--border-strong)',
          }}
        />
        {connector && (
          // Fading rather than flat: the chain runs out of evidence as it goes
          // back, and a line that stops being certain says so.
          <span style={{ flex: 1, width: s.line, background: 'linear-gradient(to bottom,var(--border-strong),transparent)', marginTop: 4 }} />
        )}
      </div>

      <div style={{ paddingBottom: connector ? s.pad : 0, minWidth: 0 }}>
        {/*
          * Two flex items, not four: the word, then everything said about it.
          *
          * The relation and the language are one phrase — "inherited from
          * Middle Dutch" — and as separate items they wrapped separately. On a
          * 375px screen nearly every step broke after "inherited from" and left
          * the language stranded on its own line, which turned a five-step
          * chain into ten ragged rows.
          *
          * Inside the phrase the spacing is a real space rather than `gap`, for
          * the same reason the space between the word and the phrase is a real
          * {' '}: gap is layout, not a character. Spaced only by gap this row
          * came out of textContent as "vocābulāriumcalqued onLate Latin", which
          * is what a screen reader announces and what lands on the clipboard. A
          * whitespace-only node between flex items is not rendered as an item,
          * so it costs nothing visually and puts the boundaries back.
          */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {word && (
            <span
              style={{
                fontFamily: 'var(--font-display)', fontSize: s.word,
                fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'],
                color: current ? 'var(--text-strong)' : 'var(--text-body)',
                lineHeight: 1.15, wordBreak: 'break-word', minWidth: 0,
              }}
            >
              {word}
            </span>
          )}
          {word && (relation || language || era) ? ' ' : null}
          {(relation || language || era) && (
            <span style={{ minWidth: 0 }}>
              {relation && (
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: s.relation, color: 'var(--text-muted)' }}>
                  {relation}
                </span>
              )}
              {relation && language ? ' ' : null}
              {language && React.createElement(
                languageHref ? 'a' : 'span',
                {
                  ...(languageHref ? { href: languageHref, target: '_blank', rel: 'noopener noreferrer' } : null),
                  style: {
                    fontFamily: 'var(--font-ui)', fontSize: s.stamp,
                    fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'],
                    letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color,
                    // Underlined on hover only. A chain five steps deep would
                    // otherwise be five underlined stamps, which reads as the
                    // links being the content rather than the words.
                    textDecoration: 'none', borderBottom: languageHref ? '1px solid transparent' : undefined,
                    cursor: languageHref ? 'pointer' : undefined,
                    // The phrase may wrap; the language name itself should not
                    // be split down the middle when it does.
                    whiteSpace: 'nowrap',
                  } as React.CSSProperties,
                  ...(languageHref
                    ? {
                      onMouseEnter: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderBottomColor = 'currentColor'; },
                      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.borderBottomColor = 'transparent'; },
                    }
                    : null),
                  ...(onLanguageActivate
                    ? {
                      onClick: (e: React.MouseEvent<HTMLElement>) => {
                        // Leave every modified click to the browser: cmd, ctrl
                        // and shift all mean "somewhere else", and middle-click
                        // never reaches onClick as button 0. Taking them would
                        // make an anchor that lies about being one.
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                        e.preventDefault();
                        onLanguageActivate();
                      },
                    }
                    : null),
                },
                language,
              )}
              {(relation || language) && era ? ' ' : null}
              {era && <span style={{ fontFamily: 'var(--font-mono)', fontSize: s.stamp, color: 'var(--text-muted)' }}>{era}</span>}
            </span>
          )}
        </div>
        {gloss && (
          <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-ui)', fontSize: s.gloss, color: 'var(--text-muted)', lineHeight: 'var(--lh-relaxed)' }}>
            {gloss}
          </p>
        )}
      </div>
    </div>
  );
}
