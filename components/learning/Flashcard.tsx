import * as React from 'react';
import { useIsTouch, usePrefersReducedMotion } from '../../hooks/useBreakpoint';

export type FlashcardIllustrationSide = 'front' | 'back' | 'both';

export interface FlashcardOwnProps {
  front?: React.ReactNode;
  back?: React.ReactNode;
  /**
   * An OpenMoji glyph for the card, sized 44–56px by the caller. Shown on the
   * back by default — see `illustrationSide`.
   */
  illustration?: React.ReactNode;
  /**
   * Which face carries the illustration. Defaults to `back`: a picture of the
   * answer sitting on the prompt turns a recall test into a reading test. Set
   * `front` for picture-prompt decks, where naming the picture is the exercise.
   */
  illustrationSide?: FlashcardIllustrationSide;
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
  /**
   * Tilts toward the pointer on hover, so the corner nearest the cursor lifts.
   * Off on touch — there is no hover to answer — and off under
   * prefers-reduced-motion, where the honest response is not to move at all.
   */
  tilt?: boolean;
  style?: React.CSSProperties;
}

export interface FlashcardProps
  extends FlashcardOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof FlashcardOwnProps> {}

/** Degrees at the very corner. Small on purpose: this is a lift, not a carousel. */
const MAX_TILT = 7;

/**
 * The product's hero object: a two-faced review card that flips on click.
 * Front = prompt in the target language, back = meaning plus notes.
 */
export function Flashcard({
  front, back, illustration, illustrationSide = 'back', phonetic, language, tags,
  flipped, defaultFlipped = false, height = 300,
  hint = 'Click or press Space to flip', onFlip, tilt = true, style, ...rest
}: FlashcardProps) {
  const onFront = !!illustration && illustrationSide !== 'back';
  const onBack = !!illustration && illustrationSide !== 'front';

  const isTouch = useIsTouch();
  const reducedMotion = usePrefersReducedMotion();
  const canTilt = tilt && !isTouch && !reducedMotion;

  /**
   * The tilt is written straight to the node rather than held in state.
   * A pointermove fires dozens of times a second, and re-rendering the whole
   * card — both faces, the illustration, the tags — on each one to change one
   * transform is work with nothing to show for it.
   */
  const tiltRef = React.useRef<HTMLDivElement>(null);

  const applyTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = tiltRef.current;
    if (!canTilt || !node) return;
    const r = e.currentTarget.getBoundingClientRect();
    // Doubled to ±1, so MAX_TILT is the angle at the edge rather than half of it.
    const px = ((e.clientX - r.left) / r.width - 0.5) * 2;   // -1 (left) … 1 (right)
    const py = ((e.clientY - r.top) / r.height - 0.5) * 2;   // -1 (top)  … 1 (bottom)
    // Signs chosen so the card leans *toward* the cursor: the corner under the
    // pointer is the one that lifts. Flip both to make it lean away instead.
    node.style.transition = 'transform var(--dur-fast) linear';
    node.style.transform = `rotateX(${(py * MAX_TILT).toFixed(2)}deg) rotateY(${(-px * MAX_TILT).toFixed(2)}deg)`;
  };

  const resetTilt = () => {
    const node = tiltRef.current;
    if (!node) return;
    // Slower on the way out, so the card settles rather than snaps.
    node.style.transition = 'transform var(--dur-base) var(--ease-spring)';
    node.style.transform = 'none';
  };
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
      onPointerMove={applyTilt}
      onPointerLeave={resetTilt}
      style={{ perspective: 1400, height, cursor: 'pointer', userSelect: 'none', ...style }}
      {...rest}
    >
      {/* The tilt gets its own layer, wrapping the flipper rather than sharing
          with it. Both are transforms on the same axis, so composing them in one
          declaration would mean the hover fighting the flip for the property —
          and the flip's 420ms spring is the product's hero animation, not
          something to make a pointer wait for. Nested, each keeps its own
          timing and they multiply cleanly. */}
      <div
        ref={tiltRef}
        style={{
          width: '100%', height: '100%', transformStyle: 'preserve-3d',
          // No transition here at rest: applyTilt and resetTilt each set the one
          // they want, so the way in is quick and the way out settles.
          willChange: canTilt ? 'transform' : undefined,
        }}
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
            <span style={{ position: 'absolute', top: 20, left: 24, fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-11)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], letterSpacing: 'var(--ls-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {language}
            </span>
          )}
          {onFront && <span style={{ display: 'grid', lineHeight: 0 }}>{illustration}</span>}
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-48)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], lineHeight: 1.05, color: 'var(--text-strong)' }}>
            {front}
          </span>
          {phonetic && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-16)', color: 'var(--text-muted)' }}>{phonetic}</span>
          )}
          {hint && (
            <span style={{ position: 'absolute', bottom: 18, fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: 'var(--text-muted)' }}>{hint}</span>
          )}
        </div>
        {/* The back face is deep violet whatever the page theme, so it is declared
            a dark island. Without this, a Tag on it took the light scope's
            darkening and came out at 4.32 against a dark surface — the correction
            applied backwards. */}
        <div data-theme="dark" style={{ ...face, opacity: isFlipped ? 1 : 0, transform: 'rotateY(180deg)', background: 'var(--violet-800)', boxShadow: 'inset 0 0 0 1.5px var(--violet-600), var(--shadow-md)' }}>
          {onBack && <span style={{ display: 'grid', lineHeight: 0 }}>{illustration}</span>}
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-32)', fontWeight: 'var(--fw-black)' as React.CSSProperties['fontWeight'], lineHeight: 1.1, color: '#fff' }}>{back}</span>
          {tags && <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>{tags}</div>}
        </div>
      </div>
      </div>
    </div>
  );
}
