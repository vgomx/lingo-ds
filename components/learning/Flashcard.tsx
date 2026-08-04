import * as React from 'react';

export interface FlashcardOwnProps {
  front?: React.ReactNode;
  back?: React.ReactNode;
  /** IPA or romanisation, set in the mono face. */
  phonetic?: string;
  /** Uppercase language stamp in the top-left of the front face. */
  language?: string;
  /** <Tag /> elements shown on the back face. */
  tags?: React.ReactNode;
  /** Controlled flip state; omit to let the card own it. */
  flipped?: boolean;
  defaultFlipped?: boolean;
  height?: number;
  hint?: string;
  onFlip?: (next: boolean) => void;
  style?: React.CSSProperties;
}

export interface FlashcardProps
  extends FlashcardOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof FlashcardOwnProps> {}

/**
 * The product's hero object: a two-faced review card that flips on click.
 * Front = prompt in the target language, back = meaning plus notes.
 */
export function Flashcard({
  front, back, phonetic, language, tags, flipped, defaultFlipped = false, height = 300,
  hint = 'Click or press Space to flip', onFlip, style, ...rest
}: FlashcardProps) {
  const [inner, setInner] = React.useState(defaultFlipped);
  const isFlipped = flipped === undefined ? inner : flipped;
  const flip = () => {
    if (flipped === undefined) setInner(!isFlipped);
    onFlip && onFlip(!isFlipped);
  };

  const face: React.CSSProperties = {
    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: 'var(--space-5)',
    padding: 'var(--space-9)', borderRadius: 'var(--radius-flashcard)',
    backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', textAlign: 'center',
    transition: 'opacity var(--dur-fast) linear',
  };

  return (
    <div
      onClick={flip}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      style={{ perspective: 1400, height, cursor: 'pointer', userSelect: 'none', ...style }}
      {...rest}
    >
      <div
        style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'none',
          transition: 'transform var(--dur-flip) var(--ease-spring)',
        }}
      >
        <div style={{ ...face, opacity: isFlipped ? 0 : 1, background: 'var(--surface-card)', boxShadow: 'var(--ring-inset), var(--shadow-md)' }}>
          {language && (
            <span style={{ position: 'absolute', top: 20, left: 24, fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              {language}
            </span>
          )}
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-48)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], lineHeight: 1.05, color: 'var(--text-strong)' }}>
            {front}
          </span>
          {phonetic && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-16)', color: 'var(--text-muted)' }}>{phonetic}</span>
          )}
          {hint && (
            <span style={{ position: 'absolute', bottom: 18, fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: 'var(--text-faint)' }}>{hint}</span>
          )}
        </div>
        <div style={{ ...face, opacity: isFlipped ? 1 : 0, transform: 'rotateY(180deg)', background: 'var(--violet-800)', boxShadow: 'inset 0 0 0 1.5px var(--violet-600), var(--shadow-md)' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-32)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], lineHeight: 1.1, color: '#fff' }}>{back}</span>
          {tags && <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>{tags}</div>}
        </div>
      </div>
    </div>
  );
}
