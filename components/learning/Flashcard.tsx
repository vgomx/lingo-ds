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
  /**
   * Turn the card by dragging it, on touch. Off elsewhere: a mouse has the
   * hover tilt and a click, and a drag with a held button is not a gesture
   * anyone tries on a card.
   */
  drag?: boolean;
  /**
   * Drifts the card in a slow tilt, continuously, as if a pointer were tracing a
   * circle on it. It says the card answers being touched — a rectangle with a
   * word on it gives no sign of that, and both of its gestures are ones you only
   * find by trying them.
   *
   * It yields while the card is actually being touched, and picks up again
   * after. Off under prefers-reduced-motion.
   */
  preview?: boolean;
  style?: React.CSSProperties;
}

export interface FlashcardProps
  extends FlashcardOwnProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, keyof FlashcardOwnProps> {}

/** Degrees at the very corner. Small on purpose: this is a lift, not a carousel. */
const MAX_TILT = 7;

/** A drag across this fraction of the card's width completes the turn on release. */
const FLIP_AT = 0.25;
/** Under this, the finger did not really move and the gesture was a tap. */
const TAP_SLOP = 6;
/** A flick — short but quick — counts even though it never reached FLIP_AT. */
const FLICK_MS = 260;
const FLICK_PX = 24;

/**
 * One revolution of the idle tilt. Slow: this is a card drifting at the edge of
 * your attention, not a thing spinning for it.
 */
const PREVIEW_PERIOD = 9000;
/** How long the drift takes to reach the pointer's own angle, or to rejoin it. */
const PREVIEW_RAMP = 900;

/**
 * The product's hero object: a two-faced review card that flips on click.
 * Front = prompt in the target language, back = meaning plus notes.
 */
export function Flashcard({
  front, back, illustration, illustrationSide = 'back', phonetic, language, tags,
  flipped, defaultFlipped = false, height = 300,
  hint, onFlip, tilt = true, drag = true, preview = true, style, ...rest
}: FlashcardProps) {
  const onFront = !!illustration && illustrationSide !== 'back';
  const onBack = !!illustration && illustrationSide !== 'front';

  const isTouch = useIsTouch();
  const reducedMotion = usePrefersReducedMotion();
  const canTilt = tilt && !isTouch && !reducedMotion;
  const canDrag = drag && isTouch;

  // Named for the input that is actually there. "Click or press Space" on a
  // phone describes a keyboard and a mouse, neither of which is present.
  const hintText = hint ?? (isTouch ? 'Tap or drag to turn' : 'Click or press Space to flip');

  /**
   * The tilt is written straight to the node rather than held in state.
   * A pointermove fires dozens of times a second, and re-rendering the whole
   * card — both faces, the illustration, the tags — on each one to change one
   * transform is work with nothing to show for it.
   */
  const tiltRef = React.useRef<HTMLDivElement>(null);
  /** The last angle the pointer put the card at, for the drift to resume from. */
  const lastTilt = React.useRef({ x: 0, y: 0 });

  const applyTilt = (e: React.PointerEvent<HTMLDivElement>) => {
    const node = tiltRef.current;
    if (!canTilt || !node) return;
    holdPreview();
    const r = e.currentTarget.getBoundingClientRect();
    // Doubled to ±1, so MAX_TILT is the angle at the edge rather than half of it.
    const px = ((e.clientX - r.left) / r.width - 0.5) * 2;   // -1 (left) … 1 (right)
    const py = ((e.clientY - r.top) / r.height - 0.5) * 2;   // -1 (top)  … 1 (bottom)
    // Signs chosen so the card leans *toward* the cursor: the corner under the
    // pointer is the one that lifts. Flip both to make it lean away instead.
    const x = py * MAX_TILT;
    const y = -px * MAX_TILT;
    lastTilt.current = { x, y };
    node.style.transition = 'transform var(--dur-fast) linear';
    node.style.transform = `rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
  };

  /**
   * The idle drift: the card tilting in a slow circle, as if a pointer were
   * tracing one on it. Same layer as the hover and the same MAX_TILT, so what it
   * shows is the interaction happening rather than an impression of it — a card
   * is a rectangle with a word on it, and nothing else about it says it moves.
   *
   * A loop rather than a CSS animation because the two have to share this
   * transform. An animation outranks an inline style in the cascade, so it would
   * have won every argument with the hover it is advertising.
   */
  const previewPaused = React.useRef(false);
  /** Whether the drift is the thing currently in charge of this layer. */
  const previewLive = React.useRef(false);
  /**
   * Where the drift picks up from. Zero at the start, so it grows out of level;
   * the hover's last angle when the pointer leaves, so the card carries on from
   * where the cursor left it instead of snapping onto the circle.
   */
  const previewFrom = React.useRef({ x: 0, y: 0 });
  const previewRampAt = React.useRef(0);
  /** When the current revolution began, adjusted when the drift is handed back. */
  const previewT0 = React.useRef(0);

  React.useEffect(() => {
    const node = tiltRef.current;
    // Under prefers-reduced-motion the honest answer is the one applyTilt gives:
    // do not move. A hint that has to move to be a hint is not shown at all.
    if (!preview || reducedMotion || !node) return undefined;

    previewLive.current = true;
    let raf = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!previewT0.current) previewT0.current = now;
      // While the pointer or a finger has the card, it is theirs. The ramp is
      // cleared rather than stamped, so that the frame that gets the card back
      // is the one that starts it — stamping it here left the ramp measuring
      // from 0, which put k at 1 on the first frame and skipped the ease.
      if (previewPaused.current) { previewRampAt.current = 0; return; }

      if (!previewRampAt.current) {
        previewRampAt.current = now;
        // Rejoin the circle at the angle the card was left at, by moving where
        // this revolution started. Easing toward wherever the circle happened to
        // have got to instead meant crossing the middle to reach it: the card
        // flattened out and leaned back out again, when what it should do is
        // carry on around from where the cursor was.
        const { x, y } = previewFrom.current;
        if (x || y) previewT0.current = now - (Math.atan2(x, y) / (Math.PI * 2)) * PREVIEW_PERIOD;
      }

      const a = ((now - previewT0.current) / PREVIEW_PERIOD) * Math.PI * 2;
      const k = Math.min((now - previewRampAt.current) / PREVIEW_RAMP, 1);
      const from = previewFrom.current;
      const x = from.x + (Math.sin(a) * MAX_TILT - from.x) * k;
      const y = from.y + (Math.cos(a) * MAX_TILT - from.y) * k;
      // No transition: this loop already draws every intermediate frame, and an
      // easing on top would be a second one chasing the first.
      node.style.transition = 'none';
      node.style.transform = `rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(frame);
    return () => {
      previewLive.current = false;
      cancelAnimationFrame(raf);
      node.style.transform = 'none';
    };
  }, [preview, reducedMotion]);

  /** Hands the card to whoever is touching it, and takes it back after. */
  const holdPreview = () => { previewPaused.current = true; };
  const releasePreview = (from = { x: 0, y: 0 }) => {
    previewFrom.current = from;
    previewRampAt.current = 0;
    previewPaused.current = false;
  };

  const resetTilt = () => {
    releasePreview(lastTilt.current);
    // When the drift is running it does the returning, easing out of the angle
    // the pointer left the card at. Writing 'none' here first would put one
    // frame of level in between the two.
    if (previewLive.current) return;
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

  /**
   * The drag gets its own layer too, for the reason the tilt does: it is a
   * rotation on the same axis as the flip, and the two have to be able to run at
   * their own timings. Nested, they multiply — the finger's angle and the flip's
   * angle add up to where the card is pointing.
   */
  const dragRef = React.useRef<HTMLDivElement>(null);
  const gesture = React.useRef<{ x: number; t: number; w: number; dx: number; live: boolean } | null>(null);
  // A drag that turned the card should not also arrive as a click and turn it
  // back. Set on release, spent by the click that follows it.
  const swallowClick = React.useRef(false);

  /**
   * Which way the card turns under the finger.
   *
   * Toward whichever face you are not looking at, whichever way you drag —
   * rather than following the direction of the drag. Signed rotation would mean
   * a leftward drag turning the card to -180 degrees while the flip it commits
   * to is +180, so the card would reverse back through the face it started on
   * to get there. This way the drag is always already heading where the release
   * will finish, and the two motions add up to one continuous turn.
   */
  const turnDir = () => (isFlipped ? -1 : 1);

  const onDragStart = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canDrag || !dragRef.current) return;
    holdPreview();
    const r = e.currentTarget.getBoundingClientRect();
    gesture.current = { x: e.clientX, t: e.timeStamp, w: r.width, dx: 0, live: true };
    // Follows the finger exactly while it is down; nothing to ease toward.
    dragRef.current.style.transition = 'none';
    // Keeps the moves coming if the finger wanders off the card mid-turn.
    // Throws if the pointer is already gone by the time this runs, which is a
    // race worth surviving rather than an error worth raising.
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* pointer already released */ }
  };

  const onDragMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    const node = dragRef.current;
    if (!g?.live || !node) return;
    g.dx = e.clientX - g.x;
    // Clamped at a half-turn: a card already showing its other face has nowhere
    // further to go, and letting it keep spinning would make it a carousel.
    const progress = Math.min(Math.abs(g.dx) / g.w, 1);
    node.style.transform = `rotateY(${(turnDir() * progress * 180).toFixed(2)}deg)`;
  };

  const onDragEnd = (e: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    const g = gesture.current;
    const node = dragRef.current;
    if (!g?.live || !node) return;
    g.live = false;

    const dist = Math.abs(g.dx);
    const committed = !cancelled
      && (dist > g.w * FLIP_AT || (dist > FLICK_PX && e.timeStamp - g.t < FLICK_MS));

    swallowClick.current = dist > TAP_SLOP;

    // Home either way. On a commit the flipper takes the rest of the turn, and
    // matching its timing means the two cross over as one movement rather than
    // the finger's angle snapping back out from under it.
    node.style.transition = 'transform var(--dur-flip) var(--ease-spring)';
    node.style.transform = 'none';
    releasePreview();
    if (committed) flip();
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
      onClick={() => {
        if (swallowClick.current) { swallowClick.current = false; return; }
        flip();
      }}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isFlipped}
      onPointerDown={onDragStart}
      onPointerMove={(e) => { applyTilt(e); onDragMove(e); }}
      onPointerUp={onDragEnd}
      onPointerCancel={(e) => onDragEnd(e, true)}
      onPointerLeave={resetTilt}
      style={{
        perspective: 1400, height, cursor: 'pointer', userSelect: 'none',
        // Vertical panning stays the page's, horizontal is the card's. Without
        // this the browser claims the gesture as a scroll and the pointermoves
        // stop arriving partway through the turn.
        touchAction: canDrag ? 'pan-y' : undefined,
        ...style,
      }}
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
        ref={dragRef}
        style={{
          width: '100%', height: '100%', transformStyle: 'preserve-3d',
          willChange: canDrag ? 'transform' : undefined,
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
          {hintText && (
            <span style={{ position: 'absolute', bottom: 18, fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-12)', fontWeight: 'var(--fw-semibold)' as React.CSSProperties['fontWeight'], color: 'var(--text-muted)' }}>{hintText}</span>
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
    </div>
  );
}
